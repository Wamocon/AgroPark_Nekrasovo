"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SectionHeader } from "./section-header";

const cards = [
  {
    label: "Park-Erlebnis",
    color: "bg-green-50 border-green-100",
    labelColor: "text-green-800",
    text: "Die Startseite erklärt den Park zuerst aus Besuchersicht: Maisfeld-Labyrinth, Maschinenmuseum, Tierbereiche, Restaurant und Grillkuppeln.",
  },
  {
    label: "Digitale Hilfe",
    color: "bg-orange-50 border-orange-100",
    labelColor: "text-orange-800",
    text: "Gäste wählen Termine, reservieren Tickets und stellen Fragen direkt im mehrsprachigen AI-Chat - auch auf mobilen Geräten.",
  },
  {
    label: "Demo-Logik",
    color: "bg-emerald-50 border-emerald-100",
    labelColor: "text-emerald-900",
    text: "Der öffentliche Auftritt verkauft das Parkerlebnis. Das separate Pitch Deck erklärt Strategie, Automatisierung, Roadmap und Wirtschaftlichkeit.",
  },
];

export function ExecutiveSummary() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="park-services" className="relative overflow-hidden border-b border-neutral-200">
      <AmbientBackground variant="neutral" intensity="subtle" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="01"
            title="Parkinhalt und digitale Services"
            description="Die Homepage bleibt einladend für Besucher und zeigt gleichzeitig die Qualität der Demo-Plattform."
          />

          <div className="mt-2 grid gap-5 md:grid-cols-3">
            {cards.map((card, index) => (
              <motion.div
                key={card.label}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : index * 0.08 }}
                className={`rounded-lg border p-6 ${card.color}`}
              >
                <div className={`mb-3 text-xs font-extrabold uppercase tracking-widest ${card.labelColor}`}>
                  {card.label}
                </div>
                <p className="text-[15px] leading-relaxed text-neutral-700">{card.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.25 }}
            className="mt-6 flex flex-col items-center justify-between gap-5 rounded-lg bg-green-900 p-6 text-white sm:flex-row sm:p-8"
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/70">
                Demo-Logik
              </div>
              <div className="mt-2 text-lg font-bold sm:text-xl">
                Besucher buchen. Entscheider prüfen das Premium Pitch Deck separat.
              </div>
            </div>
            <Button asChild size="lg" className="shrink-0 bg-white text-green-900 hover:bg-neutral-100">
              <Link href="/proposal.html">
                Pitch öffnen <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </AmbientBackground>
    </section>
  );
}
