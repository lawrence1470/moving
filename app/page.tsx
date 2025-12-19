"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardFan from "./components/CardFan";
import TestimonialCards from "./components/TestimonialCards";
import {
  FadeIn,
  ParallaxImage,
  StaggerContainer,
  HeroText,
} from "./components/animations";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const phoneNumber = "(347) 617-2607";

  const handleCopy = async () => {
    await navigator.clipboard.writeText("3476172607");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      {/* Hero Section - Split Layout */}
      <section className="min-h-screen relative">
        {/* Header */}
        <header className="absolute top-0 left-0 w-full z-20 px-6 py-5 border-b border-zinc-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-zinc-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <span className="text-lg font-semibold">SwiftMove</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-zinc-400 text-sm">
              <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
              <span>Evening hours • 6PM–1AM</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm border border-zinc-700 rounded-full px-5 py-2.5 hover:bg-zinc-800 transition-colors"
            >
              Text Us
            </button>
          </div>
        </header>

        {/* Split Content */}
        <div className="grid md:grid-cols-2 min-h-screen">
          {/* Left - Text Content */}
          <div className="flex flex-col justify-center px-6 md:px-12 xl:px-20 pt-24 pb-8 md:py-0">
            <FadeIn>
              <div className="inline-flex items-center gap-2 text-sm text-zinc-400 mb-6 bg-zinc-900 rounded-full px-4 py-2 w-max">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-400"></span>
                </span>
                Live, taking inquiries now
              </div>
            </FadeIn>

            <HeroText
              lines={[
                { text: "Move on your", className: "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold" },
                { text: "schedule, not ours.", className: "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-500" },
              ]}
              delay={0.2}
            />

            <FadeIn delay={0.5}>
              <p className="text-zinc-400 text-lg lg:text-xl mt-8 max-w-lg leading-relaxed">
                Evening apartment moves in Manhattan. 6PM to 1AM, every day.
                Just text us and we&apos;ll handle the rest.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="mt-10">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center bg-lime-400 hover:bg-lime-300 text-zinc-900 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  Text Us
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </FadeIn>

          </div>

          {/* Right - Card Fan Animation */}
          <div className="relative flex items-center justify-center overflow-visible h-[380px] md:min-h-screen">
            <div className="absolute inset-0 bg-zinc-900/50" />
            <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-transparent to-zinc-900/50" />
            <CardFan className="scale-[0.7] sm:scale-[0.8] md:scale-90 xl:scale-100" />
          </div>
        </div>
      </section>

      {/* Testimonial Cards Section */}
      <TestimonialCards />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
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
                  <div className="w-12 h-12 bg-lime-400/10 rounded-xl flex items-center justify-center text-lime-400">
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

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-zinc-500 font-mono text-sm">[02]</span>
              <span className="text-zinc-500 text-sm">Services</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 max-w-3xl">
              Everything you need.<br />
              <span className="text-zinc-500">Nothing you don&apos;t.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-zinc-400 text-lg mb-16 max-w-2xl">
              Comprehensive moving services designed for Manhattan apartments. We handle the heavy lifting so you can focus on settling in.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.08}>
            {[
              { title: "Apartment Moving", desc: "Studios to penthouses, walk-ups to high-rises" },
              { title: "Packing Services", desc: "Professional packing with quality materials" },
              { title: "Evening Availability", desc: "6PM to 1AM — move after work" },
              { title: "Furniture Assembly", desc: "Disassembly and reassembly included" },
              { title: "Fully Insured", desc: "Your belongings are 100% protected" },
              { title: "Same-Week Booking", desc: "Last minute? We've got you covered" },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6 hover:bg-zinc-900 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-lime-400 transition-colors">{service.title}</h3>
                    <p className="text-zinc-500 text-sm">{service.desc}</p>
                  </div>
                  <svg className="w-5 h-5 text-zinc-600 group-hover:text-lime-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* About/Image Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left" distance={60}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 relative">
                  <ParallaxImage
                    src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800&q=80"
                    alt="Moving boxes ready for transport"
                    containerClassName="absolute inset-0"
                    speed={0.4}
                    scale={1.15}
                  />
                </div>
                <FadeIn delay={0.3} direction="up">
                  <div className="absolute -bottom-6 -right-6 bg-lime-400 text-zinc-900 p-6 rounded-xl">
                    <div className="text-3xl font-bold">5+</div>
                    <div className="text-sm font-medium">Years in Manhattan</div>
                  </div>
                </FadeIn>
              </div>
            </FadeIn>

            <div>
              <FadeIn direction="right">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-zinc-500 font-mono text-sm">[03]</span>
                  <span className="text-zinc-500 text-sm">About us</span>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.1}>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  We know Manhattan.<br />
                  <span className="text-zinc-500">Inside and out.</span>
                </h2>
              </FadeIn>

              <FadeIn direction="right" delay={0.2}>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  We&apos;re not a huge corporate moving company. We&apos;re a small team of experienced movers who specialize in one thing: evening apartment moves in Manhattan.
                </p>
              </FadeIn>

              <FadeIn direction="right" delay={0.3}>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  Our 6PM–1AM schedule means you don&apos;t have to take time off work. We handle everything from walk-ups to luxury high-rises, and we know every building super and freight elevator in the city.
                </p>
              </FadeIn>

              <StaggerContainer className="flex gap-8" stagger={0.1} direction="right">
                <div>
                  <div className="text-2xl font-bold text-lime-400">500+</div>
                  <div className="text-sm text-zinc-500">Moves completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-lime-400">100%</div>
                  <div className="text-sm text-zinc-500">Satisfaction rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-lime-400">&lt;5min</div>
                  <div className="text-sm text-zinc-500">Response time</div>
                </div>
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-zinc-500 font-mono text-sm">[04]</span>
              <span className="text-zinc-500 text-sm">Reviews</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16 max-w-2xl">
              Don&apos;t take our word for it.
            </h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" stagger={0.12}>
            {[
              {
                name: "Sarah M.",
                location: "Upper East Side",
                text: "Moved my entire studio in under 2 hours. These guys are fast, careful, and super friendly. The evening timing was perfect.",
              },
              {
                name: "James K.",
                location: "Chelsea",
                text: "Finally, movers who actually show up on time! They handled my furniture with care and the price was exactly what they quoted.",
              },
              {
                name: "Maria L.",
                location: "East Village",
                text: "I was nervous about moving my grandmother's antique furniture. They wrapped everything perfectly. Not a single scratch.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-zinc-300 mb-6 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lime-400 font-medium text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{testimonial.name}</div>
                    <div className="text-xs text-zinc-500">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn distance={80}>
            <div className="bg-gradient-to-br from-lime-400 to-emerald-500 rounded-3xl p-12 md:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-6">
                Ready to move?
              </h2>
              <p className="text-zinc-800 text-lg mb-10 max-w-xl mx-auto">
                Text us now and get a free quote in minutes. Evening hours, Manhattan only, always on time.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Text (347) 617-2607
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-zinc-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <span className="text-lg font-semibold">SwiftMove</span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm text-zinc-400">
              <div>Manhattan, NYC</div>
              <div>6PM – 1AM Daily</div>
              <div>Text: (347) 617-2607</div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>© 2024 SwiftMove. All rights reserved.</p>
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
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-center mb-2">Text us to get started</h3>
            <p className="text-zinc-400 text-center mb-8">We respond within 5 minutes</p>

            {/* Phone Number */}
            <div className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-lime-400">{phoneNumber}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="block w-full bg-lime-400 hover:bg-lime-300 text-zinc-900 py-4 rounded-xl font-semibold text-center transition-colors"
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
