"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroTextProps {
  lines: Array<{
    text: string;
    className?: string;
  }>;
  className?: string;
  delay?: number;
  lineDelay?: number;
  wordDelay?: number;
}

export default function HeroText({
  lines,
  className = "",
  delay = 0.3,
  lineDelay = 0.2,
  wordDelay = 0.04,
}: HeroTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const allWords = container.querySelectorAll(".hero-word");

    // Set initial state
    gsap.set(allWords, {
      opacity: 0,
      y: 50,
      rotateX: -40,
    });

    // Animate each line's words with staggered timing
    const lineElements = container.querySelectorAll(".hero-line");
    const animations: gsap.core.Tween[] = [];

    lineElements.forEach((line, lineIndex) => {
      const words = line.querySelectorAll(".hero-word");
      const animation = gsap.to(words, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: wordDelay,
        delay: delay + lineIndex * lineDelay,
        ease: "power3.out",
      });
      animations.push(animation);
    });

    return () => {
      animations.forEach((anim) => anim.kill());
    };
  }, [delay, lineDelay, wordDelay]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ perspective: "1000px" }}
    >
      {lines.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className={`hero-line overflow-hidden ${line.className || ""}`}
        >
          {line.text.split(" ").map((word, wordIndex) => (
            <span
              key={wordIndex}
              className="hero-word inline-block mr-[0.25em]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {word}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
