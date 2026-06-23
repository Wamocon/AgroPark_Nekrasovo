"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { TiltCard } from "@/components/ui/tilt-card";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const touchpoints = [
  { name: "Website", score: "35/100", text: "Statische Inhalte, keine Online-Buchung, kein responsives Design, keine Analytics-Integration.", variant: "accent" as const },
  { name: "Telegram Buchung", score: "45/100", text: "Manueller Chat-Prozess, keine Automatisierung, Abhängigkeit von Personalverfügbarkeit.", variant: "accent" as const },
  { name: "VKontakte (7.900+ Follower)", score: "60/100", text: "Aktive Community, aber keine Conversion-Optimierung, kein automatisiertes Booking.", variant: "success" as const },
  { name: "Google My Business / Yandex", score: "40/100", text: "Grundeintrag vorhanden, unvollständige Informationen, keine aktive Bewertungsstrategie.", variant: "accent" as const },
];

export function CustomerAnalysis() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="customer-analysis" className="relative overflow-hidden">
      <AmbientBackground variant="light" intensity="subtle" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="02"
            title="Kunden- & Umsatzstrukturanalyse"
            description="Aktuelle Geschäftsmodell-Architektur, Revenue-Streams und digitale Touchpoint-Analyse."
          />

          <div className="grid gap-8 lg:grid-cols-2">
            <TiltCard tiltAmount={4} className="rounded-2xl">
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reducedMotion ? 0 : 0.6 }}
                className="h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <Image
                  src="/de_02_umsatz.svg"
                  alt="Geschätzte Umsatzverteilung nach sieben Einnahmekategorien"
                  width={800}
                  height={600}
                  className="w-full"
                />
                <p className="mt-3 text-center text-sm italic text-neutral-600">
                  Abb. 3: Geschätzte Umsatzverteilung nach sieben Einnahmekategorien.
                </p>
              </motion.div>
            </TiltCard>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reducedMotion ? 0 : 0.6 }}
            >
              <h3 className="mb-5 text-2xl font-bold text-foreground">
                Digitale Touchpoint-Bewertung
              </h3>
              <div className="space-y-4">
                {touchpoints.map((tp, i) => (
                  <TiltCard key={tp.name} tiltAmount={5} className="group rounded-2xl">
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : i * 0.1 }}
                      className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
                    >
                      <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 rounded-t-2xl bg-gradient-to-r from-green-900 via-green-600 to-accent-500 transition-transform duration-500 group-hover:scale-x-100" />
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-bold text-foreground">{tp.name}</span>
                        <Badge variant={tp.variant}>Score: {tp.score}</Badge>
                      </div>
                      <p className="text-sm text-neutral-600">{tp.text}</p>
                    </motion.div>
                  </TiltCard>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </AmbientBackground>
    </section>
  );
}
