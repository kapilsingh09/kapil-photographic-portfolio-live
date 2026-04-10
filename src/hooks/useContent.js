"use client";

import { portfolioData } from "@/data/portfolio-data";

/**
 * CUSTOM HOOK: useContent
 * Provides a clean interface to access the centralized portfolio data.
 * @returns {object} The complete portfolio data object.
 */
export function useContent() {
  // In a real production app, this could also include logic for 
  // fetching data from an API or handling internationalization.
  return portfolioData;
}
