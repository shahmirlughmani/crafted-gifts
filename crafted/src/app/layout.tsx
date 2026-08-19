import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Toast } from "@/components/Toast";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { CONFIG } from "@/lib/config";

/* Fonts are self-hosted (no runtime call to Google) — faster and privacy-safe. */
const display = localFont({
  src: [
    { path: "../fonts/playfair-display-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/playfair-display-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/playfair-display-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/playfair-display-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const body = localFont({
  src: [
    { path: "../fonts/manrope-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/manrope-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/manrope-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/manrope-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/manrope-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const script = localFont({
  src: "../fonts/parisienne-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-script",
  display: "swap",
  fallback: ["cursive"],
});

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.brand.url),
  title: {
    default: `${CONFIG.brand.name} — ${CONFIG.brand.tagline}`,
    template: `%s · ${CONFIG.brand.name}`,
  },
  description:
    "Handmade crochet, plushies and curated gift hampers from Islamabad. Build your own basket or choose a ready-made box. Pickup in E-11, delivery nationwide.",
  keywords: [
    "gift hampers Pakistan",
    "crochet gifts Islamabad",
    "custom gift baskets",
    "plushies Pakistan",
    "handmade gifts Rawalpindi",
    "gifts for him",
    "gifts for her",
  ],
  openGraph: {
    type: "website",
    siteName: CONFIG.brand.name,
    title: `${CONFIG.brand.name} — ${CONFIG.brand.tagline}`,
    description:
      "Handmade crochet, plushies and curated gift hampers. Build your own basket, or choose a ready-made box.",
    locale: "en_PK",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1f3324",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${script.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:z-[200] focus:top-3 focus:left-3 focus:rounded-full focus:bg-forest-900 focus:px-5 focus:py-2.5 focus:text-cream-50 focus:text-sm"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <Toast />
          <WhatsAppFab />
        </CartProvider>
      </body>
    </html>
  );
}
