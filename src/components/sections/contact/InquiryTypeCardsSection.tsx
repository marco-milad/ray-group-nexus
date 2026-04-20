import { Briefcase, Stethoscope, Newspaper, ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { contactCopy } from "@/data/en/contact";

const ICONS = {
  investor: Briefcase,
  physician: Stethoscope,
  media: Newspaper,
} as const;

const COLORS = {
  investor: "var(--rl-green)",
  physician: "#1E88E5",
  media: "#7B1FA2",
} as const;

export function InquiryTypeCardsSection() {
  const items = (
    Object.keys(contactCopy.inquiryTypes) as Array<keyof typeof contactCopy.inquiryTypes>
  ).map((k) => ({ key: k, ...contactCopy.inquiryTypes[k] }));

  const scrollToForm = () => {
    if (typeof document !== "undefined") {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SectionShell bg="bg-[color:var(--rl-light-bg)]">
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((it, i) => {
          const Icon = ICONS[it.key];
          const color = COLORS[it.key];
          return (
            <Reveal key={it.key} delay={i * 100}>
              <article
                className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full"
                style={{ borderTopColor: color, borderTopWidth: "2px" }}
              >
                {/* Icon */}
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${color}15`,
                    color,
                  }}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="mt-4 text-lg font-bold text-foreground">{it.title}</h3>

                {/* Body */}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {it.body}
                </p>

                {/* CTA */}
                <Button
                  variant="outline"
                  size="sm"
                  className="group/btn mt-5 w-full flex items-center justify-center gap-1.5 transition-all duration-200"
                  style={{
                    borderColor: `${color}40`,
                    color,
                  }}
                  onClick={scrollToForm}
                >
                  {it.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Button>

                {/* Bottom accent */}
                <div
                  className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ backgroundColor: color, opacity: 0.3 }}
                />
              </article>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
