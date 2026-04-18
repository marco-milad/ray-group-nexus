import { createFileRoute } from "@tanstack/react-router";
import { networkCopy } from "@/data/en/network";
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
  return (
    <>
      <NetworkHeroSection />
      <CountriesGridSection />
      <BrandDistributionSection />
      <GrowthInsightSection />
      <MapComingSoonSection />
      <ContactCtaSection />
    </>
  );
}
