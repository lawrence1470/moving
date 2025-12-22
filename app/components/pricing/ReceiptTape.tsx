"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const receiptItems = [
  { label: "2 Professional Movers", price: 99, delay: 0 },
  { label: "Moving Truck", price: 40, delay: 0.4 },
  { label: "Equipment & Padding", price: 10, delay: 0.8 },
  { label: "Evening Discount", price: 0, isDiscount: true, delay: 1.2 },
];

export default function ReceiptTape() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [showTotal, setShowTotal] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const total = receiptItems.reduce((sum, item) => sum + (item.isDiscount ? 0 : item.price), 0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasAnimated) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => {
        if (hasAnimated) return;
        setHasAnimated(true);

        // Animate receipt sliding down
        gsap.fromTo(
          receiptRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        );

        // Reveal items one by one with typewriter effect
        receiptItems.forEach((item, index) => {
          setTimeout(() => {
            setVisibleItems((prev) => [...prev, index]);
          }, item.delay * 1000 + 600);
        });

        // Show total last
        setTimeout(() => {
          setShowTotal(true);
        }, 2200);
      },
    });

    return () => trigger.kill();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-zinc-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Moving doesn&apos;t need to
            <br />
            <span className="text-zinc-500">be expensive.</span>
          </h2>
        </div>

        <div className="flex justify-center">
          <div
            ref={receiptRef}
            className="bg-zinc-100 text-zinc-900 w-full max-w-sm rounded-lg shadow-2xl overflow-hidden"
            style={{ fontFamily: "monospace" }}
          >
            {/* Receipt Header */}
            <div className="bg-lime-400 p-4 text-center">
              <div className="text-xl font-bold tracking-wider">SWIFTMOVE</div>
              <div className="text-xs opacity-70">Manhattan Evening Movers</div>
            </div>

            {/* Receipt Body */}
            <div className="p-6">
              {/* Dotted line */}
              <div className="border-b-2 border-dashed border-zinc-300 mb-4" />

              <div className="text-xs text-zinc-500 mb-4">STUDIO APARTMENT MOVE</div>

              {/* Line Items */}
              <div className="space-y-3 min-h-[160px]">
                {receiptItems.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex justify-between text-sm transition-all duration-300 ${
                      visibleItems.includes(index)
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                  >
                    <span className={item.isDiscount ? "text-lime-600" : ""}>
                      {item.label}
                    </span>
                    <span className={item.isDiscount ? "text-lime-600" : ""}>
                      {item.isDiscount ? "FREE" : `$${item.price}`}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dotted line */}
              <div className="border-b-2 border-dashed border-zinc-300 my-4" />

              {/* Total */}
              <div
                className={`flex justify-between items-center transition-all duration-500 ${
                  showTotal ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <span className="text-lg font-bold">TOTAL</span>
                <span className="text-3xl font-bold text-lime-600">${total}</span>
              </div>

              {/* Dotted line */}
              <div className="border-b-2 border-dashed border-zinc-300 my-4" />

              {/* Footer */}
              <div
                className={`text-center text-xs text-zinc-500 transition-all duration-500 delay-300 ${
                  showTotal ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="mb-2">No hidden fees. Ever.</div>
                <div className="text-zinc-400">Evening Hours: 6PM - 1AM</div>
              </div>
            </div>

            {/* Receipt tear edge */}
            <div
              className="h-4 bg-zinc-100"
              style={{
                maskImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 10'%3E%3Cpath d='M0 10 L5 0 L10 10 L15 0 L20 10 L25 0 L30 10 L35 0 L40 10 L45 0 L50 10 L55 0 L60 10 L65 0 L70 10 L75 0 L80 10 L85 0 L90 10 L95 0 L100 10' fill='white'/%3E%3C/svg%3E\")",
                maskSize: "20px 10px",
                maskRepeat: "repeat-x",
                maskPosition: "bottom",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
