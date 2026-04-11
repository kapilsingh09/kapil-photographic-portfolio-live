"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Camera,
  Aperture,
  Star,
  Zap,
  Check,
  X,
  DollarSign,
  Building2,
  Wind,
  Heart,
  Sparkles,
  Image,
} from "lucide-react";

/* ─────────────────────────────────────────────
   PLAN DATA
───────────────────────────────────────────── */
const PLANS = [
  {
    key: "starter",
    label: "STARTER",
    badge: null,
    icon: Camera,
    monthly: 0,
    yearly: 0,
    tagline: "Perfect for quick portraits or headshots for individuals.",
    cta: "Book for free",
    ctaStyle: "outline",
    color: "gray",
  },
  {
    key: "basic",
    label: "BASIC",
    badge: "Popular",
    icon: Aperture,
    monthly: 149,
    yearly: 109,
    tagline: "Ideal for couples — engagement sessions, pre-wedding shoots & mini-sessions.",
    cta: "Get started",
    ctaStyle: "solid",
    color: "dark",
  },
  {
    key: "business",
    label: "BUSINESS",
    badge: null,
    icon: Wind,
    monthly: 349,
    yearly: 259,
    tagline: "Full wedding coverage, drone aerials, cinematic reels & print gallery.",
    cta: "Get started",
    ctaStyle: "solid",
    color: "dark",
  },
  {
    key: "custom",
    label: "CUSTOM",
    badge: null,
    icon: Building2,
    monthly: null,
    yearly: null,
    tagline: "Multi-day shoots, brand campaigns & commercial licensing for studios.",
    cta: "Contact us",
    ctaStyle: "solid",
    color: "dark",
  },
];

/* ─────────────────────────────────────────────
   FEATURE ROWS
   value: true | false | string
───────────────────────────────────────────── */
const FEATURE_ROWS = [
  {
    label: "Shoot duration",
    values: ["1 hr", "4 hrs", "8 hrs", "Custom"],
  },
  {
    label: "Edited photos delivered",
    values: ["15 photos", "80 photos", "300+ photos", "Unlimited"],
  },
  {
    label: "Drone aerial shots",
    values: [false, false, true, true],
  },
  {
    label: "Same-day preview gallery",
    values: [false, true, true, true],
  },
  {
    label: "Online client gallery",
    values: [false, true, true, true],
  },
  {
    label: "Print-ready files (300 dpi)",
    values: [false, true, true, true],
  },
  {
    label: "Cinematic reel / video",
    values: [false, false, true, true],
  },
  {
    label: "Makeup artist coordination",
    values: [false, false, true, true],
  },
  {
    label: "Second photographer",
    values: [false, false, true, true],
  },
  {
    label: "Commercial license",
    values: [false, false, false, true],
  },
  {
    label: "Dedicated art director",
    values: [false, false, false, true],
  },
  {
    label: "Revisions",
    values: ["1 round", "2 rounds", "3 rounds", "Unlimited"],
  },
];

/* ─────────────────────────────────────────────
   DECORATIVE CORNER GRID  (matches screenshot)
───────────────────────────────────────────── */
function CornerGrid({ side }) {
  const cells = Array.from({ length: 9 });
  return (
    <div
      className={`absolute top-0 ${side === "left" ? "left-0" : "right-0"} grid grid-cols-3 gap-1 p-2 opacity-40 pointer-events-none`}
    >
      {cells.map((_, i) => (
        <div
          key={i}
          className="w-10 h-10 rounded-sm"
          style={{
            background: i % 2 === 0 ? "var(--card-border)" : "transparent",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   REVEAL wrapper
───────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(14px)", y: 28 }}
      animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   BILLING TOGGLE
───────────────────────────────────────────── */
function BillingToggle({ billing, setBilling }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="relative flex items-center bg-card border border-card-border rounded-full p-1 shadow-sm">
        {["monthly", "yearly"].map((mode) => (
          <button
            key={mode}
            onClick={() => setBilling(mode)}
            className={`relative z-10 px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200 capitalize ${
              billing === mode ? "text-heading" : "text-subheading hover:text-paragraph"
            }`}
          >
            {mode === "monthly" ? "Monthly billing" : "Yearly billing"}
            {billing === mode && (
              <motion.div
                layoutId="billing-pill"
                className="absolute inset-0 bg-card-alt rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CELL VALUE (check / cross / string)
───────────────────────────────────────────── */
function CellVal({ val }) {
  if (val === true)
    return (
      <div className="flex justify-center">
        <div className="w-5 h-5 rounded-full bg-heading flex items-center justify-center">
          <Check size={11} strokeWidth={3} className="text-white" />
        </div>
      </div>
    );
  if (val === false)
    return (
      <div className="flex justify-center">
        <X size={16} className="text-subheading" strokeWidth={2} />
      </div>
    );
  return <span className="text-[13px] text-paragraph font-medium">{val}</span>;
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function PricingSection() {
  const [billing, setBilling] = useState("monthly");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative w-full py-16 px-4 md:px-8 lg:px-16 flex justify-center">
      <div className="w-full max-w-[1100px] bg-card rounded-4xl shadow-sm overflow-hidden relative pb-10">
        
        {/* Corner decorative grids (now inside the white card) */}
        <CornerGrid side="left" />
        <CornerGrid side="right" />
        
        <div className="px-6 md:px-12 pt-16">
        {/* ── HEADER ── */}
        <div ref={ref} className="text-center mb-12">
          {/* Dollar icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-5"
          >
            <div className="w-12 h-12 rounded-full border border-card-border bg-card shadow-sm flex items-center justify-center">
              <DollarSign size={20} className="text-paragraph" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, filter: "blur(16px)", y: 20 }}
            animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.2rem,4vw,3.2rem)] font-black tracking-[-0.03em] text-heading mb-4"
          >
            Pricing Plans
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, filter: "blur(12px)", y: 16 }}
            animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="subtext-lg max-w-xl mx-auto"
          >
            From intimate portraits to grand drone-covered weddings — every moment
            deserves a plan built around it.
          </motion.p>
        </div>

        {/* ── BILLING TOGGLE ── */}
        <Reveal delay={0.22} className="flex flex-col items-center gap-3 mb-12">
          <BillingToggle billing={billing} setBilling={setBilling} />
          <AnimatePresence>
            {billing === "yearly" && (
              <motion.p
                key="savings"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-semibold text-indigo-600"
              >
                Save up to 30% and get 2 months free with yearly billing
              </motion.p>
            )}
            {billing === "monthly" && (
              <motion.p
                key="monthly-note"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-subheading"
              >
                Switch to yearly billing to unlock savings
              </motion.p>
            )}
          </AnimatePresence>
        </Reveal>

        {/* ── PRICING TABLE (DESKTOP) ── */}
        <Reveal delay={0.28}>
          <div className="hidden lg:block w-full overflow-x-auto">
            <table className="w-full min-w-[740px] border-collapse">
              <thead>
                <tr className="border-b border-card-border">
                  {/* Plans label */}
                  <th className="text-left pb-5 pr-6 w-[200px]">
                    <span className="text-[11px] font-black tracking-[0.18em] text-subheading uppercase">
                      Plans
                    </span>
                  </th>

                  {/* Plan columns */}
                  {PLANS.map((plan) => {
                    const Icon = plan.icon;
                    const price =
                      billing === "monthly" ? plan.monthly : plan.yearly;

                    return (
                      <th
                        key={plan.key}
                        className="pb-5 px-4 text-left align-bottom"
                      >
                        {/* Plan label + badge */}
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-black tracking-[0.18em] text-heading uppercase">
                            {plan.label}
                          </span>
                          {plan.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {/* ── PRICING ROW ── */}
                <tr className="border-b border-card-border">
                  <td className="py-7 pr-6 text-[13px] text-subheading font-medium">
                    Pricing
                  </td>

                  {PLANS.map((plan) => {
                    const price =
                      billing === "monthly" ? plan.monthly : plan.yearly;

                    return (
                      <td key={plan.key} className="py-7 px-4 align-top">
                        {/* Price */}
                        <AnimatePresence mode="sync">
                          <motion.div
                            key={`${plan.key}-${billing}`}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.25 }}
                          >
                            {plan.monthly === null ? (
                              <p className="text-[1.8rem] font-black text-heading leading-tight mb-1">
                                Contact us
                              </p>
                            ) : (
                              <p className="text-[2rem] font-black text-heading leading-tight mb-1">
                                ${price}
                                {price > 0 && (
                                  <span className="text-sm font-medium text-subheading ml-1">
                                    / mo
                                  </span>
                                )}
                              </p>
                            )}
                          </motion.div>
                        </AnimatePresence>

                        {/* Tagline */}
                        <p className="text-[12px] text-subheading leading-relaxed mb-5 max-w-[160px]">
                          {plan.tagline}
                        </p>

                        {/* CTA */}
                        <button
                          className={
                            plan.ctaStyle === "outline"
                              ? "btn-outline text-[13px] px-6 py-2.5 mt-2"
                              : "btn-primary text-[13px] px-6 py-2.5 mt-2"
                          }
                        >
                          {plan.cta}
                        </button>
                      </td>
                    );
                  })}
                </tr>

                {/* ── FEATURE ROWS ── */}
                {FEATURE_ROWS.map((row, ri) => (
                  <motion.tr
                    key={row.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: ri * 0.04,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`border-b border-card-border hover:bg-card-alt/60 transition-colors`}
                  >
                    <td className="py-4 pr-6 text-[13px] text-paragraph font-medium">
                      {row.label}
                    </td>
                    {PLANS.map((plan, pi) => (
                      <td key={plan.key} className="py-4 px-4 text-center">
                        <CellVal val={row.values[pi]} />
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── PRICING CARDS (MOBILE/TABLET) ── */}
          <div className="lg:hidden flex flex-col gap-6 w-full">
            {PLANS.map((plan, pi) => {
              const price = billing === "monthly" ? plan.monthly : plan.yearly;
              return (
                <motion.div
                  key={plan.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: pi * 0.1 }}
                  className="bg-card-alt/50 border border-card-border rounded-3xl p-6 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-sm font-black tracking-widest text-heading uppercase">
                        {plan.label}
                      </h3>
                      {plan.badge && (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 mt-2 inline-block">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <plan.icon size={24} className="text-subheading" />
                  </div>

                  {/* Mobile Price */}
                  <div className="mb-4">
                    <AnimatePresence mode="sync">
                      <motion.div
                        key={`${plan.key}-${billing}-mobile`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {plan.monthly === null ? (
                          <p className="text-[2rem] font-black text-heading leading-tight">
                            Contact us
                          </p>
                        ) : (
                          <p className="text-[2.2rem] font-black text-heading leading-none">
                            ${price}
                            {price > 0 && (
                              <span className="text-sm font-medium text-subheading ml-1">
                                / mo
                              </span>
                            )}
                          </p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <p className="text-[13px] text-paragraph mb-8 leading-relaxed">
                    {plan.tagline}
                  </p>

                  <ul className="mb-8 flex flex-col gap-4">
                    {FEATURE_ROWS.map((row) => {
                      const val = row.values[pi];
                      // Skip displaying false values to keep mobile cards clean
                      if (val === false) return null;
                      
                      return (
                        <li key={row.label} className="flex items-start gap-3">
                          {val === true ? (
                            <div className="w-5 h-5 shrink-0 rounded-full bg-heading flex items-center justify-center mt-0.5">
                              <Check size={11} strokeWidth={3} className="text-white" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 shrink-0 flex items-center justify-center mt-0.5">
                              <Check size={16} strokeWidth={3} className="text-green-500" />
                            </div>
                          )}
                          <span className="text-[14px] text-paragraph leading-snug">
                            {val !== true && val !== false && (
                              <strong className="text-heading font-bold">{val} </strong>
                            )}
                            {row.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <button
                    className={`${
                      plan.ctaStyle === "outline" ? "btn-outline" : "btn-primary"
                    } w-full py-3.5 text-sm mt-auto shadow-sm`}
                  >
                    {plan.cta}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        {/* ── FOOTER NOTE ── */}
        <Reveal delay={0.1} className="mt-14 text-center border-t border-card-border pt-8 mx-6 md:mx-12">
          <p className="subtext-xs text-subheading">
            All plans include usage rights for personal sharing. Commercial licensing available on Custom plan.
            <br />
            Travel & accommodation fees may apply beyond 50 km.
          </p>
        </Reveal>
      </div>
      </div>
    </section>
  );
}