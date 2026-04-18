/**
 * Physicians section copy — reused on Home + Platforms pages.
 * 4-step referral flow for referring physicians.
 */

export const physiciansCopy = {
  eyebrow: "For Referring Physicians",
  headline: "A Diagnostic Partner You Can Trust.",
  subheadline:
    "Subspecialty reporting with clinical-grade precision, turnaround times that match your workflow, and a structured referral system built around your practice.",
  cta: "Contact Us",
  flow: [
    {
      step: "01",
      title: "Refer",
      body: "Submit patient details and imaging request via our contact form.",
    },
    {
      step: "02",
      title: "Match",
      body: "Case matched to the right subspecialty consultant within minutes.",
    },
    {
      step: "03",
      title: "Report",
      body: "Structured diagnostic report with double-reading quality assurance.",
    },
    {
      step: "04",
      title: "Deliver",
      body: "Report delivered securely. Average turnaround: 90 minutes, 24/7.",
    },
  ],
} as const;

export type PhysiciansCopy = typeof physiciansCopy;
