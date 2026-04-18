import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { platformsCopy } from "@/data/en/platforms";
import { brands } from "@/data/en/brands";
import { Section } from "@/components/layout/Section";
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

export const Route = createFileRoute("/platforms")({
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
  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(900px 500px at 80% -10%, color-mix(in oklab, var(--rl-mantis) 16%, transparent), transparent 60%), var(--rl-light-bg)",
        }}
      >
        <PageWrapper className="py-20 md:py-28">
          <Reveal>
            <div className="max-w-3xl">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-3 py-1 text-xs font-medium backdrop-blur"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "var(--rl-green)" }}
                />
                {hero.eyebrow}
              </div>
              <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                {hero.headline}{" "}
                <span style={{ color: "var(--rl-green)" }}>{hero.headlineAccent}</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                {hero.subheadline}
              </p>
            </div>
          </Reveal>
        </PageWrapper>
      </section>

      <Section bg="bg-background">
        <SectionHeader
          eyebrow={overview.eyebrow}
          headline={overview.headline}
          subheadline={overview.subheadline}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {brands.map((b) => (
            <Link
              key={b.id}
              to="/platforms/$slug"
              params={{ slug: b.slug }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: b.color }}
                aria-hidden
              />
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 items-center">
                  <BrandLogo brand={b} className="h-10 w-auto max-w-[160px]" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                {b.description}
              </p>
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
            </Link>
          ))}
        </div>
      </Section>

      <ContactCtaSection />
    </>
  );
}
