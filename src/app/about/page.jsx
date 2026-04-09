'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Award, MapPin, Camera, AtSign, ArrowUpRight, Star, Aperture, Film, Globe } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '6+', label: 'Years Active', icon: Camera },
  { value: '320+', label: 'Shoots Done', icon: Aperture },
  { value: '98%', label: 'Happy Clients', icon: Star },
  { value: '12+', label: 'Awards Won', icon: Award },
]

const SKILLS = [
  { name: 'Portrait', pct: 97 },
  { name: 'Wedding', pct: 92 },
  { name: 'Commercial', pct: 88 },
  { name: 'Landscape', pct: 85 },
  { name: 'Street', pct: 90 },
]

const GEAR = [
  { category: 'Body', items: ['Sony A7 IV', 'Fujifilm X-T5'] },
  { category: 'Lens', items: ['35mm f/1.4', '85mm f/1.8', '24-70mm f/2.8'] },
  { category: 'Light', items: ['Godox AD400 Pro', 'Profoto B10'] },
]

const TESTIMONIALS = [
  {
    name: 'Aisha Mehta',
    role: 'Bride — Wedding',
    text: 'He captured every single emotion of our day. The photos felt like living memories.',
    avatar: 'AM',
    color: '#f5c340',
  },
  {
    name: 'Rohan Sharma',
    role: 'CEO, Brand Studio',
    text: 'Our brand campaign results doubled after working with him. The visuals were iconic.',
    avatar: 'RS',
    color: '#ff6b6b',
  },
  {
    name: 'Priya Kapoor',
    role: 'Model & Influencer',
    text: 'Working with him felt effortless. He made me feel comfortable and the shots were stunning.',
    avatar: 'PK',
    color: '#6c63ff',
  },
]

const BRANDS = ['Vogue India', 'Nike', 'Nykaa', 'Forbes India', 'Zara']

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

// ─── Skill Bar ────────────────────────────────────────────────────────────────

function SkillBar({ name, pct, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.6 }}
          className="text-xs font-black text-gray-900"
        >
          {pct}%
        </motion.span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-50 border border-gray-100 overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gray-900"
        />
      </div>
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ value, label, icon: Icon, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="flex flex-col items-center gap-4 rounded-5xl border border-gray-100 bg-white px-6 py-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-orange-500 shadow-sm border border-gray-100">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-5xl font-black tracking-tight text-gray-900 leading-none">{value}</span>
        <span className="mt-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{label}</span>
      </div>
    </motion.div>
  )
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────

function TestimonialCard({ t, delay }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-4xl border border-gray-100 bg-white p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"
    >
      <div className="absolute -right-4 -top-4 opacity-[0.03] transition-opacity group-hover:opacity-[0.05]">
        <Globe size={120} strokeWidth={1} />
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-orange-400 text-orange-400" />
          ))}
        </div>
        <p className="text-base leading-relaxed text-gray-600">
          &ldquo;{t.text}&rdquo;
        </p>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-4">
        <div
          className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl text-sm font-bold text-white shadow-lg shadow-black/5"
          style={{ background: t.color }}
        >
          {t.avatar}
        </div>
        <div>
          <p className="text-sm font-black tracking-tight text-gray-900">{t.name}</p>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{t.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function About() {
  const containerRef = useRef(null)
  const [activeGear, setActiveGear] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden px-5 pb-32 pt-24 md:px-10">
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* ── Header Section ── */}
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Portfolio / About</span>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] font-black leading-none tracking-tighter text-gray-900 md:text-[8vw]"
              >
                The Story.
              </motion.h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col gap-2 text-right"
          >
            <div className="flex items-center justify-end gap-3 text-xs font-black uppercase tracking-widest text-gray-400">
              <MapPin size={12} className="text-orange-500" />
              <span>India &nbsp;·&nbsp; Worldwide</span>
            </div>
            <div className="flex items-center justify-end gap-3 text-xs font-black uppercase tracking-widest text-gray-400">
              <Film size={12} className="text-orange-500" />
              <span>Est. 2019</span>
            </div>
          </motion.div>
        </div>

        <div className="relative mb-24 h-px w-full bg-gray-100">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
            className="h-full w-full bg-orange-500/30"
          />
        </div>

        {/* ── Bio Section ── */}
        <div className="mb-28 flex flex-col items-start gap-16 md:flex-row">

          {/* Portrait Column */}
          <div className="relative w-full flex-none md:w-[400px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10 overflow-hidden rounded-3xl shadow-2xl"
              style={{ aspectRatio: '4/5' }}
            >
              <motion.div style={{ y: imageY }} className="h-full w-full">
                <Image
                  src="/Team_Photo/waguri.jpg"
                  alt="Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute left-2 md:-left-4 top-10 z-20 flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-xl"
            >
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-green-400" />
              Active
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="flex flex-1 flex-col justify-center">
            <motion.span {...fadeUp(0)} className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
              — The Protagonist
            </motion.span>

            <motion.h2 {...fadeUp(0.1)} className="mb-10 text-4xl font-black leading-tight tracking-tight text-gray-900 md:text-5xl">
              Capturing moments that <br /> feel like memories.
            </motion.h2>

            <div className="space-y-6">
              <motion.p {...fadeUp(0.2)} className="text-lg font-medium leading-relaxed text-gray-600">
                I&apos;ve spent six years building a practice around authentic emotion. My camera doesn&apos;t just record — it interprets the light and the world around you.
              </motion.p>
              <motion.p {...fadeUp(0.3)} className="text-sm leading-relaxed text-gray-400 max-w-lg">
                Working with brands and dreamers across India, I bring the same obsessive attention to detail to every single frame.
              </motion.p>
            </div>

            {/* Brands */}
            <motion.div {...fadeUp(0.4)} className="mt-12 flex flex-wrap gap-6 border-t border-gray-100 pt-10">
              {BRANDS.map((b) => (
                <span key={b} className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                  {b}
                </span>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.5)} className="mt-10 flex gap-4">
              <button className="btn-primary flex items-center gap-2">
                Get in touch <ArrowUpRight size={14} />
              </button>
            </motion.div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="mb-28 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} icon={s.icon} index={i} />
          ))}
        </div>

        {/* ── Skills & Gear ── */}
        <div className="mb-28 grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div {...fadeUp(0)} className="rounded-5xl border border-gray-100 bg-white p-10 shadow-sm">
            <h4 className="mb-10 text-xl font-black uppercase tracking-widest text-gray-900">Expertise</h4>
            <div className="flex flex-col gap-8">
              {SKILLS.map((s, i) => (
                <SkillBar key={s.name} name={s.name} pct={s.pct} delay={i * 0.1} />
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="rounded-5xl border border-gray-100 bg-white p-10 shadow-sm">
            <h4 className="mb-8 text-xl font-black uppercase tracking-widest text-gray-900">My Gear</h4>
            <div className="mb-8 flex gap-2">
              {GEAR.map((g, i) => (
                <button
                  key={g.category}
                  onClick={() => setActiveGear(i)}
                  className={`rounded-xl px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeGear === i ? 'bg-black text-white' : 'bg-gray-50 text-gray-400 hover:text-gray-600'
                    }`}
                >
                  {g.category}
                </button>
              ))}
            </div>
            <AnimatePresence mode="sync">
              <motion.ul
                key={activeGear}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-3"
              >
                {GEAR[activeGear].items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <div className="h-1 w-1 rounded-full bg-orange-400" />
                    {item}
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Testimonials ── */}
        <div className="mb-16">
          <motion.div {...fadeUp(0)} className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <h3 className="text-3xl font-black tracking-tight text-gray-900 md:text-5xl">Kind Words.</h3>
            <div className="flex items-center gap-2 text-xs font-black uppercase text-orange-500 bg-orange-50 px-4 py-2 rounded-xl">
              <Star size={12} className="fill-orange-500" /> 5.0 Average Rating
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.name} t={t} delay={0.1 + i * 0.1} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}