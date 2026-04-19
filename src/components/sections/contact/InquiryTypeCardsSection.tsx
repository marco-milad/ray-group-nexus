import { Briefcase, Stethoscope, Newspaper } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/button";
import { contactCopy } from "@/data/en/contact";

const ICONS = {
  investor: Briefcase,
  physician: Stethoscope,
  media: Newspaper,
} as const;

export function InquiryTypeCardsSection() {
  const items = (
    Object.keys(contactCopy.inquiryTypes) as Array<keyof typeof contactCopy.inquiryTypes>
  ).map((k) => ({ key: k, ...contactCopy.inquiryTypes[k] }));

  return (
    <SectionShell bg="bg-muted/30">
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((it) => {
          const Icon = ICONS[it.key];
          return (
            <article
              key={it.key}
              className="flex flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: "var(--rl-light-bg)" }}
              >
                <Icon className="h-6 w-6" style={{ color: "var(--rl-green)" }} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">{it.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-5 w-full"
                onClick={() => {
                  if (typeof document !== "undefined") {
                    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {it.cta}
              </Button>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
