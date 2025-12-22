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
    color: "#DC2626",
  },
  {
    id: 2,
    quote: "The evening hours are perfect. Didn't have to take time off work.",
    name: "James K.",
    role: "Chelsea",
    color: "#EA580C",
  },
  {
    id: 3,
    quote: "Texted them at 4pm, they showed up at 7pm same day. Amazing!",
    name: "Mike R.",
    role: "East Village",
    color: "#CA8A04",
  },
  {
    id: 4,
    quote: "Best movers in Manhattan. Handled my antiques with such care.",
    name: "Lisa T.",
    role: "Upper West",
    color: "#16A34A",
  },
  {
    id: 5,
    quote: "Third time using them. Consistently reliable and professional.",
    name: "David P.",
    role: "Midtown",
    color: "#0D9488",
  },
  {
    id: 6,
    quote: "Finally, movers who actually show up on time. Highly recommend!",
    name: "Emma L.",
    role: "SoHo",
    color: "#A3E635",
    dark: true,
  },
];

export default function TestimonialCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Scroll-triggered entrance animation
  useEffect(() => {
    const container = containerRef.current;
    const cardsContainer = cardsRef.current;
    if (!container || !cardsContainer) return;

    const cards = cardsContainer.querySelectorAll(".testimonial-card");

    // Set initial state - hidden
    gsap.set(cards, { opacity: 0, y: 60 });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        cards.forEach((card, index) => {
          const baseRotation = (index - (cards.length - 1) / 2) * 8;
          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotation: baseRotation,
            transformOrigin: "center bottom",
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1.4)",
          });
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, []);

  // Mouse interaction effects
  useEffect(() => {
    const container = containerRef.current;
    const cardsContainer = cardsRef.current;
    if (!container || !cardsContainer) return;

    const cards = cardsContainer.querySelectorAll(".testimonial-card");

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate mouse offset from center (-1 to 1)
      const offsetX = (mouseX - centerX) / centerX;
      const offsetY = (mouseY - centerY) / centerY;

      cards.forEach((card, index) => {
        const baseRotation = (index - (cards.length - 1) / 2) * 8;
        const cardCenterIndex = index - (cards.length - 1) / 2;

        // Cards react differently based on their position
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
        const baseRotation = (index - (cards.length - 1) / 2) * 8;
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
  }, []);

  const handleCardHover = (index: number) => {
    setHoveredCard(index);
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
    setHoveredCard(null);
    const card = cardsRef.current?.querySelectorAll(".testimonial-card")[index];
    if (card) {
      const baseRotation = (index - (testimonials.length - 1) / 2) * 8;
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
    <section
      ref={containerRef}
      className="relative py-24 px-6 bg-black overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            They say it better
            <br />
            <span className="text-zinc-500">than we do</span>
          </h2>
        </div>

        {/* Cards Container */}
        <div
          ref={cardsRef}
          className="relative flex justify-center items-end h-[350px]"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-card absolute cursor-pointer"
              style={{
                left: `${15 + index * 12}%`,
                zIndex: index + 1,
              }}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardLeave(index)}
            >
              <div
                className="relative w-[160px] sm:w-[180px] h-[220px] sm:h-[240px] rounded-2xl p-4 shadow-2xl transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                style={{ backgroundColor: testimonial.color }}
              >
                {/* Quote */}
                <p
                  className="text-sm font-medium leading-snug"
                  style={{
                    color: testimonial.dark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.95)",
                  }}
                >
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: testimonial.dark ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.25)",
                      color: testimonial.dark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)",
                    }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div
                      className="text-xs font-semibold"
                      style={{
                        color: testimonial.dark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.95)",
                      }}
                    >
                      {testimonial.name}
                    </div>
                    <div
                      className="text-[10px]"
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
          ))}
        </div>

        {/* Hint */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span>Mouse Move</span>
          </div>
        </div>
      </div>
    </section>
  );
}
