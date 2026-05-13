import { createFileRoute } from "@tanstack/react-router";
import { canonical, hreflangLinks } from "@/lib/seo";
import {
  jsonLdScript,
  webPageSchema,
  breadcrumbSchema,
  breadcrumbsForRoute,
  networkGraphSchema,
} from "@/lib/schema";
import { networkCopy } from "@/data/en/network";
import { branches } from "@/data/en/branches";
import { brands } from "@/data/en/brands";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import type { SectionContract } from "@/types/section";
import { NetworkHeroSection } from "@/components/sections/network/NetworkHeroSection";
import { CountriesGridSection } from "@/components/sections/network/CountriesGridSection";
import { BrandDistributionSection } from "@/components/sections/network/BrandDistributionSection";
import { GrowthInsightSection } from "@/components/sections/network/GrowthInsightSection";
import { InteractiveMapSection } from "@/components/sections/network/InteractiveMapSection";
import { ContactCtaSection } from "@/components/sections/shared/ContactCtaSection";

export const Route = createFileRoute("/network")({
  head: () => {
    const url = canonical("/network");
    return {
      meta: [
        { title: networkCopy.seo.title },
        { name: "description", content: networkCopy.seo.description },
        { property: "og:title", content: networkCopy.seo.title },
        { property: "og:description", content: networkCopy.seo.description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }, ...hreflangLinks("/network")],
      scripts: [
        jsonLdScript(
          webPageSchema({
            url,
            name: networkCopy.seo.title,
            description: networkCopy.seo.description,
            breadcrumbId: `${url}#breadcrumb`,
          }),
        ),
        jsonLdScript(breadcrumbSchema({ url, items: breadcrumbsForRoute("/network") })),
        jsonLdScript(networkGraphSchema(branches, brands)),
      ],
    };
  },
  component: NetworkPage,
});

function NetworkPage() {
  const sections: Record<string, SectionContract> = {
    hero: { id: "hero", data: networkCopy.hero, state: "success", required: true },
    countries: { id: "countries", data: {}, state: "success", required: false },
    distribution: { id: "distribution", data: {}, state: "success", required: false },
    growth: { id: "growth", data: {}, state: "success", required: false },
    map: { id: "map", data: {}, state: "success", required: false },
    contactCta: { id: "contactCta", data: {}, state: "success", required: false },
  };

  return (
    <Page pageId="network" copy={networkCopy} sections={sections}>
      <Section id="hero" skeletonVariant="hero">
        {() => <NetworkHeroSection />}
      </Section>
      <Section id="countries" emptyContext="networkFilter">
        {() => <CountriesGridSection />}
      </Section>
      <Section id="distribution">{() => <BrandDistributionSection />}</Section>
      <Section id="growth">{() => <GrowthInsightSection />}</Section>
      <Section id="map">{() => <InteractiveMapSection />}</Section>
      <Section id="contactCta">{() => <ContactCtaSection />}</Section>
    </Page>
  );
}
