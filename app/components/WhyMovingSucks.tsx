"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const painPoints = [
  { emoji: "🏃‍♂️", title: "5th Floor", subtitle: "No elevator. Good luck." },
  { emoji: "🛋️", title: "Tight Corners", subtitle: "That couch won't fit." },
  { emoji: "🎫", title: "Parking Tickets", subtitle: "Double-parked = $115" },
  { emoji: "💸", title: "$1000+ Quotes", subtitle: "Big company markup." },
];

export default function WhyMovingSucks() {
  const sectionRef = useRef<HTMLElement>(null);
  const gifRef = useRef<HTMLDivElement>(null);
  const pivotRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Wait for client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Register plugin on client only
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const gif = gifRef.current;
    const pivot = pivotRef.current;
    const cards = cardsRef.current;
    const transition = transitionRef.current;
    const header = headerRef.current;

    if (!section || !gif || !pivot || !cards || !transition || !header) return;

    const cardElements = cards.querySelectorAll(".pain-card");

    // Small delay to ensure DOM is ready
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(header, { opacity: 0, y: -50 });
      gsap.set(gif, { opacity: 0, x: -300, rotation: -15 });
      gsap.set(pivot, { opacity: 0, scale: 0, rotation: -180 });
      gsap.set(cardElements, { opacity: 0, y: -100, rotation: () => gsap.utils.random(-20, 20) });
      gsap.set(transition, { opacity: 0, y: 30 });

      // Create the timeline - pinned with scrub animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
        },
      });

      // Animation sequence
      tl
        .to(header, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
        .to(gif, { opacity: 1, x: 0, rotation: 0, duration: 0.4, ease: "back.out(1.7)" })
        .to(pivot, { opacity: 1, scale: 1, rotation: 3, duration: 0.3, ease: "back.out(2)" }, "-=0.2")
        .to(cardElements[0], { opacity: 1, y: 0, rotation: -2, duration: 0.2, ease: "bounce.out" })
        .to(cardElements[1], { opacity: 1, y: 0, rotation: 1, duration: 0.2, ease: "bounce.out" }, "-=0.1")
        .to(cardElements[2], { opacity: 1, y: 0, rotation: -1, duration: 0.2, ease: "bounce.out" }, "-=0.1")
        .to(cardElements[3], { opacity: 1, y: 0, rotation: 2, duration: 0.2, ease: "bounce.out" }, "-=0.1")
        .to({}, { duration: 0.1 })
        .to(transition, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [isClient]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen bg-zinc-950 border-t-4 border-yellow-400 overflow-hidden flex items-center"
      style={{ isolation: 'isolate' }}
    >
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-16">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
            WHY MOVING <span className="text-yellow-400">SUCKS</span>
          </h2>
          <p className="text-zinc-400 text-lg">Especially in NYC. You know it. We know it.</p>
        </div>

        {/* GIF + Pain Points */}
        <div className="relative">
          {/* The GIF */}
          <div ref={gifRef} className="relative mx-auto max-w-lg mb-12">
            <div
              className="relative border-4 border-black bg-yellow-400 p-2"
              style={{ boxShadow: "8px 8px 0px 0px #000" }}
            >
              <img
                src="/friends.gif"
                alt="Friends struggling to move a couch - PIVOT!"
                className="w-full h-auto"
              />
              {/* PIVOT Badge */}
              <div
                ref={pivotRef}
                className="absolute -bottom-4 -right-4 bg-black text-yellow-400 px-4 py-2 font-black text-sm border-2 border-yellow-400"
              >
                PIVOT! PIVOT!
              </div>
            </div>
          </div>

          {/* Pain Points Grid */}
          <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {painPoints.map((pain, index) => (
              <div
                key={index}
                className="pain-card bg-zinc-900 border-2 border-zinc-700 p-4 text-center hover:border-yellow-400 hover:bg-zinc-800 transition-colors group"
              >
                <div className="text-3xl mb-2">{pain.emoji}</div>
                <div className="font-black text-white group-hover:text-yellow-400 transition-colors">
                  {pain.title}
                </div>
                <div className="text-zinc-500 text-sm">{pain.subtitle}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Transition Line */}
        <div ref={transitionRef} className="text-center mt-12">
          <p className="text-2xl md:text-3xl font-bold text-zinc-500">
            It doesn&apos;t have to be this way.
          </p>
          <div className="mt-4 flex justify-center">
            <svg
              className="w-8 h-8 text-yellow-400 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
