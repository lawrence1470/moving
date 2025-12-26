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

  // Scroll-triggered animation with matchMedia for responsive behavior
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Save styles to prevent contamination between breakpoints
    ScrollTrigger.saveStyles([track, headerRef.current]);

    const mm = gsap.matchMedia();

    // DESKTOP: Full horizontal scroll with pinning
    mm.add("(min-width: 768px)", () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const firstCard = track.querySelector('.benefit-card') as HTMLElement;
      const cardWidth = firstCard ? firstCard.offsetWidth : 320;

      const startX = (viewportWidth - cardWidth) / 2;
      const endX = -(trackWidth - (viewportWidth + cardWidth) / 2);

      gsap.set(track, { x: startX });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          refreshPriority: 1,
        },
      });

      tl.to(track, { x: endX, ease: "none" });

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
    });

    // MOBILE: Premium staggered fade-in with longer durations
    mm.add("(max-width: 767px)", () => {
      const cardElements = track.querySelectorAll('.benefit-card');

      // Reset track position for mobile
      gsap.set(track, { x: 0 });

      // Header fades in first with longer duration
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Cards fade in with coordinated stagger and subtle scale
      gsap.fromTo(cardElements,
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: track,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => mm.revert();
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
      className="relative z-10 min-h-screen md:min-h-screen bg-black border-t-4 border-yellow-400 overflow-hidden flex flex-col justify-center py-16 md:py-0"
      style={{ isolation: 'isolate' }}
    >
      {/* Section Header - Responsive positioning */}
      <div ref={headerRef} className="relative md:absolute top-0 md:top-24 left-0 md:left-6 z-20 px-4 md:px-0 mb-8 md:mb-0">
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

      {/* Cards - Vertical stack on mobile, horizontal track on desktop */}
      <div className="w-full overflow-visible md:overflow-visible px-4 md:px-0">
        <div ref={cardsRef} className="overflow-visible flex items-center">
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row gap-4 sm:gap-6 w-full md:w-max mx-auto md:mx-0"
          >
          {cards.map((card) => {
            const styles = getCardStyles(card.color);

            return (
              <div
                key={card.id}
                className={`benefit-card ${styles.bg} ${styles.border} border-4 p-5 sm:p-6
                  w-full md:w-[320px] flex-shrink-0
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
