import { Link } from "@tanstack/react-router";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { investorsCopy } from "@/data/en/investors";

export function InvestorsHeroSection() {
  const { hero } = investorsCopy;
  return (
    <SectionShell size="lg" bg="bg-gradient-to-b from-background to-muted/30">
      <SectionHeader
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        headlineAccent={hero.headlineAccent}
        subheadline={hero.subheadline}
      />
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          size="lg"
          style={{ backgroundColor: "var(--rl-green)", color: "white" }}
        >
          {hero.primaryCta}
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/contact">{hero.secondaryCta}</Link>
        </Button>
      </div>
    </SectionShell>
  );
}
