import { SectionHeader } from "@/components/ui/section-header";
import { investorsCopy } from "@/data/en/investors";

export function ThesisTab() {
  const { thesis } = investorsCopy;
  return (
    <div>
      <SectionHeader
        eyebrow={thesis.eyebrow}
        headline={thesis.headline}
        subheadline={thesis.subheadline}
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {thesis.pillars.map((p) => (
          <article
            key={p.number}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
          >
            <div
              className="text-3xl font-bold tracking-tight"
              style={{ color: "var(--rl-green)" }}
            >
              {p.number}
            </div>
            <h3 className="mt-3 text-xl font-bold text-foreground">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {p.body}
            </p>
            <div
              className="mt-4 rounded-lg border-l-2 bg-muted/40 p-3"
              style={{ borderColor: "var(--rl-green)" }}
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground/60">
                So What?
              </div>
              <p className="mt-1 text-sm italic text-foreground/85">{p.soWhat}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
