"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import Image from "next/image";

// Register the plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(InertiaPlugin);
}

const images = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", alt: "Modern apartment living room" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80", alt: "Luxury kitchen" },
  { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80", alt: "Cozy bedroom" },
  { src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&q=80", alt: "Home office" },
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80", alt: "Dining area" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80", alt: "Modern bathroom" },
  { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80", alt: "Stylish entryway" },
  { src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&q=80", alt: "Outdoor terrace" },
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80", alt: "Exterior view" },
];

interface InertiaGridProps {
  className?: string;
}

export default function InertiaGrid({ className = "" }: InertiaGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const deltaRef = useRef({ x: 0, y: 0 });
  const oldPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track mouse movement delta
    const handleMouseMove = (e: MouseEvent) => {
      deltaRef.current.x = e.clientX - oldPosRef.current.x;
      deltaRef.current.y = e.clientY - oldPosRef.current.y;
      oldPosRef.current.x = e.clientX;
      oldPosRef.current.y = e.clientY;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Add hover animations to each media element
    const mediaElements = container.querySelectorAll(".media");

    const handleMouseEnter = (el: Element) => {
      const image = el.querySelector("img");
      if (!image) return;

      const tl = gsap.timeline({
        onComplete: () => {
          tl.kill();
        },
      });
      tl.timeScale(1.2);

      const currentDeltaX = deltaRef.current.x;
      const currentDeltaY = deltaRef.current.y;

      tl.to(image, {
        inertia: {
          x: {
            velocity: currentDeltaX * 30,
            end: 0,
          },
          y: {
            velocity: currentDeltaY * 30,
            end: 0,
          },
        },
      });

      tl.fromTo(
        image,
        { rotate: 0 },
        {
          duration: 0.4,
          rotate: (Math.random() - 0.5) * 30,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        },
        "<"
      );
    };

    const handlers = new Map<Element, () => void>();

    mediaElements.forEach((el) => {
      const handler = () => handleMouseEnter(el);
      handlers.set(el, handler);
      el.addEventListener("mouseenter", handler);
    });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      mediaElements.forEach((el) => {
        const handler = handlers.get(el);
        if (handler) {
          el.removeEventListener("mouseenter", handler);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-3 gap-3 w-full ${className}`}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="media relative cursor-pointer overflow-hidden"
          style={{
            width: "clamp(80px, 12vw, 160px)",
            height: "clamp(80px, 12vw, 160px)",
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover pointer-events-none"
            style={{
              willChange: "transform",
              borderRadius: "8px",
            }}
            sizes="160px"
          />
        </div>
      ))}
    </div>
  );
}
