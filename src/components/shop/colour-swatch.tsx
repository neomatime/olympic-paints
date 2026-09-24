import { cn } from "@/lib/utils";

type ColourSwatchProps = {
  hex: string;
  name: string;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
};

const sizes = { sm: "w-5 h-5", md: "w-8 h-8" };

export function ColourSwatch({ hex, name, selected, onClick, size = "sm" }: ColourSwatchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative rounded-full border-2 transition-transform shrink-0",
        selected ? "border-ink scale-110" : "border-transparent hover:scale-110",
        !onClick && "cursor-default",
        sizes[size]
      )}
      style={{ backgroundColor: hex }}
      aria-label={name}
      aria-pressed={onClick ? selected ?? false : undefined}
      title={name}
    />
  );
}
