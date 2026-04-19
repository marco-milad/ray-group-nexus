import { SectionHeader } from "@/components/ui/section-header";
import { investorsCopy } from "@/data/en/investors";

export function StrategyTab() {
  const { strategy } = investorsCopy;
  return (
    <div>
      <SectionHeader
        eyebrow={strategy.eyebrow}
        headline={strategy.headline}
        subheadline={strategy.subheadline}
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {strategy.vectors.map((v) => (
          <article
            key={v.number}
            className="flex flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
          >
            <div className="text-3xl font-bold" style={{ color: "var(--rl-green)" }}>
              {v.number}
            </div>
            <h3 className="mt-3 text-lg font-bold text-foreground">{v.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            <div
              className="mt-4 rounded-lg px-3 py-2 text-xs font-semibold"
              style={{ backgroundColor: "var(--rl-light-bg)", color: "var(--rl-green)" }}
            >
              {v.metric}
            </div>
            <div className="mt-4 border-l-2 pl-3" style={{ borderColor: "var(--rl-green)" }}>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground/60">
                So What?
              </div>
              <p className="mt-1 text-sm italic text-foreground/85">{v.soWhat}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
