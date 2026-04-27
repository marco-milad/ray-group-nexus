import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Microscope, LayoutGrid, Activity } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useCountUp } from "@/hooks/useCountUp";
import { servicesCopy } from "@/data/en/servicesPage";

const statsConfig = [
  { raw: 500, suffix: "+", label: "Equipment Units", icon: Microscope },
  { raw: 30, suffix: "+", label: "Service Types", icon: LayoutGrid },
  { raw: 16, suffix: null, label: "Annual Exams", icon: Activity, isMillions: true },
];

function StatCard({
  raw,
  suffix,
  label,
  icon: Icon,
  isMillions,
  animate,
}: {
  raw: number;
  suffix: string | null;
  label: string;
  icon: React.ElementType;
  isMillions?: boolean;
  animate: boolean;
}) {
  const count = useCountUp(raw, 1800, animate);
  const display = isMillions ? `${(count / 10).toFixed(1)}M+` : `${count}${suffix ?? ""}`;
  const fallback = isMillions ? "1.6M+" : `${raw}${suffix ?? ""}`;

  return (
    <div
      className="group rounded-2xl border bg-white/70 p-6 backdrop-blur-sm transition-all duration-200 hover:bg-white/90"
      style={{ borderColor: "rgba(79,153,7,0.15)" }}
    >
      <div className="flex items-start justify-between">
        <div
          className="text-3xl md:text-4xl font-bold tracking-tight tabular-nums"
          style={{ color: "var(--rl-green)" }}
        >
          {animate ? display : fallback}
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

export function ServicesHeroSection() {
  const { hero } = servicesCopy;
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
      {/* Grid overlay */}
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
            {/* Eyebrow */}
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

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.04]">
              {hero.headline}{" "}
              <span style={{ color: "var(--rl-green)" }}>{hero.headlineAccent}</span>
            </h1>

            {/* Subheadline */}
            <p
              className="mt-5 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--rl-eerie)", opacity: 0.65 }}
            >
              {hero.subheadline}
            </p>

            {/* Physician sub-headline */}
            <p
              className="mt-3 max-w-xl mx-auto text-sm font-medium"
              style={{ color: "var(--rl-green)" }}
            >
              Trusted by 60+ consultant physicians across Egypt, KSA & Jordan — refer with
              confidence.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="group font-semibold"
                style={{ backgroundColor: "var(--rl-green)", color: "white" }}
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Refer a Patient
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-semibold border-border/80"
              >
                <Link to="/network">View Our Network</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={120}>
          <div ref={statsRef} className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
            {statsConfig.map((s) => (
              <StatCard
                key={s.label}
                raw={s.raw}
                suffix={s.suffix}
                label={s.label}
                icon={s.icon}
                isMillions={s.isMillions}
                animate={statsVisible}
              />
            ))}
          </div>
        </Reveal>
      </PageWrapper>
    </section>
  );
}
