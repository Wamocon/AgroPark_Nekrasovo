"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Layers, Bot, Calendar, TrendingUp } from "lucide-react";

function AnimatedCounter({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start: number | null = null;
          const duration = 2000;

          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString("de-DE", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-gradient-to-br from-green-900 via-green-950 to-green-800 py-24 sm:py-32">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 -top-40 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,163,115,0.15),transparent_70%)]"
        />
        <motion.div
          animate={{
            x: [0, -20, 40, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -left-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(82,183,136,0.15),transparent_70%)]"
        />
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -20, 40, 0],
            scale: [1, 1.08, 0.92, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(212,163,115,0.10),transparent_70%)]"
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <Badge
            variant="outline"
            className="mb-6 border-accent-500/30 bg-accent-500/10 text-accent-500 backdrop-blur-sm"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-500" />
            Strategiepapier 2026
          </Badge>

          <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Weniger Aufwand. Mehr Buchungen. Bessere Übersicht.{" "}
            <span className="text-accent-500">AgroPark Nekrasovo</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            Ein pragmatischer Plan, Ihren Park effizienter zu führen: automatisierte
            Buchungen, ein intelligenter Chatbot für Telegram und Web, sowie bessere
            Sichtbarkeit bei Google und Yandex.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent-500 text-white hover:bg-accent-600"
            >
              <Link href="/buchung">
                Ticket buchen <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/dashboard">Dashboard öffnen</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: 22.4, suffix: " Mrd.", label: "Markt 2026" },
              { value: 50, suffix: " Mrd.", label: "Prognose 2033" },
              { value: 10.8, suffix: "%", label: "CAGR Wachstum", decimals: 1 },
              { value: 200, suffix: "%", label: "Conversion-Ziel" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4"
              >
                <div className="text-lg font-extrabold text-accent-500 sm:text-xl">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3D Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="perspective-[1200px]"
        >
          <motion.div
            animate={{
              rotateY: [-8, -6, -8],
              rotateX: [4, 3, 4],
              y: [0, -12, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="rounded-2xl border border-white/20 bg-white/95 shadow-2xl shadow-black/30"
          >
            <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-3">
              <div className="size-3 rounded-full bg-red-400" />
              <div className="size-3 rounded-full bg-amber-400" />
              <div className="size-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs font-semibold text-neutral-700">
                AgroPark OS – Live Dashboard
              </span>
            </div>

            <div className="grid p-4 sm:grid-cols-[64px_1fr]">
              <div className="hidden flex-col items-center gap-4 border-r border-neutral-200 pr-3 sm:flex">
                <div className="flex size-8 items-center justify-center rounded-lg bg-green-900 text-white">
                  <Layers className="size-4" />
                </div>
                <div className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600">
                  <Calendar className="size-4" />
                </div>
                <div className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600">
                  <Bot className="size-4" />
                </div>
                <div className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600">
                  <TrendingUp className="size-4" />
                </div>
              </div>

              <div className="space-y-3 sm:pl-4">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Heute Buchungen", value: "47", change: "+12%" },
                    { label: "Umsatz", value: "€2.840", change: "+€340" },
                    { label: "Auslastung", value: "78%", change: "+5%" },
                  ].map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-lg border border-neutral-200 bg-white p-2 shadow-sm"
                    >
                      <div className="text-[9px] uppercase tracking-wider text-neutral-600">
                        {kpi.label}
                      </div>
                      <div className="text-base font-extrabold text-green-900 sm:text-lg">
                        {kpi.value}
                      </div>
                      <div className="text-[9px] font-semibold text-green-700">
                        {kpi.change}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm">
                    <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                      Live Aktivität
                      <span className="flex items-center gap-1 text-green-700">
                        <span className="inline-block size-1.5 animate-pulse-dot rounded-full bg-green-600" />
                        LIVE
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {[
                        { name: "Max K.", action: "buchte Familienticket", time: "vor 2 Min.", channel: "Stripe" },
                        { name: "Anna L.", action: "reservierte Grillplatz", time: "vor 5 Min.", channel: "Telegram" },
                        { name: "Sergej B.", action: "startete VR-Tour", time: "vor 8 Min.", channel: "Web" },
                      ].map((item) => (
                        <li
                          key={item.name + item.action}
                          className="flex items-center gap-2 rounded-lg bg-neutral-50 p-2 text-[11px]"
                        >
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700 text-[9px] font-bold text-white">
                            {item.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <strong>{item.name}</strong> {item.action}
                            <div className="text-[9px] text-neutral-600">
                              {item.time} • {item.channel}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                      KI-Assistent
                    </div>
                    <div className="space-y-2">
                      <div className="max-w-[90%] rounded-lg rounded-bl-none bg-neutral-100 p-2 text-[11px]">
                        Hallo! Ich helfe Ihnen bei der Buchung. Welchen Termin möchten Sie?
                      </div>
                      <div className="ml-auto max-w-[90%] rounded-lg rounded-br-none bg-green-900 p-2 text-[11px] text-white">
                        Nächsten Samstag, 2 Erwachsene + 1 Kind
                      </div>
                      <div className="max-w-[90%] rounded-lg rounded-bl-none bg-neutral-100 p-2 text-[11px]">
                        Perfekt – Samstag ist verfügbar. Ticket für €34 hinzugefügt.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-neutral-50 p-2 text-[10px] font-semibold text-neutral-600">
                  <span className="flex items-center gap-1"><span className="flex size-4 items-center justify-center rounded bg-green-700 text-white">S</span>Stripe</span>
                  <span className="flex items-center gap-1"><span className="flex size-4 items-center justify-center rounded bg-green-700 text-white">G</span>Calendar</span>
                  <span className="flex items-center gap-1"><span className="flex size-4 items-center justify-center rounded bg-green-700 text-white">T</span>Telegram</span>
                  <span className="flex items-center gap-1"><span className="flex size-4 items-center justify-center rounded bg-green-700 text-white">W</span>WhatsApp</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
