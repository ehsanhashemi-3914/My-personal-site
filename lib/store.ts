import { create } from "zustand";

export type Locale = "en" | "fa";

export type SectionId =
  | "hero"
  | "about"
  | "journey"
  | "skills"
  | "projects"
  | "github"
  | "social"
  | "contact";

export type QualityTier = "high" | "medium" | "low";

interface AppState {
  /* i18n */
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;

  /* preloader */
  ready: boolean;
  setReady: (ready: boolean) => void;

  /* navigation */
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;

  /* scroll — updated every frame; read via getState() in hot loops, not via hook */
  scrollProgress: number;
  setScrollProgress: (value: number) => void;

  /* rendering */
  qualityTier: QualityTier;
  setQualityTier: (tier: QualityTier) => void;
}

export const useStore = create<AppState>((set, get) => ({
  locale: "en",
  setLocale: (locale) => set({ locale }),
  toggleLocale: () => set({ locale: get().locale === "en" ? "fa" : "en" }),

  ready: false,
  setReady: (ready) => set({ ready }),

  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  toggleMenu: () => set({ menuOpen: !get().menuOpen }),
  activeSection: "hero",
  setActiveSection: (activeSection) => set({ activeSection }),

  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),

  qualityTier: "high",
  setQualityTier: (qualityTier) => set({ qualityTier }),
}));
