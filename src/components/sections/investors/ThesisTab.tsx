import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { investorsCopy } from "@/data/en/investors";

export function ThesisTab() {
  const { thesis } = investorsCopy;
  return (
    <div>
      <Reveal>
        <SectionHeader
          eyebrow={thesis.eyebrow}
          headline={thesis.headline}
          subheadline={thesis.subheadline}
        />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {thesis.pillars.map((p, i) => (
          <Reveal key={p.number} delay={i * 100}>
            <article
              className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md h-full flex flex-col"
              style={{ borderTopColor: "var(--rl-green)", borderTopWidth: "2px" }}
            >
              <div
                className="text-3xl font-bold tracking-tight"
                style={{ color: "var(--rl-green)" }}
              >
                {p.number}
              </div>
              <h3 className="mt-3 text-xl font-bold text-foreground">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-1">{p.body}</p>
              <div
                className="mt-4 rounded-lg border-l-2 bg-muted/40 p-3"
                style={{ borderColor: "var(--rl-green)" }}
              >
                <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground/60">
                  So What?
                </div>
                <p className="mt-1 text-sm italic text-foreground/85">{p.soWhat}</p>
              </div>

              {/* Bottom accent */}
              <div
                className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ backgroundColor: "var(--rl-green)", opacity: 0.3 }}
              />
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
