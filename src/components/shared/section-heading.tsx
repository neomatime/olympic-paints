import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  eyebrowColor?: "default" | "gold" | "sage";
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
};

const eyebrowColors = {
  default: "text-muted",
  gold: "text-olympic-yellow",
  sage: "text-sage",
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
          <span className="w-6 h-px bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2>{title}</h2>
      {description && <p className="mt-4 text-muted max-w-2xl leading-relaxed">{description}</p>}
    </div>
  );
}
