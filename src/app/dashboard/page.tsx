import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, logout } from "@/lib/auth-actions";
import { roleLabels } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Calendar,
  Users,
  TrendingUp,
  LogOut,
  Ticket,
  MessageSquare,
  Settings,
} from "lucide-react";
import { OpenChatButton } from "@/components/chat/open-chat-button";

const kpiData = [
  { label: "Heute Buchungen", value: "47", change: "+12%", icon: Ticket },
  { label: "Live-Umsatz", value: "€2.840", change: "+€340", icon: TrendingUp },
  { label: "Auslastung", value: "78%", change: "+5%", icon: LayoutDashboard },
  { label: "Neue Anfragen", value: "12", change: "+3", icon: MessageSquare },
];

const recentActivity = [
  { user: "Max K.", action: "buchte Familienticket", time: "vor 2 Min.", amount: "€34" },
  { user: "Anna L.", action: "reservierte Grillplatz", time: "vor 5 Min.", amount: "€120" },
  { user: "Sergej B.", action: "startete VR-Tour", time: "vor 8 Min.", amount: "—" },
  { user: "Elena V.", action: "fragte Gruppenrabatt an", time: "vor 12 Min.", amount: "—" },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-green-900">
              <LayoutDashboard className="size-5" />
              <span className="text-sm font-extrabold">AGROPARK OS</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-sm sm:block">
              <span className="text-muted-foreground">Angemeldet als </span>
              <span className="font-semibold">{user.name}</span>
            </div>
            <Badge variant="success" data-testid="user-role-badge">{roleLabels[user.role]}</Badge>
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
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Übersicht über Buchungen, Umsatz und Aktivitäten
          </p>
          <p className="mt-2 text-xs text-neutral-500">
            Rolle: <strong>{roleLabels[user.role]}</strong> · Alle Werte sind Demo-Daten, bis eine Datenbank angebunden ist.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi) => (
            <Card key={kpi.label} className="transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.label}
                </CardTitle>
                <kpi.icon className="size-4 text-green-700" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-green-900">{kpi.value}</div>
                <p className="text-xs text-green-700">{kpi.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main chart area */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Buchungen & Umsatz</CardTitle>
                <CardDescription>
                  Entwicklung der letzten 7 Tage
                </CardDescription>
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
                          className="w-1/2 rounded-t bg-green-900/80"
                          style={{ height: `${(d.bookings / 80) * 160}px` }}
                        />
                        <div
                          className="w-1/2 rounded-t bg-accent-500/80"
                          style={{ height: `${(d.revenue / 5000) * 160}px` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-neutral-600">{d.day}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center gap-6 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="size-3 rounded bg-green-900/80" /> Buchungen
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-3 rounded bg-accent-500/80" /> Umsatz
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kanal-Attribution</CardTitle>
                <CardDescription>
                  Buchungen nach Herkunftskanal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { channel: "Website", value: 42, color: "bg-green-900" },
                    { channel: "Telegram", value: 28, color: "bg-green-700" },
                    { channel: "VKontakte", value: 18, color: "bg-green-500" },
                    { channel: "Google / Yandex", value: 12, color: "bg-accent-500" },
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

          {/* Sidebar */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Live Aktivität</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentActivity.map((item) => (
                    <li key={item.user + item.action} className="flex items-start gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700 text-xs font-bold text-white">
                        {item.user.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <strong>{item.user}</strong> {item.action}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {item.time} • {item.amount}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schnellzugriff</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4">
                    <Link href="/buchung">
                      <Calendar className="size-5" />
                      <span className="text-xs">Buchung</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4">
                    <Link href="/kontakt">
                      <Users className="size-5" />
                      <span className="text-xs">Kunden</span>
                    </Link>
                  </Button>
                  <OpenChatButton />
                  <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4">
                    <Link href="/dashboard">
                      <Settings className="size-5" />
                      <span className="text-xs">Einstellungen</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
