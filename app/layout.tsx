import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/shared/theme/ThemeRegistry";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import CartDrawer from "@/modules/cart/components/CartDrawer";
import FloatingWhatsAppButton from "@/shared/components/FloatingWhatsAppButton";
import { Toaster } from "sonner";
import { BRAND } from "@/shared/constants/contact";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.NAME} — Tejidos Artesanales`,
    template: `%s | ${BRAND.NAME}`,
  },
  description: BRAND.DESCRIPTION,
  keywords: ["crochet", "tejidos", "artesanal", "costa rica", "amigurumi", "bolsos tejidos"],
  openGraph: {
    siteName: BRAND.NAME,
    locale: "es_CR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeRegistry>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingWhatsAppButton />
          <Toaster richColors position="top-right" />
        </ThemeRegistry>
      </body>
    </html>
  );
}
