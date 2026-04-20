import * as React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { investorsCopy } from "@/data/en/investors";

export function PerformanceTab() {
  const { performance } = investorsCopy;
  const maxBranches = Math.max(...performance.growthChart.data.map((d) => d.branches), 1);

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
    <div>
      <Reveal>
        <SectionHeader
          eyebrow={performance.eyebrow}
          headline={performance.headline}
          subheadline={performance.subheadline}
        />
      </Reveal>

      {/* Metrics */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {performance.metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 80}>
            <div
              className="rounded-2xl border border-border/60 bg-card p-5 transition-all hover:shadow-md h-full"
              style={{ borderTopColor: "var(--rl-green)", borderTopWidth: "2px" }}
            >
              <div
                className="text-2xl font-bold tracking-tight"
                style={{ color: "var(--rl-green)" }}
              >
                {m.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground">{m.label}</div>
              {m.note && <div className="mt-0.5 text-xs text-muted-foreground">{m.note}</div>}
              <p className="mt-3 text-xs italic leading-relaxed text-muted-foreground">
                {m.soWhat}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Revenue breakdown */}
        <Reveal>
          <div className="rounded-2xl border border-border/60 bg-card p-6 h-full">
            <h3 className="text-base font-bold text-foreground">
              {performance.revenueBreakdown.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {performance.revenueBreakdown.note}
            </p>
            <div className="mt-5 space-y-4">
              {performance.revenueBreakdown.items.map((it, i) => (
                <div key={it.label}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-foreground">{it.label}</span>
                    <span className="text-sm font-bold" style={{ color: "var(--rl-green)" }}>
                      {it.display}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-border/60">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: animated ? `${it.value}%` : "0%",
                        backgroundColor: "var(--rl-green)",
                        transitionDelay: `${i * 150}ms`,
                      }}
                    />
                  </div>
                  <p className="mt-1 text-xs italic text-muted-foreground">{it.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Growth chart */}
        <Reveal delay={100}>
          <div ref={ref} className="rounded-2xl border border-border/60 bg-card p-6 h-full">
            <h3 className="text-base font-bold text-foreground">{performance.growthChart.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{performance.growthChart.note}</p>
            <div className="mt-6 grid grid-cols-5 items-end gap-3">
              {performance.growthChart.data.map((d, i) => {
                const h = (d.branches / maxBranches) * 100;
                const isLast = i === performance.growthChart.data.length - 1;
                return (
                  <div key={d.year} className="flex flex-col items-center">
                    <div
                      className="text-xs font-bold mb-2"
                      style={{ color: isLast ? "var(--rl-green)" : "var(--rl-eerie)" }}
                    >
                      {d.branches}
                    </div>
                    <div className="flex h-32 w-full items-end justify-center">
                      <div
                        className="w-full max-w-[40px] rounded-t-md transition-all duration-1000 ease-out"
                        style={{
                          height: animated ? `${Math.max(h, 4)}%` : "0%",
                          backgroundColor: "var(--rl-green)",
                          opacity: 0.4 + (i / (performance.growthChart.data.length - 1)) * 0.6,
                          transitionDelay: `${i * 120}ms`,
                        }}
                      />
                    </div>
                    <div
                      className="mt-2 text-[11px] font-medium"
                      style={{ color: isLast ? "var(--rl-green)" : "var(--rl-muted)" }}
                    >
                      {d.year}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Context */}
      <Reveal delay={100}>
        <div
          className="mt-8 rounded-2xl border border-border/60 p-6"
          style={{ backgroundColor: "var(--rl-light-bg)" }}
        >
          <h3 className="text-base font-bold text-foreground">{performance.context.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {performance.context.body}
          </p>
          <p className="mt-3 text-sm italic text-foreground/80">{performance.context.note}</p>
        </div>
      </Reveal>
    </div>
  );
}
