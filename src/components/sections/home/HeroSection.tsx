import { Link } from "@tanstack/react-router";
import { ArrowRight, Microscope, Building2, Globe, Users } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/reveal";
import { homeCopy } from "@/data/en/home";
import { statsCopy } from "@/data/en/sections/stats";
import { useCountUp } from "@/hooks/useCountUp";

const heroStats = [
  {
    ...statsCopy.exams,
    icon: Microscope,
    raw: 1600000,
    suffix: "M+",
    display: "1.6",
    context: "Across all platforms in 2025",
  },
  {
    ...statsCopy.branches,
    icon: Building2,
    raw: 40,
    suffix: "+",
    display: "40",
    context: "Largest multi-country network in MENA private diagnostics",
  },
  {
    ...statsCopy.countries,
    icon: Globe,
    raw: 4,
    suffix: "",
    display: "4",
    context: "Egypt, Saudi Arabia, Jordan & Malta HQ",
  },
  {
    ...statsCopy.consultants,
    icon: Users,
    raw: 60,
    suffix: "+",
    display: "60",
    context: "Subspecialty radiologists via Ray Medical",
  },
];

function StatCard({
  label,
  raw,
  suffix,
  display,
  icon: Icon,
  animate,
  context,
}: {
  label: string;
  raw: number;
  suffix: string;
  display: string;
  icon: React.ElementType;
  animate: boolean;
  context?: string;
}) {
  const isMillions = raw > 999999;
  const target = isMillions ? 16 : raw;
  const count = useCountUp(target, 1800, animate);

  const displayValue = isMillions ? `${(count / 10).toFixed(1)}M+` : `${count}${suffix}`;

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
          {animate ? displayValue : `${display}${suffix}`}
        </div>
        <div
          className="rounded-lg p-1.5"
          style={{
            backgroundColor: "rgba(79,153,7,0.08)",
            color: "var(--rl-green)",
          }}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      {/* Label */}
      <div className="mt-2 text-xs md:text-sm font-medium text-foreground/70">{label}</div>

      {/* Micro-context */}
      {context && (
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/70 italic">
          {context}
        </p>
      )}

      <div
        className="mt-3 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: "var(--rl-green)", opacity: 0.3 }}
      />
    </div>
  );
}

export function HeroSection() {
  const { hero } = homeCopy;
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
          "radial-gradient(1200px 600px at 20% -10%, color-mix(in oklab, var(--rl-mantis) 22%, transparent), transparent 60%), radial-gradient(900px 500px at 100% 10%, color-mix(in oklab, var(--rl-pistachio) 18%, transparent), transparent 60%), var(--rl-light-bg)",
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

      <PageWrapper className="relative py-24 md:py-32 lg:py-40">
        <Reveal>
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur"
              style={{ color: "var(--rl-eerie)", letterSpacing: "0.06em" }}
            >
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--rl-green)" }}
              />
              {hero.eyebrow}
            </div>

            <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.04] text-foreground">
              {hero.headline}
              <br />
              <span style={{ color: "var(--rl-green)" }}>{hero.headlineAccent}</span>
            </h1>

            <p
              className="mt-7 max-w-xl text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--rl-eerie)", opacity: 0.65 }}
            >
              {hero.subheadline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="group h-12 px-6 text-sm font-semibold"
                style={{ backgroundColor: "var(--rl-green)", color: "white" }}
              >
                <Link to="/network">
                  {hero.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-6 text-sm font-semibold border-border/80 hover:border-border"
              >
                <Link to="/contact">{hero.secondaryCta}</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Stats strip */}
        <Reveal delay={150}>
          <div ref={statsRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
            {heroStats.map((s) => (
              <StatCard
                key={s.label}
                label={s.label}
                raw={s.raw}
                suffix={s.suffix}
                display={s.display}
                icon={s.icon}
                animate={statsVisible}
                context={s.context}
              />
            ))}
          </div>
        </Reveal>
      </PageWrapper>
    </section>
  );
}
