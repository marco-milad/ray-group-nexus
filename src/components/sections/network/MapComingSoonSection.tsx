import { Link } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/button";
import { networkCopy } from "@/data/en/network";
import { globalCopy } from "@/data/en/global";

export function MapComingSoonSection() {
  const { mapTeaser } = networkCopy;
  return (
    <SectionShell bg="bg-muted/30">
      <div className="mx-auto max-w-3xl rounded-3xl border-2 border-dashed border-border bg-card/50 p-10 text-center md:p-14">
        <div
          className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "var(--rl-light-bg)" }}
        >
          <Map className="h-6 w-6" style={{ color: "var(--rl-green)" }} />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-foreground md:text-3xl">
          {mapTeaser.headline}
        </h3>
        <div className="mt-4 flex justify-center">
          <span
            className="inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white"
            style={{ backgroundColor: "#F57C00" }}
          >
            🗓 Interactive Map — Coming Phase 2
          </span>
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {mapTeaser.body}
        </p>
        <p className="mt-3 text-sm italic text-muted-foreground">
          {mapTeaser.note}
        </p>
        <div className="mt-7">
          <Button
            asChild
            style={{ backgroundColor: "var(--rl-green)", color: "white" }}
          >
            <Link to="/contact">{globalCopy.cta.contactUs}</Link>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
