"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, GitBranch, PartyPopper, Rabbit, Truck, UtensilsCrossed } from "lucide-react";
import { appCopy } from "@/components/i18n/app-copy";
import { useLanguagePreference } from "@/components/i18n/use-language-preference";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const attractionIcons = [GitBranch, Truck, Rabbit, UtensilsCrossed, Flame, PartyPopper] as const;
const galleryImages = ["/client-assets/agropark/grill-dome.jpg", "/client-assets/agropark/restaurant-view.jpg", "/client-assets/agropark/field-road.jpg"] as const;

export default function AttractionsPage() {
  const { language } = useLanguagePreference();
  const copy = appCopy[language].attractions;

  return (
    <PageShell>
      <section className="bg-gradient-to-br from-emerald-950 to-emerald-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-black uppercase tracking-widest text-lime-200">{copy.eyebrow}</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{copy.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{copy.lead}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title={copy.sectionTitle} description={copy.sectionDescription} />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {copy.cards.map((attraction, index) => {
              const Icon = attractionIcons[index];

              return (
                <Card key={attraction.title} className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-700 to-lime-600 text-white transition-transform group-hover:scale-110">
                      <Icon className="size-6" />
                    </div>
                    <CardTitle>{attraction.title}</CardTitle>
                    <CardDescription>{attraction.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-block rounded-full bg-lime-100 px-3 py-1 text-xs font-bold text-emerald-900">{attraction.tag}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {galleryImages.map((src, index) => (
              <div key={src} className="relative h-72 overflow-hidden rounded-2xl">
                <Image src={src} alt={copy.imageAlts[index]} fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="bg-emerald-900 hover:bg-emerald-800">
              <Link href="/buchung">
                {copy.cta}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
