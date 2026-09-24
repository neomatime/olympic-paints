import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

const steps = [
  { num: "01", title: "Discover", desc: "Share your space, style, mood and practical needs." },
  { num: "02", title: "Design", desc: "Build a palette with materials, finishes and room direction." },
  { num: "03", title: "Purchase", desc: "Leave with paint and equipment recommendations you can act on." },
];

export function CafePrimer() {
  return (
    <section className="cafe-primer py-24 px-6 max-w-6xl mx-auto" aria-labelledby="cafe-primer-title">
      <ScrollReveal>
        <SectionHeading
          eyebrow="The Olympic Paints Difference"
          title="Colour Cafe turns colour uncertainty into a clear design direction."
          description="It is the signature Olympic Paints experience: a guided consultation where colour specialists and versatile interior designers help you connect palette, finish, materials, light and paint products before you buy."
        />
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" aria-label="Colour Cafe outcomes">
        {steps.map((step, i) => (
          <ScrollReveal key={step.num} delay={i}>
            <article>
              <span className="text-xs text-espresso font-bold">{step.num}</span>
              <h3 className="mt-2">{step.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{step.desc}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal className="flex gap-4 mt-12 items-center">
        <Button href="/colour-cafe" variant="secondary">
          Understand Colour Cafe
        </Button>
        <Link
          href="/contact#enquiry"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-espresso/70 transition-colors"
        >
          Book a consultation →
        </Link>
      </ScrollReveal>
    </section>
  );
}
