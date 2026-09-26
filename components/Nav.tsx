"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = { label: string; href: string; external?: boolean };

const primary: NavItem[] = [
  { label: "Music", href: "https://music.afeezee.com", external: true },
  { label: "Dev", href: "https://dev.afeezee.com", external: true },
  { label: "Writing", href: "/writing" },
  { label: "Research", href: "/research" },
  { label: "Startup", href: "/startup" },
  { label: "JMHS", href: "https://judementalhealthsociety.org", external: true },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? "backdrop-blur" : ""
      }`}
      style={scrolled ? { background: "var(--nav-bg)" } : undefined}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className="display-heading text-lg tracking-tightest text-[color:var(--fg-strong)]"
        >
          Afeezee<span className="text-muted">.</span>
        </a>
        <nav className="hidden items-center gap-5 text-xs uppercase tracking-[0.22em] text-muted md:flex">
          {primary.map((it) => (
            <a
              key={it.label}
              href={it.href}
              target={it.external ? "_blank" : undefined}
              rel={it.external ? "noreferrer noopener" : undefined}
              className="transition hover:text-[color:var(--fg-strong)]"
            >
              {it.label}
            </a>
          ))}
          <a href="/#contact" className="text-[color:var(--fg-strong)]">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
