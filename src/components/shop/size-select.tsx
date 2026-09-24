import { formatPrice, cn } from "@/lib/utils";
import type { ProductSize } from "@/types";

type SizeSelectProps = {
  sizes: ProductSize[];
  selected: string;
  onChange: (label: string) => void;
};

export function SizeSelect({ sizes, selected, onChange }: SizeSelectProps) {
  return (
    <div className="flex gap-2 flex-wrap" role="radiogroup" aria-label="Select size">
      {sizes.map((size) => (
        <button
          key={size.label}
          type="button"
          role="radio"
          aria-checked={selected === size.label}
          onClick={() => onChange(size.label)}
          className={cn(
            "px-4 py-2 text-sm border rounded-sm transition-colors",
            selected === size.label
              ? "border-ink bg-ink text-cream"
              : "border-ink/10 hover:border-ink/30"
          )}
        >
          {size.label} &mdash; {formatPrice(size.price)}
        </button>
      ))}
    </div>
  );
}
