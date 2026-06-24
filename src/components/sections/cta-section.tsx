"use client";

import Link from "next/link";
import { ArrowRight, Bot, CalendarCheck, Gauge } from "lucide-react";
import { appCopy } from "@/components/i18n/app-copy";
import { useLanguagePreference } from "@/components/i18n/use-language-preference";
import { Button } from "@/components/ui/button";

const itemLinks = ["/park", "/buchung", "/kontakt", "/login"] as const;

export function CTASection() {
  const { language } = useLanguagePreference();
  const copy = appCopy[language].home.cta;

  return (
    <section className="bg-[#f6f3ea] px-4 py-20 text-emerald-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-emerald-950 p-8 text-white shadow-2xl shadow-emerald-950/20 sm:p-12">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">{copy.eyebrow}</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight [overflow-wrap:anywhere] sm:text-5xl">{copy.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 [overflow-wrap:anywhere]">{copy.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="w-full whitespace-normal bg-amber-300 text-center text-emerald-950 hover:bg-amber-200 sm:w-auto">
                <Link href="/buchung">
                  <CalendarCheck className="size-5" />
                  {copy.actions.booking}
                </Link>
              </Button>
              <Button asChild size="lg" className="w-full whitespace-normal border border-white/18 bg-white/10 text-center text-white hover:bg-white/16 sm:w-auto">
                <Link href="/login">
                  <Gauge className="size-5" />
                  {copy.actions.login}
                </Link>
              </Button>
              <Button asChild size="lg" className="w-full whitespace-normal border border-white/18 bg-white/10 text-center text-white hover:bg-white/16 sm:w-auto">
                <Link href="/kontakt">
                  <Bot className="size-5" />
                  {copy.actions.contact}
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid min-w-0 gap-4">
            {copy.items.map((item, index) => (
              <Link
                key={item}
                href={itemLinks[index] ?? "/"}
                className="flex min-h-14 min-w-0 items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/8 p-4 text-sm font-bold transition hover:-translate-y-0.5 hover:border-amber-200/35 hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
              >
                <span className="min-w-0 [overflow-wrap:anywhere]">{item}</span>
                <ArrowRight className="size-4 shrink-0 text-amber-200" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
