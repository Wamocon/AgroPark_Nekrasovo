import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/sections/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sun, MapPin, Calendar } from "lucide-react";

const highlights = [
  {
    icon: Leaf,
    title: "Maisfeld-Labyrinth",
    text: "Ein Erlebnis für die ganze Familie – Finden Sie den Weg durch das riesige Labyrinth.",
  },
  {
    icon: Sun,
    title: "Maschinenmuseum",
    text: "Historische Landmaschinen und moderne Agrartechnik hautnah erleben.",
  },
  {
    icon: MapPin,
    title: "Tierbereiche",
    text: "Nutztiere streicheln und füttern – ideal für Kinder und Schulklassen.",
  },
  {
    icon: Calendar,
    title: "Saison Mai–September",
    text: "In der Hochsaison geöffnet – perfekt für Familienausflüge und Firmenevents.",
  },
];

export default function ParkPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Der Park</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            AgroPark Nekrasovo – ein saisonaler Agritourismus-Park in der
            Kaliningrader Oblast mit einzigartigen Erlebniszonen.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Erlebniszonen"
            description="Vom Maisfeld-Labyrinth bis zur Grillkuppel – entdecken Sie alle Attraktionen."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <Card key={h.title} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-900">
                    <h.icon className="size-5" />
                  </div>
                  <CardTitle>{h.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600">{h.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-neutral-100 p-8">
              <h3 className="mb-4 text-2xl font-bold">Über den Park</h3>
              <p className="mb-4 leading-relaxed text-neutral-600">
                AgroPark Nekrasovo liegt in der Kaliningrader Oblast und verbindet
                landwirtschaftliche Bildung mit Erlebnis und Genuss. Auf dem Gelände
                befinden sich ein Maisfeld-Labyrinth, ein Maschinenmuseum, Tierbereiche,
                ein Restaurant und Grillkuppeln für Gruppen und Familien.
              </p>
              <p className="leading-relaxed text-neutral-600">
                Die Saison läuft von Mai bis September. Neben dem regulären Besuchsbetrieb
                bietet der Park Firmenevents, Geburtstagsfeiern und Schul-Workshops an.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="flex h-full min-h-[300px] items-center justify-center rounded-xl bg-neutral-100 text-neutral-500">
                <span className="flex items-center gap-2">
                  <MapPin className="size-5" />
                  Parkgelände – Bild einfügen
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
