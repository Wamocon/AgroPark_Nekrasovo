import { SectionHeader } from "@/components/sections/section-header";

const layers = [
  "Next.js App Router for public pages, protected routes and API handlers",
  "Offline demo data for stable presentation without external dependencies",
  "Role based login for administrator, manager, employee and visitor demos",
  "Fallback chat responses when no external AI provider is configured",
];

export function TechArchitecture() {
  return (
    <section id="architecture" className="bg-white px-5 py-20 text-neutral-950">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="04"
          title="Technical Architecture"
          description="The implementation is production oriented while remaining demo friendly for Vercel preview and stakeholder review."
        />
        <div className="space-y-3">
          {layers.map((layer) => (
            <div key={layer} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="font-semibold">{layer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
