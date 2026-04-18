/**
 * Ray Lab Group — Investor / Shareholder types
 *
 * Used for the DFI consortium cards on the Investors page.
 */

export type InvestorType =
  | "private-equity"
  | "dfi"
  | "development-bank"
  | "sovereign"
  | "family-office";

export interface Investor {
  id: string;
  name: string;
  shortName?: string;
  type: InvestorType;
  /** Country / HQ flag emoji or ISO code */
  country?: string;
  description: string;
  website?: string;
  logo?: string;
  /** Year of involvement / investment */
  since?: number;
}

export interface FinancialMetric {
  label: string;
  value: string;
  /** Optional year-over-year change, e.g. "+18%" */
  delta?: string;
  note?: string;
}
