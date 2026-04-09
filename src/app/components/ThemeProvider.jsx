"use client";

import { useEffect } from "react";

const THEME_STORAGE_KEY = "theme"; // "light" | "dark"

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyThemeClass(theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initial = saved === "light" || saved === "dark" ? saved : getSystemTheme();
    applyThemeClass(initial);

    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mql) return;

    const onChange = () => {
      // Only follow system when user hasn't explicitly set a theme.
      const pref = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (pref === "light" || pref === "dark") return;
      applyThemeClass(mql.matches ? "dark" : "light");
    };

    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  return children;
}

