import * as React from "react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { networkCopy } from "@/data/en/network";

export function GrowthInsightSection() {
  const { growthInsight } = networkCopy;
  const max = Math.max(...growthInsight.data.map((d) => d.added), 1);

  const [animated, setAnimated] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const lastYear = growthInsight.data[growthInsight.data.length - 1]?.year;

  return (
    <SectionShell bg="bg-[color:var(--rl-light-bg)]">
      <Reveal>
        <SectionHeader
          eyebrow={growthInsight.eyebrow}
          headline={growthInsight.headline}
          subheadline={growthInsight.subheadline}
        />
      </Reveal>

      <div ref={ref} className="mx-auto mt-12 grid max-w-4xl grid-cols-5 items-end gap-3 md:gap-6">
        {growthInsight.data.map((d, i) => {
          const h = (d.added / max) * 100;
          const isLast = d.year === lastYear;

          return (
            <div key={d.year} className="flex flex-col items-center">
              {/* Value */}
              <div
                className="text-sm font-bold mb-2 transition-all duration-300"
                style={{ color: isLast ? "var(--rl-green)" : "var(--rl-eerie)" }}
              >
                {d.added}
              </div>

              {/* Bar container */}
              <div className="flex h-40 w-full items-end justify-center">
                <div
                  className="w-full max-w-[56px] rounded-t-md transition-all duration-1000 ease-out"
                  style={{
                    height: animated ? `${Math.max(h, 6)}%` : "0%",
                    backgroundColor: "var(--rl-green)",
                    transitionDelay: `${i * 200}ms`,
                    opacity: 0.4 + (i / (growthInsight.data.length - 1)) * 0.6,
                  }}
                />
              </div>

              {/* Year */}
              <div
                className="mt-2 text-xs font-semibold"
                style={{
                  color: isLast ? "var(--rl-green)" : "var(--rl-muted)",
                }}
              >
                {d.year}
                {isLast && (
                  <span
                    className="ml-1 inline-flex h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: "var(--rl-green)" }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Reveal delay={200}>
        <blockquote
          className="mx-auto mt-10 max-w-2xl rounded-2xl border-l-4 bg-card p-6 text-center shadow-sm"
          style={{ borderColor: "var(--rl-green)" }}
        >
          <p className="text-base italic leading-relaxed text-foreground/90 md:text-lg">
            {growthInsight.soWhat}
          </p>
        </blockquote>
      </Reveal>
    </SectionShell>
  );
}
