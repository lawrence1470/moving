"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cards = [
  {
    id: 1,
    title: "EVENING",
    subtitle: "HOURS",
    benefit: "6PM-1AM",
    description: "Move after work, not during. We operate when you're free.",
    number: "01",
    color: "yellow",
  },
  {
    id: 2,
    title: "FAST",
    subtitle: "RESPONSE",
    benefit: "<5 MIN",
    description: "Text us and get a real reply in minutes, not hours.",
    number: "02",
    color: "black",
  },
  {
    id: 3,
    title: "FULLY",
    subtitle: "INSURED",
    benefit: "100%",
    description: "Your belongings are protected. No exceptions.",
    number: "03",
    color: "white",
  },
  {
    id: 4,
    title: "TEXT",
    subtitle: "TO BOOK",
    benefit: "NO APP",
    description: "No downloads, no accounts. Just text and you're booked.",
    number: "04",
    color: "yellow",
  },
];

interface CardFanProps {
  className?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function CardFan({ className = "", triggerRef }: CardFanProps) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered horizontal train animation
  useEffect(() => {
    const track = trackRef.current;
    const trigger = triggerRef?.current;
    if (!track || !trigger) return;

    // Calculate how far to move the track (total width of all cards minus viewport)
    const updateAnimation = () => {
      const trackWidth = track.scrollWidth;
      const containerWidth = track.parentElement?.clientWidth || window.innerWidth;
      const moveDistance = trackWidth - containerWidth + 40; // Extra padding

      // Kill existing ScrollTrigger for this trigger
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === trigger) st.kill();
      });

      // Train animation - cards slide in from right to left
      gsap.set(track, { x: containerWidth }); // Start off-screen right

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top 15%",
          end: `+=${moveDistance + 600}`, // Scroll distance = track movement + buffer
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Slide the entire track from right to left
      tl.to(track, {
        x: -moveDistance,
        ease: "none",
      });
    };

    // Run on mount and resize
    updateAnimation();
    window.addEventListener("resize", updateAnimation);

    return () => {
      window.removeEventListener("resize", updateAnimation);
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === trigger) st.kill();
      });
    };
  }, [triggerRef]);

  const getCardStyles = (color: string) => {
    switch (color) {
      case "yellow":
        return {
          bg: "bg-yellow-400",
          text: "text-black",
          subtext: "text-black/60",
          badge: "bg-black text-yellow-400",
          border: "border-black",
        };
      case "black":
        return {
          bg: "bg-black",
          text: "text-white",
          subtext: "text-white/60",
          badge: "bg-yellow-400 text-black",
          border: "border-yellow-400",
        };
      case "white":
        return {
          bg: "bg-white",
          text: "text-black",
          subtext: "text-black/50",
          badge: "bg-black text-white",
          border: "border-black",
        };
      default:
        return {
          bg: "bg-yellow-400",
          text: "text-black",
          subtext: "text-black/60",
          badge: "bg-black text-yellow-400",
          border: "border-black",
        };
    }
  };

  return (
    <div className={`${className} min-h-[70vh] flex flex-col justify-center`}>
      {/* Section Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-1 bg-yellow-400" />
          <span className="font-mono text-sm text-zinc-500">[WHY US]</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">
          THE SWIFTMOVE
          <br />
          <span className="text-yellow-400">DIFFERENCE</span>
        </h2>
      </div>

      {/* Cards Track - horizontal train that slides through */}
      <div ref={cardsRef} className="overflow-visible flex items-center">
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 w-max"
        >
          {cards.map((card) => {
            const styles = getCardStyles(card.color);

            return (
              <div
                key={card.id}
                className={`benefit-card ${styles.bg} ${styles.border} border-4 p-5 sm:p-6
                  w-[280px] sm:w-[320px] flex-shrink-0
                `}
                style={{ boxShadow: '6px 6px 0px 0px #000' }}
              >
              {/* Number */}
              <div className={`font-mono text-xs ${styles.subtext} mb-6`}>
                {card.number}
              </div>

              {/* Title */}
              <div className={`text-5xl sm:text-6xl font-black leading-[0.85] tracking-tighter ${styles.text}`}>
                {card.title}
              </div>
              <div className={`text-sm font-bold tracking-[0.15em] mt-1 ${styles.subtext} uppercase`}>
                {card.subtitle}
              </div>

              {/* Description */}
              <p className={`mt-4 text-sm leading-relaxed ${styles.subtext}`}>
                {card.description}
              </p>

              {/* Benefit Badge */}
              <div className="mt-4">
                <div className={`${styles.badge} font-mono text-sm font-bold py-2 px-4 inline-block`}>
                  {card.benefit}
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
