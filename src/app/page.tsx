import { PageShell } from "@/components/layout/page-shell";
import { Hero } from "@/components/sections/hero";
import { ExecutiveSummary } from "@/components/sections/executive-summary";
import { PlatformSnapshot } from "@/components/sections/platform-snapshot";
import { CTASection } from "@/components/sections/cta-section";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "AgroPark Nekrasovo",
  description:
    "Saisonaler Agritourismus-Park in der Kaliningrader Oblast mit Maisfeld-Labyrinth, Maschinenmuseum, Tierbereichen, Restaurant, Grillkuppeln und digitaler Buchungsdemo.",
  url: "https://agroparknekrasovo.ru",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Kaliningrader Oblast",
    addressCountry: "RU",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-911-474-30-04",
    email: "info@agroparknp.ru",
    contactType: "customer support",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    opens: "10:00",
    closes: "19:00",
    validFrom: "2026-05-01",
    validThrough: "2026-09-30",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageShell>
        <Hero />
        <ExecutiveSummary />
        <PlatformSnapshot />
        <CTASection />
      </PageShell>
    </>
  );
}
