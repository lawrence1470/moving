"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger registered in SmoothScroll.tsx

const cards = [
  {
    id: 1,
    title: "EVENING",
    subtitle: "HOURS",
    benefit: "5PM-1AM",
    description: "Weekdays 5PM-1AM, weekends 6AM-1AM. We work around you.",
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

export default function CardFan() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered horizontal train animation
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let ctx: gsap.Context;

    // Calculate how far to move the track
    const updateAnimation = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;

      // Start: first card centered in viewport
      // End: last card centered in viewport
      const startX = (viewportWidth - 320) / 2; // Center first card
      const endX = -(trackWidth - (viewportWidth + 320) / 2); // Center last card

      // Clean up previous context
      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        // Start with first card centered
        gsap.set(track, { x: startX });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=150%", // Longer scroll distance for smoother animation
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            anticipatePin: 1,
            refreshPriority: 1,
          },
        });

        // Slide to show all cards, ending with last card visible
        tl.to(track, {
          x: endX,
          ease: "none",
        });

        // Exit animation - fade header as section ends
        if (headerRef.current) {
          gsap.to(headerRef.current, {
            opacity: 0.3,
            y: -20,
            scrollTrigger: {
              trigger: section,
              start: "80% top",
              end: "100% top",
              scrub: true,
            },
          });
        }
      }, section);
    };

    // Run on mount and resize
    updateAnimation();
    window.addEventListener("resize", updateAnimation);

    return () => {
      window.removeEventListener("resize", updateAnimation);
      if (ctx) ctx.revert();
    };
  }, []);

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
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen bg-black border-t-4 border-yellow-400 overflow-hidden flex flex-col justify-center"
      style={{ isolation: 'isolate' }}
    >
      {/* Section Header - Absolutely positioned at top */}
      <div ref={headerRef} className="absolute top-20 md:top-24 left-4 md:left-6 z-20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-1 bg-yellow-400" />
          <span className="font-mono text-sm text-zinc-500">[WHY US]</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">
          THE WALK-UP
          <br />
          <span className="text-yellow-400">EXPERTS</span>
        </h2>
      </div>

      {/* Cards Track - Vertically centered */}
      <div className="w-full overflow-visible">
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
    </section>
  );
}
