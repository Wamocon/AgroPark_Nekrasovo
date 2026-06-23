import { SectionHeader } from "@/components/sections/section-header";

const signals = [
  {
    label: "Demand",
    value: "Family visits, school groups, workshops",
    detail: "A seasonal park needs fast answers, clear booking paths and repeatable group handling.",
  },
  {
    label: "Operations",
    value: "Tickets, zones, events, staff roles",
    detail: "The CRM connects public demand with internal capacity planning and daily execution.",
  },
  {
    label: "Commercial",
    value: "Restaurant, grill domes, shop, memberships",
    detail: "The platform supports add-ons so revenue is not limited to entry tickets.",
  },
];

export function MarketAnalysis() {
  return (
    <section id="market" className="bg-white px-5 py-20 text-neutral-950">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="01"
          title="Market Context"
          description="AgroPark Nekrasovo needs a credible digital front door and a CRM layer that turns seasonal interest into planned visits, qualified requests and measurable operations."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {signals.map((signal) => (
            <article
              key={signal.label}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                {signal.label}
              </p>
              <h3 className="mt-3 text-xl font-black">{signal.value}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{signal.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
