"use client";

import { useRef } from "react";
import { motion, useInView, useAnimationFrame } from "framer-motion";

// ─────────────────────────────────────────────
// Replace src values with your real images.
// Any 1:1 ratio images (160×160+) work great.
// ─────────────────────────────────────────────
const IMAGES = [
  { id: 0, src: "https://picsum.photos/seed/gal0/200/200", alt: "Gallery 0" },
  { id: 1, src: "https://picsum.photos/seed/gal1/200/200", alt: "Gallery 1" },
  { id: 2, src: "https://picsum.photos/seed/gal2/200/200", alt: "Gallery 2" },
  { id: 3, src: "https://picsum.photos/seed/gal3/200/200", alt: "Gallery 3" },
  { id: 4, src: "https://picsum.photos/seed/gal4/200/200", alt: "Gallery 4" },
  { id: 5, src: "https://picsum.photos/seed/gal5/200/200", alt: "Gallery 5" },
  { id: 6, src: "https://picsum.photos/seed/gal6/200/200", alt: "Gallery 6" },
  { id: 7, src: "https://picsum.photos/seed/gal7/200/200", alt: "Gallery 7" },
  { id: 8, src: "https://picsum.photos/seed/gal8/200/200", alt: "Gallery 8" },
  { id: 9, src: "https://picsum.photos/seed/gal9/200/200", alt: "Gallery 9" },
  { id: 10, src: "https://picsum.photos/seed/gal10/200/200", alt: "Gallery 10" },
  { id: 11, src: "https://picsum.photos/seed/gal11/200/200", alt: "Gallery 11" },
  { id: 12, src: "https://picsum.photos/seed/gal12/200/200", alt: "Gallery 12" },
  { id: 13, src: "https://picsum.photos/seed/gal13/200/200", alt: "Gallery 13" },
  { id: 14, src: "https://picsum.photos/seed/gal14/200/200", alt: "Gallery 14" },
  { id: 15, src: "https://picsum.photos/seed/gal15/200/200", alt: "Gallery 15" },
];

/**
 * ArcItem - A single image that reacts spatially.
 * As it nears the center of the screen, it goes up (or down).
 */
function ArcItem({ img, peakDirection = -1 }) {
  const innerRef = useRef(null);

  useAnimationFrame(() => {
    if (!innerRef.current) return;
    const rect = innerRef.current.getBoundingClientRect();
    // Calculate the center of this element
    const centerX = rect.x + rect.width / 2;
    const W = window.innerWidth;

    // peakDirection: -1 elevates UP, 1 elevates DOWN
    const peakOffset = 65 * peakDirection;

    // Zig-zag / wave calculation
    // We create a continuous cosine wave with peaks at:
    // Left edge (0), Center (W/2), Right edge (W)
    const angle = (centerX / W) * 4 * Math.PI;

    // normalizedWave oscillates from 0 (trough) to 1 (peak)
    const normalizedWave = 0.5 * (1 + Math.cos(angle));
    const y = peakOffset * normalizedWave;

    // Set the transform dynamically purely based on screen position
    innerRef.current.style.transform = `translateY(${y}px)`;
  });

  return (
    <div className="flex-shrink-0 pr-6 md:pr-8">
      <div ref={innerRef} className="will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.alt}
          width={150}
          height={150}
          draggable={false}
          className="
            w-[90px] h-[90px]
            sm:w-[110px] sm:h-[110px]
            md:w-[130px] md:h-[130px]
            rounded-[16px]
            object-cover
            shadow-[0_8px_30px_rgba(0,0,0,0.12)]
            pointer-events-none
          "
        />
      </div>
    </div>
  );
}

/**
 * MarqueeRow – a single infinite scrolling row.
 *
 * direction: "left"  → images scroll right-to-left
 *            "right" → images scroll left-to-right
 * speed:     seconds for one full cycle (higher = slower)
 */
function MarqueeRow({ images, direction = "left", speed = 28, peakDirection = -1 }) {
  // Triple the array so the seamless loop math always works
  const tripled = [...images, ...images, ...images];

  // One "page" of content = 1/3 of total width
  const xFrom = direction === "left" ? "0%" : "-33.3333%";
  const xTo = direction === "left" ? "-33.3333%" : "0%";

  // Add targeted padding to avoid clipping the peak, while keeping the opposite side tight
  const paddingClass = peakDirection === -1 ? "pt-[100px] pb-[40px]" : "pt-[40px] pb-[100px]";

  return (
    <div className={`overflow-hidden ${paddingClass} w-full select-none`}>
      <motion.div
        className="flex w-max"
        animate={{ x: [xFrom, xTo] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {tripled.map((img, i) => (
          <ArcItem
            key={`${img.id}-${i}`}
            img={img}
            peakDirection={peakDirection}
          />
        ))}
      </motion.div>
    </div>
  );
}

/**
 * HeroGallery – drop this into any Next.js page.
 *
 * Transparent background — pair it with a white/light page bg.
 * Text fades + un-blurs on scroll entry.
 */
export default function SliderGallery() {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: false, margin: "-80px" });

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center overflow-hidden">

      {/* ── TOP ROW: right → left, arcing UP (-1) ── */}
      <div>
        <MarqueeRow images={IMAGES} direction="left" speed={30} peakDirection={-1} />
      </div>

      {/* ── CENTRE TEXT ── */}
      <div
        ref={textRef}
        className="
          relative z-10 text-center px-6
          py-2 md:py-4
          flex flex-col items-center gap-2
          -my-12
        "
      >
        {/* Small logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-1"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400"
          >
            <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M18 10C18 10 12 14 12 18.5C12 21.538 14.686 24 18 24C21.314 24 24 21.538 24 18.5C24 14 18 10 18 10Z"
              fill="currentColor"
              opacity="0.3"
            />
            <circle cx="18" cy="19" r="3" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(24px)", y: 24 }}
          animate={
            isInView
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : {}
          }
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="
            text-[clamp(1.6rem,4vw,2.5rem)]
            font-black
            leading-[1.08]
            tracking-[-0.03em]
            text-gray-900
          "
        >
          You will find yourself
          <br />
          among us
        </motion.h1>

        {/* Sub-headline — slightly delayed blur-in */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(16px)", y: 16 }}
          animate={
            isInView
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : {}
          }
          transition={{
            duration: 0.8,
            delay: 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            text-[clamp(0.85rem,1.5vw,1rem)]
            text-gray-400
            leading-relaxed
            max-w-[320px]
          "
        >
          Dive into a dynamic community where artists
          <br className="hidden sm:block" />
          and buyers seamlessly merge.
        </motion.p>
      </div>

      {/* ── BOTTOM ROW: left → right, arcing DOWN (1) ── */}
      <div className="z-20">
        <MarqueeRow images={IMAGES} direction="right" speed={26} peakDirection={1} />
      </div>
    </section>
  );
}