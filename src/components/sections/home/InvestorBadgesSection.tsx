import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionShell } from "@/components/layout/SectionShell";

const INVESTORS = [
  {
    name: "EBRD",
    full: "European Bank for Reconstruction and Development",
    portfolio: "€52.3B",
    color: "#1565C0",
    focus: "Multilateral development investment bank — 2,099 projects worldwide",
  },
  {
    name: "FMO",
    full: "Nederlandse Financierings-Maatschappij voor Ontwikkelingslanden",
    portfolio: "€9.2B",
    color: "#0277BD",
    focus: "Dutch development bank — Foreign Affairs & Economic Affairs mandate",
  },
  {
    name: "PROPARCO",
    full: "Société de Promotion et de Participation pour la Coopération Économique",
    portfolio: "€9.6B",
    color: "#E65100",
    focus: "French DFI (AFD Group) — Africa, Asia, Latin America, Middle East",
  },
  {
    name: "DEG",
    full: "Deutsche Investitions- und Entwicklungsgesellschaft",
    portfolio: "€8.2B",
    color: "#2E7D32",
    focus: "German DFI (KfW Group) — long-term private sector investments",
  },
  {
    name: "MCP",
    full: "Mediterrania Capital Partners",
    portfolio: "Lead Investor",
    color: "#6A1B9A",
    focus: "Private equity — growth investments across Africa",
  },
] as const;

function InvestorBadge({ inv }: { inv: (typeof INVESTORS)[number] }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex items-center gap-2 rounded-xl border px-4 py-3 cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        style={{
          borderColor: hovered ? `${inv.color}50` : undefined,
          backgroundColor: hovered ? `${inv.color}08` : "var(--background)",
        }}
      >
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
          style={{ backgroundColor: inv.color }}
        >
          {inv.name.slice(0, 2)}
        </div>
        <div>
          <div className="text-sm font-bold text-foreground">{inv.name}</div>
          <div className="text-xs font-semibold" style={{ color: inv.color }}>
            {inv.portfolio}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 rounded-xl border bg-card p-3 shadow-lg pointer-events-none"
          style={{ borderColor: `${inv.color}30` }}
        >
          <div className="text-xs font-bold mb-1" style={{ color: inv.color }}>
            {inv.name}
          </div>
          <div className="text-xs text-foreground/80 leading-relaxed mb-1">{inv.full}</div>
          <div className="text-[11px] text-muted-foreground italic">{inv.focus}</div>
        </div>
      )}
    </div>
  );
}

export function InvestorBadgesSection() {
  return (
    <SectionShell bg="bg-[color:var(--rl-light-bg)]" size="sm">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      <Reveal>
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Trusted by leading institutional investors
          </p>
          <p className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--rl-eerie)" }}>
            Backed by <span style={{ color: "var(--rl-green)" }}>€79.3B+</span> in institutional
            capital
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="flex flex-wrap justify-center gap-3">
          {INVESTORS.map((inv, i) => (
            <div
              key={inv.name}
              style={{
                opacity: 0,
                animation: "fadeSlideUp 0.6s ease forwards",
                animationDelay: `${i * 120}ms`,
              }}
            >
              <InvestorBadge inv={inv} />
            </div>
          ))}
        </div>
      </Reveal>

      {/* Subtle CTA */}
      <Reveal delay={200}>
        <div className="mt-8 flex justify-center">
          <Link
            to="/investors"
            className="group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            style={{
              borderColor: "rgba(79,153,7,0.3)",
              color: "var(--rl-green)",
              backgroundColor: "rgba(79,153,7,0.05)",
            }}
          >
            View Investor Relations
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </SectionShell>
  );
}
