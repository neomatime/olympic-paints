import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartProvider } from "@/context/cart-context";
import "@/styles/globals.css";

const outfit = Outfit({
  variable: "--font-family-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Olympic Paints | A World Of Colour Reimagined",
    template: "%s | Olympic Paints",
  },
  description:
    "Olympic Paints helps South African homeowners transform spaces through colour, design guidance, curated collections, and the immersive Colour Cafe experience.",
  metadataBase: new URL("https://olympic-paints.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Olympic Paints",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <CartProvider>
          <SkipLink />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
