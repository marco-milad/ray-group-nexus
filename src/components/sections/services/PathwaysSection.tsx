import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  Target,
  Heart,
  Brain,
  Activity,
  Bone,
  AlignCenter,
  Filter,
  ClipboardCheck,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { getPathwaysSorted } from "@/data/en/pathways";
import { servicesCopy } from "@/data/en/servicesPage";
import { globalCopy } from "@/data/en/global";
import { getServiceById } from "@/data/en/services";

const PATHWAY_ICONS: Record<string, React.ElementType> = {
  oncology: Target,
  "womens-health": Heart,
  neurology: Brain,
  cardiology: Activity,
  orthopaedics: Bone,
  spine: AlignCenter,
  hepatology: Filter,
  "general-health": ClipboardCheck,
};

const PATHWAY_COLORS: Record<string, string> = {
  oncology: "#E53935",
  "womens-health": "#E91E63",
  neurology: "#7B1FA2",
  cardiology: "#1E88E5",
  orthopaedics: "#00897B",
  spine: "#F57C00",
  hepatology: "#C8A96E",
  "general-health": "#4F9907",
};

const PATHWAY_LABELS: Record<string, string> = {
  oncology: "Oncology",
  "womens-health": "Women's Health",
  neurology: "Neurology",
  cardiology: "Cardiology",
  orthopaedics: "Orthopaedics",
  spine: "Spine",
  hepatology: "Hepatology",
  "general-health": "General Health",
};

export function PathwaysSection() {
  const items = getPathwaysSorted();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [lockedId, setLockedId] = React.useState<string | null>(null);

  const handleMouseEnter = (id: string) => setExpandedId(id);

  const handleMouseLeave = (id: string) => {
    if (lockedId === id) return;
    setExpandedId(lockedId);
  };

  const handleClick = (id: string) => {
    if (lockedId === id) {
      setLockedId(null);
      setExpandedId(null);
    } else {
      setLockedId(id);
      setExpandedId(id);
    }
  };

  const isOpen = (id: string) => expandedId === id;

  return (
    <SectionShell bg="bg-background">
      <Reveal>
        <SectionHeader
          eyebrow={servicesCopy.pathways.eyebrow}
          headline={servicesCopy.pathways.headline}
          subheadline="Comprehensive diagnostic packages organised around how patients are referred and how clinicians practise."
        />
      </Reveal>

      {items.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">{globalCopy.errors.emptyState}</p>
      ) : (
        <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => {
            const Icon = PATHWAY_ICONS[p.id] ?? ClipboardCheck;
            const color = PATHWAY_COLORS[p.id] ?? "var(--rl-green)";
            const label = PATHWAY_LABELS[p.id] ?? p.name;
            const open = isOpen(p.id);
            const locked = lockedId === p.id;

            return (
              <Reveal key={p.id} delay={i * 70}>
                <article
                  className="rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer select-none h-full flex flex-col"
                  style={{
                    borderTopColor: color,
                    borderTopWidth: "3px",
                    boxShadow: open ? `0 4px 24px ${color}20` : undefined,
                    borderColor: locked ? `${color}40` : undefined,
                  }}
                  onMouseEnter={() => handleMouseEnter(p.id)}
                  onMouseLeave={() => handleMouseLeave(p.id)}
                  onClick={() => handleClick(p.id)}
                >
                  {/* Card header */}
                  <div className="p-5 flex-1">
                    {/* Icon */}
                    <div
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4 transition-transform duration-300"
                      style={{
                        backgroundColor: `${color}15`,
                        color,
                        transform: open ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Name + chevron */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-foreground leading-snug">{p.name}</h3>
                      <div
                        className="shrink-0 mt-0.5 transition-transform duration-500"
                        style={{
                          color,
                          transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>

                    {/* Services count */}
                    <div className="mt-3 flex items-center gap-2">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
                        style={{ backgroundColor: `${color}12`, color }}
                      >
                        {p.serviceIds.length} services
                      </span>
                      {locked && (
                        <span className="text-[10px] text-muted-foreground">click to close</span>
                      )}
                    </div>
                  </div>

                  {/* Expandable services list */}
                  <div
                    style={{
                      maxHeight: open ? "400px" : "0px",
                      overflow: "hidden",
                      transition: "max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="px-5 pb-3 pt-1 border-t" style={{ borderColor: `${color}20` }}>
                      <div
                        className="text-[10px] font-semibold uppercase tracking-wider mb-3"
                        style={{ color }}
                      >
                        Included Services
                      </div>
                      <ul className="space-y-1.5">
                        {p.serviceIds.map((sid) => {
                          const svc = getServiceById(sid);
                          return (
                            <li
                              key={sid}
                              className="flex items-center gap-2 text-xs text-muted-foreground"
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: color }}
                              />
                              {svc?.name ?? sid}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Refer CTA */}
                    <div className="px-5 pb-5 pt-2">
                      <Link
                        to="/contact"
                        search={{ specialty: label } as Record<string, string>}
                        className="group/btn inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200"
                        style={{ color }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Refer a {label} Patient
                        <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      )}
    </SectionShell>
  );
}
