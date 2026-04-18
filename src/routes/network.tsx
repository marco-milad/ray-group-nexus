import { createFileRoute } from "@tanstack/react-router";
import { networkCopy } from "@/data/en/network";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import type { SectionContract } from "@/types/section";
import { NetworkHeroSection } from "@/components/sections/network/NetworkHeroSection";
import { CountriesGridSection } from "@/components/sections/network/CountriesGridSection";
import { BrandDistributionSection } from "@/components/sections/network/BrandDistributionSection";
import { GrowthInsightSection } from "@/components/sections/network/GrowthInsightSection";
import { MapComingSoonSection } from "@/components/sections/network/MapComingSoonSection";
import { ContactCtaSection } from "@/components/sections/shared/ContactCtaSection";

export const Route = createFileRoute("/network")({
  head: () => ({
    meta: [
      { title: networkCopy.seo.title },
      { name: "description", content: networkCopy.seo.description },
      { property: "og:title", content: networkCopy.seo.title },
      { property: "og:description", content: networkCopy.seo.description },
    ],
  }),
  component: NetworkPage,
});

function NetworkPage() {
  const sections: Record<string, SectionContract> = {
    hero: { id: "hero", data: networkCopy.hero, state: "success", required: true },
    countries: { id: "countries", data: {}, state: "success", required: false },
    distribution: { id: "distribution", data: {}, state: "success", required: false },
    growth: { id: "growth", data: {}, state: "success", required: false },
    mapSoon: { id: "mapSoon", data: {}, state: "success", required: false },
    contactCta: { id: "contactCta", data: {}, state: "success", required: false },
  };

  return (
    <Page pageId="network" copy={networkCopy} sections={sections}>
      <Section id="hero" skeletonVariant="hero">{() => <NetworkHeroSection />}</Section>
      <Section id="countries" emptyContext="networkFilter">
        {() => <CountriesGridSection />}
      </Section>
      <Section id="distribution">{() => <BrandDistributionSection />}</Section>
      <Section id="growth">{() => <GrowthInsightSection />}</Section>
      <Section id="mapSoon">{() => <MapComingSoonSection />}</Section>
      <Section id="contactCta">{() => <ContactCtaSection />}</Section>
    </Page>
  );
}
