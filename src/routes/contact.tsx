import { createFileRoute } from "@tanstack/react-router";
import { canonical, hreflangLinks } from "@/lib/seo";
import { jsonLdScript, webPageSchema, breadcrumbSchema, breadcrumbsForRoute } from "@/lib/schema";
import { contactCopy } from "@/data/en/contact";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import type { SectionContract } from "@/types/section";
import { ContactHeroSection } from "@/components/sections/contact/ContactHeroSection";
import { ContactFormSection } from "@/components/sections/contact/ContactFormSection";
import { OfficesSection } from "@/components/sections/contact/OfficesSection";
import { InquiryTypeCardsSection } from "@/components/sections/contact/InquiryTypeCardsSection";

export const Route = createFileRoute("/contact")({
  head: () => {
    const url = canonical("/contact");
    return {
      meta: [
        { title: contactCopy.seo.title },
        { name: "description", content: contactCopy.seo.description },
        { property: "og:title", content: contactCopy.seo.title },
        { property: "og:description", content: contactCopy.seo.description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }, ...hreflangLinks("/contact")],
      scripts: [
        jsonLdScript(
          webPageSchema({
            url,
            name: contactCopy.seo.title,
            description: contactCopy.seo.description,
            breadcrumbId: `${url}#breadcrumb`,
          }),
        ),
        jsonLdScript(breadcrumbSchema({ url, items: breadcrumbsForRoute("/contact") })),
      ],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const sections: Record<string, SectionContract> = {
    hero: { id: "hero", data: contactCopy.hero, state: "success", required: true },
    form: { id: "form", data: {}, state: "success", required: true },
    offices: { id: "offices", data: {}, state: "success", required: false },
    inquiry: { id: "inquiry", data: {}, state: "success", required: false },
  };

  return (
    <Page pageId="contact" copy={contactCopy} sections={sections}>
      <Section id="hero" skeletonVariant="hero">
        {() => <ContactHeroSection />}
      </Section>
      <Section id="form">
        {() => (
          <div id="contact-form">
            <ContactFormSection />
          </div>
        )}
      </Section>
      <Section id="offices">{() => <OfficesSection />}</Section>
      <Section id="inquiry">{() => <InquiryTypeCardsSection />}</Section>
    </Page>
  );
}
