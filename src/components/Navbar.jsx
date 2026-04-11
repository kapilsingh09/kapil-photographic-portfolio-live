"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sun, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useContent } from "@/hooks/useContent";

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const profileRef = useRef(null);
  const pathname = usePathname();

  const { navbar } = useContent();

  // Close profile popup when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav 
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full sticky top-0 z-50 bg-transparent backdrop-blur-md"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 pt-8">

          {/* ── Left: Logo ── */}
          <Link href={navbar.logo.href} className="flex items-center gap-2 cursor-pointer group">
            <motion.div 
              whileHover={{ rotate: 135 }}
              transition={{ duration: 0.4 }}
              className="w-6 h-6 bg-green-500 rounded-sm rotate-45" 
            />
            <span className="font-bold text-xl tracking-tight text-text-primary capitalize group-hover:opacity-80 transition-opacity">
                {navbar.logo.text}
            </span>
          </Link>

          {/* ── Right: Nav Links + Icons (desktop) ── */}
          <div className="flex items-center gap-6">

            {/* Nav Links — hidden on mobile */}
            <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
              {navbar.links.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="relative block group px-2 py-1">
                    <motion.span
                      initial={{ opacity: 0, y: -15, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
                      className={`inline-block relative text-sm pb-1 transition-colors ${pathname === link.href ? "text-text-primary font-bold" : "text-text-secondary group-hover:text-text-primary"}`}
                    >
                      {link.name}
                      {/* Hover / Active Animated Line */}
                      <span 
                        className={`absolute left-0 bottom-0 h-[2px] w-full bg-text-primary origin-left transition-transform duration-300 ease-out ${pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                      />
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Icons */}
            <div className="flex items-center gap-3">

              {/* Theme Toggle Component */}
              <ThemeToggle />

              {/* User Avatar Button — desktop only */}
              <div className="relative hidden md:block" ref={profileRef}>
                <motion.button
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowProfile((prev) => !prev)}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border-primary bg-bg-secondary shadow-sm transition-all hover:bg-bg-tertiary focus:outline-none"
                >
                  <User className="w-4 h-4 text-text-primary" />
                </motion.button>

                {/* Profile Popup */}
                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -8 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 top-12 w-64 bg-bg-primary rounded-2xl shadow-xl border border-border-primary overflow-hidden z-50 text-text-primary"
                    >
                      {/* Header with cover + avatar */}
                      <div className="relative h-20 bg-gradient-to-br from-emerald-400 to-teal-500">
                        <div className="absolute -bottom-6 left-5">
                          <div className="w-14 h-14 rounded-full border-[3px] border-white overflow-hidden shadow-lg">
                            <Image
                              src={navbar.profile.image}
                              alt="Profile"
                              width={56}
                              height={56}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="pt-9 px-5 pb-4">
                        <p className="text-sm font-bold text-text-primary">{navbar.profile.name}</p>
                        <p className="text-xs text-text-muted mt-0.5">{navbar.profile.role}</p>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-border-primary mx-4" />

                      {/* Actions */}
                      <div className="p-3 flex flex-col gap-1">
                        <Link href="/about" onClick={() => setShowProfile(false)} className="text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary px-3 py-2 rounded-lg transition-colors">View Profile</Link>
                        <Link href="/gallery" onClick={() => setShowProfile(false)} className="text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary px-3 py-2 rounded-lg transition-colors">My Gallery</Link>
                        <Link href="/contact" onClick={() => setShowProfile(false)} className="text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary px-3 py-2 rounded-lg transition-colors">Book a Session</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sun / Theme toggle — desktop only */}

              {/* Hamburger — mobile only */}
              <motion.button
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileOpen((prev) => !prev)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-border-primary bg-bg-secondary transition-all shadow-sm focus:outline-none"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-4 h-4 text-text-primary" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-4 h-4 text-text-primary" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/20 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Glass panel — slides in from top */}
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-4 left-4 right-4 z-50 md:hidden rounded-3xl overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white/50 dark:border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Header row inside glass panel */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-accent-brand rounded-sm rotate-45" />
                  <span className="font-bold text-base tracking-tight text-text-primary">kapil Photography</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-bg-secondary hover:bg-bg-tertiary transition-colors border border-border-primary"
                >
                  <X className="w-4 h-4 text-text-secondary" />
                </button>
              </div>

              {/* Divider */}
              <div className="mx-6 border-t border-white/40 dark:border-white/10" />

              {/* Nav links */}
              <ul className="flex flex-col px-4 py-4 gap-1">
                {navbar.links.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * index, duration: 0.3, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        pathname === link.href
                          ? "bg-bg-secondary text-text-primary font-bold"
                          : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Divider */}
              <div className="mx-6 border-t border-white/40" />

              {/* Profile row */}
              <div className="flex items-center gap-4 px-6 py-5">
                <div className="w-11 h-11 rounded-full border-2 border-white/70 overflow-hidden shadow-sm flex-shrink-0">
                  <Image
                    src="/Team_Photo/waguri.jpg"
                    alt="Profile"
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-primary truncate">Kapil Singh</p>
                  <p className="text-xs text-text-muted truncate">Photographer & Visual Artist</p>
                </div>
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}