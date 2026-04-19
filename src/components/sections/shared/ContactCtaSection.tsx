import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/layout/SectionShell";
import { contactCtaCopy } from "@/data/en/sections/contactCta";

const investors = [
  "EBRD",
  "FMO",
  "PROPARCO",
  "DEG",
  "MCP",
  "EBRD",
  "FMO",
  "PROPARCO",
  "DEG",
  "MCP",
];

export function ContactCtaSection() {
  return (
    <SectionShell bg="bg-background" size="md">
      <div
        className="rounded-3xl border border-border/60 p-10 md:p-14 text-center relative overflow-hidden"
        style={{
          background:
            "radial-gradient(600px 300px at 50% 0%, color-mix(in oklab, var(--rl-green) 14%, transparent), transparent 70%), var(--rl-cornsilk)",
        }}
      >
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{contactCtaCopy.headline}</h3>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">{contactCtaCopy.subheadline}</p>
        <div className="mt-8">
          <Button asChild size="lg" style={{ backgroundColor: "var(--rl-green)", color: "white" }}>
            <Link to="/contact">{contactCtaCopy.cta}</Link>
          </Button>
        </div>

        {/* Social proof — marquee */}
        <div className="mt-10 pt-8 border-t border-border/40">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
            Trusted by leading institutional investors
          </p>

          {/* Marquee container */}
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            }}
          >
            <div
              className="flex gap-3 w-max"
              style={{
                animation: "marquee 12s linear infinite",
              }}
            >
              {investors.map((name, i) => (
                <span
                  key={i}
                  className="rounded-full border border-border/60 px-4 py-1.5 text-xs font-bold tracking-wide text-foreground/70 whitespace-nowrap"
                  style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            €79.3B+ combined institutional portfolio
          </p>
        </div>
      </div>

      {/* Marquee keyframe */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </SectionShell>
  );
}
