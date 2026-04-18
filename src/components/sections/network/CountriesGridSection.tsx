import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { networkCopy } from "@/data/en/network";
import { globalCopy } from "@/data/en/global";

export function CountriesGridSection() {
  const { countries } = networkCopy;
  return (
    <SectionShell>
      <SectionHeader
        eyebrow={countries.eyebrow}
        headline={countries.headline}
        subheadline={countries.subheadline}
      />
      {countries.items.length > 0 ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {countries.items.map((c) => (
            <article
              key={c.country}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl" aria-hidden>
                  {c.flag}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{c.country}</h3>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--rl-green)" }}
                  >
                    {c.branches} branches
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Brands
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {c.brands.map((b) => (
                      <span
                        key={b}
                        className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Cities
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {c.cities.join(" · ")}
                  </p>
                </div>
              </div>

              <p className="mt-5 border-l-2 pl-3 text-sm italic leading-relaxed text-foreground/80"
                style={{ borderColor: "var(--rl-green)" }}
              >
                {c.soWhat}
              </p>

              <div className="mt-6 pt-4 border-t border-border/60">
                <Button asChild variant="ghost" size="sm" className="w-full justify-between">
                  <Link to="/contact">
                    {globalCopy.cta.contactUs}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">
          {globalCopy.errors.emptyState}
        </p>
      )}
    </SectionShell>
  );
}
