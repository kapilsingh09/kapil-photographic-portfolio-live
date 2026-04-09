"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const images = Array.from({ length: 10 }, (_, i) => `/photocard_imgs/pc-img-${i + 1}.jpg`);

const photoData = [
    { place: "@tokyo", info: "Neon reflections across the bustling Shibuya crossing under a midnight drizzle." },
    { place: "@kyoto", info: "A quiet morning illuminating ancient wooden temples and crimson autumn leaves." },
    { place: "@sapporo", info: "Pristine snowscapes stretching through quiet streets beneath the winter moon." },
    { place: "@osaka", info: "Vibrant street food stalls glowing amidst the electric energy of Dotonbori." },
    { place: "@nara", info: "Sunlight filtering softly through ancient forests and mist-covered shrines." },
    { place: "@fuji", info: "A breathtaking silhouette of the iconic peak against a clear twilight sky." },
    { place: "@hakone", info: "Steaming hot springs hidden within emerald valleys and misty mountain trails." },
    { place: "@kobe", info: "Glistening city lights reflecting off the calm harbor waters at dusk." },
    { place: "@okinawa", info: "Crystal-clear turquoise waves crashing against dramatic coral coastlines." },
    { place: "@yokohama", info: "A modern skyline gleaming bright against the backdrop of an endless urban sprawl." },
];

// ─── Reusable scroll-reveal wrapper ───────────────────────────────────────────
function ScrollReveal({
    children,
    delay = 0,
    y = 60,
    blur = 18,
    className = "",
}) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: `blur(${blur}px)`, y }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{
                duration: 1.1,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ─── Floating tag badge ────────────────────────────────────────────────────────
function RotatingTag() {
    return (
        <motion.div
            initial={{ scale: 0, rotate: 15, opacity: 0 }}
            whileInView={{ scale: 1, rotate: -8, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.7 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="absolute left-[80%] -top-20 hidden md:flex w-32 px-6 py-2 bg-black text-white rounded-full items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer relative"
        >
            <span className="text-[10px] font-bold tracking-widest uppercase z-10">
                @landscapes
            </span>
            {/* The Pin Triangle pointing down */}
            <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45 z-[0]" />
        </motion.div>
    );
}

// ─── Dynamic synchronizing tag badge ────────────────────────────────────────────────────────
function DynamicTag({ text }) {
    return (
        <motion.div
            initial={{ scale: 0, rotate: 20, opacity: 0 }}
            animate={{ scale: 1, rotate: -4, opacity: 1 }}
            exit={{ scale: 0, rotate: -24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            whileHover={{ scale: 1.05, rotate: 6 }}
            className="absolute left-[13%] md:left-[20%] -top-[60%] md:-top-[90%] min-w-[120px] flex px-5 py-2 bg-black backdrop-blur-md  text-white rounded-full items-center justify-center shadow-xl cursor-pointer z-50"
        >
            <span className="text-xs font-bold tracking-widest uppercase z-10 w-full text-center">
                {text}
            </span>
            <div className="absolute -bottom-[4px] left-6 w-3 h-3 bg-black  backdrop-blur-md rotate-45 z-[0]" />
        </motion.div>
    );
}

export default function PhotoCard() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef(null);

    // Parallax on the card
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const rawY = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const cardY = useSpring(rawY, { stiffness: 80, damping: 20 });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <main className="min-h-[95vh] text-black font-sans">
            <section ref={sectionRef} className="max-w-7xl mx-auto px-8 relative">

                {/* ── Header ── */}
                <header className="relative">
                    <ScrollReveal delay={0} y={30} blur={12}>
                        <p className="text-[1.5vh] font-bold tracking-[0.3em] uppercase px-2 text-gray-400 mb-1.5">
                            Visual Anthology
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1} y={40} blur={16}>
                        <h1 className="text-4xl md:text-5xl font-[700] leading-[1.08] tracking-tighter max-w-2xl text-gray-900">
                            Gateway to <br />
                            <span className="">artistic masterworks.</span>
                        </h1>
                    </ScrollReveal>

                    {/* Rotating floating tag */}
                    <RotatingTag />
                </header>

                {/* ── Sliding Card ── */}
                <ScrollReveal delay={0.2} y={70} blur={20}>
                    <motion.div style={{ y: cardY }}>
                        <div className="relative w-full h-[65vh] rounded-[1.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] bg-zinc-950">

                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={images[currentIndex]}
                                        alt={`Artwork ${currentIndex + 1}`}
                                        fill
                                        className="object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                </motion.div>
                            </AnimatePresence>

                            {/* UI overlay */}
                            <div className="absolute inset-0 z-20 pointer-events-none">

                                {/* Dot indicators */}
                                <div className="absolute top-8 right-8 md:right-12 flex items-center gap-1 pointer-events-auto">
                                    {images.map((_, i) => (
                                        <motion.button
                                            key={i}
                                            onClick={() => setCurrentIndex(i)}
                                            animate={{
                                                scale: i === currentIndex ? 1.5 : 1,
                                                backgroundColor: i === currentIndex ? "#fff" : "rgba(255,255,255,0.3)",
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ boxShadow: i === currentIndex ? "0 0 8px rgba(255,255,255,1)" : "none" }}
                                        />
                                    ))}
                                </div>

                                {/* Bottom: title + buttons */}
                                <div className="absolute left-6 right-6 bottom-4 md:left-10 md:right-10 md:bottom-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-0 pointer-events-auto">
                                    <div className="space-y-4 max-w-[200px] md:max-w-sm">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={`wrapper-${currentIndex}`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="relative"
                                            >
                                                {/* Dynamic tag that animates in sync with the current slide */}
                                                <DynamicTag text={photoData[currentIndex].place} />
                                                
                                                <motion.div
                                                    initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                                >
                                                    <p className="subtext-light mb-8 font-medium">
                                                        {photoData[currentIndex].info}
                                                    </p>
                                                    <motion.button
                                                        whileHover={{ scale: 1.04, backgroundColor: "#fff", color: "#000" }}
                                                        whileTap={{ scale: 0.95 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                        className="btn-hero-outline"
                                                    >
                                                        Capture View
                                                    </motion.button>
                                                </motion.div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* Nav buttons */}
                                    <div className="flex gap-2 md:gap-4 self-end md:self-auto">
                                        {[{ icon: <ChevronLeft size={20} className="text-black" />, fn: handlePrev },
                                        { icon: <ChevronRight size={20} className="text-black" />, fn: handleNext }].map(({ icon, fn }, idx) => (
                                            <motion.button
                                                key={idx}
                                                onClick={fn}
                                                whileHover={{ scale: 1.04, backgroundColor: "rgba(255, 255, 255, 0.79)" }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 50 }}
                                                className="p-3 hover:cursor-pointer  bg-white backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl"
                                            >
                                                {icon}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </ScrollReveal>

            </section>
        </main>
    );
}