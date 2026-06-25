"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  Eye,
  Lock,
  Mail,
  MapPinned,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { appCopy } from "@/components/i18n/app-copy";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useLanguagePreference, type LanguageCode } from "@/components/i18n/use-language-preference";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { demoAccounts } from "@/data/agropark";
import type { UserRole } from "@/lib/auth";
import { cn } from "@/lib/utils";

const accountMeta: {
  role: UserRole;
  email: string;
  icon: LucideIcon;
  tone: string;
}[] = [
  { role: "admin", email: "admin@agropark.demo", icon: BarChart3, tone: "from-emerald-950 to-emerald-700" },
  { role: "manager", email: "manager@agropark.demo", icon: CalendarDays, tone: "from-amber-700 to-orange-500" },
  { role: "staff", email: "staff@agropark.demo", icon: ClipboardList, tone: "from-sky-800 to-emerald-700" },
  { role: "visitor", email: "visitor@agropark.demo", icon: UserRound, tone: "from-lime-700 to-emerald-700" },
];

const roleProfiles: Record<
  LanguageCode,
  Record<
    UserRole,
    {
      title: string;
      promise: string;
      cockpit: string;
      metrics: { label: string; value: string }[];
      modules: string[];
    }
  >
> = {
  ru: {
    admin: {
      title: "Режим директора",
      promise: "Контроль сезона, KPI, воронка заявок, AI-качество и roadmap видны в одном рабочем представлении.",
      cockpit: "Executive Control",
      metrics: [
        { label: "выручка сигналы", value: "12-24%" },
        { label: "загрузка зон", value: "78%" },
      ],
      modules: ["KPI board", "AI oversight", "Season forecast"],
    },
    manager: {
      title: "Режим менеджера",
      promise: "Фокус на календаре, форматах отдыха, подтверждении брони и быстрых ответах гостям.",
      cockpit: "Reservation Desk",
      metrics: [
        { label: "в работе", value: "8" },
        { label: "события", value: "5" },
      ],
      modules: ["Calendar", "Guest replies", "Format capacity"],
    },
    staff: {
      title: "Режим администратора",
      promise: "Операционная лента, новые заявки, готовые AI-тексты и follow-up для WhatsApp, Telegram и e-mail.",
      cockpit: "Daily Operations",
      metrics: [
        { label: "новые заявки", value: "12" },
        { label: "нужен ответ", value: "3" },
      ],
      modules: ["Inbox", "Prepared replies", "Request status"],
    },
    visitor: {
      title: "Режим гостя",
      promise: "Проверка клиентского пути: бронь, QR, статус обращения, маршрут и ответы AI без внутренней информации.",
      cockpit: "Guest Portal",
      metrics: [
        { label: "шагов до брони", value: "3" },
        { label: "языка AI", value: "4" },
      ],
      modules: ["My booking", "Route", "AI questions"],
    },
  },
  en: {
    admin: {
      title: "Director mode",
      promise: "Season control, KPIs, request funnel, AI quality and roadmap are visible in one executive view.",
      cockpit: "Executive Control",
      metrics: [
        { label: "revenue signal", value: "12-24%" },
        { label: "zone occupancy", value: "78%" },
      ],
      modules: ["KPI board", "AI oversight", "Season forecast"],
    },
    manager: {
      title: "Manager mode",
      promise: "Focused on calendar work, visit formats, booking confirmation and fast guest responses.",
      cockpit: "Reservation Desk",
      metrics: [
        { label: "active", value: "8" },
        { label: "events", value: "5" },
      ],
      modules: ["Calendar", "Guest replies", "Format capacity"],
    },
    staff: {
      title: "Administrator mode",
      promise: "Daily activity feed, new requests, AI-prepared replies and follow-up for WhatsApp, Telegram and e-mail.",
      cockpit: "Daily Operations",
      metrics: [
        { label: "new requests", value: "12" },
        { label: "need reply", value: "3" },
      ],
      modules: ["Inbox", "Prepared replies", "Request status"],
    },
    visitor: {
      title: "Guest mode",
      promise: "Checks the customer path: booking, QR, request status, route and AI answers without internal data.",
      cockpit: "Guest Portal",
      metrics: [
        { label: "steps to book", value: "3" },
        { label: "AI languages", value: "4" },
      ],
      modules: ["My booking", "Route", "AI questions"],
    },
  },
  de: {
    admin: {
      title: "Direktor-Modus",
      promise: "Saisonsteuerung, KPI, Anfrage-Funnel, AI-Qualität und Roadmap sind in einer Führungsansicht sichtbar.",
      cockpit: "Executive Control",
      metrics: [
        { label: "Umsatzsignal", value: "12-24%" },
        { label: "Auslastung", value: "78%" },
      ],
      modules: ["KPI-Board", "AI-Kontrolle", "Saisonprognose"],
    },
    manager: {
      title: "Manager-Modus",
      promise: "Fokus auf Kalender, Besuchsformate, Buchungsbestätigung und schnelle Antworten an Gäste.",
      cockpit: "Reservation Desk",
      metrics: [
        { label: "aktiv", value: "8" },
        { label: "Events", value: "5" },
      ],
      modules: ["Kalender", "Gästeantworten", "Kapazität"],
    },
    staff: {
      title: "Administrator-Modus",
      promise: "Tagesbetrieb mit neuen Anfragen, AI-Textvorschlägen und Follow-up für WhatsApp, Telegram und E-Mail.",
      cockpit: "Daily Operations",
      metrics: [
        { label: "neue Anfragen", value: "12" },
        { label: "Antwort nötig", value: "3" },
      ],
      modules: ["Inbox", "Textvorschläge", "Status"],
    },
    visitor: {
      title: "Gast-Modus",
      promise: "Prüft den Kundenweg: Buchung, QR, Anfrage-Status, Route und AI-Antworten ohne interne Daten.",
      cockpit: "Guest Portal",
      metrics: [
        { label: "Schritte", value: "3" },
        { label: "AI-Sprachen", value: "4" },
      ],
      modules: ["Meine Buchung", "Route", "AI-Fragen"],
    },
  },
  tr: {
    admin: {
      title: "Direktör modu",
      promise: "Sezon kontrolü, KPI, talep hunisi, AI kalitesi ve roadmap tek yönetici görünümünde.",
      cockpit: "Executive Control",
      metrics: [
        { label: "gelir sinyali", value: "12-24%" },
        { label: "alan doluluğu", value: "78%" },
      ],
      modules: ["KPI paneli", "AI kontrolü", "Sezon tahmini"],
    },
    manager: {
      title: "Yönetici modu",
      promise: "Takvim, ziyaret formatları, rezervasyon onayı ve hızlı misafir yanıtlarına odaklanır.",
      cockpit: "Reservation Desk",
      metrics: [
        { label: "aktif", value: "8" },
        { label: "etkinlik", value: "5" },
      ],
      modules: ["Takvim", "Misafir yanıtları", "Kapasite"],
    },
    staff: {
      title: "Administratör modu",
      promise: "Günlük akış, yeni talepler, AI metin önerileri ve WhatsApp, Telegram, e-mail follow-up.",
      cockpit: "Daily Operations",
      metrics: [
        { label: "yeni talep", value: "12" },
        { label: "yanıt lazım", value: "3" },
      ],
      modules: ["Inbox", "Hazır yanıtlar", "Talep durumu"],
    },
    visitor: {
      title: "Misafir modu",
      promise: "Müşteri yolunu gösterir: rezervasyon, QR, talep durumu, rota ve iç veri olmadan AI yanıtları.",
      cockpit: "Guest Portal",
      metrics: [
        { label: "rezervasyon adımı", value: "3" },
        { label: "AI dili", value: "4" },
      ],
      modules: ["Rezervasyonum", "Rota", "AI soruları"],
    },
  },
};

const roleUiCopy: Record<LanguageCode, { modules: string; nextRole: string }> = {
  ru: { modules: "Модули роли", nextRole: "Следующая роль" },
  en: { modules: "Role modules", nextRole: "Next role" },
  de: { modules: "Rollenmodule", nextRole: "Nächste Rolle" },
  tr: { modules: "Rol modülleri", nextRole: "Sonraki rol" },
};

function roleFromEmail(email: string): UserRole {
  return accountMeta.find((account) => account.email === email)?.role ?? "admin";
}

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguagePreference();
  const copy = appCopy[language].login;
  const roleUi = roleUiCopy[language];
  const [email, setEmail] = useState("admin@agropark.demo");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const selectedRole = roleFromEmail(email);
  const selectedProfile = roleProfiles[language][selectedRole];
  const selectedMeta = accountMeta.find((account) => account.role === selectedRole) ?? accountMeta[0];
  const SelectedIcon = selectedMeta.icon;

  const selectedAccountIndex = useMemo(
    () => demoAccounts.findIndex((account) => account.email === email),
    [email],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!data.ok) setError(data.error || copy.fallbackError);
      else router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5ec] px-4 py-8 text-emerald-950 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(255,255,255,.82),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(250,204,21,.2),transparent_28%),linear-gradient(135deg,#faf8ef,#eaf5e7_52%,#f7f5ec)]" />
      <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between gap-4">
        <BrandLogo />
        <LanguageSwitcher />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <section className="space-y-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">{copy.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">{copy.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-emerald-950/68">{copy.lead}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {demoAccounts.map((account, index) => {
              const accountCopy = copy.accounts[index];
              const meta = accountMeta[index];
              const Icon = meta.icon;

              return (
                <button
                  key={account.email}
                  type="button"
                  aria-pressed={email === account.email}
                  onClick={() => setEmail(account.email)}
                  className={cn(
                    "group rounded-xl border bg-white/82 p-4 text-left shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-amber-500/50 hover:bg-white",
                    email === account.email
                      ? "border-amber-500 bg-white ring-2 ring-amber-200"
                      : "border-emerald-950/10",
                  )}
                >
                  <span className={cn("mb-4 flex size-10 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm", meta.tone)}>
                    <Icon className="size-5" />
                  </span>
                  <span className="block text-sm font-black">{accountCopy.role}</span>
                  <span className="mt-1 block break-all text-xs text-emerald-950/58">{account.email}</span>
                  <span className="mt-3 block text-xs leading-5 text-emerald-950/58">{accountCopy.scope}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-5">
          <div className="overflow-hidden rounded-[28px] border border-emerald-950/10 bg-emerald-950 text-white shadow-2xl shadow-emerald-950/18">
            <div className={cn("h-2 bg-gradient-to-r", selectedMeta.tone)} />
            <div className="grid gap-6 p-6 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-white/12">
                  <SelectedIcon className="size-6 text-amber-200" />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">{selectedProfile.cockpit}</p>
                <h2 className="mt-3 text-3xl font-black">{selectedProfile.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/72">{selectedProfile.promise}</p>
              </div>
              <div className="grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedProfile.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-xl border border-white/10 bg-white/8 p-4">
                      <div className="text-2xl font-black text-amber-200">{metric.value}</div>
                      <div className="mt-1 text-[11px] font-black uppercase leading-4 text-white/62">{metric.label}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-white/10 bg-white/8 p-4">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-white/52">{roleUi.modules}</p>
                  <div className="grid gap-2">
                    {selectedProfile.modules.map((module) => (
                      <div key={module} className="flex items-center gap-2 rounded-lg bg-white/8 p-3 text-sm font-bold">
                        <CheckDot />
                        {module}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-emerald-950/10 bg-white/94 shadow-2xl shadow-emerald-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <ShieldCheck className="size-5 text-amber-700" />
                {copy.formTitle}
              </CardTitle>
              <CardDescription>
                {copy.formDescription} <strong>password</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-950/42" />
                    <Input id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} className="pl-10" autoComplete="email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{copy.passwordLabel}</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-950/42" />
                    <Input id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} className="pl-10" type="password" autoComplete="current-password" />
                  </div>
                </div>
                {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-700">{error}</p> : null}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" disabled={loading} className="min-h-11 flex-1 bg-emerald-800 hover:bg-emerald-900">
                    {loading ? copy.loading : copy.submit}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="min-h-11 flex-1 bg-white"
                    onClick={() => setEmail(demoAccounts[(selectedAccountIndex + 1 + demoAccounts.length) % demoAccounts.length].email)}
                  >
                    <Eye className="size-4" />
                    {roleUi.nextRole}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

function CheckDot() {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-lime-300/18 text-lime-200">
      <MapPinned className="size-3" />
    </span>
  );
}
