"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AmbientBackgroundProps {
  variant?: "light" | "dark" | "accent" | "neutral";
  intensity?: "subtle" | "normal" | "strong";
  className?: string;
  children?: React.ReactNode;
  animated?: boolean;
}

const configs = {
  light: {
    base: "bg-neutral-50",
    orbs: [
      "bg-[radial-gradient(circle,rgba(27,67,50,0.08),transparent_70%)]",
      "bg-[radial-gradient(circle,rgba(212,163,115,0.10),transparent_70%)]",
      "bg-[radial-gradient(circle,rgba(82,183,136,0.08),transparent_70%)]",
    ],
    mesh: "from-green-900/[0.03] via-transparent to-accent-500/[0.03]",
  },
  dark: {
    base: "bg-green-950",
    orbs: [
      "bg-[radial-gradient(circle,rgba(212,163,115,0.18),transparent_70%)]",
      "bg-[radial-gradient(circle,rgba(82,183,136,0.12),transparent_70%)]",
      "bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_70%)]",
    ],
    mesh: "from-accent-500/[0.06] via-transparent to-green-600/[0.05]",
  },
  accent: {
    base: "bg-gradient-to-br from-green-900 to-green-950",
    orbs: [
      "bg-[radial-gradient(circle,rgba(212,163,115,0.22),transparent_70%)]",
      "bg-[radial-gradient(circle,rgba(82,183,136,0.14),transparent_70%)]",
      "bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)]",
    ],
    mesh: "from-white/[0.04] via-transparent to-accent-500/[0.05]",
  },
  neutral: {
    base: "bg-white",
    orbs: [
      "bg-[radial-gradient(circle,rgba(27,67,50,0.05),transparent_70%)]",
      "bg-[radial-gradient(circle,rgba(212,163,115,0.08),transparent_70%)]",
      "bg-[radial-gradient(circle,rgba(82,183,136,0.05),transparent_70%)]",
    ],
    mesh: "from-green-900/[0.02] via-transparent to-accent-500/[0.02]",
  },
};

const intensityMap = {
  subtle: { opacity: 0.6, blur: "blur-3xl" },
  normal: { opacity: 1, blur: "blur-3xl" },
  strong: { opacity: 1.3, blur: "blur-2xl" },
};

export function AmbientBackground({
  variant = "light",
  intensity = "normal",
  className,
  children,
  animated = true,
}: AmbientBackgroundProps) {
  const cfg = configs[variant];
  const int = intensityMap[intensity];

  return (
    <div className={cn("relative overflow-hidden", cfg.base, className)}>
      {/* Animated mesh gradient layer */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60",
          cfg.mesh,
          animated && "animate-mesh-move"
        )}
      />

      {/* Floating orbs */}
      {cfg.orbs.map((orb, i) => {
        const positions = [
          "-right-24 -top-32 h-[520px] w-[520px]",
          "-bottom-32 -left-24 h-[440px] w-[440px]",
          "left-1/3 top-1/4 h-[320px] w-[320px]",
        ];
        const durations = [22, 28, 18];
        const delays = [0, 4, 8];
        return (
          <motion.div
            key={i}
            animate={
              animated
                ? {
                    x: [0, i % 2 === 0 ? 30 : -30, 0],
                    y: [0, i % 2 === 0 ? -30 : 30, 0],
                    scale: [1, 1.06, 0.96, 1],
                  }
                : undefined
            }
            transition={{
              duration: durations[i],
              repeat: Infinity,
              ease: "easeInOut",
              delay: delays[i],
            }}
            className={cn(
              "pointer-events-none absolute rounded-full",
              positions[i],
              orb,
              int.blur
            )}
            style={{ opacity: int.opacity }}
          />
        );
      })}

      {/* Subtle noise grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
