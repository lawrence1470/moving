"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// SINGLE registration point for ScrollTrigger - all other files should NOT register
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Detect mobile for optimized settings
    const isMobile = window.innerWidth < 768;

    // Initialize Lenis with optimized settings for section transitions
    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.4, // Faster on mobile for better responsiveness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
      touchMultiplier: isMobile ? 2.0 : 1.5, // Higher on mobile for easier scrolling through pinned sections
      infinite: false,
      smoothWheel: true,
      syncTouch: true, // Better touch synchronization
    });

    lenisRef.current = lenis;

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Store the raf function for proper cleanup
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Single refresh after everything initializes
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
