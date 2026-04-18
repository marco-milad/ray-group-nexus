import { createFileRoute } from "@tanstack/react-router";
import { servicesCopy } from "@/data/en/servicesPage";
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
  return (
    <>
      <ServicesHeroSection />
      <FeaturedServicesSection />
      <CategoryTabsSection />
      <PathwaysSection />
      <ContactCtaSection />
    </>
  );
}
