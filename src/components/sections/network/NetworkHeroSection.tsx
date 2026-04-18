import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { networkCopy } from "@/data/en/network";

export function NetworkHeroSection() {
  const { hero } = networkCopy;
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
