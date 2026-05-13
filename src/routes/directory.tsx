import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { jsonLdScript, webPageSchema, breadcrumbSchema, breadcrumbsForRoute } from "@/lib/schema";
import { directoryCopy } from "@/data/en/directory";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import type { SectionContract } from "@/types/section";
import { DirectoryHeroSection } from "@/components/sections/directory/DirectoryHeroSection";
import { DirectoryBrandsSection } from "@/components/sections/directory/DirectoryBrandsSection";
import { DirectoryStatsSection } from "@/components/sections/directory/DirectoryStatsSection";
import { DirectoryHQSection } from "@/components/sections/directory/DirectoryHQSection";
import { ContactCtaSection } from "@/components/sections/shared/ContactCtaSection";

export const Route = createFileRoute("/directory")({
  head: () => {
    const url = canonical("/directory");
    return {
      meta: [
        { title: directoryCopy.seo.title },
        { name: "description", content: directoryCopy.seo.description },
        { property: "og:title", content: directoryCopy.seo.title },
        { property: "og:description", content: directoryCopy.seo.description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLdScript(
          webPageSchema({
            url,
            name: directoryCopy.seo.title,
            description: directoryCopy.seo.description,
            breadcrumbId: `${url}#breadcrumb`,
          }),
        ),
        jsonLdScript(breadcrumbSchema({ url, items: breadcrumbsForRoute("/directory") })),
      ],
    };
  },
  component: DirectoryPage,
});

function DirectoryPage() {
  const sections: Record<string, SectionContract> = {
    hero: { id: "hero", data: directoryCopy.hero, state: "success", required: true },
    brands: { id: "brands", data: {}, state: "success", required: true },
    stats: { id: "stats", data: {}, state: "success", required: false },
    hq: { id: "hq", data: {}, state: "success", required: false },
    contactCta: { id: "contactCta", data: {}, state: "success", required: false },
  };

  return (
    <Page pageId="directory" copy={directoryCopy} sections={sections}>
      <Section id="hero" skeletonVariant="hero">
        {() => <DirectoryHeroSection />}
      </Section>
      <Section id="brands" skeletonVariant="brand-chip" skeletonCount={8}>
        {() => <DirectoryBrandsSection />}
      </Section>
      <Section id="stats">{() => <DirectoryStatsSection />}</Section>
      <Section id="hq">{() => <DirectoryHQSection />}</Section>
      <Section id="contactCta">{() => <ContactCtaSection />}</Section>
    </Page>
  );
}
