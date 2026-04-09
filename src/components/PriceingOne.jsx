'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Camera } from 'lucide-react'

// ─── Data ───────────────────────────────────────────────────────────────────

const INR = [
    { label: 'Monthly', sym: '₹', num: '4,999', dec: '', sub: 'Regular monthly billing', featured: false },
    { label: 'Quarterly', sym: '₹', num: '11,999', dec: '', sub: 'Save ₹3,000 vs monthly', featured: true },
    { label: 'Annually', sym: '₹', num: '39,999', dec: '', sub: 'Best value — 40% off', featured: false },
]
const USD = [
    { label: 'Monthly', sym: '$', num: '59', dec: '.99', sub: 'Regular monthly billing', featured: false },
    { label: 'Quarterly', sym: '$', num: '143', dec: '.99', sub: 'Save $35 vs monthly', featured: true },
    { label: 'Annually', sym: '$', num: '479', dec: '.99', sub: 'Best value — 40% off', featured: false },
]

const HEADING_WORDS = ['Book for.', 'Stories.', 'Adventures.']
const CARD_ROTATIONS = [-5, 0, 5]

// ─── Variants ───────────────────────────────────────────────────────────────

const wordVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
}

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: (i) => ({
        opacity: 1, y: 0,
        scale: i === 1 ? 1.06 : 0.95,
        transition: { delay: i * 0.15, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    }),
}

// Mobile card — simple fade + slide up, no scale tricks
const mobileCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
}

const numVariants = {
    exit: { y: -12, opacity: 0, transition: { duration: 0.16, ease: 'easeIn' } },
    enter: { y: 12, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function PricingSection() {
    const [isINR, setIsINR] = useState(false)
    const prices = isINR ? INR : USD

    const cardsRef = useRef(null)
    const isInView = useInView(cardsRef, { once: true, margin: '-60px' })

    return (
        <section
            className="relative flex flex-col md:flex-row items-center justify-center overflow-hidden px-6 md:px-16 gap-8"
            style={{
                minHeight: '30vh',
                fontFamily: "var(--font-geist-sans), 'Geist', sans-serif",
                paddingTop: '2.5rem',
                paddingBottom: '2.5rem',
            }}
        >
            {/* ── Left Panel ── */}
            <div className="relative z-10 flex-none w-full md:w-72 flex flex-col gap-3">

                {/* Icon + Currency Toggle row */}
                <div className="flex items-center justify-between">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ border: '1px solid rgba(200,120,40,0.5)', color: '#c87828' }}
                    >
                        <Camera size={16} strokeWidth={1.5} />
                    </div>

                    {/* Currency Toggle */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0, duration: 0.4 }}
                        className="flex items-center gap-2"
                    >
                        <span
                            className="cursor-pointer text-xs font-medium transition-colors duration-300"
                            style={{ color: isINR ? '#c87828' : 'rgba(23,23,23,0.35)' }}
                            onClick={() => setIsINR(true)}
                        >₹ INR</span>
                        <button
                            onClick={() => setIsINR((v) => !v)}
                            className="relative h-5 w-10 flex-none cursor-pointer rounded-full"
                            style={{ background: 'rgba(200,120,40,0.18)', border: '1px solid rgba(200,120,40,0.45)' }}
                            aria-label="Toggle currency"
                        >
                            <motion.span
                                animate={{ x: isINR ? 2 : 18 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className="absolute top-[2px] left-0 h-[16px] w-[16px] rounded-full"
                                style={{ background: '#c87828' }}
                            />
                        </button>
                        <span
                            className="cursor-pointer text-xs font-medium transition-colors duration-300"
                            style={{ color: !isINR ? '#c87828' : 'rgba(23,23,23,0.35)' }}
                            onClick={() => setIsINR(false)}
                        >$ USD</span>
                    </motion.div>
                </div>

                {/* Heading */}
                <h2 className="leading-none tracking-tight text-content transition-colors">
                    {HEADING_WORDS.map((word, i) => (
                        <motion.span
                            key={word}
                            custom={i}
                            variants={wordVariants}
                            initial="hidden"
                            animate="visible"
                            className="mr-2 inline-block"
                            style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700 }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h2>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.5 }}
                    className="subtext-xs"
                >
                    Every frame tells a story. Choose a plan that fits your vision.
                </motion.p>
            </div>

            {/* ── Cards: Desktop fan layout ── */}
            <div
                ref={cardsRef}
                className="relative z-10 flex-1 hidden md:block"
                style={{ height: 340, minWidth: 320, maxWidth: 640, width: '100%' }}
            >
                {prices.map((plan, i) => (
                    <motion.div
                        key={plan.label}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        whileHover={{
                            y: -8,
                            scale: i === 1 ? 1.11 : 0.98,
                            zIndex: 20,
                            transition: { duration: 0.22, ease: 'easeOut' },
                        }}
                        className={`absolute cursor-pointer h-50 rounded-2xl p-5 flex flex-col justify-between transition-colors ${plan.featured ? 'bg-orange-400 text-white' : 'bg-surface-muted text-content'}`}
                        style={{
                            rotate: CARD_ROTATIONS[i],
                            width: i === 1 ? 290 : 265,
                            ...(i === 0 && { left: '0%' }),
                            ...(i === 1 && { left: '50%', marginLeft: -145 }),
                            ...(i === 2 && { right: '0%' }),
                            top: '50%',
                            marginTop: i === 1 ? -148 : -122,
                            zIndex: i === 2 ? 15 : i === 1 ? 10 : 5,
                            boxShadow: plan.featured
                                ? '0 20px 50px rgba(234,179,8,0.35)'
                                : '0 10px 30px rgba(0,0,0,0.10)',
                        }}
                    >
                        <PriceCardContent plan={plan} i={i} isINR={isINR} />
                    </motion.div>
                ))}
            </div>

            {/* ── Cards: Mobile horizontal scroll ── */}
            <div
                ref={cardsRef}
                className="md:hidden w-full z-10"
            >
                <div
                    className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {prices.map((plan, i) => (
                        <motion.div
                            key={plan.label}
                            custom={i}
                            variants={mobileCardVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            whileTap={{ scale: 0.97 }}
                            className={`snap-center flex-none rounded-2xl p-5 flex flex-col justify-between cursor-pointer ${plan.featured ? 'bg-orange-400 text-white' : 'bg-gray-200'}`}
                            style={{
                                width: 'calc(75vw - 1.5rem)',
                                maxWidth: 280,
                                minWidth: 220,
                                minHeight: 200,
                                boxShadow: plan.featured
                                    ? '0 20px 50px rgba(234,179,8,0.35)'
                                    : '0 10px 30px rgba(0,0,0,0.10)',
                                // featured card gets a slight scale up even on mobile
                                ...(plan.featured && { outline: '2px solid rgba(200,120,40,0.45)' }),
                            }}
                        >
                            <PriceCardContent plan={plan} i={i} isINR={isINR} />
                        </motion.div>
                    ))}
                </div>

                {/* Scroll hint dots */}
                <div className="flex justify-center gap-1.5 mt-2">
                    {prices.map((plan, i) => (
                        <span
                            key={i}
                            className="block rounded-full transition-all duration-300"
                            style={{
                                width: plan.featured ? 18 : 6,
                                height: 6,
                                background: plan.featured ? '#c87828' : 'rgba(23,23,23,0.2)',
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── Shared card inner content ───────────────────────────────────────────────

function PriceCardContent({ plan, i, isINR }) {
    return (
        <>
            {/* TOP: Label row */}
            <div className="flex items-center gap-2">
                <span
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{
                        color: plan.featured ? 'rgba(255,255,255,0.75)' : 'rgba(23,23,23,0.45)',
                        fontFamily: 'var(--font-geist-mono), monospace',
                    }}
                >
                    {plan.label}
                </span>
                {plan.featured && (
                    <span className="rounded-full bg-amber-700 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                        Popular
                    </span>
                )}
            </div>

            {/* MIDDLE: Price */}
            <div className="flex items-start">
                <span
                    className="mt-1.5 text-base font-semibold"
                    style={{ color: plan.featured ? '#ffffff' : '#171717' }}
                >
                    {plan.sym}
                </span>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={plan.num + String(isINR)}
                        variants={numVariants}
                        initial="enter"
                        animate="visible"
                        exit="exit"
                        className="leading-none"
                        style={{
                            fontSize: i === 1 ? 62 : 52,
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            color: plan.featured ? '#ffffff' : '#171717',
                        }}
                    >
                        {plan.num}
                    </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={plan.dec + String(isINR)}
                        variants={numVariants}
                        initial="enter"
                        animate="visible"
                        exit="exit"
                        className="self-end pb-2 text-base font-light"
                        style={{ color: plan.featured ? 'rgba(255,255,255,0.6)' : 'rgba(23,23,23,0.4)' }}
                    >
                        {plan.dec}
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* BOTTOM: Subtitle */}
            <p
                className="border-t pt-2 text-xs"
                style={{
                    borderColor: plan.featured ? 'rgba(255,255,255,0.25)' : 'rgba(23,23,23,0.1)',
                    color: plan.featured ? 'rgba(255,255,255,0.7)' : 'rgba(23,23,23,0.45)',
                }}
            >
                {plan.sub}
            </p>
        </>
    )
}