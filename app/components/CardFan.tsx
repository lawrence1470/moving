"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const cards = [
  {
    id: 1,
    title: "EVENING",
    subtitle: "HOURS",
    benefit: "6PM - 1AM",
    color: "#DC2626",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "FAST",
    subtitle: "RESPONSE",
    benefit: "Under 5 min",
    color: "#EA580C",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "FULLY",
    subtitle: "INSURED",
    benefit: "100% Protected",
    color: "#16A34A",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "TEXT",
    subtitle: "TO BOOK",
    benefit: "No apps needed",
    color: "#0D9488",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

interface CardFanProps {
  className?: string;
}

export default function CardFan({ className = "" }: CardFanProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const totalCards = cards.length;

  return (
    <div className={`relative w-full h-[400px] md:h-[500px] flex items-center justify-center ${className}`}>
      <div className="relative" style={{ width: "450px", height: "340px" }}>
        {cards.map((card, index) => {
          const spreadAngle = 12;
          const spreadX = 65;

          const centerOffset = (totalCards - 1) / 2;
          const relativeIndex = index - centerOffset;

          const baseRotation = relativeIndex * spreadAngle;
          const baseX = relativeIndex * spreadX;
          const baseY = Math.pow(Math.abs(relativeIndex), 1.5) * 8;

          const baseZ = index + 1;

          const isHovered = activeIndex === index;
          const isOtherHovered = activeIndex !== null && activeIndex !== index;

          return (
            <motion.div
              key={card.id}
              className="absolute cursor-pointer origin-bottom"
              style={{
                left: "50%",
                bottom: "0%",
                zIndex: isHovered ? 100 : baseZ,
              }}
              initial={{
                x: "-50%",
                y: 100,
                rotate: 0,
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                x: `calc(-50% + ${baseX}px)`,
                y: isHovered ? -40 : baseY,
                rotate: isHovered ? 0 : baseRotation,
                opacity: isLoaded ? (isOtherHovered ? 0.7 : 1) : 0,
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: isLoaded && !activeIndex ? index * 0.08 : 0,
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <motion.div
                className="relative overflow-hidden shadow-2xl"
                style={{
                  width: "180px",
                  height: "260px",
                  backgroundColor: card.color,
                  borderRadius: "16px",
                }}
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Top label */}
                <div className="absolute top-4 left-4 right-4">
                  <div
                    className="text-[9px] font-semibold tracking-[0.2em] uppercase"
                    style={{ color: card.dark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)" }}
                  >
                    SwiftMove
                  </div>
                </div>

                {/* Center icon */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: card.dark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)" }}
                >
                  {card.icon}
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className="text-[32px] font-black leading-[0.9] tracking-tight"
                    style={{ color: card.dark ? "#18181b" : "#ffffff" }}
                  >
                    {card.title}
                  </div>
                  <div
                    className="text-[11px] font-bold tracking-[0.1em] mt-1 uppercase"
                    style={{ color: card.dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)" }}
                  >
                    {card.subtitle}
                  </div>
                  <div
                    className="text-[10px] font-medium mt-3 py-1.5 px-2.5 rounded-full inline-block"
                    style={{
                      backgroundColor: card.dark ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)",
                      color: card.dark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.9)"
                    }}
                  >
                    {card.benefit}
                  </div>
                </div>

                {/* Decorative corner */}
                <div
                  className="absolute top-4 right-4 w-6 h-6 rounded-md"
                  style={{ backgroundColor: card.dark ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)" }}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 100%)",
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Glow effect */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] blur-3xl opacity-30"
        style={{
          background: "linear-gradient(90deg, #DC2626, #EA580C, #16A34A, #0D9488, #A3E635)",
        }}
      />
    </div>
  );
}
