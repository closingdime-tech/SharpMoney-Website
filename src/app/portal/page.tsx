import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";
import MembersTable, { type Member, type ReqInfo } from "./MembersTable";
import PortalLinks from "./PortalLinks";

export const dynamic = "force-dynamic";

type Affiliate = { id: string; display_name: string | null; whop_username: string | null };
type Snapshot = {
	taken_at: string;
	total_referrals: number;
	active_members: number;
	total_revenue_usd: number;
	mrr_usd: number;
	total_earnings_usd: number;
	retention_pct: number | null;
	retention_90d_pct: number | null;
};

const usd = (n: number) =>
	"$" + Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = (n: number | null) => (n == null ? "—" : `${Number(n).toFixed(1)}%`);
const fmtDate = (s: string) =>
	new Date(s).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

// Minimal dependency-free sparkline (chronological values left→right).
function Sparkline({ values, stroke }: { values: number[]; stroke: string }) {
	if (values.length < 2) {
		return <span className="text-white/30 text-xs">not enough data</span>;
	}
	const w = 260, h = 48, pad = 4;
	const min = Math.min(...values);
	const max = Math.max(...values);
	const range = max - min || 1;
	const pts = values
		.map((v, i) => {
			const x = pad + (i / (values.length - 1)) * (w - 2 * pad);
			const y = h - pad - ((v - min) / range) * (h - 2 * pad);
			return `${x.toFixed(1)},${y.toFixed(1)}`;
		})
		.join(" ");
	return (
		<svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
			<polyline
				points={pts}
				fill="none"
				stroke={stroke}
				strokeWidth="2"
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export default async function PortalDashboard() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		redirect("/portal/login");
	}
	// Admins belong on the owner dashboard, not an affiliate portal.
	if (user.app_metadata?.role === "admin") {
		redirect("/affiliates-dashboard");
	}

	// Own affiliate row (RLS: own rows only, source='sheet').
	const { data: affiliate, error: affErr } = await supabase
		.from("affiliates")
		.select("id, display_name, whop_username")
		.maybeSingle<Affiliate>();

	if (affErr) {
		console.error("portal: affiliates query failed:", affErr);
		return (
			<div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
				<div className="w-full max-w-md border border-red-500/20 rounded-2xl p-8 bg-[#0a0a0a] text-center">
					<h1 className="text-lg font-bold mb-2">Couldn&apos;t load your data</h1>
					<p className="text-red-400/80 text-sm mb-6 break-words">{affErr.message}</p>
					<LogoutButton />
				</div>
			</div>
		);
	}

	if (!affiliate) {
		return (
			<div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
				<div className="w-full max-w-md border border-white/10 rounded-2xl p-8 bg-[#0a0a0a] text-center">
					<h1 className="text-lg font-bold mb-2">No affiliate profile</h1>
					<p className="text-white/50 text-sm mb-6">
						This login isn&apos;t linked to an affiliate account yet. Please contact the
						SharpMoney team.
					</p>
					<LogoutButton />
				</div>
			</div>
		);
	}

	// Own snapshot history, newest first (RLS: own rows only).
	const { data: snapshotsDesc } = await supabase
		.from("stat_snapshots")
		.select(
			"taken_at, total_referrals, active_members, total_revenue_usd, mrr_usd, total_earnings_usd, retention_pct, retention_90d_pct"
		)
		.eq("affiliate_id", affiliate.id)
		.order("taken_at", { ascending: false });

	const history: Snapshot[] = snapshotsDesc ?? [];
	const latest = history[0];
	const chrono = [...history].reverse(); // oldest→newest for sparklines

	// Own referred members (RLS: own rows only). Sorting/filtering happens client-side.
	const { data: memberData } = await supabase
		.from("members")
		.select(
			"id, username, product, plan_price_usd, monthly_reward_usd, referred_at, status, commission_active, discord"
		)
		.eq("affiliate_id", affiliate.id);
	const members: Member[] = memberData ?? [];

	// Own email requests (RLS own) -> map member_id -> {status, revealed_email}.
	const { data: reqData } = await supabase
		.from("email_requests")
		.select("member_id, status, revealed_email")
		.eq("affiliate_id", affiliate.id);
	const initialRequests: Record<string, ReqInfo> = {};
	for (const r of reqData ?? []) {
		initialRequests[r.member_id as string] = {
			status: r.status as string,
			revealed_email: (r.revealed_email as string) ?? null,
		};
	}

	// Earnings (the affiliate's payout) is shown separately/prominently below.
	// These grid figures are what the affiliate generates FOR SharpMoney.
	// Third element (optional) is a tooltip note. active_members is a
	// membership-status count (incl. non-billing members) — NOT paying customers.
	const cards: [string, string, string?][] = latest
		? [
				["Referrals", latest.total_referrals.toLocaleString()],
				[
					"Active members",
					latest.active_members.toLocaleString(),
					"Membership-status count — includes non-billing members (trials, comped, lapsed). Not the same as paying customers.",
				],
				["Revenue you generated", usd(latest.total_revenue_usd)],
				["Monthly revenue you generate", usd(latest.mrr_usd)],
				["Retention", pct(latest.retention_pct)],
				["90-day retention", pct(latest.retention_90d_pct)],
		  ]
		: [];

	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-4xl mx-auto p-6 sm:p-10">
				{/* Header */}
				<div className="flex items-start justify-between gap-4 mb-8">
					<div>
						<p className="text-xs text-cyan font-semibold tracking-wider uppercase mb-2">
							Affiliate portal
						</p>
						<h1 className="text-2xl font-bold">
							{affiliate.display_name || affiliate.whop_username || "Your dashboard"}
						</h1>
						{affiliate.whop_username && (
							<p className="text-white/50 text-sm mt-1">@{affiliate.whop_username}</p>
						)}
					</div>
					<LogoutButton />
				</div>

				{!latest ? (
					<div className="border border-white/10 rounded-2xl p-8 bg-[#0a0a0a] text-white/50 text-sm">
						No stats have been captured yet. Check back soon.
					</div>
				) : (
					<>
						{/* Your earnings — the affiliate's actual payout, shown prominently. */}
						<div className="border border-cyan/30 rounded-2xl p-6 bg-cyan/5 mb-4">
							<div className="text-cyan text-xs font-semibold uppercase tracking-wider mb-1">
								Your total earnings
							</div>
							<div className="text-3xl font-bold">{usd(latest.total_earnings_usd)}</div>
							<div className="text-white/40 text-xs mt-1">
								Commission paid to you · as of {fmtDate(latest.taken_at)}
							</div>
						</div>

						{/* Performance — figures the affiliate generates FOR SharpMoney, not their payout. */}
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
							{cards.map(([label, value, note]) => (
								<div
									key={label}
									title={note}
									className="border border-white/10 rounded-2xl p-4 bg-[#0a0a0a]"
								>
									<div className="text-white/50 text-xs mb-1">
										{label}
										{note ? <span className="text-white/30"> ⓘ</span> : null}
									</div>
									<div className="text-lg font-semibold">{value}</div>
								</div>
							))}
						</div>
						<p className="text-white/40 text-xs mb-10">
							Revenue figures above are what your referrals generate for SharpMoney — not
							your payout. Your payout is{" "}
							<span className="text-white/70">your total earnings</span> at the top.{" "}
							&ldquo;Active members&rdquo; counts membership status (including non-billing
							members), not paying customers.
						</p>

						{/* Trends */}
						<div className="grid sm:grid-cols-2 gap-3 mb-10">
							<div className="border border-white/10 rounded-2xl p-5 bg-[#0a0a0a]">
								<div className="text-white/50 text-xs mb-3">Referrals over time</div>
								<Sparkline values={chrono.map((s) => s.total_referrals)} stroke="#22d3ee" />
							</div>
							<div className="border border-white/10 rounded-2xl p-5 bg-[#0a0a0a]">
								<div className="text-white/50 text-xs mb-3">Your earnings over time</div>
								<Sparkline values={chrono.map((s) => s.total_earnings_usd)} stroke="#4ade80" />
							</div>
						</div>

						{/* History table */}
						<p className="text-white/40 text-xs uppercase tracking-wider mb-1">
							Snapshot history
						</p>
						<p className="text-white/30 text-xs mb-3">
							Revenue &amp; monthly revenue are generated for SharpMoney · your earnings is
							your commission
						</p>
						<div className="border border-white/10 rounded-2xl overflow-hidden bg-[#0a0a0a]">
							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead>
										<tr className="text-white/40 text-left border-b border-white/10">
											<th className="px-4 py-3 font-medium">Date</th>
											<th className="px-4 py-3 font-medium text-right">Referrals</th>
											<th
												className="px-4 py-3 font-medium text-right"
												title="Membership-status count (includes non-billing members), not paying customers."
											>
												Active
											</th>
											<th className="px-4 py-3 font-medium text-right">Revenue generated</th>
											<th className="px-4 py-3 font-medium text-right">Monthly revenue</th>
											<th className="px-4 py-3 font-medium text-right">Your earnings</th>
										</tr>
									</thead>
									<tbody>
										{history.map((s, i) => (
											<tr
												key={s.taken_at + i}
												className="border-b border-white/5 last:border-0"
											>
												<td className="px-4 py-3 text-white/70">{fmtDate(s.taken_at)}</td>
												<td className="px-4 py-3 text-right">
													{s.total_referrals.toLocaleString()}
												</td>
												<td className="px-4 py-3 text-right">
													{s.active_members.toLocaleString()}
												</td>
												<td className="px-4 py-3 text-right">{usd(s.total_revenue_usd)}</td>
												<td className="px-4 py-3 text-right">{usd(s.mrr_usd)}</td>
												<td className="px-4 py-3 text-right">{usd(s.total_earnings_usd)}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</>
				)}

				<PortalLinks username={affiliate.whop_username ?? ""} />

				<MembersTable
					members={members}
					affiliateId={affiliate.id}
					initialRequests={initialRequests}
				/>
			</div>
		</div>
	);
}
