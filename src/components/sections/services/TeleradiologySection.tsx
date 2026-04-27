import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Users, Radio } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

const stats = [
  {
    value: "90 min",
    label: "Average turnaround",
    context: "From scan upload to structured report",
    icon: Clock,
  },
  {
    value: "24/7",
    label: "Always available",
    context: "Including weekends & public holidays",
    icon: Radio,
  },
  {
    value: "60+",
    label: "Subspecialty consultants",
    context: "Neuro, cardiac, MSK, oncology & more",
    icon: Users,
  },
];

const steps = [
  {
    number: "01",
    title: "Submit the Case",
    body: "Refer via our physician portal or contact our coordination team directly.",
  },
  {
    number: "02",
    title: "Matched to Subspecialist",
    body: "Your case is routed to the right consultant — neuro, cardiac, MSK, or oncology.",
  },
  {
    number: "03",
    title: "Receive the Report",
    body: "Structured subspecialty report delivered in 90 minutes, any time of day.",
  },
];

export function TeleradiologySection() {
  const [visibleStats, setVisibleStats] = React.useState(0);
  const statsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stats.forEach((_, i) => setTimeout(() => setVisibleStats(i + 1), i * 250));
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: "var(--rl-eerie)" }}
    >
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Green glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, var(--rl-green) 0%, transparent 70%)" }}
      />

      <PageWrapper className="relative">
        {/* Header — centered */}
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur mb-6"
              style={{ color: "var(--rl-mantis)" }}
            >
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--rl-green)" }}
              />
              Ray Medical — Teleradiology
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.04] text-white">
              The Fastest Subspecialty
              <br />
              <span style={{ color: "var(--rl-mantis)" }}>Reporting in MENA.</span>
            </h2>

            <p className="mt-6 max-w-xl mx-auto text-lg leading-relaxed text-white/70">
              No comparable network exists in the region. 60+ consultant radiologists, available
              around the clock — results in 90 minutes, guaranteed.
            </p>
          </div>
        </Reveal>

        {/* Stats — stagger animation */}
        <div ref={statsRef} className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                style={{
                  opacity: visibleStats > i ? 1 : 0,
                  transform: visibleStats > i ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="text-3xl md:text-4xl font-bold tracking-tight"
                    style={{ color: "var(--rl-mantis)" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="rounded-lg p-1.5"
                    style={{
                      backgroundColor: "rgba(113,194,71,0.15)",
                      color: "var(--rl-mantis)",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-sm font-semibold text-white/90">{s.label}</div>
                <div className="mt-1 text-xs text-white/50 italic">{s.context}</div>
                <div
                  className="mt-3 h-px w-8 rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: "var(--rl-green)", opacity: 0.4 }}
                />
              </div>
            );
          })}
        </div>

        {/* 3-step workflow */}
        <Reveal delay={150}>
          <div className="mt-14">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-8 text-center">
              How it works
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Desktop connecting line */}
              <div
                className="hidden sm:block absolute top-4 left-[16.67%] right-[16.67%] h-px"
                style={{ backgroundColor: "rgba(79,153,7,0.25)" }}
              />

              {steps.map((s, i) => (
                <div
                  key={s.number}
                  className="flex sm:flex-col gap-4 sm:gap-0 sm:items-center sm:text-center relative"
                >
                  {/* Step number */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold relative z-10"
                    style={{
                      backgroundColor: "rgba(79,153,7,0.2)",
                      color: "var(--rl-mantis)",
                      border: "1px solid rgba(79,153,7,0.4)",
                    }}
                  >
                    {s.number}
                  </div>

                  {/* Mobile vertical line */}
                  {i < steps.length - 1 && (
                    <div
                      className="sm:hidden ml-4 w-px"
                      style={{
                        backgroundColor: "rgba(79,153,7,0.2)",
                        minHeight: "24px",
                        position: "absolute",
                        left: "18px",
                        top: "36px",
                        bottom: "-24px",
                      }}
                    />
                  )}

                  <div className="sm:mt-4 pb-8 sm:pb-0">
                    <h4 className="text-base font-bold text-white mb-1">{s.title}</h4>
                    <p className="text-sm text-white/60 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="group font-semibold bg-white text-foreground hover:bg-white/90"
            >
              <Link to="/contact" className="flex items-center gap-2">
                Request Teleradiology Access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="font-semibold"
              style={{
                backgroundColor: "transparent",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
              }}
            >
              <Link to="/platforms/ray-medical">Learn About Ray Medical</Link>
            </Button>
          </div>
        </Reveal>
      </PageWrapper>
    </section>
  );
}
