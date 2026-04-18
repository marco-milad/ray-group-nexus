import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { physiciansCopy } from "@/data/en/sections/physicians";

export function PhysiciansSection() {
  return (
    <section
      className="py-20 md:py-28 text-white relative overflow-hidden"
      style={{ backgroundColor: "var(--rl-green)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <PageWrapper className="relative">
        <Reveal>
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              {physiciansCopy.eyebrow}
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {physiciansCopy.headline}
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/85 leading-relaxed">
              {physiciansCopy.subheadline}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {physiciansCopy.flow.map((s, i) => (
            <Reveal key={s.step} delay={i * 80}>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm h-full">
                <div className="text-xs font-mono text-white/60">{s.step}</div>
                <div className="mt-2 text-xl font-semibold">{s.title}</div>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div className="mt-12">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-foreground hover:bg-white/90"
            >
              <Link to="/contact">{physiciansCopy.cta}</Link>
            </Button>
          </div>
        </Reveal>
      </PageWrapper>
    </section>
  );
}
