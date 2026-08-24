import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { getAuthContext } from "@/lib/admin";

// Item 5 — admin-only assignment queue.
// GET  -> { members: unassigned (affiliate_id null), affiliates: [{id, whop_username, display_name}] }
// POST { member_id, affiliate_id } -> assign a captured member to an affiliate.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function requireAdmin() {
	const { user, isAdmin } = await getAuthContext();
	if (!user) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
	if (!isAdmin) return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
	return { error: null };
}

export async function GET() {
	const { error } = await requireAdmin();
	if (error) return error;
	const supabase = createAdminClient();
	const [{ data: members }, { data: affiliates }] = await Promise.all([
		supabase
			.from("members")
			.select("id, whop_member_id, username, product, plan_price_usd, status, referred_at")
			.is("affiliate_id", null)
			.eq("dismissed", false)
			.order("referred_at", { ascending: false }),
		supabase
			.from("affiliates")
			.select("id, whop_username, display_name")
			.neq("source", "system")
			.order("whop_username"),
	]);
	return NextResponse.json({ members: members ?? [], affiliates: affiliates ?? [] });
}

export async function POST(req: NextRequest) {
	const { error } = await requireAdmin();
	if (error) return error;
	let body: { member_id?: string; affiliate_id?: string; dismiss_ids?: string[] };
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}
	const supabase = createAdminClient();

	// Bulk (or single) dismiss: mark unassigned rows as "not affiliate-referred".
	// They leave the queue but stay in the table so the capture job won't re-add them.
	if (Array.isArray(body.dismiss_ids) && body.dismiss_ids.length) {
		if (body.dismiss_ids.length > 1000) {
			return NextResponse.json({ error: "too many ids (max 1000)" }, { status: 400 });
		}
		const { data, error: dErr } = await supabase
			.from("members")
			.update({ dismissed: true })
			.in("id", body.dismiss_ids)
			.is("affiliate_id", null) // never dismiss an assigned member
			.select("id");
		if (dErr) return NextResponse.json({ error: "dismiss failed", detail: dErr.message }, { status: 500 });
		return NextResponse.json({ dismissed: data?.length ?? 0 });
	}

	// Assign a captured member to an affiliate.
	if (!body.member_id || !body.affiliate_id) {
		return NextResponse.json({ error: "member_id + affiliate_id, or dismiss_ids, required" }, { status: 400 });
	}
	const { data, error: upErr } = await supabase
		.from("members")
		.update({ affiliate_id: body.affiliate_id })
		.eq("id", body.member_id)
		.is("affiliate_id", null) // guard against races
		.select("id");
	if (upErr) return NextResponse.json({ error: "assign failed", detail: upErr.message }, { status: 500 });
	if (!data?.length) return NextResponse.json({ error: "member not found or already assigned" }, { status: 409 });
	return NextResponse.json({ assigned: body.member_id, to: body.affiliate_id });
}
