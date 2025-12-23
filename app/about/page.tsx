"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FadeIn,
  StaggerContainer,
} from "../components/animations";

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const phoneNumber = "(347) 617-2607";

  const handleCopy = async () => {
    await navigator.clipboard.writeText("3476172607");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header - Sticky Note Stack */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-5 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image src="/logo.svg" alt="Walk-up Pros" width={192} height={56} className="h-10 w-auto" />
          </Link>

          {/* Sticky Note Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Home", href: "/", rotate: "-2deg" },
              { label: "Pricing", href: "/#pricing", rotate: "1.5deg" },
              { label: "FAQ", href: "/#faq", rotate: "-1deg" },
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
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')]" />
              </Link>
            ))}
          </nav>

          {/* CTA Button with Tape Effect */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer relative group hidden md:block"
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-3 bg-yellow-400/80" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
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

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-zinc-500 font-mono text-sm">[About]</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              More than movers.<br />
              <span className="text-zinc-500">We&apos;re your friends.</span>
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left" distance={60}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 relative">
                  <Image
                    src="/friends.gif"
                    alt="Walk-up Pros team"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <FadeIn delay={0.3} direction="up">
                  <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-zinc-900 p-6 rounded-xl">
                    <div className="text-2xl font-bold">Built on trust</div>
                    <div className="text-sm font-medium">Not contracts</div>
                  </div>
                </FadeIn>
              </div>
            </FadeIn>

            <div>
              <FadeIn direction="right" delay={0.2}>
                <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                  We&apos;re a small company of close friends who started Walk-up Pros after years of helping each other move apartments around the city. We saw how broken the moving industry is—big companies upcharge on everything and hire people who don&apos;t really care about you. They&apos;re just there for a paycheck.
                </p>
              </FadeIn>

              <FadeIn direction="right" delay={0.3}>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  That&apos;s not us. We know how stressful moving can be, so we bring professionalism and genuine kindness to every job. We&apos;re not just your movers—we&apos;re your friends through the process. NYC is our home, and we want to help you make it yours too.
                </p>
              </FadeIn>

              <StaggerContainer className="flex gap-8" stagger={0.1} direction="right">
                <div>
                  <div className="text-3xl font-bold text-yellow-400">100%</div>
                  <div className="text-sm text-zinc-500">Happy clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400">&lt;5min</div>
                  <div className="text-sm text-zinc-500">Response time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400">24/7</div>
                  <div className="text-sm text-zinc-500">Text support</div>
                </div>
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-12 text-center">What we stand for</h2>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-8" stagger={0.1}>
            {[
              {
                title: "Respect",
                desc: "We treat your belongings like our own. Every box, every piece of furniture matters.",
              },
              {
                title: "Reliability",
                desc: "We show up on time, every time. No excuses, no delays, no surprises.",
              },
              {
                title: "Real prices",
                desc: "What we quote is what you pay. No hidden fees, no last-minute upcharges.",
              },
            ].map((value, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">{value.title}</h3>
                <p className="text-zinc-400">{value.desc}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to move?</h2>
            <p className="text-zinc-400 text-lg mb-8">
              Text us now and get a free quote in minutes.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 font-bold text-lg transition-colors border-4 border-black"
              style={{ boxShadow: '4px 4px 0px 0px #000' }}
            >
              TEXT US NOW
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-zinc-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <span className="text-lg font-semibold">Walk-up Pros</span>
            </Link>

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-center mb-2">Text us to get started</h3>
              <p className="text-zinc-400 text-center mb-8">We respond within 5 minutes</p>

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

              <a
                href="sms:3476172607"
                className="block w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-900 py-4 rounded-xl font-semibold text-center transition-colors"
              >
                Open Messages App
              </a>

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
