"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") ?? "/admin";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Login failed.");
      }
      router.replace(next);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-muted">Admin</p>
      <h1 className="display-heading mt-3 text-4xl tracking-tightest text-[color:var(--fg-strong)]">
        Sign in
      </h1>
      <p className="mt-3 text-sm text-[color:var(--fg)]/70">
        Restricted. Use the admin password configured for this site.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4">
        <label className="text-xs uppercase tracking-[0.2em] text-muted" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          className="rounded-lg px-3 py-3 text-[color:var(--fg-strong)] outline-none"
          style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)" }}
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-full px-5 py-3 text-sm font-medium disabled:opacity-60"
          style={{ background: "var(--fg-strong)", color: "var(--bg)" }}
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
        {error && <p className="text-sm text-accent-jmhs dark:text-accent-jmhs-dark">{error}</p>}
      </form>
    </main>
  );
}
