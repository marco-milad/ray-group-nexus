import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/section-header";
import { aboutCopy } from "@/data/en/about";

export function ValuesSection() {
  const { values } = aboutCopy;
  return (
    <Section bg="bg-[color:var(--rl-light-bg)]">
      <SectionHeader eyebrow={values.eyebrow} headline={values.headline} />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.items.map((v) => (
          <div
            key={v.key}
            className="rounded-2xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="text-3xl" aria-hidden>
              {v.icon}
            </div>
            <div className="mt-4 text-lg font-semibold text-foreground">{v.title}</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
