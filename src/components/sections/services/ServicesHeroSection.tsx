import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { servicesCopy } from "@/data/en/servicesPage";

export function ServicesHeroSection() {
  const { hero, stats } = servicesCopy;
  const items = [stats.equipment, stats.types, stats.exams];
  return (
    <SectionShell size="lg" bg="bg-gradient-to-b from-background to-muted/30">
      <SectionHeader
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        headlineAccent={hero.headlineAccent}
        subheadline={hero.subheadline}
      />
      <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
        {items.map((s) => (
          <StatCard key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </SectionShell>
  );
}
