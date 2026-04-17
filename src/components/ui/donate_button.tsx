"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import type { MouseEvent } from "react";

interface DonateButtonProps {
  onDonate?: () => void;  // ← add this
}

export default function DonateButton({ onDonate }: DonateButtonProps) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; dist: number }[]>([]);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const controls = useAnimation();

  // Idle floating animation loop
  useEffect(() => {
    controls.start({
      y: [0, -4, 0],
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls]);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onDonate?.();  

    // Ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);

    // Particle burst
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      dist: 55 + Math.random() * 30,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 900);
  };

  return (
      <div className="relative w-full flex justify-center items-center">
        {/* Glow ring behind button */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              "0 0 0px 0px rgba(251,191,36,0)",
              "0 0 18px 6px rgba(251,191,36,0.35)",
              "0 0 0px 0px rgba(251,191,36,0)",
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.button
          animate={controls}
          whileHover={{
            scale: 1.045,
            transition: { type: "spring", stiffness: 400, damping: 14 },
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="relative w-full overflow-hidden flex items-center justify-center gap-3 px-5 py-4 rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 text-amber-900 text-sm font-semibold tracking-wide shadow-md select-none cursor-pointer"
        >
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 pointer-events-none"
            animate={{ x: ["−100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
          />

          {/* Click ripples */}
          <AnimatePresence>
            {ripples.map((r) => (
              <motion.span
                key={r.id}
                className="absolute rounded-full bg-amber-300/50 pointer-events-none"
                style={{ left: r.x, top: r.y, width: 10, height: 10, x: "-50%", y: "-50%" }}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 18, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>

          {/* Tea cup with steam */}
          <motion.div
            className="relative text-2xl"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ☕
            {/* Steam particles */}
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute text-[9px] text-amber-400 select-none pointer-events-none"
                style={{ left: 4 + i * 5, top: -2 }}
                animate={{ y: [0, -10, -18], opacity: [0, 0.7, 0], scale: [0.8, 1.1, 0.6] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: i * 0.45,
                  ease: "easeOut",
                }}
              >
                ~
              </motion.span>
            ))}
          </motion.div>

          <span className="relative z-10">{' oru "Kattanum Parippuvadayum'}</span>

          {/* Arrow nudge */}
          <motion.span
            className="relative z-10 text-amber-500 text-base"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.button>

        {/* Click particle burst */}
        <AnimatePresence>
          {particles.map((p, i) => {
            const angle = (i / particles.length) * 360;
            const rad = (angle * Math.PI) / 180;
            return (
              <motion.div
                key={p.id + i}
                className="absolute w-2 h-2 rounded-full bg-amber-400 pointer-events-none"
                style={{ left: p.x, top: p.y }}
                initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                animate={{
                  x: Math.cos(rad) * p.dist,
                  y: Math.sin(rad) * p.dist,
                  scale: 0,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
              />
            );
          })}
        </AnimatePresence>
      </div>

    //   {/* Confirmation toast
    //   <AnimatePresence>
    //     {showDonate && (
    //       <motion.div
    //         initial={{ opacity: 0, y: 16, scale: 0.92 }}
    //         animate={{ opacity: 1, y: 0, scale: 1 }}
    //         exit={{ opacity: 0, y: 8, scale: 0.95 }}
    //         transition={{ type: "spring", stiffness: 340, damping: 22 }}
    //         className="mt-5 px-5 py-3 bg-white border border-amber-200 rounded-xl shadow text-amber-800 text-sm font-medium"
    //       >
    //         ☕ Thank you! The devs appreciate it 🙏
    //       </motion.div>
    //     )}
    //   </AnimatePresence> */}
  );
}