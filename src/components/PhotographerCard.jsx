"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Reusable scroll-reveal wrapper
   Fades + un-blurs + slides up when the element enters viewport
───────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(18px)", y: 32 }}
      animate={
        inView
          ? { opacity: 1, filter: "blur(0px)", y: 0 }
          : { opacity: 0, filter: "blur(18px)", y: 32 }
      }
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Play Video button
───────────────────────────────────────────────────────────── */
function PlayVideoBtn() {
  return (
    <button className="btn-ghost flex items-center gap-2">
      <span className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center shrink-0">
        <svg viewBox="0 0 10 12" className="w-3 h-3 fill-white ml-0.5">
          <path d="M0 0l10 6-10 6V0z" />
        </svg>
      </span>
      Play Video
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Card 1 — "Connect, Create, Commerce"
   Light bg, stacked artwork cards, @robin bubble
───────────────────────────────────────────────────────────── */
function CardConnectCreate() {
  return (
    <Reveal delay={0.1} className="h-full">
      <div className="relative bg-card rounded-3xl p-7 flex flex-col justify-between h-full overflow-hidden min-h-[540px]">
        {/* Play Video */}
        <div className="absolute top-6 left-6 z-10">
          <PlayVideoBtn />
        </div>

        {/* Stacked artwork cards */}
        <div className="relative flex items-center justify-center mt-12 mb-12 h-52 select-none">
          {/* Top card – peeking upwards */}
          <div
            className="absolute w-36 h-48 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer rotate-[3deg] -translate-y-[34px] translate-x-[15px] z-[1] hover:z-50 hover:scale-[1.15]"
          >
            <img src="/images/img-2.jpg" alt="Art 3" className="w-full h-full object-cover" draggable={false} />
          </div>

          {/* Left card – peeking sideways */}
          <div
            className="absolute w-36 h-48 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 cursor-pointer -rotate-[15deg] -translate-x-[60px] translate-y-[10px] z-[2] hover:z-50 hover:scale-[1.15]"
          >
            <img src="/images/img-3.jpg" alt="Art 2" className="w-full h-full object-cover" draggable={false} />
          </div>

          {/* Bottom right card – peeking downwards */}
          <div
            className="absolute w-36 h-48 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 cursor-pointer rotate-[12deg] translate-x-[60px] translate-y-[35px] z-[3] hover:z-50 hover:scale-[1.15]"
          >
            <img src="/images/img-6.jpg" alt="Art 4" className="w-full h-full object-cover" draggable={false} />
          </div>

          {/* Front Main card */}
          <div
            className="absolute w-40 h-52 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10 transition-all duration-300 cursor-pointer rotate-0 z-[10] hover:z-50 hover:scale-[1.1]"
          >
            <img src="/section/img-1.jpg" alt="Main Art" className="w-full h-full object-cover" draggable={false} />
          </div>

          {/* @robin speech bubble (Hero Style Tag) */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1, repeat: 1, ease: "easeInOut" }}
            className="absolute z-20"
            style={{ top: "8px", right: "16px" }}
          >
            <div className="relative bg-[#4169e1] text-white text-xs px-3 py-1 rounded-full shadow-lg origin-bottom font-medium">
              @robin
              <div className="absolute left-3 -bottom-1 w-2 h-2 bg-[#4169e1] rotate-45" />
            </div>
          </motion.div>
        </div>

        {/* Text + CTA */}
        <div className="mt-auto">
          <h3 className="text-2xl font-bold text-heading mb-2">
            Connect, Create, Commerce
          </h3>
          <p className="subtext-muted mb-5">
            Offering buyers a chance to own a piece of that narrative.…
          </p>
          <button className="border-2 border-heading rounded-full px-5 py-2.5 hover:bg-heading hover:text-card transition-all font-medium text-heading">
            How it works
          </button>
        </div>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────────────────
   Card 2 — "Where Art Breathes Commerce"
   Royal-blue bg, eye illustration
───────────────────────────────────────────────────────────── */
function CardArtBreathes() {
  return (
    <Reveal delay={0.2} className="h-full">
      <div className="relative bg-[#1a35e8] rounded-3xl flex flex-col justify-between h-full overflow-hidden min-h-[540px]">
        {/* Header Image */}
        <div className="relative w-full h-72 overflow-hidden">
          <img
            src="/section/img-3.jpg"
            alt="Art illustration"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Text block with blurry effect */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-b-3xl border-t border-white/10">
          <h3 className="text-2xl font-bold text-white mb-2">
            Where Art Breathes Commerce
          </h3>
          <p className="subtext-light mb-6 leading-relaxed">
            Artistic spirit with commercial viability, providing a platform where creativity…
          </p>
          <button className="text-white border border-white rounded-full px-5 py-2.5 hover:bg-white hover:text-[#1a35e8] transition-all font-medium">
            Read more
          </button>
        </div>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────────────────
   Card 3 — "Spin Your Art into Gold"
   White bg, vibrant psychedelic photo
───────────────────────────────────────────────────────────── */
function CardSpinArt() {
  return (
    <Reveal delay={0.15} className="h-full">
      <div className="bg-card rounded-3xl flex flex-col overflow-hidden h-full min-h-[400px] shadow-sm">
        {/* Full-width colorful image */}
        <div className="relative w-full overflow-hidden" style={{ height: "260px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/section/img-1.jpg"
            alt="Spin your art"
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* Colorful overlay tint to mimic the psychedelic reference */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 via-yellow-300/20 to-green-400/30 mix-blend-screen" />
        </div>

        {/* Text + CTA */}
        <div className="px-7 py-6 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-2xl font-bold text-heading mb-1">
              Spin Your Art into Gold
            </h3>
            <p className="subtext-muted">
              Unleash your artistic potential, where innovation and creativity converge…
            </p>
          </div>
          <button className="border-2 border-heading rounded-full px-5 py-2.5 hover:bg-heading hover:text-card transition-all font-medium text-heading mt-3">
            Join us now
          </button>
        </div>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────────────────
   Card 4 — "Advantages / Personal Identity"
   Dark bg, stacked text list + arrow button
───────────────────────────────────────────────────────────── */
const ADVANTAGES = [
  { label: "Expression feels", highlight: true },
  { label: "Personal Identity", main: true },
  { label: "CreatiVortex Plots" },
  { label: "BrushBazaar for Arts" },
  { label: "Art Mary" },
];

function CardAdvantages() {
  return (
    <Reveal delay={0.25} className="h-full">
      <div className="relative bg-[#111111] rounded-3xl p-8 flex flex-col justify-between h-full min-h-[500px] overflow-hidden">
        {/* Eyebrow */}
        <p className="text-xs font-bold tracking-[0.2em] text-subheading uppercase mb-6">
          Advantages
        </p>

        {/* Stacked list */}
        <div className="flex flex-col gap-3 flex-1 justify-center">
          {ADVANTAGES.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`
                ${item.main
                  ? "text-3xl font-bold text-white"
                  : item.highlight
                    ? "text-lg font-semibold text-[#7c9bff]"
                    : "text-base font-medium text-subheading"}
              `}
            >
              {item.label}
            </motion.div>
          ))}
        </div>

        {/* Arrow button */}
        <div className="flex justify-end mt-6">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#ffffff", color: "#111" }}
            className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Subtle radial glow */}
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#1a35e8]/20 blur-3xl pointer-events-none" />
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Section
───────────────────────────────────────────────────────────── */
export default function StorySection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: false, margin: "-80px" });

  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 gap-4 pt-8 pb-20 md:pt-12 md:pb-28">
      <div className="w-full max-w-5xl flex flex-col items-center justify-center mx-auto">

        {/* ── Header ── */}
        <div ref={headingRef} className="text-center mb-16 md:mb-20">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)", y: 12 }}
            animate={headingInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
          >
            <span className="text-subheading">YOUR STORY </span>
            <span className="text-[#4169e1]">TELLING</span>
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, filter: "blur(22px)", y: 24 }}
            animate={headingInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.6rem,5.5vw,4.5rem)] font-bold leading-[1.07] tracking-[-0.03em] text-heading"
          >
            Every piece of art
            <br />
            tells a story
          </motion.h2>
        </div>

        {/* ── Flexbox Layout ── */}
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-start gap-y-6 md:gap-y-0">
          {/* Card 1: Top Left */}
          <div className="w-full md:w-[48%] -mt-10">
            <CardConnectCreate />
          </div>

          {/* Card 2 (Blue wala): Top Right (Shifted down) */}
          <div className="w-full md:w-[48%] md:mt-[80px]">
            <CardArtBreathes />
          </div>

          {/* Card 3: Bottom Left */}
          <div className="w-full md:w-[48%] md:-mt-[90px]">
            <CardSpinArt />
          </div>

          {/* Card 4 (Advantages): Bottom Right */}
          <div className="w-full md:w-[48%] md:mt-[30px]">
            <CardAdvantages />
          </div>
        </div>

      </div>
    </section>
  );
}