import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

// Item 5 — auto-capture. Scans recent Whop payments and inserts unknown members
// (affiliate_id = null) into the assignment queue. Owner assigns them later.
// Auth: Vercel cron Bearer CRON_SECRET, or manual ?secret=/x-snapshot-secret.
// Default run = latest 100 payments. ?deep=1 paginates back ~60 days (first-run backfill).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COMPANY_ID = "biz_lbUgwQ0bQ8BxtD";
const DEEP_DAYS = 60;
const MAX_PAGES_DEEP = 40; // safety cap

function authorized(req: NextRequest): boolean {
	const cron = process.env.CRON_SECRET;
	if (cron && req.headers.get("authorization") === `Bearer ${cron}`) return true;
	const manual = process.env.SNAPSHOT_SECRET;
	if (manual) {
		const p = req.nextUrl.searchParams.get("secret") ?? req.headers.get("x-snapshot-secret");
		if (p === manual) return true;
	}
	return false;
}

function money(v: unknown): number | null {
	if (typeof v === "number") return v;
	if (typeof v === "string") {
		const n = parseFloat(v.replace(/[$,\s]/g, ""));
		return isNaN(n) ? null : n;
	}
	return null;
}

const STATUS_MAP: Record<string, string> = {
	renewing: "active",
	canceling: "canceled_pending",
	churned: "lapsed",
	left: "expired",
};

async function whopGet(path: string, key: string) {
	const res = await fetch("https://api.whop.com/api/v1/" + path, {
		headers: { Authorization: "Bearer " + key },
		cache: "no-store",
	});
	return res.ok ? res.json() : null;
}

async function handle(req: NextRequest) {
	if (!process.env.CRON_SECRET && !process.env.SNAPSHOT_SECRET) {
		return NextResponse.json({ error: "No auth configured" }, { status: 500 });
	}
	if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	const key = process.env.WHOP_API_KEY;
	if (!key) return NextResponse.json({ error: "Missing WHOP_API_KEY" }, { status: 500 });

	const deep = req.nextUrl.searchParams.get("deep") === "1";
	const cutoff = Date.now() - DEEP_DAYS * 24 * 60 * 60 * 1000;

	const supabase = createAdminClient();
	const { data: existing, error: exErr } = await supabase.from("members").select("whop_member_id");
	if (exErr) return NextResponse.json({ error: "read members failed", detail: exErr.message }, { status: 500 });
	const known = new Set((existing ?? []).map((m) => m.whop_member_id));

	// checkout_configuration_id -> affiliate_id (Gap B: auto-assign source).
	const { data: keys } = await supabase
		.from("attribution_keys")
		.select("whop_key_id, affiliate_id")
		.eq("key_type", "checkout_configuration");
	const ccidToAffiliate = new Map<string, string>(
		(keys ?? []).map((k) => [k.whop_key_id as string, k.affiliate_id as string])
	);

	// Free members (ANY assignment): if a PAID payment later arrives, reclassify to
	// paying — update plan_price + product. Unassigned ones then surface in the Paying
	// view; assigned ones also raise an OPEN commission_review flag so the owner can
	// confirm and flip commission_active (never auto-flipped).
	const { data: freeRows } = await supabase
		.from("members")
		.select("id, whop_member_id, plan_price_usd, affiliate_id")
		.or("plan_price_usd.is.null,plan_price_usd.eq.0");
	const freeMembers = new Map<string, { id: string; assigned: boolean }>();
	for (const m of freeRows ?? []) {
		freeMembers.set(m.whop_member_id as string, { id: m.id as string, assigned: m.affiliate_id != null });
	}
	const upgrades = new Map<string, { id: string; price: number; product: string | null; assigned: boolean }>();

	// Collect candidate member ids from payments (dedup, only unknown).
	// Gap A: include_free=true so $0 joins (free-tier config links) are captured.
	type Cand = { username: string; product: string | null; price: number | null; ccid: string | null };
	const candidates = new Map<string, Cand>();
	let after: string | null = null;
	let pages = 0;
	const maxPages = deep ? MAX_PAGES_DEEP : 1;
	outer: while (pages < maxPages) {
		const url = `payments?company_id=${COMPANY_ID}&include_free=true` + (after ? `&after=${after}` : "");
		const d = await whopGet(url, key);
		pages++;
		const rows: any[] = Array.isArray(d?.data) ? d.data : [];
		for (const p of rows) {
			const mber = p?.member?.id;
			if (!mber) continue;
			const price = money(p?.usd_total ?? p?.total);
			if (known.has(mber)) {
				// upgrade: a free member now has a paid payment -> reclassify to paying
				const fm = freeMembers.get(mber);
				if (fm && price != null && price > 0 && !upgrades.has(mber)) {
					upgrades.set(mber, { id: fm.id, price, product: p?.product?.title ?? null, assigned: fm.assigned });
				}
				continue;
			}
			const ccid = p?.checkout_configuration_id ?? null;
			const prev = candidates.get(mber);
			if (prev) {
				if (!prev.ccid && ccid) prev.ccid = ccid; // keep a ccid if any of their payments has one
				continue;
			}
			candidates.set(mber, {
				username: p?.user?.username ?? "unknown",
				product: p?.product?.title ?? null,
				price,
				ccid,
			});
			if (deep && p?.created_at && Date.parse(p.created_at) < cutoff) break outer;
		}
		const pi = d?.page_info ?? {};
		if (!pi.has_next_page || !pi.end_cursor) break;
		if (deep && rows.length && rows[rows.length - 1]?.created_at && Date.parse(rows[rows.length - 1].created_at) < cutoff) break;
		after = pi.end_cursor as string;
	}

	// Enrich via /members/{mber} for join date + status. Auto-assign when the payment's
	// checkout_configuration_id maps to an affiliate; otherwise queue as unassigned.
	const toInsert: any[] = [];
	const autoAssign = new Map<string, { affiliate_id: string; ccid: string }>();
	for (const [mber, info] of candidates) {
		const wm = await whopGet("members/" + mber, key);
		const status = wm?.most_recent_action ? STATUS_MAP[wm.most_recent_action] ?? "active" : "active";
		const mapped = info.ccid ? ccidToAffiliate.get(info.ccid) ?? null : null;
		if (mapped && info.ccid) autoAssign.set(mber, { affiliate_id: mapped, ccid: info.ccid });
		toInsert.push({
			whop_member_id: mber,
			username: info.username,
			affiliate_id: mapped,
			product: info.product,
			plan_price_usd: info.price,
			monthly_reward_usd: null,
			referred_at: wm?.joined_at ?? null,
			status,
			commission_active: null,
			notes: mapped ? `auto-assigned via ${info.ccid}` : "auto-captured from payments; unassigned",
		});
	}

	let inserted = 0;
	let autoAssigned = 0;
	if (toInsert.length) {
		const { data, error } = await supabase
			.from("members")
			.upsert(toInsert, { onConflict: "whop_member_id", ignoreDuplicates: true })
			.select("id, whop_member_id");
		if (error) return NextResponse.json({ error: "insert failed", detail: error.message }, { status: 500 });
		inserted = data?.length ?? 0;

		// Log auto-assignments to member_flags (trail; distinct from manual assigns).
		const flags = (data ?? [])
			.map((row) => {
				const a = autoAssign.get(row.whop_member_id as string);
				return a
					? {
							member_id: row.id,
							flag_type: "auto_assigned",
							detail: `auto_assigned to ${a.affiliate_id} via ${a.ccid}`,
							status: "reviewed",
							reviewed_at: new Date().toISOString(),
					  }
					: null;
			})
			.filter(Boolean);
		autoAssigned = flags.length;
		if (flags.length) await supabase.from("member_flags").insert(flags as Record<string, unknown>[]);
	}

	// Apply upgrades: any free member with a new paid payment becomes paying — update
	// plan_price + product (regardless of assignment). Log upgraded_to_paying (history);
	// assigned members also get an OPEN commission_review flag. commission_active is
	// never auto-flipped — the owner confirms.
	let upgraded = 0;
	for (const [, u] of upgrades) {
		const { error } = await supabase
			.from("members")
			.update({ plan_price_usd: u.price, product: u.product })
			.eq("id", u.id);
		if (!error) {
			upgraded++;
			const flags: Record<string, unknown>[] = [
				{
					member_id: u.id,
					flag_type: "upgraded_to_paying",
					detail: `free -> paying ($${u.price}) ${u.product ?? ""}`.trim(),
					status: "reviewed",
					reviewed_at: new Date().toISOString(),
				},
			];
			if (u.assigned) {
				flags.push({
					member_id: u.id,
					flag_type: "commission_review",
					detail: `assigned member converted free -> paid ($${u.price}); confirm commission_active`,
					status: "open",
				});
			}
			await supabase.from("member_flags").insert(flags);
		}
	}

	return NextResponse.json({
		mode: deep ? "deep-backfill" : "daily",
		pagesScanned: pages,
		newCandidates: candidates.size,
		inserted,
		autoAssigned,
		upgraded,
	});
}

export async function GET(req: NextRequest) {
	return handle(req);
}
export async function POST(req: NextRequest) {
	return handle(req);
}
