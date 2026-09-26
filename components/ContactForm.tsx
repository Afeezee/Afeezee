"use client";

import { useState } from "react";

const topics = [
  "Music",
  "Development",
  "Writing",
  "Research",
  "Startup collaboration",
  "Mental Health Advocacy (JMHS)",
  "Other",
] as const;

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, section: "hub", form_type: "general" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      setStatus("ok");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-28">
      <div
        className="grid gap-12 rounded-3xl p-8 backdrop-blur sm:p-12 md:grid-cols-[1.1fr_1fr]"
        style={{
          background: "var(--surface)",
          boxShadow: "inset 0 0 0 1px var(--card-ring)",
        }}
      >
        <div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted">
            <span
              className="inline-block h-px w-8"
              style={{ background: "var(--hairline-strong)" }}
            />
            <span>Contact</span>
          </div>
          <h2 className="display-heading mt-6 text-4xl leading-[1.02] tracking-tightest text-[color:var(--fg-strong)] sm:text-5xl">
            One inbox for
            <br />
            <span className="italic">every kind of hello.</span>
          </h2>
          <p className="mt-6 max-w-md text-[color:var(--fg)]/80">
            Commissions, collaborations, research or press — write here and pick
            the room it belongs in. Everything reaches me directly.
          </p>
          <dl className="mt-10 space-y-4 text-sm text-[color:var(--fg)]/75">
            <div className="flex items-center gap-3">
              <dt className="w-24 text-muted">Based in</dt>
              <dd>Osun State, Nigeria</dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="w-24 text-muted">Reply time</dt>
              <dd>Usually within a week</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4">
          <Field label="Your name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <div className="grid gap-2">
            <label htmlFor="topic" className="text-xs uppercase tracking-[0.2em] text-muted">
              What&apos;s this about?
            </label>
            <select
              id="topic"
              name="topic"
              required
              defaultValue=""
              className="rounded-lg px-3 py-3 text-[color:var(--fg-strong)] outline-none transition"
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
              }}
            >
              <option value="" disabled>
                Pick a room…
              </option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="resize-none rounded-lg px-3 py-3 text-[color:var(--fg-strong)] outline-none transition"
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
              }}
              placeholder="Tell me a little about what you have in mind…"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition disabled:cursor-progress disabled:opacity-60"
            style={{
              background: "var(--fg-strong)",
              color: "var(--bg)",
            }}
          >
            {status === "sending" ? "Sending…" : status === "ok" ? "Message received ✓" : "Send"}
            <span aria-hidden>→</span>
          </button>

          {status === "error" && (
            <p className="text-sm text-accent-jmhs dark:text-accent-jmhs-dark">{error}</p>
          )}
          {status === "ok" && (
            <p className="text-sm text-accent-research dark:text-accent-research-dark">
              Thanks — I&apos;ll be in touch.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-xs uppercase tracking-[0.2em] text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-lg px-3 py-3 text-[color:var(--fg-strong)] outline-none transition"
        style={{
          background: "var(--input-bg)",
          border: "1px solid var(--input-border)",
        }}
      />
    </div>
  );
}
