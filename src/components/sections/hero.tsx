"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, CircleDot, Navigation, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
 demoAccounts,
 heroActions,
 parkZones,
 productModules,
 recentActivity,
} from "@/data/agropark";

function ParkMap() {
 const shortZoneLabel: Record<string, string> = {
  Maislabyrinth: "Labyrinth",
  Tierbereich: "Tiere",
  Maschinenmuseum: "Museum",
  Restaurant: "Cafe",
  Grillkuppeln: "Grill",
 };

 return (
 <div className="rounded-lg border border-emerald-900/10 bg-[#f9f8f1] p-4 shadow-sm">
 <div className="mb-4 flex items-center justify-between gap-3">
 <div>
 <p className="text-[11px] font-black uppercase text-neutral-500">Offline Parkkarte</p>
 <h3 className="text-lg font-black text-neutral-950">Besucherfluss und Zonen</h3>
 </div>
 <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-900">
 <CircleDot className="size-3" />
 Live Demo
 </span>
 </div>
 <svg viewBox="0 0 100 100" role="img" aria-label="Schematische Parkkarte" className="h-64 w-full">
 <defs>
 <pattern id="field-lines" width="8" height="8" patternUnits="userSpaceOnUse">
 <path d="M 0 8 L 8 0" stroke="#d8d4c7" strokeWidth="0.7" />
 </pattern>
 </defs>
 <rect x="2" y="2" width="96" height="96" rx="5" fill="url(#field-lines)" stroke="#e2ded0" />
 <path d="M8 84 C22 68, 35 72, 48 50 S72 32, 90 16" fill="none" stroke="#315b47" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="4 4" />
 {parkZones.map((zone) => (
 <g key={zone.name}>
 <rect
 x={zone.x}
 y={zone.y}
 width={zone.w}
 height={zone.h}
 rx="3"
 fill={zone.tone}
 stroke="#315b47"
 strokeOpacity="0.22"
 />
 <text
 x={zone.x + zone.w / 2}
 y={zone.y + zone.h / 2}
 textAnchor="middle"
 dominantBaseline="middle"
 fill="#173426"
 fontSize="3.2"
 fontWeight="800"
 >
 {shortZoneLabel[zone.name] ?? zone.name}
 </text>
 </g>
 ))}
 <circle cx="8" cy="84" r="3.5" fill="#0f766e" />
 <circle cx="90" cy="16" r="3.5" fill="#d97706" />
 </svg>
 <div className="mt-3 grid gap-2 sm:grid-cols-2">
 {parkZones.slice(0, 4).map((zone) => (
 <div key={zone.name} className="flex items-center gap-2 text-xs font-bold text-neutral-700">
 <span className="size-2 rounded-full" style={{ background: zone.tone }} />
 {zone.name}
 </div>
 ))}
 </div>
 </div>
 );
}

export function Hero() {
 return (
 <section
 id="top"
 className="relative isolate overflow-hidden bg-[#f7f6ef] text-neutral-950"
 >
 <div
 aria-hidden="true"
 className="absolute inset-0 opacity-70"
 style={{
 background:
 "radial-gradient(circle at 18% 20%, rgba(16, 185, 129, 0.11), transparent 30%), radial-gradient(circle at 82% 18%, rgba(217, 119, 6, 0.1), transparent 28%), linear-gradient(180deg, #fbfaf5 0%, #f3f1e7 100%)",
 }}
 />
 <div
 aria-hidden="true"
 className="absolute inset-0 opacity-[0.42]"
 style={{
 backgroundImage:
 "linear-gradient(90deg, rgba(27,67,50,0.07) 1px, transparent 1px), linear-gradient(0deg, rgba(27,67,50,0.05) 1px, transparent 1px)",
 backgroundSize: "64px 64px",
 }}
 />

 <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
 <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
 <motion.div
 initial={{ opacity: 0, y: 18 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.45 }}
 className="max-w-2xl"
 >
 <Badge
 variant="outline"
 className="mb-6 border-emerald-900/15 bg-white/80 text-emerald-900 shadow-sm backdrop-blur"
 >
 Besucherwebsite, CRM und Pitch Demo
 </Badge>

 <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.01em] text-neutral-950 sm:text-5xl lg:text-6xl">
 AgroPark Nekrasovo
 </h1>

 <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg">
 Ein moderner Erlebnispark für Familien, Gruppen und Events in der
 Kaliningrader Oblast - mit Online-Buchung, mehrsprachigem AI-Chat,
 Parkinformationen und einem separaten Premium Pitch Deck.
 </p>

 <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
 {heroActions.map((action, index) => (
 <Button
 key={action.href}
 asChild
 size="lg"
 variant={index === 0 ? "default" : "outline"}
 className={
 index === 0
 ? "bg-emerald-900 text-white shadow-lg shadow-emerald-900/15 hover:bg-emerald-800"
 : "border-neutral-200 bg-white/80 text-neutral-950 hover:bg-white"
 }
 >
 <Link href={action.href}>
 <action.icon className="size-4" />
 {action.label}
 </Link>
 </Button>
 ))}
 </div>

 <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
 {[
 { label: "Erlebniszonen", value: "5", change: "Park, Tiere, Museum" },
 { label: "Buchung", value: "3", change: "Datum, Ticket, QR" },
 { label: "AI-Antworten", value: "24/7", change: "RU / DE / TR" },
 { label: "Saison", value: "Mai-Sep", change: "10:00-19:00" },
 ].map((item) => (
 <div
 key={item.label}
 className="rounded-lg border border-white bg-white/82 p-4 shadow-sm backdrop-blur"
 >
 <div className="text-2xl font-black text-neutral-950">{item.value}</div>
 <div className="mt-1 text-xs font-bold text-emerald-800">{item.change}</div>
 <div className="mt-2 text-[11px] font-semibold uppercase leading-snug text-neutral-500">
 {item.label}
 </div>
 </div>
 ))}
 </div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 18 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.45, delay: 0.08 }}
 className="min-w-0"
 >
 <div className="rounded-[1.35rem] border border-white bg-white/84 p-3 shadow-2xl shadow-emerald-950/10 backdrop-blur">
 <div className="flex flex-col gap-3 border-b border-neutral-200 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
 <div>
 <p className="text-[11px] font-black uppercase text-neutral-500">Live visitor journey</p>
 <h2 className="text-lg font-black text-neutral-950">Ein Besuch, klar geführt</h2>
 </div>
 <div className="flex flex-wrap gap-2">
 {demoAccounts.slice(0, 3).map((account) => (
 <span key={account.role} className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-bold text-neutral-700">
 {account.role}
 </span>
 ))}
 </div>
 </div>

 <div className="grid gap-3 p-3 xl:grid-cols-[0.95fr_1.05fr]">
 <div className="space-y-3">
 <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
 <div className="mb-4 flex items-center justify-between">
 <p className="text-xs font-black uppercase text-neutral-500">Live Aktivität</p>
 <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-900">
 Synchron
 </span>
 </div>
 <div className="space-y-3">
 {recentActivity.slice(0, 3).map((item) => (
 <div key={item.user + item.time} className="flex items-start gap-3 rounded-lg bg-white p-3">
 <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-xs font-black text-white">
 {item.user.split(" ").map((n) => n[0]).join("")}
 </div>
 <div className="min-w-0 flex-1">
 <p className="text-sm font-semibold text-neutral-900">
 {item.user} <span className="font-normal text-neutral-600">{item.action}</span>
 </p>
 <p className="text-xs text-neutral-500">{item.time} · {item.amount}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 <div className="grid gap-3 sm:grid-cols-2">
 {productModules.slice(0, 2).map((module) => (
 <Link
 key={module.title}
 href={module.href}
 className="group rounded-lg border border-neutral-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
 >
 <module.icon className="mb-3 size-5 text-emerald-800" />
 <div className="text-sm font-black text-neutral-950">{module.title}</div>
 <p className="mt-1 text-xs text-neutral-600">{module.metric}</p>
 <span className="mt-3 inline-flex items-center gap-1 text-xs font-black text-emerald-900">
 {module.action}
 <ArrowRight className="size-3 transition group-hover:translate-x-1" />
 </span>
 </Link>
 ))}
 </div>
 </div>

 <div className="space-y-3">
 <ParkMap />
 <div className="grid gap-3 sm:grid-cols-2">
 <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
 <ShieldCheck className="mb-3 size-5 text-emerald-900" />
 <h3 className="text-sm font-black text-emerald-950">Demo sicher begrenzt</h3>
 <p className="mt-2 text-xs leading-relaxed text-emerald-900/75">
 Keine echte Zahlung. Lokale Speicherung für Demo-Buchungen und Anfragen.
 </p>
 </div>
 <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
 <Navigation className="mb-3 size-5 text-amber-800" />
 <h3 className="text-sm font-black text-amber-950">Mobile-first Flow</h3>
 <p className="mt-2 text-xs leading-relaxed text-amber-900/75">
 Buchung, Chat, CRM und Pitch bleiben auf kleinen Screens erreichbar.
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </motion.div>
 </div>

 <div className="mt-10 grid gap-3 md:grid-cols-4">
 {productModules.map((module) => (
 <Link
 key={module.title}
 href={module.href}
 className="group rounded-lg border border-white bg-white/75 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
 >
 <div className="flex items-center justify-between gap-3">
 <module.icon className="size-5 text-emerald-800" />
 <CheckCircle2 className="size-4 text-emerald-700" />
 </div>
 <h3 className="mt-4 text-base font-black">{module.title}</h3>
 <p className="mt-2 text-sm leading-relaxed text-neutral-600">{module.text}</p>
 </Link>
 ))}
 </div>
 </div>
 </section>
 );
}
