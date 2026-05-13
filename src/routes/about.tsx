import { createFileRoute } from "@tanstack/react-router";
import { canonical, hreflangLinks } from "@/lib/seo";
import { jsonLdScript, webPageSchema, breadcrumbSchema, breadcrumbsForRoute } from "@/lib/schema";
import { aboutCopy } from "@/data/en/about";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import type { SectionContract } from "@/types/section";
import { AboutHeroSection } from "@/components/sections/about/AboutHeroSection";
import { VisionMissionSection } from "@/components/sections/about/VisionMissionSection";
import { ValuesSection } from "@/components/sections/about/ValuesSection";
import { TimelineSection } from "@/components/sections/about/TimelineSection";
import { TechPartnersSection } from "@/components/sections/about/TechPartnersSection";
import { ContactCtaSection } from "@/components/sections/shared/ContactCtaSection";

export const Route = createFileRoute("/about")({
  head: () => {
    const url = canonical("/about");
    return {
      meta: [
        { title: aboutCopy.seo.title },
        { name: "description", content: aboutCopy.seo.description },
        { property: "og:title", content: aboutCopy.seo.title },
        { property: "og:description", content: aboutCopy.seo.description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }, ...hreflangLinks("/about")],
      scripts: [
        jsonLdScript(
          webPageSchema({
            url,
            name: aboutCopy.seo.title,
            description: aboutCopy.seo.description,
            breadcrumbId: `${url}#breadcrumb`,
          }),
        ),
        jsonLdScript(breadcrumbSchema({ url, items: breadcrumbsForRoute("/about") })),
      ],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  const sections: Record<string, SectionContract> = {
    hero: { id: "hero", data: aboutCopy.hero, state: "success", required: true },
    visionMission: { id: "visionMission", data: {}, state: "success", required: false },
    values: { id: "values", data: {}, state: "success", required: false },
    timeline: { id: "timeline", data: {}, state: "success", required: false },
    techPartners: { id: "techPartners", data: {}, state: "success", required: false },
    contactCta: { id: "contactCta", data: {}, state: "success", required: false },
  };

  return (
    <Page pageId="about" copy={aboutCopy} sections={sections}>
      <Section id="hero" skeletonVariant="hero">
        {() => <AboutHeroSection />}
      </Section>
      <Section id="visionMission">{() => <VisionMissionSection />}</Section>
      <Section id="values">{() => <ValuesSection />}</Section>
      <Section id="timeline">{() => <TimelineSection />}</Section>
      <Section id="techPartners" skeletonVariant="brand-chip" skeletonCount={6}>
        {() => <TechPartnersSection />}
      </Section>
      <Section id="contactCta">{() => <ContactCtaSection />}</Section>
    </Page>
  );
}
