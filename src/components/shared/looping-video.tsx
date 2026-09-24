"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type LoopingVideoProps = {
  src: string;
  poster: string;
  label: string;
  className?: string;
};

/**
 * A muted, looping background-style video (e.g. "our people at work") that
 * respects prefers-reduced-motion — it starts paused instead of
 * autoplaying — and always exposes a visible pause/play control, since
 * hover/focus alone isn't an accessible mechanism for touch or
 * screen-reader users (WCAG 2.2.2).
 */
export function LoopingVideo({ src, poster, label, className }: LoopingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  const userPausedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // useReducedMotion is false on first render, so check the media query directly
    // to avoid starting playback before the hook has caught up.
    if (prefersReduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    // Browsers pause muted video started off screen, so play only while visible.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (userPausedRef.current) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReduced]);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      video.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  }

  return (
    <div className={cn("relative", className)}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="w-full rounded-sm"
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-ink/60 text-cream flex items-center justify-center hover:bg-ink/80 transition-colors"
        aria-label={playing ? "Pause video" : "Play video"}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}
