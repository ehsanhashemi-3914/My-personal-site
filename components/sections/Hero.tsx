"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useStore } from "@/lib/store";
import { useDict, pick } from "@/lib/i18n/useDict";
import { useScrollTo } from "@/lib/hooks/useScrollTo";
import { ReactiveText } from "@/components/ui/ReactiveText";
import { profile } from "@/content/profile";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { d, locale } = useDict();
  const ready = useStore((s) => s.ready);
  const reduced = useReducedMotion();
  const scrollTo = useScrollTo();

  // Hold the entrance until the preloader has handed over.
  const show = ready;

  const rise = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 40 },
    animate: show ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1.1, ease: EASE, delay },
  });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      <div className="container-x w-full">
        <motion.p {...rise(0.1)} className="eyebrow">
          {d.hero.eyebrow}
        </motion.p>

        <h1 className="mt-7 text-[length:var(--text-display)]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={reduced ? undefined : { y: "110%" }}
              animate={show ? { y: 0 } : undefined}
              transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            >
              <ReactiveText text={d.hero.titleTop} lift={18} />
            </motion.span>
          </span>
          <span className="block overflow-hidden">
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

        <motion.div
          {...rise(0.5)}
          className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-xl text-[length:var(--text-lead)] leading-relaxed text-[var(--color-mid)]">
            {d.hero.lead}
          </p>

          <div className="shrink-0 text-start md:text-end">
            <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-hi)]">
              {pick(profile.name, locale)}
            </p>
            <p className="mt-1 text-sm text-[var(--color-lo)]">
              {pick(profile.role, locale)} · {pick(profile.location, locale)}
            </p>
          </div>
        </motion.div>

        <motion.button
          {...rise(0.7)}
          onClick={() => scrollTo("about")}
          data-cursor="hover"
          className="group mt-16 flex items-center gap-3"
        >
          <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-[var(--color-line-strong)] pt-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint)] [animation:scroll-hint_2s_ease-in-out_infinite]" />
          </span>
          <span className="eyebrow transition-colors duration-300 group-hover:text-[var(--color-hi)]">
            {d.hero.scroll}
          </span>
        </motion.button>
      </div>
    </section>
  );
}
