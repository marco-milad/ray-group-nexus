import * as React from "react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/ui/reveal";
import { categories } from "@/data/en/categories";
import { getServicesByCategory, getServicesSortedByPriority } from "@/data/en/services";
import { brands } from "@/data/en/brands";
import { servicesCopy } from "@/data/en/servicesPage";
import { globalCopy } from "@/data/en/global";

export function CategoryTabsSection() {
  const sorted = [...categories].sort((a, b) => a.order - b.order);
  const first = sorted[0]?.id ?? "imaging";

  return (
    <SectionShell>
      <Reveal>
        <SectionHeader
          eyebrow={servicesCopy.browse.eyebrow}
          headline={servicesCopy.browse.headline}
        />
      </Reveal>

      <Tabs defaultValue={first} className="mt-10 w-full">
        <Reveal delay={80}>
          <TabsList className="mx-auto flex h-auto w-full max-w-5xl flex-wrap justify-center gap-1.5 bg-muted/60 p-1.5">
            {sorted.map((c) => (
              <TabsTrigger
                key={c.id}
                value={c.id}
                className="text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:font-semibold"
                style={{
                  ["--tw-ring-color" as string]: "var(--rl-green)",
                }}
              >
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Reveal>

        {sorted.map((c) => {
          const items = getServicesSortedByPriority(getServicesByCategory(c.id));
          return (
            <TabsContent key={c.id} value={c.id} className="mt-8">
              <Reveal>
                <div className="mx-auto max-w-3xl text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground">{c.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                </div>
              </Reveal>

              {items.length === 0 ? (
                <p className="mt-10 text-center text-muted-foreground">
                  {globalCopy.errors.emptyState}
                </p>
              ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((s, i) => (
                    <Reveal key={s.id} delay={i * 60}>
                      <ServiceCard service={s} />
                    </Reveal>
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

function ServiceCard({
  service: s,
}: {
  service: ReturnType<typeof getServicesSortedByPriority>[number];
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <article
      className="flex flex-col rounded-xl border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md h-full cursor-default"
      style={{
        borderTopColor: "var(--rl-green)",
        borderTopWidth: "2px",
        borderColor: hovered ? "rgba(79,153,7,0.3)" : undefined,
        backgroundColor: hovered ? "rgba(79,153,7,0.02)" : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Name */}
      <h4 className="text-base font-semibold text-foreground">{s.name}</h4>

      {/* Highlight */}
      <p
        className="mt-1 text-xs font-semibold transition-all duration-300"
        style={{
          color: "var(--rl-green)",
          fontSize: hovered ? "0.8rem" : "0.75rem",
        }}
      >
        {s.highlight}
      </p>

      {/* Description */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>

      {/* Available at */}
      <div className="mt-4 pt-3 border-t border-border/60">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
          {servicesCopy.availableAt}
        </div>
        <div className="flex flex-wrap gap-1">
          {s.availableAt.map((slug, idx) => {
            const b = brands.find((x) => x.slug === slug);
            if (!b) return null;
            return (
              <span
                key={slug}
                className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium transition-all duration-200"
                style={{
                  borderColor: `${b.color}40`,
                  color: b.color,
                  backgroundColor: `${b.color}10`,
                  opacity: hovered ? 1 : 0.75,
                  transform: hovered ? "translateY(0)" : "translateY(2px)",
                  transitionDelay: hovered ? `${idx * 40}ms` : "0ms",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: b.color }} />
                {b.name}
              </span>
            );
          })}
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="mt-3 h-px rounded-full transition-all duration-500"
        style={{
          width: hovered ? "100%" : "1.5rem",
          backgroundColor: "var(--rl-green)",
          opacity: 0.3,
        }}
      />
    </article>
  );
}
