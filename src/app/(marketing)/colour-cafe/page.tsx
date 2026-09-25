import type { Metadata } from "next";
import { colourCafeVisitSteps } from "@/data/colour-cafe";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ImageGallery } from "@/components/shared/image-gallery";
import { VideoPlayer } from "@/components/shared/video-player";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Colour Cafe",
  description:
    "Visit the Olympic Paints Colour Cafe, an immersive design destination for coffee, consultation, colour and home transformation.",
};

const visitSteps = colourCafeVisitSteps;

const galleryItems = [
  {
    src: "/images/colour-cafe/designer.webp",
    alt: "Smiling Olympic Colour Cafe team member in an apron",
    title: "Meet the designers who help translate inspiration into a room direction.",
    subtitle: "Consultation Studio",
    tall: true,
  },
  {
    src: "/images/colour-cafe/choosing-colour.webp",
    alt: "Two visitors holding up a paint colour strip to the light",
    title: "See the feeling before you choose the finish.",
    subtitle: "Future Home",
  },
];

export default function ColourCafePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Colour Cafe" }]} />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-24 px-6 max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="flex items-center gap-3 mb-4 text-xs font-bold tracking-[0.16em] uppercase text-muted">
            <span className="w-6 h-px bg-current" aria-hidden="true" />
            The Centrepiece
          </p>
          <h1>This is where you come to design your future home.</h1>
          <p className="mt-6 text-muted leading-relaxed max-w-xl">
            The Colour Cafe is not a showroom. It is a calm, sensory design destination where coffee, conversation,
            materials and expert colour guidance help you see what your home can become. Enjoy a cup of coffee
            through a design consultation with us.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button href="/contact#enquiry" variant="primary">
              Book a design consultation
            </Button>
            <Button href="#gallery" variant="ghost">
              View the gallery
            </Button>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={1} className="relative aspect-[4/3] rounded-sm overflow-hidden">
          <Image
            src="/images/colour-cafe/cafe-interior.webp"
            alt="Inside the Olympic Colour Cafe, with the illuminated Olympic Paints sign, colour wall and plants"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </ScrollReveal>
      </section>

      <section id="gallery" className="py-24 px-6 max-w-6xl mx-auto" aria-label="Colour Cafe gallery">
        <ImageGallery items={galleryItems} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <ScrollReveal className="p-8 bg-espresso text-cream rounded-sm">
            <p className="flex items-center gap-3 mb-4 text-xs font-bold tracking-[0.16em] uppercase text-olympic-yellow">
              <span className="w-6 h-px bg-current" aria-hidden="true" />
              Book The Visit
            </p>
            <h3 className="text-cream">
              Bring photos, plans, flooring ideas, fabric references or just a feeling. We will help you prepare
              for your appointment.
            </h3>
            <Link
              href="/contact#enquiry"
              className="inline-block mt-4 text-sm font-medium text-olympic-yellow hover:underline"
            >
              Request a visit
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={1} className="relative aspect-[4/3] rounded-sm overflow-hidden">
            <Image
              src="/images/colour-cafe/coffee-consultation.webp"
              alt="A coffee beside a hand fanning through warm paint colour cards"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <SectionHeading eyebrow="Step Inside" eyebrowColor="gold" title="See the Colour Cafe in motion." centered />
          <p className="mt-4 max-w-2xl mx-auto text-muted leading-relaxed">
            A short film through the space &mdash; the light, the materials and the calm of designing your future
            home over a cup of coffee.
          </p>
          <VideoPlayer
            videoId="skkslmRcitc"
            title="Colour Cafe film"
            duration="4 min"
            className="mt-10 max-w-2xl mx-auto"
          />
        </ScrollReveal>
      </section>

      <section className="py-24 px-6 bg-espresso text-cream">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <SectionHeading eyebrow="Your Visit" title="Coffee. Connect. Colour. Create. Transform." centered />
          </ScrollReveal>
          <div className="mt-16 space-y-12">
            {visitSteps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i}>
                <article className="flex gap-8 items-start">
                  <span className="text-olympic-yellow text-sm font-bold shrink-0 mt-1">{step.num}</span>
                  <div>
                    <h3 className="text-cream">{step.title}</h3>
                    <p className="mt-2 text-cream/60 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-24 px-6 max-w-6xl mx-auto">
        <ScrollReveal className="md:order-2">
          <SectionHeading
            eyebrow="Inside The Studio"
            title="Every surface has a role in the story."
            description="Consultations bring together wall colour, flooring, furniture, lighting, cabinetry, textiles and finishes. The result is not a colour chip in isolation, but a room direction you can feel."
          />
          <Link href="/contact#enquiry" className="inline-block mt-4 text-sm font-medium hover:underline">
            Book a design consultation
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={1} className="md:order-1 relative aspect-[4/3] rounded-sm overflow-hidden">
          <Image
            src="/images/colour-cafe/material-wall.webp"
            alt="A visitor browsing the Colour Cafe wall of paint and material samples"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </ScrollReveal>
      </section>

      <section className="py-24 px-6 bg-sage/10 text-center">
        <ScrollReveal className="max-w-2xl mx-auto">
          <p className="flex items-center justify-center gap-3 mb-4 text-xs font-bold tracking-[0.16em] uppercase text-muted">
            <span className="w-6 h-px bg-current" aria-hidden="true" />
            Design Consultation
          </p>
          <h2>Ready to sit with an interior designer?</h2>
          <p className="mt-4 text-muted leading-relaxed">
            Share a few details before your Colour Cafe appointment so your designer arrives prepared, whether you are
            shaping a home, studio, office, store, hospitality space or a custom creative brief.
          </p>
          <Button href="/contact#enquiry" className="mt-8" variant="primary">
            Book a consultation
          </Button>
        </ScrollReveal>
      </section>
    </>
  );
}
