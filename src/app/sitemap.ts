import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { collections } from "@/data/collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://olympic-paints.vercel.app";

  const staticPages = [
    "", "/our-story", "/colour-cafe", "/contact", "/find-a-store",
    "/products", "/collections", "/inspiration", "/studio",
    "/studio/palette-builder", "/privacy", "/terms", "/returns", "/shipping",
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));

  const productPages = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  const collectionPages = collections.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...productPages, ...collectionPages];
}
