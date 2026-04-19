import * as React from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/reveal";
import { aboutCopy } from "@/data/en/about";
import { useCountUp } from "@/hooks/useCountUp";

const aboutStats = [
  { value: "2019", label: "Founded", raw: 2019, suffix: "" },
  { value: "4", label: "Countries", raw: 4, suffix: "" },
  { value: "6", label: "Brands", raw: 6, suffix: "" },
  { value: "40", label: "Branches", raw: 40, suffix: "+" },
];

function StatCard({
  label,
  raw,
  suffix,
  animate,
}: {
  label: string;
  raw: number;
  suffix: string;
  animate: boolean;
}) {
  const count = useCountUp(raw, 1800, animate);

  return (
    <div
      className="rounded-2xl border bg-white/70 p-5 backdrop-blur-sm"
      style={{ borderColor: "rgba(79,153,7,0.15)" }}
    >
      <div
        className="text-3xl md:text-4xl font-bold tracking-tight tabular-nums"
        style={{ color: "var(--rl-green)" }}
      >
        {animate ? `${count}${suffix}` : `${raw}${suffix}`}
      </div>
      <div className="mt-1 text-xs md:text-sm font-medium text-foreground/70">{label}</div>
    </div>
  );
}

export function AboutHeroSection() {
  const { hero } = aboutCopy;
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
          "radial-gradient(900px 500px at 80% -10%, color-mix(in oklab, var(--rl-mantis) 18%, transparent), transparent 60%), var(--rl-light-bg)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--rl-eerie) 1px, transparent 1px), linear-gradient(90deg, var(--rl-eerie) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <PageWrapper className="relative py-20 md:py-24 lg:py-28">
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

            <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.04]">
              {hero.headline}
              <br />
              <span style={{ color: "var(--rl-green)" }}>{hero.headlineAccent}</span>
            </h1>

            <p
              className="mt-6 max-w-xl text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--rl-eerie)", opacity: 0.65 }}
            >
              {hero.subheadline}
            </p>
          </div>
        </Reveal>

        {/* Stats strip */}
        <Reveal delay={120}>
          <div ref={statsRef} className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
            {aboutStats.map((s) => (
              <StatCard
                key={s.label}
                label={s.label}
                raw={s.raw}
                suffix={s.suffix}
                animate={statsVisible}
              />
            ))}
          </div>
        </Reveal>
      </PageWrapper>
    </section>
  );
}
