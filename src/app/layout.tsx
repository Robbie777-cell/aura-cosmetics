import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: "AURA Cosmetics | Belleza que Transforma",
    template: "%s | AURA Cosmetics",
  },
  description: "Descubre tu AURA. Cosméticos de lujo y marcas premium en Colombia. Charlotte Tilbury, NARS, MAC, Fenty Beauty y más.",
  keywords: ["cosméticos", "maquillaje", "belleza", "Colombia", "Charlotte Tilbury", "NARS", "MAC", "Fenty Beauty"],
  authors: [{ name: "Carolina Macías", url: "https://auracosmetics.co" }],
  creator: "AURA Cosmetics",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://auracosmetics.co",
    siteName: "AURA Cosmetics",
    title: "AURA Cosmetics | Belleza que Transforma",
    description: "Descubre tu AURA. Cosméticos de lujo en Colombia.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AURA Cosmetics",
  },
};

export const viewport: Viewport = {
  themeColor: "#C9A96E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              fontFamily: "var(--font-dm-sans, DM Sans, sans-serif)",
            },
          }}
        />
      </body>
    </html>
  );
}
