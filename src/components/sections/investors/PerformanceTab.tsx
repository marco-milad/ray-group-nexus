import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { investorsCopy } from "@/data/en/investors";

export function PerformanceTab() {
  const { performance } = investorsCopy;
  const maxBranches = Math.max(...performance.growthChart.data.map((d) => d.branches), 1);

  return (
    <div>
      <SectionHeader
        eyebrow={performance.eyebrow}
        headline={performance.headline}
        subheadline={performance.subheadline}
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {performance.metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
          >
            <StatCard value={m.value} label={m.label} note={m.note} />
            <p className="mt-3 text-xs italic leading-relaxed text-muted-foreground">
              {m.soWhat}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="text-base font-bold text-foreground">
            {performance.revenueBreakdown.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {performance.revenueBreakdown.note}
          </p>
          <div className="mt-5 space-y-4">
            {performance.revenueBreakdown.items.map((it) => (
              <div key={it.label}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-foreground">{it.label}</span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--rl-green)" }}
                  >
                    {it.display}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-border/60">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${it.value}%`, backgroundColor: "var(--rl-green)" }}
                  />
                </div>
                <p className="mt-1 text-xs italic text-muted-foreground">{it.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="text-base font-bold text-foreground">
            {performance.growthChart.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {performance.growthChart.note}
          </p>
          <div className="mt-6 grid grid-cols-5 items-end gap-3">
            {performance.growthChart.data.map((d) => {
              const h = (d.branches / maxBranches) * 100;
              return (
                <div key={d.year} className="flex flex-col items-center">
                  <div className="text-xs font-bold text-foreground">{d.branches}</div>
                  <div className="mt-2 flex h-32 w-full items-end justify-center">
                    <div
                      className="w-full max-w-[40px] rounded-t-md"
                      style={{ height: `${h}%`, backgroundColor: "var(--rl-green)" }}
                    />
                  </div>
                  <div className="mt-2 text-[11px] font-medium text-muted-foreground">
                    {d.year}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border/60 bg-muted/30 p-6">
        <h3 className="text-base font-bold text-foreground">{performance.context.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {performance.context.body}
        </p>
        <p className="mt-3 text-sm italic text-foreground/80">{performance.context.note}</p>
      </div>
    </div>
  );
}
