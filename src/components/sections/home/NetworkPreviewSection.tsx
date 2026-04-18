import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { networkPreviewCopy } from "@/data/en/sections/networkPreview";
import { networkCopy } from "@/data/en/network";

export function NetworkPreviewSection() {
  const items = networkCopy.countries.items;

  return (
    <SectionShell bg="bg-background">
      <SectionHeader
        eyebrow={networkPreviewCopy.eyebrow}
        headline={networkPreviewCopy.headline}
        headlineAccent={networkPreviewCopy.headlineAccent}
        subheadline={networkPreviewCopy.subheadline}
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {items.map((c) => (
          <div
            key={c.country}
            className="rounded-2xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl" aria-hidden>
                {c.flag}
              </span>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor:
                    "color-mix(in oklab, var(--rl-green) 12%, transparent)",
                  color: "var(--rl-green)",
                }}
              >
                {c.branches} branches
              </span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-foreground">{c.country}</h3>
            <div className="mt-2 text-xs text-muted-foreground">
              {c.brands.join(" · ")}
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {c.soWhat}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg" className="group" variant="outline">
          <Link to="/network">
            {networkPreviewCopy.cta}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
}
