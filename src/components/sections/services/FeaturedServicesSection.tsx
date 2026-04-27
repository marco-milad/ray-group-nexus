import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  Scan,
  Radio,
  Bone,
  CircleDashed,
  Atom,
  SquareDashed,
  Activity,
  Heart,
  HeartPulse,
  Zap,
  FlaskConical,
  Monitor,
  ArrowRight,
} from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { getFeaturedServices } from "@/data/en/services";
import { brands } from "@/data/en/brands";
import { servicesCopy } from "@/data/en/servicesPage";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  scan: Scan,
  radio: Radio,
  bone: Bone,
  "circle-dashed": CircleDashed,
  atom: Atom,
  "square-dashed": SquareDashed,
  activity: Activity,
  heart: Heart,
  heartpulse: HeartPulse,
  zap: Zap,
  "flask-conical": FlaskConical,
  monitor: Monitor,
};

export function FeaturedServicesSection() {
  const featured = getFeaturedServices();
  if (featured.length === 0) return null;

  return (
<SectionShell bg="bg-background">      <Reveal>
        <SectionHeader
          eyebrow="Featured"
          headline="Flagship Diagnostic Services"
          subheadline="Our most-utilised services — proven across the network."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((s, i) => (
          <Reveal key={s.id} delay={i * 80}>
            <ServiceCard service={s} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

function ServiceCard({ service: s }: { service: ReturnType<typeof getFeaturedServices>[number] }) {
  const [hovered, setHovered] = React.useState(false);
  const Icon = SERVICE_ICONS[s.icon ?? "scan"] ?? Scan;

  return (
    <article
      className="group flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full"
      style={{
        borderTopColor: "var(--rl-green)",
        borderTopWidth: "2px",
        borderColor: hovered ? "rgba(79,153,7,0.3)" : undefined,
        backgroundColor: hovered ? "rgba(79,153,7,0.03)" : undefined,
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundColor: "rgba(79,153,7,0.1)",
          color: "var(--rl-green)",
        }}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* Service name */}
      <h3
        className="text-lg font-bold text-foreground transition-all duration-300"
        style={{ transform: hovered ? "translateY(-1px)" : "translateY(0)" }}
      >
        {s.name}
      </h3>

      {/* Highlight */}
      <p
        className="mt-1 text-sm font-semibold transition-all duration-300"
        style={{
          color: "var(--rl-green)",
          fontSize: hovered ? "0.9rem" : "0.875rem",
        }}
      >
        {s.highlight}
      </p>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-1">{s.description}</p>

      {/* Available at */}
      <div className="mt-5 pt-4 border-t border-border/60">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          {servicesCopy.availableAt}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {s.availableAt.map((slug, idx) => {
            const b = brands.find((x) => x.slug === slug);
            if (!b) return null;
            return (
              <span
                key={slug}
                className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all duration-200"
                style={{
                  borderColor: `${b.color}40`,
                  color: b.color,
                  backgroundColor: `${b.color}10`,
                  opacity: hovered ? 1 : 0.75,
                  transform: hovered ? "translateY(0)" : "translateY(2px)",
                  transitionDelay: hovered ? `${idx * 50}ms` : "0ms",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: b.color }} />
                {b.name}
              </span>
            );
          })}
        </div>
      </div>

      {/* Refer CTA */}
      <Link
        to="/contact"
        search={{ service: s.name } as Record<string, string>}
        className="group/btn mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
        style={{ color: "var(--rl-green)" }}
      >
        Refer for {s.name}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
      </Link>

      {/* Bottom accent */}
      <div
        className="mt-3 h-px rounded-full transition-all duration-500"
        style={{
          width: hovered ? "100%" : "2rem",
          backgroundColor: "var(--rl-green)",
          opacity: 0.3,
        }}
      />
    </article>
  );
}
