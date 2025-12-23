"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger registered in SmoothScroll.tsx

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  y = 60,
  stagger = 0,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const targets = stagger > 0 ? element.children : element;

    gsap.set(targets, { opacity: 0, y });

    const animation = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger: stagger > 0 ? stagger : undefined,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [delay, duration, y, stagger, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
