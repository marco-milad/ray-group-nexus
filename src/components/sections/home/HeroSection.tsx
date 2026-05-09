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
    raw: 74,
    suffix: "+",
    display: "74",
    context: "Largest multi-country network in MENA private diagnostics",
  },
  {
    ...statsCopy.countries,
    icon: Globe,
    raw: 3,
    suffix: "",
    display: "3",
    context: "Egypt, Saudi Arabia, Jordan",
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
          style={{ backgroundColor: "rgba(79,153,7,0.08)", color: "var(--rl-green)" }}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-2 text-xs md:text-sm font-medium text-foreground/70">{label}</div>
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
      style={{ backgroundColor: "var(--rl-light-bg)" }}
    >
      <style>{`
        @keyframes hero-pulseRing {
          0%   { transform: scale(0.3); opacity: 0; }
          20%  { opacity: 0.08; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes hero-nodePulse {
          0%, 100% { opacity: 0.04; }
          50%      { opacity: 0.10; }
        }
        @keyframes hero-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes hero-floatAlt {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(10px); }
        }
        @keyframes hero-rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes hero-helixDrift {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .hero-svg-pivot {
          transform-box: fill-box;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-anim-layer,
          .hero-anim-layer * {
            animation: none !important;
          }
        }
      `}</style>

      {/* Grid overlay — base texture (kept) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#1E1E1E 1px, transparent 1px), linear-gradient(90deg, #1E1E1E 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Decorative SVG illustration — DNA helix, network, pulse rings, floating hexagons */}
      <svg
        aria-hidden
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="hero-anim-layer pointer-events-none absolute inset-0 h-full w-full"
      >
        {/* DNA helix — right side (subtle, with slow drift) */}
        <g
          className="hero-svg-pivot"
          stroke="#4F9907"
          strokeWidth="1.5"
          strokeOpacity="0.08"
          fill="none"
          style={{ animation: "hero-helixDrift 12s ease-in-out infinite" }}
        >
          {/* Strand A — sinusoidal */}
          <path d="M 1200 60 C 1140 135 1140 185 1200 260 C 1260 335 1260 385 1200 460 C 1140 535 1140 585 1200 660 C 1260 735 1260 760 1200 760" />
          {/* Strand B — opposite phase */}
          <path d="M 1200 60 C 1260 135 1260 185 1200 260 C 1140 335 1140 385 1200 460 C 1260 535 1260 585 1200 660 C 1140 735 1140 760 1200 760" />
          {/* Rungs at maximum strand separation */}
          <line x1="1140" y1="160" x2="1260" y2="160" />
          <line x1="1260" y1="360" x2="1140" y2="360" />
          <line x1="1140" y1="560" x2="1260" y2="560" />
          <line x1="1260" y1="710" x2="1140" y2="710" />
        </g>

        {/* Pulse rings — center-right (ultrasound emanation) */}
        <g fill="none" stroke="#4F9907" strokeWidth="1.5">
          <circle
            cx="1100"
            cy="400"
            r="60"
            className="hero-svg-pivot"
            style={{ animation: "hero-pulseRing 5.2s ease-out 0s infinite" }}
          />
          <circle
            cx="1100"
            cy="400"
            r="60"
            className="hero-svg-pivot"
            style={{ animation: "hero-pulseRing 5.2s ease-out 1.7s infinite" }}
          />
          <circle
            cx="1100"
            cy="400"
            r="60"
            className="hero-svg-pivot"
            style={{ animation: "hero-pulseRing 5.2s ease-out 3.4s infinite" }}
          />
        </g>

        {/* Connecting node network — across the plane */}
        <g stroke="#1E1E1E" strokeWidth="1" strokeOpacity="0.05" fill="none">
          <line x1="180" y1="160" x2="420" y2="240" />
          <line x1="420" y1="240" x2="320" y2="500" />
          <line x1="420" y1="240" x2="780" y2="120" />
          <line x1="780" y1="120" x2="1180" y2="320" />
          <line x1="900" y1="640" x2="1280" y2="540" />
          <line x1="320" y1="500" x2="900" y2="640" />
          <line x1="180" y1="160" x2="320" y2="500" />
        </g>
        <g fill="#4F9907">
          <circle cx="180" cy="160" r="3.5" style={{ animation: "hero-nodePulse 4s ease-in-out 0s infinite" }} />
          <circle cx="420" cy="240" r="3.5" style={{ animation: "hero-nodePulse 4.2s ease-in-out 0.4s infinite" }} />
          <circle cx="320" cy="500" r="3.5" style={{ animation: "hero-nodePulse 4.4s ease-in-out 0.8s infinite" }} />
          <circle cx="780" cy="120" r="3.5" style={{ animation: "hero-nodePulse 4s ease-in-out 1.2s infinite" }} />
          <circle cx="1180" cy="320" r="3.5" style={{ animation: "hero-nodePulse 4.2s ease-in-out 1.6s infinite" }} />
          <circle cx="900" cy="640" r="3.5" style={{ animation: "hero-nodePulse 4.4s ease-in-out 2.0s infinite" }} />
          <circle cx="1280" cy="540" r="3.5" style={{ animation: "hero-nodePulse 4s ease-in-out 2.4s infinite" }} />
        </g>

        {/* Floating geometric shapes — hexagons (low-opacity outlines) */}
        <g fill="none" strokeWidth="1.5">
          {/* Hexagon 1 — bottom-left, slow float up */}
          <polygon
            points="180,560 214.64,580 214.64,620 180,640 145.36,620 145.36,580"
            stroke="#71C247"
            strokeOpacity="0.08"
            className="hero-svg-pivot"
            style={{ animation: "hero-float 9s ease-in-out 0s infinite" }}
          />
          {/* Hexagon 2 — top-center, slow rotation */}
          <polygon
            points="700,150 743.30,175 743.30,225 700,250 656.70,225 656.70,175"
            stroke="#4F9907"
            strokeOpacity="0.07"
            className="hero-svg-pivot"
            style={{ animation: "hero-rotateSlow 48s linear 0s infinite" }}
          />
          {/* Hexagon 3 — mid-right, gentle counter-float */}
          <polygon
            points="1000,465 1030.31,482.5 1030.31,517.5 1000,535 969.69,517.5 969.69,482.5"
            stroke="#1E1E1E"
            strokeOpacity="0.06"
            className="hero-svg-pivot"
            style={{ animation: "hero-floatAlt 11s ease-in-out 1s infinite" }}
          />
          {/* Hexagon 4 — far-left, slow rotation reverse */}
          <polygon
            points="80,360 101.65,372.5 101.65,397.5 80,410 58.35,397.5 58.35,372.5"
            stroke="#71C247"
            strokeOpacity="0.07"
            className="hero-svg-pivot"
            style={{ animation: "hero-rotateSlow 60s linear reverse 0s infinite" }}
          />
        </g>
      </svg>

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
