"use client";

import { useDict, pick } from "@/lib/i18n/useDict";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Portrait } from "@/components/ui/Portrait";
import { profile } from "@/content/profile";

export function About() {
  const { d, locale } = useDict();

  const stats = [
    { value: `${profile.stats.years}+`, label: d.about.stats.years },
    { value: `${profile.stats.projects}+`, label: d.about.stats.projects },
    {
      value: pick(profile.stats.stackLabel, locale),
      label: d.about.stats.stack,
      wide: true,
    },
  ];

  return (
    <SectionShell
      id="about"
      index="01"
      eyebrow={d.about.eyebrow}
      title={d.about.title}
    >
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="space-y-6">
          <Reveal delay={0.05}>
            <p className="text-[length:var(--text-lead)] leading-relaxed text-[var(--color-mid)]">
              {d.about.body}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="leading-relaxed text-[var(--color-lo)]">{d.about.body2}</p>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.18}>
            <Portrait />
          </Reveal>

          <Reveal delay={0.24}>
            <GlassPanel className="p-8">
              <div className="grid gap-7 sm:grid-cols-3 lg:grid-cols-1">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p
                      className={
                        s.wide
                          ? "font-[family-name:var(--font-display)] text-lg text-[var(--color-hi)]"
                          : "font-[family-name:var(--font-display)] text-4xl text-[var(--color-hi)]"
                      }
                    >
                      {s.value}
                    </p>
                    <p className="mt-1.5 text-xs uppercase tracking-[0.18em] text-[var(--color-lo)]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
