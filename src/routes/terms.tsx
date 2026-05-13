import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { jsonLdScript, webPageSchema, breadcrumbSchema, breadcrumbsForRoute } from "@/lib/schema";
import { termsCopy } from "@/data/en/legal";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import type { SectionContract } from "@/types/section";
import { LegalHeroSection } from "@/components/sections/legal/LegalHeroSection";
import { LegalContentSection } from "@/components/sections/legal/LegalContentSection";
import { ContactCtaSection } from "@/components/sections/shared/ContactCtaSection";

export const Route = createFileRoute("/terms")({
  head: () => {
    const url = canonical("/terms");
    return {
      meta: [
        { title: termsCopy.seo.title },
        { name: "description", content: termsCopy.seo.description },
        { property: "og:title", content: termsCopy.seo.title },
        { property: "og:description", content: termsCopy.seo.description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLdScript(
          webPageSchema({
            url,
            name: termsCopy.seo.title,
            description: termsCopy.seo.description,
            breadcrumbId: `${url}#breadcrumb`,
          }),
        ),
        jsonLdScript(breadcrumbSchema({ url, items: breadcrumbsForRoute("/terms") })),
      ],
    };
  },
  component: TermsPage,
});

function TermsPage() {
  const sections: Record<string, SectionContract> = {
    hero: { id: "hero", data: termsCopy.hero, state: "success", required: true },
    content: { id: "content", data: {}, state: "success", required: true },
    contactCta: { id: "contactCta", data: {}, state: "success", required: false },
  };

  return (
    <Page pageId="terms" copy={termsCopy} sections={sections}>
      <Section id="hero" skeletonVariant="hero">
        {() => <LegalHeroSection copy={termsCopy} />}
      </Section>
      <Section id="content">{() => <LegalContentSection copy={termsCopy} />}</Section>
      <Section id="contactCta">{() => <ContactCtaSection />}</Section>
    </Page>
  );
}
