import * as React from "react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { networkCopy } from "@/data/en/network";

export function BrandDistributionSection() {
  const { brandDistribution } = networkCopy;
  const max = Math.max(...brandDistribution.items.map((i) => i.branches), 1);

  const [animated, setAnimated] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <SectionShell bg="bg-background">
      <Reveal>
        <SectionHeader
          eyebrow={brandDistribution.eyebrow}
          headline={brandDistribution.headline}
          subheadline={brandDistribution.subheadline}
        />
      </Reveal>

      <div ref={ref} className="mx-auto mt-12 max-w-3xl space-y-6">
        {brandDistribution.items.map((b, i) => {
          const pct = (b.branches / max) * 100;
          const note = "note" in b ? b.note : undefined;

          return (
            <Reveal key={b.brand} delay={i * 80}>
              <div className="group">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: b.color }}
                    />
                    <span className="text-sm font-semibold text-foreground">{b.brand}</span>
                    <span className="text-xs text-muted-foreground">{b.country}</span>
                  </div>
                  <span className="text-sm font-bold tabular-nums" style={{ color: b.color }}>
                    {b.branches === 0 ? "—" : b.branches}
                  </span>
                </div>

                {/* Bar */}
                <div className="h-3 overflow-hidden rounded-full bg-border/40">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: animated ? `${Math.max(pct, b.branches === 0 ? 2 : 3)}%` : "0%",
                      backgroundColor: b.color,
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                </div>

                {note && <p className="mt-1 text-xs italic text-muted-foreground">{note}</p>}
              </div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
