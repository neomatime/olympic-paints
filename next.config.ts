import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async redirects() {
    return [
      // Renamed routes: old static-site slug -> new App Router path.
      { source: "/colour-collections", destination: "/collections", permanent: true },
      { source: "/colour-collections.html", destination: "/collections", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/privacy-policy.html", destination: "/privacy", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      // Every other old static page kept the same slug, just dropped the
      // extension: /products.html -> /products, /contact.html -> /contact, etc.
      { source: "/checkout.html", destination: "/checkout", permanent: true },
      { source: "/colour-cafe.html", destination: "/colour-cafe", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/find-a-store.html", destination: "/find-a-store", permanent: true },
      { source: "/inspiration.html", destination: "/inspiration", permanent: true },
      { source: "/our-story.html", destination: "/our-story", permanent: true },
      { source: "/products.html", destination: "/products", permanent: true },
      { source: "/returns.html", destination: "/returns", permanent: true },
      { source: "/shipping.html", destination: "/shipping", permanent: true },
      { source: "/terms.html", destination: "/terms", permanent: true },
      // Catch-all for any other *.html path that matches a live route name
      // (e.g. bookmarks/search results not covered above).
      { source: "/:page.html", destination: "/:page", permanent: true },
    ];
  },
};

export default nextConfig;
