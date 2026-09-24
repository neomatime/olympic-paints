"use client";

import { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    image:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3BlKpYFaPS2oUsGPVOWIZ9Ewlf6/hf_20260609_175406_c768e03d-e562-4ba7-801e-b7db4975fec8.png",
    label: "cinematic living room",
  },
  {
    image:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3BlKpYFaPS2oUsGPVOWIZ9Ewlf6/hf_20260609_175406_aa7d96f6-4b98-404a-92ca-41fb6f205ae8.png",
    label: "warm interior",
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=82",
    label: "light-filled space",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReduced = useReducedMotion();

  const next = useCallback(() => {
    setActive((i) => (i + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (prefersReduced || paused || slides.length < 2) return;
    const timer = setInterval(next, 5600);
    return () => clearInterval(timer);
  }, [prefersReduced, paused, next]);

  return (
    <section
      className="hero relative h-screen min-h-[600px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
            i === active ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url('${slide.image}')` }}
          aria-hidden={i !== active}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-ink/10" />

      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-16 max-w-5xl">
        <p className="flex items-center gap-3 mb-4 text-xs font-bold tracking-[0.16em] uppercase text-cream/60">
          <span className="w-6 h-px bg-cream/40" aria-hidden="true" />
          2026 Colour of the Year
        </p>
        <h1 className="text-cream">
          Inspiring
          <br />
          <em className="font-serif">Optimism</em>
        </h1>
        <p className="mt-6 text-cream/70 max-w-lg leading-relaxed">
          Colour, creativity and expert guidance brought together at the Colour Cafe so you can choose paint with
          confidence.
        </p>
        <div className="flex gap-4 mt-8">
          <Button href="/contact#atlas" variant="primary">
            Book a Colour Cafe consultation
          </Button>
          <Button href="/collections" variant="outline">
            Explore colours
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10" aria-label="Hero scenes">
        {slides.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              i === active ? "bg-cream scale-125" : "bg-cream/40 hover:bg-cream/60"
            )}
            aria-label={`Show ${slide.label}`}
          />
        ))}
      </div>

      <p className="absolute right-6 bottom-8 text-xs text-cream/30 hidden md:block" aria-hidden="true">
        Paint Manufacturer &mdash; Est. 1981 &middot; Lenasia ZA
      </p>
    </section>
  );
}
