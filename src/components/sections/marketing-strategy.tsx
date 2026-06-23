import { SectionHeader } from "@/components/sections/section-header";

const motions = [
  "Local SEO pages for attractions, workshops and group visits",
  "Conversion path from public homepage to booking and contact",
  "Assistant answers for opening hours, prices and visit planning",
  "Pitch deck for partners, operators and investment conversations",
];

export function MarketingStrategy() {
  return (
    <section id="strategy" className="bg-neutral-50 px-5 py-20 text-neutral-950">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="03"
          title="Go To Market Strategy"
          description="The product combines a polished public website, searchable service pages and a working operational demo."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {motions.map((motion) => (
            <div key={motion} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <p className="text-base font-bold">{motion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
