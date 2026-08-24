"use client";

import { useState } from "react";
import { useEffect } from "react";

type UMember = {
	id: string;
	whop_member_id: string;
	username: string | null;
	product: string | null;
	plan_price_usd: number | null;
	status: string;
	referred_at: string | null;
};
type Aff = { id: string; whop_username: string | null; display_name: string | null };

const td: React.CSSProperties = { padding: 8, borderBottom: "1px solid #eee" };

export default function UnassignedQueue() {
	const [members, setMembers] = useState<UMember[]>([]);
	const [affiliates, setAffiliates] = useState<Aff[]>([]);
	const [choice, setChoice] = useState<Record<string, string>>({});
	const [selected, setSelected] = useState<Set<string>>(new Set());
	const [busy, setBusy] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		fetch("/api/admin/unassigned")
			.then((r) => r.json())
			.then((d) => {
				if (d.error) setError(d.error);
				else {
					setMembers(d.members);
					setAffiliates(d.affiliates);
				}
			})
			.catch((e) => setError(String(e)))
			.finally(() => setLoading(false));
	}, []);

	function toggle(id: string) {
		setSelected((s) => {
			const n = new Set(s);
			n.has(id) ? n.delete(id) : n.add(id);
			return n;
		});
	}
	const allShownSelected = members.length > 0 && members.every((m) => selected.has(m.id));
	function toggleAll() {
		setSelected(allShownSelected ? new Set() : new Set(members.map((m) => m.id)));
	}

	async function assign(memberId: string) {
		const affiliate_id = choice[memberId];
		if (!affiliate_id) return;
		setBusy(true);
		try {
			const res = await fetch("/api/admin/unassigned", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ member_id: memberId, affiliate_id }),
			});
			if (res.ok) removeRows([memberId]);
			else setError((await res.json().catch(() => ({}))).error || "assign failed");
		} finally {
			setBusy(false);
		}
	}

	async function dismiss(ids: string[]) {
		if (!ids.length) return;
		setBusy(true);
		try {
			const res = await fetch("/api/admin/unassigned", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ dismiss_ids: ids }),
			});
			if (res.ok) removeRows(ids);
			else setError((await res.json().catch(() => ({}))).error || "dismiss failed");
		} finally {
			setBusy(false);
		}
	}

	function removeRows(ids: string[]) {
		const set = new Set(ids);
		setMembers((ms) => ms.filter((m) => !set.has(m.id)));
		setSelected((s) => {
			const n = new Set(s);
			ids.forEach((id) => n.delete(id));
			return n;
		});
	}

	return (
		<section style={{ padding: 32, maxWidth: 1100, margin: "0 auto", fontFamily: "sans-serif" }}>
			<h2 style={{ marginBottom: 4 }}>Unassigned members {members.length ? `(${members.length})` : ""}</h2>
			<p style={{ color: "#666", marginTop: 0 }}>
				Auto-captured from payments with no affiliate yet. Assign the ones that belong to an
				affiliate; dismiss direct customers (&ldquo;not affiliate-referred&rdquo;) to clear them —
				dismissed members won&apos;t be re-captured.
			</p>

			{loading ? (
				<p style={{ color: "#666" }}>Loading…</p>
			) : error ? (
				<p style={{ color: "crimson" }}>Error: {error}</p>
			) : members.length === 0 ? (
				<p style={{ color: "#666" }}>Queue is empty.</p>
			) : (
				<>
					<div style={{ display: "flex", gap: 12, alignItems: "center", margin: "12px 0" }}>
						<button disabled={busy || selected.size === 0} onClick={() => dismiss([...selected])}>
							Dismiss selected ({selected.size})
						</button>
						<button
							disabled={busy}
							onClick={() => {
								if (confirm(`Dismiss all ${members.length} shown as not affiliate-referred?`))
									dismiss(members.map((m) => m.id));
							}}
							style={{ color: "crimson" }}
						>
							Dismiss all shown ({members.length})
						</button>
						{busy && <span style={{ color: "#666" }}>working…</span>}
					</div>

					<table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
						<thead>
							<tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
								<th style={{ padding: 8 }}>
									<input type="checkbox" checked={allShownSelected} onChange={toggleAll} />
								</th>
								<th style={{ padding: 8 }}>Member</th>
								<th style={{ padding: 8 }}>Product</th>
								<th style={{ padding: 8, textAlign: "right" }}>Plan</th>
								<th style={{ padding: 8 }}>Status</th>
								<th style={{ padding: 8 }}>Assign to</th>
								<th style={{ padding: 8 }}></th>
							</tr>
						</thead>
						<tbody>
							{members.map((m) => (
								<tr key={m.id}>
									<td style={td}>
										<input type="checkbox" checked={selected.has(m.id)} onChange={() => toggle(m.id)} />
									</td>
									<td style={td}>
										{m.username ?? "—"}
										<div style={{ color: "#999", fontSize: 11 }}>{m.whop_member_id}</div>
									</td>
									<td style={td}>{(m.product ?? "—").replace("SharpMoney ", "")}</td>
									<td style={{ ...td, textAlign: "right" }}>
										{m.plan_price_usd != null ? "$" + m.plan_price_usd.toFixed(2) : "—"}
									</td>
									<td style={td}>{m.status}</td>
									<td style={td}>
										<select
											value={choice[m.id] ?? ""}
											onChange={(e) => setChoice((c) => ({ ...c, [m.id]: e.target.value }))}
										>
											<option value="">— pick affiliate —</option>
											{affiliates.map((a) => (
												<option key={a.id} value={a.id}>
													{a.whop_username} {a.display_name ? `(${a.display_name})` : ""}
												</option>
											))}
										</select>
									</td>
									<td style={td}>
										<button disabled={!choice[m.id] || busy} onClick={() => assign(m.id)} style={{ marginRight: 8 }}>
											Assign
										</button>
										<button disabled={busy} onClick={() => dismiss([m.id])} style={{ color: "#a00" }}>
											Dismiss
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}
		</section>
	);
}
