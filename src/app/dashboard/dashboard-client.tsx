"use client";

import Link from "next/link";
import { BarChart3, Bot, CalendarCheck, CheckCircle2, Home, Leaf, LogOut, MapPinned, MessageSquareText, Sparkles } from "lucide-react";
import { ChatWidget } from "@/components/chat/chat-widget";
import { OpenChatButton } from "@/components/chat/open-chat-button";
import { appCopy } from "@/components/i18n/app-copy";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useLanguagePreference } from "@/components/i18n/use-language-preference";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { aiAutomations, parkOffers, parkPipeline } from "@/data/agropark";
import type { DemoUser } from "@/lib/auth";
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

export function DashboardClient({ user }: { user: DemoUser }) {
  const { language } = useLanguagePreference();
  const copy = appCopy[language].dashboard;
  const roleLabel = copy.roleLabels[user.role];

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
