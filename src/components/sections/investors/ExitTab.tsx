import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { investorsCopy } from "@/data/en/investors";

export function ExitTab() {
  const { exit } = investorsCopy;

  return (
    <div>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      <Reveal>
        <SectionHeader
          eyebrow={exit.eyebrow}
          headline={exit.headline}
          subheadline={exit.subheadline}
        />
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {exit.statements.map((s, i) => (
          <article
            key={s.title}
            className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              borderTopColor: "var(--rl-green)",
              borderTopWidth: "2px",
              opacity: 0,
              animation: "fadeSlideUp 1.2s ease forwards",
              animationDelay: `${i * 350}ms`,
            }}
          >
            <h3 className="text-lg font-bold" style={{ color: "var(--rl-green)" }}>
              {s.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-1">{s.body}</p>

            {/* Bottom accent */}
            <div
              className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
              style={{ backgroundColor: "var(--rl-green)", opacity: 0.3 }}
            />
          </article>
        ))}
      </div>

      {/* CTA */}
      <Reveal delay={300}>
        <div
          className="mx-auto mt-12 max-w-3xl rounded-3xl p-8 text-center text-white md:p-12 relative overflow-hidden"
          style={{ backgroundColor: "var(--rl-green)" }}
        >
          {/* Grid overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative">
            <h3 className="text-2xl font-bold md:text-3xl">{exit.cta.label}</h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
              {exit.cta.body}
            </p>
            <div className="mt-6">
              <Button
                asChild
                size="lg"
                className="group bg-white text-foreground hover:bg-white/90 font-semibold"
              >
                <Link to="/contact">
                  {exit.cta.button}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
