"use client";

import { useDict, pick } from "@/lib/i18n/useDict";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { journey } from "@/content/journey";

export function Journey() {
  const { d, locale } = useDict();

  return (
    <SectionShell
      id="journey"
      index="02"
      eyebrow={d.journey.eyebrow}
      title={d.journey.title}
      lead={d.journey.lead}
    >
      <ol className="relative mt-16 border-s border-[var(--color-line)] ps-8 sm:ps-12">
        {journey.map((m, i) => (
          <Reveal key={m.year} delay={i * 0.06} className="relative pb-14 last:pb-0">
            <span className="absolute -start-[calc(2rem+5px)] top-2 h-2.5 w-2.5 rounded-full bg-[var(--color-mint)] glow-mint sm:-start-[calc(3rem+5px)]" />
            <p className="font-[family-name:var(--font-display)] text-sm text-[var(--color-mint)]">
              {m.year}
            </p>
            <h3 className="mt-2 text-2xl">{pick(m.title, locale)}</h3>
            <p className="mt-3 max-w-xl leading-relaxed text-[var(--color-lo)]">
              {pick(m.body, locale)}
            </p>
          </Reveal>
        ))}
      </ol>
    </SectionShell>
  );
}
