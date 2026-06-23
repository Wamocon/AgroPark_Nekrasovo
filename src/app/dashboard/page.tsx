import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, logout } from "@/lib/auth-actions";
import { roleLabels } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/brand-logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Calendar,
  FileText,
  LogOut,
  MapPinned,
  Users,
} from "lucide-react";
import { OpenChatButton } from "@/components/chat/open-chat-button";
import { operationsKpis, recentActivity } from "@/data/agropark";

const quickActions = [
  { href: "/buchung", label: "Buchung", icon: Calendar },
  { href: "/kontakt", label: "Kunden", icon: Users },
  { href: "/park", label: "Parkkarte", icon: MapPinned },
  { href: "/proposal.html", label: "Pitch", icon: FileText },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#f7f6ef]">
      <header className="sticky top-0 z-50 border-b border-border bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-11 items-center gap-3 text-emerald-950">
            <BrandLogo href="/" className="min-h-11" />
            <span className="hidden rounded-full border border-emerald-900/10 bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-900 sm:inline-flex">
              OS Demo
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden text-sm sm:block">
              <span className="text-muted-foreground">Angemeldet als </span>
              <span className="font-semibold">{user.name}</span>
            </div>
            <Badge variant="success" data-testid="user-role-badge">
              {roleLabels[user.role]}
            </Badge>
            <form action={logout}>
              <Button type="submit" variant="ghost" size="sm">
                <LogOut className="mr-2 size-4" />
                Abmelden
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <Badge className="mb-3 bg-emerald-100 text-emerald-950 hover:bg-emerald-100">
              CRM Demo
            </Badge>
            <h1 className="text-3xl font-black text-foreground sm:text-4xl">
              Betriebsdashboard
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Übersicht über Buchungen, Umsatz, Aktivitäten und die wichtigsten
              operativen Wege. Rolle: <strong>{roleLabels[user.role]}</strong>.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild className="bg-emerald-900 hover:bg-emerald-800">
              <Link href="/buchung">Neue Buchung</Link>
            </Button>
            <Button asChild variant="outline" className="bg-white">
              <Link href="/proposal.html">Pitch Deck</Link>
            </Button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {operationsKpis.map((kpi) => (
            <Card key={kpi.label} className="border-white bg-white/90 shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.label}
                </CardTitle>
                <kpi.icon className="size-4 text-emerald-700" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-emerald-950">{kpi.value}</div>
                <p className="text-xs font-bold text-emerald-700">{kpi.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card className="bg-white/92">
              <CardHeader>
                <CardTitle>Buchungen und Umsatz</CardTitle>
                <CardDescription>Demo-Entwicklung der letzten 7 Tage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-end justify-between gap-2">
                  {[
                    { day: "Mo", bookings: 32, revenue: 1800 },
                    { day: "Di", bookings: 45, revenue: 2600 },
                    { day: "Mi", bookings: 38, revenue: 2200 },
                    { day: "Do", bookings: 52, revenue: 3100 },
                    { day: "Fr", bookings: 61, revenue: 3600 },
                    { day: "Sa", bookings: 78, revenue: 4500 },
                    { day: "So", bookings: 47, revenue: 2840 },
                  ].map((d) => (
                    <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex w-full gap-1">
                        <div
                          className="w-1/2 rounded-t bg-emerald-900/85"
                          style={{ height: `${(d.bookings / 80) * 160}px` }}
                        />
                        <div
                          className="w-1/2 rounded-t bg-amber-500/85"
                          style={{ height: `${(d.revenue / 5000) * 160}px` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-neutral-600">{d.day}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center gap-6 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="size-3 rounded bg-emerald-900/85" /> Buchungen
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-3 rounded bg-amber-500/85" /> Umsatz
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/92">
              <CardHeader>
                <CardTitle>Kanal-Attribution</CardTitle>
                <CardDescription>Buchungen nach Herkunftskanal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { channel: "Website", value: 42, color: "bg-emerald-900" },
                    { channel: "Telegram", value: 28, color: "bg-emerald-700" },
                    { channel: "VKontakte", value: 18, color: "bg-emerald-500" },
                    { channel: "Google / Yandex", value: 12, color: "bg-amber-500" },
                  ].map((c) => (
                    <div key={c.channel}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-medium">{c.channel}</span>
                        <span className="text-neutral-600">{c.value}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                        <div
                          className={`h-full rounded-full ${c.color}`}
                          style={{ width: `${c.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="bg-white/92">
              <CardHeader>
                <CardTitle>Live Aktivität</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentActivity.map((item) => (
                    <li key={item.user + item.action} className="flex items-start gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-800 text-xs font-bold text-white">
                        {item.user.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <strong>{item.user}</strong> {item.action}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {item.time} · {item.amount}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/92">
              <CardHeader>
                <CardTitle>Schnellzugriff</CardTitle>
                <CardDescription>Alle Kacheln führen zu echten Demo-Routen.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => (
                    <Button key={action.href} asChild variant="outline" className="h-auto flex-col gap-2 bg-white py-4">
                      <Link href={action.href}>
                        <action.icon className="size-5" />
                        <span className="text-xs">{action.label}</span>
                      </Link>
                    </Button>
                  ))}
                  <OpenChatButton className="col-span-2 bg-white" label="KI-Chat öffnen" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-950">
                  <BarChart3 className="size-5" />
                  Nächster Integrationsschritt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-emerald-900/80">
                  Die Demo speichert Buchungen und Kontaktanfragen lokal. Für Produktion
                  folgt Supabase mit Rollen, Tabellen, RLS und echten Reporting-Daten.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
