import { ScanLine, Stethoscope, MonitorPlay } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/section-header";
import { ecosystemCopy } from "@/data/en/sections/ecosystem";

const cards = [
  { key: "diagnostics", icon: ScanLine, copy: ecosystemCopy.cards.diagnostics },
  { key: "clinics", icon: Stethoscope, copy: ecosystemCopy.cards.clinics },
  { key: "teleradiology", icon: MonitorPlay, copy: ecosystemCopy.cards.teleradiology },
];

export function EcosystemSection() {
  return (
    <Section bg="bg-background">
      <SectionHeader
        eyebrow={ecosystemCopy.eyebrow}
        headline={ecosystemCopy.headline}
        subheadline={ecosystemCopy.subheadline}
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map(({ key, icon: Icon, copy }) => (
          <div
            key={key}
            className="group rounded-2xl border border-border/60 bg-card p-7 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                backgroundColor: "color-mix(in oklab, var(--rl-green) 14%, transparent)",
                color: "var(--rl-green)",
              }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-foreground">{copy.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
