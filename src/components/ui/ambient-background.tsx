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
 mesh: "from-green-900/[0.03] via-transparent to-accent-500/[0.03]",
 },
 dark: {
 base: "bg-green-950",
 mesh: "from-accent-500/[0.06] via-transparent to-green-600/[0.05]",
 },
 accent: {
 base: "bg-gradient-to-br from-green-900 to-green-950",
 mesh: "from-white/[0.04] via-transparent to-accent-500/[0.05]",
 },
 neutral: {
 base: "bg-white",
 mesh: "from-green-900/[0.02] via-transparent to-accent-500/[0.02]",
 },
};

const intensityMap = {
 subtle: "opacity-[0.18]",
 normal: "opacity-[0.26]",
 strong: "opacity-[0.34]",
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
 <div
 className={cn(
 "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60",
 cfg.mesh
 )}
 />

 <div
 className={cn(
 "pointer-events-none absolute inset-0",
 int,
 animated && "animate-field-drift"
 )}
 style={{
 backgroundImage:
 "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(0deg, currentColor 1px, transparent 1px)",
 backgroundSize: "56px 56px",
 color: variant === "dark" || variant === "accent" ? "#ffffff" : "#1b4332",
 }}
 />

 <div
 className="pointer-events-none absolute inset-0 opacity-[0.03]"
 style={{
 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
 }}
 />

 <div className="relative z-10">{children}</div>
 </div>
 );
}
