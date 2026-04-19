import { Heart, Shield, Star, Globe } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { aboutCopy } from "@/data/en/about";

const valueIcons = [
  { icon: Heart, color: "#E53935", bg: "rgba(229,57,53,0.08)" },
  { icon: Shield, color: "#1E88E5", bg: "rgba(30,136,229,0.08)" },
  { icon: Star, color: "#F57C00", bg: "rgba(245,124,0,0.08)" },
  { icon: Globe, color: "#4F9907", bg: "rgba(79,153,7,0.08)" },
];

export function ValuesSection() {
  const { values } = aboutCopy;
  return (
    <SectionShell bg="bg-[color:var(--rl-light-bg)]">
      <SectionHeader eyebrow={values.eyebrow} headline={values.headline} />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.items.map((v, i) => {
          const { icon: Icon, color, bg } = valueIcons[i] ?? valueIcons[0];
          return (
            <Reveal key={v.key} delay={i * 80}>
              <div
                className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full flex flex-col"
                style={{ borderTopColor: color, borderTopWidth: "2px" }}
              >
                {/* Icon */}
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                  style={{ backgroundColor: bg, color }}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* Title */}
                <div className="text-lg font-semibold text-foreground mb-2">{v.title}</div>

                {/* Body */}
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{v.body}</p>

                {/* Bottom accent */}
                <div
                  className="mt-4 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: color, opacity: 0.3 }}
                />
              </div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
