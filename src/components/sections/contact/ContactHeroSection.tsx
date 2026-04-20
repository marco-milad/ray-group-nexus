import { PageWrapper } from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { contactCopy } from "@/data/en/contact";

export function ContactHeroSection() {
  const { hero } = contactCopy;
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(1200px 600px at 20% -10%, color-mix(in oklab, var(--rl-mantis) 22%, transparent), transparent 60%), var(--rl-light-bg)",
      }}
    >
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--rl-eerie) 1px, transparent 1px), linear-gradient(90deg, var(--rl-eerie) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <PageWrapper className="relative py-20 md:py-28">
        <Reveal>
          <SectionHeader
            eyebrow={hero.eyebrow}
            headline={hero.headline}
            headlineAccent={hero.headlineAccent}
            subheadline={hero.subheadline}
          />
        </Reveal>
      </PageWrapper>
    </section>
  );
}
