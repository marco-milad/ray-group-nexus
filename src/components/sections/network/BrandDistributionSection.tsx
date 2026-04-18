import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/section-header";
import { networkCopy } from "@/data/en/network";

export function BrandDistributionSection() {
  const { brandDistribution } = networkCopy;
  const max = Math.max(...brandDistribution.items.map((i) => i.branches), 1);

  return (
    <Section bg="bg-muted/30">
      <SectionHeader
        eyebrow={brandDistribution.eyebrow}
        headline={brandDistribution.headline}
        subheadline={brandDistribution.subheadline}
      />
      <div className="mx-auto mt-12 max-w-3xl space-y-5">
        {brandDistribution.items.map((b) => {
          const pct = (b.branches / max) * 100;
          return (
            <div key={b.brand}>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-semibold text-foreground">
                    {b.brand}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {b.country}
                  </span>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {b.branches}
                </span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-border/60">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.max(pct, 3)}%`,
                    backgroundColor: b.color,
                  }}
                />
              </div>
              {b.note && (
                <p className="mt-1 text-xs italic text-muted-foreground">
                  {b.note}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
