import { createFileRoute } from "@tanstack/react-router";
import { canonical, hreflangLinks } from "@/lib/seo";
import { jsonLdScript, webPageSchema, breadcrumbSchema, breadcrumbsForRoute } from "@/lib/schema";
import { privacyCopy } from "@/data/en/legal";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import type { SectionContract } from "@/types/section";
import { LegalHeroSection } from "@/components/sections/legal/LegalHeroSection";
import { LegalContentSection } from "@/components/sections/legal/LegalContentSection";
import { ContactCtaSection } from "@/components/sections/shared/ContactCtaSection";

export const Route = createFileRoute("/privacy")({
  head: () => {
    const url = canonical("/privacy");
    return {
      meta: [
        { title: privacyCopy.seo.title },
        { name: "description", content: privacyCopy.seo.description },
        { property: "og:title", content: privacyCopy.seo.title },
        { property: "og:description", content: privacyCopy.seo.description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }, ...hreflangLinks("/privacy")],
      scripts: [
        jsonLdScript(
          webPageSchema({
            url,
            name: privacyCopy.seo.title,
            description: privacyCopy.seo.description,
            breadcrumbId: `${url}#breadcrumb`,
          }),
        ),
        jsonLdScript(breadcrumbSchema({ url, items: breadcrumbsForRoute("/privacy") })),
      ],
    };
  },
  component: PrivacyPage,
});

function PrivacyPage() {
  const sections: Record<string, SectionContract> = {
    hero: { id: "hero", data: privacyCopy.hero, state: "success", required: true },
    content: { id: "content", data: {}, state: "success", required: true },
    contactCta: { id: "contactCta", data: {}, state: "success", required: false },
  };

  return (
    <Page pageId="privacy" copy={privacyCopy} sections={sections}>
      <Section id="hero" skeletonVariant="hero">
        {() => <LegalHeroSection copy={privacyCopy} />}
      </Section>
      <Section id="content">{() => <LegalContentSection copy={privacyCopy} />}</Section>
      <Section id="contactCta">{() => <ContactCtaSection />}</Section>
    </Page>
  );
}
