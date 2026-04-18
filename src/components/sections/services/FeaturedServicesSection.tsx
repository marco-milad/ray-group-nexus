import { Sparkles } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { getFeaturedServices } from "@/data/en/services";
import { brands } from "@/data/en/brands";
import { BrandChip } from "@/components/ui/brand-chip";
import { servicesCopy } from "@/data/en/servicesPage";

export function FeaturedServicesSection() {
  const featured = getFeaturedServices();
  if (featured.length === 0) return null;

  return (
    <SectionShell bg="bg-muted/30">
      <SectionHeader
        eyebrow="Featured"
        headline="Flagship Diagnostic Services"
        subheadline="Our most-utilised services — proven across the network."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((s) => (
          <article
            key={s.id}
            className="flex flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" style={{ color: "var(--rl-green)" }} />
              <span
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--rl-green)" }}
              >
                Featured
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-foreground">{s.name}</h3>
            <p className="mt-1 text-sm font-medium text-foreground/70">{s.highlight}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {s.description}
            </p>
            <div className="mt-5 pt-4 border-t border-border/60">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {servicesCopy.availableAt}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {s.availableAt.map((slug) => {
                  const b = brands.find((x) => x.slug === slug);
                  if (!b) return null;
                  return <BrandChip key={slug} name={b.name} color={b.color} />;
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
