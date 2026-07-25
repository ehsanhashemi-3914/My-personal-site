"use client";

import { useStore, type Locale } from "@/lib/store";
import { dictionaries, type Dictionary } from "./dictionaries";

export type Dir = "ltr" | "rtl";

export function dirFor(locale: Locale): Dir {
  return locale === "fa" ? "rtl" : "ltr";
}

/**
 * Access localized copy + current direction. The whole dictionary object is
 * returned (fully typed) so components read `d.hero.title` directly.
 */
export function useDict(): { d: Dictionary; locale: Locale; dir: Dir } {
  const locale = useStore((s) => s.locale);
  return { d: dictionaries[locale], locale, dir: dirFor(locale) };
}

/** For picking a localized field out of content data: `pick(item.title, locale)`. */
export function pick(field: { en: string; fa: string }, locale: Locale) {
  return field[locale];
}
