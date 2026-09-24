import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartProvider } from "@/context/cart-context";
import { storeLocations } from "@/data/store-locations";
import "@/styles/globals.css";

const headquarters = storeLocations.find((location) => location.id === "lenasia-hq");

const organizationSchema = {
  "@type": "Organization",
  "@id": "https://olympic-paints.vercel.app/#organization",
  name: "Olympic Paints",
  url: "https://olympicpaints.co.za/",
  logo: "https://olympic-paints.vercel.app/images/logo.png",
  description:
    "A South African colour, lifestyle and home transformation partner with more than 40 years of heritage.",
  ...(headquarters
    ? {
        telephone: headquarters.phone,
        email: headquarters.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: headquarters.address,
          addressLocality: headquarters.city,
          addressRegion: headquarters.province,
          postalCode: headquarters.postalCode,
          addressCountry: "ZA",
        },
      }
    : {}),
};

const colourCafeSchema = {
  "@type": "LocalBusiness",
  "@id": "https://olympic-paints.vercel.app/#colour-cafe",
  name: "Olympic Paints Colour Cafe",
  description:
    "An immersive design destination for colour consultations, material exploration and home transformation guidance.",
  url: "https://olympic-paints.vercel.app/colour-cafe",
  ...(headquarters
    ? {
        telephone: headquarters.phone,
        email: headquarters.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: headquarters.address,
          addressLocality: headquarters.city,
          addressRegion: headquarters.province,
          postalCode: headquarters.postalCode,
          addressCountry: "ZA",
        },
      }
    : { address: { "@type": "PostalAddress", addressCountry: "ZA" } }),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, colourCafeSchema],
};

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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
