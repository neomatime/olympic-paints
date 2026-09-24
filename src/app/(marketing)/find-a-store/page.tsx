import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Button } from "@/components/ui/button";
import { storeLocations } from "@/data/store-locations";

export const metadata: Metadata = {
  title: "Find a Store",
  description:
    "Find Olympic Paints Colour Cafe branches for colour guidance, design consultations and immersive palette experiences.",
};

export default function FindAStorePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Find a Store" }]} />
      <PageHero
        eyebrow="Colour Cafe Branches"
        title="Find your nearest Colour Cafe."
        description="Visit a Colour Cafe to meet Olympic Paints designers, explore colour in context and begin shaping a home, workspace, retail space or custom design brief with confidence."
        compact
      />

      <section className="py-24 px-6 max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Visit Us"
            eyebrowColor="gold"
            title="Choose a branch, then get in touch to book your design consultation."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {storeLocations.map((store, i) => (
            <ScrollReveal key={store.id} delay={i}>
              <article className="p-8 border border-ink/10 rounded-sm h-full flex flex-col">
                <span className="inline-block w-fit mb-4 px-3 py-1 text-xs font-bold uppercase tracking-wide bg-olympic-yellow/20 text-espresso rounded-sm">
                  Now Open
                </span>
                <h2>{store.name}</h2>
                <dl className="mt-4 space-y-2 text-sm text-muted">
                  <div>
                    <dt className="font-medium text-ink/70">Address</dt>
                    <dd>
                      {store.address}, {store.city}, {store.province} {store.postalCode}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink/70">Phone</dt>
                    <dd>
                      <a href={`tel:${store.phone.replace(/[^\d+]/g, "")}`} className="hover:underline">
                        {store.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink/70">Email</dt>
                    <dd>
                      <a href={`mailto:${store.email}`} className="hover:underline">
                        {store.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink/70">Hours</dt>
                    <dd>
                      <ul className="space-y-0.5">
                        {store.hours.map((h) => (
                          <li key={h.day}>
                            {h.day}: {h.open === "Closed" ? "Closed" : `${h.open} - ${h.close}`}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 flex flex-col gap-3">
                  <Link href="/contact">
                    <Button variant="primary" className="w-full">
                      Book a consultation
                    </Button>
                  </Link>
                  <Link href="/colour-cafe" className="text-sm font-medium text-center hover:underline">
                    Explore the Colour Cafe
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeading eyebrow="Headquarters" title="Find us on the map." />
          <div className="mt-8 aspect-video rounded-sm overflow-hidden">
            <iframe
              title="Olympic Paints Headquarters, Lenasia map"
              src={`https://www.google.com/maps?q=${storeLocations[0].coordinates.lat},${storeLocations[0].coordinates.lng}&z=15&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </ScrollReveal>
      </section>

      <section className="py-24 px-6 bg-sage/10 text-center">
        <ScrollReveal className="max-w-2xl mx-auto">
          <h2>Not sure which branch to visit?</h2>
          <p className="mt-4 text-muted leading-relaxed">
            Get in touch and we will help you choose the right Colour Cafe, prepare your brief and route your project
            to the right design support.
          </p>
          <Link href="/contact#atlas" className="inline-block mt-8">
            <Button variant="primary">Start with Atlas</Button>
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
