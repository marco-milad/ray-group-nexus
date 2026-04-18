import { SectionShell } from "@/components/layout/SectionShell";
import { aboutCopy } from "@/data/en/about";

export function VisionMissionSection() {
  const blocks = [aboutCopy.vision, aboutCopy.mission];
  return (
    <SectionShell bg="bg-background">
      <div className="grid gap-6 md:grid-cols-2">
        {blocks.map((b) => (
          <div
            key={b.eyebrow}
            className="rounded-2xl border border-border/60 bg-card p-8 md:p-10"
          >
            <div
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--rl-green)" }}
            >
              {b.eyebrow}
            </div>
            <p className="mt-5 text-xl md:text-2xl font-medium leading-snug text-foreground">
              {b.quote}
            </p>
            <p className="mt-5 text-sm text-muted-foreground">{b.note}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
