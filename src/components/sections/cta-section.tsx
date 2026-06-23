import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-emerald-950 py-16 text-white sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xs font-black uppercase text-emerald-200">Next step</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Besuch planen oder Demo prüfen</h2>
          <p className="mt-4 max-w-2xl text-white/75">
            Testen Sie Buchung, CRM, Chat und Pitch als zusammenhängenden Demo-Flow.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="rounded-lg bg-white px-5 py-3 text-sm font-black text-emerald-950" href="/buchung">Buchung testen</Link>
          <Link className="rounded-lg border border-white/20 px-5 py-3 text-sm font-black text-white" href="/proposal.html">Pitch Deck öffnen</Link>
        </div>
      </div>
    </section>
  );
}
