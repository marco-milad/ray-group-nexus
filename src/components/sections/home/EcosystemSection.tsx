import { ScanLine, Stethoscope, MonitorPlay, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
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
  return (
    <SectionShell bg="bg-background">
      <SectionHeader
        eyebrow={ecosystemCopy.eyebrow}
        headline={ecosystemCopy.headline}
        subheadline={ecosystemCopy.subheadline}
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map(({ key, icon: Icon, copy, step, to, color, bg }) => (
          <div
            key={key}
            className="group relative rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
            style={{
              borderTop: `3px solid ${color}`,
            }}
          >
            {/* Step number */}
            <span
              className="absolute top-6 right-6 text-xs font-bold tracking-widest opacity-20"
              style={{ color }}
            >
              {step}
            </span>

            {/* Icon */}
            <div
              className="inline-flex h-13 w-13 items-center justify-center rounded-xl"
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

      {/* Connection line — desktop only */}
      <div className="hidden md:flex items-center justify-center mt-8 gap-0">
        {cards.map(({ key, color }, i) => (
          <div key={key} className="flex items-center">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            {i < cards.length - 1 && (
              <div
                className="h-px w-32 lg:w-48"
                style={{
                  background: `linear-gradient(to right, ${cards[i].color}, ${cards[i + 1].color})`,
                  opacity: 0.3,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
