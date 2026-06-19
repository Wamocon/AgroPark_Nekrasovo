import { PageShell } from "@/components/layout/page-shell";
import { Hero } from "@/components/sections/hero";
import { ConsultantFramework } from "@/components/sections/consultant-framework";
import { MarketAnalysis } from "@/components/sections/market-analysis";
import { CustomerAnalysis } from "@/components/sections/customer-analysis";
import { TechArchitecture } from "@/components/sections/tech-architecture";
import { MarketingStrategy } from "@/components/sections/marketing-strategy";
import { Roadmap } from "@/components/sections/roadmap";
import { Investment } from "@/components/sections/investment";
import { CTASection } from "@/components/sections/cta-section";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "AgroPark Nekrasovo",
  description:
    "Saisonaler Agritourismus-Park in der Kaliningrader Oblast mit Maisfeld-Labyrinth, Maschinenmuseum, Tierbereichen, Restaurant und Grillkuppeln.",
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
    opens: "09:00",
    closes: "18:00",
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
        <ConsultantFramework />
        <MarketAnalysis />
        <CustomerAnalysis />
        <TechArchitecture />
        <MarketingStrategy />
        <Roadmap />
        <Investment />
        <CTASection />
      </PageShell>
    </>
  );
}
