"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { Search, Sparkles, MessageCircle } from "lucide-react";

const pillars = [
  {
    icon: Search,
    abbr: "SEO",
    title: "Search Engine Optimization",
    text: "Lokale Keywords, Google My Business, Yandex.Karten, Bewertungsmanagement, strukturierte Daten.",
  },
  {
    icon: Sparkles,
    abbr: "GEO",
    title: "Generative Engine Optimization",
    text: "KI-Suchmaschinen (ChatGPT, Perplexity, Google SGE). Strukturierte Inhalte, EEAT-Signale.",
  },
  {
    icon: MessageCircle,
    abbr: "AEO",
    title: "Answer Engine Optimization",
    text: "Sprachassistenten (Alexa, Siri, Google Assistant). Conversational Content, FAQ-Schema, Featured Snippets.",
  },
];

export function MarketingStrategy() {
  return (
    <section className="bg-neutral-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="04"
          title="Marketingstrategie: SEO × GEO × AEO"
          description="Dreidimensionale Suchmaschinen-Optimierung für maximale digitale Sichtbarkeit in der Kaliningrader Region."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="mb-5 text-2xl font-bold text-foreground">
              Die drei Säulen der Sichtbarkeit
            </h3>
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.abbr}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-700 text-white">
                    <pillar.icon className="size-5" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">{pillar.title}</h4>
                </div>
                <p className="text-sm leading-relaxed text-neutral-600">{pillar.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4"
          >
            <Image
              src="/de_04_sichtbarkeit.svg"
              alt="Digitale Sichtbarkeitsanalyse"
              width={800}
              height={600}
              className="w-full"
            />
            <p className="mt-3 text-center text-sm italic text-neutral-600">
              Abb. 5: Digitale Sichtbarkeit – aktueller Status vs. 12-Monats-Ziel.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
