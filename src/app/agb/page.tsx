import { PageShell } from "@/components/layout/page-shell";

export default function AGBPage() {
 return (
 <PageShell>
 <section className="bg-gradient-to-br from-green-900 to-green-800 py-20 text-white">
 <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
 <h1 className="text-4xl font-black tracking-tight sm:text-5xl">AGB</h1>
 </div>
 </section>
 <section className="py-16">
 <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
 <div className="prose prose-neutral max-w-none">
 <p>Stand: Juni 2026</p>
 <h2 className="text-2xl font-bold">§ 1 Geltungsbereich</h2>
 <p>
 Diese Allgemeinen Geschäftsbedingungen der WAMOCON GmbH gelten für alle
 Verträge über die Nutzung der Software-as-a-Service-Plattform AgroPark
 Nekrasovo, die über die Website agroparknekrasovo.ru bereitgestellt wird.
 </p>
 <h2 className="text-2xl font-bold">§ 2 Vertragsschluss</h2>
 <p>
 Die Darstellung der Plattform stellt kein verbindliches Angebot dar. Der
 Auftraggeber gibt ein verbindliches Angebot ab, indem er den
 Registrierungsprozess abschließt und diese AGB akzeptiert.
 </p>
 <h2 className="text-2xl font-bold">§ 3 Leistungsbeschreibung</h2>
 <p>
 Der Anbieter stellt dem Auftraggeber die Plattform als SaaS über das
 Internet zur Verfügung. Der genaue Funktionsumfang ergibt sich aus der
 jeweils aktuellen Leistungsbeschreibung auf der Website.
 </p>
 <h2 className="text-2xl font-bold">§ 4 Nutzungsrechte</h2>
 <p>
 Der Anbieter räumt dem Auftraggeber für die Vertragslaufzeit ein
 einfaches, nicht übertragbares Recht zur Nutzung der Plattform ein.
 </p>
 <h2 className="text-2xl font-bold">§ 5 Datenschutz</h2>
 <p>
 Die Verarbeitung personenbezogener Daten erfolgt gemäß der
 Datenschutzerklärung des Anbieters und den Bestimmungen der DSGVO.
 </p>
 </div>
 </div>
 </section>
 </PageShell>
 );
}
