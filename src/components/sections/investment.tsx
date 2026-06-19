"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { TiltCard } from "@/components/ui/tilt-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

const features = [
  "KI-Chatbot (Telegram + Web)",
  "Next.js Website + Online-Buchung",
  "Leichtes CRM für Kunden & Anfragen",
  "SEO / GEO / AEO Optimierung",
  "Telegram + VK Integration",
  "E-Mail-Marketing & Analytics",
];

const roiBars = [
  { label: "Buchungskonversion", value: 90, display: "+200%", color: "from-green-900 to-green-600" },
  { label: "Reaktionszeit", value: 95, display: "-99%", color: "from-green-900 to-green-600" },
  { label: "Admin-Aufwand", value: 70, display: "-70%", color: "from-accent-500 to-accent-600" },
  { label: "Umsatz/Besucher", value: 60, display: "+33%", color: "from-accent-500 to-accent-600" },
  { label: "Web-Traffic", value: 85, display: "+300%", color: "from-green-900 to-green-600" },
  { label: "Organischer Traffic", value: 80, display: "+250%", color: "from-green-900 to-green-600" },
  { label: "Firmenevents", value: 75, display: "+150%", color: "from-accent-500 to-accent-600" },
];

function AnimatedBar({
  value,
  display,
  color,
  label,
}: {
  value: number;
  display: string;
  color: string;
  label: string;
}) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(value), 100);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex items-center gap-4">
      <div className="w-32 shrink-0 text-right text-sm font-semibold text-neutral-700 sm:w-40">
        {label}
      </div>
      <div className="flex-1 overflow-hidden rounded-lg bg-neutral-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className={`h-8 bg-gradient-to-r ${color} flex items-center justify-end pr-3 text-xs font-bold text-white shadow-inner`}
        >
          {display}
        </motion.div>
      </div>
    </div>
  );
}

export function Investment() {
  const [visitors, setVisitors] = useState(800);
  const [ticket, setTicket] = useState(4.5);
  const [invest, setInvest] = useState(28000);

  const weeks = 20;
  const currentRev = visitors * ticket * weeks;
  const projectedRev = currentRev * 1.5;
  const additionalProfit = (projectedRev - currentRev) * 0.4;
  const payback = additionalProfit > 0 ? invest / (additionalProfit / 12) : 0;

  return (
    <section className="relative overflow-hidden">
      <AmbientBackground variant="light" intensity="subtle" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="06"
            title="Investition & Rendite"
            description="Transparente Kostenstruktur mit interaktivem ROI-Rechner und projiziertem Break-even."
          />

          <div className="grid gap-8 lg:grid-cols-2">
            <TiltCard tiltAmount={5} className="rounded-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-900 to-green-800 p-8 text-white shadow-xl shadow-green-900/15"
              >
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-500/10" />
                <div className="relative">
                  <div className="text-sm font-semibold uppercase tracking-wider opacity-80">
                    Gesamtinvestition Phase 1–3
                  </div>
                  <div className="mt-3 text-5xl font-black">21.000–40.000 $</div>
                  <p className="mt-4 leading-relaxed opacity-90">
                    Einmalige Entwicklungskosten
                    <br />
                    Jährliche Betriebskosten: ~10.200 $
                    <br />
                    <em>Phase 1 separat ab 12.000 $ möglich</em>
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm backdrop-blur-sm transition-colors hover:bg-white/15"
                      >
                        <Check className="size-4 text-accent-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TiltCard>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="mb-6 text-2xl font-bold text-foreground">
                Projizierter Impact nach 12 Monaten
              </h3>
              <TiltCard tiltAmount={3} className="rounded-2xl">
                <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  {roiBars.map((bar) => (
                    <AnimatedBar key={bar.label} {...bar} />
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* ROI Calculator */}
          <TiltCard tiltAmount={3} className="mt-10 rounded-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-10"
            >
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                <span>🧮</span> Interaktiver ROI-Rechner
              </h3>

              <div className="mb-8 grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="visitors">Wochentliche Besucher (Saison)</Label>
                  <Input
                    id="visitors"
                    type="number"
                    value={visitors}
                    onChange={(e) => setVisitors(Number(e.target.value))}
                    min={100}
                    max={5000}
                  />
                  <p className="text-xs text-neutral-500">Aktuelle Schätzung: 800/Woche</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ticket">Durchschnittlicher Ticketpreis ($)</Label>
                  <Input
                    id="ticket"
                    type="number"
                    value={ticket}
                    onChange={(e) => setTicket(Number(e.target.value))}
                    min={1}
                    max={20}
                    step={0.5}
                  />
                  <p className="text-xs text-neutral-500">350 Rubel = ca. 4.50 USD</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invest">Investitionssumme ($)</Label>
                  <Input
                    id="invest"
                    type="number"
                    value={invest}
                    onChange={(e) => setInvest(Number(e.target.value))}
                    min={5000}
                    max={100000}
                    step={1000}
                  />
                  <p className="text-xs text-neutral-500">Phase 1+2 Mittelwert</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <TiltCard tiltAmount={5} className="rounded-2xl">
                  <div className="rounded-2xl bg-neutral-100 p-6 text-center transition-shadow hover:shadow-md">
                    <div className="text-3xl font-black text-green-900">
                      ${Math.round(currentRev).toLocaleString("de-DE")}
                    </div>
                    <div className="mt-1 text-sm text-neutral-600">Aktueller Jahresumsatz</div>
                  </div>
                </TiltCard>
                <TiltCard tiltAmount={5} className="rounded-2xl">
                  <div className="rounded-2xl bg-neutral-100 p-6 text-center transition-shadow hover:shadow-md">
                    <div className="text-3xl font-black text-green-900">
                      ${Math.round(projectedRev).toLocaleString("de-DE")}
                    </div>
                    <div className="mt-1 text-sm text-neutral-600">Projizierter Umsatz (+50%)</div>
                  </div>
                </TiltCard>
                <TiltCard tiltAmount={5} className="rounded-2xl">
                  <div className="rounded-2xl bg-gradient-to-br from-green-900 to-green-800 p-6 text-center text-white shadow-md shadow-green-900/15">
                    <div className="text-3xl font-black text-accent-500">
                      {payback > 0 ? payback.toFixed(1) : "N/A"}
                    </div>
                    <div className="mt-1 text-sm text-white/80">Monate bis Break-even</div>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </AmbientBackground>
    </section>
  );
}
