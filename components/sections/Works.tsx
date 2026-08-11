"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDict, pick } from "@/lib/i18n/useDict";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { works, type Work } from "@/content/works";
import { useStore } from "@/lib/store";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Works() {
  const { d, locale } = useDict();
  const [active, setActive] = useState<Work | null>(null);
  const setMenuOpen = useStore((s) => s.setMenuOpen);

  const close = useCallback(() => setActive(null), []);

  // Escape closes the detail view; scrolling stays locked while it is open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    setMenuOpen(true); // reuses the existing scroll lock
    return () => {
      window.removeEventListener("keydown", onKey);
      setMenuOpen(false);
    };
  }, [active, close, setMenuOpen]);

  return (
    <>
      <SectionShell
        id="projects"
        index="04"
        eyebrow={d.works.eyebrow}
        title={d.works.title}
        lead={d.works.lead}
      >
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.06}>
              <button
                onClick={() => setActive(w)}
                data-cursor="hover"
                aria-label={pick(w.title, locale)}
                className="group glass w-full overflow-hidden rounded-[var(--radius-lg)] text-start transition-colors duration-500 hover:border-[var(--color-mint)]/40"
              >
                {/* thumbnail */}
                <span className="relative block aspect-[16/10] overflow-hidden">
                  {w.thumbnail ? (
                    <Image
                      src={w.thumbnail}
                      alt={pick(w.title, locale)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="absolute inset-0 opacity-45 transition-opacity duration-700 group-hover:opacity-70"
                      style={{
                        background: `linear-gradient(130deg, ${w.accent[0]}, ${w.accent[1]})`,
                      }}
                    />
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent opacity-80" />

                  <span className="absolute bottom-3 end-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-[var(--color-hi)] backdrop-blur-md">
                    {pick(w.price, locale)}
                  </span>
                </span>

                {/* meta */}
                <span className="block p-6">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-[family-name:var(--font-display)] text-xl text-[var(--color-hi)]">
                      {pick(w.title, locale)}
                    </span>
                    <span className="text-xs text-[var(--color-lo)]">{w.year}</span>
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-[var(--color-lo)]">
                    {pick(w.summary, locale)}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--color-mint)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {d.works.view} →
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      {/* detail view */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              aria-label={d.works.close}
              onClick={close}
              className="absolute inset-0 bg-black/75 backdrop-blur-xl"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={pick(active.title, locale)}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="glass relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[var(--radius-lg)]"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                {active.thumbnail ? (
                  <Image
                    src={active.thumbnail}
                    alt={pick(active.title, locale)}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-50"
                    style={{
                      background: `linear-gradient(130deg, ${active.accent[0]}, ${active.accent[1]})`,
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] to-transparent" />

                <button
                  onClick={close}
                  data-cursor="hover"
                  aria-label={d.works.close}
                  className="absolute end-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-[var(--color-hi)] backdrop-blur-md transition-colors duration-300 hover:border-[var(--color-mint)]/50"
                >
                  ✕
                </button>
              </div>

              <div className="p-7 sm:p-10">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="text-3xl">{pick(active.title, locale)}</h3>
                  <span className="text-sm text-[var(--color-lo)]">{active.year}</span>
                </div>

                <p className="mt-5 leading-relaxed text-[var(--color-mid)]">
                  {pick(active.description, locale)}
                </p>

                {active.tags.length > 0 && (
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {active.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-mid)]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-[var(--color-line)] pt-6">
                  <div>
                    <p className="eyebrow">{d.works.price}</p>
                    <p className="mt-1.5 font-[family-name:var(--font-display)] text-2xl text-[var(--color-hi)]">
                      {pick(active.price, locale)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {active.link && (
                      <a
                        href={active.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        className="rounded-full border border-[var(--color-line-strong)] px-5 py-2.5 text-sm text-[var(--color-hi)] transition-colors duration-300 hover:border-[var(--color-mint)]/50"
                      >
                        {d.works.open} ↗
                      </a>
                    )}
                    <a
                      href="#contact"
                      onClick={close}
                      data-cursor="hover"
                      className="rounded-full border border-[var(--color-mint)]/40 bg-[var(--color-mint)]/10 px-5 py-2.5 text-sm text-[var(--color-hi)] transition-colors duration-300 hover:bg-[var(--color-mint)]/20"
                    >
                      {d.works.order}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
