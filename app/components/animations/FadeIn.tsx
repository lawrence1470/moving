"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  useScrollTrigger?: boolean;
  threshold?: string;
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 40,
  useScrollTrigger = true,
  threshold = "top 85%",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const getDirectionValues = () => {
      switch (direction) {
        case "up":
          return { y: distance, x: 0 };
        case "down":
          return { y: -distance, x: 0 };
        case "left":
          return { x: distance, y: 0 };
        case "right":
          return { x: -distance, y: 0 };
        default:
          return { x: 0, y: 0 };
      }
    };

    const { x, y } = getDirectionValues();

    gsap.set(element, { opacity: 0, x, y });

    const animationConfig: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
    };

    if (useScrollTrigger) {
      animationConfig.scrollTrigger = {
        trigger: element,
        start: threshold,
        toggleActions: "play none none none",
      };
    }

    const animation = gsap.to(element, animationConfig);

    return () => {
      animation.kill();
    };
  }, [delay, duration, direction, distance, useScrollTrigger, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
