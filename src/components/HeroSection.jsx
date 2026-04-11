"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
    animate as fmAnimate,
    useMotionValue,
    useMotionValueEvent,
    useMotionTemplate,
} from "framer-motion";

import { useContent } from "@/hooks/useContent";

// ────────────────────────────────────────────────────────────────
// ARC MATH — y = k * (x - centerX)²
// ────────────────────────────────────────────────────────────────
const ARC_X_PCT = [17, 28, 39, 50, 61, 72, 83];
const ARC_CENTER_X = 50;
const ARC_K = 0.012; // Flatten the curve

function parabolicY(xPct) {
    return ARC_K * Math.pow(xPct - ARC_CENTER_X, 2);
}

const ARC_ROTATIONS = [-8, -5, -2, 0, 2, 5, 8];
// Fixed scale so all images look exactly the same size!
const ARC_SCALES = [1, 1, 1, 1, 1, 1, 1];
const ARC_ZINDEX = [22, 24, 26, 28, 26, 24, 22];

// Staggered delays — center first, edges last for dramatic bloom
const BLOOM_DELAYS = [0.35, 0.25, 0.15, 0, 0.15, 0.25, 0.35];

// Arc positions in vw/vh
function arcXvw(index) {
    return ARC_X_PCT[index] * 0.76 + 12;
}
function arcYvh(index) {
    const drop = parabolicY(ARC_X_PCT[index]);
    // Base is 55. If it's the center image (index 3), we pull it up slightly (-5vh)
    const extraOffset = index === 3 ? -5 : 0;
    return 54 + drop * 0.55 + extraOffset;
}

// ────────────────────────────────────────────────────────────────
// DIAGONAL TARGET — "fanned deck of cards" on the right
// 8vw horizontal gap + 10vh vertical gap between each image
// ────────────────────────────────────────────────────────────────
const V2_TARGETS = [
    { xVw: 54, yVh: 40, rotate: 0, scale: 1.0 }, // Shifted Up & Right
    { xVw: 65, yVh: 52, rotate: 0, scale: 1.0 },
    { xVw: 76, yVh: 65, rotate: 0, scale: 1.0 },
    { xVw: 87, yVh: 77, rotate: 0, scale: 1.0 },
    { xVw: 98, yVh: 86, rotate: 0, scale: 1.0 }, // Center hits 98% of screen, bleeds out heavily
    { xVw: 109, yVh: 94, rotate: 0, scale: 1.0 }, // Further down staircase, completely off screen right!
    { xVw: 120, yVh: 108, rotate: 0, scale: 1.0 }, // Flows completely off screen smoothly!
];

// Z-index for the staircase: First index is behind, last index is in front!
const V2_ZINDEX = [21, 22, 23, 24, 25, 26, 27];

const SCROLL_SPRING = { stiffness: 250, damping: 35 };

// ────────────────────────────────────────────────────────────────
// FLOATING IMAGE — position: fixed, animates bottom → arc → diagonal
// ────────────────────────────────────────────────────────────────
const FloatingImage = ({ children, index, scrollYProgress, isInView, tag1, tag1Props, tag2, tag2Props, hoverTag, disableHover }) => {
    const [bloomed, setBloomed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Turn off hover effect immediately if disableHover flips to true while already hovered
    useEffect(() => {
        if (disableHover) {
            setIsHovered(false);
        }
    }, [disableHover]);

    const startXvw = arcXvw(index);
    const startYvh = arcYvh(index);
    const endXvw = V2_TARGETS[index].xVw;
    const endYvh = V2_TARGETS[index].yVh;

    // ── Phase 1: Motion values for the bundle-to-fan entrance ──
    // Start BELOW the viewport (120vh), small, and invisible
    const mvOpacity = useMotionValue(0);
    const mvXvw = useMotionValue(50);       // center horizontally
    const mvYvh = useMotionValue(120);      // below viewport
    const mvRotate = useMotionValue(0);
    const mvScale = useMotionValue(0.5);
    const mvBlur = useMotionValue(20);      // Starts with a heavy blur

    // Smooth extra pop-up after loading
    const mvExtraY = useMotionValue(0);
    const mvTagOpacity = useMotionValue(0);
    const mvTagScale = useMotionValue(0);

    useEffect(() => {
        if (!isInView || bloomed) return;

        // Elegant, smooth, much slower cinematic spring
        const spring = { type: "spring", stiffness: 80, damping: 20 };
        let active = true;

        const runEntrance = async () => {
            // Initial blank screen holding for a moment
            await new Promise((r) => setTimeout(r, 400));
            if (!active) return;

            // 1. Bundle Entrance: Bring everything to center (55vh) at scale 1
            fmAnimate(mvOpacity, 1, { duration: 0.6, ease: "easeOut" });
            fmAnimate(mvScale, 1, spring);
            fmAnimate(mvYvh, 55, spring);
            fmAnimate(mvXvw, 50, spring);
            fmAnimate(mvBlur, 0, { duration: 0.6, ease: "easeOut" });

            // 2. Spread to ARC (Slower progression, elegance focused)
            setTimeout(() => {
                if (!active) return;
                fmAnimate(mvXvw, startXvw, spring);
                fmAnimate(mvYvh, startYvh, spring);
                fmAnimate(mvRotate, ARC_ROTATIONS[index], spring);
                fmAnimate(mvScale, ARC_SCALES[index], spring);

                if (tag1) {
                    setTimeout(() => {
                        if (!active) return;
                        // Extremely smooth pop entrance for the tags
                        fmAnimate(mvExtraY, -3, { type: "spring", stiffness: 80, damping: 15 });
                        fmAnimate(mvTagOpacity, 1, { duration: 0.5, ease: "easeOut" });
                        fmAnimate(mvTagScale, 1, { type: "spring", stiffness: 100, damping: 14 });
                    }, 600); // Give the arc time to form before tags pop slowly
                }

                setTimeout(() => { if (active) setBloomed(true); }, 1200); // Lock to scroll only after majestic spread is fully done
            }, 800);
        };

        runEntrance();

        return () => { active = false; };
    }, [isInView]); // eslint-disable-line react-hooks/exhaustive-deps

    // 0    → 0.08: SMALL DELAY — Images stay completely spread out in their Arc positions.
    // 0.08 → 0.40: Form Center Bundle
    // 0.40 → 0.55: Lock zone
    // 0.55 → 1.00: Glide purely to RIGHT side
    const mapInput = [0, 0.08, 0.40, 0.55, 1];

    const scrollXvw = useTransform(scrollYProgress, mapInput, [startXvw, startXvw, 50, 50, endXvw]);
    const scrollYvh = useTransform(scrollYProgress, mapInput, [startYvh, startYvh, 45, 45, endYvh]);

    // Tag1 logic: Top section tags.
    const scrollTag1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);
    const scrollTag1Scale = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0.5]);

    // Tag2 logic: Bottom section tags. Appear strictly when exactly fully diagonally set at the end!
    const scrollTag2Opacity = useTransform(scrollYProgress, [0, 0.85, 1], [0, 0, 1]);
    const scrollTag2Scale = useTransform(scrollYProgress, [0, 0.85, 1], [0.5, 0.5, 1]);

    // Extra images disappear seamlessly during the spread since EXACTLY 5 images are required down there!
    const endOpacity = index > 4 ? 0 : 1;
    const scrollOpacity = useTransform(scrollYProgress, [0, 0.40, 0.55, 1], [1, 1, 1, endOpacity]);

    const scrollRotate = useTransform(
        scrollYProgress,
        mapInput,
        [ARC_ROTATIONS[index], ARC_ROTATIONS[index], 0, 0, V2_TARGETS[index].rotate]
    );
    const scrollScale = useTransform(
        scrollYProgress,
        mapInput,
        [ARC_SCALES[index], ARC_SCALES[index], 1, 1, V2_TARGETS[index].scale]
    );

    // Hold ARC_ZINDEX across the delay and bundle phase
    const scrollZIndex = useTransform(
        scrollYProgress,
        mapInput,
        [ARC_ZINDEX[index], ARC_ZINDEX[index], ARC_ZINDEX[index], ARC_ZINDEX[index], V2_ZINDEX[index]]
    );

    // ── Switch: bloom motion values → strict ZERO-JITTER scroll transforms ──
    const dXvw = bloomed ? scrollXvw : mvXvw;
    const dYvh = bloomed ? scrollYvh : mvYvh;
    const dRotate = bloomed ? scrollRotate : mvRotate;
    const dScale = bloomed ? scrollScale : mvScale;
    const dOpacity = bloomed ? scrollOpacity : mvOpacity;

    // Switch tag1 to fade out correctly on scroll
    const dTag1Opacity = bloomed ? scrollTag1Opacity : mvTagOpacity;
    const dTag1Scale = bloomed ? scrollTag1Scale : mvTagScale;

    // We combine the base animation Y (dYvh) with the extra Y bounce
    const scrollExtraY = useTransform(scrollYProgress, [0, 0.08, 0.40], [tag1 ? -3 : 0, tag1 ? -3 : 0, 0]);
    const dExtraY = bloomed ? scrollExtraY : mvExtraY;

    const combinedYvh = useTransform([dYvh, dExtraY], ([base, extra]) => base + extra);

    // Convert vw/vh to CSS
    const leftCss = useTransform(dXvw, (v) => `${v}vw`);
    const topCss = useTransform(combinedYvh, (v) => `${v}vh`);
    const zIdx = useTransform(scrollZIndex, (v) => Math.round(v));
    const filterCss = useTransform(mvBlur, (v) => `blur(${v}px) drop-shadow(0px ${(20 - v) / 4}px ${(20 - v) / 2}px rgba(0,0,0,0.1))`);

    return (
        <motion.div
            onHoverStart={() => !disableHover && setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
                position: "absolute",
                left: leftCss,
                top: topCss,
                x: "-50%",
                y: "-50%",
                zIndex: isHovered ? 100 : zIdx,
                rotate: dRotate,
                scale: dScale,
                opacity: dOpacity,
                filter: filterCss,
                pointerEvents: "auto", // Hover completely fixed for Hero Section! (Only disabled naturally after disappearing)
                willChange: "transform, opacity, filter",
            }}
        >
            <motion.div
                className="relative rounded-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                {children}

                {/* The new Hover Tag */}
                {hoverTag && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10, scale: isHovered ? 1 : 0.9 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`absolute -bottom-6 left-1/2 -translate-x-1/2 ${hoverTag.bg || 'bg-black'} text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-2xl z-50 whitespace-nowrap pointer-events-none`}
                    >
                        {hoverTag.label}
                    </motion.div>
                )}
                {tag1 && (
                    <motion.div
                        style={{ opacity: dTag1Opacity, scale: dTag1Scale }}
                        className={`absolute -top-9 ${tag1Props.pos} ${tag1Props.bg} text-white text-xs px-3 py-1 rounded-full shadow-lg z-30 origin-bottom`}
                    >
                        {tag1}
                        <div className={`absolute ${tag1Props.pos} -bottom-1 w-2 h-2 ${tag1Props.bg} rotate-45`} />
                    </motion.div>
                )}
                {tag2 && (
                    <motion.div
                        style={{ opacity: scrollTag2Opacity, scale: scrollTag2Scale }}
                        className={`absolute -top-9 ${tag2Props.pos} ${tag2Props.bg} text-white text-xs px-3 py-1 rounded-full shadow-lg z-30 origin-bottom`}
                    >
                        {tag2}
                        <div className={`absolute ${tag2Props.pos} -bottom-1 w-2 h-2 ${tag2Props.bg} rotate-45`} />
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}

// ────────────────────────────────────────────────────────────────
// HERO SECTION
// ────────────────────────────────────────────────────────────────
export default function HeroSection() {
    const { hero } = useContent();
    const router = useRouter();
    const containerRef = useRef(null);
    const arcRef = useRef(null);
    const isInView = useInView(arcRef, { once: false, margin: "-100px" });

    // Locomotive Scroll for buttery smooth scrolling
    useEffect(() => {
        let locomotiveScroll;
        (async () => {
            const LocomotiveScroll = (await import("locomotive-scroll")).default;
            locomotiveScroll = new LocomotiveScroll({
                el: containerRef.current,
                smooth: true,
                lerp: 0.08,
            });
        })();
        return () => locomotiveScroll?.destroy();
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [isBundling, setIsBundling] = useState(false);

    // Disable hovers exclusively when images are locked into the bundle (0.15 to 0.55 mark)
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setIsBundling(latest > 0.15 && latest < 0.55);
    });

    // Elegant background blur that activates during the bundle stack
    const bundleBlurOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.55, 0.8], [0, 1, 1, 0]);

    // Top text fade and blur as we scroll
    const titleOpacity = useTransform(scrollYProgress, [0.05, 0.2], [1, 0]);
    const titleBlurValue = useTransform(scrollYProgress, [0.05, 0.2], [0, 12]);
    const titleBlurTemplate = useMotionTemplate`blur(${titleBlurValue}px)`;

    return (
        <div
            ref={containerRef}
            className="relative w-full"
        >
            {/* Desktop-only: cinematic blur + floating bundle/arc/diagonal images */}
            <div className="hidden md:block">
                {/* ── CINEMATIC BUNDLE PAGE BLUR OVERLAY ── here is the blur*/}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
                    <motion.div
                        className="sticky top-0 left-0 w-full h-screen backdrop-blur-[12px] bg-slate-900/10 dark:bg-black/30 transition-colors duration-300"
                        style={{ opacity: bundleBlurOpacity, WebkitBackdropFilter: "blur(12px)" }}
                    />
                </div>

                {/* ── STICKY WRAPPER: Makes images stick during Section 1 & 2, then naturally scroll away!! ── */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30">
                    <div className="sticky top-0 left-0 w-full h-screen overflow-visible">
                        {/* ── FLOATING IMAGES ── */}
                        {hero.images.map((img, idx) => (
                            <FloatingImage
                                key={img.id}
                                index={idx}
                                scrollYProgress={scrollYProgress}
                                isInView={isInView}
                                hoverTag={{ label: img.tag, bg: img.color }}
                                disableHover={isBundling}
                                tag1={idx === 1 || idx === 5 ? img.tag : null}
                                tag1Props={idx === 1 ? { pos: "right-3", bg: img.color } : idx === 5 ? { pos: "left-3", bg: img.color } : {}}
                                tag2={idx === 2 ? img.tag : null}
                                tag2Props={idx === 2 ? { pos: "right-3", bg: img.color } : {}}
                            >
                                <div className="relative w-[190px] h-[190px] md:w-[220px] md:h-[220px] rounded-2xl shadow-xl overflow-hidden bg-surface-muted transition-colors">
                                    <Image src={img.src} loading="lazy" fill className="object-cover" sizes="(max-width: 768px) 100vw, 220px" alt="" />
                                </div>
                            </FloatingImage>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════ */}
            {/* SECTION 1: Hero — Centered Arch Layout             */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-4 overflow-visible mt-[-16px]">
                <motion.div style={{ opacity: titleOpacity, filter: titleBlurTemplate }} className="flex flex-col items-center pointer-events-none mt-10 md:mt-0">
                    <motion.h1
                        initial={{ opacity: 0, filter: "blur(12px)", y: -20 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        className="text-4xl md:text-6xl font-bold text-heading max-w-4xl leading-tight inline-block transition-colors"
                    >
                        {hero.title}
                    </motion.h1>
                </motion.div>
                {/* Invisible spacer — bloom trigger zone */}
                <div ref={arcRef} className="relative w-full max-w-5xl h-[220px] mb-16 hidden md:block" />
                {/* Mobile: keep layout tight (no floating images) */}
                <div className="md:hidden w-full max-w-md mt-8 mb-10">
                    <div className="grid grid-cols-3 gap-2 opacity-95">
                        {hero.images.slice(0, 6).map((img) => (
                            <div key={img.id} className="relative aspect-square overflow-hidden rounded-2xl bg-surface-muted shadow-sm transition-colors">
                                <Image src={img.src} loading="lazy" alt="" fill sizes="(max-width: 768px) 33vw, 210px" className="object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 100, damping: 15 }}
                    className="flex flex-col items-center gap-5"
                >
                    <p className="text-subheading text-md max-w-xl transition-colors">
                        {hero.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="w-full sm:w-44 h-12 rounded-full bg-content text-surface text-sm font-semibold tracking-tight cursor-pointer shadow-md transition-colors"
                            onClick={() => router.push('/pricing')}>
                            Get Started
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="w-full sm:w-44 h-12 rounded-full bg-surface text-heading text-sm font-semibold tracking-tight cursor-pointer border-[1.5px] border-border-subtle hover:border-heading transition-colors duration-200"
                            onClick={() => router.push('/gallery')}
                        >
                            Explore
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* SECTION 2: E-Commerce Split Layout                  */}
            {/* Images lock in diagonal here — z-40 stays below     */}
            {/* the left text content (z-50) so text is readable    */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 lg:px-28 py-20 lg:py-0 overflow-visible relative pb-20 z-40">
                {/* --- MOBILE (STATIC) --- */}
                <div className="md:hidden flex-1 max-w-2xl space-y-6 z-50 text-left relative">
                    <p className="text-xs tracking-[0.2em] text-subheading font-medium uppercase transition-colors">
                        {hero.splitSection.tagline}
                    </p>
                    <h1 className="text-4xl font-bold leading-[1.1] text-heading transition-colors whitespace-pre-line">
                        {hero.splitSection.title}
                    </h1>
                    <p className="subtext-lg max-w-md text-subheading transition-colors">
                        {hero.splitSection.description}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <button onClick={() => router.push("/pricing")} className="btn-primary-lg pointer-events-auto">
                            {hero.splitSection.ctaPrimary}
                        </button>
                        <button onClick={() => router.push("/about")} className="btn-secondary-lg pointer-events-auto">
                            {hero.splitSection.ctaSecondary}
                        </button>
                    </div>
                </div>

                {/* --- DESKTOP (ANIMATED) --- */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.5 }} // IMPORTANT: Triggers exactly when 50% of the section is visible (images are arriving)! Replays infinitely!
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                    className="hidden md:block flex-1 max-w-2xl space-y-6 z-50 text-left relative"
                >
                    <motion.p
                        variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                        className="text-xs md:text-sm tracking-[0.2em] text-subheading font-medium uppercase"
                    >
                        {hero.splitSection.tagline}
                    </motion.p>
                    <motion.h1
                        variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                        className="text-4xl md:text-5xl font-bold leading-[1.1] text-heading whitespace-pre-line"
                    >
                        {hero.splitSection.title}
                    </motion.h1>
                    <motion.p
                        variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                        className="subtext-lg max-w-md"
                    >
                        {hero.splitSection.description}
                    </motion.p>
                    <motion.div
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        <motion.button
                            variants={{ hidden: { opacity: 0, scale: 0.8, y: 20 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } } }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary-lg pointer-events-auto"
                        >
                            {hero.splitSection.ctaPrimary}
                        </motion.button>
                        <motion.button
                            variants={{ hidden: { opacity: 0, scale: 0.8, y: 20 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } } }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-secondary-lg pointer-events-auto"
                        >
                            {hero.splitSection.ctaSecondary}
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Right panel — images land here in the diagonal (hidden on mobile to prevent blank space) */}
                <div className="hidden lg:block flex-1 relative w-full max-w-[600px] h-[500px]" />
            </section>
        </div>
    );
}