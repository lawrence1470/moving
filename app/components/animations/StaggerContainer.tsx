"use client";

import { useEffect, useRef, ReactNode, Children } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  useScrollTrigger?: boolean;
  threshold?: string;
}

export default function StaggerContainer({
  children,
  className = "",
  stagger = 0.1,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 30,
  useScrollTrigger = true,
  threshold = "top 85%",
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(":scope > *");

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

    gsap.set(items, { opacity: 0, x, y });

    const animationConfig: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
    };

    if (useScrollTrigger) {
      animationConfig.scrollTrigger = {
        trigger: container,
        start: threshold,
        toggleActions: "play none none none",
      };
    }

    const animation = gsap.to(items, animationConfig);

    return () => {
      animation.kill();
    };
  }, [stagger, delay, duration, direction, distance, useScrollTrigger, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
