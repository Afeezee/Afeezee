"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export type ContactFormConfig = {
  section: string;
  formType: string;
  topics: readonly string[];
  askInstitution?: boolean;
  heading: string;
  sub: string;
};

export function SectionContactForm({ config }: { config: ContactFormConfig }) {
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
        body: JSON.stringify({
          ...data,
          section: config.section,
          form_type: config.formType,
        }),
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

  const inputStyle = {
    background: "var(--input-bg)",
    border: "1px solid var(--input-border)",
  };

  return (
    <section
      className="mx-auto grid max-w-6xl gap-10 rounded-3xl p-8 sm:p-12 md:grid-cols-[1fr_1fr]"
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
          <span>{config.section}</span>
        </div>
        <h2 className="display-heading mt-6 text-3xl leading-[1.05] tracking-tightest text-[color:var(--fg-strong)] sm:text-4xl">
          {config.heading}
        </h2>
        <p className="mt-4 max-w-md text-[color:var(--fg)]/80">{config.sub}</p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-4">
        <Field label="Your name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        {config.askInstitution && (
          <Field label="Institution / affiliation (optional)" name="institution" />
        )}
        <div className="grid gap-2">
          <label htmlFor="topic" className="text-xs uppercase tracking-[0.2em] text-muted">
            Type of inquiry
          </label>
          <select
            id="topic"
            name="topic"
            required
            defaultValue=""
            className="rounded-lg px-3 py-3 text-[color:var(--fg-strong)] outline-none transition"
            style={inputStyle}
          >
            <option value="" disabled>
              Choose one…
            </option>
            {config.topics.map((t) => (
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
            style={inputStyle}
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition disabled:cursor-progress disabled:opacity-60"
          style={{ background: "var(--fg-strong)", color: "var(--bg)" }}
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
