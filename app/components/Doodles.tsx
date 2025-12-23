"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface DoodleProps {
  src: string;
  className?: string;
  size?: number;
  rotate?: number;
  float?: boolean;
}

// Single floating doodle component
export function Doodle({ src, className = "", size = 60, rotate = 0, float = true }: DoodleProps) {
  const doodleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!float || !doodleRef.current) return;

    // Random floating animation
    const randomDuration = 3 + Math.random() * 2;
    const randomDelay = Math.random() * 2;

    gsap.to(doodleRef.current, {
      y: "+=15",
      rotation: `+=${5 + Math.random() * 10}`,
      duration: randomDuration,
      delay: randomDelay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [float]);

  return (
    <div
      ref={doodleRef}
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// Hero section doodles - NYC themed
export function HeroDoodles() {
  return (
    <div
      id="desktop-truck"
      className="absolute top-1/2 right-8 md:right-16 lg:right-24 xl:right-32 -translate-y-1/2 opacity-90 pointer-events-none hidden md:block"
    >
      <Doodle
        src="/doodles/moving-truck.svg"
        className="w-48 h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80"
        size={320}
        rotate={-15}
        float={false}
      />
    </div>
  );
}

// Mascot component - cute character that appears on the page
export function Mascot() {
  const mascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mascotRef.current) return;

    // Gentle bobbing animation
    gsap.to(mascotRef.current, {
      y: "-=10",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div
      ref={mascotRef}
      className="fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-110 transition-transform duration-300 hidden lg:block"
      title="Hi! Need help moving?"
    >
      <div className="relative">
        <Image
          src="/doodles/doodle-02.svg"
          alt="Walk-up Pros Mascot"
          width={80}
          height={80}
          className="drop-shadow-lg"
        />
        {/* Speech bubble */}
        <div className="absolute -top-12 -left-20 bg-yellow-400 text-black text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap border-2 border-black"
          style={{ boxShadow: '2px 2px 0px 0px #000' }}
        >
          Let&apos;s move!
          <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-yellow-400" />
        </div>
      </div>
    </div>
  );
}

// Section accent doodles (for How It Works, etc.)
export function SectionDoodles({ variant = "default" }: { variant?: "default" | "cta" }) {
  if (variant === "cta") {
    return (
      <>
        {/* Thumbs up - top left corner */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 lg:top-8 lg:left-8 opacity-70 w-16 h-16 md:w-20 md:h-20 lg:w-40 lg:h-40">
          <Doodle
            src="/doodles/doodle-101.svg"
            className="w-full h-full"
            size={160}
            rotate={-15}
          />
        </div>
        {/* Heart - bottom right corner */}
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 opacity-70 w-14 h-14 md:w-20 md:h-20 lg:w-36 lg:h-36">
          <Doodle
            src="/doodles/doodle-65.svg"
            className="w-full h-full"
            size={144}
            rotate={10}
          />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Moving truck - main doodle */}
      <Doodle
        src="/doodles/moving-truck.svg"
        className="absolute top-4 right-4 lg:top-8 lg:right-12 opacity-90"
        size={180}
        rotate={-25}
        float={false}
      />
    </>
  );
}
