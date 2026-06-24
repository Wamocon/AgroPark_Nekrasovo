import Image from "next/image";
import { Calendar, Leaf, MapPin, Sun } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/sections/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const highlights = [
  { icon: Leaf, title: "Кукурузный лабиринт", text: "Маршрут для семей, школьных групп и гостей, которым нужен активный формат на свежем воздухе." },
  { icon: Sun, title: "Музей сельхозтехники", text: "История аграрного труда и современный подход к образовательному маршруту через визуальный опыт." },
  { icon: MapPin, title: "Детские площадки и фотолокации", text: "Спокойный семейный сценарий с прогулкой, фото и природной атмосферой." },
  { icon: Calendar, title: "Мероприятия и корпоративы", text: "Пространство для праздников, концертов, мастерских, выставок и командных событий." },
];

export default function ParkPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-emerald-950 to-emerald-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-widest text-lime-200">АгроПарк Некрасово поле</p>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">О парке</h1>
              <p className="mt-4 max-w-2xl text-lg text-white/80">Парковый комплекс в Калининградской области, где отдых становится мягким погружением в современный аграрный кластер.</p>
            </div>
            <div className="relative h-80 overflow-hidden rounded-2xl shadow-2xl shadow-black/25">
              <Image src="/client-assets/agropark/aerial-view.png" alt="Вид территории АгроПарка Некрасово поле" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Зоны и сценарии посещения" description="Ключевые акценты парка: мероприятия, корпоративы, детские активности, фотолокации, музей техники, ресторан и аренда гриль-куполов." />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <Card key={h.title} className="transition-shadow hover:shadow-lg">
                <CardHeader><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-lime-100 text-emerald-900"><h.icon className="size-5" /></div><CardTitle>{h.title}</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-neutral-600">{h.text}</p></CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-neutral-100 p-8">
              <h3 className="mb-4 text-2xl font-bold">Наша миссия</h3>
              <p className="mb-4 leading-relaxed text-neutral-600">Просвещение жителей и гостей региона о передовых подходах работы в аграрном кластере и популяризация современного образа аграрного специалиста через отдых и приятное времяпрепровождение.</p>
              <p className="leading-relaxed text-neutral-600">Территория объединяет образовательный маршрут, природные зоны, event-площадку, ресторанный сервис и аренду гриль-куполов.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative min-h-[240px] overflow-hidden rounded-2xl"><Image src="/client-assets/agropark/children-zone.jpg" alt="Детский маршрут на территории парка" fill className="object-cover" /></div>
              <div className="relative min-h-[240px] overflow-hidden rounded-2xl"><Image src="/client-assets/agropark/photo-location.jpg" alt="Фотолокация на территории АгроПарка" fill className="object-cover" /></div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
