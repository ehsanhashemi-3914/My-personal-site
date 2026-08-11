"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useStore } from "@/lib/store";
import { useDict, pick } from "@/lib/i18n/useDict";
import { useScrollTo } from "@/lib/hooks/useScrollTo";
import { ReactiveText } from "@/components/ui/ReactiveText";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { d, locale } = useDict();
  const ready = useStore((s) => s.ready);
  const reduced = useReducedMotion();
  const scrollTo = useScrollTo();

  const show = ready;

  const rise = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 32 },
    animate: show ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, ease: EASE, delay },
  });

  const facts = [
    { label: d.hero.facts.based, value: pick(profile.location, locale) },
    { label: d.hero.facts.focus, value: pick(profile.stats.stackLabel, locale) },
    { label: d.hero.facts.reply, value: d.hero.facts.replyValue },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden py-28"
    >
      <div className="container-x w-full">
        {/* availability + role */}
        <motion.div {...rise(0.1)} className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-mint)] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-mint)]" />
            </span>
            <span className="text-xs text-[var(--color-mid)]">
              {d.hero.available}
            </span>
          </span>
          <span className="eyebrow">{d.hero.eyebrow}</span>
        </motion.div>

        <h1 className="mt-8 text-[length:var(--text-display)]">
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block"
              initial={reduced ? undefined : { y: "110%" }}
              animate={show ? { y: 0 } : undefined}
              transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            >
              <ReactiveText text={d.hero.titleTop} lift={18} />
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span
              className="text-gradient block italic"
              initial={reduced ? undefined : { y: "110%" }}
              animate={show ? { y: 0 } : undefined}
              transition={{ duration: 1.2, ease: EASE, delay: 0.32 }}
            >
              <ReactiveText text={d.hero.titleBottom} lift={18} />
            </motion.span>
          </span>
        </h1>

        <motion.p
          {...rise(0.5)}
          className="mt-8 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-[var(--color-mid)]"
        >
          {d.hero.lead}
        </motion.p>

        {/* calls to action */}
        <motion.div {...rise(0.62)} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton
            onClick={() => scrollTo("projects")}
            strength={0.22}
            className="rounded-full border border-[var(--color-mint)]/45 bg-[var(--color-mint)]/10 px-7 py-3.5 text-sm text-[var(--color-hi)] transition-colors duration-500 hover:bg-[var(--color-mint)]/20"
          >
            {d.hero.ctaWork}
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo("contact")}
            strength={0.22}
            className="rounded-full border border-[var(--color-line-strong)] px-7 py-3.5 text-sm text-[var(--color-hi)] transition-colors duration-500 hover:border-[var(--color-mint)]/45 hover:bg-white/5"
          >
            {d.hero.ctaContact}
          </MagneticButton>

          <span className="mx-1 hidden h-6 w-px bg-[var(--color-line)] sm:block" />

          <div className="flex items-center gap-2.5">
            {socials
              .filter((s) => s.id !== "phone")
              .map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target={s.id === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor="hover"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-mid)] transition-colors duration-300 hover:border-[var(--color-mint)]/45 hover:text-[var(--color-mint)]"
                >
                  <SocialIcon id={s.id} />
                </a>
              ))}
          </div>
        </motion.div>

        {/* quick facts — gives the page substance above the fold */}
        <motion.dl
          {...rise(0.74)}
          className="mt-14 grid max-w-3xl gap-x-10 gap-y-6 border-t border-[var(--color-line)] pt-8 sm:grid-cols-3"
        >
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="eyebrow">{f.label}</dt>
              <dd className="mt-2 text-sm text-[var(--color-hi)]">{f.value}</dd>
            </div>
          ))}
        </motion.dl>

        {/* identity + scroll cue */}
        <motion.div
          {...rise(0.86)}
          className="mt-12 flex flex-wrap items-end justify-between gap-6"
        >
          <button
            onClick={() => scrollTo("about")}
            data-cursor="hover"
            className="group flex items-center gap-3"
          >
            <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-[var(--color-line-strong)] pt-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint)] [animation:scroll-hint_2s_ease-in-out_infinite]" />
            </span>
            <span className="eyebrow transition-colors duration-300 group-hover:text-[var(--color-hi)]">
              {d.hero.scroll}
            </span>
          </button>

          <div className="text-start">
            <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-hi)]">
              {pick(profile.name, locale)}
            </p>
            <p className="mt-1 text-sm text-[var(--color-lo)]">
              {pick(profile.role, locale)}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
