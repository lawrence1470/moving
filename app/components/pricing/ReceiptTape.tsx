"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger registered in SmoothScroll.tsx

const HOURS_WORKED = 2;
const HOURLY_RATE = 99;

const receiptItems = [
  { label: "2 Professional Movers", rate: HOURLY_RATE, hours: HOURS_WORKED, isHourly: true },
  { label: "Moving Truck", price: 40, isFlat: true },
  { label: "Equipment & Padding", price: 10, isFlat: true },
  { label: "Evening Discount", price: 0, isDiscount: true },
];

export default function ReceiptTape() {
  const sectionRef = useRef<HTMLElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  const total = receiptItems.reduce((sum, item) => {
    if (item.isDiscount) return sum;
    if (item.isHourly) return sum + (item.rate! * item.hours!);
    return sum + (item.price || 0);
  }, 0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const section = sectionRef.current;
    const receipt = receiptRef.current;
    const header = headerRef.current;
    const totalEl = totalRef.current;
    const footer = footerRef.current;
    if (!section || !receipt || !header || !totalEl || !footer) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(header, { opacity: 0, y: -30 });
      gsap.set(receipt, { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(itemRefs.current, { opacity: 0, x: -20 });
      gsap.set(totalEl, { opacity: 0, scale: 0.8 });
      gsap.set(footer, { opacity: 0 });

      // Create timeline - pinned with scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          refreshPriority: -1, // Third pinned section - refresh last
          snap: {
            snapTo: 1,
            duration: { min: 0.2, max: 0.5 },
            delay: 0.1,
            ease: "power2.inOut",
          },
        },
      });

      // Animation sequence
      tl
        // Header fades in
        .to(header, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" })
        // Receipt slides up
        .to(receipt, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.4)" })
        // Items appear one by one
        .to(itemRefs.current[0], { opacity: 1, x: 0, duration: 0.15, ease: "power2.out" })
        .to(itemRefs.current[1], { opacity: 1, x: 0, duration: 0.15, ease: "power2.out" }, "-=0.05")
        .to(itemRefs.current[2], { opacity: 1, x: 0, duration: 0.15, ease: "power2.out" }, "-=0.05")
        .to(itemRefs.current[3], { opacity: 1, x: 0, duration: 0.15, ease: "power2.out" }, "-=0.05")
        // Pause for effect
        .to({}, { duration: 0.1 })
        // Total pops in
        .to(totalEl, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" })
        // Footer fades in
        .to(footer, { opacity: 1, duration: 0.2, ease: "power2.out" });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [isClient]);

  return (
    <section ref={sectionRef} className="relative z-30 min-h-screen bg-zinc-900 border-t-4 border-yellow-400 flex items-center" style={{ isolation: 'isolate' }}>
      <div className="max-w-4xl mx-auto px-6 w-full">
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-yellow-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
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
            className="bg-zinc-100 text-zinc-900 w-full max-w-sm border-4 border-black overflow-hidden"
            style={{ fontFamily: "monospace", boxShadow: "8px 8px 0px 0px #000" }}
          >
            {/* Receipt Header */}
            <div className="bg-yellow-400 p-4 text-center border-b-4 border-black">
              <div className="text-xl font-black tracking-wider">WALK-UP PROS</div>
              <div className="text-xs font-bold opacity-70">Manhattan Evening Movers</div>
            </div>

            {/* Receipt Body */}
            <div className="p-6">
              {/* Dotted line */}
              <div className="border-b-2 border-dashed border-zinc-300 mb-4" />

              <div className="text-xs text-zinc-500 mb-4 font-bold">STUDIO APARTMENT MOVE • {HOURS_WORKED} HOURS</div>

              {/* Line Items */}
              <div className="space-y-3 min-h-[180px]">
                {receiptItems.map((item, index) => (
                  <div
                    key={item.label}
                    ref={(el) => { itemRefs.current[index] = el; }}
                    className="flex justify-between text-sm"
                  >
                    <span className={item.isDiscount ? "text-yellow-600 font-bold" : ""}>
                      {item.label}
                      {item.isHourly && (
                        <span className="text-zinc-400 text-xs ml-1">
                          (${item.rate}/hr × {item.hours}hrs)
                        </span>
                      )}
                    </span>
                    <span className={item.isDiscount ? "text-yellow-600 font-bold" : "font-bold"}>
                      {item.isDiscount ? "FREE" : item.isHourly ? `$${item.rate! * item.hours!}` : `$${item.price}`}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dotted line */}
              <div className="border-b-2 border-dashed border-zinc-300 my-4" />

              {/* Total */}
              <div ref={totalRef} className="flex justify-between items-center">
                <span className="text-lg font-black">TOTAL</span>
                <span className="text-3xl font-black text-yellow-500">${total}</span>
              </div>

              {/* Dotted line */}
              <div className="border-b-2 border-dashed border-zinc-300 my-4" />

              {/* Footer */}
              <div ref={footerRef} className="text-center text-xs text-zinc-500">
                <div className="mb-2 font-bold">No hidden fees. Ever.</div>
                <div className="text-zinc-400">M-F 5PM-1AM • Weekends 6AM-1AM</div>
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
