"use client";

import Link from "next/link";
import { Globe, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { appCopy } from "@/components/i18n/app-copy";
import { useLanguagePreference } from "@/components/i18n/use-language-preference";
import { BrandLogo } from "@/components/layout/brand-logo";
import { agroparkContact } from "@/data/agropark";

export function Footer() {
  const { language } = useLanguagePreference();
  const copy = appCopy[language].footer;
  const legal = {
    ru: { privacy: "Обработка данных", imprint: "Реквизиты" },
    en: { privacy: "Data processing", imprint: "Legal details" },
    de: { privacy: "Datenschutz", imprint: "Impressum" },
    tr: { privacy: "Veri işleme", imprint: "Künye" },
  }[language];

  return (
    <footer className="border-t border-emerald-950/10 bg-[#f7f4ea] text-emerald-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:px-8">
        <div>
          <BrandLogo />
          <p className="mt-5 max-w-md text-sm leading-7 text-emerald-950/64">
            {copy.description}
          </p>
        </div>
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">{copy.navTitle}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {copy.links.map((link) => (
              <Link key={link.href} href={link.href} className="inline-flex min-h-10 items-center text-emerald-950/68 transition hover:text-emerald-900">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">{copy.contactTitle}</h2>
          <div className="mt-4 space-y-3 text-sm text-emerald-950/68">
            <a href={agroparkContact.phoneHref} className="flex min-h-10 items-center gap-2 hover:text-emerald-900">
              <Phone className="mt-0.5 size-4" />
              {agroparkContact.phone}
            </a>
            <a href={agroparkContact.emailHref} className="flex min-h-10 items-center gap-2 hover:text-emerald-900">
              <Mail className="mt-0.5 size-4" />
              {agroparkContact.email}
            </a>
            <a href={agroparkContact.telegramHref} target="_blank" rel="noopener noreferrer" className="flex min-h-10 items-center gap-2 hover:text-emerald-900">
              <Send className="mt-0.5 size-4" />
              Telegram {agroparkContact.telegram}
            </a>
            <a href={agroparkContact.vkHref} target="_blank" rel="noopener noreferrer" className="flex min-h-10 items-center gap-2 hover:text-emerald-900">
              <MessageCircle className="mt-0.5 size-4" />
              VK {agroparkContact.vk}
            </a>
            <a href={agroparkContact.maxHref} target="_blank" rel="noopener noreferrer" className="flex min-h-10 items-center gap-2 hover:text-emerald-900">
              <MessageCircle className="mt-0.5 size-4" />
              Max
            </a>
            <a href={agroparkContact.websiteHref} target="_blank" rel="noopener noreferrer" className="flex min-h-10 items-center gap-2 hover:text-emerald-900">
              <Globe className="mt-0.5 size-4" />
              {agroparkContact.website}
            </a>
            <span className="flex min-h-10 items-center gap-2">
              <MapPin className="mt-0.5 size-4" />
              {copy.region}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 border-t border-emerald-950/10 px-4 py-5 text-center text-xs text-emerald-950/52 sm:flex-row sm:justify-center sm:gap-4">
        <span>{copy.bottom}</span>
        <span className="flex gap-4">
          <Link href="/datenschutz" className="inline-flex min-h-10 items-center hover:text-emerald-900">{legal.privacy}</Link>
          <Link href="/impressum" className="inline-flex min-h-10 items-center hover:text-emerald-900">{legal.imprint}</Link>
        </span>
      </div>
    </footer>
  );
}
