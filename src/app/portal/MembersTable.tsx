"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type Member = {
	id: string;
	username: string | null;
	product: string | null;
	plan_price_usd: number | null;
	monthly_reward_usd: number | null;
	referred_at: string | null;
	status: string;
	commission_active: boolean | null;
	discord: string | null;
};
export type ReqInfo = { status: string; revealed_email: string | null };

const usd = (n: number) =>
	"$" + Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtDate = (s: string | null) =>
	s ? new Date(s).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—";

const STATUS_STYLE: Record<string, { label: string; cls: string }> = {
	active: { label: "Active", cls: "bg-green-500/15 text-green-400" },
	canceled_pending: { label: "Canceling", cls: "bg-amber-500/15 text-amber-400" },
	lapsed: { label: "Lapsed", cls: "bg-orange-500/15 text-orange-400" },
	expired: { label: "Expired", cls: "bg-red-500/15 text-red-400" },
	free: { label: "Free", cls: "bg-white/10 text-white/50" },
};
const STATUS_ORDER = ["active", "canceled_pending", "lapsed", "expired", "free"];
function incomeBadge(m: Member) {
	// Free-plan members read "Free" (not "Unconfirmed") — there's no income to confirm.
	if (!m.plan_price_usd) return { label: "Free", cls: "bg-white/10 text-white/50" };
	if (m.commission_active === true) return { label: "Income", cls: "bg-cyan/15 text-cyan" };
	if (m.commission_active === false) return { label: "No income", cls: "bg-white/10 text-white/40" };
	return { label: "Unconfirmed", cls: "bg-amber-500/10 text-amber-400/70" };
}

type SortKey =
	| "username" | "product" | "plan_price_usd" | "monthly_reward_usd"
	| "status" | "commission_active" | "referred_at";

const COLUMNS: { key: SortKey; label: string; align?: "right" }[] = [
	{ key: "username", label: "Member" },
	{ key: "product", label: "Product" },
	{ key: "plan_price_usd", label: "Plan", align: "right" },
	{ key: "monthly_reward_usd", label: "Income / mo", align: "right" },
	{ key: "status", label: "Status" },
	{ key: "commission_active", label: "Income" },
	{ key: "referred_at", label: "Referred", align: "right" },
];

function cmp(a: Member, b: Member, key: SortKey): number {
	if (key === "status") return STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
	if (key === "commission_active") {
		const rank = (v: boolean | null) => (v === true ? 2 : v === null ? 1 : 0);
		return rank(a.commission_active) - rank(b.commission_active);
	}
	if (key === "plan_price_usd" || key === "monthly_reward_usd") {
		return (a[key] ?? -1) - (b[key] ?? -1);
	}
	if (key === "referred_at") {
		return (a.referred_at ? Date.parse(a.referred_at) : 0) - (b.referred_at ? Date.parse(b.referred_at) : 0);
	}
	return String(a[key] ?? "").localeCompare(String(b[key] ?? ""));
}

export default function MembersTable({
	members,
	affiliateId,
	initialRequests,
}: {
	members: Member[];
	affiliateId: string;
	initialRequests: Record<string, ReqInfo>;
}) {
	const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "referred_at", dir: "desc" });
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [reqs, setReqs] = useState<Record<string, ReqInfo>>(initialRequests);
	const [busy, setBusy] = useState<string | null>(null);

	function toggleSort(key: SortKey) {
		setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
	}

	const activeStatusCount = members.filter((m) => m.status === "active").length;
	const paying = members.filter((m) => m.commission_active === true);
	const payingMonthly = paying.reduce((s, m) => s + (m.monthly_reward_usd ?? 0), 0);

	const rows = useMemo(() => {
		let r = members.filter((m) => {
			if (!from && !to) return true;
			const d = m.referred_at ? m.referred_at.slice(0, 10) : null;
			if (!d) return false;
			if (from && d < from) return false;
			if (to && d > to) return false;
			return true;
		});
		r = [...r].sort((a, b) => cmp(a, b, sort.key) * (sort.dir === "asc" ? 1 : -1));
		return r;
	}, [members, from, to, sort]);

	async function requestEmail(memberId: string) {
		setBusy(memberId);
		try {
			const supabase = createClient();
			const { error } = await supabase
				.from("email_requests")
				.insert({ affiliate_id: affiliateId, member_id: memberId });
			// unique violation => a request already exists; treat as pending
			setReqs((r) => ({ ...r, [memberId]: { status: "pending", revealed_email: null } }));
			if (error && error.code !== "23505") {
				setReqs((r) => ({ ...r, [memberId]: { status: "error", revealed_email: null } }));
			}
		} finally {
			setBusy(null);
		}
	}

	function emailCell(m: Member) {
		const req = reqs[m.id];
		if (!req) {
			return (
				<button
					onClick={() => requestEmail(m.id)}
					disabled={busy === m.id}
					className="px-2 py-1 rounded-lg border border-white/15 text-xs text-white/70 hover:bg-white/5 disabled:opacity-50"
				>
					{busy === m.id ? "…" : "Request email"}
				</button>
			);
		}
		if (req.status === "approved") return <span className="text-xs text-cyan break-all">{req.revealed_email}</span>;
		if (req.status === "denied") return <span className="text-xs text-red-400/70">Denied</span>;
		if (req.status === "error") return <span className="text-xs text-red-400/70">Error</span>;
		return <span className="text-xs text-amber-400/70">Pending</span>;
	}

	const arrow = (key: SortKey) => (sort.key === key ? (sort.dir === "asc" ? " ▲" : " ▼") : "");

	return (
		<div className="mt-12">
			<p className="text-white/40 text-xs uppercase tracking-wider mb-3">Your members</p>

			{members.length === 0 ? (
				<p className="text-white/40 text-sm">No members recorded yet.</p>
			) : (
				<>
					<div className="flex flex-wrap gap-3 mb-4">
						<div className="border border-white/10 rounded-xl px-4 py-2 bg-[#0a0a0a]">
							<div className="text-white/40 text-xs">Active members</div>
							<div className="text-lg font-semibold">{activeStatusCount}</div>
							<div className="text-white/30 text-[11px]">have access on Whop</div>
						</div>
						<div className="border border-cyan/30 rounded-xl px-4 py-2 bg-cyan/5">
							<div className="text-cyan text-xs">Income / month</div>
							<div className="text-lg font-semibold">{usd(payingMonthly)}</div>
							<div className="text-white/30 text-[11px]">
								from {paying.length} member{paying.length === 1 ? "" : "s"}
							</div>
						</div>
						<div className="border border-white/10 rounded-xl px-4 py-2 bg-[#0a0a0a]">
							<div className="text-white/40 text-xs">Total referred</div>
							<div className="text-lg font-semibold">{members.length}</div>
						</div>
					</div>

					{/* date-range filter on referred_at */}
					<div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-white/50">
						<span>Referred between</span>
						<input
							type="date"
							value={from}
							onChange={(e) => setFrom(e.target.value)}
							className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white/80"
						/>
						<span>and</span>
						<input
							type="date"
							value={to}
							onChange={(e) => setTo(e.target.value)}
							className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white/80"
						/>
						{(from || to) && (
							<button onClick={() => { setFrom(""); setTo(""); }} className="text-cyan hover:underline">
								clear
							</button>
						)}
						<span className="ml-auto">{rows.length} shown</span>
					</div>

					<div className="border border-white/10 rounded-2xl overflow-hidden bg-[#0a0a0a]">
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="text-white/40 text-left border-b border-white/10">
										{COLUMNS.map((c) => (
											<th
												key={c.key}
												onClick={() => toggleSort(c.key)}
												className={
													"px-4 py-3 font-medium cursor-pointer select-none hover:text-white/70 " +
													(c.align === "right" ? "text-right" : "")
												}
											>
												{c.label}
												{arrow(c.key)}
											</th>
										))}
										<th className="px-4 py-3 font-medium">Email</th>
									</tr>
								</thead>
								<tbody>
									{rows.map((m) => {
										const st = STATUS_STYLE[m.status] ?? { label: m.status, cls: "bg-white/10 text-white/50" };
										const ib = incomeBadge(m);
										const paying = m.commission_active === true;
										return (
											<tr key={m.id} className="border-b border-white/5 last:border-0">
												<td className="px-4 py-3 font-medium">
													{m.username ?? "—"}
													{m.discord && (
														<div className="text-white/40 text-[11px] font-normal">
															Discord: {m.discord}
														</div>
													)}
												</td>
												<td className="px-4 py-3 text-white/70">{(m.product ?? "—").replace("SharpMoney ", "")}</td>
												<td className="px-4 py-3 text-right text-white/70">
													{m.plan_price_usd ? usd(m.plan_price_usd) : "—"}
												</td>
												<td className={"px-4 py-3 text-right " + (paying ? "text-white" : "text-white/30 line-through")}>
													{m.monthly_reward_usd ? usd(m.monthly_reward_usd) : "—"}
												</td>
												<td className="px-4 py-3">
													<span className={"inline-block px-2 py-0.5 rounded-full text-xs " + st.cls}>{st.label}</span>
												</td>
												<td className="px-4 py-3">
													<span className={"inline-block px-2 py-0.5 rounded-full text-xs " + ib.cls}>{ib.label}</span>
												</td>
												<td className="px-4 py-3 text-right text-white/50">{fmtDate(m.referred_at)}</td>
												<td className="px-4 py-3">{emailCell(m)}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
					<p className="text-white/30 text-xs mt-3">
						Click a column header to sort. <span className="text-white/60">Status</span> = access
						on Whop; <span className="text-white/60">Income</span> = whether you currently earn
						from them (a member can be Active but show No income if they re-subscribed via a promo
						code or a different affiliate link). Only <span className="text-cyan/80">Income</span>{" "}
						amounts count toward your monthly total. &ldquo;Request email&rdquo; asks the
						SharpMoney team to release that member&apos;s email to you.
					</p>
				</>
			)}
		</div>
	);
}
