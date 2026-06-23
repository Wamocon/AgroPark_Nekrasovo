import { SectionHeader } from "@/components/sections/section-header";

const pillars = [
  "Problem clarity",
  "Operational value",
  "Commercial leverage",
  "Implementation credibility",
];

export function ConsultantFramework() {
  return (
    <section id="framework" className="bg-white px-5 py-20 text-neutral-950">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="07"
          title="Consultant Framework"
          description="The pitch is framed around the questions stakeholders actually ask: why now, why this product and how it becomes usable."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 font-bold">
              {pillar}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
