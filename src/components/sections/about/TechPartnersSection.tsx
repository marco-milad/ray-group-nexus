import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { aboutCopy } from "@/data/en/about";

const partnerLogos: Record<string, string> = {
  GE: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/General_Electric_logo.svg/120px-General_Electric_logo.svg.png",
  Siemens:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Siemens-logo.svg/200px-Siemens-logo.svg.png",
  Philips:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Philips_logo_new.svg/200px-Philips_logo_new.svg.png",
  Toshiba:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Toshiba_logo.svg/200px-Toshiba_logo.svg.png",
};

export function TechPartnersSection() {
  const { techPartners } = aboutCopy;

  return (
    <SectionShell bg="bg-[color:var(--rl-light-bg)]">
      <SectionHeader
        eyebrow={techPartners.eyebrow}
        headline={techPartners.headline}
        subheadline={techPartners.subheadline}
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {techPartners.partners.map((p, i) => (
          <Reveal key={p.shortName} delay={i * 80}>
            <div
              className="group rounded-2xl border border-border/60 bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md h-full flex flex-col items-center justify-between"
              style={{ borderTopColor: "var(--rl-green)", borderTopWidth: "2px" }}
            >
              {/* Logo */}
              <div className="h-12 flex items-center justify-center mb-4">
                <img
                  src={partnerLogos[p.shortName]}
                  alt={p.name}
                  className="h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Short name */}
              <div className="text-xl font-bold tracking-tight text-foreground">{p.shortName}</div>

              {/* Full name */}
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {p.name}
              </div>

              {/* Modalities */}
              <div className="mt-4 text-xs font-semibold" style={{ color: "var(--rl-green)" }}>
                {p.modalities}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
