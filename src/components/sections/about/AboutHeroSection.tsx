import { PageWrapper } from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/reveal";
import { aboutCopy } from "@/data/en/about";

export function AboutHeroSection() {
  const { hero } = aboutCopy;
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(900px 500px at 80% -10%, color-mix(in oklab, var(--rl-mantis) 18%, transparent), transparent 60%), var(--rl-light-bg)",
      }}
    >
      <PageWrapper className="py-20 md:py-28 lg:py-36">
        <Reveal>
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-3 py-1 text-xs font-medium backdrop-blur"
              style={{ color: "var(--rl-eerie)" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--rl-green)" }}
              />
              {hero.eyebrow}
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              {hero.headline}
              <br />
              <span style={{ color: "var(--rl-green)" }}>{hero.headlineAccent}</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              {hero.subheadline}
            </p>
          </div>
        </Reveal>
      </PageWrapper>
    </section>
  );
}
