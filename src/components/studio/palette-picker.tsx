"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { colours } from "@/data/colours";
import type { ColourFamily, ColourSwatch } from "@/types";

export const PALETTE_MAX = 5;

type ThemeFilter = ColourFamily | "all";

const themeFilters: { value: ThemeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "neutral", label: "Neutral" },
  { value: "warm", label: "Warm" },
  { value: "cool", label: "Cool" },
  { value: "earth", label: "Earth" },
  { value: "bold", label: "Bold" },
];

export function paletteSummary(palette: ColourSwatch[]): string {
  return palette.map((c) => `${c.name} (${c.hex})`).join(", ");
}

type PalettePickerProps = {
  value: ColourSwatch[];
  onChange: (next: ColourSwatch[]) => void;
};

/** Compact, controlled colour picker for forms. */
export function PalettePicker({ value, onChange }: PalettePickerProps) {
  const [filter, setFilter] = useState<ThemeFilter>("all");
  const [notice, setNotice] = useState("");

  const visible = useMemo(
    () => (filter === "all" ? colours : colours.filter((c) => c.family === filter)),
    [filter]
  );

  function toggle(colour: ColourSwatch) {
    if (value.some((c) => c.id === colour.id)) {
      onChange(value.filter((c) => c.id !== colour.id));
      setNotice(`${colour.name} removed.`);
      return;
    }
    if (value.length >= PALETTE_MAX) {
      setNotice(`You can choose up to ${PALETTE_MAX} colours. Remove one to add ${colour.name}.`);
      return;
    }
    onChange([...value, colour]);
    setNotice(`${colour.name} added.`);
  }

  function remove(colour: ColourSwatch) {
    onChange(value.filter((c) => c.id !== colour.id));
    setNotice(`${colour.name} removed.`);
  }

  return (
    <div className="rounded-sm border border-ink/10 bg-paper/60 p-5 sm:p-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter colours by family">
        {themeFilters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs transition-colors",
              filter === f.value ? "border-ink bg-ink text-cream" : "border-ink/15 text-muted hover:border-ink/30"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-6" role="group" aria-label="Olympic Paints colours">
        {visible.map((colour) => {
          const selected = value.some((c) => c.id === colour.id);
          return (
            <button
              key={colour.id}
              type="button"
              onClick={() => toggle(colour)}
              aria-pressed={selected}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-sm border p-2 text-center transition-colors",
                selected ? "border-ink bg-cream" : "border-transparent hover:border-ink/20 hover:bg-cream"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-9 w-9 rounded-full border border-ink/10",
                  selected && "ring-2 ring-olympic-yellow ring-offset-2 ring-offset-cream"
                )}
                style={{ backgroundColor: colour.hex }}
              />
              <span className="text-[11px] leading-tight text-ink/80">{colour.name}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 border-t border-ink/10 pt-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-ink/80">Your palette</p>
          <p className="text-xs text-muted">
            {value.length} of {PALETTE_MAX}
          </p>
        </div>
        <ul className="mt-3 grid grid-cols-5 gap-2" aria-label="Selected colours">
          {Array.from({ length: PALETTE_MAX }, (_, i) => {
            const colour = value[i];
            return (
              <li key={colour?.id ?? `empty-${i}`}>
                {colour ? (
                  <button
                    type="button"
                    onClick={() => remove(colour)}
                    aria-label={`Remove ${colour.name}`}
                    className="group relative block aspect-square w-full overflow-hidden rounded-sm border border-ink/10"
                    style={{ backgroundColor: colour.hex }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cream/90 text-xs text-ink opacity-80 group-hover:opacity-100"
                    >
                      ×
                    </span>
                  </button>
                ) : (
                  <span className="flex aspect-square w-full items-center justify-center rounded-sm border border-dashed border-ink/15 text-[10px] text-muted">
                    Empty
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        {value.length > 0 && (
          <p className="mt-3 text-sm text-ink/80">{value.map((c) => c.name).join(" · ")}</p>
        )}
        <p className="mt-2 min-h-4 text-xs text-muted" role="status" aria-live="polite">
          {notice}
        </p>
      </div>
    </div>
  );
}
