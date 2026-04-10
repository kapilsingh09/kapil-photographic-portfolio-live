"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import { useContent } from "@/hooks/useContent";
import HoverTag from "./HoverTag";

/* ─────────────────────────────────────────────────────────────
   SURROUNDING IMAGE TILES
   Each entry: seed, positional CSS, dimensions, fly-in offsets
───────────────────────────────────────────────────────────── */
const TILES = [
    // ── COL 1 (Outer Left — small, further out) ──
    { seed: "ti01", ml: -500, mt: -190, w: 120, h: 155, initX: -150, initY: -100, tag: "@alex", color: "bg-red-500", tagPos: "bottom" },
    { seed: "ti02", ml: -510, mt: -10, w: 130, h: 160, initX: -180, initY: 0, tag: "@jordan", color: "bg-blue-500", tagPos: "bottom" },
    { seed: "ti03", ml: -495, mt: 175, w: 125, h: 150, initX: -150, initY: 120, tag: "@taylor", color: "bg-green-500", tagPos: "bottom" },

    // ── COL 2 (Inner Left — medium, closer) ──
    { seed: "ti04", ml: -310, mt: -260, w: 150, h: 195, initX: -100, initY: -150, tag: "@sam", color: "bg-purple-500", tagPos: "bottom" },
    { seed: "ti05", ml: -320, mt: -40, w: 160, h: 175, initX: -130, initY: 0, tag: "@casey", color: "bg-yellow-500", tagPos: "bottom" },
    { seed: "ti06", ml: -305, mt: 160, w: 145, h: 185, initX: -100, initY: 120, tag: "@riley", color: "bg-pink-500", tagPos: "bottom" },

    // ── COL 3 (Center Flankers — biggest, tight to center) ──
    { seed: "ti07", ml: -95, mt: -295, w: 175, h: 220, initX: 0, initY: -200, tag: "@morgan", color: "bg-indigo-500", tagPos: "bottom" },
    { seed: "ti08", ml: -90, mt: 155, w: 180, h: 210, initX: 0, initY: 180, tag: "@quinn", color: "bg-teal-500", tagPos: "bottom" },

    // ── COL 4 (Inner Right — medium, closer) ──
    { seed: "ti09", ml: 165, mt: -260, w: 155, h: 190, initX: 100, initY: -150, tag: "@avery", color: "bg-orange-500", tagPos: "bottom" },
    { seed: "ti10", ml: 155, mt: -45, w: 165, h: 180, initX: 130, initY: 0, tag: "@dakota", color: "bg-cyan-500", tagPos: "bottom" },
    { seed: "ti11", ml: 160, mt: 155, w: 150, h: 190, initX: 100, initY: 120, tag: "@reese", color: "bg-rose-500", tagPos: "bottom" },

    // ── COL 5 (Outer Right — small, further out) ──
    { seed: "ti12", ml: 365, mt: -195, w: 125, h: 160, initX: 150, initY: -100, tag: "@cam", color: "bg-lime-500", tagPos: "bottom" },
    { seed: "ti13", ml: 375, mt: -10, w: 130, h: 155, initX: 180, initY: 0, tag: "@blake", color: "bg-fuchsia-500", tagPos: "bottom" },
    { seed: "ti14", ml: 360, mt: 175, w: 120, h: 150, initX: 150, initY: 120, tag: "@drew", color: "bg-sky-500", tagPos: "bottom" },
];

/* ─────────────────────────────────────────────────────────────
   Surrounding tile — flies in from offset, de-blurs
───────────────────────────────────────────────────────────── */
function Tile({ data, progress }) {
    const x = useTransform(progress, [0, 1], [data.initX, 0]);
    const y = useTransform(progress, [0, 1], [data.initY, 0]);
    const op = useTransform(progress, [0, 0.35, 1], [0, 0.45, 1]);
    const sc = useTransform(progress, [0, 1], [0.78, 1]);
    const blurV = useTransform(progress, [0, 0.5, 1], [16, 6, 0]);
    const filt = useTransform(blurV, (v) => `blur(${v}px)`);

    const pos = {
        position: "absolute",
        width: data.w,
        height: data.h,
        top: "50%",
        left: "50%",
        marginLeft: data.ml,
        marginTop: data.mt,
    };

    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            style={{ ...pos, x, y, scale: sc, opacity: op, filter: filt }}
            className="rounded-[32px] overflow-hidden shadow-lg will-change-transform pointer-events-auto hover:cursor-pointer z-10 hover:z-100"
        >
            <HoverTag text={data.tag} bgClass={data.color} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`https://picsum.photos/seed/${data.seed}/400/520`}
                alt=""
                draggable={false}
                className="w-full h-full object-cover rounded-[32px]"
            />
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   CENTER CARD
   Note: Now accepts 'artist' data as a prop
───────────────────────────────────────────────────────────── */
function CenterCard({ progress, artist }) {
    const width = useTransform(progress, [0, 1], ["100vw", "250px"]);
    const height = useTransform(progress, [0, 1], ["100vh", "300px"]);
    const br = useTransform(progress, [0, 0.3, 1], ["10px", "26px", "32px"]);

    const cardY = useTransform(progress, [0, 1], [60, 0]);
    const sY = useSpring(cardY, { stiffness: 50, damping: 18 });

    const uiOp = useTransform(progress, [0.6, 1], [0, 1]);
    const shadowOp = useTransform(progress, [0, 1], [0.1, 0.28]);

    return (
        <motion.div
            style={{
                width,
                height,
                borderRadius: br,
                y: sY,
                position: "absolute",
                top: "53%",
                left: "50%",
                translateX: "-50%",
                translateY: "-50%",
                zIndex: 30,
                overflow: "hidden",
                boxShadow: useTransform(shadowOp, (v) => `0 28px 80px rgba(0,0,0,${v})`),
            }}
            className="will-change-transform"
        >
            <img
                src={artist.image}
                alt={artist.name}
                draggable={false}
                style={{ objectPosition: "top center" }}
                className="w-full h-full object-cover"
            />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(220,80,20,0.12) 0%, transparent 45%, rgba(0,0,0,0.60) 100%)",
                }}
            />

            <motion.div style={{ opacity: uiOp }} className="absolute top-5 right-5 z-10">
                <button className="btn-like">
                    <svg viewBox="0 0 24 24" fill="#ef4444" className="w-[15px] h-[15px]">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    Like
                </button>
            </motion.div>

            <motion.div style={{ opacity: uiOp }} className="absolute top-[72px] left-5 z-10">
                <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div
                        className="text-white text-[13px] font-extrabold px-4 py-2 shadow-2xl select-none"
                        style={{ background: "#ff5c35", borderRadius: "18px 18px 18px 4px" }}
                    >
                        {artist.handle}
                    </div>
                </motion.div>
            </motion.div>

            <motion.div style={{ opacity: uiOp }} className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white shadow flex-shrink-0">
                        <img
                            src={artist.avatar}
                            alt={artist.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-white font-bold text-[15px] leading-tight drop-shadow-sm">
                            {artist.name}
                        </p>
                        <p className="text-white/60 text-xs drop-shadow-sm">{artist.source}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   SCROLL HINT
───────────────────────────────────────────────────────────── */
function ScrollHint({ progress }) {
    const op = useTransform(progress, [0, 0.12], [1, 0]);
    return (
        <motion.div
            style={{ opacity: op }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 pointer-events-none"
        >
            <span className="text-[10px] font-bold tracking-[0.22em] text-gray-400 uppercase">
                Scroll to explore
            </span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 h-8 rounded-full border-2 border-gray-300 flex justify-center pt-1.5"
            >
                <div className="w-[3px] h-2 rounded-full bg-gray-400" />
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   EXPORTED COMPONENT
───────────────────────────────────────────────────────────── */
export default function HeroScrollGallery() {
    const { featuredArtist } = useContent();
    const containerRef = useRef(null);

    // Merge static positions with dynamic content
    const dynamicTiles = TILES.map((tile, i) => ({
        ...tile,
        tag: featuredArtist.tiles[i]?.tag || tile.tag,
        color: featuredArtist.tiles[i]?.color || tile.color,
        seed: featuredArtist.tiles[i]?.seed || tile.seed,
    }));

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map the scroll so that the animation finishes when the user has scrolled 75% of the way. 
    // The final 25% of the scroll container will hold the completely animated state perfectly still, 
    // giving them ample time to admire the images before the next component pushes up.
    const heldProgress = useTransform(scrollYProgress, [0, 0.75], [0, 1]);

    // ─────────────────────────────────────────────────────────────
    // Master smooth progress for a premium, heavy, fluid float.
    // ─────────────────────────────────────────────────────────────
    const smoothProgress = useSpring(heldProgress, {
        stiffness: 45,
        damping: 28,
        mass: 0.8,
        restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Mobile: simplified (prevents absolute tile overflow) */}
            <section className="md:hidden w-full px-4 py-20">
                <div className="mx-auto w-full max-w-md rounded-4xl border border-border-subtle bg-surface shadow-[0_28px_80px_rgba(0,0,0,0.10)] overflow-hidden transition-colors duration-300">
                    <div className="relative aspect-[4/5] w-full bg-surface-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={featuredArtist.hero.image}
                            alt="Featured"
                            className="absolute inset-0 w-full h-full object-cover object-top"
                            draggable={false}
                        />
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(220,80,20,0.10) 0%, transparent 45%, rgba(0,0,0,0.55) 100%)",
                            }}
                        />
                        <div className="absolute top-4 left-4">
                            <div
                                className="text-white text-[11px] font-extrabold px-3 py-2 shadow-2xl select-none"
                                style={{ background: "#ff5c35", borderRadius: "18px 18px 18px 4px" }}
                            >
                                {featuredArtist.hero.handle}
                            </div>
                        </div>
                        <div className="absolute top-4 right-4">
                            <button className="btn-like">
                                <svg viewBox="0 0 24 24" fill="#ef4444" className="w-[15px] h-[15px]">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                Like
                            </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white shadow flex-shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={featuredArtist.hero.avatar}
                                        alt={featuredArtist.hero.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-[15px] leading-tight drop-shadow-sm">
                                        {featuredArtist.hero.name}
                                    </p>
                                    <p className="text-white/60 text-xs drop-shadow-sm">{featuredArtist.hero.source}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-content-muted mb-2">
                            Featured profile
                        </p>
                        <h3 className="text-2xl font-black tracking-tight text-content transition-colors duration-300">
                            {featuredArtist.mobile.title}
                        </h3>
                        <p className="subtext mt-3 text-content-muted">
                            {featuredArtist.mobile.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Desktop: original sticky animation */}
            <div className="hidden md:block h-[400vh]">
                <div className="sticky top-0 w-full h-screen overflow-hidden">
                    <CenterCard progress={smoothProgress} artist={featuredArtist.hero} />

                    <div className="absolute inset-0 max-w-[1120px] mx-auto pointer-events-none z-0">
                        {dynamicTiles.map((tile) => (
                            <Tile key={tile.seed} data={tile} progress={smoothProgress} />
                        ))}
                    </div>

                    <ScrollHint progress={smoothProgress} />
                </div>
            </div>
        </div>
    );
}