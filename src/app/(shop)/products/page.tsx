import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ProductGrid } from "@/components/shop/product-grid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Shop Olympic Paints interior, exterior, specialist and equipment products, from PlatinumPlus finishes to roller kits and sample pots.",
};

export default function ProductsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
      <PageHero
        eyebrow="Shop"
        title="Paint, colour and everything in between."
        description="From PlatinumPlus interior and exterior finishes to specialist coatings, sample pots and application equipment — everything you need for your next project."
        compact
      />

      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <Suspense fallback={<div aria-hidden="true" className="min-h-[40vh]" />}>
          <ProductGrid products={products} />
        </Suspense>
      </section>
    </>
  );
}
