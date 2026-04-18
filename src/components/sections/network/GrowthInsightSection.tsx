import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { networkCopy } from "@/data/en/network";

export function GrowthInsightSection() {
  const { growthInsight } = networkCopy;
  const max = Math.max(...growthInsight.data.map((d) => d.added), 1);

  return (
    <SectionShell>
      <SectionHeader
        eyebrow={growthInsight.eyebrow}
        headline={growthInsight.headline}
        subheadline={growthInsight.subheadline}
      />

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-5 items-end gap-3 md:gap-6">
        {growthInsight.data.map((d) => {
          const h = (d.added / max) * 100;
          return (
            <div key={d.year} className="flex flex-col items-center">
              <div className="text-sm font-bold text-foreground">{d.added}</div>
              <div className="mt-2 flex h-40 w-full items-end justify-center">
                <div
                  className="w-full max-w-[56px] rounded-t-md transition-all duration-700"
                  style={{
                    height: `${Math.max(h, 6)}%`,
                    backgroundColor: "var(--rl-green)",
                  }}
                />
              </div>
              <div className="mt-2 text-xs font-medium text-muted-foreground">
                {d.year}
              </div>
            </div>
          );
        })}
      </div>

      <blockquote
        className="mx-auto mt-10 max-w-2xl rounded-2xl border-l-4 bg-card p-6 text-center shadow-sm"
        style={{ borderColor: "var(--rl-green)" }}
      >
        <p className="text-base italic leading-relaxed text-foreground/90 md:text-lg">
          {growthInsight.soWhat}
        </p>
      </blockquote>
    </SectionShell>
  );
}
