import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const nastaliq = localFont({
  src: [
    { path: "./fonts/nastaliq-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/nastaliq-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--nf-nastaliq",
  display: "swap",
});

const vibes = localFont({
  src: "./fonts/great-vibes.woff2",
  variable: "--nf-script",
  display: "swap",
});

const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/cormorant-500-italic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--nf-serif",
  display: "swap",
});

const cinzel = localFont({
  src: [
    { path: "./fonts/cinzel-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cinzel-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--nf-caps",
  display: "swap",
});

// On Vercel this resolves to your live URL automatically (used for the WhatsApp preview image).
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

const title = "Dawat Nama · Shah Family";
const description =
  "Mrs & Mr. Mohd Taroof Shah request the pleasure of your company · Mohd Shahid Shah & Tarannum · Mohd Irfan Shah & Afsana Khatoon · 10, 11 & 12 November 2026";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
  // Private family invitation – keep it out of Google search results.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#24070f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nastaliq.variable} ${vibes.variable} ${cormorant.variable} ${cinzel.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
