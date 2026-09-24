import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  eyebrowColor?: "default" | "gold" | "gold-on-dark" | "sage";
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
};

// Text colour for the eyebrow label. "gold" keeps espresso text (yellow on
// white/paper fails WCAG contrast at this size); the brand yellow lives on
// the decorative rule instead, via ruleColors below. "gold-on-dark" is for
// eyebrows sitting on an espresso/dark section background, where yellow
// text is fine (~11.9:1) — use it there instead of "gold".
const eyebrowColors = {
  default: "text-muted",
  gold: "text-espresso",
  "gold-on-dark": "text-olympic-yellow",
  sage: "text-sage",
};

const ruleColors = {
  default: "bg-current",
  gold: "bg-olympic-yellow",
  "gold-on-dark": "bg-olympic-yellow",
  sage: "bg-current",
};

export function SectionHeading({ eyebrow, eyebrowColor = "default", title, description, className, centered }: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      {eyebrow && (
        <p className={cn(
          "flex items-center gap-3 mb-4 text-xs font-bold tracking-[0.16em] uppercase",
          centered && "justify-center",
          eyebrowColors[eyebrowColor]
        )}>
          <span className={cn("w-6 h-px", ruleColors[eyebrowColor])} aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2>{title}</h2>
      {description && <p className="mt-4 text-muted max-w-2xl leading-relaxed">{description}</p>}
    </div>
  );
}
