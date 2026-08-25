"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Affiliate portal login. Email + password only — no signup, no reset, no OAuth.
// Accounts are admin-created; on success we go to /portal.
export default function PortalLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const supabase = createClient();
			const { data, error } = await supabase.auth.signInWithPassword({ email, password });
			if (error) {
				setError(error.message || "Login failed");
				return;
			}
			// Admins go to the owner dashboard; affiliates to their portal.
			const isAdmin = data.user?.app_metadata?.role === "admin";
			router.push(isAdmin ? "/affiliates-dashboard" : "/portal");
			router.refresh();
		} catch {
			setError("Network error");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
			<div className="w-full max-w-sm border border-white/10 rounded-2xl p-8 bg-[#0a0a0a]">
				<p className="text-xs text-cyan font-semibold tracking-wider uppercase mb-2">
					Affiliate portal
				</p>
				<h1 className="text-xl font-bold mb-1">Sign in</h1>
				<p className="text-white/50 text-sm mb-6">
					Use the email and password provided by the SharpMoney team.
				</p>
				<form onSubmit={onSubmit} className="space-y-4">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-cyan/50"
						autoComplete="email"
						required
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-cyan/50"
						autoComplete="current-password"
						required
					/>
					{error && <p className="text-red-400 text-sm">{error}</p>}
					<button
						type="submit"
						disabled={loading}
						className="w-full py-3 rounded-xl bg-cyan text-black font-semibold text-sm hover:opacity-90 disabled:opacity-50"
					>
						{loading ? "…" : "Sign in"}
					</button>
				</form>
			</div>
		</div>
	);
}
