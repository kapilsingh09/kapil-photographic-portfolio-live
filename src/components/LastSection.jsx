'use client'

import { motion } from 'framer-motion'
// import { useRouter } from 'next/navigation'
import { Aperture, BookImage, Images, PenLine } from 'lucide-react'
import Image from 'next/image'


// ─── Framer Variants ──────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

// ─── Component ────────────────────────────────────────────────────────────────

import { useRouter } from 'next/navigation'
export default function LastSection() {
  const router = useRouter();
  return (
    <section className="flex min-h-[100vh] items-center justify-center px-4 py-24 md:py-0 md:px-10">
      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">

        {/* ── Left Card ─────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0)}
          className="relative overflow-hidden rounded-3xl"
          style={{ minHeight: 580 }}
        >
          {/* Background photo — replace src with your actual team photo */}
          <Image
            src="/Team_Photo/waguri.jpg"
            alt="Our Team"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            loading="lazy"
          />

          {/* Bottom frosted blur layer */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: '40%',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
            }}
          />
          {/* Bottom dark gradient */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: '65%',
              background:
                'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 45%, transparent 100%)',
            }}
          />

          {/* Blur blob — soft glow like reference */}
          {/* <div
            className="absolute bottom-20 left-1/2 -translate-x-1/2"
            style={{
              width: 260,
              height: 120,
              borderRadius: '50%',
              background: 'rgba(220,50,120,0.45)',
            //   filter: 'blur(25px)',
              pointerEvents: 'none',
            }}
          /> */}

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-8">
            {/* Icon */}
            <div
              className="mb-5 flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: '#fff', backdropFilter: 'blur(8px)' }}
            >
              <PenLine size={16} color="#000" strokeWidth={1.5} />
            </div>

            {/* Heading */}
            <motion.h2
              {...fadeUp(0.15)}
              className="mb-3 text-4xl font-bold leading-tight text-white"
            >
              Meet<br />our team
            </motion.h2>

            {/* Subtext */}
            <motion.p
              {...fadeUp(0.25)}
              className="subtext-light mb-6 max-w-xs"
            >
              A passionate crew of photographers and storytellers, dedicated to capturing moments that last forever.
            </motion.p>

            {/* Button */}
            <motion.button
            onClick={()=>{router.push("/contact")}}
              {...fadeUp(0.35)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-white"
            >
              Let&apos;s Meet
            </motion.button>
          </div>
        </motion.div>

        {/* ── Right Card ────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.1)}
          className="relative overflow-hidden rounded-3xl"
          style={{ minHeight: 480 }}
        >
          {/* Full background photo */}
          <Image
            src="/Team_Photo/img-2.jpg"
            alt="Team creative"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />

          {/* Bottom frosted blur layer */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: '40%',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(4px)',
              maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
            }}
          />
          {/* Bottom dark gradient */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: '65%',
              background:
                'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 45%, transparent 100%)',
            }}
          />

          {/* Blur blob — soft amber glow */}
          <div
            className="absolute bottom-20 left-1/2 -translate-x-1/2"
            style={{
              width: 260,
              height: 120,
              borderRadius: '50%',
              background: 'rgba(251,146,60,0.45)',
              filter: 'blur(55px)',
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-8">
            {/* Icon */}
            <div
              className="mb-5 flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: '#fff', backdropFilter: 'blur(8px)' }}
            >
              <Images size={16} color="#000" strokeWidth={1.5} />
            </div>

            {/* Heading */}
            <motion.h2
              {...fadeUp(0.2)}
              className="mb-3 text-4xl font-bold leading-tight text-white"
            >
              Archive<br />of new arts
            </motion.h2>

            {/* Subtext */}
            <motion.p
              {...fadeUp(0.3)}
              className="subtext-light mb-6 max-w-xs"
            >
              Our portfolio is the canvas where every shutter click becomes a timeless piece, showcasing work to a broad audience.
            </motion.p>

            {/* Button */}
            <motion.button
              onClick={()=>{router.push("/gallery")}}
              {...fadeUp(0.4)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-white"
            >
              Archives
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}