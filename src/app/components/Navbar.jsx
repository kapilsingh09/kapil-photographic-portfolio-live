"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sun, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const profileRef = useRef(null);
  const mobileRef = useRef(null);

  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/70">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-400 rotate-45 rounded-sm" />
          <span className="font-bold text-lg">Kapil Photography</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.href} className="relative group">
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`pb-1 ${
                    pathname === link.href
                      ? "font-bold text-black"
                      : "text-gray-600"
                  }`}
                >
                  {link.name}
                </motion.span>

                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
            >
              <User size={16} />
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-lg border border-gray-100"
                >
                  {/* Header */}
                  <div className="h-20 bg-gradient-to-r from-emerald-400 to-teal-500 relative">
                    <div className="absolute -bottom-6 left-4 w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src="/Team_Photo/waguri.jpg"
                        width={48}
                        height={48}
                        alt="profile"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="pt-8 px-4 pb-3">
                    <p className="font-semibold">Kapil Singh</p>
                    <p className="text-xs text-gray-500">
                      Photographer & Visual Artist
                    </p>
                  </div>

                  <div className="border-t border-gray-100" />

                  <div className="p-2 flex flex-col">
                    <Link
                      href="/about"
                      onClick={() => setShowProfile(false)}
                      className="px-3 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      View Profile
                    </Link>
                    <Link
                      href="/gallery"
                      onClick={() => setShowProfile(false)}
                      className="px-3 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      My Gallery
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setShowProfile(false)}
                      className="px-3 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      Book a Session
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Button (NO functionality) */}
          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:bg-gray-50 transition">
            <Sun className="w-4 h-4 text-black" />
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg border-t border-gray-100"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 px-3 rounded hover:bg-gray-100"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}