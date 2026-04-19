import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { physiciansCopy } from "@/data/en/sections/physicians";

export function PhysiciansSection() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const total = physiciansCopy.flow.length;

  React.useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % total);
    }, 2000);
    return () => clearInterval(timer);
  }, [paused, total]);

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
            <p className="mt-5 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
              {physiciansCopy.subheadline}
            </p>
          </div>
        </Reveal>

        {/* Progress bar — desktop */}
        <Reveal delay={80}>
          <div className="mt-12 hidden lg:block">
            <div className="relative flex items-center justify-between mb-6">
              {physiciansCopy.flow.map((s, i) => (
                <React.Fragment key={s.step}>
                  <button
                    onClick={() => {
                      setActiveStep(i);
                      setPaused(true);
                      setTimeout(() => setPaused(false), 4000);
                    }}
                    className="relative z-10 flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <div
                      className="h-10 w-10 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300"
                      style={{
                        backgroundColor: activeStep === i ? "white" : "rgba(255,255,255,0.15)",
                        borderColor: activeStep === i ? "white" : "rgba(255,255,255,0.3)",
                        color: activeStep === i ? "var(--rl-green)" : "white",
                        transform: activeStep === i ? "scale(1.15)" : "scale(1)",
                      }}
                    >
                      {s.step}
                    </div>
                    <span
                      className="text-sm font-semibold transition-all duration-300"
                      style={{ opacity: activeStep === i ? 1 : 0.5 }}
                    >
                      {s.title}
                    </span>
                  </button>

                  {i < total - 1 && (
                    <div className="flex-1 mx-3 relative h-0.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-white rounded-full transition-all duration-500"
                        style={{
                          width: activeStep > i ? "100%" : activeStep === i ? "50%" : "0%",
                        }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Active step detail */}
            <div
              className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm"
              style={{ minHeight: "120px" }}
            >
              {physiciansCopy.flow.map((s, i) =>
                activeStep === i ? (
                  <div key={s.step}>
                    <div className="text-xs font-mono text-white/60 mb-2">Step {s.step}</div>
                    <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                    <p className="text-white/85 text-base leading-relaxed max-w-2xl">{s.body}</p>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </Reveal>

        {/* Mobile — static cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
          {physiciansCopy.flow.map((s, i) => (
            <Reveal key={s.step} delay={i * 80}>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm h-full">
                <div
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold mb-4"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                >
                  {s.step}
                </div>
                <div className="text-xl font-semibold">{s.title}</div>
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
              className="group bg-white text-foreground hover:bg-white/90 font-semibold"
            >
              <Link to="/contact">
                {physiciansCopy.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </PageWrapper>
    </section>
  );
}
