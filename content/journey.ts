export interface Milestone {
  /** Shown as the date label; localised so Persian readers see the Solar Hijri month. */
  year: { en: string; fa: string };
  title: { en: string; fa: string };
  body: { en: string; fa: string };
}

/** Real milestones, dated from the first commits of each project on GitHub. */
export const journey: Milestone[] = [
  {
    year: { en: "Jun 2026", fa: "خرداد ۱۴۰۵" },
    title: { en: "First projects", fa: "اولین پروژه‌ها" },
    body: {
      en: "Started building for the web in earnest — first pages and small browser games, learning by shipping.",
      fa: "ساختن برای وب را جدی شروع کردم؛ اولین صفحه‌ها و بازی‌های کوچکِ مرورگری، یادگیری با ساختن و منتشر کردن.",
    },
  },
  {
    year: { en: "Jul 2026", fa: "تیر ۱۴۰۵" },
    title: { en: "Landing pages & shops", fa: "لندینگ‌ها و فروشگاه‌ها" },
    body: {
      en: "Shipped a run of responsive, animation-rich sites: a restaurant landing, e-commerce storefronts and an AI product page.",
      fa: "مجموعه‌ای از سایت‌های واکنش‌گرا و پرانیمیشن منتشر کردم: لندینگ رستوران، فروشگاه‌های آنلاین و صفحه‌ی یک محصول هوش مصنوعی.",
    },
  },
  {
    year: { en: "Aug 2026", fa: "مرداد ۱۴۰۵" },
    title: { en: "3D, bilingual and AI tools", fa: "سه‌بعدی، دوزبانه و ابزارهای AI" },
    body: {
      en: "Built this 3D bilingual portfolio, a bilingual café site, and an AI tool that turns rough notes into narrated YouTube scripts.",
      fa: "همین پورتفولیوی سه‌بعدی و دوزبانه، سایت دوزبانه‌ی کافه و ابزاری با هوش مصنوعی ساختم که یادداشت خام را به روایت صوتی یوتیوب تبدیل می‌کند.",
    },
  },
  {
    year: { en: "Sep 2026", fa: "مهر ۱۴۰۵" },
    title: { en: "Full products: real-time & admin", fa: "محصولِ کامل: لحظه‌ای و پنل مدیریت" },
    body: {
      en: "Designed two product concepts for Hills Project: a real-time community messenger and a member-matching platform with a full admin panel.",
      fa: "برای پروژه هیلز دو محصول طراحی کردم: یک پیام‌رسانِ لحظه‌ای برای کامیونیتی و یک پلتفرم مچینگ اعضا با پنل مدیریت کامل.",
    },
  },
];
