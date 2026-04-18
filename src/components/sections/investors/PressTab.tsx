import { Newspaper, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { investorsCopy } from "@/data/en/investors";

export function PressTab() {
  const { press } = investorsCopy;
  return (
    <div>
      <SectionHeader eyebrow={press.eyebrow} headline={press.headline} />

      <article className="mx-auto mt-10 max-w-4xl rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
        <div className="flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white"
            style={{ backgroundColor: "var(--rl-green)" }}
          >
            {press.featured.category}
          </span>
          <span className="text-xs text-muted-foreground">{press.featured.date}</span>
        </div>
        <h3 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">
          {press.featured.headline}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {press.featured.body}
        </p>
        <button
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ color: "var(--rl-green)" }}
        >
          {press.readMore}
          <ArrowRight className="h-4 w-4" />
        </button>
      </article>

      <div className="mx-auto mt-10 max-w-4xl">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {press.recentLabel}
        </h4>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {press.articles.map((a, i) => (
            <article
              key={i}
              className="flex gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: "var(--rl-light-bg)" }}
              >
                <Newspaper className="h-5 w-5" style={{ color: "var(--rl-green)" }} />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {a.category} · {a.date}
                </div>
                <h5 className="mt-1 text-sm font-semibold leading-snug text-foreground">
                  {a.headline}
                </h5>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
