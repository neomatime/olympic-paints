import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

type GalleryItem = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  tall?: boolean;
};

type ImageGalleryProps = { items: GalleryItem[]; className?: string };

export function ImageGallery({ items, className }: ImageGalleryProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {items.map((item, i) => (
        <ScrollReveal key={i} delay={i} className={cn(item.tall && "md:row-span-2")}>
          <div className={cn("relative overflow-hidden rounded-sm group", item.tall ? "aspect-[3/4]" : "aspect-[4/3]")}>
            <Image src={item.src} alt={item.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            {(item.title || item.subtitle) && (
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent flex flex-col justify-end p-6">
                {item.subtitle && <p className="text-xs text-cream/60 uppercase tracking-wider">{item.subtitle}</p>}
                {item.title && <h3 className="text-cream mt-1">{item.title}</h3>}
              </div>
            )}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
