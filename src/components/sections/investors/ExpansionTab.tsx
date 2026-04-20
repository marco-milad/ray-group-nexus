import * as React from "react";
import { CheckCircle2, Loader2, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { investorsCopy } from "@/data/en/investors";

const STATUS_META = {
  done: { Icon: CheckCircle2, color: "var(--rl-green)" },
  active: { Icon: Loader2, color: "#1E88E5" },
  planned: { Icon: Calendar, color: "#6b7280" },
} as const;

export function ExpansionTab() {
  const { expansion } = investorsCopy;
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      <Reveal>
        <SectionHeader eyebrow={expansion.eyebrow} headline={expansion.headline} />
      </Reveal>

      <div className="mx-auto mt-10 max-w-3xl">
        {expansion.milestones.map((m, i) => {
          const meta = STATUS_META[m.status as keyof typeof STATUS_META];
          const label = expansion.statuses[m.status as keyof typeof expansion.statuses];
          const isLast = i === expansion.milestones.length - 1;

          return (
            <div
              key={`${m.year}-${i}`}
              className="relative flex gap-5"
              style={{
                opacity: 0,
                animation: started ? "fadeSlideUp 1s ease forwards" : "none",
                animationDelay: `${i * 350}ms`,
              }}
            >
              {/* Timeline column */}
              <div className="flex flex-col items-center">
                <div
                  className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${meta.color}20` }}
                >
                  <meta.Icon
                    className={`h-4 w-4 ${m.status === "active" ? "animate-spin" : ""}`}
                    style={{ color: meta.color }}
                  />
                </div>
                {!isLast && (
                  <div
                    className="mt-1 w-px flex-1 mb-1"
                    style={{ backgroundColor: "rgba(79,153,7,0.2)" }}
                  />
                )}
              </div>

              {/* Card */}
              <article
                className="group mb-6 flex-1 rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:shadow-md"
                style={{
                  borderTopColor: meta.color,
                  borderTopWidth: "2px",
                }}
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
                    style={{ backgroundColor: meta.color }}
                  >
                    {m.status === "active" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    )}
                    {label}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">{m.year}</span>
                </div>

                <h3 className="text-base font-bold text-foreground">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>

                <div
                  className="mt-3 inline-block rounded-md px-2.5 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: `${meta.color}12`,
                    color: meta.color,
                  }}
                >
                  {m.metric}
                </div>

                <p
                  className="mt-3 border-l-2 pl-3 text-sm italic text-foreground/80"
                  style={{ borderColor: meta.color }}
                >
                  {m.soWhat}
                </p>

                <div
                  className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ backgroundColor: meta.color, opacity: 0.3 }}
                />
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}
