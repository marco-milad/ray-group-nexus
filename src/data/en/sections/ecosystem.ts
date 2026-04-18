/**
 * Ecosystem section copy — reused on Home + About pages.
 */

export const ecosystemCopy = {
  eyebrow: "What We Do",
  headline: "A Full Diagnostic Ecosystem",
  subheadline:
    "Three integrated verticals working in concert to deliver precision care — from scan to consultation.",
  cards: {
    diagnostics: {
      title: "Diagnostics",
      body: "Advanced imaging and laboratory services across MRI, CT, PET/CT, Mammography, and clinical labs — operating under Cairo Scan, TechnoScan, CRC, and MedRay.",
    },
    clinics: {
      title: "Specialized Clinics",
      body: "Multi-specialty outpatient care — 18 specialties, 50+ consultant physicians, fully integrated with the group's diagnostic infrastructure.",
    },
    teleradiology: {
      title: "Teleradiology",
      body: "Ray Medical delivers 24/7 subspecialty reporting with an average 90-minute turnaround, double-reading pathways, and AI-enabled quality assurance.",
    },
  },
} as const;

export type EcosystemCopy = typeof ecosystemCopy;
