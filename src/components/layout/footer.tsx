import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Park: [
    { href: "/park", label: "Der Park" },
    { href: "/attraktionen", label: "Attraktionen" },
    { href: "/buchung", label: "Tickets buchen" },
  ],
  Unternehmen: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/kontakt", label: "Kontakt" },
    { href: "/impressum", label: "Impressum" },
  ],
  Rechtliches: [
    { href: "/datenschutz", label: "Datenschutz" },
    { href: "/agb", label: "AGB" },
    { href: "/proposal.html", label: "Original Strategiepapier" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-green-900">
              <Leaf className="size-5 text-accent-500" />
              <span className="text-sm font-extrabold tracking-tight">
                AGROPARK <span className="text-accent-500">DIGITAL</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Die digitale Transformationsplattform für AgroPark Nekrasovo.
              Weniger Aufwand. Mehr Buchungen. Bessere Übersicht.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <a
                href="mailto:info@agroparknp.ru"
                className="flex items-center gap-2 transition-colors hover:text-green-900"
              >
                <Mail className="size-4" />
                info@agroparknp.ru
              </a>
              <a
                href="tel:+79114743004"
                className="flex items-center gap-2 transition-colors hover:text-green-900"
              >
                <Phone className="size-4" />
                +7 (911) 474-30-04
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="size-4" />
                Kaliningrader Oblast
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                {category}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-green-900"
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
            © {new Date().getFullYear()} AgroPark Nekrasovo. Alle Rechte
            vorbehalten.
          </p>
          <p className="text-xs text-muted-foreground">
            Konzept & Umsetzung: WAMOCON GmbH
          </p>
        </div>
      </div>
    </footer>
  );
}
