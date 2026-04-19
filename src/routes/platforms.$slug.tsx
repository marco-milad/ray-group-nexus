import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Calendar, Building2 } from "lucide-react";
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

  // Group services by category, ordered by category.order
  const grouped = categories
    .map((cat) => ({
      category: cat,
      items: services.filter((s) => s.categoryId === cat.id),
    }))
    .filter((g) => g.items.length > 0);

  const servicesState = grouped.length > 0 ? "success" : "empty";

  const sections: Record<string, SectionContract> = {
    hero: { id: "hero", data: brand, state: "success", required: true },
    services: { id: "services", data: grouped, state: servicesState, required: false },
    ecosystem: { id: "ecosystem", data: {}, state: "success", required: false },
    contactCta: { id: "contactCta", data: {}, state: "success", required: false },
  };

  return (
    <Page pageId="platform-detail" copy={platformsCopy} sections={sections}>
      {/* Hero */}
      <Section id="hero" skeletonVariant="hero">
        {() => (
          <section
            className="relative overflow-hidden"
            style={{
              background: `radial-gradient(900px 480px at 80% -10%, color-mix(in oklab, ${brand.color} 16%, transparent), transparent 60%), var(--rl-light-bg)`,
            }}
          >
            <PageWrapper className="py-16 md:py-24">
              <Reveal>
                <Link
                  to="/platforms"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  All platforms
                </Link>
                <div className="mt-8 grid gap-10 lg:grid-cols-12 items-end">
                  <div className="lg:col-span-7">
                    <div className="flex h-16 items-center">
                      <BrandLogo brand={brand} className="h-14 w-auto max-w-[240px]" />
                    </div>
                    <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                      {brand.name}
                    </h1>
                    <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                      {brand.description}
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="grid grid-cols-3 gap-3">
                      <MetaTile
                        icon={<MapPin className="h-4 w-4" />}
                        label={labels.countryLabel}
                        value={COUNTRY_LABEL[brand.country] ?? brand.country}
                        accent={brand.color}
                      />
                      <MetaTile
                        icon={<Calendar className="h-4 w-4" />}
                        label={labels.foundedLabel}
                        value={String(brand.founded)}
                        accent={brand.color}
                      />
                      <MetaTile
                        icon={<Building2 className="h-4 w-4" />}
                        label={labels.branchesLabel}
                        value={brand.branches > 0 ? String(brand.branches) : "—"}
                        accent={brand.color}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </PageWrapper>
          </section>
        )}
      </Section>

      {/* Services */}
      <Section id="services" emptyContext="servicesCategory">
        {() => (
          <SectionShell bg="bg-background">
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

            <div className="mt-10 space-y-12">
              {grouped.map(({ category, items }) => (
                <div key={category.id}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3">
                    <h3 className="text-lg font-semibold text-foreground">{category.label}</h3>
                    <span className="text-xs text-muted-foreground">
                      {items.length} service{items.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((s) => (
                      <div
                        key={s.id}
                        className="rounded-xl border border-border/60 bg-card p-5 transition-shadow hover:shadow-md"
                      >
                        <div className="text-sm font-semibold text-foreground">{s.name}</div>
                        <div className="mt-1 text-xs font-medium" style={{ color: brand.color }}>
                          {s.highlight}
                        </div>
                        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                          {s.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionShell>
        )}
      </Section>

      {/* Ecosystem note */}
      <Section id="ecosystem">
        {() => (
          <SectionShell bg="bg-[color:var(--rl-light-bg)]" size="sm">
            <div className="rounded-2xl border border-border/60 bg-card p-8 md:p-10 max-w-4xl mx-auto">
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
          </SectionShell>
        )}
      </Section>

      <Section id="contactCta">{() => <ContactCtaSection />}</Section>
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
    <div className="rounded-xl border border-border/60 bg-card p-4">
      <div
        className="inline-flex h-7 w-7 items-center justify-center rounded-md"
        style={{
          backgroundColor: `color-mix(in oklab, ${accent} 14%, transparent)`,
          color: accent,
        }}
      >
        {icon}
      </div>
      <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-base font-semibold text-foreground">{value}</div>
    </div>
  );
}
