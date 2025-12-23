"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const phoneNumber = "(347) 617-2607";

  const handleCopy = async () => {
    await navigator.clipboard.writeText("3476172607");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { label: "About Us", href: "/about", rotate: "-2deg" },
    { label: "Pricing", href: isHome ? "#pricing" : "/#pricing", rotate: "1.5deg" },
    { label: "Blog", href: "/blog", rotate: "-1deg" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 py-5 transition-colors duration-300 ${
          isHome ? "bg-transparent" : "bg-black/80 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image src="/logo.svg" alt="Walk-up Pros" width={240} height={72} className="h-14 w-auto" />
          </Link>

          {/* Sticky Note Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
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

          {/* CTA Button with Response Time */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer group hidden md:flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 px-5 py-2.5 transition-all duration-200"
            style={{ boxShadow: "3px 3px 0px 0px #000" }}
          >
            <span className="text-black font-black text-sm uppercase tracking-wide">Text Us</span>
            <span className="text-black/60 text-sm font-medium">·</span>
            <span className="text-black/70 text-sm font-semibold">&lt;5min reply</span>
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden cursor-pointer p-2" onClick={() => setIsModalOpen(true)}>
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Phone Number Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
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

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-yellow-400 p-8 max-w-md w-full border-4 border-black"
              style={{ boxShadow: "8px 8px 0px 0px #000" }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black text-yellow-400 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="text-center">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-2xl font-black text-black mb-2">Text Us Anytime</h3>
                <p className="text-black/70 mb-6">We typically respond within 5 minutes</p>

                {/* Phone Number */}
                <div className="bg-black text-yellow-400 p-4 mb-4">
                  <span className="text-2xl font-black tracking-wide">{phoneNumber}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={`sms:3476172607`}
                    className="flex-1 bg-black text-yellow-400 py-3 font-bold hover:bg-zinc-800 transition-colors text-center"
                  >
                    Open Messages
                  </a>
                  <button
                    onClick={handleCopy}
                    className="flex-1 bg-white text-black py-3 font-bold hover:bg-zinc-100 transition-colors border-2 border-black cursor-pointer"
                  >
                    {copied ? "Copied!" : "Copy Number"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
