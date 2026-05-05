import { Link } from "@tanstack/react-router";
import { ArrowRight, TrendingUp, Globe, Building2 } from "lucide-react";
import * as React from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useCountUp } from "@/hooks/useCountUp";
import { investorsCopy } from "@/data/en/investors";

const heroStats = [
  { raw: 74, suffix: "+", label: "Branches", icon: Building2 },
  { raw: 3, suffix: "", label: "Markets", icon: Globe },
  { raw: 40, suffix: "%", label: "Revenue Growth", icon: TrendingUp },
];

function StatCard({
  raw,
  suffix,
  label,
  icon: Icon,
  animate,
}: {
  raw: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  animate: boolean;
}) {
  const count = useCountUp(raw, 1800, animate);
  return (
    <div
      className="group rounded-2xl border bg-white/70 p-5 backdrop-blur-sm transition-all duration-200 hover:bg-white/90"
      style={{ borderColor: "rgba(79,153,7,0.15)" }}
    >
      <div className="flex items-start justify-between">
        <div
          className="text-3xl md:text-4xl font-bold tracking-tight tabular-nums"
          style={{ color: "var(--rl-green)" }}
        >
          {animate ? `${count}${suffix}` : `${raw}${suffix}`}
        </div>
        <div
          className="rounded-lg p-1.5"
          style={{ backgroundColor: "rgba(79,153,7,0.08)", color: "var(--rl-green)" }}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-2 text-xs md:text-sm font-medium text-foreground/70">{label}</div>
      <div
        className="mt-3 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: "var(--rl-green)", opacity: 0.3 }}
      />
    </div>
  );
}

export function InvestorsHeroSection() {
  const { hero } = investorsCopy;
  const [statsVisible, setStatsVisible] = React.useState(false);
  const statsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(1200px 600px at 20% -10%, color-mix(in oklab, var(--rl-mantis) 22%, transparent), transparent 60%), var(--rl-light-bg)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--rl-eerie) 1px, transparent 1px), linear-gradient(90deg, var(--rl-eerie) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <PageWrapper className="relative py-20 md:py-28">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur mb-6"
              style={{ color: "var(--rl-eerie)", letterSpacing: "0.06em" }}
            >
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--rl-green)" }}
              />
              {hero.eyebrow}
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.04]">
              {hero.headline}{" "}
              <span style={{ color: "var(--rl-green)" }}>{hero.headlineAccent}</span>
            </h1>

            <p
              className="mt-6 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--rl-eerie)", opacity: 0.65 }}
            >
              {hero.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {/* Primary CTA — يروح على contact مؤقتاً */}
              <Button
                asChild
                size="lg"
                className="group"
                style={{ backgroundColor: "var(--rl-green)", color: "white" }}
              >
                <Link
                  to="/contact"
                  search={{ inquiry: "investor-overview" } as Record<string, string>}
                  className="flex items-center"
                >
                  {hero.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              {/* Secondary CTA */}
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">{hero.secondaryCta}</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div ref={statsRef} className="mt-14 grid grid-cols-3 gap-3 max-w-2xl mx-auto">
            {heroStats.map((s) => (
              <StatCard
                key={s.label}
                raw={s.raw}
                suffix={s.suffix}
                label={s.label}
                icon={s.icon}
                animate={statsVisible}
              />
            ))}
          </div>
        </Reveal>
      </PageWrapper>
    </section>
  );
}
