"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarCheck, Menu, MessageCircle, X } from "lucide-react";
import { ChatWidget } from "@/components/chat/chat-widget";
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
  const [open, setOpen] = useState(false);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-950/10 bg-[#fbfaf5]/92 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-2 px-4 py-2 md:flex md:h-20 md:items-center md:justify-between md:gap-3 md:px-6 md:py-0 lg:px-8">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <BrandLogo className="min-w-0 [&>span:last-child]:min-w-0 [&>span:last-child_span:first-child]:truncate" />
          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <Button
              type="button"
              size="icon"
              variant="outline"
              aria-label={copy.chatAria}
              onClick={() => window.dispatchEvent(new CustomEvent("agropark:open-chat"))}
            >
              <MessageCircle className="size-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              aria-label={copy.menuAria}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>
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
        <div className="hidden items-center gap-3 lg:flex">
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
        <div className="flex min-w-0 items-center justify-end lg:hidden">
          <LanguageSwitcher compact />
        </div>
      </div>

      {open ? (
        <nav id="mobile-menu" aria-label={copy.aria} className="border-t border-emerald-950/10 bg-[#fbfaf5] px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {copy.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-lg px-3 text-sm font-black uppercase tracking-[0.12em] text-emerald-950/72 transition hover:bg-emerald-950/6 hover:text-emerald-900"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button asChild variant="outline">
                <Link href="/login" onClick={() => setOpen(false)}>{copy.login}</Link>
              </Button>
              <Button asChild className="bg-emerald-900 hover:bg-emerald-800">
                <Link href="/buchung" onClick={() => setOpen(false)}>
                  <CalendarCheck className="size-4" />
                  {copy.book}
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
    <ChatWidget hideMobileTrigger />
    </>
  );
}
