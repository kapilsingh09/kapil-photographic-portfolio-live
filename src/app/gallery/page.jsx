'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Calendar } from 'lucide-react'
import { useContent } from '@/hooks/useContent'

// ─── Gallery Data ─────────────────────────────────────────────────────────────
// picsum images with seed for consistency — swap src with your real photos



// ─── Single Photo Card ────────────────────────────────────────────────────────

function PhotoCard({ photo, delay = 0 }) {
  const isWide = photo.size === 'wide'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: photo.rot * 0.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: photo.rot }}
      viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, rotate: 0, zIndex: 20, transition: { duration: 0.3 } }}
      className="group relative cursor-pointer"
      style={{ zIndex: 1 }}
    >
      {/* Photo */}
      <div
        className={`relative overflow-hidden rounded-sm bg-gray-200 shadow-md ${isWide ? 'h-44 w-64 md:h-52 md:w-80' : 'h-56 w-44 md:h-64 md:w-52'
          }`}
      >
        <Image
          src={photo.src}
          alt={photo.location}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 200px, 320px"
          loading="lazy"
        />
        {/* Film grain overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.015) 2px,rgba(0,0,0,0.015) 4px)',
            mixBlendMode: 'multiply',
          }}
        />
        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.22) 100%)',
          }}
        />
      </div>

      {/* Handwritten label */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
        transition={{ delay: delay + 0.3, duration: 0.4 }}
        className="absolute -top-5 left-2 text-xs italic text-subheading"
        style={{ fontFamily: "'Caveat', cursive", fontSize: 13 }}
      >
        {photo.label}
      </motion.span>

      {/* Location tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="pointer-events-none absolute -bottom-7 left-0 flex items-center gap-1 opacity-0"
      >
        <MapPin size={10} className="text-subheading" />
        <span className="text-[10px] text-subheading">{photo.location}</span>
      </motion.div>
    </motion.div>
  )
}

// ─── Single Page ──────────────────────────────────────────────────────────────

function GalleryPage({ page, pageIndex }) {
  const headerRef = useRef(null)
  // Bi-directional scrolling animations!
  const inView = useInView(headerRef, { once: false, margin: '-15% 0px -15% 0px' })

  return (
    <div
      className={`relative w-full overflow-hidden px-4 py-24 md:px-8 lg:px-16 md:py-32 ${pageIndex % 2 !== 0 ? 'bg-card-alt/50' : ''}`}
    >
      {/* ── Header ── */}
      <div ref={headerRef} className="mb-14 md:mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between max-w-7xl mx-auto">
        <div>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mb-3 block subtext-xs font-bold uppercase tracking-[0.2em]"
          >
            {page.volume}
          </motion.span>

          <div className="overflow-hidden pb-2">
            <motion.h2
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="font-heading text-5xl font-black tracking-tight text-heading md:text-7xl"
            >
              {page.month}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-2 flex items-center gap-2 subtext font-medium"
          >
            <Calendar size={14} />
            <span>{page.year}</span>
            <span className="mx-1 text-subheading">·</span>
            <span className="italic text-paragraph" style={{ fontFamily: "'Caveat', cursive", fontSize: 16 }}>
              {page.tagline}
            </span>
          </motion.div>

          {/* Location Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 15 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.35 }}
            className="mt-6 flex items-center"
          >
            {(() => {
              const mainLocation = page.photos[0].location.split(',')[1]?.trim() || page.photos[0].location.split(',')[0];
              const bgColor = pageIndex % 2 === 0 ? 'bg-black' : 'bg-black'; // synced perfectly with the rest of the site branding

              return (
                <div className={`relative flex items-center gap-1.5 rounded-full ${bgColor} px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-white shadow-xl`}>
                  <MapPin size={12} strokeWidth={2.5} />
                  {mainLocation}
                  <div className={`absolute -bottom-1 left-5 h-2.5 w-2.5 rotate-45 ${bgColor}`} />
                </div>
              );
            })()}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="max-w-xl md:max-w-sm md:text-right subtext"
        >
          {page.description}
        </motion.p>
      </div>

      {/* ── Photo Grid — Scattered Layout ── */}
      {page.photos.length >= 7 ? (
        <div className="relative flex flex-col gap-16 max-w-7xl mx-auto">

          {/* Row 1 — 2 wide images side by side */}
          <div className="flex flex-wrap items-start justify-center gap-10 md:gap-14">
            <PhotoCard photo={page.photos[0]} delay={0.0} />
            <PhotoCard photo={page.photos[1]} delay={0.1} />
          </div>

          {/* Row 2 — 3 tall + 1 wide mix */}
          <div className="flex flex-wrap items-start justify-center gap-8 md:gap-10">
            <PhotoCard photo={page.photos[2]} delay={0.05} />
            <PhotoCard photo={page.photos[3]} delay={0.15} />
            {page.photos[4] && <PhotoCard photo={page.photos[4]} delay={0.22} />}
          </div>

          {/* Row 3 — remaining */}
          <div className="flex flex-wrap items-start justify-center gap-10 md:gap-14">
            {page.photos[5] && <PhotoCard photo={page.photos[5]} delay={0.0} />}
            {page.photos[6] && <PhotoCard photo={page.photos[6]} delay={0.12} />}
            {page.photos[7] && <PhotoCard photo={page.photos[7]} delay={0.22} />}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-start justify-center gap-10 max-w-7xl mx-auto">
          {page.photos.map((p, i) => (
            <PhotoCard key={p.id} photo={p} delay={i * 0.08} />
          ))}
        </div>
      )}

      {/* ── Footer ── */}
      <div className="mt-24 flex items-center justify-between border-t border-card-border pt-6 max-w-7xl mx-auto">
        <span className="subtext-xs font-bold tracking-widest">VOLUME {pageIndex === 0 ? 'I' : 'II'}</span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="italic text-subheading"
          style={{ fontFamily: "'Caveat', cursive", fontSize: 16 }}
        >
          {page.caption}
        </motion.span>
        <span className="subtext-xs font-bold tracking-widest">
          PHOTO JOURNAL &nbsp;|&nbsp; {pageIndex + 1}
        </span>
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function EditorialGallery() {
  const { galleryPage } = useContent();

  return (
    <div className="min-h-screen bg-bg-primary font-sans text-text-primary selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black pt-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&display=swap');
      `}</style>
      <div className="relative pb-32">
        {/* Header */}
        <section className="relative px-6 py-20 md:py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-8 bg-text-primary"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{galleryPage.header.title}</span>
              <span className="h-px w-8 bg-text-primary"></span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              {galleryPage.header.title}
            </h1>
            <p className="text-sm md:text-base font-medium text-text-secondary max-w-md mx-auto leading-relaxed">
              {galleryPage.header.subtitle}
            </p>
          </motion.div>
        </section>

        {galleryPage.pages.map((page, index) => (
          <GalleryPage key={page.volume} page={page} pageIndex={index} />
        ))}
      </div>
    </div>
  )
}