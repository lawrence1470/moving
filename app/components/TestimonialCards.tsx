"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    quote: "Moved my entire studio in under 2 hours. Super fast and careful!",
    name: "Sarah M.",
    role: "Studio Apt",
    color: "#FDE047", // yellow-300 (brightest)
    dark: true,
  },
  {
    id: 2,
    quote: "The evening hours are perfect. Didn't have to take time off work.",
    name: "James K.",
    role: "Chelsea",
    color: "#FACC15", // yellow-400
    dark: true,
  },
  {
    id: 3,
    quote: "Best movers in Manhattan. Handled my antiques with such care.",
    name: "Lisa T.",
    role: "Upper West",
    color: "#EAB308", // yellow-500
    dark: true,
  },
  {
    id: 4,
    quote: "Finally, movers who actually show up on time. Highly recommend!",
    name: "Emma L.",
    role: "SoHo",
    color: "#CA8A04", // yellow-600
    dark: true,
  },
  {
    id: 5,
    quote: "Saved me so much stress. These guys know what they're doing.",
    name: "Mike R.",
    role: "Tribeca",
    color: "#A16207", // yellow-700
  },
  {
    id: 6,
    quote: "Third time using them. Loyal customer for life now.",
    name: "Diana P.",
    role: "Brooklyn",
    color: "#854D0E", // yellow-800 (deepest)
  },
];

// Random scattered positions for magnetic pull effect
const scatteredPositions = [
  { x: -400, y: -200, rotation: -60, scale: 0.45 },
  { x: 420, y: -150, rotation: 50, scale: 0.5 },
  { x: -320, y: 180, rotation: -40, scale: 0.55 },
  { x: 350, y: 200, rotation: 55, scale: 0.5 },
  { x: -450, y: 50, rotation: -70, scale: 0.45 },
  { x: 480, y: 80, rotation: 65, scale: 0.5 },
];

export default function TestimonialCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Magnetic pull scroll animation
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const cardsContainer = cardsRef.current;
    if (!section || !container || !cardsContainer) return;

    const cards = cardsContainer.querySelectorAll(".testimonial-card");

    const ctx = gsap.context(() => {
      // Set initial scattered state - fully hidden until animation starts
      cards.forEach((card, index) => {
        const scattered = scatteredPositions[index];
        gsap.set(card, {
          x: scattered.x,
          y: scattered.y,
          rotation: scattered.rotation,
          scale: scattered.scale,
          opacity: 0,
        });
      });

      // Create magnetic pull timeline - pinned with scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          onLeave: () => setAnimationComplete(true),
          onEnterBack: () => setAnimationComplete(false),
        },
      });

      // Animate each card to its fan position (wider spread)
      cards.forEach((card, index) => {
        const baseRotation = (index - (cards.length - 1) / 2) * 18;

        tl.to(card, {
          x: 0,
          y: 0,
          rotation: baseRotation,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }, index * 0.08);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Mouse interaction effects (only active after animation completes)
  useEffect(() => {
    const container = containerRef.current;
    const cardsContainer = cardsRef.current;
    if (!container || !cardsContainer || !animationComplete) return;

    const cards = cardsContainer.querySelectorAll(".testimonial-card");

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const offsetX = (mouseX - centerX) / centerX;
      const offsetY = (mouseY - centerY) / centerY;

      cards.forEach((card, index) => {
        const baseRotation = (index - (cards.length - 1) / 2) * 18;
        const cardCenterIndex = index - (cards.length - 1) / 2;

        const xInfluence = offsetX * 15 * (1 - Math.abs(cardCenterIndex) * 0.15);
        const yInfluence = offsetY * 8;
        const rotationInfluence = offsetX * 5 * cardCenterIndex * -0.5;

        gsap.to(card, {
          x: xInfluence * (index + 1) * 0.5,
          y: yInfluence * 5,
          rotation: baseRotation + rotationInfluence,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    const handleMouseLeave = () => {
      cards.forEach((card, index) => {
        const baseRotation = (index - (cards.length - 1) / 2) * 18;
        gsap.to(card, {
          x: 0,
          y: 0,
          rotation: baseRotation,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [animationComplete]);

  // Card hover effects
  const handleCardHover = (index: number) => {
    if (!animationComplete) return;
    const card = cardsRef.current?.querySelectorAll(".testimonial-card")[index];
    if (card) {
      gsap.to(card, {
        y: -30,
        scale: 1.1,
        rotation: 0,
        zIndex: 50,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleCardLeave = (index: number) => {
    if (!animationComplete) return;
    const card = cardsRef.current?.querySelectorAll(".testimonial-card")[index];
    if (card) {
      const baseRotation = (index - (testimonials.length - 1) / 2) * 18;
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotation: baseRotation,
        zIndex: index + 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative z-30 min-h-screen bg-black border-t-4 border-yellow-400 overflow-hidden flex items-center" style={{ isolation: 'isolate' }}>
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 md:px-6 w-full flex flex-col justify-center">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          They say it better
          <br />
          <span className="text-zinc-500">than we do</span>
        </h2>
      </div>

      {/* Cards Container */}
      <div
        ref={cardsRef}
        className="relative flex justify-center items-center h-[320px]"
      >
        {testimonials.map((testimonial, index) => {
          // Center the cards: calculate offset from center
          const totalCards = testimonials.length;
          const cardOffset = (index - (totalCards - 1) / 2) * 70; // 70px spacing from center

          return (
            <div
              key={testimonial.id}
              className="testimonial-card absolute cursor-pointer left-1/2"
              style={{
                marginLeft: `${cardOffset}px`,
                transform: 'translateX(-50%)',
                zIndex: index + 1,
              }}
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={() => handleCardLeave(index)}
          >
            <div
              className="relative w-[160px] sm:w-[180px] h-[220px] sm:h-[240px] p-4 border-4 border-black transition-shadow"
              style={{
                backgroundColor: testimonial.color,
                boxShadow: '6px 6px 0px 0px #000'
              }}
            >
              {/* Card Number - Monospace accent */}
              <div
                className="font-mono text-xs mb-3"
                style={{
                  color: testimonial.dark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)",
                }}
              >
                [{String(index + 1).padStart(2, '0')}]
              </div>

              {/* Quote */}
              <p
                className="text-sm font-bold leading-snug tracking-tight"
                style={{
                  color: testimonial.dark ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.95)",
                }}
              >
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div
                  className="w-8 h-8 flex items-center justify-center text-xs font-black border-2"
                  style={{
                    backgroundColor: testimonial.dark ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.25)",
                    color: testimonial.dark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.95)",
                    borderColor: testimonial.dark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div
                    className="text-xs font-black tracking-wide uppercase"
                    style={{
                      color: testimonial.dark ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.95)",
                    }}
                  >
                    {testimonial.name}
                  </div>
                  <div
                    className="text-[10px] font-mono"
                    style={{
                      color: testimonial.dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      {/* Subtitle */}
      <div className="text-center mt-12">
        <p className="text-zinc-400 text-lg">
          Our customers always love us — <span className="text-yellow-400 font-semibold">100% satisfaction</span>
        </p>
      </div>
      </div>
    </section>
  );
}
