import Link from "next/link";
import { redirect } from "next/navigation";
import { Bot, CalendarCheck, CheckCircle2, Home, LogOut, MapPinned, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { OpenChatButton } from "@/components/chat/open-chat-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { aiAutomations, operationsKpis, parkOffers, parkPipeline, recentActivity } from "@/data/agropark";
import { getCurrentUser, logout } from "@/lib/auth-actions";
import { roleLabels } from "@/lib/auth";

const chartData = [
  { day: "Вт", bookings: 28, revenue: 42 },
  { day: "Ср", bookings: 34, revenue: 56 },
  { day: "Чт", bookings: 31, revenue: 52 },
  { day: "Пт", bookings: 41, revenue: 72 },
  { day: "Сб", bookings: 52, revenue: 96 },
  { day: "Вс", bookings: 47, revenue: 88 },
];

const quickActions = [
  { href: "/buchung", label: "Новая бронь", icon: CalendarCheck },
  { href: "/kontakt", label: "AI и формы", icon: Bot },
  { href: "/park", label: "Карта парка", icon: MapPinned },
  { href: "/", label: "Главная", icon: Home },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-[#f6f3ea]">
      <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-11 items-center gap-3 text-emerald-950">
            <BrandLogo />
            <span className="hidden rounded-full border border-emerald-900/10 bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-800 sm:inline-flex">Beta CRM</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden text-sm sm:block"><span className="text-muted-foreground">Пользователь: </span><span className="font-semibold">{user.name}</span></div>
            <Badge variant="success" data-testid="user-role-badge">{roleLabels[user.role]}</Badge>
            <form action={logout}><Button type="submit" variant="ghost" size="sm"><LogOut className="mr-2 size-4" />Выйти</Button></form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <Badge className="mb-3 bg-emerald-100 text-emerald-950 hover:bg-emerald-100">Операционный центр</Badge>
            <h1 className="text-3xl font-black text-foreground sm:text-4xl">AgroPark OS Dashboard</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">Заявки, бронь, AI-поддержка, загрузка зон и активность команды в одном рабочем интерфейсе. Активная роль: <strong>{roleLabels[user.role]}</strong>.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {["Сегодня", "Все зоны", "Сезон"].map((item) => (
              <select key={item} className="min-h-10 rounded-lg border border-emerald-950/10 bg-white px-3 text-sm font-bold text-emerald-950/76">
                <option>{item}</option>
                <option>Гриль-купола</option>
                <option>События</option>
              </select>
            ))}
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {operationsKpis.map((kpi) => (
            <Card key={kpi.label} className="border-white bg-white/94 shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle><kpi.icon className="size-4 text-amber-700" /></CardHeader>
              <CardContent><div className="text-2xl font-black text-emerald-950">{kpi.value}</div><p className="text-xs font-bold text-emerald-700">{kpi.change}</p></CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card className="bg-white/94">
              <CardHeader><CardTitle>Брони и расчет выручки</CardTitle><CardDescription>Сигналы недели без реальных онлайн-списаний</CardDescription></CardHeader>
              <CardContent><div className="flex h-64 items-end justify-between gap-2">{chartData.map((d) => <div key={d.day} className="flex flex-1 flex-col items-center gap-2"><div className="flex w-full items-end gap-1"><div className="w-1/2 rounded-t bg-emerald-800/90" style={{ height: `${(d.bookings / 60) * 160}px` }} /><div className="w-1/2 rounded-t bg-amber-500/90" style={{ height: `${(d.revenue / 100) * 160}px` }} /></div><span className="text-xs font-medium text-emerald-950/64">{d.day}</span></div>)}</div></CardContent>
            </Card>

            <Card className="bg-white/94">
              <CardHeader><CardTitle>Pipeline заявок</CardTitle><CardDescription>Живой статус для директора и менеджера</CardDescription></CardHeader>
              <CardContent><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{parkPipeline.map((stage) => <div key={stage.stage} className="rounded-lg border border-emerald-950/10 bg-[#fcfbf6] p-4"><span className={`mb-4 block h-1.5 w-10 rounded-full ${stage.tone}`} /><h3 className="text-sm font-black">{stage.stage}</h3><p className="mt-2 text-2xl font-black">{stage.count}</p><p className="text-xs font-bold text-emerald-950/60">{stage.value}</p></div>)}</div></CardContent>
            </Card>

            <Card className="bg-white/94">
              <CardHeader><CardTitle>Коммерческие форматы</CardTitle><CardDescription>Что продает парк и какие запросы приходят</CardDescription></CardHeader>
              <CardContent><div className="grid gap-3 md:grid-cols-3">{parkOffers.map((offer) => <article key={offer.title} className="rounded-lg border border-emerald-950/10 bg-white p-4"><div className="flex items-center justify-between gap-2"><h3 className="font-black">{offer.title}</h3><span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">{offer.score}</span></div><p className="mt-2 text-sm text-emerald-950/62">{offer.type}</p><p className="mt-1 text-sm font-bold text-emerald-950">{offer.city} · {offer.budget}</p></article>)}</div></CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="bg-emerald-950 text-white">
              <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="size-5 text-amber-200" />AI Automation Hub</CardTitle><CardDescription className="text-white/70">Снижает ручные ответы и ускоряет подтверждение заявок.</CardDescription></CardHeader>
              <CardContent><div className="space-y-3">{aiAutomations.map((item) => <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.06] p-3"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><item.icon className="size-4 text-amber-200" /><span className="text-sm font-black">{item.title}</span></div><CheckCircle2 className="size-4 text-lime-300" /></div><p className="mt-2 text-xs leading-5 text-white/70">{item.detail}</p></div>)}</div></CardContent>
            </Card>

            <Card className="bg-white/94"><CardHeader><CardTitle>Активность</CardTitle></CardHeader><CardContent><ul className="space-y-4">{recentActivity.map((item) => <li key={item.user + item.action} className="flex items-start gap-3"><div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-700 to-amber-500 text-xs font-bold text-white">{item.user.slice(0, 2).toUpperCase()}</div><div className="flex-1"><p className="text-sm"><strong>{item.user}</strong> {item.action}</p><p className="text-xs text-emerald-950/54">{item.time} · {item.amount}</p></div></li>)}</ul></CardContent></Card>

            <Card className="bg-white/94"><CardHeader><CardTitle>Быстрый доступ</CardTitle><CardDescription>Все кнопки ведут в рабочие модули платформы.</CardDescription></CardHeader><CardContent><div className="grid grid-cols-2 gap-3">{quickActions.map((action) => <Button key={action.href} asChild variant="outline" className="h-auto flex-col gap-2 bg-white py-4"><Link href={action.href}><action.icon className="size-5" /><span className="text-xs">{action.label}</span></Link></Button>)}<OpenChatButton className="col-span-2 bg-white" label="Открыть AI-чат" /></div></CardContent></Card>
          </div>
        </div>
      </main>
    </div>
  );
}
