"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LocalVideoProps = {
  src: string;
  poster: string;
  alt: string;
  title: string;
  duration?: string;
  className?: string;
};

export function LocalVideo({ src, poster, alt, title, duration, className }: LocalVideoProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video
        src={src}
        poster={poster}
        controls
        autoPlay
        aria-label={title}
        className={cn("w-full aspect-square rounded-sm", className)}
      />
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className={cn("relative aspect-square rounded-sm overflow-hidden group cursor-pointer w-full", className)}
      aria-label={`Play ${title}`}
    >
      <Image src={poster} alt={alt} fill className="object-cover" />
      <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/40 transition-colors flex items-center justify-center">
        <span className="w-16 h-16 bg-cream/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-ink ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
      {duration && (
        <span className="absolute bottom-4 left-4 text-sm text-cream/80">Watch the film &middot; {duration}</span>
      )}
    </button>
  );
}
