"use client";

import { useDict } from "@/lib/i18n/useDict";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { socials } from "@/content/socials";

export function Social() {
  const { d } = useDict();

  return (
    <SectionShell
      id="social"
      index="06"
      eyebrow={d.social.eyebrow}
      title={d.social.title}
      lead={d.social.lead}
    >
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {socials.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.06}>
            <MagneticButton
              href={s.url}
              target={s.id === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              ariaLabel={s.label}
              strength={0.18}
              className="glass group w-full flex-col items-start gap-6 rounded-[var(--radius-lg)] p-7 transition-colors duration-500 hover:border-[var(--color-mint)]/40"
            >
              <span className="text-2xl text-[var(--color-mid)] transition-colors duration-500 group-hover:text-[var(--color-mint)]">
                <SocialIcon id={s.id} />
              </span>
              <span className="text-start">
                <span className="block font-[family-name:var(--font-display)] text-lg text-[var(--color-hi)]">
                  {s.label}
                </span>
                <span className="mt-1 block text-sm text-[var(--color-lo)]">
                  {s.handle}
                </span>
              </span>
            </MagneticButton>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
