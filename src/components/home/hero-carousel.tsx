"use client";

import { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  { image: "/images/hero-left.webp", label: "teal living room in afternoon light" },
  { image: "/images/hero-front.webp", label: "deep teal living room" },
  { image: "/images/hero-right.webp", label: "teal lounge by the window" },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const prefersReduced = useReducedMotion();
  const isPaused = hoverPaused || manuallyPaused || prefersReduced;

  const next = useCallback(() => {
    setActive((i) => (i + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused || slides.length < 2) return;
    const timer = setInterval(next, 5600);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section
      className="hero relative h-screen min-h-[600px] overflow-hidden"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={() => setHoverPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className={cn(
            "absolute inset-0 bg-cover bg-center md:scale-[1.15] md:origin-top transition-opacity duration-1000",
            i === active ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url('${slide.image}')` }}
          aria-hidden={i !== active}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-ink/15" aria-hidden="true" />

      {/* Content sits high, over the clean wall above the sofa, rather than on the furniture. */}
      <div className="relative z-10 h-full px-6 pt-28 sm:pt-32 md:pt-[max(8rem,16vh)] md:pl-[10vw] lg:pl-[18vw] 2xl:pl-[22vw]">
        <div className="relative max-w-[600px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-16 -inset-y-14 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(8_20_20/0.38),transparent_70%)]"
          />
          <p className="flex items-center gap-3 text-xs font-bold tracking-[0.16em] uppercase text-cream/80">
            <span className="w-8 h-px bg-cream/50" aria-hidden="true" />
            2026 Colour of the Year
          </p>
          <h1 className="mt-4 text-cream text-[clamp(2.75rem,5vw,5.5rem)] leading-[0.95]">
            Inspiring
            <br />
            <em className="font-serif">Optimism</em>
          </h1>
          <p className="mt-5 max-w-[560px] text-base md:text-lg text-cream/85 leading-relaxed">
            Colour, creativity and expert guidance brought together at the Colour Cafe so you can choose paint with
            confidence.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button href="/contact#enquiry" variant="primary" className="w-full sm:w-auto">
              Book a Colour Cafe consultation
            </Button>
            <Button href="/collections" variant="outline" className="w-full sm:w-auto">
              Explore colours
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        <div className="flex gap-3" aria-label="Hero scenes">
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
        {!prefersReduced && slides.length > 1 && (
          <button
            type="button"
            onClick={() => setManuallyPaused((p) => !p)}
            className="w-7 h-7 rounded-full border border-cream/40 text-cream flex items-center justify-center hover:bg-cream/10 transition-colors"
            aria-label={manuallyPaused ? "Play hero slideshow" : "Pause hero slideshow"}
          >
            {manuallyPaused ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            )}
          </button>
        )}
      </div>

      <p className="absolute left-6 md:left-16 bottom-8 text-xs text-cream/60 hidden md:block" aria-hidden="true">
        Paint Manufacturer &mdash; Est. 1981 &middot; Lenasia ZA
      </p>
    </section>
  );
}
