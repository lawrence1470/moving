"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger registered in SmoothScroll.tsx

interface SectionBridgeProps {
  fromColor?: string;
  toColor?: string;
  height?: string;
  position?: "top" | "bottom";
}

export default function SectionBridge({
  fromColor = "transparent",
  toColor = "black",
  height = "120px",
  position = "top",
}: SectionBridgeProps) {
  const bridgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bridge = bridgeRef.current;
    if (!bridge) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bridge,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: bridge,
            start: "top bottom",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );
    }, bridge);

    return () => ctx.revert();
  }, []);

  const gradientDirection = position === "top" ? "to bottom" : "to top";

  return (
    <div
      ref={bridgeRef}
      className="absolute left-0 right-0 pointer-events-none z-50"
      style={{
        [position]: 0,
        height,
        background: `linear-gradient(${gradientDirection}, ${fromColor}, ${toColor})`,
      }}
    />
  );
}
