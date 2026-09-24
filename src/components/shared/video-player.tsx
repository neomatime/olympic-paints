"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type VideoPlayerProps = {
  videoId: string;
  title: string;
  thumbnail?: string;
  duration?: string;
  className?: string;
};

export function VideoPlayer({ videoId, title, thumbnail, duration, className }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const thumb = thumbnail || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  if (playing) {
    return (
      <div className={cn("relative aspect-video rounded-sm overflow-hidden", className)}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className={cn("relative aspect-video rounded-sm overflow-hidden group cursor-pointer", className)}
      aria-label={`Play ${title}`}
    >
      <Image src={thumb} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/40 transition-colors flex items-center justify-center">
        <span className="w-16 h-16 bg-cream/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-ink ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
      {duration && (
        <span className="absolute bottom-4 left-4 text-sm text-cream/80">
          Watch the film &middot; {duration}
        </span>
      )}
    </button>
  );
}
