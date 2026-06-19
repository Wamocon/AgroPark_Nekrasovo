"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  number?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  number,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`mb-12 flex items-start gap-5 ${className}`}
    >
      {number && (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-900 text-lg font-extrabold text-white">
          {number}
        </div>
      )}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-base text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
