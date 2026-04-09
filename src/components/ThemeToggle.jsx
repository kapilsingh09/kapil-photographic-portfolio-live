"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch by rendering a placeholder of the same size
    return <div className="w-10 h-10 border border-transparent rounded-full" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle Dark Mode"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon size={18} className="text-gray-100" />
          ) : (
            <Sun size={18} className="text-gray-900" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
