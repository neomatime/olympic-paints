"use client";

import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { storeLocations } from "@/data/store-locations";

const guideSteps = [
  {
    title: "Choose your project stage",
    desc: "Starting fresh, refreshing one room, preparing a renovation, or needing colour confidence before you commit.",
  },
  {
    title: "Share your room goals",
    desc: "Tell us about light, mood, surfaces, timing and whether you already have flooring or furniture decisions in place.",
  },
  {
    title: "Match with the right support",
    desc: "Book a design consultation, plan a Colour Cafe visit, or request product and store guidance.",
  },
];

const spaceOptions = [
  { value: "living-room", label: "Living room" },
  { value: "retail-space", label: "Retail space" },
  { value: "office-studio", label: "Office or studio" },
  { value: "exterior", label: "Exterior" },
  { value: "full-home", label: "Full home" },
];

const hq = storeLocations[0];

export function ContactPageClient() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <PageHero
        eyebrow="Start With A Conversation"
        title="Tell us about the home you want to create."
        description="Whether you are planning a home, workspace, studio, store, hospitality space or something completely custom, we will guide you toward the right consultation, store support or Colour Cafe visit."
        compact
      />

      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Guided Booking"
            eyebrowColor="gold"
            title="From idea to appointment, without the overwhelm."
            description="Answer a few simple prompts and we will help route you to the best next step: a Colour Cafe visit, a versatile design consultation, or practical project support."
            centered
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
          {guideSteps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i}>
              <article>
                <span className="text-xs text-espresso font-bold">{i + 1}</span>
                <h3 className="mt-2">{step.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{step.desc}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section id="atlas" className="py-24 px-6 bg-espresso text-cream">
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <p className="flex items-center justify-center gap-3 mb-4 text-xs font-bold tracking-[0.16em] uppercase text-olympic-yellow">
            <span className="w-6 h-px bg-current" aria-hidden="true" />
            Meet Atlas
          </p>
          <h2 className="text-cream">Your colour consultation guide.</h2>
          <p className="mt-4 text-cream/70 leading-relaxed max-w-xl mx-auto">
            Atlas helps you prepare for a design consultation by collecting the details a designer needs: space type,
            style direction, timeline, location and preferred appointment format. Atlas is arriving soon &mdash; for
            now, start your request below and our team will follow up directly.
          </p>
          <Button
            href="mailto:info@olympicpaints.co.za?subject=Design%20consultation%20request"
            className="mt-8"
            variant="primary"
          >
            Start with Atlas
          </Button>
        </ScrollReveal>
      </section>

      <section className="py-24 px-6 max-w-2xl mx-auto">
        <ScrollReveal>
          <SectionHeading eyebrow="Send A Message" title="Reach the Olympic Paints team directly." />
          <form
            className="mt-10 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="Full name" name="name" autoComplete="name" required />
              <Input label="Email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="Phone" name="phone" type="tel" autoComplete="tel" />
              <Select label="Space we're transforming" name="space" options={spaceOptions} />
            </div>
            <Textarea
              label="Tell us about your project"
              name="message"
              placeholder="Share your light, style direction, surfaces, timeline and location."
              required
            />
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              Send message
            </Button>
          </form>
        </ScrollReveal>
      </section>

      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal>
            <article className="p-8 border border-ink/10 rounded-sm h-full">
              <h2>Colour Cafe visits</h2>
              <p className="mt-3 text-muted text-sm leading-relaxed">
                Come for coffee, guidance and an immersive look at colour, materials and room direction.
              </p>
              <Link href="/colour-cafe" className="inline-block mt-4 text-sm font-medium hover:underline">
                Explore the experience
              </Link>
            </article>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <article className="p-8 border border-ink/10 rounded-sm h-full">
              <h2>Design consultations</h2>
              <p className="mt-3 text-muted text-sm leading-relaxed">
                Atlas helps gather the right details so a specialist can guide your palette, finishes and next steps.
              </p>
              <Link href="#atlas" className="inline-block mt-4 text-sm font-medium hover:underline">
                Start with Atlas
              </Link>
            </article>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <article className="p-8 border border-ink/10 rounded-sm h-full">
              <h2>Store support</h2>
              <p className="mt-3 text-muted text-sm leading-relaxed">
                Need practical help with finishes, quantities or your nearest partner location? Call{" "}
                <a href={`tel:${hq.phone.replace(/[^\d+]/g, "")}`} className="underline">
                  {hq.phone}
                </a>
                .
              </p>
              <Link href="/find-a-store" className="inline-block mt-4 text-sm font-medium hover:underline">
                Find support
              </Link>
            </article>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
