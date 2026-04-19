import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { platformsCopy } from "@/data/en/platforms";
import { brands } from "@/data/en/brands";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import type { SectionContract } from "@/types/section";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/reveal";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ContactCtaSection } from "@/components/sections/shared/ContactCtaSection";

const COUNTRY_LABEL: Record<string, string> = {
  egypt: "Egypt",
  ksa: "Saudi Arabia",
  jordan: "Jordan",
  malta: "Malta",
};

export const Route = createFileRoute("/platforms/")({
  head: () => ({
    meta: [
      { title: platformsCopy.seo.title },
      { name: "description", content: platformsCopy.seo.description },
      { property: "og:title", content: platformsCopy.seo.title },
      { property: "og:description", content: platformsCopy.seo.description },
    ],
  }),
  component: PlatformsPage,
});

function PlatformsPage() {
  const { hero, overview } = platformsCopy;
  const brandsState = brands.length > 0 ? "success" : "empty";

  const sections: Record<string, SectionContract> = {
    hero: { id: "hero", data: hero, state: "success", required: true },
    overview: { id: "overview", data: brands, state: brandsState, required: false },
    contactCta: { id: "contactCta", data: {}, state: "success", required: false },
  };

  return (
    <Page pageId="platforms" copy={platformsCopy} sections={sections}>
      {/* ── HERO ──────────────────────────────────────── */}
      <Section id="hero" skeletonVariant="hero">
        {() => (
          <section
            className="relative overflow-hidden"
            style={{
              background:
                "radial-gradient(900px 500px at 80% -10%, color-mix(in oklab, var(--rl-mantis) 16%, transparent), transparent 60%), var(--rl-light-bg)",
            }}
          >
            {/* Grid overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--rl-eerie) 1px, transparent 1px), linear-gradient(90deg, var(--rl-eerie) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            <PageWrapper className="relative py-20 md:py-28">
              <Reveal>
                <div className="max-w-3xl">
                  <div
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur"
                    style={{ color: "var(--rl-eerie)", letterSpacing: "0.06em" }}
                  >
                    <span
                      className="h-2 w-2 rounded-full animate-pulse"
                      style={{ backgroundColor: "var(--rl-green)" }}
                    />
                    {hero.eyebrow}
                  </div>
                  <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.04]">
                    {hero.headline}{" "}
                    <span style={{ color: "var(--rl-green)" }}>{hero.headlineAccent}</span>
                  </h1>
                  <p
                    className="mt-6 max-w-xl text-lg md:text-xl leading-relaxed"
                    style={{ color: "var(--rl-eerie)", opacity: 0.65 }}
                  >
                    {hero.subheadline}
                  </p>
                </div>
              </Reveal>
            </PageWrapper>
          </section>
        )}
      </Section>

      {/* ── OVERVIEW ──────────────────────────────────── */}
      <Section id="overview" skeletonVariant="card" skeletonCount={6} emptyContext="generic">
        {() => (
          <SectionShell bg="bg-background">
            <Reveal>
              <SectionHeader
                eyebrow={overview.eyebrow}
                headline={overview.headline}
                subheadline={overview.subheadline}
              />
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {brands.map((b, i) => (
                <Reveal key={b.id} delay={i * 80}>
                  <Link
                    to="/platforms/$slug"
                    params={{ slug: b.slug }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${b.color}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                    }}
                  >
                    {/* Color accent bar */}
                    <span
                      className="absolute inset-x-0 top-0 h-1"
                      style={{ backgroundColor: b.color }}
                      aria-hidden
                    />

                    {/* Logo + arrow */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 items-center">
                        {b.logo.light || b.logo.dark ? (
                          <BrandLogo
                            brand={b}
                            variant="dark"
                            className="h-10 w-auto max-w-[160px]"
                          />
                        ) : (
                          <span
                            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-bold text-white"
                            style={{ backgroundColor: b.color }}
                          >
                            {b.name}
                          </span>
                        )}
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>

                    {/* Description */}
                    <p className="mt-5 text-sm text-muted-foreground leading-relaxed flex-1">
                      {b.description}
                    </p>

                    {/* Meta */}
                    <div className="mt-auto pt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: b.color }}
                        />
                        {COUNTRY_LABEL[b.country] ?? b.country}
                      </span>
                      <span>· Est. {b.founded}</span>
                      {b.branches > 0 && <span>· {b.branches} branches</span>}
                    </div>

                    {/* Bottom accent */}
                    <div
                      className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                      style={{ backgroundColor: b.color, opacity: 0.3 }}
                    />
                  </Link>
                </Reveal>
              ))}
            </div>
          </SectionShell>
        )}
      </Section>

      <Section id="contactCta">{() => <ContactCtaSection />}</Section>
    </Page>
  );
}
