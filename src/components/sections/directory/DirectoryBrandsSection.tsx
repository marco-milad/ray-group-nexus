import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { brands } from "@/data/en/brands";
import { directoryCopy } from "@/data/en/directory";
import type { Brand } from "@/types/brand";

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

function BrandDirectoryCard({ brand }: { brand: Brand }) {
  const hasLogo = !!(brand.logo.light || brand.logo.dark);
  const branchLabel =
    brand.branches > 0
      ? `${brand.branches} branch${brand.branches === 1 ? "" : "es"}`
      : "Teleradiology";

  return (
    <Link
      to="/platforms/$slug"
      params={{ slug: brand.slug }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
      style={{ borderTopColor: brand.color, borderTopWidth: "3px" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 items-center">
          {hasLogo ? (
            <BrandLogo brand={brand} variant="dark" className="h-10 w-auto max-w-[160px]" />
          ) : (
            <span
              className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-bold text-white"
              style={{ backgroundColor: brand.color }}
            >
              {brand.name}
            </span>
          )}
        </div>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          style={{ color: brand.color }}
        />
      </div>

      <h3 className="mt-5 text-lg font-bold text-foreground">{brand.name}</h3>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="text-sm">{COUNTRY_FLAG[brand.country] ?? "🌍"}</span>
          {COUNTRY_LABEL[brand.country] ?? brand.country}
        </span>
        <span aria-hidden>·</span>
        <span>{branchLabel}</span>
        <span aria-hidden>·</span>
        <span>Est. {brand.founded}</span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground flex-1">
        {brand.description}
      </p>

      <div
        className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold"
        style={{ color: brand.color }}
      >
        View platform
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

export function DirectoryBrandsSection() {
  const { brands: copy } = directoryCopy;

  return (
    <SectionShell bg="bg-background">
      <SectionHeader
        eyebrow={copy.eyebrow}
        headline={copy.headline}
        subheadline={copy.subheadline}
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand, i) => (
          <Reveal key={brand.id} delay={i * 80}>
            <BrandDirectoryCard brand={brand} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
