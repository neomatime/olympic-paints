import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ProductGrid } from "@/components/shop/product-grid";
import { CategoryTiles } from "@/components/shop/category-tiles";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Shop Olympic Paints samples, enamels, PVA, sealers, primers, multipurpose and general coatings, plus preparation tools.",
};

export default function ProductsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
      <PageHero
        eyebrow="Shop"
        title="Paint, colour and everything in between."
        description="From sample pots and PVA wall paints to enamels, primers, sealers and preparation tools — everything you need for your next project."
        compact
      />

      <section className="pt-16 md:pt-24 px-6 max-w-6xl mx-auto" aria-labelledby="shop-by-category">
        <h2 id="shop-by-category" className="text-3xl md:text-4xl mb-8">
          Shop by category
        </h2>
        <CategoryTiles products={products} />
      </section>

      <section id="shop" className="py-16 md:py-24 px-6 max-w-6xl mx-auto" aria-label="Products">
        <Suspense fallback={<div aria-hidden="true" className="min-h-[40vh]" />}>
          <ProductGrid products={products} />
        </Suspense>
      </section>
    </>
  );
}
