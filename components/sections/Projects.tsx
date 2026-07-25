"use client";

import { useDict, pick } from "@/lib/i18n/useDict";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/content/projects";

export function Projects() {
  const { d, locale } = useDict();

  return (
    <SectionShell
      id="projects"
      index="04"
      eyebrow={d.projects.eyebrow}
      title={d.projects.title}
      lead={d.projects.lead}
    >
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <article
              data-cursor="hover"
              className="glass group relative h-full overflow-hidden rounded-[var(--radius-lg)] p-7 transition-colors duration-500 hover:border-[var(--color-line-strong)]"
            >
              {/* accent wash — stands in for the real preview until Phase 4 */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-32 opacity-25 blur-2xl transition-opacity duration-700 group-hover:opacity-45"
                style={{
                  background: `linear-gradient(120deg, ${p.accent[0]}, ${p.accent[1]})`,
                }}
              />

              <div className="relative">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl">{p.title}</h3>
                  <span className="font-[family-name:var(--font-display)] text-sm text-[var(--color-lo)]">
                    {p.year}
                  </span>
                </div>

                <p className="mt-3 leading-relaxed text-[var(--color-lo)]">
                  {pick(p.description, locale)}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-mid)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-center gap-5 text-sm">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-mid)] underline-offset-4 transition-colors duration-300 hover:text-[var(--color-mint)] hover:underline"
                    >
                      {d.projects.viewCode} ↗
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-mid)] underline-offset-4 transition-colors duration-300 hover:text-[var(--color-mint)] hover:underline"
                    >
                      {d.projects.viewDemo} ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
