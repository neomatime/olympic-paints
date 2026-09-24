import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { StatsStrip } from "@/components/home/stats-strip";
import { CafePrimer } from "@/components/home/cafe-primer";
import { DiscoverySection } from "@/components/home/discovery-section";
import { JourneySteps } from "@/components/home/journey-steps";

export const metadata: Metadata = {
  title: "Olympic Paints | A World Of Colour Reimagined",
  description:
    "Olympic Paints helps South African homeowners transform spaces through colour, design guidance, curated collections, and the immersive Colour Cafe experience.",
};

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <StatsStrip />
      <CafePrimer />
      <DiscoverySection />
      <JourneySteps />
    </>
  );
}
