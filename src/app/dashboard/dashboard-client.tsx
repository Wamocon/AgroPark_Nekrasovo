"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BarChart3, Bot, CalendarCheck, CheckCircle2, ClipboardList, Copy, Home, Leaf, LogOut, MapPinned, MessageSquareText, RefreshCcw, Sparkles, UserRound } from "lucide-react";
import { ChatWidget } from "@/components/chat/chat-widget";
import { OpenChatButton } from "@/components/chat/open-chat-button";
import { appCopy } from "@/components/i18n/app-copy";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useLanguagePreference, type LanguageCode } from "@/components/i18n/use-language-preference";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { aiAutomations, parkOffers, parkPipeline } from "@/data/agropark";
import type { DemoUser, UserRole } from "@/lib/auth";
import { logout } from "@/lib/auth-actions";

const chartValues = [
  { bookings: 28, revenue: 42 },
  { bookings: 34, revenue: 56 },
  { bookings: 31, revenue: 52 },
  { bookings: 41, revenue: 72 },
  { bookings: 52, revenue: 96 },
  { bookings: 47, revenue: 88 },
];

const kpiIcons = [CalendarCheck, MessageSquareText, BarChart3, Leaf] as const;
const quickActionIcons = [CalendarCheck, Bot, MapPinned, Home] as const;
const roleIcons = {
  admin: BarChart3,
  manager: CalendarCheck,
  staff: ClipboardList,
  visitor: UserRound,
} satisfies Record<UserRole, typeof BarChart3>;

const roleModeCopy: Record<
  LanguageCode,
  Record<
    UserRole,
    {
      eyebrow: string;
      title: string;
      lead: string;
      metrics: { label: string; value: string }[];
      focus: string[];
      next: string;
    }
  >
> = {
  ru: {
    admin: {
      eyebrow: "Режим директора",
      title: "Контроль сезона и инвестиционных решений",
      lead: "Этот вход показывает, как руководитель видит KPI, загрузку зон, AI-качество, спрос и точки роста без ручного сбора отчетов.",
      metrics: [
        { label: "прогноз спроса", value: "+18%" },
        { label: "риск ответа", value: "3" },
        { label: "ROI сигнал", value: "12-24%" },
      ],
      focus: ["Финансовые сигналы", "Сезонная загрузка", "AI-контроль качества", "Roadmap решений"],
      next: "Решение: какие зоны и форматы усиливать перед пиковым спросом.",
    },
    manager: {
      eyebrow: "Режим менеджера",
      title: "Бронирования, календарь и подтверждения",
      lead: "Менеджер видит рабочую очередь, мероприятия, загрузку форматов и ответы гостям, чтобы быстрее закрывать заявки.",
      metrics: [
        { label: "в очереди", value: "8" },
        { label: "события", value: "5" },
        { label: "сегодня", value: "47" },
      ],
      focus: ["Календарь", "Подтверждения", "Гостевые ответы", "Доступность зон"],
      next: "Действие: подтвердить заявки с датой, форматом и контактами.",
    },
    staff: {
      eyebrow: "Режим администратора",
      title: "Ежедневный inbox и быстрый follow-up",
      lead: "Администратор получает поток заявок, карточки гостей и готовые тексты для WhatsApp, Telegram или e-mail.",
      metrics: [
        { label: "новые", value: "12" },
        { label: "нужен ответ", value: "3" },
        { label: "черновики AI", value: "6" },
      ],
      focus: ["Новые заявки", "Готовые ответы", "Статусы", "Повторный контакт"],
      next: "Действие: обработать входящие обращения и передать сложные случаи менеджеру.",
    },
    visitor: {
      eyebrow: "Режим гостя",
      title: "Прозрачный путь гостя без внутренних данных",
      lead: "Гость видит только свою бронь, маршрут, цены, статус обращения и AI-поддержку, без управленческой информации.",
      metrics: [
        { label: "шаги", value: "3" },
        { label: "языки", value: "4" },
        { label: "статус", value: "QR" },
      ],
      focus: ["Моя бронь", "Маршрут", "AI-вопросы", "Статус заявки"],
      next: "Действие: проверить подтверждение и задать вопрос без звонка.",
    },
  },
  en: {
    admin: {
      eyebrow: "Director mode",
      title: "Season control and investment decisions",
      lead: "This login shows how leadership sees KPIs, zone load, AI quality, demand and growth points without manual reporting.",
      metrics: [
        { label: "demand forecast", value: "+18%" },
        { label: "reply risk", value: "3" },
        { label: "ROI signal", value: "12-24%" },
      ],
      focus: ["Financial signals", "Season occupancy", "AI quality control", "Decision roadmap"],
      next: "Decision: which zones and formats to strengthen before peak demand.",
    },
    manager: {
      eyebrow: "Manager mode",
      title: "Bookings, calendar and confirmations",
      lead: "The manager sees the work queue, events, format capacity and guest replies to close requests faster.",
      metrics: [
        { label: "queue", value: "8" },
        { label: "events", value: "5" },
        { label: "today", value: "47" },
      ],
      focus: ["Calendar", "Confirmations", "Guest replies", "Zone availability"],
      next: "Action: confirm requests with date, format and contacts.",
    },
    staff: {
      eyebrow: "Administrator mode",
      title: "Daily inbox and fast follow-up",
      lead: "The administrator receives request flow, guest cards and prepared texts for WhatsApp, Telegram or e-mail.",
      metrics: [
        { label: "new", value: "12" },
        { label: "need reply", value: "3" },
        { label: "AI drafts", value: "6" },
      ],
      focus: ["New requests", "Prepared replies", "Statuses", "Follow-up"],
      next: "Action: process incoming requests and pass complex cases to the manager.",
    },
    visitor: {
      eyebrow: "Guest mode",
      title: "Transparent guest path without internal data",
      lead: "The guest sees only their booking, route, prices, request status and AI support, without management information.",
      metrics: [
        { label: "steps", value: "3" },
        { label: "languages", value: "4" },
        { label: "status", value: "QR" },
      ],
      focus: ["My booking", "Route", "AI questions", "Request status"],
      next: "Action: check confirmation and ask a question without calling.",
    },
  },
  de: {
    admin: {
      eyebrow: "Direktor-Modus",
      title: "Saisonsteuerung und Investitionsentscheidungen",
      lead: "Dieser Zugang zeigt KPI, Zonenauslastung, AI-Qualität, Nachfrage und Wachstumspunkte ohne manuelle Berichte.",
      metrics: [
        { label: "Nachfrage", value: "+18%" },
        { label: "Antwort-Risiko", value: "3" },
        { label: "ROI-Signal", value: "12-24%" },
      ],
      focus: ["Finanzsignale", "Saisonauslastung", "AI-Qualität", "Entscheidungsroadmap"],
      next: "Entscheidung: welche Zonen und Formate vor der Spitze verstärkt werden.",
    },
    manager: {
      eyebrow: "Manager-Modus",
      title: "Buchungen, Kalender und Bestätigungen",
      lead: "Der Manager sieht Warteschlange, Events, Kapazität und Gästeantworten, um Anfragen schneller zu schließen.",
      metrics: [
        { label: "Queue", value: "8" },
        { label: "Events", value: "5" },
        { label: "heute", value: "47" },
      ],
      focus: ["Kalender", "Bestätigungen", "Gästeantworten", "Zonenverfügbarkeit"],
      next: "Aktion: Anfragen mit Datum, Format und Kontakten bestätigen.",
    },
    staff: {
      eyebrow: "Administrator-Modus",
      title: "Täglicher Inbox und schneller Follow-up",
      lead: "Der Administrator erhält Anfragefluss, Gästekarten und vorbereitete Texte für WhatsApp, Telegram oder E-Mail.",
      metrics: [
        { label: "neu", value: "12" },
        { label: "Antwort nötig", value: "3" },
        { label: "AI-Entwürfe", value: "6" },
      ],
      focus: ["Neue Anfragen", "Textvorschläge", "Status", "Follow-up"],
      next: "Aktion: Eingänge bearbeiten und komplexe Fälle an den Manager geben.",
    },
    visitor: {
      eyebrow: "Gast-Modus",
      title: "Transparenter Gästepfad ohne interne Daten",
      lead: "Der Gast sieht nur Buchung, Route, Preise, Anfrage-Status und AI-Hilfe, keine Managementinformationen.",
      metrics: [
        { label: "Schritte", value: "3" },
        { label: "Sprachen", value: "4" },
        { label: "Status", value: "QR" },
      ],
      focus: ["Meine Buchung", "Route", "AI-Fragen", "Anfrage-Status"],
      next: "Aktion: Bestätigung prüfen und ohne Anruf eine Frage stellen.",
    },
  },
  tr: {
    admin: {
      eyebrow: "Direktör modu",
      title: "Sezon kontrolü ve yatırım kararları",
      lead: "Bu giriş KPI, alan yükü, AI kalitesi, talep ve büyüme noktalarını manuel rapor olmadan gösterir.",
      metrics: [
        { label: "talep tahmini", value: "+18%" },
        { label: "yanıt riski", value: "3" },
        { label: "ROI sinyali", value: "12-24%" },
      ],
      focus: ["Finans sinyalleri", "Sezon doluluğu", "AI kalite kontrolü", "Karar roadmap"],
      next: "Karar: yoğun dönemden önce hangi alan ve formatlar güçlendirilecek.",
    },
    manager: {
      eyebrow: "Yönetici modu",
      title: "Rezervasyonlar, takvim ve onaylar",
      lead: "Yönetici iş kuyruğunu, etkinlikleri, kapasiteyi ve misafir yanıtlarını görür.",
      metrics: [
        { label: "kuyruk", value: "8" },
        { label: "etkinlik", value: "5" },
        { label: "bugün", value: "47" },
      ],
      focus: ["Takvim", "Onaylar", "Misafir yanıtları", "Alan uygunluğu"],
      next: "Aksiyon: tarih, format ve iletişim bilgisi olan talepleri onayla.",
    },
    staff: {
      eyebrow: "Administratör modu",
      title: "Günlük inbox ve hızlı follow-up",
      lead: "Administratör talep akışını, misafir kartlarını ve WhatsApp, Telegram veya e-mail metinlerini alır.",
      metrics: [
        { label: "yeni", value: "12" },
        { label: "yanıt lazım", value: "3" },
        { label: "AI taslak", value: "6" },
      ],
      focus: ["Yeni talepler", "Hazır yanıtlar", "Durumlar", "Follow-up"],
      next: "Aksiyon: gelen talepleri işle ve karmaşık konuları yöneticiye aktar.",
    },
    visitor: {
      eyebrow: "Misafir modu",
      title: "İç veri olmadan şeffaf misafir yolu",
      lead: "Misafir sadece rezervasyon, rota, fiyatlar, talep durumu ve AI desteğini görür.",
      metrics: [
        { label: "adım", value: "3" },
        { label: "dil", value: "4" },
        { label: "durum", value: "QR" },
      ],
      focus: ["Rezervasyonum", "Rota", "AI soruları", "Talep durumu"],
      next: "Aksiyon: onayı kontrol et ve arama yapmadan soru sor.",
    },
  },
};

type DemoBooking = {
  id?: string;
  date?: string;
  name?: string;
  email?: string;
  total?: number;
  createdAt?: string;
};

type DemoInquiry = {
  name?: string;
  company?: string;
  email?: string;
  message?: string;
  createdAt?: string;
};

type DemoWaitlist = {
  email?: string;
  page?: string;
  createdAt?: string;
};

type DemoData = {
  bookings: DemoBooking[];
  inquiries: DemoInquiry[];
  waitlist: DemoWaitlist[];
};

type DemoEvent = {
  type: "booking" | "inquiry" | "waitlist";
  title: string;
  detail: string;
  meta: string;
  createdAt: string;
};

const emptyDemoData: DemoData = { bookings: [], inquiries: [], waitlist: [] };

function readDemoList<T>(key: string): T[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readDemoData(): DemoData {
  if (typeof window === "undefined") return emptyDemoData;
  return {
    bookings: readDemoList<DemoBooking>("agropark_bookings"),
    inquiries: readDemoList<DemoInquiry>("agropark_inquiries"),
    waitlist: readDemoList<DemoWaitlist>("agropark_waitlist"),
  };
}

function formatRubles(value?: number) {
  if (!value) return "";
  return `${new Intl.NumberFormat("ru-RU").format(value)} \u20BD`;
}

export function DashboardClient({ user }: { user: DemoUser }) {
  const { language } = useLanguagePreference();
  const copy = appCopy[language].dashboard;
  const roleLabel = copy.roleLabels[user.role];
  const roleMode = roleModeCopy[language][user.role];
  const RoleIcon = roleIcons[user.role];
  const [demoData, setDemoData] = useState<DemoData>(emptyDemoData);
  const [summaryCopied, setSummaryCopied] = useState(false);

  function refreshDemoData() {
    setDemoData(readDemoData());
    setSummaryCopied(false);
  }

  useEffect(() => {
    const timer = window.setTimeout(refreshDemoData, 0);
    window.addEventListener("focus", refreshDemoData);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("focus", refreshDemoData);
    };
  }, []);

  const demoEvents = useMemo<DemoEvent[]>(() => {
    const inbox = copy.demoInbox;
    const bookings = demoData.bookings.map((booking) => ({
      type: "booking" as const,
      title: booking.name || booking.email || booking.id || inbox.unknownGuest,
      detail: [booking.date, formatRubles(booking.total)].filter(Boolean).join(" · ") || booking.email || inbox.bookingType,
      meta: booking.id || inbox.bookingType,
      createdAt: booking.createdAt || "",
    }));
    const inquiries = demoData.inquiries.map((inquiry) => ({
      type: "inquiry" as const,
      title: inquiry.name || inquiry.company || inquiry.email || inbox.unknownGuest,
      detail: inquiry.message || inbox.noMessage,
      meta: inquiry.company || inquiry.email || inbox.inquiryType,
      createdAt: inquiry.createdAt || "",
    }));
    const waitlist = demoData.waitlist.map((entry) => ({
      type: "waitlist" as const,
      title: entry.email || inbox.unknownGuest,
      detail: entry.page || inbox.waitlistType,
      meta: inbox.waitlistType,
      createdAt: entry.createdAt || "",
    }));

    return [...bookings, ...inquiries, ...waitlist]
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, 6);
  }, [copy.demoInbox, demoData]);

  async function copyDemoSummary() {
    const inbox = copy.demoInbox;
    const summary = demoEvents.length
      ? demoEvents.map((event) => `${event.meta}: ${event.title} - ${event.detail}`).join("\n")
      : inbox.empty;
    try {
      await navigator.clipboard.writeText(summary);
      setSummaryCopied(true);
    } catch {
      setSummaryCopied(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f3ea]">
      <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-3 sm:flex sm:min-h-16 sm:items-center sm:justify-between sm:px-6 sm:py-0 lg:px-8">
          <div className="flex min-w-0 items-center gap-3 text-emerald-950">
            <BrandLogo className="min-w-0 [&>span:last-child]:min-w-0 [&>span:last-child_span:first-child]:truncate" />
            <span className="hidden rounded-full border border-emerald-900/10 bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-800 sm:inline-flex">
              {copy.beta}
            </span>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:justify-end sm:gap-4">
            <LanguageSwitcher compact />
            <div className="hidden text-sm sm:block">
              <span className="text-muted-foreground">{copy.user} </span>
              <span className="font-semibold">{roleLabel}</span>
            </div>
            <Badge variant="success" className="hidden sm:inline-flex" data-testid="user-role-badge">
              {roleLabel}
            </Badge>
            <form action={logout}>
              <Button type="submit" variant="ghost" size="sm" className="min-w-10 px-2 sm:px-3" aria-label={copy.logout}>
                <LogOut className="size-4 sm:mr-2" />
                <span className="hidden sm:inline">{copy.logout}</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <Badge className="mb-3 bg-emerald-100 text-emerald-950 hover:bg-emerald-100">{copy.badge}</Badge>
            <h1 className="text-3xl font-black text-foreground sm:text-4xl">{copy.title}</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {copy.lead} <strong>{roleLabel}</strong>.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {copy.filters.map((item) => (
              <select key={item} className="min-h-10 rounded-lg border border-emerald-950/10 bg-white px-3 text-sm font-bold text-emerald-950/76">
                <option>{item}</option>
                {copy.filterOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ))}
          </div>
        </div>

        <section className="mb-8 overflow-hidden rounded-[28px] border border-emerald-950/10 bg-emerald-950 text-white shadow-2xl shadow-emerald-950/12">
          <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-7">
            <div className="min-w-0">
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-white/12">
                <RoleIcon className="size-6 text-amber-200" />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">{roleMode.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{roleMode.title}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">{roleMode.lead}</p>
              <div className="mt-5 rounded-xl border border-white/10 bg-white/8 p-4 text-sm font-bold leading-6 text-white/86">
                {roleMode.next}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {roleMode.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-white/10 bg-white/8 p-4">
                    <div className="text-2xl font-black text-amber-200">{metric.value}</div>
                    <div className="mt-1 text-[11px] font-black uppercase leading-4 text-white/62">{metric.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {roleMode.focus.map((item) => (
                  <div key={item} className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/8 p-3 text-sm font-bold">
                    <CheckCircle2 className="size-4 shrink-0 text-lime-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.kpis.map((kpi, index) => {
            const Icon = kpiIcons[index];

            return (
              <Card key={kpi.label} className="border-white bg-white/94 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                  <Icon className="size-4 text-amber-700" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-black text-emerald-950">{kpi.value}</div>
                  <p className="text-xs font-bold text-emerald-700">{kpi.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card className="bg-white/94">
              <CardHeader>
                <CardTitle>{copy.chartTitle}</CardTitle>
                <CardDescription>{copy.chartDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-end justify-between gap-2">
                  {chartValues.map((value, index) => (
                    <div key={copy.chartDays[index]} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex w-full items-end gap-1">
                        <div className="w-1/2 rounded-t bg-emerald-800/90" style={{ height: `${(value.bookings / 60) * 160}px` }} />
                        <div className="w-1/2 rounded-t bg-amber-500/90" style={{ height: `${(value.revenue / 100) * 160}px` }} />
                      </div>
                      <span className="text-xs font-medium text-emerald-950/64">{copy.chartDays[index]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/94">
              <CardHeader>
                <CardTitle>{copy.pipelineTitle}</CardTitle>
                <CardDescription>{copy.pipelineDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {appCopy[language].home.platform.pipeline.map((stage, index) => (
                    <div key={stage.stage} className="rounded-lg border border-emerald-950/10 bg-[#fcfbf6] p-4">
                      <span className={`mb-4 block h-1.5 w-10 rounded-full ${parkPipeline[index].tone}`} />
                      <h3 className="text-sm font-black">{stage.stage}</h3>
                      <p className="mt-2 text-2xl font-black">{parkPipeline[index].count}</p>
                      <p className="text-xs font-bold text-emerald-950/60">{stage.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/94">
              <CardHeader className="gap-4 sm:flex sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="size-5 text-amber-700" />
                    {copy.demoInbox.title}
                  </CardTitle>
                  <CardDescription className="mt-2">{copy.demoInbox.description}</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={refreshDemoData} className="bg-white">
                    <RefreshCcw className="mr-2 size-4" />
                    {copy.demoInbox.refresh}
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={copyDemoSummary} className="bg-white">
                    <Copy className="mr-2 size-4" />
                    {summaryCopied ? copy.demoInbox.copied : copy.demoInbox.copy}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: copy.demoInbox.bookings, value: demoData.bookings.length, tone: "bg-emerald-50 text-emerald-800" },
                    { label: copy.demoInbox.inquiries, value: demoData.inquiries.length, tone: "bg-amber-50 text-amber-800" },
                    { label: copy.demoInbox.waitlist, value: demoData.waitlist.length, tone: "bg-sky-50 text-sky-800" },
                  ].map((metric) => (
                    <div key={metric.label} className={`rounded-lg border border-emerald-950/10 p-4 ${metric.tone}`}>
                      <p className="text-xs font-black uppercase tracking-[0.12em]">{metric.label}</p>
                      <p className="mt-2 text-3xl font-black">{metric.value}</p>
                    </div>
                  ))}
                </div>
                {demoEvents.length ? (
                  <div>
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-emerald-950/58">{copy.demoInbox.latest}</p>
                    <div className="space-y-3">
                      {demoEvents.map((event, index) => (
                        <article key={`${event.type}-${event.createdAt}-${index}`} className="rounded-lg border border-emerald-950/10 bg-[#fcfbf6] p-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="rounded-full bg-emerald-900 px-2.5 py-1 text-xs font-black text-white">
                              {event.type === "booking" ? copy.demoInbox.bookingType : event.type === "inquiry" ? copy.demoInbox.inquiryType : copy.demoInbox.waitlistType}
                            </span>
                            <span className="text-xs font-bold text-emerald-950/54">{event.meta}</span>
                          </div>
                          <h3 className="mt-3 font-black text-emerald-950">{event.title}</h3>
                          <p className="mt-1 line-clamp-2 text-sm leading-6 text-emerald-950/64">{event.detail}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-emerald-950/16 bg-[#fcfbf6] p-5 text-sm leading-6 text-emerald-950/64">{copy.demoInbox.empty}</div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/94">
              <CardHeader>
                <CardTitle>{copy.formatsTitle}</CardTitle>
                <CardDescription>{copy.formatsDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-3">
                  {appCopy[language].home.platform.offers.map((offer, index) => (
                    <article key={offer.title} className="rounded-lg border border-emerald-950/10 bg-white p-4">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-black">{offer.title}</h3>
                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">{parkOffers[index].score}</span>
                      </div>
                      <p className="mt-2 text-sm text-emerald-950/62">{offer.type}</p>
                      <p className="mt-1 text-sm font-bold text-emerald-950">{offer.budget}</p>
                    </article>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="bg-emerald-950 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="size-5 text-amber-200" />
                  {copy.automationTitle}
                </CardTitle>
                <CardDescription className="text-white/70">{copy.automationDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appCopy[language].contact.automations.map((item, index) => {
                    const Icon = aiAutomations[index].icon;

                    return (
                      <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.06] p-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <Icon className="size-4 text-amber-200" />
                            <span className="text-sm font-black">{item.title}</span>
                          </div>
                          <CheckCircle2 className="size-4 text-lime-300" />
                        </div>
                        <p className="mt-2 text-xs leading-5 text-white/70">{item.detail}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/94">
              <CardHeader>
                <CardTitle>{copy.activityTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {copy.activity.map((item) => (
                    <li key={item.user + item.action} className="flex items-start gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-700 to-amber-500 text-xs font-bold text-white">
                        {item.user.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <strong>{item.user}</strong> {item.action}
                        </p>
                        <p className="text-xs text-emerald-950/54">
                          {item.time} · {item.amount}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/94">
              <CardHeader>
                <CardTitle>{copy.quickTitle}</CardTitle>
                <CardDescription>{copy.quickDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {copy.quickActions.map((action, index) => {
                    const Icon = quickActionIcons[index];

                    return (
                      <Button key={action.href} asChild variant="outline" className="h-auto flex-col gap-2 bg-white py-4">
                        <Link href={action.href}>
                          <Icon className="size-5" />
                          <span className="text-xs">{action.label}</span>
                        </Link>
                      </Button>
                    );
                  })}
                  <OpenChatButton className="col-span-2 bg-white" label={copy.quickChat} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}
