import { CheckCircle2, Loader2, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { investorsCopy } from "@/data/en/investors";

const STATUS_META = {
  done: { Icon: CheckCircle2, color: "var(--rl-green)" },
  active: { Icon: Loader2, color: "#1E88E5" },
  planned: { Icon: Calendar, color: "#6b7280" },
} as const;

export function ExpansionTab() {
  const { expansion } = investorsCopy;
  return (
    <div>
      <SectionHeader eyebrow={expansion.eyebrow} headline={expansion.headline} />
      <div className="mx-auto mt-10 max-w-4xl space-y-5">
        {expansion.milestones.map((m, i) => {
          const meta = STATUS_META[m.status as keyof typeof STATUS_META];
          const label = expansion.statuses[m.status as keyof typeof expansion.statuses];
          return (
            <article
              key={`${m.year}-${i}`}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
                  style={{ backgroundColor: meta.color }}
                >
                  <meta.Icon className="h-3 w-3" />
                  {label}
                </span>
                <span className="text-xs font-medium text-muted-foreground">{m.year}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-foreground">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              <div
                className="mt-3 inline-block rounded-md px-2.5 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: "var(--rl-light-bg)",
                  color: "var(--rl-green)",
                }}
              >
                {m.metric}
              </div>
              <p className="mt-3 border-l-2 pl-3 text-sm italic text-foreground/80"
                style={{ borderColor: "var(--rl-green)" }}
              >
                {m.soWhat}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
