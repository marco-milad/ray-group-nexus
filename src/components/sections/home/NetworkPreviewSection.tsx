import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { networkPreviewCopy } from "@/data/en/sections/networkPreview";
import { networkCopy } from "@/data/en/network";

export function NetworkPreviewSection() {
  const items = networkCopy.countries.items;
  return (
    <SectionShell bg="bg-background">
      <Reveal>
        <SectionHeader
          eyebrow={networkPreviewCopy.eyebrow}
          headline={networkPreviewCopy.headline}
          headlineAccent={networkPreviewCopy.headlineAccent}
          subheadline={networkPreviewCopy.subheadline}
        />
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
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
                  <span className="text-5xl" aria-hidden>
                    {c.flag}
                  </span>
                  <img
                    src={`https://flagcdn.com/${c.country === "Egypt" ? "eg" : c.country === "Saudi Arabia" ? "sa" : "jo"}.svg`}
                    alt=""
                    aria-hidden
                    width={36}
                    height={26}
                    className="rounded-sm object-cover opacity-80"
                  />
                </div>

                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold mt-1"
                  style={{
                    backgroundColor: "color-mix(in oklab, var(--rl-green) 12%, transparent)",
                    color: "var(--rl-green)",
                  }}
                >
                  {c.branches} branches
                </span>
              </div>

              {/* Country name */}
              <h3 className="text-2xl font-bold text-foreground mb-2">{c.country}</h3>

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
