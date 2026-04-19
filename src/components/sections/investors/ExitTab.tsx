import { Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { investorsCopy } from "@/data/en/investors";

export function ExitTab() {
  const { exit } = investorsCopy;
  return (
    <div>
      <SectionHeader
        eyebrow={exit.eyebrow}
        headline={exit.headline}
        subheadline={exit.subheadline}
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {exit.statements.map((s) => (
          <article
            key={s.title}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold" style={{ color: "var(--rl-green)" }}>
              {s.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </article>
        ))}
      </div>

      <div
        className="mx-auto mt-12 max-w-3xl rounded-3xl p-8 text-center text-white md:p-12"
        style={{ backgroundColor: "var(--rl-green)" }}
      >
        <h3 className="text-2xl font-bold md:text-3xl">{exit.cta.label}</h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
          {exit.cta.body}
        </p>
        <div className="mt-6">
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">{exit.cta.button}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
