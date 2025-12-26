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
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect mobile for optimized settings
    const isMobile = window.innerWidth < 768;

    // Initialize Lenis with optimized settings
    // On mobile: use native touch feel (syncTouch: false) since we disable pinned sections
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
      smoothWheel: true,
      syncTouch: false, // CRITICAL: Preserve native touch scroll feel on mobile
      touchMultiplier: 1, // Default - let native scroll handle touch
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

    // More robust refresh strategy - wait for fonts and initial layout
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    // Also refresh after fonts load for accurate measurements
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
