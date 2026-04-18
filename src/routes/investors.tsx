import { createFileRoute } from "@tanstack/react-router";
import { investorsCopy } from "@/data/en/investors";
import { Section } from "@/components/layout/Section";
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

const TABS = [
  { value: "thesis", Component: ThesisTab },
  { value: "performance", Component: PerformanceTab },
  { value: "shareholders", Component: ShareholdersTab },
  { value: "strategy", Component: StrategyTab },
  { value: "risks", Component: RisksTab },
  { value: "expansion", Component: ExpansionTab },
  { value: "press", Component: PressTab },
  { value: "governance", Component: GovernanceTab },
  { value: "exit", Component: ExitTab },
] as const;

function InvestorsPage() {
  const labels = investorsCopy.tabs;
  return (
    <>
      <InvestorsHeroSection />
      <Section>
        <Tabs defaultValue="thesis" className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="mx-auto inline-flex h-auto w-max min-w-full justify-start gap-1 bg-muted/60 p-1.5 sm:flex-wrap sm:justify-center">
              {TABS.map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="whitespace-nowrap text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  {labels[t.value as keyof typeof labels]}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {TABS.map(({ value, Component }) => (
            <TabsContent key={value} value={value} className="mt-10">
              <Component />
            </TabsContent>
          ))}
        </Tabs>
      </Section>
    </>
  );
}
