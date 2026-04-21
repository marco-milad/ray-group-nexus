import * as React from "react";
import { ScanLine, Stethoscope, MonitorPlay, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { ecosystemCopy } from "@/data/en/sections/ecosystem";

const cards = [
  {
    key: "diagnostics",
    icon: ScanLine,
    copy: ecosystemCopy.cards.diagnostics,
    step: "01",
    to: "/services",
    color: "var(--rl-green)",
    bg: "color-mix(in oklab, var(--rl-green) 10%, transparent)",
  },
  {
    key: "clinics",
    icon: Stethoscope,
    copy: ecosystemCopy.cards.clinics,
    step: "02",
    to: "/platforms/specialized-clinics",
    color: "var(--clinics)",
    bg: "color-mix(in oklab, var(--clinics) 10%, transparent)",
  },
  {
    key: "teleradiology",
    icon: MonitorPlay,
    copy: ecosystemCopy.cards.teleradiology,
    step: "03",
    to: "/platforms/ray-medical",
    color: "var(--ray-medical)",
    bg: "color-mix(in oklab, var(--ray-medical) 10%, transparent)",
  },
];

export function EcosystemSection() {
  const [activeKey, setActiveKey] = React.useState<string | null>(null);
  const [visibleCards, setVisibleCards] = React.useState<number>(0);

  React.useEffect(() => {
    const timers = cards.map((_, i) => setTimeout(() => setVisibleCards(i + 1), 300 + i * 400));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SectionShell bg="bg-background">
      <Reveal>
        <SectionHeader
          eyebrow={ecosystemCopy.eyebrow}
          headline={ecosystemCopy.headline}
          subheadline={ecosystemCopy.subheadline}
        />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map(({ key, icon: Icon, copy, step, to, color, bg }, i) => (
          <div
            key={key}
            className="group relative rounded-2xl border border-border/60 bg-card p-7 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            style={{
              borderTop: `3px solid ${color}`,
              opacity: visibleCards > i ? 1 : 0,
              transform: visibleCards > i ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
            onMouseEnter={() => setActiveKey(key)}
            onMouseLeave={() => setActiveKey(null)}
          >
            {/* Step number */}
            <span
              className="absolute top-5 right-5 text-2xl font-black tracking-tight transition-all duration-300"
              style={{
                color,
                opacity: activeKey === key ? 0.15 : 0.08,
              }}
            >
              {step}
            </span>

            {/* Icon */}
            <div
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: bg, color }}
            >
              <Icon className="h-6 w-6" />
            </div>

            {/* Content */}
            <h3 className="mt-5 text-xl font-semibold text-foreground">{copy.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-1">{copy.body}</p>

            {/* CTA */}
            <Link
              to={to}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
              style={{ color }}
            >
              Learn more
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>

      {/* Connection line */}
      <div className="hidden md:flex items-center justify-center mt-10 gap-0">
        {cards.map(({ key, color }, i) => (
          <div key={key} className="flex items-center">
            <div
              className="rounded-full transition-all duration-300"
              style={{
                backgroundColor: color,
                width: activeKey === key ? "14px" : "10px",
                height: activeKey === key ? "14px" : "10px",
                boxShadow: activeKey === key ? `0 0 8px ${color}` : "none",
              }}
            />
            {i < cards.length - 1 && (
              <div
                className="h-px transition-all duration-300"
                style={{
                  width: "160px",
                  background: `linear-gradient(to right, ${cards[i].color}, ${cards[i + 1].color})`,
                  opacity: activeKey === key || activeKey === cards[i + 1].key ? 0.6 : 0.2,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
