import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import { collections } from "@/data/collections";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return {};
  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) notFound();

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: collection.name },
        ]}
      />
      <PageHero eyebrow={`${collection.year} Collection`} title={collection.name} description={collection.description} backgroundImage={collection.coverImage} compact />

      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading eyebrow="The Palette" eyebrowColor="gold" title="Colours in this collection." />
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
          {collection.colours.map((colour, i) => (
            <ScrollReveal key={colour.id} delay={i} className="text-center">
              <div
                className="aspect-square rounded-sm mb-3"
                style={{ backgroundColor: colour.hex }}
                aria-hidden="true"
              />
              <p className="text-sm font-medium">{colour.name}</p>
              <p className="text-xs text-muted uppercase">{colour.hex}</p>
            </ScrollReveal>
          ))}
        </div>

        {collection.rooms.length > 0 && (
          <div className="mt-20">
            <ScrollReveal>
              <SectionHeading eyebrow="In the Room" title="See this collection in real spaces." />
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              {collection.rooms.map((room, i) => (
                <ScrollReveal key={room.id} delay={i}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4 bg-paper">
                    <Image src={room.images.after} alt={room.title} fill className="object-cover" />
                  </div>
                  <h3 className="text-lg">{room.title}</h3>
                  {room.designer && <p className="text-sm text-muted mt-1">Designed by {room.designer}</p>}
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <Button href="/products" variant="primary">
            Shop Products in This Palette
          </Button>
        </div>
      </section>
    </>
  );
}
