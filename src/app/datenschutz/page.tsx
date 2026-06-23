import { PageShell } from "@/components/layout/page-shell";

export default function DatenschutzPage() {
 return (
 <PageShell>
 <section className="bg-gradient-to-br from-green-900 to-green-800 py-20 text-white">
 <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
 <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Datenschutz</h1>
 </div>
 </section>
 <section className="py-16">
 <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
 <div className="prose prose-neutral max-w-none">
 <p>Stand: Juni 2026</p>
 <h2 className="text-2xl font-bold">1. Verantwortlicher</h2>
 <p>
 WAMOCON GmbH
 <br />
 Mergenthalerallee 79 - 81
 <br />
 65760 Eschborn
 <br />
 E-Mail: info@wamocon.com
 <br />
 Geschäftsführer: Dipl.-Ing. Waleri Moretz
 <br />
 Handelsregister: Eschborn HRB 123666
 <br />
 USt-ID: DE344930486
 </p>
 <h2 className="text-2xl font-bold">2. Überblick über die Datenverarbeitung</h2>
 <p>
 Diese Datenschutzerklärung gilt für die Website und Webanwendung
 AgroPark Nekrasovo. Wir verarbeiten personenbezogene Daten unserer
 Nutzer nur, soweit dies zur Bereitstellung einer funktionsfähigen
 Plattform erforderlich ist.
 </p>
 <h2 className="text-2xl font-bold">3. Rechtsgrundlagen</h2>
 <ul className="list-disc pl-5">
 <li>Einwilligung - Art. 6 Abs. 1 lit. a DSGVO</li>
 <li>Vertragserfüllung - Art. 6 Abs. 1 lit. b DSGVO</li>
 <li>Rechtliche Verpflichtung - Art. 6 Abs. 1 lit. c DSGVO</li>
 <li>Berechtigtes Interesse - Art. 6 Abs. 1 lit. f DSGVO</li>
 </ul>
 <h2 className="text-2xl font-bold">4. Hosting und Infrastruktur</h2>
 <p>
 Die Website wird über Vercel gehostet. Für Datenbank und Authentifizierung
 wird Supabase genutzt. Verarbeitet werden technisch notwendige
 Verbindungsdaten gemäß Art. 6 Abs. 1 lit. f DSGVO.
 </p>
 </div>
 </div>
 </section>
 </PageShell>
 );
}
