"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDict } from "@/lib/i18n/useDict";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { profile } from "@/content/profile";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});
type FormValues = z.infer<typeof schema>;

const fieldCls =
  "w-full border-b border-[var(--color-line)] bg-transparent py-3 text-[var(--color-hi)] outline-none transition-colors duration-300 placeholder:text-[var(--color-lo)] focus:border-[var(--color-mint)]";

export function Contact() {
  const { d } = useDict();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  // Phase 5 wires this to a real endpoint; for now it just resolves.
  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    console.info("contact form (not yet wired to an endpoint):", values);
    reset();
  };

  return (
    <SectionShell
      id="contact"
      index="07"
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

              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor="hover"
                className="group relative w-full overflow-hidden rounded-full border border-[var(--color-mint)]/40 py-3.5 text-sm text-[var(--color-hi)] transition-colors duration-500 hover:bg-[var(--color-mint)]/10 disabled:opacity-50"
              >
                {isSubmitting ? "…" : d.contact.send}
              </button>

              {isSubmitSuccessful && (
                <p className="text-sm text-[var(--color-mint)]">✓</p>
              )}
            </form>
          </GlassPanel>
        </Reveal>

        <Reveal delay={0.08}>
          <GlassPanel className="flex h-full flex-col justify-between gap-8 p-8">
            <div>
              <p className="eyebrow">Email</p>
              <a
                href={`mailto:${profile.email}`}
                dir="ltr"
                data-cursor="hover"
                className="mt-2 block font-[family-name:var(--font-display)] text-xl text-[var(--color-hi)] underline-offset-4 hover:underline"
              >
                {profile.email}
              </a>
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
