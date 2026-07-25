import type { Locale } from "@/lib/store";

/**
 * Central UI copy. Section list-data (projects, skills, journey milestones)
 * lives in /content — this holds headings, labels and prose.
 * `en` is the source of truth; `fa` is type-checked to match its shape.
 */
const en = {
  nav: {
    menu: "Menu",
    close: "Close",
    links: {
      hero: "Home",
      about: "About",
      journey: "Journey",
      skills: "Skills",
      projects: "Work",
      github: "GitHub",
      social: "Connect",
      contact: "Contact",
    },
  },
  preloader: {
    loading: "Loading experience",
    enter: "Enter",
  },
  hero: {
    eyebrow: "Creative Developer · Portfolio",
    titleTop: "Building",
    titleBottom: "cinematic web",
    lead: "I design and engineer immersive digital experiences where every scroll moves the camera and every pixel tells a story.",
    scroll: "Scroll to begin",
  },
  about: {
    eyebrow: "About",
    title: "Between design and code",
    body: "I'm a developer who treats the browser like a stage. For years I've been chasing the point where engineering discipline meets cinematic emotion — interfaces that feel alive, react to presence, and stay effortless on every device.",
    body2: "My work lives at the intersection of motion design, real-time 3D and front-end architecture. I care about frame budgets as much as I care about feelings.",
    stats: {
      years: "Years crafting",
      projects: "Projects shipped",
      stack: "Core stack",
    },
  },
  journey: {
    eyebrow: "Journey",
    title: "The path so far",
    lead: "A timeline of the moments that shaped how I build.",
  },
  skills: {
    eyebrow: "Skills",
    title: "The toolkit",
    lead: "A constellation of the technologies I reach for — grouped by the role they play.",
  },
  projects: {
    eyebrow: "Selected work",
    title: "Things I've built",
    lead: "A few projects that capture how I think about experience, performance and detail.",
    viewCode: "Code",
    viewDemo: "Live",
  },
  github: {
    eyebrow: "Open source",
    title: "On GitHub",
    lead: "Where the code lives — repositories, contributions and the languages I write most.",
    repos: "Repositories",
    stars: "Stars",
    commits: "Contributions",
    followers: "Followers",
    visit: "View profile",
  },
  social: {
    eyebrow: "Connect",
    title: "Find me around the web",
    lead: "Signals across the platforms where I share work and ideas.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's build something",
    lead: "Have a project, a role or an idea? Send a signal — I read everything.",
    name: "Your name",
    email: "Email address",
    message: "Tell me about it",
    send: "Send message",
    resume: "Download résumé",
  },
  footer: {
    rights: "All rights reserved.",
    top: "Back to top",
    built: "Designed & built with obsessive detail.",
  },
};

const fa: typeof en = {
  nav: {
    menu: "منو",
    close: "بستن",
    links: {
      hero: "خانه",
      about: "درباره",
      journey: "مسیر",
      skills: "مهارت‌ها",
      projects: "کارها",
      github: "گیت‌هاب",
      social: "ارتباط",
      contact: "تماس",
    },
  },
  preloader: {
    loading: "در حال بارگذاری تجربه",
    enter: "ورود",
  },
  hero: {
    eyebrow: "توسعه‌دهنده‌ی خلاق · نمونه‌کار",
    titleTop: "ساختِ",
    titleBottom: "وبِ سینمایی",
    lead: "من تجربه‌های دیجیتالِ غوطه‌ور طراحی و مهندسی می‌کنم؛ جایی که هر اسکرول دوربین را حرکت می‌دهد و هر پیکسل روایتی می‌گوید.",
    scroll: "برای شروع اسکرول کن",
  },
  about: {
    eyebrow: "درباره",
    title: "میانِ طراحی و کد",
    body: "من توسعه‌دهنده‌ای هستم که مرورگر را مثل یک صحنه می‌بیند. سال‌هاست دنبال نقطه‌ای‌ام که نظمِ مهندسی به احساسِ سینمایی می‌رسد — رابط‌هایی که زنده‌اند، به حضور واکنش می‌دهند و روی هر دستگاهی روان می‌مانند.",
    body2: "کار من در تلاقیِ موشن‌دیزاین، سه‌بعدیِ بلادرنگ و معماریِ فرانت‌اند است. به بودجه‌ی فریم به‌اندازه‌ی احساس اهمیت می‌دهم.",
    stats: {
      years: "سال تجربه",
      projects: "پروژه‌ی منتشرشده",
      stack: "استکِ اصلی",
    },
  },
  journey: {
    eyebrow: "مسیر",
    title: "راهی که آمده‌ام",
    lead: "خط زمانیِ لحظه‌هایی که شکلِ ساختنم را ساختند.",
  },
  skills: {
    eyebrow: "مهارت‌ها",
    title: "جعبه‌ابزار",
    lead: "صورت‌فلکی از فناوری‌هایی که به‌سراغشان می‌روم — بر اساسِ نقشی که بازی می‌کنند.",
  },
  projects: {
    eyebrow: "کارهای منتخب",
    title: "چیزهایی که ساخته‌ام",
    lead: "چند پروژه که نشان می‌دهند چطور به تجربه، پرفورمنس و جزئیات فکر می‌کنم.",
    viewCode: "کد",
    viewDemo: "دمو",
  },
  github: {
    eyebrow: "متن‌باز",
    title: "در گیت‌هاب",
    lead: "جایی که کد زندگی می‌کند — ریپازیتوری‌ها، مشارکت‌ها و زبان‌هایی که بیشتر می‌نویسم.",
    repos: "ریپازیتوری",
    stars: "ستاره",
    commits: "مشارکت",
    followers: "دنبال‌کننده",
    visit: "دیدنِ پروفایل",
  },
  social: {
    eyebrow: "ارتباط",
    title: "من را در وب پیدا کن",
    lead: "سیگنال‌هایی در پلتفرم‌هایی که کار و ایده‌هایم را در آن‌ها به‌اشتراک می‌گذارم.",
  },
  contact: {
    eyebrow: "تماس",
    title: "بیا چیزی بسازیم",
    lead: "پروژه، موقعیت شغلی یا ایده‌ای داری؟ یک سیگنال بفرست — همه را می‌خوانم.",
    name: "نامِ شما",
    email: "آدرسِ ایمیل",
    message: "برایم بگو",
    send: "ارسالِ پیام",
    resume: "دانلودِ رزومه",
  },
  footer: {
    rights: "همه‌ی حقوق محفوظ است.",
    top: "بازگشت به بالا",
    built: "طراحی و ساخته‌شده با وسواسِ جزئیات.",
  },
};

export const dictionaries: Record<Locale, typeof en> = { en, fa };
export type Dictionary = typeof en;
