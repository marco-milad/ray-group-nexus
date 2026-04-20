import { MapPin } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { investorsCopy } from "@/data/en/investors";

export function GovernanceTab() {
  const { governance } = investorsCopy;
  return (
    <div>
      <Reveal>
        <SectionHeader
          eyebrow={governance.eyebrow}
          headline={governance.headline}
          subheadline={governance.subheadline}
        />
      </Reveal>

      <div className="mx-auto mt-10 max-w-5xl">
        {/* Standards grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {governance.standards.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div
                className="rounded-2xl border border-border/60 bg-card p-5 transition-all hover:shadow-md h-full"
                style={{ borderTopColor: "var(--rl-green)", borderTopWidth: "2px" }}
              >
                <h4
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--rl-green)" }}
                >
                  {s.label}
                </h4>
                <p className="text-sm leading-relaxed text-foreground/85">{s.value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Corporate structure */}
        <Reveal delay={100}>
          <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6">
            <h3 className="text-base font-bold text-foreground mb-4">{governance.details.title}</h3>
            <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {governance.details.items.map((it) => (
                <div key={it.label} className="border-b border-border/40 pb-2">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {it.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{it.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* Offices */}
        <div className="mt-8">
          <Reveal>
            <h3 className="text-base font-bold text-foreground mb-4">{governance.offices.title}</h3>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {[governance.offices.primary, governance.offices.secondary].map((o, i) => (
              <Reveal key={o.label} delay={i * 100}>
                <div className="flex gap-3 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:shadow-md h-full">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "var(--rl-light-bg)" }}
                  >
                    <MapPin className="h-5 w-5" style={{ color: "var(--rl-green)" }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{o.label}</h4>
                    <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                      {o.address}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
