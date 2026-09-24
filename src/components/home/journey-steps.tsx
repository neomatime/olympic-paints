import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  { num: "01", title: "Coffee", desc: "Arrive, settle in and begin with a conversation instead of a catalogue." },
  { num: "02", title: "Connect", desc: "Share your home, your light, your textures and the feeling you want." },
  {
    num: "03",
    title: "Colour",
    desc: "Explore palettes in context with flooring, furniture, lighting and materials.",
  },
  {
    num: "04",
    title: "Create",
    desc: "Build a visual direction with feel boards, finishes and room-by-room thinking.",
  },
  { num: "05", title: "Transform", desc: "Leave with confidence, clarity and a path to a more beautiful home." },
];

export function JourneySteps() {
  return (
    <section className="journey-section py-24 px-6 bg-espresso text-cream">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Guided Experience"
            eyebrowColor="gold"
            title="Your future home, designed in five calm steps."
            centered
          />
        </ScrollReveal>
        <div className="mt-16 space-y-12">
          {steps.map((step, i) => (
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
  );
}
