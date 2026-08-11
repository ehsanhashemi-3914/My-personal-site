"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDict } from "@/lib/i18n/useDict";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { profile } from "@/content/profile";

const schema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  message: z.string().trim().min(10),
  /** Honeypot — hidden from people, irresistible to bots. */
  company: z.string().max(0).optional(),
});
type FormValues = z.infer<typeof schema>;

type Status = "idle" | "sent" | "error" | "unconfigured" | "rate_limited";

const fieldCls =
  "w-full border-b border-[var(--color-line)] bg-transparent py-3 text-[var(--color-hi)] outline-none transition-colors duration-300 placeholder:text-[var(--color-lo)] focus:border-[var(--color-mint)]";

export function Contact() {
  const { d } = useDict();
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        reset();
        setStatus("sent");
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status === 503) setStatus("unconfigured");
      else if (res.status === 429) setStatus("rate_limited");
      else {
        console.error("Contact form failed:", body.error ?? res.status);
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form request failed:", error);
      setStatus("error");
    }
  };

  return (
    <SectionShell
      id="contact"
      index="06"
      eyebrow={d.contact.eyebrow}
      title={d.contact.title}
      lead={d.contact.lead}
    >
      <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <GlassPanel className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
              <div>
                <label htmlFor="name" className="eyebrow">
                  {d.contact.name}
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  className={fieldCls}
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-2 text-xs text-[var(--color-rose)]">
                    {d.contact.name} — min. 2
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="eyebrow">
                  {d.contact.email}
                </label>
                <input
                  id="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  className={fieldCls}
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-[var(--color-rose)]">
                    {d.contact.email} — invalid
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="eyebrow">
                  {d.contact.message}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`${fieldCls} resize-none`}
                  aria-invalid={!!errors.message}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="mt-2 text-xs text-[var(--color-rose)]">
                    {d.contact.message} — min. 10
                  </p>
                )}
              </div>

              {/* Honeypot — off-screen, skipped by keyboard and screen readers. */}
              <input
                {...register("company")}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor="hover"
                className="group relative w-full overflow-hidden rounded-full border border-[var(--color-mint)]/40 py-3.5 text-sm text-[var(--color-hi)] transition-colors duration-500 hover:bg-[var(--color-mint)]/10 disabled:opacity-50"
              >
                {isSubmitting ? d.contact.sending : d.contact.send}
              </button>

              <p aria-live="polite" className="min-h-5 text-sm">
                {status === "sent" && (
                  <span className="text-[var(--color-mint)]">✓ {d.contact.sent}</span>
                )}
                {status === "error" && (
                  <span className="text-[var(--color-rose)]">{d.contact.failed}</span>
                )}
                {status === "rate_limited" && (
                  <span className="text-[var(--color-rose)]">{d.contact.tooMany}</span>
                )}
                {status === "unconfigured" && (
                  <span className="text-[var(--color-rose)]">
                    {d.contact.unconfigured}{" "}
                    <a
                      href={`mailto:${profile.email}`}
                      dir="ltr"
                      className="underline underline-offset-4"
                    >
                      {profile.email}
                    </a>
                  </span>
                )}
              </p>
            </form>
          </GlassPanel>
        </Reveal>

        <Reveal delay={0.08}>
          <GlassPanel className="flex h-full flex-col justify-between gap-8 p-8">
            <div className="space-y-7">
              <div>
                <p className="eyebrow">{d.contact.emailLabel}</p>
                <a
                  href={`mailto:${profile.email}`}
                  dir="ltr"
                  data-cursor="hover"
                  className="mt-2 block w-fit font-[family-name:var(--font-display)] text-xl text-[var(--color-hi)] underline-offset-4 hover:underline"
                >
                  {profile.email}
                </a>
              </div>

              <div>
                <p className="eyebrow">{d.contact.phoneLabel}</p>
                <a
                  href={`tel:${profile.phone.tel}`}
                  dir="ltr"
                  data-cursor="hover"
                  className="mt-2 block w-fit font-[family-name:var(--font-display)] text-xl tabular-nums text-[var(--color-hi)] underline-offset-4 hover:underline"
                >
                  {profile.phone.display}
                </a>
              </div>
            </div>

            <a
              href={profile.resumeUrl}
              download
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-line-strong)] py-3.5 text-sm text-[var(--color-hi)] transition-colors duration-500 hover:border-[var(--color-mint)]/50 hover:bg-white/5"
            >
              ↓ {d.contact.resume}
            </a>
          </GlassPanel>
        </Reveal>
      </div>
    </SectionShell>
  );
}
