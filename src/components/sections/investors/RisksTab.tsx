import * as React from "react";
import { ShieldCheck, ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { investorsCopy } from "@/data/en/investors";

export function RisksTab() {
  const { risks } = investorsCopy;
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  return (
    <div>
      <Reveal>
        <SectionHeader
          eyebrow={risks.eyebrow}
          headline={risks.headline}
          subheadline={risks.subheadline}
        />
      </Reveal>

      <div className="mx-auto mt-10 max-w-4xl space-y-3">
        {risks.items.map((r, i) => {
          const isOpen = expandedId === r.risk;
          return (
            <Reveal key={r.risk} delay={i * 80}>
              <article
                className="rounded-2xl border bg-card overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  borderLeftColor: "var(--rl-green)",
                  borderLeftWidth: "3px",
                  borderColor: isOpen ? "rgba(79,153,7,0.3)" : undefined,
                  boxShadow: isOpen ? "0 4px 20px rgba(79,153,7,0.08)" : undefined,
                }}
                onClick={() => setExpandedId(isOpen ? null : r.risk)}
                onMouseEnter={() => !expandedId && setExpandedId(r.risk)}
                onMouseLeave={() => !isOpen && setExpandedId(null)}
              >
                {/* Header — always visible */}
                <div className="flex items-center justify-between gap-4 p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor: isOpen ? "rgba(79,153,7,0.15)" : "rgba(79,153,7,0.08)",
                        color: "var(--rl-green)",
                      }}
                    >
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{r.risk}</h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="hidden sm:inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                      style={{
                        backgroundColor: "rgba(79,153,7,0.1)",
                        color: "var(--rl-green)",
                      }}
                    >
                      {r.status}
                    </span>
                    <ChevronDown
                      className="h-4 w-4 transition-transform duration-300"
                      style={{
                        color: "var(--rl-green)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </div>
                </div>

                {/* Expandable mitigation */}
                <div
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div
                    className="px-5 pb-5 pt-1 border-t"
                    style={{ borderColor: "rgba(79,153,7,0.15)" }}
                  >
                    <p className="text-sm leading-relaxed text-muted-foreground">{r.mitigation}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
