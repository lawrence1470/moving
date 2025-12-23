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
  SectionBridge,
} from "./components/animations";
import { HeroDoodles, Mascot, SectionDoodles } from "./components/Doodles";
import ReceiptTape from "./components/pricing/ReceiptTape";
import StepsZigzag from "./components/StepsZigzag";

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

// ScrollTrigger registered in SmoothScroll.tsx

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

  // Truck drive-off animation (both mobile and desktop)
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const animations: gsap.core.Tween[] = [];

    // Mobile truck animation
    const mobileTruck = document.getElementById("mobile-truck");
    if (mobileTruck && window.innerWidth < 768) {
      const mobileAnim = gsap.to(mobileTruck, {
        x: "120vw",
        rotation: 5,
        ease: "power1.in",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });
      animations.push(mobileAnim);
    }

    // Desktop truck animation
    const desktopTruck = document.getElementById("desktop-truck");
    if (desktopTruck && window.innerWidth >= 768) {
      const desktopAnim = gsap.to(desktopTruck, {
        x: "50vw",
        rotation: 5,
        ease: "power1.in",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });
      animations.push(desktopAnim);
    }

    return () => {
      animations.forEach((anim) => anim.scrollTrigger?.kill());
    };
  }, []);

  // ScrollTrigger.refresh() handled by SmoothScroll.tsx

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

            {/* Mobile truck icon - drives off on scroll */}
            <FadeIn delay={0.7}>
              <div className="mt-8 md:hidden flex justify-center">
                <div
                  id="mobile-truck"
                  className="w-48 h-48"
                >
                  <Image
                    src="/doodles/moving-truck.svg"
                    alt="Moving truck"
                    width={200}
                    height={200}
                    className="w-full h-full opacity-90"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Visual bridge to next section */}
        <SectionBridge
          fromColor="transparent"
          toColor="rgba(0,0,0,0.9)"
          height="150px"
          position="bottom"
        />
      </section>

      {/* Cards Section */}
      <CardFan />

      {/* Testimonial Cards Section */}
      <TestimonialCards />

      {/* Pricing Section */}
      <ReceiptTape />

      {/* How It Works Section - Zigzag Layout */}
      <StepsZigzag />

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
