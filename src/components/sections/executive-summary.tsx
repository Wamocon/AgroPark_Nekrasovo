"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    label: "Situation",
    color: "bg-green-50 border-green-100",
    labelColor: "text-green-800",
    text: "AgroPark Nekrasovo ist eine bekannte Regionalmarke im Kaliningrader Agritourismus. Der globale Agritourism-Markt wächst mit ca. 11–13 % CAGR und europäische Gäste buchen zunehmend direkt online.",
  },
  {
    label: "Komplikation",
    color: "bg-orange-50 border-orange-100",
    labelColor: "text-orange-800",
    text: "Buchungen, Anfragen und Zahlungen laufen manuell über Chat und Telefon. Das begrenzt die Skalierung, führt zu Doppelbuchungen und verpassten Umsatzchancen – besonders bei Spontanbuchungen und Firmenevents.",
  },
  {
    label: "Empfohlene Lösung",
    color: "bg-emerald-50 border-emerald-100",
    labelColor: "text-emerald-900",
    text: "In drei Phasen führen wir eine durchgängige Digitalisierung ein: Next.js-Website mit Online-Buchung, KI-Chatbot für Telegram/Web, leichtes CRM sowie SEO/GEO/AEO-Optimierung. Investition: 28.000–55.000 €, Ziel-ROI-Horizont: 12–24 Monate.",
  },
];

export function ExecutiveSummary() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="executive-summary" className="relative overflow-hidden border-b border-neutral-200">
      <AmbientBackground variant="neutral" intensity="subtle" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="ES"
            title="Executive Summary"
            description="Empfehlung, Kernargumente und nächste Schritte auf einen Blick."
          />

          <div className="mt-2 grid gap-5 md:grid-cols-3">
            {cards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : i * 0.1 }}
                className={`rounded-2xl border p-6 ${card.color}`}
              >
                <div
                  className={`mb-3 text-xs font-extrabold uppercase tracking-widest ${card.labelColor}`}
                >
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
            transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.3 }}
            className="mt-6 flex flex-col items-center justify-between gap-5 rounded-2xl bg-green-900 p-6 text-white sm:flex-row sm:p-8"
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/70">
                Unsere Empfehlung
              </div>
              <div className="mt-2 text-lg font-bold sm:text-xl">
                Phase 1 starten: Website-Relaunch, Chatbot-Integration und Online-Buchung
                innerhalb von 90 Tagen live.
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="shrink-0 bg-white text-green-900 hover:bg-neutral-100"
            >
              <Link href="/kontakt">
                Termin vereinbaren <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </AmbientBackground>
    </section>
  );
}
