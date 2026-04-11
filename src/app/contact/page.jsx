'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, Camera, ArrowRight, X, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { useContent } from '@/hooks/useContent'

// ─── YOUR WHATSAPP NUMBER (with country code, no + or spaces) ───────────────
const WA_NUMBER = process.env.WHATSUPP // 👈 apna number yahan daal

// ─── Input Field ──────────────────────────────────────────────────────────────

function Field({ label, type = 'text', placeholder, value, onChange, as = 'input', error }) {
  const base = `w-full bg-transparent border-b py-3 text-sm text-content placeholder:text-content-muted outline-none transition-all duration-300 focus:ring-0 ${error
    ? 'border-red-400 focus:border-red-500'
    : 'border-border-subtle focus:border-content'
    }`
  return (
    <div className="group flex flex-col">
      <label className="text-[11px] font-bold uppercase tracking-widest text-content-muted transition-colors group-focus-within:text-content">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea rows={3} placeholder={placeholder} value={value} onChange={onChange} className={base + ' resize-none'} />
      ) : (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={base} />
      )}
      {error && <p className="mt-1 text-[11px] font-medium text-red-500">{error}</p>}
    </div>
  )
}

// ─── Mode Toggle ─────────────────────────────────────────────────────────────

function ModeToggle({ mode, onChange }) {
  const { contactPage } = useContent();

  return (
    <div className="mb-6 flex w-fit items-center gap-1 rounded-full border border-border-subtle bg-surface-muted p-1">
      {[
        { id: 'email', icon: Mail, label: 'Email' },
        { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
      ].map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${mode === id
            ? (id === 'whatsapp' ? 'text-white' : 'text-white dark:text-black')
            : 'text-content-muted hover:text-content'
            }`}
        >
          {mode === id && (
            <motion.div
              layoutId="toggle-pill"
              className={`absolute inset-0 rounded-full ${id === 'whatsapp' ? 'bg-[#25D366]' : 'bg-zinc-950 dark:bg-gray-200'
                }`}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <Icon size={13} className="relative z-10" strokeWidth={2} />
          <span className="relative z-10">{label}</span>
        </button>
      ))}
    </div>
  )
}

// ─── WhatsApp Panel ───────────────────────────────────────────────────────────

function WhatsAppPanel() {
  const { contactPage } = useContent();
  const [waName, setWaName] = useState('')
  const [waService, setWaService] = useState('')
  const [waMsg, setWaMsg] = useState('')

  const openWhatsApp = () => {
    const service = waService ? `\nService: ${waService}` : ''
    const text = encodeURIComponent(
      `Hi! I'm ${waName || 'interested in your services'}.${service}\n\n${waMsg}`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
  }

  return (
    <motion.div
      key="whatsapp"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6"
    >
      {/* Info Banner */}
      <div className="flex items-start gap-3 rounded-2xl bg-[#25D366]/8 border border-[#25D366]/20 px-4 py-3.5">
        <MessageCircle size={16} className="mt-0.5 flex-none text-[#25D366]" strokeWidth={2} />
        <p className="text-xs leading-relaxed text-content-muted">
          {contactPage.whatsappBanner}
        </p>
      </div>

      {/* Name */}
      <Field label="Your Name" placeholder="" value={waName} onChange={(e) => setWaName(e.target.value)} />

      {/* Service */}
      <div className="group flex flex-col">
        <label className="text-[10px] font-bold uppercase tracking-widest text-content-muted transition-colors group-focus-within:text-content">
          Topic of Interest
        </label>
        <select
          value={waService}
          onChange={(e) => setWaService(e.target.value)}
          className="w-full appearance-none border-b border-border-subtle bg-transparent py-3 text-sm text-content outline-none transition-all duration-300 focus:border-content cursor-pointer"
        >
          <option value="" disabled>Select a service</option>
          {contactPage.services.map((service) => (
            <option key={service.id} value={service.label}>{service.label}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <Field
        label="Message"
        placeholder="Tell me what you have in mind..."
        value={waMsg}
        onChange={(e) => setWaMsg(e.target.value)}
        as="textarea"
      />

      {/* Open WhatsApp Button */}
      <motion.button
        type="button"
        onClick={openWhatsApp}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-2 flex w-fit items-center gap-3 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#25D366]/25 transition-all hover:bg-[#1ebe5d]"
      >
        <MessageCircle size={15} strokeWidth={2.5} />
        Open WhatsApp Chat
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
          <ArrowRight size={13} strokeWidth={2.5} />
        </div>
      </motion.button>

      <p className="text-[11px] text-content-muted">
        You&apos;ll be redirected to WhatsApp with your message pre-filled. Works on both mobile & desktop.
      </p>
    </motion.div>
  )
}

// ─── Email Form Panel ─────────────────────────────────────────────────────────

function EmailPanel() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '', _gotcha: '' })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (fieldErrors[key]) setFieldErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const validate = () => {
    const errors = {}
    if (!form.name.trim()) errors.name = 'Name is required'
    if (!form.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email'
    if (!form.message.trim()) errors.message = 'Message is required'
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to send message')
      setStatus('success')
      setForm({ name: '', email: '', service: '', message: '', _gotcha: '' })
      setFieldErrors({})
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <motion.form
      key="email"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6"
    >
      {/* Honeypot */}
      <input type="text" name="_gotcha" style={{ display: 'none' }} value={form._gotcha} onChange={set('_gotcha')} tabIndex="-1" autoComplete="off" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Name" placeholder="" value={form.name} onChange={set('name')} error={fieldErrors.name} />
        <Field label="Email" type="email" placeholder="" value={form.email} onChange={set('email')} error={fieldErrors.email} />
      </div>

      <div className="group flex flex-col">
        <label className="text-[10px] font-bold uppercase tracking-widest text-content-muted transition-colors group-focus-within:text-content">
          Topic of Interest
        </label>
        <select
          value={form.service}
          onChange={set('service')}
          className="w-full appearance-none border-b border-border-subtle bg-transparent py-3 text-sm text-content outline-none transition-all duration-300 focus:border-content cursor-pointer"
        >
          <option value="" disabled>Select a service</option>
          {useContent().contactPage.services.map(service => (
            <option key={service.id} value={service.label}>{service.label}</option>
          ))}
        </select>
      </div>

      <Field label="Message" placeholder="Tell me about the details..." value={form.message} onChange={set('message')} as="textarea" error={fieldErrors.message} />

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={status === 'sending' ? {} : { scale: 1.02 }}
        whileTap={status === 'sending' ? {} : { scale: 0.98 }}
        className={`mt-2 flex w-fit items-center gap-4 rounded-full px-6 py-3 text-sm font-semibold shadow-md transition-all ${status === 'sending'
          ? 'cursor-not-allowed bg-surface-muted text-content opacity-70'
          : status === 'success'
            ? '!bg-emerald-600 text-white'
            : 'bg-black text-white dark:bg-black dark:text-white hover:bg-white hover:text-black hover:border'
          }`}
      >
        <span>
          {status === 'sending' && 'Sending...'}
          {status === 'success' && '✓ Message sent!'}
          {status === 'error' && 'Try again'}
          {status === 'idle' && 'Send Inquiry'}
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface/20">
          {status === 'sending' ? (
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-surface border-t-transparent" />
          ) : (
            <ArrowRight size={13} className="text-surface" strokeWidth={2.5} />
          )}
        </div>
      </motion.button>

      {/* Feedback banners */}
      {status === 'error' && errorMsg && (
        <div className="mt-2 flex items-center justify-between rounded-xl border border-red-200 bg-red-50/50 px-4 py-3.5 text-sm text-red-600">
          <span>{errorMsg}</span>
          <button type="button" onClick={() => setStatus('idle')}><X size={18} /></button>
        </div>
      )}
      {status === 'success' && (
        <div className="mt-2 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-3.5 text-sm text-emerald-700">
          <span>Your message was sent successfully!</span>
          <button type="button" onClick={() => setStatus('idle')}><X size={18} /></button>
        </div>
      )}
    </motion.form>
  )
}

// ─── Main Contact Page ────────────────────────────────────────────────────────

export default function ContactPage() {
  const { contactPage } = useContent();
  const [mode, setMode] = useState('email') // 'email' | 'whatsapp'

  return (
    <section className="relative flex w-full items-center justify-center px-4 py-24 md:px-8 md:py-28">
      <div className="mx-auto w-full max-w-[1100px] overflow-hidden rounded-[2rem] border border-border-subtle bg-card p-6 shadow-2xl shadow-black/5 transition-colors dark:shadow-black/50 md:p-10 lg:p-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

          {/* ── Left: Form + Toggle ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full flex-col justify-center"
          >
            {/* ── Mode Toggle ── */}
            <ModeToggle mode={mode} onChange={setMode} />

            {/* Header */}
            <div className="mb-6">
              <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-content-muted">
                {contactPage.header.tag}
              </span>
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-content md:text-5xl">
                {contactPage.header.title}
              </h1>
              <p className="mt-4 max-w-[85%] text-sm leading-relaxed text-content-muted">
                {contactPage.header.description}
              </p>
            </div>

            {/* ── Panels ── */}
            <AnimatePresence mode="wait">
              {mode === 'email' && <EmailPanel key="email" />}
              {mode === 'whatsapp' && <WhatsAppPanel key="whatsapp" />}
            </AnimatePresence>

            {/* Contact info footer */}
            <div className="mt-10 flex flex-col gap-4 border-t border-border-subtle pt-6 px-2 transition-colors sm:flex-row sm:justify-between">
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-content-muted" />
                <span className="text-xs font-medium text-content-muted">hello@kapilphoto.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-content-muted" />
                <span className="text-xs font-medium text-content-muted">+91 98765 43210</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Image ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="group relative hidden h-[580px] w-full overflow-hidden rounded-2xl lg:block"
          >
            <div className="absolute inset-0 h-full w-full">
              <Image
                src="/Team_Photo/waguri.jpg"
                alt="Photographer behind the scenes"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="40vw"
                loading="lazy"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* WhatsApp quick-link badge — only shows in whatsapp mode */}
            <AnimatePresence>
              {mode === 'whatsapp' && (
                <motion.a
                  key="wa-badge"
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white shadow-lg"
                >
                  <MessageCircle size={13} strokeWidth={2.5} />
                  Chat directly
                </motion.a>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md"
            >
              <h3 className="mb-1 text-lg font-bold tracking-tight text-white">Available worldwide.</h3>
              <p className="mb-4 text-xs leading-relaxed text-white/80">
                Based in India, but always excited to pack my bags for your destination shoot.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white hover:text-black"
                >
                  <Camera size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}