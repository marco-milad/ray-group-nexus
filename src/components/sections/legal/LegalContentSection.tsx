import * as React from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/reveal";
import type { LegalCopy, LegalNode } from "@/data/en/legal";

interface LegalContentSectionProps {
  copy: Pick<LegalCopy, "intro" | "sections">;
}

function NodeRenderer({ node }: { node: LegalNode }) {
  if (node.type === "p") {
    return <p className="text-sm md:text-[15px] leading-relaxed text-foreground/80">{node.text}</p>;
  }

  if (node.type === "h") {
    return (
      <h3
        className="text-sm font-semibold uppercase tracking-[0.12em] mt-6"
        style={{ color: "var(--rl-eerie)" }}
      >
        {node.text}
      </h3>
    );
  }

  return (
    <ul className="space-y-2 pl-1">
      {node.items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-sm md:text-[15px] leading-relaxed text-foreground/80"
        >
          <span
            className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
            style={{ backgroundColor: "var(--rl-green)", opacity: 0.7 }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalContentSection({ copy }: LegalContentSectionProps) {
  return (
    <section className="bg-background py-12 md:py-16">
      <PageWrapper>
        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          {/* Sticky ToC */}
          <aside className="hidden lg:block">
            <nav
              className="sticky top-24 rounded-2xl border border-border/60 bg-card p-5"
              aria-label="Table of contents"
            >
              <div
                className="text-xs font-semibold uppercase tracking-[0.14em] mb-4"
                style={{ color: "var(--rl-eerie)", opacity: 0.6 }}
              >
                Contents
              </div>
              <ul className="space-y-2">
                {copy.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block text-xs leading-snug text-foreground/65 hover:text-foreground transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Body */}
          <div>
            <Reveal>
              <div className="space-y-4 pb-10 mb-10 border-b border-border/60">
                {copy.intro.map((node, i) => (
                  <NodeRenderer key={i} node={node} />
                ))}
              </div>
            </Reveal>

            <div className="space-y-12">
              {copy.sections.map((section) => (
                <Reveal key={section.id}>
                  <section
                    id={section.id}
                    className="scroll-mt-24 rounded-2xl border border-border/60 bg-card p-6 md:p-8"
                    style={{ borderLeftColor: "var(--rl-green)", borderLeftWidth: "3px" }}
                  >
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5">
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.body.map((node, i) => (
                        <NodeRenderer key={i} node={node} />
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </PageWrapper>
    </section>
  );
}
