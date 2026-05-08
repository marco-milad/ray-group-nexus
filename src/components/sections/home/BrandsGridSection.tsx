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

const COUNTRY_FLAG: Record<string, string> = {
  egypt: "🇪🇬",
  ksa: "🇸🇦",
  jordan: "🇯🇴",
  malta: "🇲🇹",
};

export function BrandsGridSection() {
  const [visibleCount, setVisibleCount] = React.useState(0);

  React.useEffect(() => {
    const timers = brands.map((_, i) => setTimeout(() => setVisibleCount(i + 1), 200 + i * 150));
    return () => timers.forEach(clearTimeout);
  }, []);

  // ترتيب الـ brands: 0=Cairo Scan, 1=TechnoScan, 2=CRC, 3=MedRay,
  // 4=Cairo Scan Polyclinics, 5=TechnoScan Polyclinics, 6=Specialized Clinics, 7=Ray Medical
  const b = brands;

  return (
    <SectionShell bg="bg-[color:var(--rl-light-bg)]">
      <SectionHeader
        eyebrow={homeCopy.brands.eyebrow}
        headline={homeCopy.brands.headline}
        headlineAccent={homeCopy.brands.headlineAccent}
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {/* Row 1 — Cairo Scan (featured 2cols) + TechnoScan (1col) */}
        <div className="lg:col-span-2">
          <BrandCard brand={b[0]} featured index={0} visibleCount={visibleCount} />
        </div>
        <div>
          <BrandCard brand={b[1]} index={1} visibleCount={visibleCount} />
        </div>

        {/* Row 2 — CRC, MedRay, Cairo Scan Polyclinics (3 equal) */}
        <BrandCard brand={b[2]} index={2} visibleCount={visibleCount} />
        <BrandCard brand={b[3]} index={3} visibleCount={visibleCount} />
        <BrandCard brand={b[4]} index={4} visibleCount={visibleCount} />

        {/* Row 3 — TechnoScan Poly (2cols) + Specialized Clinics (1col) */}
        <div className="lg:col-span-2">
          <BrandCard brand={b[5]} featured index={5} visibleCount={visibleCount} />
        </div>
        <div>
          <BrandCard brand={b[6]} index={6} visibleCount={visibleCount} />
        </div>

        {/* Row 4 — Ray Medical (full width) */}
        <div className="lg:col-span-3">
          <BrandCard brand={b[7]} wide index={7} visibleCount={visibleCount} />
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
  const isRayMedical = brand.slug === "ray-medical";
  const isSpecializedClinics = brand.slug === "specialized-clinics";
  const isCairoScanPoly = brand.slug === "cairo-scan-polyclinics";
  const isTechnoScanPoly = brand.slug === "technoscan-polyclinics";

  const showInitials = !hasLogo && (isSpecializedClinics || isCairoScanPoly || isTechnoScanPoly);
  const initials = isSpecializedClinics ? "SC" : isCairoScanPoly ? "CS" : "TS";

  return (
    <Link
      to="/platforms/$slug"
      params={{ slug: brand.slug }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full",
        wide && "sm:flex-row sm:items-center sm:gap-8 sm:p-7",
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
      {/* Color accent top */}
      <span
        className="absolute inset-x-0 top-0 h-1 transition-all duration-300"
        style={{ backgroundColor: brand.color }}
        aria-hidden
      />

      {/* Logo / Badge */}
      <div className="flex items-center justify-between">
        <div className="flex h-12 items-center">
          {hasLogo ? (
            <BrandLogo
              brand={brand}
              variant="dark"
              className={cn("w-auto", featured ? "h-12 max-w-[200px]" : "h-10 max-w-[160px]")}
            />
          ) : showInitials ? (
            <div
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white"
              style={{ backgroundColor: brand.color }}
            >
              {initials}
            </div>
          ) : (
            <span
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-bold text-white"
              style={{ backgroundColor: brand.color }}
            >
              {brand.name}
            </span>
          )}
        </div>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          style={{ color: hovered ? brand.color : undefined }}
        />
      </div>

      {/* Content */}
      <div className={cn("flex flex-col flex-1 mt-5", wide && "sm:mt-0")}>
        {/* Ray Medical — Now Live badge */}
        {isRayMedical && (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white mb-2 w-fit"
            style={{ backgroundColor: brand.color }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            Now Live
          </span>
        )}

        <p
          className={cn(
            "text-muted-foreground leading-relaxed flex-1",
            featured ? "text-base md:text-lg" : "text-sm",
          )}
        >
          {brand.description}
        </p>

        {/* Footer */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-auto pt-6">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-sm">{COUNTRY_FLAG[brand.country] ?? "🌍"}</span>
            {COUNTRY_LABEL[brand.country] ?? brand.country}
          </span>
          <span>· Est. {brand.founded}</span>
          {brand.branches > 0 && <span>· {brand.branches} branches</span>}
        </div>
      </div>
    </Link>
  );
}
