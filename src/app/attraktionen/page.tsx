import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/sections/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, GitBranch, Truck, Rabbit, UtensilsCrossed, Flame, PartyPopper } from "lucide-react";

const attractions = [
  {
    icon: GitBranch,
    title: "Maisfeld-Labyrinth",
    desc: "Ein riesiges Labyrinth aus Mais – Spaß für Kinder und Erwachsene.",
    tag: "Familie",
  },
  {
    icon: Truck,
    title: "Maschinenmuseum",
    desc: "Historische Traktoren, Mähdrescher und moderne Agrarroboter.",
    tag: "Bildung",
  },
  {
    icon: Rabbit,
    title: "Tierbereiche",
    desc: "Streichelzoo, Ponyreiten und Fütterungszeiten für Kinder.",
    tag: "Kinder",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant",
    desc: "Regionale Küche mit Produkten aus der eigenen Landwirtschaft.",
    tag: "Gastronomie",
  },
  {
    icon: Flame,
    title: "Grillkuppeln",
    desc: "Gemütliche Kuppeln für Gruppen, Familienfeiern und Firmenevents.",
    tag: "Events",
  },
  {
    icon: PartyPopper,
    title: "Eventflächen",
    desc: "Großzügige Flächen für Hochzeiten, Geburtstage und Teambuilding.",
    tag: "B2B",
  },
];

export default function AttractionsPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Attraktionen</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Entdecken Sie die vielfältigen Erlebniswelten des AgroPark Nekrasovo.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Alle Attraktionen"
            description="Von Action bis Entspannung – für jeden Besucher das Richtige."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.map((a) => (
              <Card
                key={a.title}
                className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-700 text-white transition-transform group-hover:scale-110">
                    <a.icon className="size-6" />
                  </div>
                  <CardTitle>{a.title}</CardTitle>
                  <CardDescription>{a.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-900">
                    {a.tag}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="bg-green-900 hover:bg-green-800">
              <Link href="/buchung">
                Ticket buchen <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
