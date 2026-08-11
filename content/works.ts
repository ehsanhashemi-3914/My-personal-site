/**
 * WORK SAMPLES (نمونه‌کار)
 *
 * Each entry drives a thumbnail in the grid; clicking it opens the detail view
 * with the full description and price.
 *
 * To add a real sample:
 *   1. Drop the image in  public/works/<slug>.jpg  (landscape, ~1200×750)
 *   2. Set `thumbnail: "/works/<slug>.jpg"`
 *   3. Fill in title, description and price in both locales
 *
 * Until an image exists, leave `thumbnail` undefined — the card falls back to a
 * generated gradient using `accent`, so the layout never breaks.
 */
export interface Work {
  slug: string;
  title: { en: string; fa: string };
  year: string;
  /** Short line shown on the card under the title. */
  summary: { en: string; fa: string };
  /** Full description shown in the detail view. */
  description: { en: string; fa: string };
  /** Localised price string — write it exactly as it should appear. */
  price: { en: string; fa: string };
  tags: string[];
  thumbnail?: string;
  link?: string;
  /** Fallback gradient while there is no thumbnail. */
  accent: [string, string];
}

export const works: Work[] = [
  {
    slug: "sample-one",
    title: { en: "Work sample one", fa: "نمونه‌کار یک" },
    year: "1404",
    summary: {
      en: "Replace this with a one-line description of the piece.",
      fa: "این را با توضیح یک‌خطی نمونه‌کار جایگزین کنید.",
    },
    description: {
      en: "The long description goes here: what the brief was, what you made, which tools you used, and what the result was. Two or three sentences is usually enough.",
      fa: "توضیح کامل این‌جا می‌آید: صورت‌مسئله چه بود، چه ساختید، با چه ابزارهایی، و نتیجه چه شد. معمولاً دو تا سه جمله کافی است.",
    },
    price: { en: "From 2,500,000 T", fa: "از ۲٬۵۰۰٬۰۰۰ تومان" },
    tags: ["Design", "Web"],
    accent: ["#6ee7d8", "#8b7cf6"],
  },
  {
    slug: "sample-two",
    title: { en: "Work sample two", fa: "نمونه‌کار دو" },
    year: "1404",
    summary: {
      en: "Replace this with a one-line description of the piece.",
      fa: "این را با توضیح یک‌خطی نمونه‌کار جایگزین کنید.",
    },
    description: {
      en: "The long description goes here: what the brief was, what you made, which tools you used, and what the result was.",
      fa: "توضیح کامل این‌جا می‌آید: صورت‌مسئله چه بود، چه ساختید، با چه ابزارهایی، و نتیجه چه شد.",
    },
    price: { en: "From 1,800,000 T", fa: "از ۱٬۸۰۰٬۰۰۰ تومان" },
    tags: ["Branding"],
    accent: ["#57e0ff", "#6ee7d8"],
  },
  {
    slug: "sample-three",
    title: { en: "Work sample three", fa: "نمونه‌کار سه" },
    year: "1403",
    summary: {
      en: "Replace this with a one-line description of the piece.",
      fa: "این را با توضیح یک‌خطی نمونه‌کار جایگزین کنید.",
    },
    description: {
      en: "The long description goes here: what the brief was, what you made, which tools you used, and what the result was.",
      fa: "توضیح کامل این‌جا می‌آید: صورت‌مسئله چه بود، چه ساختید، با چه ابزارهایی، و نتیجه چه شد.",
    },
    price: { en: "On request", fa: "بر اساس سفارش" },
    tags: ["Motion"],
    accent: ["#f5b981", "#ff8fa3"],
  },
];
