"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
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
import { PalettePicker, PALETTE_MAX, paletteSummary } from "@/components/studio/palette-picker";
import type { ColourSwatch } from "@/types";

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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export function ContactPageClient() {
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [palette, setPalette] = useState<ColourSwatch[]>([]);
  const [sentPalette, setSentPalette] = useState<ColourSwatch[]>([]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: ContactFormErrors = {};
    if (!name) nextErrors.name = "Please tell us your name.";
    if (!email) {
      nextErrors.email = "Please share an email address.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!message) nextErrors.message = "Let us know a little about your project.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      // Phase 1: mocked submission — no message is actually sent. The palette travels
      // with the contact details in the form data (the "palette" field).
      setSentPalette(palette);
      setSubmitted(true);
    }
  }

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <PageHero
        eyebrow="Start With A Conversation"
        title="Tell us about the home you want to create."
        description="Whether you are planning a home, workspace, studio, store, hospitality space or something completely custom, we will guide you toward the right consultation, store support or Colour Cafe visit."
        backgroundImage="/images/contact/hero.webp"
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

      <section id="enquiry" className="py-24 px-6 max-w-2xl mx-auto">
        <ScrollReveal>
          <SectionHeading eyebrow="Send A Message" title="Reach the Olympic Paints team directly." />
          {submitted ? (
            <div role="status" className="mt-10 p-8 border border-ink/10 rounded-sm text-center">
              <h3>Thanks for reaching out.</h3>
              {sentPalette.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-ink/80">Your palette</p>
                  <ul className="mt-3 flex flex-wrap justify-center gap-4" aria-label="Palette sent with your message">
                    {sentPalette.map((colour) => (
                      <li key={colour.id} className="flex flex-col items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="h-10 w-10 rounded-full border border-ink/10"
                          style={{ backgroundColor: colour.hex }}
                        />
                        <span className="text-xs text-ink/80">{colour.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="mt-3 text-muted leading-relaxed">
                This is a Phase 1 preview, so your message wasn&apos;t actually sent — we&apos;ll wire up real delivery
                in Phase 2. In the meantime, call{" "}
                <a href={`tel:${hq.phone.replace(/[^\d+]/g, "")}`} className="underline">
                  {hq.phone}
                </a>{" "}
                or email{" "}
                <a href="mailto:info@olympicpaints.co.za" className="underline">
                  info@olympicpaints.co.za
                </a>
                .
              </p>
              <Button
                type="button"
                variant="ghost"
                className="mt-6"
                onClick={() => {
                  setSubmitted(false);
                  setPalette([]);
                  setSentPalette([]);
                }}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form className="mt-10 space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input label="Full name" name="name" autoComplete="name" required error={errors.name} />
                <Input label="Email" name="email" type="email" autoComplete="email" required error={errors.email} />
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
                error={errors.message}
              />
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-ink/70">
                  Build a colour palette <span className="font-normal text-muted">(optional)</span>
                </legend>
                <p className="text-sm text-muted">
                  Pick up to {PALETTE_MAX} colours you are drawn to. We will send them to our team with your message so
                  your consultation starts from your palette.
                </p>
                <PalettePicker value={palette} onChange={setPalette} />
                <input type="hidden" name="palette" value={paletteSummary(palette)} />
              </fieldset>
              <Button type="submit" variant="primary" className="w-full sm:w-auto">
                Send message
              </Button>
            </form>
          )}
        </ScrollReveal>
      </section>

      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal>
            <article className="border border-ink/10 rounded-sm h-full overflow-hidden">
              <div className="relative aspect-[16/9] bg-paper">
                <Image src="/images/contact/cafe-visits.webp" alt="Stacked Olympic Colour Cafe coffee cups" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-8">
                <h2 className="text-2xl md:text-xl lg:text-2xl leading-tight">Colour Cafe visits</h2>
                <p className="mt-3 text-muted text-sm leading-relaxed">
                  Come for coffee, guidance and an immersive look at colour, materials and room direction.
                </p>
                <Link href="/colour-cafe" className="inline-block mt-4 text-sm font-medium hover:underline">
                  Explore the experience
                </Link>
              </div>
            </article>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <article className="border border-ink/10 rounded-sm h-full overflow-hidden">
              <div className="relative aspect-[16/9] bg-paper">
                <Image src="/images/contact/consultations.webp" alt="A visitor browsing the Colour Cafe swatch wall with a designer" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-8">
                <h2 className="text-2xl md:text-xl lg:text-2xl leading-tight">Design consultations</h2>
                <p className="mt-3 text-muted text-sm leading-relaxed">
                  Share your space, style direction and timeline so a specialist can guide your palette, finishes and
                  next steps.
                </p>
                <Link href="#enquiry" className="inline-block mt-4 text-sm font-medium hover:underline">
                  Request a consultation
                </Link>
              </div>
            </article>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <article className="border border-ink/10 rounded-sm h-full overflow-hidden">
              <div className="relative aspect-[16/9] bg-paper">
                <Image src="/images/contact/store-support.webp" alt="Colour sample tiles with Olympic Paints product tags" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-8">
                <h2 className="text-2xl md:text-xl lg:text-2xl leading-tight">Store support</h2>
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
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
