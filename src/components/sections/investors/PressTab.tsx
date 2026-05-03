import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Newspaper, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { investorsCopy } from "@/data/en/investors";

export function PressTab() {
  const { press } = investorsCopy;

  return (
    <div>
      <Reveal>
        <SectionHeader eyebrow={press.eyebrow} headline={press.headline} />
      </Reveal>

      {/* Featured article */}
      <Reveal delay={100}>
        <article
          className="mx-auto mt-10 max-w-4xl rounded-2xl p-8 relative overflow-hidden"
          style={{ backgroundColor: "var(--rl-eerie)" }}
        >
          {/* Grid overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Green accent top */}
          <div
            className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
            style={{ backgroundColor: "var(--rl-green)" }}
          />

          <div className="relative">
            {/* Category + date */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: "rgba(79,153,7,0.2)",
                  color: "var(--rl-mantis)",
                }}
              >
                {press.featured.category}
              </span>
              <span className="text-xs text-white/40">{press.featured.date}</span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {press.featured.headline}
            </h3>

            {/* Divider */}
            <div
              className="my-5 h-px w-16"
              style={{ backgroundColor: "var(--rl-green)", opacity: 0.5 }}
            />

            {/* Body */}
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              {press.featured.body}
            </p>

            {/* CTA — يروح على contact مؤقتاً */}
            <Link
              to="/contact"
              search={{ inquiry: "press-release" } as Record<string, string>}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-all"
              style={{ color: "var(--rl-mantis)" }}
            >
              {press.readMore}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </article>
      </Reveal>

      {/* Recent articles */}
      <div className="mx-auto mt-10 max-w-4xl">
        <Reveal delay={150}>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            {press.recentLabel}
          </h4>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {press.articles.map((a, i) => (
            <Reveal key={i} delay={i * 80}>
              <Link
                to="/contact"
                search={{ inquiry: "press-inquiry" } as Record<string, string>}
                className="group flex gap-4 rounded-xl border border-border/60 bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md h-full"
                style={{ borderLeftColor: "var(--rl-green)", borderLeftWidth: "2px" }}
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: "var(--rl-light-bg)",
                    color: "var(--rl-green)",
                  }}
                >
                  <Newspaper className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {a.category} · {a.date}
                  </div>
                  <h5 className="mt-1 text-sm font-semibold leading-snug text-foreground">
                    {a.headline}
                  </h5>
                </div>
                <ArrowRight
                  className="h-4 w-4 shrink-0 self-center text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5"
                  style={{ color: "var(--rl-green)" }}
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
