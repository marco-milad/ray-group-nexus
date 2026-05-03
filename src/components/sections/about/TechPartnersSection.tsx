import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { aboutCopy } from "@/data/en/about";

const partnerLogos: Record<string, string> = {
  GE: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/General_Electric_logo.svg/120px-General_Electric_logo.svg.png",
  Siemens: "https://res.cloudinary.com/dcui0elwh/image/upload/v1777846610/semens_rdmiql.svg",
  Philips: "https://res.cloudinary.com/dcui0elwh/image/upload/v1777845019/philips_wp0ywt.svg",
  Toshiba: "https://res.cloudinary.com/dcui0elwh/image/upload/v1777845048/tohiba_atxm64.svg",
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
                  className="h-8 w-auto object-contain grayscale-0 group-hover:grayscale transition-all duration-300 group-hover:scale-110"
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
