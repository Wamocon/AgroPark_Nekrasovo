"use client";

import Link from "next/link";
import { CalendarCheck, Menu, MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useLanguagePreference, type LanguageCode } from "@/components/i18n/use-language-preference";
import { Button } from "@/components/ui/button";

const navCopy: Record<
  LanguageCode,
  {
    aria: string;
    login: string;
    book: string;
    chatAria: string;
    menuAria: string;
    items: { href: string; label: string }[];
  }
> = {
  ru: {
    aria: "Основная навигация",
    login: "Войти",
    book: "Забронировать",
    chatAria: "Открыть AI-чат",
    menuAria: "Меню",
    items: [
      { href: "/", label: "Главная" },
      { href: "/park", label: "Парк" },
      { href: "/attraktionen", label: "Зоны" },
      { href: "/buchung", label: "Бронь" },
      { href: "/kontakt", label: "AI-чат" },
    ],
  },
  en: {
    aria: "Primary navigation",
    login: "Login",
    book: "Book",
    chatAria: "Open AI chat",
    menuAria: "Menu",
    items: [
      { href: "/", label: "Home" },
      { href: "/park", label: "Park" },
      { href: "/attraktionen", label: "Zones" },
      { href: "/buchung", label: "Booking" },
      { href: "/kontakt", label: "AI chat" },
    ],
  },
  de: {
    aria: "Hauptnavigation",
    login: "Login",
    book: "Buchen",
    chatAria: "AI-Chat öffnen",
    menuAria: "Menü",
    items: [
      { href: "/", label: "Start" },
      { href: "/park", label: "Park" },
      { href: "/attraktionen", label: "Zonen" },
      { href: "/buchung", label: "Buchung" },
      { href: "/kontakt", label: "AI-Chat" },
    ],
  },
  tr: {
    aria: "Ana gezinme",
    login: "Giriş",
    book: "Rezervasyon",
    chatAria: "AI sohbeti aç",
    menuAria: "Menü",
    items: [
      { href: "/", label: "Ana sayfa" },
      { href: "/park", label: "Park" },
      { href: "/attraktionen", label: "Alanlar" },
      { href: "/buchung", label: "Rezervasyon" },
      { href: "/kontakt", label: "AI sohbet" },
    ],
  },
};

export function Navbar() {
  const { language } = useLanguagePreference();
  const copy = navCopy[language];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-950/10 bg-[#fbfaf5]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <BrandLogo />
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label={copy.aria}>
          {copy.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-10 items-center text-xs font-black uppercase tracking-[0.16em] text-emerald-950/62 transition hover:text-emerald-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">{copy.login}</Link>
          </Button>
          <Button asChild className="bg-emerald-900 hover:bg-emerald-800">
            <Link href="/buchung">
              <CalendarCheck className="size-4" />
              {copy.book}
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher compact />
          <Button asChild size="icon" variant="outline" aria-label={copy.chatAria}>
            <Link href="/kontakt">
              <MessageCircle className="size-4" />
            </Link>
          </Button>
          <Button asChild size="icon" variant="outline" aria-label={copy.menuAria}>
            <Link href="/park">
              <Menu className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
