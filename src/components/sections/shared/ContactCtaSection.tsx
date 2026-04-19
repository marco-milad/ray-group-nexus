import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/layout/SectionShell";
import { contactCtaCopy } from "@/data/en/sections/contactCta";

export function ContactCtaSection() {
  return (
    <SectionShell bg="bg-background" size="md">
      <div
        className="rounded-3xl border border-border/60 p-10 md:p-14 text-center relative overflow-hidden"
        style={{
          background:
            "radial-gradient(600px 300px at 50% 0%, color-mix(in oklab, var(--rl-green) 14%, transparent), transparent 70%), var(--rl-cornsilk)",
        }}
      >
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{contactCtaCopy.headline}</h3>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">{contactCtaCopy.subheadline}</p>
        <div className="mt-8">
          <Button asChild size="lg" style={{ backgroundColor: "var(--rl-green)", color: "white" }}>
            <Link to="/contact">{contactCtaCopy.cta}</Link>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
