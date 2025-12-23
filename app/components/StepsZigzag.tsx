"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger registered in SmoothScroll.tsx

const steps = [
  {
    id: 1,
    number: "01",
    title: "TEXT US",
    shortDesc: "Send us a message",
    description: "Send a text to (347) 617-2607. We respond within minutes, not hours.",
    color: "yellow",
    rotation: -3,
  },
  {
    id: 2,
    number: "02",
    title: "TELL US",
    shortDesc: "Share the details",
    description: "Share what you're moving, where you're going, and when works best for you.",
    color: "white",
    rotation: 2,
  },
  {
    id: 3,
    number: "03",
    title: "WE HANDLE IT",
    shortDesc: "Sit back and relax",
    description: "We show up on time, move everything carefully, and get you settled.",
    color: "yellow",
    rotation: -2,
  },
];

// SVG Icons as separate components for animation
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        className="icon-path"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        className="icon-path"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        className="icon-path checkmark-path"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export default function StepsZigzag() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dottedLineRef = useRef<SVGPathElement>(null);
  const mobileDottedLineRef = useRef<SVGPathElement>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Main scrub-controlled animation
  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const numbers = numberRefs.current.filter(Boolean);
    const icons = iconRefs.current.filter(Boolean);
    const dottedLine = dottedLineRef.current;
    const mobileDottedLine = mobileDottedLineRef.current;

    if (!section || !header || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Set initial states
      gsap.set(header, { opacity: 0, y: 30 });

      // Set up dotted line animation (desktop) - use clip path for draw effect
      if (dottedLine) {
        gsap.set(dottedLine, {
          opacity: 0,
          scaleX: 0,
          transformOrigin: "left center",
        });
      }

      // Set up dotted line animation (mobile) - vertical line
      if (mobileDottedLine) {
        gsap.set(mobileDottedLine, {
          opacity: 0,
          scaleY: 0,
          transformOrigin: "top center",
        });
      }

      cards.forEach((card, index) => {
        if (!card) return;
        gsap.set(card, {
          opacity: 0,
          y: 40,
          scale: 0.9,
        });
      });

      numbers.forEach((num) => {
        if (!num) return;
        gsap.set(num, { scale: 0, opacity: 0 });
      });

      icons.forEach((icon) => {
        if (!icon) return;
        gsap.set(icon, { scale: 0, rotation: -180 });
      });

      // Create master timeline with pinned scrub (like other sections)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=80%" : "+=150%", // Shorter scroll distance on mobile
          pin: true,
          pinSpacing: true,
          scrub: isMobile ? 0.4 : 0.8, // Faster scrub on mobile
          anticipatePin: 1,
          refreshPriority: -2, // Fourth pinned section - refresh after ReceiptTape (-1)
          snap: {
            snapTo: [0, 1], // Snap to start or end only
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: "power2.inOut",
          },
          onLeave: () => setAnimationComplete(true),
          onEnterBack: () => setAnimationComplete(false),
        },
      });

      // Header fades in first
      tl.to(header, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      // Dotted line draws in (desktop) - scale from left to right
      if (dottedLine) {
        tl.to(dottedLine, {
          opacity: 1,
          scaleX: 1,
          duration: 0.5,
          ease: "power2.out",
        }, 0.25);
      }

      // Dotted line draws in (mobile) - scale from top to bottom
      if (mobileDottedLine) {
        tl.to(mobileDottedLine, {
          opacity: 1,
          scaleY: 1,
          duration: 0.5,
          ease: "power2.out",
        }, 0.25);
      }

      // Cards appear with staggered timing
      cards.forEach((card, index) => {
        if (!card) return;
        const progress = index / cards.length;

        // Card slides up and scales
        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        }, 0.3 + progress * 0.4);

        // Number stamps in with overshoot
        if (numbers[index]) {
          tl.to(numbers[index], {
            scale: 1,
            opacity: 0.2,
            duration: 0.25,
            ease: "back.out(3)",
          }, 0.4 + progress * 0.4);
        }

        // Icons spin in
        if (icons[index]) {
          tl.to(icons[index], {
            scale: 1,
            rotation: 0,
            duration: 0.35,
            ease: "back.out(2)",
          }, 0.45 + progress * 0.4);
        }
      });

    }, section);

    return () => ctx.revert();
  }, []); // Run once on mount - layout is handled by Tailwind responsive classes

  // Gentle floating idle animation (after scroll animation completes)
  useEffect(() => {
    if (!animationComplete) return;

    const cards = cardsRef.current.filter(Boolean);
    const floatAnimations: gsap.core.Tween[] = [];

    cards.forEach((card, index) => {
      if (!card) return;

      // Each card floats at slightly different rate
      const anim = gsap.to(card, {
        y: "+=8",
        duration: 2 + index * 0.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      floatAnimations.push(anim);
    });

    return () => {
      floatAnimations.forEach(anim => anim.kill());
    };
  }, [animationComplete]);

  // Contextual icon animations (after entrance)
  useEffect(() => {
    if (!animationComplete) return;

    const icons = iconRefs.current.filter(Boolean);
    const iconAnimations: gsap.core.Tween[] = [];

    // Phone icon - subtle vibrate
    if (icons[0]) {
      const anim = gsap.to(icons[0], {
        rotation: 5,
        duration: 0.1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        repeatDelay: 2,
      });
      iconAnimations.push(anim);
    }

    // Clipboard icon - gentle nod
    if (icons[1]) {
      const anim = gsap.to(icons[1], {
        rotation: -3,
        duration: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        repeatDelay: 1.5,
      });
      iconAnimations.push(anim);
    }

    // Checkmark icon - pulse scale
    if (icons[2]) {
      const anim = gsap.to(icons[2], {
        scale: 1.15,
        duration: 0.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        repeatDelay: 1,
      });
      iconAnimations.push(anim);
    }

    return () => {
      iconAnimations.forEach(anim => anim.kill());
    };
  }, [animationComplete]);

  // Handle card expand/collapse
  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Animate card on expand/collapse
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const step = steps[index];
      const isExpanded = expandedCard === step.id;

      gsap.to(card, {
        scale: isExpanded ? 1.05 : 1,
        zIndex: isExpanded ? 20 : 1,
        duration: 0.4,
        ease: isExpanded ? "back.out(1.4)" : "power2.out",
      });

      // Dim other cards when one is expanded
      if (expandedCard !== null && !isExpanded) {
        gsap.to(card, { opacity: 0.4, duration: 0.3 });
      } else {
        gsap.to(card, { opacity: 1, duration: 0.3 });
      }
    });
  }, [expandedCard]);

  const getCardStyles = (color: string) => {
    switch (color) {
      case "yellow":
        return {
          bg: "bg-yellow-400",
          text: "text-black",
          subtext: "text-black/60",
          iconBg: "bg-black",
          iconText: "text-yellow-400",
          border: "border-black",
          shadow: "6px 6px 0px 0px #000",
        };
      case "white":
        return {
          bg: "bg-white",
          text: "text-black",
          subtext: "text-black/50",
          iconBg: "bg-yellow-400",
          iconText: "text-black",
          border: "border-black",
          shadow: "6px 6px 0px 0px #000",
        };
      default:
        return {
          bg: "bg-yellow-400",
          text: "text-black",
          subtext: "text-black/60",
          iconBg: "bg-black",
          iconText: "text-yellow-400",
          border: "border-black",
          shadow: "6px 6px 0px 0px #000",
        };
    }
  };

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <PhoneIcon className="w-4 h-4 md:w-6 md:h-6" />;
      case 1:
        return <ClipboardIcon className="w-4 h-4 md:w-6 md:h-6" />;
      case 2:
        return <CheckIcon className="w-4 h-4 md:w-6 md:h-6" />;
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative z-40 min-h-screen bg-black border-t-4 border-yellow-400 flex items-center overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      <div className="max-w-6xl mx-auto px-6 relative w-full pt-10 md:pt-20">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-4 md:mb-12">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">
            Three steps to your
            <br />
            <span className="text-zinc-500">stress-free move.</span>
          </h2>
          <p className="text-zinc-400 text-xs md:text-base max-w-xl mx-auto">
            No complicated booking systems. No waiting on hold. Just text us.
          </p>
        </div>

        {/* Dotted Line SVG - Connecting the cards */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 top-[55%] w-[80%] max-w-3xl h-16 pointer-events-none hidden md:block"
          viewBox="0 0 800 50"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            ref={dottedLineRef}
            d="M 50 25 Q 200 10 400 25 Q 600 40 750 25"
            stroke="#FACC15"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
            style={{ strokeDasharray: "12 8" }}
          />
        </svg>

        {/* Mobile dotted line - vertical */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 top-[32%] w-4 h-[50%] pointer-events-none md:hidden"
          viewBox="0 0 10 200"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            ref={mobileDottedLineRef}
            d="M 5 0 L 5 200"
            stroke="#FACC15"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
            style={{ strokeDasharray: "10 8" }}
          />
        </svg>

        {/* Steps Cards - Horizontal on desktop, vertical on mobile */}
        <div className="relative z-10 flex flex-col items-center md:flex-row md:justify-center md:items-start gap-2 md:gap-6">
          {steps.map((step, index) => {
            const styles = getCardStyles(step.color);
            const isExpanded = expandedCard === step.id;

            return (
              <div
                key={step.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                onClick={() => toggleCard(step.id)}
                className={`
                  ${styles.bg} ${styles.border} border-3 md:border-4
                  w-full max-w-[260px] md:max-w-[300px] flex-shrink-0
                  cursor-pointer select-none
                  transition-shadow duration-300
                  hover:shadow-xl
                `}
                style={{
                  boxShadow: styles.shadow,
                }}
              >
                  {/* Card Header - Always visible */}
                  <div className="p-3 md:p-6">
                    <div className="flex items-start justify-between mb-2 md:mb-4">
                      {/* Icon */}
                      <div
                        ref={(el) => { iconRefs.current[index] = el; }}
                        className={`${styles.iconBg} ${styles.iconText} w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 md:border-[3px] border-black`}
                      >
                        {getIcon(index)}
                      </div>
                      {/* Number - Stamp effect target */}
                      <span
                        ref={(el) => { numberRefs.current[index] = el; }}
                        className={`text-4xl md:text-6xl font-black ${styles.text}`}
                        style={{ opacity: 0.2 }}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-lg md:text-3xl font-black ${styles.text} tracking-tight mb-0.5 md:mb-1`}>
                      {step.title}
                    </h3>

                    {/* Short description - when collapsed */}
                    {!isExpanded && (
                      <p className={`${styles.subtext} text-xs md:text-sm font-medium`}>
                        {step.shortDesc}
                      </p>
                    )}

                    {/* Tap hint - when collapsed */}
                    {!isExpanded && (
                      <div className={`mt-2 md:mt-4 flex items-center gap-2 ${styles.subtext} text-[10px] md:text-xs font-bold`}>
                        <span>TAP TO LEARN MORE</span>
                        <svg className="w-3 h-3 md:w-4 md:h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-4 space-y-4">
                        <p className={`${styles.text} text-sm md:text-base leading-relaxed`}>
                          {step.description}
                        </p>

                        <div className={`pt-3 border-t-2 ${styles.border} border-opacity-20 flex items-center justify-between`}>
                          <span className={`${styles.subtext} text-xs font-bold`}>
                            TAP TO CLOSE
                          </span>
                          <svg className={`w-5 h-5 ${styles.subtext}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
