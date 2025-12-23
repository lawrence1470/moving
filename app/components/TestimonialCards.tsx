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
    location: "Studio Apt",
  },
  {
    id: 2,
    quote: "Evening hours are perfect. Didn't have to take time off work.",
    name: "James K.",
    location: "Chelsea",
  },
  {
    id: 3,
    quote: "Best movers in Manhattan. Handled my antiques with care.",
    name: "Lisa T.",
    location: "Upper West",
  },
  {
    id: 4,
    quote: "Finally, movers who actually show up on time!",
    name: "Emma L.",
    location: "SoHo",
  },
];

// Scattered positions for magnetic pull effect
const scatteredPositions = [
  { x: -350, y: -180, rotation: -45, scale: 0.5 },
  { x: 380, y: -120, rotation: 40, scale: 0.55 },
  { x: -300, y: 150, rotation: -35, scale: 0.5 },
  { x: 320, y: 180, rotation: 50, scale: 0.55 },
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
      // Set initial scattered state
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

      // Create magnetic pull timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          onLeave: () => setAnimationComplete(true),
          onEnterBack: () => setAnimationComplete(false),
        },
      });

      // Animate each card to its position
      cards.forEach((card, index) => {
        const baseRotation = (index - (cards.length - 1) / 2) * 12; // More spread

        tl.to(card, {
          x: 0,
          y: 0,
          rotation: baseRotation,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }, index * 0.1);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Mouse interaction effects
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
        const baseRotation = (index - (cards.length - 1) / 2) * 12;
        const cardCenterIndex = index - (cards.length - 1) / 2;

        const xInfluence = offsetX * 12 * (1 - Math.abs(cardCenterIndex) * 0.15);
        const yInfluence = offsetY * 6;
        const rotationInfluence = offsetX * 3 * cardCenterIndex * -0.5;

        gsap.to(card, {
          x: xInfluence * (index + 1) * 0.4,
          y: yInfluence * 4,
          rotation: baseRotation + rotationInfluence,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    const handleMouseLeave = () => {
      cards.forEach((card, index) => {
        const baseRotation = (index - (cards.length - 1) / 2) * 12;
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
        y: -20,
        scale: 1.08,
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
      const baseRotation = (index - (testimonials.length - 1) / 2) * 12;
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
    <section ref={sectionRef} className="relative z-20 min-h-screen bg-black border-t-4 border-yellow-400 overflow-hidden flex items-center" style={{ isolation: 'isolate' }}>
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
          className="relative flex justify-center items-center h-[350px]"
        >
          {testimonials.map((testimonial, index) => {
            const totalCards = testimonials.length;
            const cardOffset = (index - (totalCards - 1) / 2) * 160;

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
                {/* Speech Bubble Card */}
                <div className="relative">
                  {/* Main bubble */}
                  <div
                    className="relative w-[200px] sm:w-[220px] bg-yellow-400 p-5 border-4 border-black rounded-2xl"
                    style={{ boxShadow: '5px 5px 0px 0px #000' }}
                  >
                    {/* Quote */}
                    <p className="text-black text-sm sm:text-base font-bold leading-snug mb-4">
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      {/* Avatar circle */}
                      <div className="w-10 h-10 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm font-black border-2 border-black">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-black text-sm font-black">
                          {testimonial.name}
                        </div>
                        <div className="text-black/60 text-xs font-medium">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Speech bubble tail */}
                  <div
                    className="absolute -bottom-3 left-8 w-0 h-0"
                    style={{
                      borderLeft: '12px solid transparent',
                      borderRight: '12px solid transparent',
                      borderTop: '16px solid #000',
                    }}
                  />
                  <div
                    className="absolute -bottom-[6px] left-[34px] w-0 h-0"
                    style={{
                      borderLeft: '10px solid transparent',
                      borderRight: '10px solid transparent',
                      borderTop: '14px solid #FACC15',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtitle */}
        <div className="text-center mt-16">
          <p className="text-zinc-400 text-lg">
            Our customers always love us — <span className="text-yellow-400 font-semibold">100% satisfaction</span>
          </p>
        </div>
      </div>
    </section>
  );
}
