"use client";

import Image from "next/image";
import { Calendar, Leaf, MapPin, Sun } from "lucide-react";
import { useLanguagePreference } from "@/components/i18n/use-language-preference";
import { appCopy } from "@/components/i18n/app-copy";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/sections/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const highlightIcons = [Leaf, Sun, MapPin, Calendar] as const;

export default function ParkPage() {
  const { language } = useLanguagePreference();
  const copy = appCopy[language].park;

  return (
    <PageShell>
      <section className="bg-gradient-to-br from-emerald-950 to-emerald-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-widest text-lime-200">{copy.eyebrow}</p>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{copy.title}</h1>
              <p className="mt-4 max-w-2xl text-lg text-white/80">{copy.lead}</p>
            </div>
            <div className="relative h-80 overflow-hidden rounded-2xl shadow-2xl shadow-black/25">
              <Image src="/client-assets/agropark/aerial-view.png" alt={copy.heroAlt} fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title={copy.sectionTitle} description={copy.sectionDescription} />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.highlights.map((highlight, index) => {
              const Icon = highlightIcons[index];

              return (
                <Card key={highlight.title} className="transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-lime-100 text-emerald-900">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle>{highlight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600">{highlight.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-neutral-100 p-8">
              <h3 className="mb-4 text-2xl font-bold">{copy.missionTitle}</h3>
              <p className="mb-4 leading-relaxed text-neutral-600">{copy.mission}</p>
              <p className="leading-relaxed text-neutral-600">{copy.missionSecond}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative min-h-[240px] overflow-hidden rounded-2xl">
                <Image src="/client-assets/agropark/children-zone.jpg" alt={copy.imageAlts[0]} fill className="object-cover" />
              </div>
              <div className="relative min-h-[240px] overflow-hidden rounded-2xl">
                <Image src="/client-assets/agropark/photo-location.jpg" alt={copy.imageAlts[1]} fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
