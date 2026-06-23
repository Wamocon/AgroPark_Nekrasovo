"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  CalendarCheck,
  CheckCircle2,
  Gauge,
  Route,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const proofPoints = [
  { value: "3", label: "Schritte bis zur Buchung" },
  { value: "4", label: "Demo-Rollen im Betrieb" },
  { value: "24/7", label: "Chat mit Fallback" },
  { value: "90", label: "Tage bis Phase-1-Livegang" },
];

const flow = [
  {
    icon: CalendarCheck,
    label: "Besucher",
    title: "Bucht ein Erlebnis",
    text: "Termin, Ticketmix und Kontaktdaten laufen durch einen geführten Reservierungsprozess.",
  },
  {
    icon: Bot,
    label: "KI",
    title: "Beantwortet Fragen",
    text: "Öffnungszeiten, Preise und Parkinfos bleiben erreichbar, auch wenn die externe API ausfällt.",
  },
  {
    icon: BarChart3,
    label: "Team",
    title: "Steuert den Betrieb",
    text: "Dashboard, Rollen, KPIs und Aktivitätsfeed zeigen, was heute passiert und wo Engpässe entstehen.",
  },
];

const opsRows = [
  { label: "Heute Buchungen", value: "47", detail: "+12% vs. gestern" },
  { label: "Offene Anfragen", value: "8", detail: "3 warten auf Antwort" },
  { label: "Auslastung", value: "78%", detail: "+5% in Echtzeit" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-[#0b2118] text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(9,31,22,0.98) 0%, rgba(18,65,45,0.94) 55%, rgba(79,93,68,0.88) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-neutral-100 to-transparent"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <Badge
            variant="outline"
            className="mb-6 border-accent-500/45 bg-black/20 text-accent-500 backdrop-blur-sm"
          >
            <span className="mr-2 inline-block size-1.5 rounded-full bg-accent-500" />
            Pitch Deck + Working Demo
          </Badge>

          <h1 className="max-w-3xl text-4xl font-black leading-[1.04] text-white sm:text-5xl lg:text-6xl">
            AgroPark Nekrasovo als buchbare, messbare Demo-Plattform.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg">
            Aus Strategie wird ein nutzbarer Web-Prototyp: Besucher buchen Tickets,
            der KI-Chat beantwortet Fragen, und das Team prüft Buchungen, Rollen und
            operative Kennzahlen im Dashboard.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-accent-500 text-white shadow-lg shadow-black/20 hover:bg-accent-600"
            >
              <Link href="/buchung">
                Buchung testen <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
            >
              <Link href="/login">Demo-Login öffnen</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-black/10 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
            >
              <Link href="/proposal.html">Pitch Deck</Link>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {proofPoints.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/14 bg-white/[0.08] p-4 backdrop-blur"
              >
                <div className="text-2xl font-black text-accent-500">{item.value}</div>
                <div className="mt-2 text-xs font-semibold uppercase leading-snug text-white/62">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="relative"
        >
          <div className="rounded-lg border border-white/18 bg-white/[0.96] p-3 text-neutral-950 shadow-2xl shadow-black/35">
            <div className="flex items-center justify-between gap-3 border-b border-neutral-200 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-xs font-bold text-neutral-700">
                  AgroPark OS · Live Demo
                </span>
              </div>
              <span className="rounded-md bg-green-900 px-2.5 py-1 text-[10px] font-black uppercase text-white">
                Connected
              </span>
            </div>

            <div className="grid gap-3 p-3 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="space-y-3">
                {opsRows.map((row) => (
                  <div key={row.label} className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                    <div className="text-[11px] font-bold uppercase text-neutral-600">
                      {row.label}
                    </div>
                    <div className="mt-1 flex items-end justify-between gap-3">
                      <span className="text-3xl font-black text-green-950">{row.value}</span>
                      <span className="text-xs font-bold text-green-700">{row.detail}</span>
                    </div>
                  </div>
                ))}

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-black text-green-950">
                    <ShieldCheck className="size-4" />
                    Demo sicher begrenzt
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-700">
                    Keine echte Zahlung, saisonale Datumsprüfung, Mengenlimit und lokale
                    Demo-Speicherung für Buchungs- und Kontaktflüsse.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-white p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase text-neutral-500">
                      Visitor-to-ops Journey
                    </div>
                    <div className="mt-1 text-lg font-black text-green-950">
                      Ein Weg, drei verbundene Module
                    </div>
                  </div>
                  <Gauge className="size-5 text-accent-600" />
                </div>

                <div className="space-y-3">
                  {flow.map((item, index) => (
                    <div key={item.title} className="relative rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                      {index < flow.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="absolute -bottom-4 left-8 h-5 w-px bg-green-800/35"
                        />
                      )}
                      <div className="flex gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green-900 text-white">
                          <item.icon className="size-5" />
                        </div>
                        <div>
                          <div className="text-[11px] font-black uppercase text-accent-600">
                            {item.label}
                          </div>
                          <div className="mt-0.5 text-base font-black text-green-950">
                            {item.title}
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-neutral-700">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {[
                    { icon: CheckCircle2, label: "Buchung" },
                    { icon: Activity, label: "Live Feed" },
                    { icon: Route, label: "Roadmap" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-black text-green-950"
                    >
                      <item.icon className="size-4 text-green-700" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
