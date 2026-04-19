import { createFileRoute } from "@tanstack/react-router";
import { homeCopy } from "@/data/en/home";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import type { SectionContract } from "@/types/section";
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
  const sections: Record<string, SectionContract> = {
    hero: { id: "hero", data: homeCopy.hero, state: "success", required: true },
    ecosystem: { id: "ecosystem", data: {}, state: "success", required: false },
    brands: { id: "brands", data: {}, state: "success", required: false },
    physicians: { id: "physicians", data: {}, state: "success", required: false },
    networkPreview: { id: "networkPreview", data: {}, state: "success", required: false },
    contactCta: { id: "contactCta", data: {}, state: "success", required: false },
  };

  return (
    <Page pageId="home" copy={homeCopy} sections={sections}>
      <Section id="hero" skeletonVariant="hero">
        {() => <HeroSection />}
      </Section>
      <Section id="ecosystem">{() => <EcosystemSection />}</Section>
      <Section id="brands" skeletonVariant="brand-chip" skeletonCount={6}>
        {() => <BrandsGridSection />}
      </Section>
      <Section id="physicians">{() => <PhysiciansSection />}</Section>
      <Section id="networkPreview">{() => <NetworkPreviewSection />}</Section>
      <Section id="contactCta">{() => <ContactCtaSection />}</Section>
    </Page>
  );
}
