import { SectionHeader } from "@/components/sections/section-header";

const benefits = [
  { label: "Revenue", text: "Online booking and add-on offers increase conversion before visitors arrive." },
  { label: "Efficiency", text: "One dashboard reduces manual request handling and status ambiguity." },
  { label: "Trust", text: "A state-of-the-art pitch and public app create a stronger investor narrative." },
];

export function Investment() {
  return (
    <section id="investment" className="bg-emerald-950 px-5 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="05"
          title="Investment Case"
          description="The platform turns AgroPark Nekrasovo from a static presence into an operational sales and service system."
          dark
        />
        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article key={benefit.label} className="rounded-2xl border border-white/12 bg-white/8 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-200">
                {benefit.label}
              </p>
              <p className="mt-4 text-base leading-7 text-white/82">{benefit.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
