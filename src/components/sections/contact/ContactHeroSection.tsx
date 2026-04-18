import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { contactCopy } from "@/data/en/contact";

export function ContactHeroSection() {
  const { hero } = contactCopy;
  return (
    <SectionShell size="lg" bg="bg-gradient-to-b from-background to-muted/30">
      <SectionHeader
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        headlineAccent={hero.headlineAccent}
        subheadline={hero.subheadline}
      />
    </SectionShell>
  );
}
