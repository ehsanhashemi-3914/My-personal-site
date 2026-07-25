"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { useDict } from "@/lib/i18n/useDict";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { useScrollTo } from "@/lib/hooks/useScrollTo";
import { SECTION_IDS, NAV_SECTIONS } from "@/lib/sections";
import { LangToggle } from "@/components/ui/LangToggle";
import { Monogram } from "@/components/ui/Monogram";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function Nav() {
  const { d } = useDict();
  const active = useStore((s) => s.activeSection);
  const toggleMenu = useStore((s) => s.toggleMenu);
  const scrollTo = useScrollTo();
  const [scrolled, setScrolled] = useState(false);
  useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[75] transition-all duration-500",
        scrolled
          ? "border-b border-[var(--color-line)] bg-[var(--color-ink)]/55 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          data-cursor="hover"
          aria-label={profile.name.en}
        >
          <Monogram />
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_SECTIONS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              data-cursor="hover"
              className={cn(
                "relative text-sm text-[var(--color-lo)] transition-colors duration-300 hover:text-[var(--color-hi)]",
                active === id && "text-[var(--color-hi)]",
              )}
            >
              {d.nav.links[id]}
              {active === id && (
                <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--color-mint)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <LangToggle />
          <button
            onClick={toggleMenu}
            data-cursor="hover"
            aria-label={d.nav.menu}
            className="flex h-9 w-9 items-center justify-center lg:hidden"
          >
            <span className="relative block h-2.5 w-6">
              <span className="absolute left-0 top-0 h-px w-full bg-[var(--color-hi)]" />
              <span className="absolute bottom-0 left-0 h-px w-2/3 bg-[var(--color-hi)]" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
