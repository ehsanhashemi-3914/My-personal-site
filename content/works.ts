import data from "./works.json";

/**
 * WORK SAMPLES (نمونه‌کار)
 *
 * The data itself lives in content/works.json so the local admin editor at
 * /admin can rewrite it safely. Edit that file by hand if you prefer — this
 * module just types it and hands it to the site.
 *
 * To add a sample by hand:
 *   1. Put the image in  public/works/<slug>.jpg  (landscape, ~1200×750)
 *   2. Add an entry with `thumbnail: "/works/<slug>.jpg"`
 *
 * Leaving `thumbnail` out is fine — the card falls back to a gradient built
 * from `accent`, so the layout never breaks.
 */
export interface Work {
  slug: string;
  title: { en: string; fa: string };
  year: string;
  /** One line shown on the card under the title. */
  summary: { en: string; fa: string };
  /** Full text shown in the detail view. */
  description: { en: string; fa: string };
  /** Localised price string — written exactly as it should appear. */
  price: { en: string; fa: string };
  tags: string[];
  thumbnail?: string;
  link?: string;
  /** Fallback gradient used when there is no thumbnail. */
  accent: [string, string];
}

export const works: Work[] = data as Work[];
