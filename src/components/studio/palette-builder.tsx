"use client";

import { useMemo, useState } from "react";
import { ColourSwatch } from "@/components/shop/colour-swatch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { colours } from "@/data/colours";
import type { ColourFamily, ColourSwatch as ColourSwatchType } from "@/types";

const MAX_SLOTS = 5;

type ThemeFilter = ColourFamily | "all";

const themeFilters: { value: ThemeFilter; label: string }[] = [
  { value: "all", label: "All Colours" },
  { value: "neutral", label: "Neutral" },
  { value: "warm", label: "Warm" },
  { value: "cool", label: "Cool" },
  { value: "earth", label: "Earth" },
  { value: "bold", label: "Bold" },
];

function paletteText(palette: ColourSwatchType[]): string {
  return palette.map((colour) => `${colour.name} ${colour.hex}`).join("\n");
}

export function PaletteBuilder() {
  const [palette, setPalette] = useState<ColourSwatchType[]>([]);
  const [themeFilter, setThemeFilter] = useState<ThemeFilter>("all");
  const [status, setStatus] = useState("");

  const visibleColours = useMemo(
    () => (themeFilter === "all" ? colours : colours.filter((c) => c.family === themeFilter)),
    [themeFilter]
  );

  const slots = useMemo(() => {
    const filled: (ColourSwatchType | undefined)[] = [...palette];
    while (filled.length < MAX_SLOTS) filled.push(undefined);
    return filled;
  }, [palette]);

  const toggleColour = (colour: ColourSwatchType) => {
    setStatus("");
    setPalette((current) => {
      const existingIndex = current.findIndex((c) => c.hex === colour.hex);
      if (existingIndex >= 0) {
        return current.filter((_, i) => i !== existingIndex);
      }
      const next = current.length >= MAX_SLOTS ? current.slice(1) : current;
      return [...next, colour];
    });
  };

  const clearPalette = () => {
    setPalette([]);
    setStatus("Palette cleared.");
  };

  const copyPalette = async () => {
    if (!palette.length) {
      setStatus("Choose at least one colour before copying your palette.");
      return;
    }
    try {
      await navigator.clipboard.writeText(paletteText(palette));
      setStatus("Palette colours copied.");
    } catch {
      setStatus(paletteText(palette));
    }
  };

  const downloadPdf = () => {
    if (!palette.length) {
      setStatus("Choose at least one colour before downloading your palette.");
      return;
    }
    alert("Coming in Phase 2");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12">
      <div>
        <div className="flex gap-2 flex-wrap mb-8" role="group" aria-label="Filter colours by theme">
          {themeFilters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setThemeFilter(f.value)}
              aria-pressed={themeFilter === f.value}
              className={cn(
                "px-5 py-2 text-sm rounded-full border transition-colors",
                themeFilter === f.value
                  ? "bg-ink text-cream border-ink"
                  : "border-ink/15 text-muted hover:border-ink/30"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div
          className="grid grid-cols-3 sm:grid-cols-4 gap-4"
          role="group"
          aria-label="Available paint colours"
        >
          {visibleColours.map((colour) => {
            const selected = palette.some((c) => c.hex === colour.hex);
            return (
              <button
                key={colour.id}
                type="button"
                onClick={() => toggleColour(colour)}
                aria-pressed={selected}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-sm border transition-colors text-center",
                  selected ? "border-ink bg-ink/5" : "border-ink/10 hover:border-ink/25"
                )}
              >
                <span
                  className="w-12 h-12 rounded-full border border-ink/10"
                  style={{ backgroundColor: colour.hex }}
                  aria-hidden="true"
                />
                <span className="text-xs font-medium">{colour.name}</span>
                <span className="text-[10px] text-muted uppercase">{colour.hex}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-cream/60 rounded-sm p-8 h-fit sticky top-24">
        <h3>Your Palette</h3>
        <p className="mt-2 text-sm text-muted">Choose up to {MAX_SLOTS} colours to build your custom palette.</p>

        <div className="grid grid-cols-5 gap-2 mt-6">
          {slots.map((colour, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm border border-dashed border-ink/15 flex items-end justify-center overflow-hidden"
              style={colour ? { backgroundColor: colour.hex, borderStyle: "solid" } : undefined}
            >
              {!colour && <small className="text-[10px] text-muted pb-1">Choose</small>}
            </div>
          ))}
        </div>

        {palette.length > 0 && (
          <ul className="mt-6 space-y-2">
            {palette.map((colour) => (
              <li key={colour.id} className="flex items-center gap-3 text-sm">
                <ColourSwatch hex={colour.hex} name={colour.name} size="sm" />
                <span>{colour.name}</span>
                <span className="text-muted text-xs uppercase ml-auto">{colour.hex}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-3 mt-8">
          <Button variant="primary" type="button" onClick={downloadPdf}>
            Download PDF
          </Button>
          <Button variant="ghost" type="button" onClick={copyPalette}>
            Copy Palette
          </Button>
          <Button variant="ghost" type="button" onClick={clearPalette}>
            Clear
          </Button>
        </div>

        <p className="mt-4 text-sm text-muted" role="status" aria-live="polite">
          {status}
        </p>
      </div>
    </div>
  );
}
