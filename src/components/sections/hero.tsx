import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { heroActions, operationsKpis, parkPipeline } from "@/data/agropark";

export function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-emerald-950 pt-24 text-white">
      <Image src="/client-assets/agropark/aerial-view.png" alt="Территория АгроПарка Некрасово поле" fill priority className="-z-20 object-cover opacity-36" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(10,42,29,.96),rgba(10,42,29,.78)_48%,rgba(10,42,29,.42))]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:px-8">
        <div>
          <Badge className="mb-6 border border-amber-300/30 bg-amber-300/12 px-4 py-2 text-amber-100 hover:bg-amber-300/12">Beta-платформа для гостей и команды</Badge>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">АгроПарк Некрасово поле как современная цифровая экосистема.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">Мы сохраняем реальную идентичность клиента и усиливаем ее state-of-the-art интерфейсом: сайт парка, бронирование, AI-чат, CRM-панель, заявки и операционная аналитика работают в одном плавном demo-продукте.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {heroActions.map((action, index) => (
              <Button key={action.href} asChild size="lg" className={index === 0 ? "bg-amber-300 text-emerald-950 hover:bg-amber-200" : "border border-white/18 bg-white/10 text-white hover:bg-white/16"}>
                <Link href={action.href}><action.icon className="size-5" />{action.label}</Link>
              </Button>
            ))}
          </div>
          <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-4">
            {operationsKpis.map((kpi) => <div key={kpi.label} className="rounded-lg border border-white/12 bg-white/10 p-4 backdrop-blur"><div className="text-2xl font-black text-amber-200">{kpi.value}</div><div className="mt-1 text-[11px] font-black uppercase leading-4 text-white/68">{kpi.label}</div></div>)}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[560px] perspective-1000">
          <div className="animate-float rounded-[28px] border border-white/20 bg-[#fbfaf5] p-4 text-emerald-950 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between border-b border-emerald-950/10 pb-4"><strong className="text-sm">AgroPark OS</strong><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-900">connected beta</span></div>
            <div className="grid gap-4 py-5 sm:grid-cols-2">{operationsKpis.map((kpi) => <div key={kpi.label} className="rounded-xl border border-emerald-950/10 bg-white p-5 shadow-sm"><div className="text-xs font-black uppercase text-emerald-950/54">{kpi.label}</div><div className="mt-3 text-3xl font-black">{kpi.value}</div><div className="mt-2 text-xs font-bold text-emerald-700">{kpi.change}</div></div>)}</div>
            <div className="rounded-xl border border-emerald-950/10 bg-emerald-950 p-5 text-white"><div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-black uppercase text-amber-200">путь гостя</p><h2 className="mt-1 text-xl font-black">Один маршрут, три связанных модуля</h2></div><Sparkles className="size-5 text-amber-200" /></div><div className="space-y-3">{["Гость выбирает формат и дату", "AI отвечает на вопросы", "Команда управляет бронью и KPI"].map((item) => <div key={item} className="flex items-center gap-3 rounded-lg bg-white/8 p-3 text-sm font-bold"><CheckCircle2 className="size-4 text-lime-300" />{item}</div>)}</div></div>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">{parkPipeline.map((stage) => <div key={stage.stage} className="rounded-lg border border-emerald-950/10 bg-white p-3"><span className={`mb-2 block h-1.5 w-8 rounded-full ${stage.tone}`} /><div className="text-lg font-black">{stage.count}</div><div className="text-[10px] font-bold uppercase text-emerald-950/52">{stage.stage}</div></div>)}</div>
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-emerald-300/20 bg-white/12 p-4 text-sm backdrop-blur lg:block"><ShieldCheck className="mb-2 size-5 text-amber-200" />Demo-контур без реальных платежей и чувствительных данных.</div>
        </div>
      </div>
    </section>
  );
}
