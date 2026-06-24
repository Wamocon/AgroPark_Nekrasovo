import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, GitBranch, PartyPopper, Rabbit, Truck, UtensilsCrossed } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/sections/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const attractions = [
  { icon: GitBranch, title: "Кукурузный лабиринт", desc: "Сезонный маршрут для семей, школьных групп и гостей, которым нужен активный формат на свежем воздухе.", tag: "семья" },
  { icon: Truck, title: "Музей сельхозтехники", desc: "История техники, аграрный контекст региона и визуальная точка для экскурсий и образовательных программ.", tag: "образование" },
  { icon: Rabbit, title: "Детские площадки", desc: "Пространство для детей, прогулок, спокойного отдыха и мягкого знакомства с природой.", tag: "детям" },
  { icon: UtensilsCrossed, title: "Ресторанная зона", desc: "Комфортная точка питания рядом с природными маршрутами, событиями и зонами отдыха.", tag: "гастрономия" },
  { icon: Flame, title: "Гриль-купола", desc: "Купола и беседки с грилем для компаний до 12 и до 25 человек с понятными временными слотами.", tag: "отдых" },
  { icon: PartyPopper, title: "События и корпоративы", desc: "Праздники, концерты, мастерские, выставки и командные мероприятия на природе.", tag: "events" },
];

export default function AttractionsPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-emerald-950 to-emerald-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-black uppercase tracking-widest text-lime-200">Что посмотреть</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Программы и площадки</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">Экскурсии, концерты, творческие мастерские, выставки, зоны барбекю, детские площадки и музей сельхозтехники.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Содержательные зоны" description="Каждая зона получает понятное описание, визуальный контекст и прямой переход к бронированию или контакту." />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.map((a) => (
              <Card key={a.title} className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-700 to-lime-600 text-white transition-transform group-hover:scale-110"><a.icon className="size-6" /></div>
                  <CardTitle>{a.title}</CardTitle>
                  <CardDescription>{a.desc}</CardDescription>
                </CardHeader>
                <CardContent><span className="inline-block rounded-full bg-lime-100 px-3 py-1 text-xs font-bold text-emerald-900">{a.tag}</span></CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {[
              ["/client-assets/agropark/grill-dome.jpg", "Гриль-купол в АгроПарке"],
              ["/client-assets/agropark/restaurant-view.jpg", "Ресторанная зона АгроПарка"],
              ["/client-assets/agropark/field-road.jpg", "Экскурсионный маршрут по территории"],
            ].map(([src, alt]) => (
              <div key={src} className="relative h-72 overflow-hidden rounded-2xl">
                <Image src={src} alt={alt} fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="bg-emerald-900 hover:bg-emerald-800"><Link href="/buchung">Забронировать посещение <ArrowRight className="ml-2 size-4" /></Link></Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
