import { ShieldCheck, Leaf, TrendingUp, Globe2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { investorsCopy } from "@/data/en/investors";
import { investors } from "@/data/en/investorData";

const ICONS = {
  "shield-check": ShieldCheck,
  leaf: Leaf,
  "trending-up": TrendingUp,
  "globe-2": Globe2,
} as const;

export function ShareholdersTab() {
  const { shareholders } = investorsCopy;
  return (
    <div>
      <SectionHeader
        eyebrow={shareholders.eyebrow}
        headline={shareholders.headline}
        subheadline={shareholders.subheadline}
      />

      <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm">
        <div
          className="text-5xl font-bold tracking-tight md:text-6xl"
          style={{ color: "var(--rl-green)" }}
        >
          {shareholders.combinedPortfolio.value}
        </div>
        <div className="mt-3 text-sm font-semibold text-foreground">
          {shareholders.combinedPortfolio.label}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {shareholders.combinedPortfolio.sublabel}
        </div>
        <p className="mt-4 text-sm italic leading-relaxed text-foreground/80">
          {shareholders.combinedPortfolio.soWhat}
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {investors.map((inv) => (
          <article
            key={inv.id}
            className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-xs font-bold text-white"
                style={{ backgroundColor: inv.color }}
                aria-hidden
              >
                {inv.shortName}
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">{inv.shortName}</div>
                <div className="text-[11px] text-muted-foreground">{inv.portfolio}</div>
              </div>
            </div>
            <h3 className="mt-4 text-sm font-semibold text-foreground">{inv.name}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{inv.focus}</p>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-center text-lg font-bold text-foreground">
          {shareholders.credibilitySignals.title}
        </h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {shareholders.credibilitySignals.items.map((it) => {
            const Icon = ICONS[it.icon as keyof typeof ICONS] ?? ShieldCheck;
            return (
              <div
                key={it.label}
                className="flex gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "var(--rl-light-bg)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "var(--rl-green)" }} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{it.label}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
