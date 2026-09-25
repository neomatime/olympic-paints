import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { collections } from "@/data/collections";

export const metadata: Metadata = {
  title: "Colour Collections",
  description:
    "Explore Olympic Paints curated colour collections, including the 2026 Colour of the Year, Inspiring Optimism.",
};

export default function CollectionsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Collections" }]} />
      <PageHero
        eyebrow="Colour Collections"
        title="Curated palettes for every mood and room."
        description="Each collection brings together colours designed to work in harmony, from the 2026 Colour of the Year to gallery whites and graphic accents."
        backgroundImage="/images/collections/hero.webp"
        backgroundPosition="75% center"
        compact
      />

      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, i) => (
            <ScrollReveal key={collection.id} delay={i}>
              <Link href={`/collections/${collection.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4 bg-paper">
                  <Image
                    src={collection.coverImage}
                    alt={collection.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex gap-1.5 mb-2">
                  {collection.colours.slice(0, 5).map((c) => (
                    <span
                      key={c.id}
                      className="w-4 h-4 rounded-full border border-ink/10"
                      style={{ backgroundColor: c.hex }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <h2 className="text-lg">{collection.name}</h2>
                <p className="text-sm text-muted mt-1 leading-relaxed">{collection.description}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
