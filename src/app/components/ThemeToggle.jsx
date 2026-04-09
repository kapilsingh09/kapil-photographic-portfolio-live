"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle({ className = "" }) {
  const toggle = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    window.localStorage.setItem("theme", next);
  };

  return (
    <motion.button
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
      whileHover={{ scale: 1.15 }}
      onClick={toggle}
      className={className}
      aria-label="Toggle theme"
      type="button"
    >
      {/* We render both and rely on the `.dark` class for which one is visible */}
      <Sun className="w-4 h-4 hidden dark:block" />
      <Moon className="w-4 h-4 dark:hidden" />
    </motion.button>
  );
}

