"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const [copied, setCopied] = useState(false);
  const phoneNumber = "(347) 617-2607";

  const handleCopy = async () => {
    await navigator.clipboard.writeText("3476172607");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

        {/* Header - Sticky Note Stack */}
        <header className="absolute top-0 left-0 w-full z-20 px-6 py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Image src="/logo.svg" alt="Walk-up Pros" width={192} height={56} className="h-10 w-auto" />

            {/* Sticky Note Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { label: "About", href: "/about", rotate: "-2deg" },
                { label: "Pricing", href: "#pricing", rotate: "1.5deg" },
                { label: "FAQ", href: "#faq", rotate: "-1deg" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative px-4 py-2 text-sm font-bold text-zinc-900 bg-yellow-400 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    transform: `rotate(${item.rotate})`,
                    boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Paper texture overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')]" />
                </Link>
              ))}
            </nav>

            {/* CTA Button with Tape Effect */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer relative group hidden md:block"
            >
              {/* Tape strip */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-3 bg-yellow-400/80" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
              {/* Main button */}
              <div className="relative bg-zinc-900 text-yellow-400 px-5 py-2.5 text-sm font-black uppercase tracking-wide border-2 border-zinc-900 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg"
                style={{ boxShadow: "3px 3px 0px 0px #000" }}
              >
                Text Us
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden cursor-pointer p-2" onClick={() => setIsModalOpen(true)}>
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

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
                      {/* Option A: Pizza as the "o" in Move */}
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
                Evening apartment moves in Manhattan. 6PM to 1AM, every day.
                Just text us and we&apos;ll handle the rest.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="mt-10">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="cursor-pointer group inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 font-bold text-lg transition-colors border-4 border-black"
                  style={{ boxShadow: '4px 4px 0px 0px #000' }}
                >
                  TEXT US NOW
                  <span className="ml-3 inline-block group-hover:animate-[wobble_0.5s_ease-in-out_infinite]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
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
                Text us now and get a free quote in minutes. Evening hours, Manhattan only, always on time.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer inline-flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Text Us Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
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
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center border-[3px] border-zinc-900">
                <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="#231F20" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 24 L8 18 L13 18 L13 12 L18 12 L18 6 L24 6 L24 24"/>
                </svg>
              </div>
              <span className="text-lg font-semibold">Walk-up Pros</span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm text-zinc-400">
              <div>Manhattan, NYC</div>
              <div>6PM – 1AM Daily</div>
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

      {/* Phone Number Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-center mb-2">Text us to get started</h3>
            <p className="text-zinc-400 text-center mb-8">We respond within 5 minutes</p>

            {/* Phone Number */}
            <div className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-yellow-400">{phoneNumber}</span>
              <button
                onClick={handleCopy}
                className="cursor-pointer flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Text Link */}
            <a
              href="sms:3476172607"
              className="block w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-900 py-4 rounded-xl font-semibold text-center transition-colors"
            >
              Open Messages App
            </a>

            {/* Hours reminder */}
            <p className="text-zinc-500 text-sm text-center mt-6">
              Evening hours: 6PM – 1AM • Manhattan only
            </p>
          </motion.div>
        </div>
        )}
      </AnimatePresence>
    </div>
  );
}
