import { createFileRoute } from "@tanstack/react-router";
import { contactCopy } from "@/data/en/contact";
import { ContactHeroSection } from "@/components/sections/contact/ContactHeroSection";
import { ContactFormSection } from "@/components/sections/contact/ContactFormSection";
import { OfficesSection } from "@/components/sections/contact/OfficesSection";
import { InquiryTypeCardsSection } from "@/components/sections/contact/InquiryTypeCardsSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: contactCopy.seo.title },
      { name: "description", content: contactCopy.seo.description },
      { property: "og:title", content: contactCopy.seo.title },
      { property: "og:description", content: contactCopy.seo.description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <div id="contact-form">
        <ContactFormSection />
      </div>
      <OfficesSection />
      <InquiryTypeCardsSection />
    </>
  );
}
