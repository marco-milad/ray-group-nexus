import { PageWrapper } from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/reveal";
import { directoryCopy } from "@/data/en/directory";

export function DirectoryHeroSection() {
  const { hero } = directoryCopy;

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

      <PageWrapper className="relative py-20 md:py-24 lg:py-28">
        <Reveal>
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur"
              style={{ color: "var(--rl-eerie)", letterSpacing: "0.06em" }}
            >
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--rl-green)" }}
              />
              {hero.eyebrow}
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Ray Lab Group —{" "}
              <span style={{ color: "var(--rl-green)" }}>Our Brands &amp; Network</span>
            </h1>

            <p
              className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--rl-eerie)", opacity: 0.7 }}
            >
              {hero.subheadline}
            </p>
          </div>
        </Reveal>
      </PageWrapper>
    </section>
  );
}
