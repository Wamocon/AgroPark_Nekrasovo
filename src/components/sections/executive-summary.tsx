"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPinned, UsersRound } from "lucide-react";
import { appCopy } from "@/components/i18n/app-copy";
import { useLanguagePreference } from "@/components/i18n/use-language-preference";
import { Button } from "@/components/ui/button";
import { clientImages, productModules } from "@/data/agropark";

const infoIcons = [CalendarDays, MapPinned, UsersRound] as const;

export function ExecutiveSummary() {
  const { language } = useLanguagePreference();
  const copy = appCopy[language].home.summary;

  return (
    <section className="bg-[#f6f3ea] py-20 text-emerald-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">{copy.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{copy.title}</h2>
            <p className="mt-5 text-base leading-8 text-emerald-950/68">{copy.lead}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {copy.proofPoints.map((point) => (
              <div key={point.label} className="rounded-lg border border-emerald-950/10 bg-white p-5 shadow-sm">
                <div className="text-[11px] font-black uppercase text-amber-700">{point.label}</div>
                <div className="mt-3 text-xl font-black leading-tight">{point.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {clientImages.map((image, index) => {
            const imageCopy = copy.images[index];

            return (
              <article key={image.src} className="group overflow-hidden rounded-xl border border-emerald-950/10 bg-white shadow-sm">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={image.src}
                    alt={imageCopy?.alt ?? image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-black">{imageCopy?.title ?? image.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-emerald-950/62">{copy.imageCaption}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {copy.modules.map((module, index) => {
            const Icon = productModules[index].icon;

            return (
              <article key={module.title} className="rounded-xl border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-900 text-white">
                  <Icon className="size-5" />
                </div>
                <div className="text-xs font-black uppercase text-amber-700">{module.metric}</div>
                <h3 className="mt-2 text-xl font-black">{module.title}</h3>
                <p className="mt-3 text-sm leading-7 text-emerald-950/64">{module.text}</p>
                <Button asChild variant="outline" className="mt-5">
                  <Link href={module.href}>
                    {module.action}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </article>
            );
          })}
        </div>

        <div className="mt-14 grid gap-5 rounded-2xl bg-emerald-950 p-6 text-white shadow-2xl shadow-emerald-950/18 lg:grid-cols-3">
          {copy.infoCards.map((card, index) => {
            const Icon = infoIcons[index];

            return (
              <div key={card.title} className="flex gap-4">
                <Icon className="size-6 text-amber-200" />
                <div>
                  <h3 className="font-black">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{card.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
