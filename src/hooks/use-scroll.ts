"use client";

import { useState, useEffect } from "react";

export function useScroll(threshold = 24) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrollY(y);
      setIsScrolled(y > threshold);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { scrollY, isScrolled };
}
