import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  FileText,
  MessageSquareText,
  Route,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OpenChatButton } from "@/components/chat/open-chat-button";
import { cn } from "@/lib/utils";

interface PlatformModule {
  title: string;
  status: string;
  metric: string;
  text: string;
  href: string;
  action: string;
  icon: LucideIcon;
  tone: string;
}

const modules: PlatformModule[] = [
  {
    title: "Buchung",
    status: "Nutzbar",
    metric: "3 Schritte",
    text: "Datum, Ticketmix und Reservierung inklusive QR-Referenz.",
    href: "/buchung",
    action: "Testen",
    icon: CalendarCheck,
    tone: "border-green-200 bg-green-50 text-green-950",
  },
  {
    title: "KI-Chat",
    status: "Fallback",
    metric: "24/7",
    text: "Fragen zu Preisen, Öffnungszeiten und Parkabläufen.",
    href: "/kontakt",
    action: "Öffnen",
    icon: MessageSquareText,
    tone: "border-sky-200 bg-sky-50 text-sky-950",
  },
  {
    title: "Dashboard",
    status: "Rollen",
    metric: "4 Profile",
    text: "Admin, Manager, Mitarbeiter und Besucher als Demo-Login.",
    href: "/login",
    action: "Einloggen",
    icon: BarChart3,
    tone: "border-amber-200 bg-amber-50 text-amber-950",
  },
  {
    title: "Roadmap",
    status: "Phase 1",
    metric: "90 Tage",
    text: "Umsetzungspfade, Investition und ROI nachvollziehbar.",
    href: "#roadmap",
    action: "Ansehen",
    icon: Route,
    tone: "border-neutral-200 bg-white text-neutral-950",
  },
];

export function PlatformSnapshot() {
  return (
    <section
      id="platform-snapshot"
      className="border-b border-neutral-200 bg-[#f3f1e8] py-16 text-neutral-950 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <Badge className="mb-5 border-green-900/15 bg-white text-green-950 hover:bg-white">
              Verbundene Demo
            </Badge>
            <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Ein Pitch, der sofort in echte Produktwege führt.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg">
              Die Startseite verkauft nicht nur die Idee. Sie verbindet das Pitch Deck
              mit klickbaren Demo-Flows, damit Stakeholder den Wert selbst prüfen können.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-green-900 text-white hover:bg-green-800">
                <Link href="/proposal.html">
                  Pitch Deck öffnen <FileText className="ml-2 size-4" />
                </Link>
              </Button>
              <OpenChatButton
                compact
                label="Chat testen"
                className="border-green-900/20 bg-white text-green-950 hover:bg-green-50"
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {modules.map((module, index) => (
              <Link
                key={module.title}
                href={module.href}
                className={cn(
                  "group relative min-h-[190px] rounded-lg border p-5 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-xl",
                  module.tone
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-white shadow-sm">
                    <module.icon className="size-5" />
                  </div>
                  <span className="rounded-md bg-black/5 px-2.5 py-1 text-xs font-black uppercase">
                    {module.status}
                  </span>
                </div>
                <div className="mt-5 text-sm font-black uppercase opacity-65">
                  {String(index + 1).padStart(2, "0")} · {module.metric}
                </div>
                <h3 className="mt-1 text-2xl font-black">{module.title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-75">{module.text}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-black">
                  {module.action}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
