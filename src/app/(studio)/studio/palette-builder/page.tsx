import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PaletteBuilder } from "@/components/studio/palette-builder";

export const metadata: Metadata = {
  title: "Palette Builder",
  description: "Build a custom Olympic Paints colour palette, preview combinations, and bring it to your Colour Cafe consultation.",
};

export default function PaletteBuilderPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Studio", href: "/studio" }, { label: "Palette Builder" }]} />
      <PageHero
        eyebrow="Build Your Palette"
        title="Combine colours until they feel right."
        description="Select up to five Olympic Paints colours, preview them side by side, and take your custom palette with you."
        compact
      />

      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <PaletteBuilder />
      </section>
    </>
  );
}
