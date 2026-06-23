import { SectionHeader } from "@/components/sections/section-header";

const milestones = [
  "Public website, pitch deck and demo CRM polish",
  "Booking analytics, group request workflow and content expansion",
  "IoT, shop, membership and workshop modules after operational validation",
];

export function Roadmap() {
  return (
    <section id="roadmap" className="bg-neutral-50 px-5 py-20 text-neutral-950">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="06"
          title="Roadmap"
          description="The roadmap keeps the demo focused today and leaves clear growth paths for production expansion."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {milestones.map((milestone, index) => (
            <article key={milestone} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-black text-emerald-700">Phase {index + 1}</p>
              <p className="mt-3 text-base font-semibold leading-7">{milestone}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
