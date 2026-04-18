import { MapPin } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { investorsCopy } from "@/data/en/investors";

export function GovernanceTab() {
  const { governance } = investorsCopy;
  return (
    <div>
      <SectionHeader
        eyebrow={governance.eyebrow}
        headline={governance.headline}
        subheadline={governance.subheadline}
      />

      <div className="mx-auto mt-10 max-w-5xl">
        <div className="grid gap-4 md:grid-cols-2">
          {governance.standards.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
            >
              <h4
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--rl-green)" }}
              >
                {s.label}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="text-base font-bold text-foreground">{governance.details.title}</h3>
          <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
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

        <div className="mt-8">
          <h3 className="text-base font-bold text-foreground">{governance.offices.title}</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[governance.offices.primary, governance.offices.secondary].map((o) => (
              <div
                key={o.label}
                className="flex gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
              >
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
