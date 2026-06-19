"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: 0,
    label: "1. Ihre Ausgangslage",
    cards: [
      {
        icon: "🌾",
        title: "Ihr Betrieb heute",
        items: [
          "Starke physische Attraktion und regionale Bekanntheit",
          "Sieben Einnahmeströme, davon viele noch manuell abgewickelt",
          "Telegram und VKontakte bereits als Kanäle genutzt",
          "Engagierte Familie/Team mit Hands-on-Mentalität",
        ],
      },
      {
        icon: "🔄",
        title: "Ihr aktueller Workflow",
        items: [
          "Besucher schreiben auf Telegram → manuelle Beantwortung",
          "Verfügbarkeiten werden per Telefon geklärt",
          "Zahlungen erfolgen vor Ort oder fragmentiert",
          "Keine zentrale Kundenhistorie oder CRM-Datenbank",
        ],
      },
    ],
  },
  {
    id: 1,
    label: "2. Aktuelle Probleme",
    cards: [
      {
        icon: "⏰",
        title: "Zeitfresser & manuelle Prozesse",
        text: "Jede Buchung kostet Ihr Team Minuten bis Stunden. Wiederholte Fragen nach Öffnungszeiten, Preisen und Verfügbarkeiten blockieren Ressourcen.",
        items: [
          "Manuelle Beantwortung von 80+ Nachrichten pro Woche",
          "Doppelte Datenerfassung in verschiedenen Chat-Verläufen",
          "Fehlende Verfügbarkeitsübersicht führt zu Doppelbuchungen",
          "Keine automatische Erinnerung oder Stornierungslogik",
        ],
      },
      {
        icon: "💸",
        title: "Verpasste Umsatzchancen",
        text: "Wenn potenzielle Gäste nicht sofort buchen können, verlieren Sie Buchungen an Wettbewerber oder an die eigene Vergesslichkeit.",
        items: [
          "Kein 24/7 Buchungskanal für spontane Entscheider",
          "Firmenanfragen werden nicht systematisch verfolgt",
          "Kein automatisiertes Upselling (Grillkuppel, F&B, Touren)",
          "Google/Yandex-Sichtbarkeit deutlich unter dem Möglichen",
        ],
      },
    ],
  },
  {
    id: 2,
    label: "3. Unsere Lösung",
    cards: [
      {
        icon: "🤖",
        title: "Automatisierung ohne Overhead",
        text: "Wir bauen ein schlankes digitales System, das Ihre bestehenden Kanäle verbindet statt sie zu ersetzen. Der Fokus liegt auf pragmatischen Tools, die von Tag eins funktionieren.",
        items: [
          "KI-Chatbot auf Telegram und Webseite (mehrsprachig)",
          "Online-Buchung mit Echtzeit-Verfügbarkeit und QR-Tickets",
          "Leichtes CRM für Kunden, Buchungen und Anfragen",
          "Google/Yandex-Optimierung für lokale Suche",
        ],
      },
      {
        icon: "📊",
        title: "Daten, die Sie steuern lassen",
        text: "Statt Bauchgefühl entscheiden Sie auf Basis von Zahlen: Welche Events lohnen sich? Wann ist Auslastung hoch? Welche Kanäle bringen die besten Gäste?",
        items: [
          "Zentrales Dashboard mit Buchungen, Umsatz und Auslastung",
          "Automatische Berichte per E-Mail oder Telegram",
          "Bewertungsmanagement und Kundenfeedback",
          "Datenbasierte Preis- und Kapazitätsplanung",
        ],
      },
    ],
  },
  {
    id: 3,
    label: "4. Vorteile & KPIs",
    cards: [
      {
        icon: "✅",
        title: "Konkrete Vorteile für Sie",
        items: [
          "Weniger Telefonate und Chat-Nachrichten durch Selbstbuchung",
          "Höhere Auslastung durch 24/7 Buchbarkeit",
          "Bessere Planbarkeit durch Echtzeit-Verfügbarkeit",
          "Professionellerer Eindruck bei Firmenkunden",
          "Mehr Zeit für Ihr Team und Ihre Gäste vor Ort",
        ],
      },
      {
        icon: "📏",
        title: "KPI-Definitionen",
        items: [
          "Buchungskonversion: Anteil der Besucher, die buchen",
          "Admin-Aufwand: Stunden pro Woche für manuelle Buchungen",
          "Umsatz pro Gast: Durchschnittlicher Ticket- und Zusatzumsatz",
          "Break-even: Zeit bis die Investition gedeckt ist",
          "Sichtbarkeit: Ranking und Impressions auf Google/Yandex",
        ],
      },
    ],
  },
];

const kpis = [
  { value: "+200%", label: "Buchungskonversion" },
  { value: "-70%", label: "Admin-Aufwand" },
  { value: "+33%", label: "Umsatz pro Gast" },
  { value: "4-8", label: "Monate Break-even" },
];

export function ConsultantFramework() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-neutral-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="00"
          title="Von der Analyse zur messbaren Wertschöpfung"
          description="Unser Beratungsansatz für AgroPark Nekrasovo: Ausgangslage verstehen, Schmerzpunkte beseitigen, Lösungen skalieren."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "flex-1 min-w-[140px] rounded-xl border px-4 py-3 text-sm font-bold transition-all",
                active === tab.id
                  ? "border-green-900 bg-green-900 text-white"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-green-700 hover:text-green-900"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {active === 3 && (
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-2xl border border-neutral-200 bg-white p-5 text-center"
                  >
                    <div className="text-2xl font-black text-green-900 sm:text-3xl">
                      {kpi.value}
                    </div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-600">
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              {tabs[active].cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h3 className="mb-3 flex items-center gap-3 text-lg font-bold text-green-900">
                    <span className="text-2xl">{card.icon}</span>
                    {card.title}
                  </h3>
                  {"text" in card && card.text && (
                    <p className="mb-4 text-sm leading-relaxed text-neutral-600">
                      {card.text}
                    </p>
                  )}
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-neutral-600"
                      >
                        <span className="mt-0.5 text-green-600">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
