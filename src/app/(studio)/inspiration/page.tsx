import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { InspirationGallery } from "@/components/studio/inspiration-gallery";
import { inspirations } from "@/data/inspiration";

export const metadata: Metadata = {
  title: "Inspiration",
  description:
    "Browse real rooms transformed with Olympic Paints colours, from living rooms and bedrooms to kitchens, bathrooms, kids rooms and outdoor spaces.",
};

export default function InspirationPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Inspiration" }]} />
      <PageHero
        eyebrow="Inspiration"
        title="Rooms transformed by colour."
        description="Explore real spaces designed with Olympic Paints, filtered by room type, complete with the colours and designers behind each one."
        compact
      />

      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <InspirationGallery inspirations={inspirations} />
      </section>
    </>
  );
}
