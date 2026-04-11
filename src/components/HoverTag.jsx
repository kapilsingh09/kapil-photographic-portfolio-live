"use client";

import { motion } from "framer-motion";

export default function HoverTag({ text, bgClass = "bg-red-500" }) {
    return (
        <motion.div
            variants={{
                initial: { opacity: 0, y: 6, scale: 0.85 },
                hover: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className={`absolute bottom-3 left-3 ${bgClass} text-white font-bold text-[11px] px-3 py-1.5 rounded-full shadow-lg z-9999 pointer-events-none whitespace-nowrap`}
        >
            {text}
        </motion.div>
    );
}
