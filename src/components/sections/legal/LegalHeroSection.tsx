import { PageWrapper } from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/reveal";
import type { LegalCopy } from "@/data/en/legal";

interface LegalHeroSectionProps {
  copy: Pick<LegalCopy, "hero" | "lastUpdated">;
}

export function LegalHeroSection({ copy }: LegalHeroSectionProps) {
  const { hero, lastUpdated } = copy;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(900px 500px at 80% -10%, color-mix(in oklab, var(--rl-mantis) 18%, transparent), transparent 60%), var(--rl-light-bg)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--rl-eerie) 1px, transparent 1px), linear-gradient(90deg, var(--rl-eerie) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <PageWrapper className="relative py-16 md:py-20 lg:py-24">
        <Reveal>
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur"
              style={{ color: "var(--rl-eerie)", letterSpacing: "0.06em" }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--rl-green)" }}
              />
              {hero.eyebrow}
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              <span style={{ color: "var(--rl-green)" }}>{hero.headline}</span>
            </h1>

            <p
              className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed"
              style={{ color: "var(--rl-eerie)", opacity: 0.7 }}
            >
              {hero.subheadline}
            </p>

            <div
              className="mt-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold"
              style={{
                backgroundColor: "rgba(79,153,7,0.1)",
                color: "var(--rl-green)",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Last updated: {lastUpdated}
            </div>
          </div>
        </Reveal>
      </PageWrapper>
    </section>
  );
}
