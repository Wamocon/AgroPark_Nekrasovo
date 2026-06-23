"use client";

import { motion } from "framer-motion";
import { KineticText } from "@/components/ui/kinetic-text";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SectionHeaderProps {
  number?: string;
  title: string;
  description?: string;
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  number,
  title,
  description,
  className = "",
  dark = false,
}: SectionHeaderProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: reducedMotion ? 0 : 0.6 }}
      className={`mb-14 flex items-start gap-5 ${className}`}
    >
      {number && (
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-green-900 to-green-700 text-lg font-extrabold text-white shadow-lg shadow-green-900/20">
          <span className="relative z-10">{number}</span>
          <div className="absolute inset-0 animate-shimmer" />
        </div>
      )}
      <div className="flex-1">
        <KineticText
          as="h2"
          className={`text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${
            dark ? "text-white" : "text-neutral-950"
          }`}
          delay={0.05}
          stagger={0.015}
        >
          {title}
        </KineticText>
        {description && (
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.25 }}
            className={`mt-3 max-w-2xl text-base sm:text-lg ${
              dark ? "text-white/70" : "text-neutral-600"
            }`}
          >
            {description}
          </motion.p>
        )}
        <motion.div
          initial={reducedMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            delay: reducedMotion ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-4 h-1 w-24 origin-left rounded-full bg-gradient-to-r from-green-900 via-green-600 to-accent-500"
        />
      </div>
    </motion.div>
  );
}
