"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { TiltCard } from "@/components/ui/tilt-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const stats = [
  { value: "10.3", suffix: " Mrd. €", label: "Globaler Agritourism-Markt 2026" },
  { value: "22.4", suffix: " Mrd. €", label: "Marktprognose 2033" },
  { value: "11.8", suffix: "%", label: "CAGR 2026–2033" },
  { value: "75", suffix: "%", label: "Direktbuchungen im Agritourism" },
];

const competitors = [
  { name: "Lyman Orchards (USA)", digital: "VR-Touren, saisonaler Online-Shop", tag: "Internationaler Vorbild", tagVariant: "success" as const },
  { name: "Great Canadian Farm Tour", digital: "Kostenloses Schul-Bildungsprogramm", tag: "Nicht kommerzieller Peer", tagVariant: "success" as const },
  { name: "AgroPark Nekrasovo", digital: "Manuelle Buchung, begrenzte Digitalisierung", tag: "Verbesserungspotenzial", tagVariant: "accent" as const },
  { name: "Lokale Parks (Kaliningrad)", digital: "Fragmentiert, niedrige Digitalisierung", tag: "Regionale Peers", tagVariant: "outline" as const },
];

export function MarketAnalysis() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="market-analysis" className="relative overflow-hidden">
      <AmbientBackground variant="neutral" intensity="subtle" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="01"
            title="Marktanalyse & Wettbewerbslandschaft"
            description="Fundamentale Markttrends, Wachstumstreiber und Wettbewerbspositionierung im europäischen und russischen Agritourismusmarkt."
          />

          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <TiltCard key={stat.label} tiltAmount={6} className="group rounded-2xl">
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : i * 0.05 }}
                  className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 rounded-t-2xl bg-gradient-to-r from-green-900 via-green-600 to-accent-500 transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="text-3xl font-black text-green-900 sm:text-4xl">
                    {stat.value}
                    <span className="text-accent-500">{stat.suffix}</span>
                  </div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-neutral-600">
                    {stat.label}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>

          <TiltCard tiltAmount={4} className="mb-8 rounded-2xl">
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <Image
                src="/de_01_markt.svg"
                alt="Globaler Agritourism-Markt: historische Entwicklung und Prognose bis 2033"
                width={1200}
                height={600}
                className="w-full"
              />
              <p className="mt-3 text-center text-sm italic text-neutral-600">
                Abb. 1: Globaler Agritourism-Markt – historische Entwicklung und Prognose bis 2033. Quelle: Coherent Market Insights (März 2026), Fortune Business Insights (Juni 2026), eigene Analyse.
              </p>
            </div>
          </TiltCard>

          <div className="grid gap-8 lg:grid-cols-2">
            <TiltCard tiltAmount={4} className="rounded-2xl">
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                <Image
                  src="/de_05_wettbewerb.svg"
                  alt="Wettbewerbsmatrix: Technologiereife vs. Marktposition"
                  width={800}
                  height={600}
                  className="w-full"
                />
                <p className="mt-3 text-center text-sm italic text-neutral-600">
                  Abb. 2: Wettbewerbsmatrix – Technologiereife vs. Marktposition.
                </p>
              </div>
            </TiltCard>

            <div>
              <h3 className="mb-5 text-2xl font-bold text-foreground">
                Wettbewerbsanalyse – 2×2 Matrix
              </h3>
              <p className="mb-6 leading-relaxed text-neutral-600">
                AgroPark Nekrasovo befindet sich aktuell im Quadrant{" "}
                <strong>»Niedrige Digitalisierung / Bekannte Regionalmarke«</strong> – eine
                Position mit hohem Disruptionsrisiko durch technologieaffine Wettbewerber.
              </p>

              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-green-900 to-green-800 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                        Wettbewerber
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                        Digitalisierung
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                        Position
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((comp, idx) => (
                      <tr
                        key={comp.name}
                        className={cn(
                          "border-t border-neutral-100 transition-colors hover:bg-green-50/60",
                          idx % 2 === 1 && "bg-neutral-50/50"
                        )}
                      >
                        <td className="px-4 py-3 font-semibold">{comp.name}</td>
                        <td className="px-4 py-3 text-neutral-600">{comp.digital}</td>
                        <td className="px-4 py-3">
                          <Badge variant={comp.tagVariant}>{comp.tag}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </AmbientBackground>
    </section>
  );
}
