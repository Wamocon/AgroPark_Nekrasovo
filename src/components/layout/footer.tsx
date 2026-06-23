import Link from "next/link";
import { BrandLogo } from "./brand-logo";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Phone } from "lucide-react";
import { agroparkContact } from "@/data/agropark";

const footerLinks = {
 Park: [
 { href: "/park", label: "Der Park" },
 { href: "/attraktionen", label: "Attraktionen" },
 { href: "/buchung", label: "Tickets buchen" },
 ],
 Demo: [
 { href: "/login", label: "Demo-Login" },
 { href: "/dashboard", label: "CRM-Dashboard" },
 { href: "/kontakt", label: "Kontakt und Chat" },
 ],
 Pitch: [
 { href: "/proposal.html", label: "Premium Pitch Deck" },
 { href: "/", label: "Live Website" },
 { href: "/buchung", label: "Booking Demo" },
 ],
 Rechtliches: [
 { href: "/datenschutz", label: "Datenschutz" },
 { href: "/agb", label: "AGB" },
 { href: "/impressum", label: "Impressum" },
 ],
};

export function Footer() {
 return (
 <footer className="border-t border-border bg-card">
 <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
 <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
 <div className="lg:col-span-2">
 <BrandLogo className="min-h-11" />
 <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
 Digitale Demo-Plattform für AgroPark Nekrasovo mit Besucherwebsite,
 Online-Buchung, KI-Assistenz, CRM-Dashboard und Pitch Deck.
 </p>
 <div className="mt-6 space-y-3 text-sm text-muted-foreground">
 <a
 href={agroparkContact.emailHref}
 className="flex h-10 min-h-10 items-center gap-2 transition-colors hover:text-emerald-900"
 >
 <Mail className="size-4" />
 {agroparkContact.email}
 </a>
 <a
 href={agroparkContact.phoneHref}
 className="flex h-10 min-h-10 items-center gap-2 transition-colors hover:text-emerald-900"
 >
 <Phone className="size-4" />
 {agroparkContact.phone}
 </a>
 <span className="flex items-center gap-2">
 <MapPin className="size-4" />
 {agroparkContact.region}
 </span>
 </div>
 </div>

 {Object.entries(footerLinks).map(([category, links]) => (
 <div key={category}>
 <h3 className="text-sm font-bold uppercase text-foreground">{category}</h3>
 <ul className="mt-4 space-y-3">
 {links.map((link) => (
 <li key={link.href}>
 <Link
 href={link.href}
 className="inline-flex min-h-10 min-w-10 items-center px-2 text-sm text-muted-foreground transition-colors hover:text-emerald-900"
 >
 {link.label}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>

 <Separator className="my-8" />

 <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
 <p className="text-xs text-muted-foreground">
 © {new Date().getFullYear()} AgroPark Nekrasovo. Alle Rechte vorbehalten.
 </p>
 <p className="text-xs text-muted-foreground">Konzept und Umsetzung: WAMOCON GmbH</p>
 </div>
 </div>
 </footer>
 );
}
