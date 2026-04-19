import { ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { investorsCopy } from "@/data/en/investors";

export function RisksTab() {
  const { risks } = investorsCopy;
  return (
    <div>
      <SectionHeader
        eyebrow={risks.eyebrow}
        headline={risks.headline}
        subheadline={risks.subheadline}
      />
      <div className="mx-auto mt-10 max-w-4xl space-y-4">
        {risks.items.map((r) => (
          <article
            key={r.risk}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-base font-bold text-foreground">{r.risk}</h3>
              <span
                className="inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{
                  backgroundColor: "var(--rl-light-bg)",
                  color: "var(--rl-green)",
                }}
              >
                <ShieldCheck className="h-3 w-3" />
                {r.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.mitigation}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
