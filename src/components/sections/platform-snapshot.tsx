"use client";

import { useState } from "react";
import { BarChart3, Bot, CalendarCheck, CheckCircle2, Gauge, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { aiAutomations, parkOffers, parkPipeline } from "@/data/agropark";

const tabs = [
  { id: "guest", label: "Гость", icon: UsersRound },
  { id: "booking", label: "Бронь", icon: CalendarCheck },
  { id: "ai", label: "AI", icon: Bot },
  { id: "team", label: "Команда", icon: Gauge },
] as const;

const tabContent = {
  guest: {
    badge: "Путь гостя",
    title: "Сайт продает реальное место: маршруты, зоны, фото и понятные действия.",
    text: "Главная страница, зоны парка, реальные фотографии и контакты помогают гостю понять, куда он едет, что можно забронировать и как быстро связаться с командой.",
  },
  booking: {
    badge: "Бронирование",
    title: "Бронирование превращает интерес гостя в понятную заявку.",
    text: "Гость выбирает формат, дату и контактные данные, видит сумму и получает QR-подтверждение. Финальное согласование остается у команды парка.",
  },
  ai: {
    badge: "AI-помощник",
    title: "AI отвечает быстро, но работает в безопасных границах.",
    text: "Ассистент отвечает на русском, немецком, турецком и английском, объясняет цены, график, маршрут, правила бронирования и доступные форматы отдыха.",
  },
  team: {
    badge: "Панель команды",
    title: "Команда видит заявки и операцию без ручного сбора отчетов.",
    text: "Панель собирает заявки, загрузку зон, активность и KPI, чтобы руководитель и администраторы быстрее понимали состояние сезона.",
  },
} as const;

export function PlatformSnapshot() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("guest");
  const content = tabContent[active];

  return (
    <section className="bg-white py-20 text-emerald-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">единая система</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Сайт, бронь, AI и панель команды работают как один спокойный сервис.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-emerald-950/10 bg-[#f6f3ea] p-2 sm:grid-cols-4">
            {tabs.map((tab) => (
              <Button key={tab.id} type="button" variant={active === tab.id ? "default" : "ghost"} className={active === tab.id ? "bg-emerald-900" : ""} onClick={() => setActive(tab.id)}>
                <tab.icon className="size-4" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-2xl border border-emerald-950/10 bg-[#f6f3ea] p-6">
            <Badge className="mb-4 bg-emerald-100 text-emerald-950 hover:bg-emerald-100">{content.badge}</Badge>
            <h3 className="text-3xl font-black">{content.title}</h3>
            <p className="mt-4 text-sm leading-7 text-emerald-950/66">{content.text}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <BarChart3 className="size-5 text-amber-700" />
                <h3 className="font-black">Заявки и статусы</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {parkPipeline.map((stage) => (
                  <div key={stage.stage} className="rounded-lg bg-[#f6f3ea] p-4">
                    <span className={`mb-3 block h-1.5 w-10 rounded-full ${stage.tone}`} />
                    <div className="text-2xl font-black">{stage.count}</div>
                    <div className="text-xs font-bold text-emerald-950/58">{stage.stage}</div>
                    <div className="mt-1 text-xs text-emerald-950/52">{stage.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-950/10 bg-emerald-950 p-6 text-white shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Bot className="size-5 text-amber-200" />
                <h3 className="font-black">AI-помощник</h3>
              </div>
              <div className="space-y-3">
                {aiAutomations.slice(0, 3).map((item) => (
                  <div key={item.title} className="rounded-lg border border-white/10 bg-white/8 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-black">{item.title}</span>
                      <CheckCircle2 className="size-4 text-lime-300" />
                    </div>
                    <p className="mt-2 text-xs leading-5 text-white/68">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm sm:col-span-2">
              <h3 className="font-black">Коммерческие сценарии парка</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {parkOffers.map((offer) => (
                  <article key={offer.title} className="rounded-lg border border-emerald-950/10 bg-[#f6f3ea] p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-black">{offer.title}</h4>
                      <span className="rounded-full bg-white px-2 py-1 text-xs font-black text-emerald-700">{offer.score}</span>
                    </div>
                    <p className="mt-2 text-sm text-emerald-950/62">{offer.type}</p>
                    <p className="mt-1 text-sm font-bold">{offer.budget}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
