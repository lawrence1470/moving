"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger registered in SmoothScroll.tsx

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  splitBy?: "words" | "chars" | "lines";
  useScrollTrigger?: boolean;
}

export default function TextReveal({
  text,
  className = "",
  as: Tag = "span",
  delay = 0,
  stagger = 0.05,
  splitBy = "words",
  useScrollTrigger = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".text-reveal-item");

    gsap.set(elements, {
      opacity: 0,
      y: 40,
      rotateX: -20,
    });

    const animationConfig: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.6,
      delay,
      stagger,
      ease: "power3.out",
    };

    if (useScrollTrigger) {
      animationConfig.scrollTrigger = {
        trigger: container,
        start: "top 85%",
        toggleActions: "play none none none",
      };
    }

    const animation = gsap.to(elements, animationConfig);

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [delay, stagger, useScrollTrigger]);

  const splitText = () => {
    if (splitBy === "chars") {
      return text.split("").map((char, i) => (
        <span
          key={i}
          className="text-reveal-item inline-block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }

    if (splitBy === "lines") {
      return text.split("\n").map((line, i) => (
        <span
          key={i}
          className="text-reveal-item block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {line}
        </span>
      ));
    }

    // Default: words
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className="text-reveal-item inline-block mr-[0.25em]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {word}
      </span>
    ));
  };

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={`${className} overflow-hidden`}
      style={{ perspective: "1000px" }}
    >
      {splitText()}
    </Tag>
  );
}
