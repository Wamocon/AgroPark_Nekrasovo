import { ChatWidget } from "@/components/chat/chat-widget";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CTASection } from "@/components/sections/cta-section";
import { ExecutiveSummary } from "@/components/sections/executive-summary";
import { Hero } from "@/components/sections/hero";
import { PlatformSnapshot } from "@/components/sections/platform-snapshot";
import { agroparkBrand, agroparkContact } from "@/data/agropark";
export default function HomePage() { const structuredData = { "@context": "https://schema.org", "@type": "TouristAttraction", name: agroparkBrand.legalName, description: agroparkBrand.tagline, telephone: agroparkContact.phone, email: agroparkContact.email, address: { "@type": "PostalAddress", addressLocality: "поселок Некрасово", addressRegion: "Калининградская область", addressCountry: "RU" }, openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "10:00", closes: "19:00" }] }; return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><Navbar /><main><Hero /><ExecutiveSummary /><PlatformSnapshot /><CTASection /></main><Footer /><ChatWidget /></>; }
