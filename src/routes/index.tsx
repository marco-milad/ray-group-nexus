import { createFileRoute } from "@tanstack/react-router";
import { homeCopy } from "@/data/en/home";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { EcosystemSection } from "@/components/sections/home/EcosystemSection";
import { BrandsGridSection } from "@/components/sections/home/BrandsGridSection";
import { PhysiciansSection } from "@/components/sections/home/PhysiciansSection";
import { NetworkPreviewSection } from "@/components/sections/home/NetworkPreviewSection";
import { ContactCtaSection } from "@/components/sections/shared/ContactCtaSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: homeCopy.seo.title },
      { name: "description", content: homeCopy.seo.description },
      { property: "og:title", content: homeCopy.seo.title },
      { property: "og:description", content: homeCopy.seo.description },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <EcosystemSection />
      <BrandsGridSection />
      <PhysiciansSection />
      <NetworkPreviewSection />
      <ContactCtaSection />
    </>
  );
}
