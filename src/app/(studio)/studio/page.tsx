import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Explore the Olympic Paints Studio: build a custom colour palette, visualise colours on your walls, or book a design consultation.",
};

const tools = [
  {
    href: "/studio/palette-builder",
    title: "Palette Builder",
    description: "Select and combine Olympic Paints colours to build a custom palette you can save and share.",
    status: "Available now",
    cta: "Build a palette",
  },
  {
    href: "/studio/visualiser",
    title: "Colour Visualiser",
    description: "Upload a photo of your room and preview Olympic paint colours before you commit.",
    status: "Coming soon",
    cta: "Learn more",
  },
  {
    href: "/studio/book",
    title: "Book a Consultation",
    description: "Sit down with an Olympic Paints interior designer at the Colour Cafe.",
    status: "Coming soon",
    cta: "Learn more",
  },
];

export default function StudioPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Studio" }]} />
      <PageHero
        eyebrow="The Studio"
        title="Tools to help you choose with confidence."
        description="From building a custom palette to visualising colour on your walls and booking time with a designer, the Studio is where your project takes shape."
        compact
      />

      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.href} delay={i}>
              <article className="h-full flex flex-col border border-ink/10 rounded-sm p-8">
                <p className="text-xs font-bold tracking-[0.16em] uppercase text-olympic-yellow">{tool.status}</p>
                <h3 className="mt-4">{tool.title}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed flex-1">{tool.description}</p>
                <Button href={tool.href} className="mt-6 w-full" variant="ghost">
                  {tool.cta}
                </Button>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
