"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Magazine Hero */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Giant Typography Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-yellow-400 font-mono text-xs tracking-[0.3em]">ABOUT US</span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>
            <h1 className="text-6xl sm:text-8xl lg:text-[12rem] font-black leading-[0.85] tracking-tighter">
              MORE
              <br />
              <span className="text-zinc-700">THAN</span>
              <br />
              <span className="text-yellow-400">MOVERS</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Asymmetric Content Grid */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column - Pull Quote */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 lg:pt-12"
            >
              <div className="border-l-4 border-yellow-400 pl-6 py-4">
                <p className="text-2xl sm:text-3xl font-bold leading-tight text-white">
                  &ldquo;We&apos;re not just your movers—we&apos;re your friends through the process.&rdquo;
                </p>
              </div>

            </motion.div>

            {/* Center Column - GIF with Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[3/4] relative border-4 border-black overflow-hidden" style={{ boxShadow: "8px 8px 0px 0px #FACC15" }}>
                <Image
                  src="/friends.gif"
                  alt="Walk-up Pros team"
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Overlay Badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-6">
                  <div className="text-yellow-400 font-mono text-xs tracking-wider mb-2">EST. NYC</div>
                  <div className="text-2xl font-black">Built on trust,</div>
                  <div className="text-2xl font-black text-zinc-500">not contracts.</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Story Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3 flex flex-col justify-center"
            >
              <div className="space-y-6">
                <p className="text-zinc-300 leading-relaxed">
                  We&apos;re a small company of close friends who started Walk-up Pros after years of helping each other move apartments around the city.
                </p>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  We saw how broken the moving industry is—big companies upcharge on everything and hire people who don&apos;t really care about you.
                </p>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  That&apos;s not us. We know how stressful moving can be, so we bring professionalism and genuine kindness to every job.
                </p>
                <p className="text-zinc-500 leading-relaxed text-sm">
                  NYC is our home, and we want to help you make it yours too.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Magazine Strip */}
      <section className="py-16 border-y-4 border-yellow-400 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-0"
          >
            {[
              { num: "01", title: "RESPECT", desc: "We treat your belongings like our own. Every box, every piece of furniture matters." },
              { num: "02", title: "RELIABILITY", desc: "We show up on time, every time. No excuses, no delays, no surprises." },
              { num: "03", title: "REAL PRICES", desc: "What we quote is what you pay. No hidden fees, no last-minute upcharges." },
            ].map((value, index) => (
              <div
                key={value.num}
                className={`flex-1 p-8 ${index !== 2 ? "lg:border-r border-zinc-800" : ""}`}
              >
                <div className="text-yellow-400 font-mono text-xs mb-4">{value.num}</div>
                <h3 className="text-3xl font-black mb-3">{value.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Brutalist */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-block mb-8">
              <div className="text-[8rem] sm:text-[12rem] font-black leading-none text-yellow-400 tracking-tighter">
                TEXT
              </div>
              <div className="text-[4rem] sm:text-[6rem] font-black leading-none text-zinc-700 tracking-tighter -mt-4">
                US NOW
              </div>
            </div>

            <a
              href="sms:3476172607"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-12 py-5 font-black text-xl transition-colors border-4 border-black"
              style={{ boxShadow: "6px 6px 0px 0px #000" }}
            >
              GET A FREE QUOTE
            </a>

            <p className="text-zinc-500 text-sm mt-8">
              Weekdays 5PM-1AM • Weekends 6AM-1AM • Manhattan only
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <Link href="/" className="flex items-center gap-4">
              <div className="w-14 h-14 bg-yellow-400 rounded-lg flex items-center justify-center border-[3px] border-zinc-900">
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="#231F20" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 24 L8 18 L13 18 L13 12 L18 12 L18 6 L24 6 L24 24"/>
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight">Walk-up Pros</span>
            </Link>

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
