import Link from "next/link";
import { ArrowRight, Bot, CalendarCheck, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-[#f6f3ea] px-4 py-20 text-emerald-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-emerald-950 p-8 text-white shadow-2xl shadow-emerald-950/20 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">готово к визиту</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Выберите отдых, задайте вопрос и отправьте заявку без лишней переписки.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
              Гость может пройти бронь, задать вопрос AI и оставить заявку. Команда парка получает структурированное
              обращение, видит роли, KPI и следующие действия в панели управления.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-amber-300 text-emerald-950 hover:bg-amber-200">
                <Link href="/buchung">
                  <CalendarCheck className="size-5" />
                  Забронировать отдых
                </Link>
              </Button>
              <Button asChild size="lg" className="border border-white/18 bg-white/10 text-white hover:bg-white/16">
                <Link href="/login">
                  <Gauge className="size-5" />
                  Вход для команды
                </Link>
              </Button>
              <Button asChild size="lg" className="border border-white/18 bg-white/10 text-white hover:bg-white/16">
                <Link href="/kontakt">
                  <Bot className="size-5" />
                  Спросить AI
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              "Реальные фото, зоны и контакты парка",
              "Бронирование с QR-подтверждением",
              "AI-чат RU / DE / TR / EN",
              "Панель команды с ролями и заявками",
            ].map((item) => (
              <div key={item} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/8 p-4 text-sm font-bold">
                {item}
                <ArrowRight className="size-4 shrink-0 text-amber-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
