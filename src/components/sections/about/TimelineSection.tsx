import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { aboutCopy } from "@/data/en/about";
import { cn } from "@/lib/utils";

export function TimelineSection() {
  const { timeline } = aboutCopy;
  return (
    <SectionShell bg="bg-background">
      <SectionHeader eyebrow={timeline.eyebrow} headline={timeline.headline} />

      <div className="relative mt-16 max-w-5xl mx-auto">
        {/* Vertical line */}
        <div
          aria-hidden
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-px"
          style={{ backgroundColor: "color-mix(in oklab, var(--rl-green) 35%, transparent)" }}
        />

        <ol className="space-y-10">
          {timeline.events.map((e, i) => {
            const right = i % 2 === 1;
            return (
              <li key={e.year} className="relative md:grid md:grid-cols-2 md:gap-12">
                {/* Dot */}
                <span
                  className="absolute left-4 md:left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-background"
                  style={{ backgroundColor: "var(--rl-green)" }}
                  aria-hidden
                />

                <div
                  className={cn(
                    "pl-12 md:pl-0",
                    right ? "md:col-start-2 md:pl-8" : "md:col-start-1 md:pr-8 md:text-right",
                  )}
                >
                  <div
                    className="text-xs font-mono font-semibold tracking-wider"
                    style={{ color: "var(--rl-green)" }}
                  >
                    {e.year}
                  </div>
                  <h3 className="mt-1 text-lg md:text-xl font-semibold text-foreground">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {e.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionShell>
  );
}
