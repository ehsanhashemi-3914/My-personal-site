import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Newsreader, Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/content/profile";

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
  "Immersive, cinematic portfolio of a creative developer building real-time 3D and motion-driven web experiences.";

export const metadata: Metadata = {
  title: { default: title, template: `%s — ${profile.name.en}` },
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
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
        <Providers>
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
