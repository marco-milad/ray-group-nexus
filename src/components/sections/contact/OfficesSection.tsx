import { MapPin } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/section-header";
import { contactCopy } from "@/data/en/contact";

export function OfficesSection() {
  const { offices } = contactCopy;
  const items = [offices.primary, offices.secondary];
  return (
    <Section>
      <SectionHeader headline={offices.title} />
      <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
        {items.map((o) => (
          <article
            key={o.label}
            className="flex gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: "var(--rl-light-bg)" }}
            >
              <MapPin className="h-6 w-6" style={{ color: "var(--rl-green)" }} />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">{o.label}</h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {o.address}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
