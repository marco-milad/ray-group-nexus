import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Calendar, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/reveal";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ContactCtaSection } from "@/components/sections/shared/ContactCtaSection";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import type { SectionContract } from "@/types/section";
import { getBrand } from "@/lib/getBrand";
import { getServicesByBrand } from "@/data/en/services";
import { getCategoryById, categories } from "@/data/en/categories";
import { platformsCopy } from "@/data/en/platforms";
import { brands } from "@/data/en/brands";
import * as React from "react";

const COUNTRY_LABEL: Record<string, string> = {
  egypt: "Egypt",
  ksa: "Saudi Arabia",
  jordan: "Jordan",
  malta: "Malta",
};

function BrandErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <PageWrapper className="py-24 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <Button
        className="mt-6"
        onClick={() => {
          router.invalidate();
          reset();
        }}
      >
        Retry
      </Button>
    </PageWrapper>
  );
}

function BrandNotFound() {
  const { slug } = Route.useParams();
  return (
    <PageWrapper className="py-24 text-center">
      <h2 className="text-3xl font-semibold">Platform not found</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        We couldn't find a platform matching "{slug}".
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link to="/platforms">View all platforms</Link>
        </Button>
      </div>
    </PageWrapper>
  );
}

export const Route = createFileRoute("/platforms/$slug")({
  loader: ({ params }) => {
    const brand = getBrand(params.slug);
    if (brand.id === "unknown") throw notFound();
    return { brand };
  },
  head: ({ loaderData }) => {
    const brand = loaderData?.brand;
    const title = brand ? `${brand.name} — Ray Lab Group` : "Platform — Ray Lab Group";
    const description = brand?.description ?? "Ray Lab Group diagnostic platform.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  errorComponent: BrandErrorComponent,
  notFoundComponent: BrandNotFound,
  component: BrandPage,
});

void getCategoryById;

function BrandPage() {
  const { brand } = Route.useLoaderData();
  const services = getServicesByBrand(brand.slug);
  const labels = platformsCopy.brandPage;

  const grouped = categories
    .map((cat) => ({
      category: cat,
      items: services.filter((s) => s.categoryId === cat.id),
    }))
    .filter((g) => g.items.length > 0);

  const servicesState = grouped.length > 0 ? "success" : "empty";
  const otherBrands = brands.filter((b) => b.slug !== brand.slug);

  const metaTiles = [
    {
      icon: <MapPin className="h-4 w-4" />,
      label: labels.countryLabel,
      value: COUNTRY_LABEL[brand.country] ?? brand.country,
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: labels.foundedLabel,
      value: String(brand.founded),
    },
    {
      icon: <Building2 className="h-4 w-4" />,
      label: labels.branchesLabel,
      value: brand.branches > 0 ? `${brand.branches} branches` : "—",
    },
  ];

  const sections: Record<string, SectionContract> = {
    hero: { id: "hero", data: brand, state: "success", required: true },
    services: { id: "services", data: grouped, state: servicesState, required: false },
    ecosystem: { id: "ecosystem", data: {}, state: "success", required: false },
    contactCta: { id: "contactCta", data: {}, state: "success", required: false },
  };

  return (
    <Page pageId="platform-detail" copy={platformsCopy} sections={sections}>
      {/* ── HERO ──────────────────────────────────────── */}
      <Section id="hero" skeletonVariant="hero">
        {() => (
          <section
            className="relative overflow-hidden"
            style={{
              background: `radial-gradient(900px 480px at 80% -10%, color-mix(in oklab, ${brand.color} 16%, transparent), transparent 60%), var(--rl-light-bg)`,
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--rl-eerie) 1px, transparent 1px), linear-gradient(90deg, var(--rl-eerie) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            <PageWrapper className="relative py-16 md:py-24">
              <Reveal>
                <Link
                  to="/platforms"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  All platforms
                </Link>

                <div className="mt-8 grid gap-10 lg:grid-cols-12 items-center">
                  {/* Left — brand info */}
                  <div className="lg:col-span-7">
                    <div className="flex h-16 items-center">
                      <BrandLogo
                        brand={brand}
                        variant="dark"
                        className="h-14 w-auto max-w-[240px]"
                      />
                    </div>
                    <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                      {brand.name}
                    </h1>
                    <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                      {brand.description}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button
                        asChild
                        size="lg"
                        className="group"
                        style={{ backgroundColor: brand.color, color: "white" }}
                      >
                        <Link to="/contact">
                          {labels.primaryCta}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <Link to="/contact">{labels.secondaryCta}</Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right — meta tiles */}
                  <div className="lg:col-span-5">
                    <div className="grid grid-cols-1 gap-3">
                      {metaTiles.map((tile, i) => (
                        <Reveal key={tile.label} delay={i * 100}>
                          <MetaTile
                            icon={tile.icon}
                            label={tile.label}
                            value={tile.value}
                            accent={brand.color}
                          />
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </PageWrapper>
          </section>
        )}
      </Section>

      {/* ── SERVICES ──────────────────────────────────── */}
      <Section id="services" emptyContext="servicesCategory">
        {() => (
          <SectionShell bg="bg-background">
            <Reveal>
              <div className="max-w-3xl">
                <div
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{ color: brand.color }}
                >
                  {labels.servicesLabel}
                </div>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
                  What {brand.name} Offers
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 space-y-12">
              {grouped.map(({ category, items }) => (
                <div key={category.id}>
                  <Reveal>
                    <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-3 mb-5">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: brand.color }}
                        />
                        <h3 className="text-lg font-semibold text-foreground">{category.label}</h3>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {items.length} service{items.length === 1 ? "" : "s"}
                      </span>
                    </div>
                  </Reveal>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((s, idx) => (
                      <Reveal key={s.id} delay={idx * 80}>
                        <div
                          className="group rounded-xl border border-border/60 bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md h-full"
                          style={{ borderTopColor: brand.color, borderTopWidth: "2px" }}
                        >
                          <div className="text-sm font-semibold text-foreground">{s.name}</div>
                          <div
                            className="mt-1 text-xs font-semibold"
                            style={{ color: brand.color }}
                          >
                            {s.highlight}
                          </div>
                          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionShell>
        )}
      </Section>

      {/* ── ECOSYSTEM NOTE ────────────────────────────── */}
      <Section id="ecosystem">
        {() => (
          <SectionShell bg="bg-[color:var(--rl-light-bg)]" size="sm">
            <Reveal>
              <div
                className="rounded-2xl border p-8 md:p-10 max-w-4xl mx-auto"
                style={{ borderColor: `${brand.color}30` }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "var(--rl-green)" }}
                >
                  {labels.ecosystemLabel}
                </div>
                <p className="mt-4 text-base md:text-lg text-foreground leading-relaxed">
                  {platformsCopy.ecosystemNote}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild style={{ backgroundColor: brand.color, color: "white" }}>
                    <Link to="/contact">{labels.primaryCta}</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/contact">{labels.secondaryCta}</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </SectionShell>
        )}
      </Section>

      {/* ── OTHER PLATFORMS ───────────────────────────── */}
      <Section id="contactCta">
        {() => (
          <>
            <SectionShell bg="bg-background">
              <Reveal>
                <div className="text-center mb-10">
                  <div
                    className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
                    style={{ color: "var(--rl-green)" }}
                  >
                    Ray Lab Group
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Other Platforms</h2>
                </div>
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {otherBrands.map((b, i) => (
                  <Reveal key={b.id} delay={i * 80}>
                    <Link
                      to="/platforms/$slug"
                      params={{ slug: b.slug }}
                      className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                      style={{ borderLeftColor: b.color, borderLeftWidth: "3px" }}
                    >
                      <div className="flex h-10 items-center shrink-0">
                        <BrandLogo brand={b} variant="dark" className="h-8 w-auto max-w-[100px]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground truncate">
                          {b.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {b.branches > 0 ? `${b.branches} branches` : "Coming soon"}
                          {" · "}
                          {COUNTRY_LABEL[b.country] ?? b.country}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Reveal>
                ))}
              </div>
            </SectionShell>
            <ContactCtaSection />
          </>
        )}
      </Section>
    </Page>
  );
}

function MetaTile({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-card p-4">
      <div
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
        style={{
          backgroundColor: `color-mix(in oklab, ${accent} 14%, transparent)`,
          color: accent,
        }}
      >
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="mt-0.5 text-base font-semibold text-foreground">{value}</div>
      </div>
    </div>
  );
}
