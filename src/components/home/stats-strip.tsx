"use client";

import { useRef, useEffect, useState } from "react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type StatItem = { target: number; suffix: string; label: string };

const stats: StatItem[] = [
  { target: 40, suffix: "+", label: "Years of Heritage" },
  { target: 1200, suffix: "+", label: "Curated Colours" },
  { target: 5000, suffix: "+", label: "Homes Transformed" },
  { target: 0, suffix: "5.0 ★", label: "Google Reviews" },
];

function AnimatedCounter({ target, suffix, label, delay }: StatItem & { delay: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || target === 0) {
      setValue(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const duration = 2000;
        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setValue(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, prefersReduced]);

  return (
    <ScrollReveal delay={delay}>
      <div ref={ref} className="text-center">
        <span className="text-4xl md:text-5xl font-serif">
          {target === 0 ? (
            <>
              5.0 <span className="text-olympic-yellow">{"★"}</span>
            </>
          ) : (
            <>
              {value.toLocaleString()}
              <span className="text-olympic-yellow">{suffix}</span>
            </>
          )}
        </span>
        <span className="block mt-2 text-sm text-muted uppercase tracking-wider">{label}</span>
      </div>
    </ScrollReveal>
  );
}

export function StatsStrip() {
  return (
    <section className="stats-strip py-16 px-6 border-y border-ink/10" aria-label="Key statistics">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <AnimatedCounter key={stat.label} {...stat} delay={i} />
        ))}
      </div>
    </section>
  );
}
