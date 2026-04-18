import { createFileRoute } from "@tanstack/react-router";
import { aboutCopy } from "@/data/en/about";
import { AboutHeroSection } from "@/components/sections/about/AboutHeroSection";
import { VisionMissionSection } from "@/components/sections/about/VisionMissionSection";
import { ValuesSection } from "@/components/sections/about/ValuesSection";
import { TimelineSection } from "@/components/sections/about/TimelineSection";
import { TechPartnersSection } from "@/components/sections/about/TechPartnersSection";
import { ContactCtaSection } from "@/components/sections/shared/ContactCtaSection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: aboutCopy.seo.title },
      { name: "description", content: aboutCopy.seo.description },
      { property: "og:title", content: aboutCopy.seo.title },
      { property: "og:description", content: aboutCopy.seo.description },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <VisionMissionSection />
      <ValuesSection />
      <TimelineSection />
      <TechPartnersSection />
      <ContactCtaSection />
    </>
  );
}
