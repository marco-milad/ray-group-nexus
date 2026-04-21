import * as React from "react";
import { Link } from "@tanstack/react-router";
import { TrendingUp, Stethoscope, Handshake, ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/reveal";

const AUDIENCES = [
  {
    key: "investor",
    icon: TrendingUp,
    color: "var(--rl-green)",
    bg: "color-mix(in oklab, var(--rl-green) 10%, transparent)",
    label: "Investor",
    question: "Looking to invest in MENA healthcare?",
    body: "Explore our financial performance, shareholder structure, and regional expansion thesis.",
    cta: "View Investor Relations",
    to: "/investors",
  },
  {
    key: "physician",
    icon: Stethoscope,
    color: "#1E88E5",
    bg: "color-mix(in oklab, #1E88E5 10%, transparent)",
    label: "Physician",
    question: "Referring a patient or seeking subspecialty access?",
    body: "Discover our diagnostic services, clinical pathways, and teleradiology capabilities.",
    cta: "Explore Our Services",
    to: "/services",
  },
  {
    key: "partner",
    icon: Handshake,
    color: "#7B1FA2",
    bg: "color-mix(in oklab, #7B1FA2 10%, transparent)",
    label: "Partner",
    question: "Exploring a strategic or commercial partnership?",
    body: "Learn about our network, brands, and how we collaborate with hospitals and health systems.",
    cta: "Get in Touch",
    to: "/contact",
  },
] as const;

export function AudienceRoutingSection() {
  const [visibleCount, setVisibleCount] = React.useState(0);

  React.useEffect(() => {
    const timers = AUDIENCES.map((_, i) => setTimeout(() => setVisibleCount(i + 1), 200 + i * 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SectionShell bg="bg-[color:var(--rl-light-bg)]">
      <Reveal>
        <div className="text-center mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "var(--rl-green)" }}
          >
            Find Your Path
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Who are you here for?</h2>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-3">
        {AUDIENCES.map((a, i) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.key}
              to={a.to}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full cursor-pointer"
              style={{
                borderTopColor: a.color,
                borderTopWidth: "3px",
                opacity: visibleCount > i ? 1 : 0,
                transform: visibleCount > i ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.8s ease, transform 0.8s ease, box-shadow 0.3s ease",
              }}
            >
              {/* Icon */}
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: a.bg, color: a.color }}
              >
                <Icon className="h-6 w-6" />
              </div>

              {/* Label */}
              <span
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: a.color }}
              >
                {a.label}
              </span>

              {/* Question */}
              <h3 className="text-base font-bold text-foreground leading-snug mb-2">
                {a.question}
              </h3>

              {/* Body */}
              <p className="text-sm leading-relaxed text-muted-foreground flex-1">{a.body}</p>

              {/* CTA */}
              <div
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
                style={{ color: a.color }}
              >
                {a.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </div>

              {/* Bottom accent */}
              <div
                className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ backgroundColor: a.color, opacity: 0.3 }}
              />
            </Link>
          );
        })}
      </div>
    </SectionShell>
  );
}
