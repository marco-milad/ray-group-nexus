import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { aboutCopy } from "@/data/en/about";
import { cn } from "@/lib/utils";

export function TimelineSection() {
  const { timeline } = aboutCopy;
  const events = timeline.events;

  return (
    <SectionShell bg="bg-background">
      <SectionHeader eyebrow={timeline.eyebrow} headline={timeline.headline} />

      <div className="relative mt-16 max-w-5xl mx-auto">
        {/* Vertical line */}
        <div
          aria-hidden
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-px"
          style={{
            background: `linear-gradient(to bottom, transparent, var(--rl-green) 10%, var(--rl-green) 90%, transparent)`,
            opacity: 0.3,
          }}
        />

        <ol className="space-y-8">
          {events.map((e, i) => {
            const right = i % 2 === 1;
            const isLast = i === events.length - 1;
            const isRecent = i >= events.length - 2;

            return (
              <Reveal key={e.year} delay={i * 120}>
                <li className="relative md:grid md:grid-cols-2 md:gap-12">
                  {/* Dot */}
                  <span
                    className="absolute left-4 md:left-1/2 top-5 h-4 w-4 -translate-x-1/2 rounded-full ring-4 ring-background z-10"
                    style={{
                      backgroundColor: isRecent ? "var(--rl-green)" : "var(--rl-pistachio)",
                    }}
                    aria-hidden
                  >
                    {isLast && (
                      <span
                        className="absolute inset-0 rounded-full animate-ping opacity-40"
                        style={{ backgroundColor: "var(--rl-green)" }}
                      />
                    )}
                  </span>

                  {/* Card */}
                  <div
                    className={cn(
                      "pl-12 md:pl-0",
                      right ? "md:col-start-2 md:pl-8" : "md:col-start-1 md:pr-8",
                    )}
                  >
                    <div
                      className={cn(
                        "group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
                        isRecent
                          ? "border-[rgba(79,153,7,0.3)] bg-[color-mix(in_oklab,var(--rl-green)_5%,white)]"
                          : "border-border/60 bg-card",
                      )}
                    >
                      {/* Year badge */}
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wider"
                          style={{
                            backgroundColor: isRecent
                              ? "rgba(79,153,7,0.12)"
                              : "rgba(79,153,7,0.06)",
                            color: "var(--rl-green)",
                          }}
                        >
                          {e.year}
                        </span>
                        {isRecent && (
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
                            style={{
                              backgroundColor: "rgba(79,153,7,0.1)",
                              color: "var(--rl-green)",
                            }}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full animate-pulse"
                              style={{ backgroundColor: "var(--rl-green)" }}
                            />
                            Recent
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-foreground mb-2">{e.title}</h3>

                      {/* Body */}
                      <p className="text-sm text-muted-foreground leading-relaxed">{e.body}</p>

                      {/* Bottom accent */}
                      <div
                        className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                        style={{
                          backgroundColor: "var(--rl-green)",
                          opacity: 0.3,
                        }}
                      />
                    </div>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </SectionShell>
  );
}
