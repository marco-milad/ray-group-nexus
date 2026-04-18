import type { Investor } from "@/types/investor";

export const investors: Investor[] = [
  {
    id: "mcp",
    shortName: "MCP",
    name: "Mediterrania Capital Partners",
    portfolio: "Lead Investor",
    focus: "Private equity — growth investments across Africa",
    color: "#1E1E1E",
    type: "private-equity",
  },
  {
    id: "ebrd",
    shortName: "EBRD",
    name: "European Bank for Reconstruction and Development",
    portfolio: "€52.3B",
    focus:
      "Multilateral development investment bank — 2,099 projects worldwide",
    color: "#003082",
    type: "multilateral",
  },
  {
    id: "fmo",
    shortName: "FMO",
    name: "Nederlandse Financierings-Maatschappij voor Ontwikkelingslanden",
    portfolio: "€9.2B",
    focus:
      "Dutch development bank — Foreign Affairs & Economic Affairs mandate",
    color: "#00539F",
    type: "development-finance",
  },
  {
    id: "proparco",
    shortName: "PROPARCO",
    name: "PROPARCO",
    portfolio: "€9.6B",
    focus: "French DFI (AFD Group) — Africa, Asia, Latin America, Middle East",
    color: "#E1000F",
    type: "development-finance",
  },
  {
    id: "deg",
    shortName: "DEG",
    name: "Deutsche Investitions- und Entwicklungsgesellschaft",
    portfolio: "€8.2B",
    focus:
      "German DFI (KfW Group) — long-term private sector investments in emerging markets",
    color: "#00965E",
    type: "development-finance",
  },
];
