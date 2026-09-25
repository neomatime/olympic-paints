"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ColourSwatch } from "@/components/shop/colour-swatch";
import { cn } from "@/lib/utils";
import type { RoomInspiration, RoomType } from "@/types";

type FilterOption = { value: RoomType | "all"; label: string };

const filters: FilterOption[] = [
  { value: "all", label: "All Rooms" },
  { value: "living-room", label: "Living Room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "kitchen", label: "Kitchen" },
  { value: "bathroom", label: "Bathroom" },
  { value: "kids-room", label: "Kids Room" },
  { value: "outdoor", label: "Outdoor" },
];

export function InspirationGallery({ inspirations }: { inspirations: RoomInspiration[] }) {
  const [activeFilter, setActiveFilter] = useState<RoomType | "all">("all");

  const filtered =
    activeFilter === "all" ? inspirations : inspirations.filter((room) => room.roomType === activeFilter);

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-8" role="group" aria-label="Filter inspiration by room type">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setActiveFilter(f.value)}
            aria-pressed={activeFilter === f.value}
            className={cn(
              "px-5 py-2 text-sm rounded-full border transition-colors",
              activeFilter === f.value
                ? "bg-ink text-cream border-ink"
                : "border-ink/15 text-muted hover:border-ink/30"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((room, i) => (
          <ScrollReveal key={room.id} delay={i % 3}>
            <article className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={room.images.after}
                  alt={room.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {room.images.before && (
                  <span className="absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-ink/70 text-cream rounded-sm">
                    Before &amp; After
                  </span>
                )}
              </div>
              <div className="mt-4">
                <h3>{room.title}</h3>
                {room.designer && <p className="mt-1 text-sm text-muted">Designed by {room.designer}</p>}
                <div className="flex items-center gap-2 mt-3" aria-label="Colours used">
                  {room.coloursUsed.map((colour) => (
                    <ColourSwatch key={colour.id} hex={colour.hex} name={colour.name} size="sm" />
                  ))}
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && <p className="text-center text-muted py-16">No inspiration in this room type yet.</p>}
    </div>
  );
}
