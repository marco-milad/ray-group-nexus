import { MapPin, ExternalLink } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { directoryCopy } from "@/data/en/directory";

const MAPS_LINK = "https://maps.google.com/?q=B2+Industry+Street+Zone+5+Qormi+CBD+5030+Malta";

export function DirectoryHQSection() {
  const { hq } = directoryCopy;

  return (
    <SectionShell bg="bg-background">
      <SectionHeader eyebrow={hq.eyebrow} headline={hq.headline} />

      <Reveal>
        <div className="mx-auto mt-10 max-w-3xl">
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-5 rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:flex-row md:items-center md:gap-7"
            style={{ borderTopColor: "var(--rl-green)", borderTopWidth: "3px" }}
          >
            <div
              className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
              style={{
                backgroundColor: "color-mix(in oklab, var(--rl-green) 10%, transparent)",
                color: "var(--rl-green)",
              }}
            >
              <MapPin className="h-7 w-7" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden>
                  🇲🇹
                </span>
                <h3 className="text-lg font-bold text-foreground">{hq.headline}</h3>
              </div>

              <address className="not-italic mt-3 text-sm leading-relaxed text-muted-foreground">
                {hq.addressLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </address>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: "rgba(79,153,7,0.12)",
                    color: "var(--rl-green)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: "var(--rl-green)" }}
                  />
                  {hq.badge}
                </span>

                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: "var(--rl-green)" }}
                >
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  Open in Google Maps
                </span>
              </div>
            </div>
          </a>
        </div>
      </Reveal>
    </SectionShell>
  );
}
