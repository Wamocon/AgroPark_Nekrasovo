# AgroPark Nekrasovo – Digitale Transformation

Eine moderne Next.js 16 Webanwendung für AgroPark Nekrasovo. Die App transformiert das ursprüngliche statische Strategiepapier in eine interaktive, KI-gestützte Plattform mit Buchungssystem, Dashboard und Multi-Role-Login.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (manuelles Setup)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts (Dashboard) + originale SVGs (Marketing)
- **AI:** OpenAI-kompatible API über serverseitigen Proxy
- **Auth:** Demo-Cookie-Session (Admin, Manager, Staff, Visitor)

## Neu implementierte Features

### Marketing-Site
- Startseite mit animiertem Hero, 3D-Dashboard-Mockup und Scroll-Animationen
- Alle Inhalte des ursprünglichen Strategiepapiers übernommen
- Marktanalyse, Kundenanalyse, Tech-Architektur, Marketingstrategie, Roadmap, Investition
- Unterseiten: Park, Attraktionen, Kontakt, Impressum, Datenschutz, AGB
- SEO: Sitemap, robots.txt, strukturierte Daten

### KI-Chatbot
- Floating-Chat-Widget auf allen Seiten
- Serverseitiger Proxy zu `https://sokrates.test-qualitaetsmanagement.com/api`
- API-Key niemals clientseitig sichtbar
- Fallback-Modus für Demo-Zwecke (wenn API nicht erreichbar)

### Authentifizierung & Rollen
- Demo-Login mit 4 Rollen:
  - `admin@agropark.demo` / `password`
  - `manager@agropark.demo` / `password`
  - `staff@agropark.demo` / `password`
  - `visitor@agropark.demo` / `password`
- Geschütztes Dashboard

### Dashboard
- KPI-Karten (Buchungen, Umsatz, Auslastung, Anfragen)
- Buchungs- und Umsatzcharts
- Kanal-Attribution
- Live-Aktivitätsfeed
- Schnellzugriff zu Buchung, Kunden, Chat, Einstellungen

### Buchungssystem
- 3-Schritt-Buchung: Termin → Tickets → Bestätigung
- Tickettypen: Erwachsene, Kinder, Familie, Gruppenführung
- QR-Code-Platzhalter auf Bestätigungsseite

### Coming Soon
- `/membership`, `/vr-tour`, `/iot`, `/shop`, `/workshops`
- Mit Waitlist-Formular und Roadmap-Phase

### Qualitäts-Gates
- `npm run typecheck` – TypeScript strikt
- `npm run lint` – ESLint
- `npm run build` – Produktionsbuild
- `npm test` – Smoke-Test mit Datei-, Type-, Lint- und Build-Prüfung
- `node scripts/screenshots.mjs` – Visuelle Regressionstests via Playwright

## Quick Start

```bash
# Abhängigkeiten installieren
npm install

# Umgebungsvariablen einrichten
cp .env.example .env.local
# Fügen Sie AI_API_URL und AI_API_KEY in .env.local ein

# Dev-Server starten
npm run dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000).

## Wichtige Scripts

| Befehl | Beschreibung |
|--------|--------------|
| `npm run dev` | Entwicklungsserver (Turbopack) |
| `npm run build` | Produktionsbuild |
| `npm run start` | Produktionsserver |
| `npm run typecheck` | TypeScript-Prüfung |
| `npm run lint` | ESLint |
| `npm run verify` | Typecheck + Lint + Build |
| `npm test` | Smoke-Test |

## Hinweis zur KI-API

Die lokale on-premise AI-API (`sokrates.test-qualitaetsmanagement.com`) hat beim Testen mit dem bereitgestellten Key einen `403 Forbidden`-Fehler zurückgegeben. Der Chat funktioniert trotzdem im Demo-Modus über einen intelligenten Fallback, der häufige Fragen zu Öffnungszeiten, Tickets und Attraktionen beantwortet. Sobald der API-Key die nötigen Berechtigungen hat, wird automatisch die echte API genutzt.

## Vergleich: Vorher / Nachher

- **Vorher:** Statische `proposal.html` mit reinem CSS/JS
- **Nachher:** Vollständige Next.js 16 App mit React-Komponenten, KI-Chat, Login, Dashboard, Buchung und modernen Animationen

Das ursprüngliche Strategiepapier bleibt unter `/proposal.html` erreichbar.
