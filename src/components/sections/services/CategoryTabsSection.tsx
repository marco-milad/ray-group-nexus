import * as React from "react";
import { Scan, Activity, Heart, HeartPulse, Zap, FlaskConical, Monitor } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/ui/reveal";
import { categories } from "@/data/en/categories";
import { getServicesByCategory, getServicesSortedByPriority } from "@/data/en/services";
import { brands } from "@/data/en/brands";
import { servicesCopy } from "@/data/en/servicesPage";
import { globalCopy } from "@/data/en/global";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "scan":          Scan,
  "activity":      Activity,
  "heart":         Heart,
  "heartpulse":    HeartPulse,
  "zap":           Zap,
  "flask-conical": FlaskConical,
  "monitor":       Monitor,
};

export function CategoryTabsSection() {
  const sorted = [...categories].sort((a, b) => a.order - b.order);
  const first  = sorted[0]?.id ?? "imaging";
  const [active, setActive] = React.useState(first);

  return (
<SectionShell bg="bg-[color:var(--rl-light-bg)]">      <Reveal>
        <SectionHeader
          eyebrow={servicesCopy.browse.eyebrow}
          headline={servicesCopy.browse.headline}
        />
      </Reveal>

      <Tabs value={active} onValueChange={setActive} className="mt-10 w-full">
        {/* Tabs bar */}
        <Reveal delay={80}>
          <div
            className="sticky top-16 z-40 rounded-2xl p-2 mb-8 overflow-x-auto border border-border/60 bg-card shadow-sm"
            style={{
              maskImage: "linear-gradient(to right, black 85%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, black 85%, transparent)",
            }}
          >
            <TabsList className="inline-flex h-auto w-max min-w-full justify-start gap-1 bg-transparent p-0 sm:flex-wrap sm:justify-center">
              {sorted.map((c) => {
                const isActive = active === c.id;
                const Icon     = CATEGORY_ICONS[c.icon] ?? Scan;
                return (
                  <TabsTrigger
                    key={c.id}
                    value={c.id}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-xs transition-all duration-200 cursor-pointer"
                    style={{
                      backgroundColor: isActive ? "var(--rl-green)" : "transparent",
                      color:           isActive ? "white" : "var(--rl-muted)",
                      boxShadow:       isActive ? "0 2px 8px rgba(79,153,7,0.4)" : "none",
                      fontWeight:      isActive ? "700" : "600",
                      transform:       isActive ? "scale(1.03)" : "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "rgba(79,153,7,0.08)";
                        e.currentTarget.style.color = "var(--rl-green)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--rl-muted)";
                      }
                    }}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {c.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </Reveal>

        {sorted.map((c) => {
          const items = getServicesSortedByPriority(getServicesByCategory(c.id));
          return (
            <TabsContent key={c.id} value={c.id} className="mt-0">
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
        borderTopColor:  "var(--rl-green)",
        borderTopWidth:  "2px",
        borderColor:     hovered ? "rgba(79,153,7,0.3)" : undefined,
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
          color:    "var(--rl-green)",
          fontSize: hovered ? "0.8rem" : "0.75rem",
        }}
      >
        {s.highlight}
      </p>

      {/* Description */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {s.description}
      </p>

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
                  borderColor:     `${b.color}40`,
                  color:           b.color,
                  backgroundColor: `${b.color}10`,
                  opacity:         hovered ? 1 : 0.75,
                  transform:       hovered ? "translateY(0)" : "translateY(2px)",
                  transitionDelay: hovered ? `${idx * 40}ms` : "0ms",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: b.color }}
                />
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
          width:           hovered ? "100%" : "1.5rem",
          backgroundColor: "var(--rl-green)",
          opacity:         0.3,
        }}
      />
    </article>
  );
}