"use client";

import { useEffect } from "react";
import { useStore, type Locale } from "@/lib/store";
import { dirFor } from "@/lib/i18n/useDict";

const KEY = "site-locale";

/** Persists the locale and reflects it onto <html lang/dir/data-locale>. */
export function LocaleSync() {
  const locale = useStore((s) => s.locale);
  const setLocale = useStore((s) => s.setLocale);

  // Read the stored preference once, after mount (keeps SSR === first client render).
  useEffect(() => {
    const stored = localStorage.getItem(KEY) as Locale | null;
    if (stored === "en" || stored === "fa") setLocale(stored);
  }, [setLocale]);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = dirFor(locale);
    html.setAttribute("data-locale", locale);
    localStorage.setItem(KEY, locale);
  }, [locale]);

  return null;
}
