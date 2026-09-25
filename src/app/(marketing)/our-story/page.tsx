import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ImageGallery } from "@/components/shared/image-gallery";
import { VideoPlayer } from "@/components/shared/video-player";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Button } from "@/components/ui/button";
import { LocalVideo } from "@/components/shared/local-video";
import { LoopingVideo } from "@/components/shared/looping-video";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Discover Olympic Paints' South African heritage and its evolution into a colour, lifestyle and home transformation partner.",
};

const storyPhotos = [
  {
    src: "/images/our-story/consultation.webp",
    alt: "An Olympic Paints designer and a client working through material samples at the Colour Cafe",
    subtitle: "Consultation",
  },
  {
    src: "/images/our-story/colour-wall.webp",
    alt: "Two visitors choosing paint colours together at the Colour Cafe sample wall",
    subtitle: "Choosing Colour",
  },
  {
    src: "/images/our-story/coffee-shelves.webp",
    alt: "Framed Coffee, Connect, Colour and Create prints above the Colour Cafe coffee shelves",
    subtitle: "The Coffee Bar",
  },
  {
    src: "/images/our-story/design-studio.webp",
    alt: "The Colour Cafe consultation desk with warm lit alcoves and a screen",
    subtitle: "Design Studio",
  },
];

const journey = [
  { num: "01", title: "Heritage", desc: "Decades of local knowledge and trust across South African homes." },
  { num: "02", title: "Design", desc: "Colour choices shaped by interiors, materials and lifestyle." },
  { num: "03", title: "Guidance", desc: "Human consultation for confident decisions." },
  { num: "04", title: "Experience", desc: "The Colour Cafe turns exploration into an inspiring visit." },
  { num: "05", title: "Transformation", desc: "Every recommendation serves the final feeling of home." },
];

export default function OurStoryPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Our Story" }]} />
      <PageHero
        eyebrow="More Than 40 Years"
        title="From trusted paint heritage to home transformation partner."
        description="Olympic Paints has grown with South African homes for more than four decades. Today, that heritage becomes something warmer and more human: colour guidance, design confidence and immersive experiences for people creating spaces they love."
        backgroundImage="/images/our-story/hero.webp"
        compact
      />

      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <SectionHeading eyebrow="Inside Olympic Paints" eyebrowColor="gold" title="The HomeMakers film." centered />
          <p className="mt-4 max-w-2xl mx-auto text-muted leading-relaxed">
            Real people and real colour conversations &mdash; a short look at how Olympic Paints helps South Africans
            shape spaces they love.
          </p>
          <LocalVideo
            src="/videos/homemakers.mp4"
            poster="/images/homemakers-poster.jpg"
            alt="Olympic Paints team sharing colour cards with visitors at a branded stand"
            title="Olympic Paints HomeMakers film"
            duration="20 sec"
            className="mt-10 max-w-2xl mx-auto"
          />
        </ScrollReveal>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-24 px-6 max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our Belief"
            title="People do not need paint. They need a beautifully designed home."
            description="Paint is one part of a larger story. We help connect colour to mood, light, furniture, texture, memory and daily life so every decision feels grounded."
          />
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <LoopingVideo
            src="/videos/our-people.mp4"
            poster="/images/our-people-poster.jpg"
            label="The people of Olympic Paints"
          />
        </ScrollReveal>
      </section>

      <section className="py-24 px-6 bg-espresso text-cream">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <SectionHeading
              eyebrow="How We Show Up"
              eyebrowColor="gold-on-dark"
              title="Professional credibility with warm human guidance."
              centered
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            {journey.map((step, i) => (
              <ScrollReveal key={step.num} delay={i}>
                <article>
                  <span className="text-olympic-yellow text-sm font-bold">{step.num}</span>
                  <h3 className="mt-2 text-cream">{step.title}</h3>
                  <p className="mt-2 text-cream/60 text-sm leading-relaxed">{step.desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-6xl mx-auto" aria-label="Olympic Paints in pictures">
        <ScrollReveal>
          <SectionHeading
            eyebrow="In Pictures"
            eyebrowColor="gold"
            title="Moments that shape our story."
            description="People, spaces and the colour work behind Olympic Paints."
          />
          <Button href="/colour-cafe" className="mt-6" variant="secondary">
            Visit the Colour Cafe
          </Button>
        </ScrollReveal>
        <ImageGallery
          className="mt-12"
          items={storyPhotos}
        />
      </section>

      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <SectionHeading eyebrow="Watch" eyebrowColor="gold" title="The 2026 Colour Collection." centered />
          <p className="mt-4 max-w-2xl mx-auto text-muted leading-relaxed">
            A short film on the year&apos;s colour story from Olympic Paints.
          </p>
          <VideoPlayer
            videoId="5Qn0nZdik7w"
            title="Olympic Paints 2026 Colour Collection"
            className="mt-10 max-w-2xl mx-auto"
          />
        </ScrollReveal>
      </section>
    </>
  );
}
