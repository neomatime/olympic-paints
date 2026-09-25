import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  compact?: boolean;
};

export function PageHero({ eyebrow, title, description, backgroundImage, backgroundPosition, compact }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden", compact ? "py-24" : "py-32 md:py-44")}>
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')`, backgroundPosition }}
        >
          <div className="absolute inset-0 bg-espresso/70" />
        </div>
      )}
      {!backgroundImage && <div className="absolute inset-0 bg-espresso" />}
      <ScrollReveal className="relative z-10 max-w-4xl mx-auto px-6 text-cream">
        <p className="flex items-center gap-3 mb-4 text-xs font-bold tracking-[0.16em] uppercase text-cream/60">
          <span className="w-6 h-px bg-cream/40" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        {description && <p className="mt-6 text-lg text-cream/70 max-w-2xl leading-relaxed">{description}</p>}
      </ScrollReveal>
    </section>
  );
}
