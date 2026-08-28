"use client";

import { useState } from "react";

// ── Swappable link source ────────────────────────────────────────────────────
// Today: the ?a= attribution template. To switch to configured checkout URLs
// before launch, either (a) fill `configuredUrl` per plan below, or (b) replace
// buildLink — nothing else in this component changes.
type PlanLink = { label: string; route: string; plan: string; configuredUrl?: string };

const PLANS: PlanLink[] = [
	{ label: "Alpha", route: "alpha-4e", plan: "plan_bIvSIMMW0Nk7x" },
	{ label: "Pro", route: "pro-7e", plan: "plan_RT5EMQ1gJLpQA" },
	{ label: "Core", route: "core-ae", plan: "plan_q2zQ6EHBluewl" },
];

// Template fallback (used when this affiliate has no configured ch_ URL for a plan).
function templateLink(p: PlanLink, username: string): string {
	return `https://whop.com/sharpmoney/${p.route}/?directPlanId=${p.plan}&a=${encodeURIComponent(username)}`;
}
// ─────────────────────────────────────────────────────────────────────────────

export default function PortalLinks({
	username,
	configUrls,
}: {
	username: string;
	// product label ("Alpha" | "Pro" | "Core") -> checkout/ch_ URL from attribution_keys
	configUrls?: Record<string, string>;
}) {
	// Prefer the affiliate's configured ch_ URL; fall back to the ?a= template.
	const linkFor = (p: PlanLink) => configUrls?.[p.label] ?? templateLink(p, username);
	const [copied, setCopied] = useState<string | null>(null);

	async function copy(label: string, url: string) {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(label);
			setTimeout(() => setCopied((c) => (c === label ? null : c)), 1500);
		} catch {
			/* clipboard blocked — user can select the text manually */
		}
	}

	return (
		<div className="mt-10">
			<p className="text-white/40 text-xs uppercase tracking-wider mb-3">Your share links</p>
			<div className="grid gap-3 sm:grid-cols-3">
				{PLANS.map((p) => {
					const url = linkFor(p);
					return (
						<div key={p.label} className="border border-white/10 rounded-2xl p-4 bg-[#0a0a0a]">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-semibold">{p.label}</span>
								<button
									onClick={() => copy(p.label, url)}
									className="px-3 py-1 rounded-lg bg-cyan text-black text-xs font-semibold hover:opacity-90"
								>
									{copied === p.label ? "Copied ✓" : "Copy"}
								</button>
							</div>
							<code className="block text-[11px] text-white/50 break-all leading-relaxed">{url}</code>
						</div>
					);
				})}
			</div>
			<p className="text-white/30 text-xs mt-3">
				Share these to get credited for referrals. Each links to the plan&apos;s checkout with
				your attribution tag.
			</p>
		</div>
	);
}
