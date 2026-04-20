import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { networkCopy } from "@/data/en/network";
import { globalCopy } from "@/data/en/global";
import { brands } from "@/data/en/brands";

const FLAG_CODES: Record<string, string> = {
  Egypt: "eg",
  "Saudi Arabia": "sa",
  Jordan: "jo",
};

export function CountriesGridSection() {
  const { countries } = networkCopy;

  return (
    <SectionShell bg="bg-[color:var(--rl-light-bg)]">
      <Reveal>
        <SectionHeader
          eyebrow={countries.eyebrow}
          headline={countries.headline}
          subheadline={countries.subheadline}
        />
      </Reveal>

      {countries.items.length > 0 ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {countries.items.map((c, i) => (
            <Reveal key={c.country} delay={i * 100}>
              <article className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                {/* Flag + country + branches */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://flagcdn.com/${FLAG_CODES[c.country]}.svg`}
                      alt={c.country}
                      className="w-10 h-auto rounded-sm object-cover"
                      style={{ aspectRatio: "4/3" }}
                    />
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{c.country}</h3>
                      <p className="text-sm font-semibold" style={{ color: "var(--rl-green)" }}>
                        {c.branches} branches
                      </p>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Brands
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.brands.map((b) => {
                      const brand = brands.find((x) => x.name === b);
                      return (
                        <span
                          key={b}
                          className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            borderColor: brand ? `${brand.color}40` : undefined,
                            color: brand?.color ?? "var(--rl-green)",
                            backgroundColor: brand ? `${brand.color}10` : undefined,
                          }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: brand?.color ?? "var(--rl-green)" }}
                          />
                          {b}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Cities */}
                <div className="mb-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Cities
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.cities.join(" · ")}
                  </p>
                </div>

                {/* So what */}
                <p
                  className="mt-auto border-l-2 pl-3 text-sm italic leading-relaxed text-foreground/80 mb-5"
                  style={{ borderColor: "var(--rl-green)" }}
                >
                  {c.soWhat}
                </p>

                {/* CTA */}
                <div className="pt-4 border-t border-border/60">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between group/btn"
                  >
                    <Link to="/contact">
                      {globalCopy.cta.contactUs}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">{globalCopy.errors.emptyState}</p>
      )}
    </SectionShell>
  );
}
