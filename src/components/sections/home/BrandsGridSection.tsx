import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/button";
import { homeCopy } from "@/data/en/home";
import { brands } from "@/data/en/brands";
import { cn } from "@/lib/utils";

const COUNTRY_LABEL: Record<string, string> = {
  egypt: "Egypt",
  ksa: "Saudi Arabia",
  jordan: "Jordan",
  malta: "Malta",
};

export function BrandsGridSection() {
  const featured = brands.find((b) => b.slug === "cairo-scan") ?? brands[0];
  const others = brands.filter((b) => b.id !== featured.id);
  const lastCard = others[others.length - 1];
  const middleCards = others.slice(0, -1);

  return (
    <SectionShell bg="bg-[color:var(--rl-light-bg)]">
      <SectionHeader
        eyebrow={homeCopy.brands.eyebrow}
        headline={homeCopy.brands.headline}
        headlineAccent={homeCopy.brands.headlineAccent}
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {/* Row 1 — Featured (2 cols) + first other (1 col) */}
        <div className="lg:col-span-2">
          <BrandCard brand={featured} featured />
        </div>
        <div>
          <BrandCard brand={middleCards[0]} />
        </div>

        {/* Row 2 — 3 cards */}
        {middleCards.slice(1).map((b) => (
          <BrandCard key={b.id} brand={b} />
        ))}

        {/* Row 3 — Last card full width */}
        <div className="lg:col-span-3">
          <BrandCard brand={lastCard} wide />
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg" style={{ backgroundColor: "var(--rl-green)", color: "white" }}>
          <Link to="/platforms">{homeCopy.brands.cta}</Link>
        </Button>
      </div>
    </SectionShell>
  );
}

function BrandCard({
  brand,
  featured = false,
  wide = false,
}: {
  brand: (typeof brands)[number];
  featured?: boolean;
  wide?: boolean;
}) {
  const hasLogo = !!(brand.logo.light || brand.logo.dark);

  return (
    <Link
      to="/platforms/$slug"
      params={{ slug: brand.slug }}
      className={cn(
        "group relative flex overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg h-full",
        wide ? "flex-row items-center gap-8 p-7" : "flex-col p-6",
      )}
    >
      {/* Color accent */}
      {wide ? (
        <span
          className="absolute inset-y-0 left-0 w-1 rounded-l-2xl"
          style={{ backgroundColor: brand.color }}
          aria-hidden
        />
      ) : (
        <span
          className="absolute inset-x-0 top-0 h-1"
          style={{ backgroundColor: brand.color }}
          aria-hidden
        />
      )}

      {/* Logo / Badge */}
      <div className={cn("flex items-center", wide ? "pl-4 shrink-0 w-48" : "justify-between")}>
        <div className="flex h-12 items-center">
          {hasLogo ? (
            <BrandLogo brand={brand} variant="dark" className="h-10 w-auto max-w-[160px]" />
          ) : (
            <span
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-bold text-white"
              style={{ backgroundColor: brand.color }}
            >
              {brand.name}
            </span>
          )}
        </div>
        {!wide && (
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        )}
      </div>

      {/* Content */}
      <div className={cn("flex flex-col flex-1", !wide && "mt-5")}>
        {wide && (
          <h3 className="text-lg font-semibold mb-2" style={{ color: brand.color }}>
            {brand.name}
          </h3>
        )}
        <p
          className={cn(
            "text-muted-foreground leading-relaxed flex-1",
            featured ? "text-base md:text-lg" : "text-sm",
          )}
        >
          {brand.description}
        </p>

        <div
          className={cn(
            "flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground",
            wide ? "mt-4" : "mt-auto pt-6",
          )}
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: brand.color }} />
            {COUNTRY_LABEL[brand.country] ?? brand.country}
          </span>
          <span>· Est. {brand.founded}</span>
          {brand.branches > 0 && <span>· {brand.branches} branches</span>}
        </div>
      </div>

      {wide && (
        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground ml-auto" />
      )}
    </Link>
  );
}
