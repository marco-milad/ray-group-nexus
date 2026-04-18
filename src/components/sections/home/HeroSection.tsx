import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/reveal";
import { homeCopy } from "@/data/en/home";
import { statsCopy } from "@/data/en/sections/stats";

const heroStats = [
  statsCopy.exams,
  statsCopy.branches,
  statsCopy.countries,
  statsCopy.consultants,
];

export function HeroSection() {
  const { hero } = homeCopy;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(1200px 600px at 20% -10%, color-mix(in oklab, var(--rl-mantis) 22%, transparent), transparent 60%), radial-gradient(900px 500px at 100% 10%, color-mix(in oklab, var(--rl-pistachio) 18%, transparent), transparent 60%), var(--rl-light-bg)",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--rl-eerie) 1px, transparent 1px), linear-gradient(90deg, var(--rl-eerie) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <PageWrapper className="relative py-20 md:py-28 lg:py-36">
        <Reveal>
          <div className="max-w-4xl">
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
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-foreground">
              {hero.headline}
              <br />
              <span style={{ color: "var(--rl-green)" }}>{hero.headlineAccent}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              {hero.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="group"
                style={{ backgroundColor: "var(--rl-green)", color: "white" }}
              >
                <Link to="/network">
                  {hero.primaryCta}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">{hero.secondaryCta}</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Stats strip */}
        <Reveal delay={120}>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border/60 bg-white/70 p-5 backdrop-blur-sm"
              >
                <div
                  className="text-2xl md:text-3xl font-bold tracking-tight"
                  style={{ color: "var(--rl-green)" }}
                >
                  {s.value}
                </div>
                <div className="mt-1 text-xs md:text-sm font-medium text-foreground/80">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </PageWrapper>
    </section>
  );
}
