import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/section-header";
import { aboutCopy } from "@/data/en/about";

export function TechPartnersSection() {
  const { techPartners } = aboutCopy;
  return (
    <Section bg="bg-[color:var(--rl-light-bg)]">
      <SectionHeader
        eyebrow={techPartners.eyebrow}
        headline={techPartners.headline}
        subheadline={techPartners.subheadline}
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {techPartners.partners.map((p) => (
          <div
            key={p.shortName}
            className="rounded-2xl border border-border/60 bg-card p-6 text-center"
          >
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {p.shortName}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
              {p.name}
            </div>
            <div
              className="mt-4 text-xs font-medium"
              style={{ color: "var(--rl-green)" }}
            >
              {p.modalities}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
