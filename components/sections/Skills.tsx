"use client";

import { useDict, pick } from "@/lib/i18n/useDict";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { skillGroups } from "@/content/skills";

export function Skills() {
  const { d, locale } = useDict();

  return (
    <SectionShell
      id="skills"
      index="03"
      eyebrow={d.skills.eyebrow}
      title={d.skills.title}
      lead={d.skills.lead}
    >
      <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g, i) => (
          <Reveal key={g.id} delay={i * 0.06}>
            <h3 className="text-sm uppercase tracking-[0.2em] text-[var(--color-mint)]">
              {pick(g.label, locale)}
            </h3>
            <ul className="mt-5 space-y-3">
              {g.items.map((item) => (
                <li
                  key={item}
                  data-cursor="hover"
                  className="group flex items-center gap-3 text-[var(--color-mid)] transition-colors duration-300 hover:text-[var(--color-hi)]"
                >
                  <span className="h-px w-4 bg-[var(--color-line-strong)] transition-all duration-500 group-hover:w-7 group-hover:bg-[var(--color-mint)]" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
