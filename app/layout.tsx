import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Newsreader, Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { siteUrl } from "@/lib/site";

/**
 * Anthropic Serif itself is a proprietary, unlicensed-for-public-use family.
 * These two carry the same warm, high-contrast editorial serif character:
 * Instrument Serif for cinematic display sizes, Newsreader for running text.
 */
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display-latin",
  display: "swap",
});

const body = Newsreader({
  subsets: ["latin"],
  variable: "--font-body-latin",
  display: "swap",
});

const persian = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-fa-family",
  display: "swap",
});

const title = `${profile.name.en} — ${profile.role.en}`;
const description =
  "Full-stack developer building complete web products — from the backend that runs them to the interface people feel. Portfolio, work samples and contact.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${profile.name.en}` },
  description,
  keywords: [
    "full-stack developer",
    "frontend developer",
    "backend developer",
    "Next.js",
    "React",
    "Mashhad",
    profile.name.en,
  ],
  authors: [{ name: profile.name.en }],
  creator: profile.name.en,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    siteName: profile.name.en,
    locale: "en_US",
    alternateLocale: "fa_IR",
  },
  twitter: { card: "summary_large_image", title, description },
};

/** Structured data so search engines understand who this page is about. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name.en,
  alternateName: profile.name.fa,
  jobTitle: profile.role.en,
  email: `mailto:${profile.email}`,
  telephone: profile.phone.tel,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Mashhad", addressCountry: "IR" },
  sameAs: socials
    .filter((s) => s.id !== "email" && s.id !== "phone")
    .map((s) => s.url),
};

export const viewport: Viewport = {
  themeColor: "#05060b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-locale="en"
      className={`${display.variable} ${body.variable} ${persian.variable}`}
      suppressHydrationWarning
    >
      <body className="grain antialiased">
        <script
          type="application/ld+json"
          // Serialised from our own constant — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
