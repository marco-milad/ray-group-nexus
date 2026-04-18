import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
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

  return (
    <Section bg="bg-[color:var(--rl-light-bg)]">
      <SectionHeader
        eyebrow={homeCopy.brands.eyebrow}
        headline={homeCopy.brands.headline}
        headlineAccent={homeCopy.brands.headlineAccent}
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 auto-rows-[1fr]">
        {/* Featured — Cairo Scan, spans 2 cols on lg */}
        <BrandCard brand={featured} featured />
        {others.map((b) => (
          <BrandCard key={b.id} brand={b} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg" variant="outline">
          <Link to="/platforms">{homeCopy.brands.cta}</Link>
        </Button>
      </div>
    </Section>
  );
}

function BrandCard({
  brand,
  featured = false,
}: {
  brand: (typeof brands)[number];
  featured?: boolean;
}) {
  return (
    <Link
      to="/platforms/$slug"
      params={{ slug: brand.slug }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg",
        featured && "lg:col-span-2 lg:row-span-1",
      )}
    >
      {/* Color accent bar */}
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: brand.color }}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 items-center">
          <BrandLogo brand={brand} className="h-10 w-auto max-w-[160px]" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>

      <p
        className={cn(
          "mt-5 text-muted-foreground leading-relaxed",
          featured ? "text-base md:text-lg" : "text-sm",
        )}
      >
        {brand.description}
      </p>

      <div className="mt-auto pt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: brand.color }}
          />
          {COUNTRY_LABEL[brand.country] ?? brand.country}
        </span>
        <span>· Est. {brand.founded}</span>
        {brand.branches > 0 && <span>· {brand.branches} branches</span>}
      </div>
    </Link>
  );
}
