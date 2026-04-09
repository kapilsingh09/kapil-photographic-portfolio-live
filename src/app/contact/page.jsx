'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Camera, ArrowRight, X } from 'lucide-react'
import Image from 'next/image'

// ─── Input Field Component ───────────────────────────────────────────────────

function Field({ label, type = 'text', placeholder, value, onChange, as = 'input', error }) {
  const baseClass = `w-full bg-transparent border-b py-3 text-sm text-content placeholder:text-content-muted outline-none transition-all duration-300 focus:ring-0 ${
    error ? 'border-red-400 focus:border-red-500' : 'border-border-subtle focus:border-content'
  }`

  return (
    <div className="flex flex-col group">
      <label className="text-[11px] font-bold uppercase tracking-widest text-content-muted transition-colors group-focus-within:text-content">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={baseClass + ' resize-none'}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={baseClass}
        />
      )}
      {error && <p className="text-[11px] text-red-500 mt-1 font-medium">{error}</p>}
    </div>
  )
}

// ─── Main Contact Page ────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '', _gotcha: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    // Clear that field's error as the user types
    if (fieldErrors[key]) setFieldErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const validate = () => {
    const errors = {}
    if (!form.name.trim()) errors.name = 'Name is required'
    if (!form.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Enter a valid email address'
    }
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
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setForm({ name: '', email: '', service: '', message: '' })
      setFieldErrors({})
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <section className="relative w-full py-24 md:py-28 px-4 md:px-8 flex items-center justify-center">
      {/* Box container */}
      <div className="mx-auto w-full max-w-[1100px] rounded-[2rem] bg-surface p-6 md:p-10 lg:p-12 shadow-2xl shadow-black/5 dark:shadow-black/50 overflow-hidden border border-border-subtle transition-colors">
        
        {/* Main Grid Wrapper */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          
          {/* ── Left Side - Form & Info ──────────────────────────────── */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full flex-col justify-center"
          >
            {/* Header */}
            <div className="mb-8">
              <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-content-muted">
                Inquire
              </span>
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-content md:text-5xl transition-colors">
                Let&apos;s tell <br/>
                your story.
              </h1>
              <p className="mt-4 text-content-muted leading-relaxed text-sm transition-colors">
                Whether it&apos;s a branding shoot, a wedding, or an editorial project, I&apos;d love to hear what you have in mind. 
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Honeypot field - hides from users, catches bots */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} value={form._gotcha} onChange={set('_gotcha')} tabIndex="-1" autoComplete="off" />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field
                  label="Name"
                  placeholder=""
                  value={form.name}
                  onChange={set('name')}
                  error={fieldErrors.name}
                />
                <Field
                  label="Email"
                  type="email"
                  placeholder=""
                  value={form.email}
                  onChange={set('email')}
                  error={fieldErrors.email}
                />
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
                  <option value="portrait">Portrait Session</option>
                  <option value="wedding">Wedding Coverage</option>
                  <option value="commercial">Commercial / Brand</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <Field
                label="Message"
                placeholder="Tell me about the details..."
                value={form.message}
                onChange={set('message')}
                as="textarea"
                error={fieldErrors.message}
              />

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={status === 'sending' ? {} : { scale: 1.02 }}
                whileTap={status === 'sending' ? {} : { scale: 0.98 }}
                className={`btn-primary mt-2 flex w-fit items-center justify-between gap-4 rounded-full px-6 py-3 text-sm font-semibold shadow-md mx-auto sm:mx-0 transition-all ${
                  status === 'sending' ? 'opacity-70 cursor-not-allowed bg-surface-muted text-content' : 'bg-content text-surface'
                } ${status === 'success' ? '!bg-emerald-600 dark:!bg-emerald-500 dark:!text-white' : ''}`}
              >
                <span>
                  {status === 'sending' && 'Sending...'}
                  {status === 'success' && '✓ Message sent!'}
                  {status === 'error' && 'Try again'}
                  {status === 'idle' && 'Send Inquiry'}
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface/20">
                  {status === 'sending' ? (
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-surface border-t-transparent dark:border-t-transparent" />
                  ) : (
                    <ArrowRight size={13} className="text-surface" strokeWidth={2.5}/>
                  )}
                </div>
              </motion.button>

              {/* Error or Success message box */}
              {status === 'error' && errorMsg && (
                <div className="mt-2 flex items-center justify-between rounded-xl border border-red-200 bg-red-50/50 px-4 py-3.5 text-sm text-red-600 shadow-sm backdrop-blur-sm">
                  <span>{errorMsg}</span>
                  <button type="button" onClick={() => setStatus('idle')} className="text-red-400 hover:text-red-900 transition-colors">
                    <X size={18} />
                  </button>
                </div>
              )}
              {status === 'success' && (
                <div className="mt-2 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-3.5 text-sm text-emerald-700 shadow-sm backdrop-blur-sm">
                  <span>Your message was sent successfully!</span>
                  <button type="button" onClick={() => setStatus('idle')} className="text-emerald-500 hover:text-emerald-900 transition-colors">
                    <X size={18} />
                  </button>
                </div>
              )}
            </form>

            <div className="mt-10 flex flex-col gap-4 border-t border-border-subtle pt-6 sm:flex-row sm:justify-between px-2 transition-colors">
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-content-muted"/>
                <span className="text-xs font-medium text-content-muted">hello@kapilphoto.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-content-muted"/>
                <span className="text-xs font-medium text-content-muted">+91 98765 43210</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right Side - Creative Image Composition ────────────────── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="group relative hidden w-full overflow-hidden rounded-2xl lg:block h-[560px]"
          >
            {/* The Image */}
            <div className="absolute inset-0 h-full w-full">
               <Image
                 src="/Team_Photo/waguri.jpg"
                 alt="Photographer behind the scenes"
                 fill
                 className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                 sizes="40vw"
                 loading="lazy"
               />
            </div>
            
            {/* Overlay Gradient (soft vignette) */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

            {/* Creative Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md"
            >
               <h3 className="mb-1 text-lg font-bold tracking-tight text-white">Available worldwide.</h3>
               <p className="mb-4 text-xs leading-relaxed text-white/80">Based in India, but always excited to pack my bags for your destination shoot.</p>
               
               <div className="flex gap-4">
                 <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white hover:text-black">
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