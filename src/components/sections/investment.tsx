"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { TiltCard } from "@/components/ui/tilt-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const features = [
  "KI-Chatbot (Telegram + Web)",
  "Next.js Website + Online-Buchung",
  "Leichtes CRM für Kunden & Anfragen",
  "SEO / GEO / AEO Optimierung",
  "Telegram + VK Integration",
  "E-Mail-Marketing & Analytics",
];

const roiBars = [
  { label: "Buchungskonversion", value: 75, display: "+80–150%", color: "from-green-900 to-green-600" },
  { label: "Reaktionszeit", value: 90, display: "-90%", color: "from-green-900 to-green-600" },
  { label: "Admin-Aufwand Buchung", value: 65, display: "-50–70%", color: "from-accent-500 to-accent-600" },
  { label: "Umsatz/Besucher", value: 55, display: "+15–30%", color: "from-accent-500 to-accent-600" },
  { label: "Web-Traffic (gesamt)", value: 70, display: "+100–200%", color: "from-green-900 to-green-600" },
  { label: "Organischer Traffic", value: 65, display: "+80–150%", color: "from-green-900 to-green-600" },
  { label: "Firmenevents & Gruppen", value: 60, display: "+50–100%", color: "from-accent-500 to-accent-600" },
];

function clampNumber(value: string, min: number, max: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return min;
  return Math.min(max, Math.max(min, parsed));
}

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
  const reducedMotion = useReducedMotion();
  const [visitors, setVisitors] = useState(800);
  const [ticket, setTicket] = useState(4.5);
  const [weeks, setWeeks] = useState(20);
  const [uplift, setUplift] = useState(30);
  const [margin, setMargin] = useState(35);
  const [invest, setInvest] = useState(28000);

  const currentRev = Math.max(0, visitors * ticket * weeks);
  const incrementalRev = Math.max(0, currentRev * (uplift / 100));
  const incrementalProfit = Math.max(0, incrementalRev * (margin / 100));
  const payback = incrementalProfit > 0 ? invest / (incrementalProfit / 12) : null;

  return (
    <section id="investment" className="relative overflow-hidden">
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
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reducedMotion ? 0 : 0.6 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-900 to-green-800 p-8 text-white shadow-xl shadow-green-900/15"
              >
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-500/10" />
                <div className="relative">
                  <div className="text-sm font-semibold uppercase tracking-wider opacity-80">
                    Gesamtinvestition Phase 1–3
                  </div>
                  <div className="mt-3 text-5xl font-black">28.000–55.000 €</div>
                  <p className="mt-4 leading-relaxed opacity-90">
                    Einmalige Entwicklungskosten
                    <br />
                    Jährliche Betriebskosten: ~10.200 €
                    <br />
                    <em>Phase 1 separat ab 15.000 € möglich</em>
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
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.1 }}
            >
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                Projizierte Impact-Ziele nach 12 Monaten
              </h3>
              <p className="mb-6 text-sm text-neutral-600">
                Ambitionierte, aber realistische Ziele auf Basis von Branchenbenchmarks. Abhängig von Saisonalität, Marketing-Budget und operativer Umsetzung.
              </p>
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
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reducedMotion ? 0 : 0.6 }}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-10"
            >
              <h3 className="mb-2 flex items-center gap-2 text-xl font-bold">
                <span>🧮</span> Interaktiver ROI-Rechner
              </h3>
              <p className="mb-6 text-sm text-neutral-600">
                Passen Sie die Parameter an. Der Rechner zeigt den projizierten Mehrerlös vor Kosten, abzüglich einer geschätzten Marge auf den Zusatzumsatz.
              </p>

              <div className="mb-8 grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="visitors">Wochentliche Besucher (Saison)</Label>
                  <Input
                    id="visitors"
                    type="number"
                    value={visitors}
                    onChange={(e) => setVisitors(clampNumber(e.target.value, 100, 5000))}
                    min={100}
                    max={5000}
                  />
                  <p className="text-xs text-neutral-500">Aktuelle Schätzung: 800/Woche</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ticket">Durchschnittlicher Ticketpreis (€)</Label>
                  <Input
                    id="ticket"
                    type="number"
                    value={ticket}
                    onChange={(e) => setTicket(clampNumber(e.target.value, 1, 50))}
                    min={1}
                    max={50}
                    step={0.5}
                  />
                  <p className="text-xs text-neutral-500">ca. 450 Rubel ≈ 4,50 €</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weeks">Saisonwochen</Label>
                  <Input
                    id="weeks"
                    type="number"
                    value={weeks}
                    onChange={(e) => setWeeks(clampNumber(e.target.value, 10, 40))}
                    min={10}
                    max={40}
                  />
                  <p className="text-xs text-neutral-500">Mai–September ≈ 20 Wochen</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uplift">Digital-Uplift (%)</Label>
                  <Input
                    id="uplift"
                    type="number"
                    value={uplift}
                    onChange={(e) => setUplift(clampNumber(e.target.value, 0, 100))}
                    min={0}
                    max={100}
                    step={5}
                  />
                  <p className="text-xs text-neutral-500">Zusätzliche Buchungen/Umsatz</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margin">Marge auf Zusatzumsatz (%)</Label>
                  <Input
                    id="margin"
                    type="number"
                    value={margin}
                    onChange={(e) => setMargin(clampNumber(e.target.value, 5, 80))}
                    min={5}
                    max={80}
                    step={5}
                  />
                  <p className="text-xs text-neutral-500">Variable Deckungsbeitrag</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invest">Investitionssumme (€)</Label>
                  <Input
                    id="invest"
                    type="number"
                    value={invest}
                    onChange={(e) => setInvest(clampNumber(e.target.value, 5000, 100000))}
                    min={5000}
                    max={100000}
                    step={1000}
                  />
                  <p className="text-xs text-neutral-500">Phase 1+2 Mittelwert</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-4">
                <TiltCard tiltAmount={5} className="rounded-2xl">
                  <div className="rounded-2xl bg-neutral-100 p-6 text-center transition-shadow hover:shadow-md">
                    <div className="text-2xl font-black text-green-900">
                      €{Math.round(currentRev).toLocaleString("de-DE")}
                    </div>
                    <div className="mt-1 text-sm text-neutral-600">Aktueller Saisonumsatz</div>
                  </div>
                </TiltCard>
                <TiltCard tiltAmount={5} className="rounded-2xl">
                  <div className="rounded-2xl bg-neutral-100 p-6 text-center transition-shadow hover:shadow-md">
                    <div className="text-2xl font-black text-green-900">
                      €{Math.round(incrementalRev).toLocaleString("de-DE")}
                    </div>
                    <div className="mt-1 text-sm text-neutral-600">Zusatzumsatz (+{uplift}%)</div>
                  </div>
                </TiltCard>
                <TiltCard tiltAmount={5} className="rounded-2xl">
                  <div className="rounded-2xl bg-neutral-100 p-6 text-center transition-shadow hover:shadow-md">
                    <div className="text-2xl font-black text-green-900">
                      €{Math.round(incrementalProfit).toLocaleString("de-DE")}
                    </div>
                    <div className="mt-1 text-sm text-neutral-600">Geschätzter Mehrgewinn</div>
                  </div>
                </TiltCard>
                <TiltCard tiltAmount={5} className="rounded-2xl">
                  <div className="rounded-2xl bg-gradient-to-br from-green-900 to-green-800 p-6 text-center text-white shadow-md shadow-green-900/15">
                    <div className="text-2xl font-black text-accent-500">
                      {payback ? payback.toFixed(1) : "N/A"}
                    </div>
                    <div className="mt-1 text-sm text-white/80">Monate bis Break-even</div>
                  </div>
                </TiltCard>
              </div>

              <p className="mt-6 text-center text-xs text-neutral-500">
                <strong>Methode:</strong> Mehrgewinn = Zusatzumsatz × Marge. Break-even = Investition ÷ (Mehrgewinn ÷ 12). Jährliche Betriebskosten (~10.200 €) sind nicht zusätzlich abgezogen; sie werden durch eingesparte Admin-Zeit teilweise kompensiert.
              </p>
            </motion.div>
          </TiltCard>
        </div>
      </AmbientBackground>
    </section>
  );
}
