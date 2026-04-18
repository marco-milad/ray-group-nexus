import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories } from "@/data/en/categories";
import { getServicesByCategory, getServicesSortedByPriority } from "@/data/en/services";
import { brands } from "@/data/en/brands";
import { BrandChip } from "@/components/ui/brand-chip";
import { servicesCopy } from "@/data/en/servicesPage";
import { globalCopy } from "@/data/en/global";

export function CategoryTabsSection() {
  const sorted = [...categories].sort((a, b) => a.order - b.order);
  const first = sorted[0]?.id ?? "imaging";

  return (
    <SectionShell>
      <SectionHeader
        eyebrow={servicesCopy.browse.eyebrow}
        headline={servicesCopy.browse.headline}
      />

      <Tabs defaultValue={first} className="mt-10 w-full">
        <TabsList className="mx-auto flex h-auto w-full max-w-5xl flex-wrap justify-center gap-1.5 bg-muted/60 p-1.5">
          {sorted.map((c) => (
            <TabsTrigger
              key={c.id}
              value={c.id}
              className="text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              {c.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {sorted.map((c) => {
          const items = getServicesSortedByPriority(getServicesByCategory(c.id));
          return (
            <TabsContent key={c.id} value={c.id} className="mt-8">
              <div className="mx-auto max-w-3xl text-center">
                <h3 className="text-2xl font-bold text-foreground">{c.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
              </div>

              {items.length === 0 ? (
                <p className="mt-10 text-center text-muted-foreground">
                  {globalCopy.errors.emptyState}
                </p>
              ) : (
                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((s) => (
                    <article
                      key={s.id}
                      className="flex flex-col rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <h4 className="text-base font-semibold text-foreground">{s.name}</h4>
                      <p
                        className="mt-1 text-xs font-medium"
                        style={{ color: "var(--rl-green)" }}
                      >
                        {s.highlight}
                      </p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                      <div className="mt-4 pt-3 border-t border-border/60">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {servicesCopy.availableAt}
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-1">
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
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </SectionShell>
  );
}
