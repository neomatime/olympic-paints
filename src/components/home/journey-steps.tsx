import Image from "next/image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  {
    num: "01",
    title: "Coffee",
    desc: "Arrive, settle in and begin with a conversation instead of a catalogue.",
    image: "/images/home/coffee.webp",
    alt: "A barista pouring milk into a Colour Cafe coffee cup",
  },
  {
    num: "02",
    title: "Connect",
    desc: "Share your home, your light, your textures and the feeling you want.",
    image: "/images/home/connect.webp",
    alt: "A guest at the Colour Cafe counter looking through a design book",
  },
  {
    num: "03",
    title: "Colour",
    desc: "Explore palettes in context with flooring, furniture, lighting and materials.",
    image: "/images/home/colour.webp",
    alt: "Two visitors holding a paint colour strip up to the light",
  },
  {
    num: "04",
    title: "Create",
    desc: "Build a visual direction with feel boards, finishes and room-by-room thinking.",
    image: "/images/home/create.webp",
    alt: "A stack of interior design magazines on a Colour Cafe table",
  },
  {
    num: "05",
    title: "Transform",
    desc: "Leave with confidence, clarity and a path to a more beautiful home.",
    image: "/images/home/transform.webp",
    alt: "The light-filled Colour Cafe with its colour wall, plants and seating",
  },
];

export function JourneySteps() {
  return (
    <section className="journey-section py-24 px-6 bg-espresso text-cream">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Guided Experience"
            eyebrowColor="gold-on-dark"
            title="Your future home, designed in five calm steps."
            centered
          />
        </ScrollReveal>
        <div className="mt-16 space-y-12">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i}>
              <article className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
                <div className="flex flex-1 gap-8 items-start">
                  <span className="text-olympic-yellow text-sm font-bold shrink-0 mt-1">{step.num}</span>
                  <div>
                    <h3 className="text-cream">{step.title}</h3>
                    <p className="mt-2 text-cream/60 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-sm sm:w-56">
                  <Image src={step.image} alt={step.alt} fill sizes="(min-width: 640px) 224px, 100vw" className="object-cover" />
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
