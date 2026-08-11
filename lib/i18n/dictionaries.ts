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
      projects: "Portfolio",
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
    available: "Available for work",
    ctaWork: "See my work",
    ctaContact: "Get in touch",
    facts: {
      based: "Based in",
      focus: "Focus",
      reply: "Reply time",
      replyValue: "Within 24 hours",
    },
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
  works: {
    eyebrow: "Portfolio",
    title: "Work samples",
    lead: "A selection of pieces I've made. Open any one to read the details and its price.",
    view: "View sample",
    close: "Close",
    price: "Price",
    open: "Open",
    order: "Order this",
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
    emailLabel: "Email",
    phoneLabel: "Phone",
    sending: "Sending…",
    sent: "Message sent — I'll reply soon.",
    failed: "Something went wrong. Please try again, or email me directly.",
    tooMany: "Too many messages for now. Please try again later.",
    unconfigured: "The form isn't connected yet — reach me at",
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
      projects: "نمونه‌کار",
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
    available: "آماده‌ی همکاری",
    ctaWork: "دیدنِ نمونه‌کارها",
    ctaContact: "شروعِ گفتگو",
    facts: {
      based: "مستقر در",
      focus: "تمرکز",
      reply: "زمانِ پاسخ",
      replyValue: "کمتر از ۲۴ ساعت",
    },
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
  works: {
    eyebrow: "نمونه‌کار",
    title: "نمونه‌کارهای من",
    lead: "گزیده‌ای از کارهایی که انجام داده‌ام. روی هرکدام بزنید تا توضیحات و قیمتش را ببینید.",
    view: "دیدنِ نمونه‌کار",
    close: "بستن",
    price: "قیمت",
    open: "بازکردن",
    order: "سفارشِ این کار",
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
    emailLabel: "ایمیل",
    phoneLabel: "شماره تماس",
    sending: "در حال ارسال…",
    sent: "پیام ارسال شد — به‌زودی جواب می‌دهم.",
    failed: "مشکلی پیش آمد. دوباره تلاش کنید یا مستقیم ایمیل بزنید.",
    tooMany: "فعلاً پیام‌های زیادی فرستاده شده. کمی بعد دوباره تلاش کنید.",
    unconfigured: "فرم هنوز وصل نیست — از این آدرس در تماس باشید:",
  },
  footer: {
    rights: "همه‌ی حقوق محفوظ است.",
    top: "بازگشت به بالا",
    built: "طراحی و ساخته‌شده با وسواسِ جزئیات.",
  },
};

export const dictionaries: Record<Locale, typeof en> = { en, fa };
export type Dictionary = typeof en;
