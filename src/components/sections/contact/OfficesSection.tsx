import { MapPin, ExternalLink } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { contactCopy } from "@/data/en/contact";

const MAPS_LINKS: Record<string, string> = {
  "Malta HQ (Registered)":
    "https://maps.google.com/?q=B2+Industry+Street+Zone+5+Qormi+CBD+5030+Malta",
  "Ta' Xbiex Office": "https://maps.google.com/?q=Whitehall+Mansions+Ta+Xbiex+XBX+1026+Malta",
};

export function OfficesSection() {
  const { offices } = contactCopy;
  const items = [offices.primary, offices.secondary];

  return (
    <SectionShell bg="bg-background">
      <Reveal>
        <SectionHeader headline={offices.title} />
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
        {items.map((o, i) => (
          <Reveal key={o.label} delay={i * 120}>
            <a
              href={MAPS_LINKS[o.label] ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full cursor-pointer"
              style={{ borderTopColor: "var(--rl-green)", borderTopWidth: "2px" }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: "color-mix(in oklab, var(--rl-green) 10%, transparent)",
                    color: "var(--rl-green)",
                  }}
                >
                  <MapPin className="h-6 w-6 transition-transform duration-300 group-hover:animate-bounce" />
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-bold text-foreground">{o.label}</h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {o.address}
                  </p>
                </div>
              </div>

              {/* Open in Maps CTA */}
              {/* Open in Maps CTA */}
              <div
                className="flex items-center gap-1.5 text-xs font-semibold mt-auto pt-3 border-t border-border/40"
                style={{ color: "var(--rl-green)" }}
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-600 w-0 group-hover:w-auto overflow-hidden whitespace-nowrap">
                  Open in Google Maps
                </span>
                <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-600">
                  View on map
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
