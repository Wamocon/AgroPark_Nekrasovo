"use client";

import Link from "next/link";
import Image from "next/image";
import { Bot, CalendarCheck, CheckCircle2, Gauge, Sparkles, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguagePreference, type LanguageCode } from "@/components/i18n/use-language-preference";

const heroCopy: Record<
  LanguageCode,
  {
    alt: string;
    badge: string;
    title: string;
    lead: string;
    actions: { label: string; href: string; icon: LucideIcon }[];
    kpis: { value: string; label: string; change: string }[];
    panelTitle: string;
    panelBadge: string;
    pathLabel: string;
    pathTitle: string;
    pathItems: string[];
    pipeline: { count: string; label: string; tone: string }[];
  }
> = {
  ru: {
    alt: "Территория АгроПарка Некрасово поле",
    badge: "Сезон май-сентябрь | бронирование онлайн",
    title: "АгроПарк Некрасово поле: купола, прогулки и события на природе.",
    lead:
      "Выберите формат отдыха, проверьте цены, задайте вопрос AI-помощнику и отправьте заявку за несколько минут. Команда парка увидит бронь в CRM и быстро подтвердит детали.",
    actions: [
      { label: "Забронировать отдых", href: "/buchung", icon: CalendarCheck },
      { label: "Спросить AI", href: "/kontakt", icon: Bot },
      { label: "Вход для команды", href: "/login", icon: Gauge },
    ],
    kpis: [
      { value: "47", label: "броней сегодня", change: "+12% к прошлому дню" },
      { value: "8", label: "открытых заявок", change: "3 ждут ответа" },
      { value: "78%", label: "загрузка зон", change: "+5% в реальном времени" },
      { value: "6", label: "форматов отдыха", change: "экскурсии, купола, события" },
    ],
    panelTitle: "Некрасово поле",
    panelBadge: "online",
    pathLabel: "Путь гостя",
    pathTitle: "Один маршрут, три связанных шага",
    pathItems: ["Выбор формата и даты", "AI отвечает на вопросы", "Команда подтверждает бронь"],
    pipeline: [
      { count: "12", label: "новые", tone: "bg-amber-400" },
      { count: "8", label: "в работе", tone: "bg-sky-400" },
      { count: "47", label: "сегодня", tone: "bg-emerald-400" },
      { count: "5", label: "событий", tone: "bg-lime-400" },
    ],
  },
  en: {
    alt: "AgroPark Nekrasovo Pole territory",
    badge: "May-September season | online booking",
    title: "AgroPark Nekrasovo Pole: domes, walks and nature events.",
    lead:
      "Choose a visit format, check prices, ask the AI assistant and send a request in minutes. The park team sees the booking in CRM and confirms the details quickly.",
    actions: [
      { label: "Book a visit", href: "/buchung", icon: CalendarCheck },
      { label: "Ask AI", href: "/kontakt", icon: Bot },
      { label: "Team login", href: "/login", icon: Gauge },
    ],
    kpis: [
      { value: "47", label: "bookings today", change: "+12% vs. yesterday" },
      { value: "8", label: "open requests", change: "3 need a response" },
      { value: "78%", label: "zone occupancy", change: "+5% live" },
      { value: "6", label: "visit formats", change: "tours, domes, events" },
    ],
    panelTitle: "Nekrasovo Field",
    panelBadge: "online",
    pathLabel: "Guest path",
    pathTitle: "One route, three connected steps",
    pathItems: ["Select format and date", "AI answers questions", "Team confirms the booking"],
    pipeline: [
      { count: "12", label: "new", tone: "bg-amber-400" },
      { count: "8", label: "active", tone: "bg-sky-400" },
      { count: "47", label: "today", tone: "bg-emerald-400" },
      { count: "5", label: "events", tone: "bg-lime-400" },
    ],
  },
  de: {
    alt: "Gelände des AgroParks Nekrasovo Pole",
    badge: "Saison Mai-September | Online-Buchung",
    title: "AgroPark Nekrasovo Pole: Kuppeln, Spaziergänge und Natur-Events.",
    lead:
      "Wählen Sie das Besuchsformat, prüfen Sie Preise, fragen Sie den AI-Assistenten und senden Sie die Anfrage in wenigen Minuten. Das Team sieht die Buchung im CRM und bestätigt die Details.",
    actions: [
      { label: "Besuch buchen", href: "/buchung", icon: CalendarCheck },
      { label: "AI fragen", href: "/kontakt", icon: Bot },
      { label: "Team-Login", href: "/login", icon: Gauge },
    ],
    kpis: [
      { value: "47", label: "Buchungen heute", change: "+12% zum Vortag" },
      { value: "8", label: "offene Anfragen", change: "3 brauchen Antwort" },
      { value: "78%", label: "Auslastung", change: "+5% live" },
      { value: "6", label: "Besuchsformate", change: "Touren, Kuppeln, Events" },
    ],
    panelTitle: "Nekrasovo Feld",
    panelBadge: "online",
    pathLabel: "Gästepfad",
    pathTitle: "Ein Weg, drei verbundene Schritte",
    pathItems: ["Format und Datum wählen", "AI beantwortet Fragen", "Team bestätigt die Buchung"],
    pipeline: [
      { count: "12", label: "neu", tone: "bg-amber-400" },
      { count: "8", label: "aktiv", tone: "bg-sky-400" },
      { count: "47", label: "heute", tone: "bg-emerald-400" },
      { count: "5", label: "events", tone: "bg-lime-400" },
    ],
  },
  tr: {
    alt: "AgroPark Nekrasovo Pole alanı",
    badge: "Mayıs-Eylül sezonu | online rezervasyon",
    title: "AgroPark Nekrasovo Pole: kubbeler, yürüyüşler ve doğa etkinlikleri.",
    lead:
      "Ziyaret formatını seçin, fiyatları kontrol edin, AI asistana sorun ve birkaç dakika içinde talep gönderin. Park ekibi rezervasyonu CRM'de görür ve detayları hızlıca onaylar.",
    actions: [
      { label: "Rezervasyon yap", href: "/buchung", icon: CalendarCheck },
      { label: "AI'ya sor", href: "/kontakt", icon: Bot },
      { label: "Ekip girişi", href: "/login", icon: Gauge },
    ],
    kpis: [
      { value: "47", label: "bugünkü rezervasyon", change: "düne göre +12%" },
      { value: "8", label: "açık talep", change: "3 yanıt bekliyor" },
      { value: "78%", label: "alan doluluğu", change: "canlı +5%" },
      { value: "6", label: "ziyaret formatı", change: "turlar, kubbeler, etkinlikler" },
    ],
    panelTitle: "Nekrasovo Alanı",
    panelBadge: "online",
    pathLabel: "Misafir yolu",
    pathTitle: "Tek rota, üç bağlı adım",
    pathItems: ["Format ve tarih seçilir", "AI soruları yanıtlar", "Ekip rezervasyonu onaylar"],
    pipeline: [
      { count: "12", label: "yeni", tone: "bg-amber-400" },
      { count: "8", label: "aktif", tone: "bg-sky-400" },
      { count: "47", label: "bugün", tone: "bg-emerald-400" },
      { count: "5", label: "etkinlik", tone: "bg-lime-400" },
    ],
  },
};

export function Hero() {
  const { language } = useLanguagePreference();
  const copy = heroCopy[language];

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-emerald-950 pt-24 text-white">
      <Image src="/client-assets/agropark/aerial-view.png" alt={copy.alt} fill priority className="-z-20 object-cover opacity-42" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(10,42,29,.98),rgba(10,42,29,.84)_48%,rgba(10,42,29,.44))]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="mx-auto grid min-h-[calc(100svh-96px)] max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.98fr_0.9fr] lg:items-center lg:px-8 xl:gap-14">
        <div>
          <Badge className="mb-6 border border-amber-300/30 bg-amber-300/12 px-4 py-2 text-amber-100 hover:bg-amber-300/12">
            {copy.badge}
          </Badge>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">{copy.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{copy.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {copy.actions.map((action, index) => (
              <Button
                key={action.href}
                asChild
                size="lg"
                className={
                  index === 0
                    ? "bg-amber-300 text-emerald-950 hover:bg-amber-200"
                    : "border border-white/18 bg-white/10 text-white hover:bg-white/16"
                }
              >
                <Link href={action.href}>
                  <action.icon className="size-5" />
                  {action.label}
                </Link>
              </Button>
            ))}
          </div>
          <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-4">
            {copy.kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-white/12 bg-white/10 p-4 backdrop-blur">
                <div className="text-2xl font-black text-amber-200">{kpi.value}</div>
                <div className="mt-1 text-[11px] font-black uppercase leading-4 text-white/70">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[560px]" style={{ perspective: "1200px" }}>
          <div className="animate-float rounded-[28px] border border-white/20 bg-[#fbfaf5] p-4 text-emerald-950 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between border-b border-emerald-950/10 pb-4">
              <strong className="text-sm">{copy.panelTitle}</strong>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-900">{copy.panelBadge}</span>
            </div>
            <div className="grid gap-4 py-5 sm:grid-cols-2">
              {copy.kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-xl border border-emerald-950/10 bg-white p-5 shadow-sm">
                  <div className="text-xs font-black uppercase text-emerald-950/54">{kpi.label}</div>
                  <div className="mt-3 text-3xl font-black">{kpi.value}</div>
                  <div className="mt-2 text-xs font-bold text-emerald-700">{kpi.change}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-emerald-950/10 bg-emerald-950 p-5 text-white">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase text-amber-200">{copy.pathLabel}</p>
                  <h2 className="mt-1 text-xl font-black">{copy.pathTitle}</h2>
                </div>
                <Sparkles className="size-5 shrink-0 text-amber-200" />
              </div>
              <div className="space-y-3">
                {copy.pathItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-white/8 p-3 text-sm font-bold">
                    <CheckCircle2 className="size-4 shrink-0 text-lime-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {copy.pipeline.map((stage) => (
                <div key={stage.label} className="rounded-lg border border-emerald-950/10 bg-white p-3">
                  <span className={`mb-2 block h-1.5 w-8 rounded-full ${stage.tone}`} />
                  <div className="text-lg font-black">{stage.count}</div>
                  <div className="text-[10px] font-bold uppercase text-emerald-950/52">{stage.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
