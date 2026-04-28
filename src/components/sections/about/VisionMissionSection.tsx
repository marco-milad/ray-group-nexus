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
    headline: "Empowering healthier lives through groundbreaking diagnostics.",
  },
  {
    ...aboutCopy.mission,
    icon: Target,
    accentColor: "var(--medray)",
    bgAccent: "rgba(30,136,229,0.06)",
    headline: "Accurate, accessible, and innovative diagnostics — every interaction.",
  },
];

export function VisionMissionSection() {
  return (
    <SectionShell bg="bg-background">
      <div className="grid gap-6 md:grid-cols-2">
        {blocks.map(({ eyebrow, headline, quote, note, icon: Icon, accentColor, bgAccent }, i) => (
          <Reveal key={eyebrow} delay={i * 100}>
            <div
              className="relative rounded-2xl border border-border/60 bg-card p-8 md:p-10 h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md"
              style={{ borderLeftColor: accentColor, borderLeftWidth: "3px" }}
            >
              {/* Background accent */}
              <div
                className="absolute inset-0 pointer-events-none"
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

                {/* Bold headline — مختصرة */}
                <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-4">
                  {headline}
                </h3>

                {/* Divider */}
                <div
                  className="mb-4 h-px w-10"
                  style={{ backgroundColor: accentColor, opacity: 0.3 }}
                />

                {/* Full quote — أصغر وأخف */}
                <p
                  className="text-sm leading-relaxed italic flex-1"
                  style={{ color: "var(--rl-eerie)", opacity: 0.6 }}
                >
                  {quote}
                </p>

                {/* Note */}
                <div
                  className="mt-6 rounded-lg px-4 py-3"
                  style={{
                    backgroundColor: `${accentColor}10`,
                    borderLeft: `2px solid ${accentColor}`,
                  }}
                >
                  <p className="text-sm font-semibold" style={{ color: accentColor }}>
                    {note}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
