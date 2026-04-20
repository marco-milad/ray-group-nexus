import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import {
  Lightbulb,
  BarChart2,
  Users,
  TrendingUp,
  ShieldAlert,
  Map,
  Newspaper,
  Building,
  Rocket,
} from "lucide-react";
import { investorsCopy } from "@/data/en/investors";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import type { SectionContract } from "@/types/section";
import { SectionShell } from "@/components/layout/SectionShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvestorsHeroSection } from "@/components/sections/investors/InvestorsHeroSection";
import { ThesisTab } from "@/components/sections/investors/ThesisTab";
import { PerformanceTab } from "@/components/sections/investors/PerformanceTab";
import { ShareholdersTab } from "@/components/sections/investors/ShareholdersTab";
import { StrategyTab } from "@/components/sections/investors/StrategyTab";
import { RisksTab } from "@/components/sections/investors/RisksTab";
import { ExpansionTab } from "@/components/sections/investors/ExpansionTab";
import { PressTab } from "@/components/sections/investors/PressTab";
import { GovernanceTab } from "@/components/sections/investors/GovernanceTab";
import { ExitTab } from "@/components/sections/investors/ExitTab";

const TABS = [
  { value: "thesis", Component: ThesisTab, icon: Lightbulb },
  { value: "performance", Component: PerformanceTab, icon: BarChart2 },
  { value: "shareholders", Component: ShareholdersTab, icon: Users },
  { value: "strategy", Component: StrategyTab, icon: TrendingUp },
  { value: "risks", Component: RisksTab, icon: ShieldAlert },
  { value: "expansion", Component: ExpansionTab, icon: Map },
  { value: "press", Component: PressTab, icon: Newspaper },
  { value: "governance", Component: GovernanceTab, icon: Building },
  { value: "exit", Component: ExitTab, icon: Rocket },
] as const;

export const Route = createFileRoute("/investors")({
  head: () => ({
    meta: [
      { title: investorsCopy.seo.title },
      { name: "description", content: investorsCopy.seo.description },
      { property: "og:title", content: investorsCopy.seo.title },
      { property: "og:description", content: investorsCopy.seo.description },
    ],
  }),
  component: InvestorsPage,
});

function InvestorsPage() {
  const labels = investorsCopy.tabs;
  const [active, setActive] = React.useState("thesis");

  const sections: Record<string, SectionContract> = {
    hero: { id: "hero", data: investorsCopy.hero, state: "success", required: true },
    tabs: { id: "tabs", data: {}, state: "success", required: false },
  };

  return (
    <Page pageId="investors" copy={investorsCopy} sections={sections}>
      <Section id="hero" skeletonVariant="hero">
        {() => <InvestorsHeroSection />}
      </Section>

      <Section id="tabs">
        {() => (
          <SectionShell>
            <Tabs value={active} onValueChange={setActive} className="w-full">
              {/* Navigation bar */}
              <div className="sticky top-16 z-40 rounded-2xl p-2 mb-8 overflow-x-auto border border-border/60 bg-card shadow-sm">
                <TabsList className="inline-flex h-auto w-max min-w-full justify-start gap-1 bg-transparent p-0 sm:flex-wrap sm:justify-center">
                  {TABS.map((t) => {
                    const Icon = t.icon;
                    const isActive = active === t.value;
                    return (
                      <TabsTrigger
                        key={t.value}
                        value={t.value}
                        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer"
                        style={{
                          backgroundColor: isActive ? "var(--rl-green)" : "transparent",
                          color: isActive ? "white" : "var(--rl-muted)",
                          boxShadow: isActive ? "0 2px 8px rgba(79,153,7,0.3)" : "none",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = "rgba(79,153,7,0.08)";
                            e.currentTarget.style.color = "var(--rl-green)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "var(--rl-muted)";
                          }
                        }}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        {labels[t.value as keyof typeof labels]}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {/* Tab content */}
              {TABS.map(({ value, Component }) => (
                <TabsContent key={value} value={value} className="mt-0">
                  <Component />
                </TabsContent>
              ))}
            </Tabs>
          </SectionShell>
        )}
      </Section>
    </Page>
  );
}
