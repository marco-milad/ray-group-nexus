import * as React from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { Newspaper, ArrowRight, X } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { investorsCopy } from "@/data/en/investors";

type Article = {
  category: string;
  headline: string;
  date: string;
  content?: string;
};

const BOILERPLATE =
  "Ray Lab Group is a regional diagnostic imaging and healthcare platform operating across Egypt, Jordan and Saudi Arabia through established brands including Cairo Scan, TechnoScan, MedRay Jordan and CRC. The Group's services span diagnostic imaging, laboratory testing, specialized outpatient care and teleradiology, supported by consultant-led expertise, modern medical technology and a patient-centered operating model.";

function PressModal({ article, onClose }: { article: Article; onClose: () => void }) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-card border border-border/60 shadow-2xl"
        style={{
          borderTopColor: "var(--rl-green)",
          borderTopWidth: "3px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border/40 px-6 py-5 flex items-start justify-between gap-4 z-10">
          <div>
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider mb-2"
              style={{
                backgroundColor: "rgba(79,153,7,0.1)",
                color: "var(--rl-green)",
              }}
            >
              {article.category}
            </span>
            <h3 className="text-lg font-bold text-foreground leading-snug">{article.headline}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{article.date}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-accent transition-colors mt-1"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {article.content ? (
            <div className="space-y-4">
              {article.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Full release coming soon.</p>
          )}

          {/* Boilerplate */}
          <div className="mt-6 pt-5 border-t border-border/40">
            <p className="text-xs leading-relaxed text-muted-foreground/60 italic">{BOILERPLATE}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border/40 px-6 py-4 flex items-center justify-between">
          <Link
            to="/contact"
            search={{ inquiry: "press-inquiry" } as Record<string, string>}
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 hover:gap-2"
            style={{ color: "var(--rl-green)" }}
            onClick={onClose}
          >
            Media Inquiry
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={onClose}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modal, document.body) : null;
}

export function PressTab() {
  const { press } = investorsCopy;
  const [activeArticle, setActiveArticle] = React.useState<Article | null>(null);

  return (
    <div>
      {/* Modal */}
      {activeArticle && (
        <PressModal article={activeArticle} onClose={() => setActiveArticle(null)} />
      )}

      <Reveal>
        <SectionHeader eyebrow={press.eyebrow} headline={press.headline} />
      </Reveal>

      {/* Featured article */}
      <Reveal delay={100}>
        <article
          className="mx-auto mt-10 max-w-4xl rounded-2xl p-8 relative overflow-hidden cursor-pointer"
          style={{ backgroundColor: "var(--rl-eerie)" }}
          onClick={() =>
            setActiveArticle({
              category: press.featured.category,
              headline: press.featured.headline,
              date: press.featured.date,
              content: press.featured.content,
            })
          }
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

            {/* CTA */}
            <button
              className="group/btn mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-all"
              style={{ color: "var(--rl-mantis)" }}
            >
              {press.readMore}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
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
              <article
                className="group flex gap-4 rounded-xl border border-border/60 bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md h-full cursor-pointer"
                style={{ borderLeftColor: "var(--rl-green)", borderLeftWidth: "2px" }}
                onClick={() => setActiveArticle(a)}
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
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
