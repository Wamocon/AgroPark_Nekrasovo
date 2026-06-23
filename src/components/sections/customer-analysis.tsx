import { SectionHeader } from "@/components/sections/section-header";

const audiences = [
  "Families planning a weekend visit",
  "Teachers organizing school programs",
  "Companies booking team workshops",
  "Park staff managing requests and capacity",
];

export function CustomerAnalysis() {
  return (
    <section id="customers" className="bg-emerald-950 px-5 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="02"
          title="Customer Segments"
          description="The application is structured around practical user journeys: discover, ask, book, confirm and operate."
          dark
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <div
              key={audience}
              className="rounded-2xl border border-white/12 bg-white/8 p-5 text-sm font-semibold text-white/86"
            >
              {audience}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
