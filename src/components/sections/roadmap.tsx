"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";

const phases = [
  {
    phase: "Phase 1",
    duration: "Monat 1–2",
    title: "Quick Wins",
    color: "from-green-900 to-green-800",
    items: [
      "KI-Chatbot auf Telegram deployen",
      "Website-Redesign mit Next.js launch",
      "Online-Booking-Widget live schalten",
      "SEO-Grundoptimierung (GMB, Yandex)",
      "Social-Media-Automation einrichten",
      "Analytics-Baseline etablieren",
    ],
  },
  {
    phase: "Phase 2",
    duration: "Monat 3–5",
    title: "Kernfunktionen",
    color: "from-green-800 to-green-700",
    items: [
      "CRM-Integration abschließen",
      "Eventmanagement-System vollständig",
      "E-Mail-Marketing-Automation",
      "AEO-Optimierung (FAQ Schema)",
      "GEO-Optimierung (KI-Sichtbarkeit)",
      "Content-Marketing-Engine aufbauen",
    ],
  },
  {
    phase: "Phase 3",
    duration: "Monat 6–9",
    title: "Differenzierung",
    color: "from-green-700 to-green-500",
    items: [
      "Mitgliedschaftsprogramm-Start",
      "Mehrsprachigkeit (EN, DE)",
      "Fortgeschrittenes Analytics-Dashboard",
      "Influencer-Partnerschaften",
      "Digitale Produkte lancieren",
      "VR-Farmtour-Entwicklung",
    ],
  },
  {
    phase: "Phase 4",
    duration: "Zukunft",
    title: "IoT & Smart Farm",
    color: "from-accent-500 to-accent-600",
    future: true,
    items: [
      "IoT-Sensorstation (Boden, Wetter)",
      "Live-Daten-Dashboard",
      "Smart Farming Bildungsexhibit",
      "Premium Smart Farm-Tickets",
      "Schul-Workshops Data Literacy",
    ],
  },
];

export function Roadmap() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="05"
          title="Implementierungs-Roadmap"
          description="Phasierter Ansatz mit definierten Meilensteinen, Deliverables und Erfolgsmetriken."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((p, i) => (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg",
                p.future && "border-accent-500/30 bg-accent-100/30"
              )}
            >
              <div className={cn("absolute left-0 right-0 top-0 h-1 bg-gradient-to-r", p.color)} />
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-green-700">
                {p.phase} – {p.duration}
              </div>
              <h3 className={cn("mb-4 text-xl font-bold", p.future && "text-accent-600")}>
                {p.title}
              </h3>
              <ul className="space-y-3">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                    <span className="mt-0.5 text-green-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
