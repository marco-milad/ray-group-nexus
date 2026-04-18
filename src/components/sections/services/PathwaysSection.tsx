import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { getPathwaysSorted } from "@/data/en/pathways";
import { servicesCopy } from "@/data/en/servicesPage";
import { globalCopy } from "@/data/en/global";

export function PathwaysSection() {
  const items = getPathwaysSorted();
  return (
    <SectionShell bg="bg-muted/30">
      <SectionHeader
        eyebrow={servicesCopy.pathways.eyebrow}
        headline={servicesCopy.pathways.headline}
        subheadline="Comprehensive diagnostic packages organised around how patients are referred and how clinicians practise."
      />

      {items.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          {globalCopy.errors.emptyState}
        </p>
      ) : (
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold text-white"
                style={{ backgroundColor: "var(--rl-green)" }}
                aria-hidden
              >
                {p.name.charAt(0)}
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <div className="mt-3 text-[11px] font-medium text-foreground/60">
                {p.serviceIds.length} services
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
