import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { networkPreviewCopy } from "@/data/en/sections/networkPreview";
import { networkCopy } from "@/data/en/network";

const COUNTRY_PINS = [
  {
    country: "Egypt",
    x: 52,
    y: 42,
    branches: 55,
    brands: ["Cairo Scan", "TechnoScan", "Specialized Clinics"],
    color: "var(--rl-green)",
  },
  {
    country: "Saudi Arabia",
    x: 62,
    y: 52,
    branches: 3,
    brands: ["CRC"],
    color: "#C8A96E",
  },
  {
    country: "Jordan",
    x: 55,
    y: 44,
    branches: 7,
    brands: ["MedRay"],
    color: "#1E88E5",
  },
];

function MenaMap() {
  const [hoveredCountry, setHoveredCountry] = React.useState<string | null>(null);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <svg
        viewBox="0 0 100 80"
        className="w-full h-auto"
        style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.06))" }}
      >
        {/* Background */}
        <rect width="100" height="80" fill="transparent" />

        {/* MENA region — simplified shapes */}

        {/* Egypt */}
        <path
          d="M 44 34 L 56 34 L 58 38 L 58 48 L 52 52 L 46 50 L 42 44 L 42 38 Z"
          fill={hoveredCountry === "Egypt" ? "rgba(79,153,7,0.25)" : "rgba(79,153,7,0.1)"}
          stroke="rgba(79,153,7,0.4)"
          strokeWidth="0.4"
          className="transition-all duration-300 cursor-pointer"
          onMouseEnter={() => setHoveredCountry("Egypt")}
          onMouseLeave={() => setHoveredCountry(null)}
        />

        {/* Saudi Arabia */}
        <path
          d="M 58 38 L 74 36 L 78 42 L 76 54 L 68 58 L 58 56 L 56 50 L 58 48 Z"
          fill={
            hoveredCountry === "Saudi Arabia" ? "rgba(200,169,110,0.25)" : "rgba(200,169,110,0.1)"
          }
          stroke="rgba(200,169,110,0.4)"
          strokeWidth="0.4"
          className="transition-all duration-300 cursor-pointer"
          onMouseEnter={() => setHoveredCountry("Saudi Arabia")}
          onMouseLeave={() => setHoveredCountry(null)}
        />

        {/* Jordan */}
        <path
          d="M 56 34 L 60 34 L 62 38 L 60 42 L 58 42 L 56 38 Z"
          fill={hoveredCountry === "Jordan" ? "rgba(30,136,229,0.25)" : "rgba(30,136,229,0.1)"}
          stroke="rgba(30,136,229,0.4)"
          strokeWidth="0.4"
          className="transition-all duration-300 cursor-pointer"
          onMouseEnter={() => setHoveredCountry("Jordan")}
          onMouseLeave={() => setHoveredCountry(null)}
        />

        {/* Pins */}
        {COUNTRY_PINS.map((pin) => (
          <g
            key={pin.country}
            onMouseEnter={() => setHoveredCountry(pin.country)}
            onMouseLeave={() => setHoveredCountry(null)}
            className="cursor-pointer"
          >
            {/* Pulse ring */}
            <circle
              cx={pin.x}
              cy={pin.y}
              r="3"
              fill="none"
              stroke={pin.color}
              strokeWidth="0.5"
              opacity="0.4"
              style={{
                animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
                transformOrigin: `${pin.x}px ${pin.y}px`,
              }}
            />

            {/* Pin dot */}
            <circle
              cx={pin.x}
              cy={pin.y}
              r={hoveredCountry === pin.country ? "2.5" : "1.8"}
              fill={pin.color}
              className="transition-all duration-300"
              style={{
                filter:
                  hoveredCountry === pin.country ? `drop-shadow(0 0 3px ${pin.color})` : "none",
              }}
            />

            {/* Branch count bubble */}
            {hoveredCountry === pin.country && (
              <g>
                <rect
                  x={pin.x + 3}
                  y={pin.y - 6}
                  width="18"
                  height="7"
                  rx="1.5"
                  fill="white"
                  stroke={pin.color}
                  strokeWidth="0.4"
                />
                <text x={pin.x + 4} y={pin.y - 1} fontSize="2.5" fill={pin.color} fontWeight="bold">
                  {pin.country} · {pin.branches} br.
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      {hoveredCountry &&
        (() => {
          const pin = COUNTRY_PINS.find((p) => p.country === hoveredCountry);
          if (!pin) return null;
          return (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl border bg-card px-4 py-3 shadow-lg text-center pointer-events-none"
              style={{ borderColor: `${pin.color}40`, minWidth: "180px" }}
            >
              <div className="text-sm font-bold text-foreground">{pin.country}</div>
              <div className="text-xs font-semibold mt-0.5" style={{ color: pin.color }}>
                {pin.branches} branches
              </div>
              <div className="mt-1 flex flex-wrap justify-center gap-1">
                {pin.brands.map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}

      <style>{`
        @keyframes ping {
          0%   { transform: scale(1);   opacity: 0.4; }
          75%  { transform: scale(2.5); opacity: 0;   }
          100% { transform: scale(2.5); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}

export function NetworkPreviewSection() {
  const items = networkCopy.countries.items;

  return (
    <SectionShell bg="bg-[color:var(--rl-light-bg)]">
      <Reveal>
        <SectionHeader
          eyebrow={networkPreviewCopy.eyebrow}
          headline={networkPreviewCopy.headline}
          headlineAccent={networkPreviewCopy.headlineAccent}
          subheadline={networkPreviewCopy.subheadline}
        />
      </Reveal>

      {/* SVG Map */}
      <Reveal delay={100}>
        <div className="mt-10 rounded-3xl border border-border/60 bg-card p-6 md:p-10 overflow-hidden">
          <MenaMap />
        </div>
      </Reveal>

      {/* Country cards */}
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {items.map((c, i) => (
          <Reveal key={c.country} delay={i * 100}>
            <div
              className="group relative rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md h-full flex flex-col"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(79,153,7,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
              }}
            >
              {/* Flag + branches */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://flagcdn.com/${c.country === "Egypt" ? "eg" : c.country === "Saudi Arabia" ? "sa" : "jo"}.svg`}
                    alt={c.country}
                    width={36}
                    height={26}
                    className="rounded-sm object-cover"
                  />
                  <h3 className="text-lg font-bold text-foreground">{c.country}</h3>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold mt-1 shrink-0"
                  style={{
                    backgroundColor: "color-mix(in oklab, var(--rl-green) 12%, transparent)",
                    color: "var(--rl-green)",
                  }}
                >
                  {c.branches} branches
                </span>
              </div>

              {/* Brands */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {c.brands.map((brand) => (
                  <span
                    key={brand}
                    className="rounded-md px-2 py-0.5 text-xs font-medium bg-accent text-muted-foreground"
                  >
                    {brand}
                  </span>
                ))}
              </div>

              {/* So what */}
              <p className="text-sm leading-relaxed text-muted-foreground flex-1">{c.soWhat}</p>

              {/* Bottom accent */}
              <div
                className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ backgroundColor: "var(--rl-green)" }}
              />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" style={{ backgroundColor: "var(--rl-green)", color: "white" }}>
            <Link to="/network" className="group font-semibold flex items-center">
              {networkPreviewCopy.cta}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </SectionShell>
  );
}
