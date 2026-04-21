import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
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

  const allBrands = [featured, ...middleCards, lastCard];
  const [visibleCount, setVisibleCount] = React.useState(0);

  React.useEffect(() => {
    const timers = allBrands.map((_, i) => setTimeout(() => setVisibleCount(i + 1), 200 + i * 180));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SectionShell bg="bg-[color:var(--rl-light-bg)]">
      <SectionHeader
        eyebrow={homeCopy.brands.eyebrow}
        headline={homeCopy.brands.headline}
        headlineAccent={homeCopy.brands.headlineAccent}
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BrandCard brand={featured} featured index={0} visibleCount={visibleCount} />
        </div>
        <div>
          <BrandCard brand={middleCards[0]} index={1} visibleCount={visibleCount} />
        </div>
        {middleCards.slice(1).map((b, i) => (
          <BrandCard key={b.id} brand={b} index={i + 2} visibleCount={visibleCount} />
        ))}
        <div className="lg:col-span-3">
          <BrandCard brand={lastCard} wide index={5} visibleCount={visibleCount} />
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button
          asChild
          size="lg"
          className="group font-semibold"
          style={{ backgroundColor: "var(--rl-green)", color: "white" }}
        >
          <Link to="/network" className="flex items-center gap-2">
            {homeCopy.brands.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
}

function BrandCard({
  brand,
  featured = false,
  wide = false,
  index = 0,
  visibleCount = 0,
}: {
  brand: (typeof brands)[number];
  featured?: boolean;
  wide?: boolean;
  index?: number;
  visibleCount?: number;
}) {
  const hasLogo = !!(brand.logo.light || brand.logo.dark);
  const [hovered, setHovered] = React.useState(false);

  return (
    <Link
      to="/platforms/$slug"
      params={{ slug: brand.slug }}
      className={cn(
        "group relative flex overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full",
        wide ? "flex-col p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-7" : "flex-col p-6",
      )}
      style={{
        opacity: visibleCount > index ? 1 : 0,
        transform: visibleCount > index ? "translateY(0)" : "translateY(24px)",
        transition:
          "opacity 0.7s ease, transform 0.7s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        borderColor: hovered ? `${brand.color}60` : undefined,
        boxShadow: hovered ? `0 8px 30px ${brand.color}20` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Color accent */}
      {wide ? (
        <span
          className="absolute inset-y-0 left-0 w-1 rounded-l-2xl transition-all duration-300 hidden sm:block"
          style={{ backgroundColor: brand.color }}
          aria-hidden
        />
      ) : (
        <span
          className="absolute inset-x-0 top-0 h-1 transition-all duration-300"
          style={{ backgroundColor: brand.color }}
          aria-hidden
        />
      )}

      {/* Wide — top accent on mobile */}
      {wide && (
        <span
          className="absolute inset-x-0 top-0 h-1 block sm:hidden"
          style={{ backgroundColor: brand.color }}
          aria-hidden
        />
      )}

      {/* Logo / Badge */}
      <div
        className={cn("flex items-center", wide ? "shrink-0 sm:pl-4 sm:w-48" : "justify-between")}
      >
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
          <ArrowUpRight
            className="h-4 w-4 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            style={{ color: hovered ? brand.color : undefined }}
          />
        )}
      </div>

      {/* Content */}
      <div className={cn("flex flex-col flex-1", !wide && "mt-5", wide && "mt-4 sm:mt-0")}>
        {wide && (
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold" style={{ color: brand.color }}>
              {brand.name}
            </h3>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: brand.color }}
            >
              Teleradiology
            </span>
          </div>
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
        <ArrowUpRight
          className="h-5 w-5 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ml-auto hidden sm:block"
          style={{ color: hovered ? brand.color : undefined }}
        />
      )}
    </Link>
  );
}
