import { createFileRoute } from "@tanstack/react-router";
import { servicesCopy } from "@/data/en/servicesPage";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import type { SectionContract } from "@/types/section";
import { ServicesHeroSection } from "@/components/sections/services/ServicesHeroSection";
import { FeaturedServicesSection } from "@/components/sections/services/FeaturedServicesSection";
import { CategoryTabsSection } from "@/components/sections/services/CategoryTabsSection";
import { PathwaysSection } from "@/components/sections/services/PathwaysSection";
import { ContactCtaSection } from "@/components/sections/shared/ContactCtaSection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: servicesCopy.seo.title },
      { name: "description", content: servicesCopy.seo.description },
      { property: "og:title", content: servicesCopy.seo.title },
      { property: "og:description", content: servicesCopy.seo.description },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const sections: Record<string, SectionContract> = {
    hero: { id: "hero", data: servicesCopy.hero, state: "success", required: true },
    featured: { id: "featured", data: {}, state: "success", required: false },
    categories: { id: "categories", data: {}, state: "success", required: false },
    pathways: { id: "pathways", data: {}, state: "success", required: false },
    contactCta: { id: "contactCta", data: {}, state: "success", required: false },
  };

  return (
    <Page pageId="services" copy={servicesCopy} sections={sections}>
      <Section id="hero" skeletonVariant="hero">{() => <ServicesHeroSection />}</Section>
      <Section id="featured">{() => <FeaturedServicesSection />}</Section>
      <Section id="categories" emptyContext="servicesCategory">
        {() => <CategoryTabsSection />}
      </Section>
      <Section id="pathways">{() => <PathwaysSection />}</Section>
      <Section id="contactCta">{() => <ContactCtaSection />}</Section>
    </Page>
  );
}
