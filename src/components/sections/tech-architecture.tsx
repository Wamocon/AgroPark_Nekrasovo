"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./section-header";
import { Bot, Laptop, Calendar, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const techCards = [
  {
    icon: Bot,
    title: "KI-Chatbot",
    text: "RAG-basierter Konversationsassistent auf Telegram und Web. 90% FAQ-Automatisierung, Buchungsqualifizierung, mehrsprachige Unterstützung.",
    tag: "90% Automatisierungsrate",
  },
  {
    icon: Laptop,
    title: "Next.js 16 + shadcn/ui",
    text: "Serverseitiges Rendering, sub-sekundige Ladezeiten, responsives Mobile-first-Design, WCAG 2.1 AA Barrierefreiheit.",
    tag: "+300% Traffic",
  },
  {
    icon: Calendar,
    title: "Online-Buchungssystem",
    text: "Echtzeit-Verfügbarkeit, Self-Service-Checkout, QR-basierter Check-in, automatische Bestätigungen, dynamische Preisgestaltung.",
    tag: "+200% Konversion",
  },
  {
    icon: BarChart3,
    title: "Analytics & CRM",
    text: "Besucherverhalten, Buchungstrends, Marketing-Attribution, Personalplanungs-Optimierung, datengesteuerte Entscheidungen.",
    tag: "Echtzeit-Dashboard",
  },
];

const workflowSteps = [
  {
    title: "Multi-Channel-Kontaktpunkte",
    desc: "Besucher erreichen AgroPark über vier primäre Kanäle: Website, Telegram, VKontakte und Suchmaschinen. Jede Anfrage wird in Echtzeit erfasst.",
    metrics: [
      { label: "Website-Traffic/Monat", value: "~2.400" },
      { label: "Telegram-Nachrichten/Woche", value: "~85" },
      { label: "VK-Engagement-Rate", value: "2.3%" },
      { label: "Organische Sichtbarkeit", value: "35/100" },
      { label: "Gesamtkontaktpunkte/Saison", value: "~4.200" },
    ],
  },
  {
    title: "KI-Verarbeitungsschicht",
    desc: "RAG-Pipeline analysiert jede Anfrage, ruft relevante Informationen aus der Wissensdatenbank ab und generiert kontextbezogene Antworten.",
    metrics: [
      { label: "Durchschnittliche Antwortzeit", value: "< 2 Sek." },
      { label: "FAQ-Automatisierungsrate", value: "90%" },
      { label: "Buchungsqualifizierung", value: "75%" },
      { label: "Sprachunterstützung", value: "RU, EN, DE" },
      { label: "Verfügbarkeit", value: "24/7/365" },
    ],
  },
  {
    title: "Backend-Systeme",
    desc: "Buchungsdaten fließen in das Reservierungssystem, Besucherinformationen in das CRM, Transaktionsdaten in das Analytics-Dashboard.",
    metrics: [
      { label: "Buchungssystem", value: "Cal.com API" },
      { label: "CRM", value: "HubSpot / Pipedrive" },
      { label: "E-Mail Automation", value: "SendGrid" },
      { label: "Analytics", value: "Plausible + Mixpanel" },
      { label: "CMS", value: "Sanity.io" },
    ],
  },
  {
    title: "Datengesteuerte Entscheidungen",
    desc: "Aggregierte Daten aus allen Systemen erzeugen aktionsorientierte Insights: Nachfrageprognosen, optimale Preisgestaltung, personalisierte Marketingkampagnen.",
    metrics: [
      { label: "Buchungskonversion-Steigerung", value: "+200%" },
      { label: "Administrativer Aufwand", value: "-70%" },
      { label: "Umsatz pro Besucher", value: "+33%" },
      { label: "Organischer Traffic", value: "+250%" },
      { label: "Kundenzufriedenheit", value: "4.6/5.0" },
    ],
  },
];

export function TechArchitecture() {
  const [step, setStep] = useState(0);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="03"
          title="Technologie-Architektur & KI-Automatisierung"
          description="Empfohlener Tech-Stack, KI-Chatbot-Architektur und betrieblicher Impact der Automatisierung."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {techCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 rounded-t-2xl bg-gradient-to-r from-green-900 to-green-600 transition-transform duration-500 group-hover:scale-x-100" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-700 text-white">
                <card.icon className="size-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{card.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-600">{card.text}</p>
              <span className="mt-4 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-900">
                {card.tag}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4"
        >
          <Image
            src="/de_03_ai_impact.svg"
            alt="Betrieblicher Impact der KI-Automatisierung"
            width={1200}
            height={600}
            className="w-full"
          />
          <p className="mt-3 text-center text-sm italic text-neutral-600">
            Abb. 4: Betrieblicher Impact der KI-Automatisierung – Baseline vs. optimierter Zustand.
          </p>
        </motion.div>

        {/* Workflow stepper */}
        <div className="mt-12 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10">
          <div className="mb-8 flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-900 text-lg font-extrabold text-white">
              3.1
            </div>
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight">Interaktiver System-Workflow</h3>
              <p className="text-muted-foreground">Vier Phasen des automatisierten Kundendatenflusses</p>
            </div>
          </div>

          <div className="relative mb-10 flex justify-between">
            <div className="absolute left-4 right-4 top-5 hidden h-0.5 bg-neutral-200 md:block" />
            {workflowSteps.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setStep(i)}
                className="relative z-10 flex flex-col items-center text-center focus:outline-none"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all",
                    step === i
                      ? "border-green-900 bg-green-900 text-white shadow-[0_0_0_6px_rgba(27,67,50,0.15)]"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-green-700"
                  )}
                >
                  {i + 1}
                </div>
                <span
                  className={cn(
                    "mt-2 hidden max-w-[100px] text-[11px] font-semibold uppercase tracking-wider md:block",
                    step === i ? "text-green-900" : "text-neutral-600"
                  )}
                >
                  {s.title.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 lg:grid-cols-2"
            >
              <div className="rounded-2xl bg-gradient-to-br from-green-900 to-green-700 p-8 text-white">
                <h4 className="mb-3 text-xl font-bold">Phase {step + 1}: {workflowSteps[step].title}</h4>
                <p className="leading-relaxed opacity-90">{workflowSteps[step].desc}</p>
              </div>
              <div>
                <h4 className="mb-4 text-base font-bold text-green-900">Kennzahlen</h4>
                <div className="space-y-3">
                  {workflowSteps[step].metrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-center justify-between border-b border-neutral-200 pb-2 text-sm"
                    >
                      <span className="text-neutral-600">{m.label}</span>
                      <span className="font-bold text-green-900">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
