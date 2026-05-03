import * as React from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/reveal";
import { useCountUp } from "@/hooks/useCountUp";
import { MapPin, Building2, Globe } from "lucide-react";
import { networkCopy } from "@/data/en/network";

const heroStats = [
  { raw: 72, suffix: "+", label: "Branches", icon: Building2 },
  { raw: 3, suffix: "", label: "Countries", icon: Globe },
  { raw: 6, suffix: "", label: "Brands", icon: MapPin },
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
          style={{
            backgroundColor: "rgba(79,153,7,0.08)",
            color: "var(--rl-green)",
          }}
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

export function NetworkHeroSection() {
  const { hero } = networkCopy;
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
