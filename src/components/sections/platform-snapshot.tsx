import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OpenChatButton } from "@/components/chat/open-chat-button";
import { productModules } from "@/data/agropark";

const workflows = [
 "Visitor selects date and ticket mix",
 "Reservation is stored locally for demo review",
 "CRM dashboard shows KPIs, role context and activity",
 "Pitch deck explains business case, KPIs and rollout",
];

export function PlatformSnapshot() {
 return (
 <section
 id="platform-snapshot"
 className="border-b border-neutral-200 bg-white py-16 text-neutral-950 sm:py-20"
 >
 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
 <div className="lg:sticky lg:top-24">
 <Badge className="mb-5 border-emerald-900/15 bg-emerald-50 text-emerald-950 hover:bg-emerald-50">
 Working demo application
 </Badge>
 <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
 Ein System, vier echte Wege.
 </h2>
 <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg">
 Die Seite ist jetzt als nutzbare Demo strukturiert: Buchung, CRM,
 Chat und Pitch sind direkt verbunden. Das macht die Anwendung für
 Stakeholder prüfbar statt nur präsentierbar.
 </p>
 <div className="mt-7 flex flex-col gap-3 sm:flex-row">
 <Button asChild size="lg" className="bg-emerald-900 text-white hover:bg-emerald-800">
 <Link href="/proposal.html">
 Pitch Deck öffnen <FileText className="ml-2 size-4" />
 </Link>
 </Button>
 <OpenChatButton
 compact
 label="Chat testen"
 className="border-emerald-900/20 bg-white text-emerald-950 hover:bg-emerald-50"
 />
 </div>
 </div>

 <div className="grid gap-4">
 <div className="grid gap-3 md:grid-cols-2">
 {productModules.map((module, index) => (
 <Link
 key={module.title}
 href={module.href}
 className="group rounded-lg border border-neutral-200 bg-[#faf9f3] p-5 transition hover:-translate-y-0.5 hover:border-emerald-900/20 hover:bg-white hover:shadow-xl"
 >
 <div className="flex items-start justify-between gap-4">
 <div className="flex size-11 items-center justify-center rounded-lg bg-white shadow-sm">
 <module.icon className="size-5 text-emerald-900" />
 </div>
 <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-black uppercase text-emerald-900">
 {String(index + 1).padStart(2, "0")}
 </span>
 </div>
 <div className="mt-5 text-sm font-black uppercase text-emerald-800">
 {module.metric}
 </div>
 <h3 className="mt-1 text-2xl font-black">{module.title}</h3>
 <p className="mt-3 text-sm leading-relaxed text-neutral-700">{module.text}</p>
 <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-emerald-900">
 {module.action}
 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
 </div>
 </Link>
 ))}
 </div>

 <div className="rounded-lg border border-neutral-200 bg-neutral-950 p-5 text-white">
 <div className="mb-4 flex items-center justify-between gap-3">
 <div>
 <p className="text-[11px] font-black uppercase text-white/50">Connected flow</p>
 <h3 className="text-xl font-black">Vom Besucher zum Betriebsdashboard</h3>
 </div>
 <CheckCircle2 className="size-5 text-emerald-300" />
 </div>
 <div className="grid gap-3 md:grid-cols-4">
 {workflows.map((item, index) => (
 <div key={item} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
 <div className="mb-3 text-xs font-black text-emerald-300">
 {String(index + 1).padStart(2, "0")}
 </div>
 <p className="text-sm leading-relaxed text-white/78">{item}</p>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
