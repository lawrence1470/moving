"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardFan from "./components/CardFan";
import TestimonialCards from "./components/TestimonialCards";
import {
  FadeIn,
  ParallaxImage,
  StaggerContainer,
  HeroText,
} from "./components/animations";
import { HeroDoodles, Mascot, SectionDoodles } from "./components/Doodles";
import ReceiptTape from "./components/pricing/ReceiptTape";

// Inline pizza component for hero text
function InlinePizza({ size = "1em" }: { size?: string }) {
  return (
    <span className="inline-block align-middle" style={{ width: size, height: size }}>
      <Image
        src="/doodles/pizza.svg"
        alt=""
        width={100}
        height={100}
        className="w-full h-full object-contain animate-spin-slow"
        style={{ animationDuration: "8s" }}
      />
    </span>
  );
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Scroll-triggered parallax for video
  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    const tl = gsap.to(video, {
      y: 150,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  // Refresh ScrollTrigger after all components mount
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section - Full Width Video */}
      <section ref={heroRef} className="min-h-screen relative overflow-hidden">
        {/* Video Backdrop */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/nyc-yellow-cab.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        {/* Floating Doodles */}
        <HeroDoodles />

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="px-6 md:px-12 xl:px-20 max-w-4xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 text-sm text-zinc-300 mb-6 bg-white/10 backdrop-blur-sm px-4 py-2 w-max border border-white/10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
                </span>
                Live, taking inquiries now
              </div>
            </FadeIn>

            <HeroText
              lines={[
                {
                  content: (
                    <>
                      {/* Pizza as the "o" in Move */}
                      <span className="hero-word inline-block mr-[0.25em]" style={{ transformStyle: "preserve-3d" }}>
                        M<InlinePizza size="0.75em" />ve
                      </span>
                      <span className="hero-word inline-block mr-[0.25em]" style={{ transformStyle: "preserve-3d" }}>on</span>
                      <span className="hero-word inline-block mr-[0.25em]" style={{ transformStyle: "preserve-3d" }}>your</span>
                    </>
                  ),
                  className: "text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black"
                },
                {
                  content: (
                    <>
                      <span className="hero-word inline-block mr-[0.25em]" style={{ transformStyle: "preserve-3d" }}>schedule,</span>
                      <span className="hero-word inline-block mr-[0.25em]" style={{ transformStyle: "preserve-3d" }}>not</span>
                      <span className="hero-word inline-block mr-[0.25em]" style={{ transformStyle: "preserve-3d" }}>ours.</span>
                    </>
                  ),
                  className: "text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white/50"
                },
              ]}
              delay={0.2}
            />

            <FadeIn delay={0.5}>
              <p className="text-zinc-300 text-lg lg:text-xl mt-8 max-w-xl leading-relaxed">
                Apartment moves in Manhattan. Weekdays 5PM-1AM, weekends 6AM-1AM.
                Just text us and we&apos;ll handle the rest.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="mt-10">
                <a
                  href="sms:3476172607"
                  className="group inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 font-bold text-lg transition-colors border-4 border-black"
                  style={{ boxShadow: '4px 4px 0px 0px #000' }}
                >
                  TEXT US NOW
                  <span className="ml-3 inline-block group-hover:animate-[wobble_0.5s_ease-in-out_infinite]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <CardFan />

      {/* Testimonial Cards Section */}
      <TestimonialCards />

      {/* Pricing Section */}
      <ReceiptTape />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-black relative overflow-hidden">
        {/* Section Doodles */}
        <SectionDoodles />
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-zinc-500 font-mono text-sm">[01]</span>
              <span className="text-zinc-500 text-sm">How it works</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 max-w-3xl">
              Three steps to your<br />
              <span className="text-zinc-500">stress-free move.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-zinc-400 text-lg mb-16 max-w-2xl">
              No complicated booking systems. No waiting on hold. Just text us and we&apos;ll take care of everything.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" stagger={0.15} delay={0.1}>
            {[
              {
                step: "01",
                title: "Text Us",
                description: "Send a text to (347) 617-2607. We respond within minutes, not hours.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Tell Us Your Situation",
                description: "Share what you're moving, where you're going, and when works best for you.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "We Handle The Rest",
                description: "We show up on time, move everything carefully, and get you settled.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-400">
                    {item.icon}
                  </div>
                  <span className="text-zinc-600 font-mono text-sm">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn distance={80}>
            <div className="bg-gradient-to-br from-yellow-400 to-rose-500 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
              {/* CTA Doodles */}
              <SectionDoodles variant="cta" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-6">
                Ready to move?
              </h2>
              <p className="text-zinc-800 text-lg mb-10 max-w-xl mx-auto">
                Text us now and get a free quote in minutes. Weekdays 5PM-1AM, weekends 6AM-1AM. Manhattan only.
              </p>
              <a
                href="sms:3476172607"
                className="inline-flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Text Us Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Floating Mascot */}
      <Mascot />

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-yellow-400 rounded-lg flex items-center justify-center border-[3px] border-zinc-900">
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="#231F20" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 24 L8 18 L13 18 L13 12 L18 12 L18 6 L24 6 L24 24"/>
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight">Walk-up Pros</span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm text-zinc-400">
              <div>Manhattan, NYC</div>
              <div>M-F 5PM-1AM • Weekends 6AM-1AM</div>
              <div>Text: (347) 617-2607</div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>© 2024 Walk-up Pros. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
