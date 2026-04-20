import * as React from "react";
import { ShieldCheck, Leaf, TrendingUp, Globe2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
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
          eyebrow={shareholders.eyebrow}
          headline={shareholders.headline}
          subheadline={shareholders.subheadline}
        />
      </Reveal>

      {/* Combined portfolio card */}
      <Reveal delay={100}>
        <div
          ref={ref}
          className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm"
        >
          <div
            className="text-5xl font-bold tracking-tight md:text-6xl"
            style={{
              color: "var(--rl-green)",
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
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
      </Reveal>

      {/* Investor cards */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {investors.map((inv, i) => (
          <Reveal key={inv.id} delay={i * 80}>
            <article
              className="group rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md h-full"
              style={{ borderTopColor: inv.color, borderTopWidth: "2px" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: inv.color }}
                  aria-hidden
                >
                  {inv.shortName}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{inv.shortName}</div>
                  <div className="text-[11px] font-semibold" style={{ color: inv.color }}>
                    {inv.portfolio}
                  </div>
                </div>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{inv.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                {inv.focus}
              </p>
              <div
                className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ backgroundColor: inv.color, opacity: 0.4 }}
              />
            </article>
          </Reveal>
        ))}
      </div>

      {/* Credibility signals */}
      <div className="mt-12">
        <Reveal>
          <h3 className="text-center text-lg font-bold text-foreground mb-6">
            {shareholders.credibilitySignals.title}
          </h3>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {shareholders.credibilitySignals.items.map((it, i) => {
            const Icon = ICONS[it.icon as keyof typeof ICONS] ?? ShieldCheck;
            return (
              <Reveal key={it.label} delay={i * 80}>
                <div className="flex gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:shadow-md h-full">
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
