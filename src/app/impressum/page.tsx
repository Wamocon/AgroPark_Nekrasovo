import { PageShell } from "@/components/layout/page-shell";

export default function ImpressumPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Impressum</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral max-w-none">
            <p>Stand: Juni 2026</p>
            <h2 className="text-2xl font-bold">WAMOCON GmbH</h2>
            <p>
              Mergenthalerallee 79 - 81
              <br />
              65760 Eschborn
              <br />
              Deutschland
            </p>
            <h3 className="text-xl font-bold">Kontakt</h3>
            <p>
              Telefon: +49 6196 5838311
              <br />
              E-Mail: info@wamocon.com
              <br />
              Projektkontakt: info@agroparknp.ru
            </p>
            <h3 className="text-xl font-bold">Vertretungsberechtigter Geschäftsführer</h3>
            <p>Dipl.-Ing. Waleri Moretz</p>
            <h3 className="text-xl font-bold">Registereintrag</h3>
            <p>
              Sitz der Gesellschaft: Eschborn
              <br />
              Handelsregister: Eschborn HRB 123666
              <br />
              Umsatzsteuer-Identifikationsnummer: DE344930486
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
