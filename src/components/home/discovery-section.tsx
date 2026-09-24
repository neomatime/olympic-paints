"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const choices = [
  {
    id: "home",
    label: "Home refresh",
    recommendation: "Book a Colour Cafe consultation",
    detail:
      "Bring room photos, natural-light notes and any furniture or flooring references. Atlas will help prepare the brief.",
  },
  {
    id: "retail",
    label: "Retail or hospitality",
    recommendation: "Book a commercial design session",
    detail:
      "Share your brand colours, floor plan and customer journey. Our designers specialise in high-traffic, high-impact spaces.",
  },
  {
    id: "work",
    label: "Office or studio",
    recommendation: "Request a workspace palette",
    detail: "Productivity, calm and brand alignment — we design workspaces that support focus and identity.",
  },
  {
    id: "exterior",
    label: "Exterior update",
    recommendation: "Book an exterior assessment",
    detail:
      "Weather, substrate and street presence all matter. Bring photos and we will recommend the right coating system.",
  },
];

export function DiscoverySection() {
  const [activeId, setActiveId] = useState("home");
  const active = choices.find((c) => c.id === activeId)!;

  return (
    <ScrollReveal>
      <section className="discovery-section py-24 px-6 max-w-6xl mx-auto" aria-labelledby="discovery-title">
        <SectionHeading
          eyebrow="Start Here"
          eyebrowColor="gold"
          title="Find your colour direction before you book."
          description="Choose the closest starting point and we will suggest a consultation focus you can take straight to Atlas."
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3" role="group" aria-label="Choose your project starting point">
            {choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => setActiveId(choice.id)}
                className={cn(
                  "text-left px-5 py-4 rounded-sm border transition-all text-sm",
                  choice.id === activeId
                    ? "border-olympic-yellow bg-yellow-soft/30 font-medium"
                    : "border-ink/10 hover:border-ink/20"
                )}
                aria-pressed={choice.id === activeId}
              >
                {choice.label}
              </button>
            ))}
          </div>
          <div className="bg-paper rounded-sm p-8">
            <span className="text-xs text-muted uppercase tracking-wider">Recommended next step</span>
            <h3 className="mt-3">{active.recommendation}</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">{active.detail}</p>
            <Link href="/contact#atlas" className="mt-6 inline-block">
              <Button variant="primary">Continue with Atlas</Button>
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
