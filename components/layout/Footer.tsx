"use client";

import { useDict, pick } from "@/lib/i18n/useDict";
import { useScrollTo } from "@/lib/hooks/useScrollTo";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  const { d, locale } = useDict();
  const scrollTo = useScrollTo();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[var(--color-line)] py-14">
      <div className="container-x flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-md">
            <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-hi)]">
              {pick(profile.name, locale)}
            </p>
            <p className="mt-2 text-sm text-[var(--color-lo)]">{d.footer.built}</p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                data-cursor="hover"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] text-lg text-[var(--color-mid)] transition-colors duration-300 hover:border-[var(--color-mint)]/50 hover:text-[var(--color-mint)]"
              >
                <SocialIcon id={s.id} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-lo)] md:flex-row md:items-center">
          <p>
            © {year} {pick(profile.name, locale)}. {d.footer.rights}
          </p>
          <button
            onClick={() => scrollTo("hero")}
            data-cursor="hover"
            className="transition-colors duration-300 hover:text-[var(--color-hi)]"
          >
            ↑ {d.footer.top}
          </button>
        </div>
      </div>
    </footer>
  );
}
