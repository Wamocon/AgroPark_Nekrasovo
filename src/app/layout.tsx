import type { Metadata } from "next";
import "./globals.css";
import { CookieConsent } from "@/components/legal/cookie-consent";
import { agroparkContact } from "@/data/agropark";
export const metadata: Metadata = {
  metadataBase: new URL("https://agro-park-nekrasovo.vercel.app"),
  title: "Некрасово поле | АгроПарк и онлайн-бронирование",
  description: "Современный цифровой сервис АгроПарка Некрасово поле: парк, зоны отдыха, бронирование, AI-чат, контакты и панель команды.",
  keywords: ["АгроПарк Некрасово поле", "Некрасово поле", "гриль-купола", "Калининград", "AI чат", "бронирование"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Некрасово поле",
    title: "Некрасово поле | АгроПарк и онлайн-бронирование",
    description: "Парк, зоны отдыха, гриль-купола, события, AI-чат и онлайн-бронирование АгроПарка Некрасово поле.",
    url: "/",
    images: [{ url: "/client-assets/agropark/park-panorama.png", width: 1200, height: 630, alt: "АгроПарк Некрасово поле" }],
  },
  twitter: { card: "summary_large_image", title: "Некрасово поле | АгроПарк", description: "Парк, гриль-купола, события и онлайн-бронирование АгроПарка Некрасово поле." },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "АгроПарк «Некрасово поле»",
  url: "https://agro-park-nekrasovo.vercel.app/",
  image: "https://agro-park-nekrasovo.vercel.app/client-assets/agropark/park-panorama.png",
  telephone: agroparkContact.phone,
  email: agroparkContact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "пос. Некрасово",
    addressRegion: "Калининградская область",
    addressCountry: "RU",
  },
  openingHours: "Tu-Su 10:00-19:00",
  priceRange: "2300–13200 ₽",
  sameAs: [agroparkContact.websiteHref, agroparkContact.vkHref, agroparkContact.telegramHref, agroparkContact.maxHref],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        {children}
        <CookieConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
