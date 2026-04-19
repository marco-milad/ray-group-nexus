import { Eye, Target } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/reveal";
import { aboutCopy } from "@/data/en/about";

const blocks = [
  {
    ...aboutCopy.vision,
    icon: Eye,
    accentColor: "var(--rl-green)",
    bgAccent: "rgba(79,153,7,0.06)",
  },
  {
    ...aboutCopy.mission,
    icon: Target,
    accentColor: "var(--medray)",
    bgAccent: "rgba(30,136,229,0.06)",
  },
];

export function VisionMissionSection() {
  return (
    <SectionShell bg="bg-background">
      <div className="grid gap-6 md:grid-cols-2">
        {blocks.map(({ eyebrow, quote, note, icon: Icon, accentColor, bgAccent }, i) => (
          <Reveal key={eyebrow} delay={i * 100}>
            <div
              className="relative rounded-2xl border border-border/60 bg-card p-8 md:p-10 h-full flex flex-col overflow-hidden"
              style={{ borderLeftColor: accentColor, borderLeftWidth: "3px" }}
            >
              {/* Background accent */}
              <div
                className="absolute inset-0 opacity-100 pointer-events-none"
                style={{ background: bgAccent }}
              />

              <div className="relative flex flex-col h-full">
                {/* Icon + eyebrow */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `${accentColor}18`,
                      color: accentColor,
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div
                    className="text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{ color: accentColor }}
                  >
                    {eyebrow}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground italic flex-1">
                  {quote}
                </p>

                {/* Divider */}
                <div
                  className="my-5 h-px w-12"
                  style={{ backgroundColor: accentColor, opacity: 0.3 }}
                />

                {/* Note */}
                <p className="text-sm text-muted-foreground font-medium">{note}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
