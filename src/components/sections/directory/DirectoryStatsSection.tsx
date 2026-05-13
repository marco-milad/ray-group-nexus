import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { directoryCopy } from "@/data/en/directory";

export function DirectoryStatsSection() {
  const { stats } = directoryCopy;

  return (
    <SectionShell bg="bg-[color:var(--rl-light-bg)]">
      <SectionHeader eyebrow={stats.eyebrow} headline={stats.headline} />

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {stats.items.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90}>
            <div
              className="group rounded-2xl border bg-white/70 p-6 backdrop-blur-sm transition-all duration-200 hover:bg-white/90"
              style={{ borderColor: "rgba(79,153,7,0.15)" }}
            >
              <div
                className="text-3xl md:text-4xl font-bold tracking-tight tabular-nums"
                style={{ color: "var(--rl-green)" }}
              >
                {stat.value}
              </div>
              <div className="mt-2 text-xs md:text-sm font-medium text-foreground/70">
                {stat.label}
              </div>
              <div
                className="mt-3 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: "var(--rl-green)", opacity: 0.3 }}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
