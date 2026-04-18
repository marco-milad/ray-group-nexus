/**
 * Ray Lab Group — Investor / Shareholder types
 */

export interface Investor {
  id: string;
  name: string;
  shortName: string;
  portfolio: string;
  focus: string;
  color: string;
  type: "private-equity" | "development-finance" | "multilateral";
}
