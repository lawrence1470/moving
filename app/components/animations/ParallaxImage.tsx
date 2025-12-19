"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number;
  scale?: number;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  speed = 0.3,
  scale = 1.2,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const imageWrapper = imageRef.current;
    if (!container || !imageWrapper) return;

    // Set initial scale to cover overflow during parallax
    gsap.set(imageWrapper, { scale });

    const animation = gsap.to(imageWrapper, {
      yPercent: -20 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [speed, scale]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${containerClassName}`}
    >
      <div ref={imageRef} className="w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${className}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
