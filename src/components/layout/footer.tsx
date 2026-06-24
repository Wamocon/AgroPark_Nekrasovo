import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { agroparkContact } from "@/data/agropark";

const footerLinks = [
  { href: "/park", label: "О парке" },
  { href: "/attraktionen", label: "Зоны и программы" },
  { href: "/buchung", label: "Бронирование" },
  { href: "/kontakt", label: "AI и контакты" },
  { href: "/login", label: "CRM вход" },
  { href: "/proposal.html", label: "Презентация" },
];

export function Footer() {
  return (
    <footer className="border-t border-emerald-950/10 bg-[#f7f4ea] text-emerald-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:px-8">
        <div>
          <BrandLogo />
          <p className="mt-5 max-w-md text-sm leading-7 text-emerald-950/64">
            Цифровой сервис АгроПарка Некрасово поле: зоны отдыха, бронирование, AI-чат, контакты и панель команды.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Навигация</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="inline-flex min-h-10 items-center text-emerald-950/68 transition hover:text-emerald-900">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Контакты</h2>
          <div className="mt-4 space-y-3 text-sm text-emerald-950/68">
            <a href={agroparkContact.phoneHref} className="flex min-h-10 items-center gap-2 hover:text-emerald-900">
              <Phone className="mt-0.5 size-4" />
              {agroparkContact.phone}
            </a>
            <a href={agroparkContact.emailHref} className="flex min-h-10 items-center gap-2 hover:text-emerald-900">
              <Mail className="mt-0.5 size-4" />
              {agroparkContact.email}
            </a>
            <span className="flex min-h-10 items-center gap-2">
              <MessageCircle className="mt-0.5 size-4" />
              Telegram {agroparkContact.telegram}
            </span>
            <span className="flex min-h-10 items-center gap-2">
              <MapPin className="mt-0.5 size-4" />
              {agroparkContact.region}
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-emerald-950/10 px-4 py-5 text-center text-xs text-emerald-950/52">
        © 2026 Некрасово поле. Онлайн-сервис для гостей и команды парка.
      </div>
    </footer>
  );
}
