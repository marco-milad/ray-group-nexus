/**
 * Stats section copy — reused on Home + Investors pages.
 * 8 KPI cards summarising group scale.
 */

export const statsCopy = {
  exams: { value: "1.6M+", label: "Annual Exams" },
  branches: { value: "40+", label: "Branches" },
  countries: { value: "4", label: "Countries" },
  consultants: { value: "60+", label: "Consultants" },
  revenue: { value: "$36M+", label: "Revenue 2025" },
  labTests: { value: "344K", label: "Lab Tests / Year" },
  newBranches: { value: "12", label: "New Branches '25" },
  brands: { value: "6", label: "Sub-brands" },
} as const;

export type StatsCopy = typeof statsCopy;
