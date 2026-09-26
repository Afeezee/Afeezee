"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const tabs = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/poems", label: "Poems" },
  { href: "/admin/essays", label: "Essays" },
  { href: "/admin/contacts", label: "Contacts" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-dvh">
      <header
        className="sticky top-0 z-40 backdrop-blur"
        style={{ background: "var(--nav-bg)", borderBottom: "1px solid var(--hairline)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="display-heading text-lg tracking-tightest text-[color:var(--fg-strong)]">
              Afeezee<span className="text-muted">.admin</span>
            </Link>
            <nav className="hidden gap-4 text-xs uppercase tracking-[0.22em] text-muted sm:flex">
              {tabs.map((t) => {
                const active = pathname === t.href;
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={active ? "text-[color:var(--fg-strong)]" : "transition hover:text-[color:var(--fg-strong)]"}
                  >
                    {t.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/" className="text-muted transition hover:text-[color:var(--fg-strong)]">
              ↗ View site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-full px-3 py-1.5 uppercase tracking-[0.16em] text-[color:var(--fg-strong)]"
              style={{ boxShadow: "inset 0 0 0 1px var(--hairline-strong)" }}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
