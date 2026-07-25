"use client";

import { useDict } from "@/lib/i18n/useDict";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { profile } from "@/content/profile";

/** Placeholder figures — replaced by the real GitHub API in Phase 4. */
const MOCK = { repos: 48, stars: 320, commits: 1840, followers: 210 };

export function Github() {
  const { d } = useDict();

  const stats = [
    { value: MOCK.repos, label: d.github.repos },
    { value: MOCK.stars, label: d.github.stars },
    { value: MOCK.commits, label: d.github.commits },
    { value: MOCK.followers, label: d.github.followers },
  ];

  return (
    <SectionShell
      id="github"
      index="05"
      eyebrow={d.github.eyebrow}
      title={d.github.title}
      lead={d.github.lead}
    >
      <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <GlassPanel className="grid h-full grid-cols-2 gap-8 p-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-[family-name:var(--font-display)] text-4xl tabular-nums text-[var(--color-hi)]">
                  {s.value.toLocaleString("en-US")}
                </p>
                <p className="mt-1.5 text-xs uppercase tracking-[0.18em] text-[var(--color-lo)]">
                  {s.label}
                </p>
              </div>
            ))}
          </GlassPanel>
        </Reveal>

        <Reveal delay={0.08}>
          <GlassPanel className="h-full p-8">
            {/* Contribution grid — becomes a 3D heightfield in Phase 4. */}
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {Array.from({ length: 7 * 26 }).map((_, i) => {
                // Deterministic pseudo-random so SSR and client agree.
                const v = (Math.sin(i * 12.9898) * 43758.5453) % 1;
                const level = Math.abs(v);
                const opacity =
                  level > 0.82 ? 0.9 : level > 0.6 ? 0.55 : level > 0.35 ? 0.28 : 0.09;
                return (
                  <span
                    key={i}
                    className="aspect-square rounded-[2px] bg-[var(--color-mint)]"
                    style={{ opacity }}
                  />
                );
              })}
            </div>
            <a
              href={`https://github.com/${profile.githubUser}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="mt-8 inline-flex text-sm text-[var(--color-mid)] underline-offset-4 transition-colors duration-300 hover:text-[var(--color-mint)] hover:underline"
            >
              {d.github.visit} ↗
            </a>
          </GlassPanel>
        </Reveal>
      </div>
    </SectionShell>
  );
}
