"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "22.4", suffix: " Mrd. $", label: "Globaler Agritech-Markt 2026" },
  { value: "50", suffix: " Mrd. $", label: "Marktprognose 2033" },
  { value: "10.8", suffix: "%", label: "CAGR 2026–2033" },
  { value: "50", suffix: "%", label: "Buchungen nun online" },
];

const competitors = [
  { name: "Lyman Orchards (USA)", digital: "VR-Touren, AI-Chatbot", tag: "Marktführer", tagVariant: "success" as const },
  { name: "Great Canadian Farm Tour", digital: "Online-Booking, virtuelles Lernen", tag: "Innovator", tagVariant: "success" as const },
  { name: "AgroPark Nekrasovo", digital: "Manuelle Buchung, statische Website", tag: "Verbesserungspotenzial", tagVariant: "accent" as const },
  { name: "Lokale Parks (Kaliningrad)", digital: "Fragmentiert, niedrig", tag: "Peers", tagVariant: "outline" as const },
];

export function MarketAnalysis() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="01"
          title="Marktanalyse & Wettbewerbslandschaft"
          description="Fundamentale Markttrends, Wachstumstreiber und Wettbewerbspositionierung im europäischen und russischen Agritourismusmarkt."
        />

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-neutral-200 bg-white p-6 text-center transition-transform hover:-translate-y-1"
            >
              <div className="text-3xl font-black text-green-900 sm:text-4xl">
                {stat.value}
                <span className="text-accent-500">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-neutral-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4">
          <Image
            src="/de_01_markt.svg"
            alt="Globaler Agritech-Markt: historische Entwicklung und Prognose bis 2033"
            width={1200}
            height={600}
            className="w-full"
          />
          <p className="mt-3 text-center text-sm italic text-neutral-600">
            Abb. 1: Globaler Agritech-Markt – historische Entwicklung und Prognose bis 2033.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4">
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

          <div>
            <h3 className="mb-5 text-2xl font-bold text-foreground">
              Wettbewerbsanalyse – 2×2 Matrix
            </h3>
            <p className="mb-6 leading-relaxed text-neutral-600">
              AgroPark Nekrasovo befindet sich aktuell im Quadrant{" "}
              <strong>»Niedrige Digitalisierung / Hoher Marktanteil«</strong> – eine
              Position mit hohem Disruptionsrisiko durch technologieaffine Wettbewerber.
            </p>

            <div className="overflow-hidden rounded-2xl border border-neutral-200">
              <table className="w-full text-sm">
                <thead className="bg-neutral-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-neutral-600">
                      Wettbewerber
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-neutral-600">
                      Digitalisierung
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-neutral-600">
                      Position
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((comp) => (
                    <tr
                      key={comp.name}
                      className="border-t border-neutral-100 transition-colors hover:bg-neutral-50"
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
    </section>
  );
}
