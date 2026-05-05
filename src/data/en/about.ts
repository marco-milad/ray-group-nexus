/**
 * About page copy — page-specific only.
 */

export const aboutCopy = {
  seo: {
    title: "About Ray Lab Group — Our Story, Vision & Mission",
    description:
      "Learn about Ray Lab Group — history, vision, values, and the institutional investors backing our growth.",
  },
  hero: {
    eyebrow: "About Ray Lab Group",
    headline: "Building the Future of",
    headlineAccent: "Healthcare Diagnostics.",
    subheadline:
      "A Malta-headquartered multinational diagnostic group operating across 3 operating markets through 6 specialised brands.",
  },
  vision: {
    eyebrow: "Our Vision",
    quote:
      '"To empower healthier lives through groundbreaking diagnostics and compassionate care, becoming the trusted beacon of health insights for every community."',
    note: "This is not just about tests — it is about transforming lives.",
  },
  mission: {
    eyebrow: "Our Mission",
    quote:
      '"To deliver accurate, accessible, and innovative diagnostic solutions, fostering a culture of excellence, integrity, and patient-centricity in every interaction."',
    note: "Precision, accessibility, innovation — our daily commitment.",
  },
  values: {
    eyebrow: "Core Values",
    headline: "What We Stand For",
    items: [
      {
        key: "patientCentered",
        icon: "🤝",
        title: "Patient-Centered",
        body: "We anticipate and respond to every patient's concerns with empathy, care, and a human-first approach.",
      },
      {
        key: "accountable",
        icon: "🛡️",
        title: "Accountable",
        body: "Patient safety is our top priority. We own our actions and uphold the highest standards of care.",
      },
      {
        key: "excellent",
        icon: "⭐",
        title: "Excellent",
        body: "We set high standards, embrace innovation, and treat every patient as we would want to be treated ourselves.",
      },
      {
        key: "respectful",
        icon: "🌍",
        title: "Respectful",
        body: "We protect dignity and confidentiality, value diversity, and keep patients fully informed.",
      },
    ],
  },
  timeline: {
    eyebrow: "Our Journey",
    headline: "History & Milestones",
    events: [
      {
        year: "2009",
        title: "MetaMed Established — TechnoScan Acquisition",
        body: "Gulf Capital Private Equity Partners Fund II established MetaMed and acquired a majority stake in TechnoScan Egypt (founded 1986 by Prof. Dr. Osama Khalil) — operating 13 diagnostic imaging centers.",
      },
      {
        year: "2010",
        title: "CRC Acquisition — Saudi Arabia",
        body: "MetaMed acquires a majority stake in CRC (Consultants Radiology Centres), expanding the group's footprint into the Kingdom of Saudi Arabia.",
      },
      {
        year: "2012",
        title: "MedRay Acquisition — Jordan",
        body: "MetaMed acquires a majority stake in MedRay Jordan — entering the Levant market with a full-spectrum diagnostic imaging platform in Amman.",
      },
      {
        year: "2016",
        title: "Mediterrania Acquires Cairo Scan",
        body: "Mediterrania Capital Partners (MCP) acquires Cairo Scan — the leading private provider of radiology and laboratory services in Egypt.",
      },
      {
        year: "2019",
        title: "Group Platform Formed",
        body: "The foundation of the unified diagnostic platform is established, bringing together Cairo Scan, TechnoScan, CRC, and MedRay under a shared operational and governance framework.",
      },
      {
        year: "2020",
        title: "DFI Consortium Formed",
        body: "A consortium led by Mediterrania Capital Partners — alongside DEG, Proparco, EBRD, and FMO — acquires MetaMed with the strategic objective of integrating it with Cairo Scan to create the region's largest diagnostic imaging platform.",
      },
      {
        year: "2023",
        title: "Ray Lab Group Incorporated",
        body: "The consolidated group is unified under a single holding brand: Ray Lab Group — incorporated in Malta as a private limited liability company.",
      },
      {
        year: "2025",
        title: "Specialized Clinics + Egypt Expansion",
        body: "Ray Lab launches specialized clinics under Cairo Scan and TechnoScan across Cairo. TechnoScan adds 12 new branches across Egypt's Delta, Suez Canal, and Upper Egypt.",
      },
      {
        year: "2026",
        title: "Ray Medical Launches",
        body: "Launch of Ray Medical, the Group's teleradiology division — expanding remote reporting and cross-border diagnostic capabilities across Egypt and KSA.",
      },
    ],
  },
  techPartners: {
    eyebrow: "Technology Partners",
    headline: "Powered by Global MedTech Leaders",
    subheadline:
      "A Malta-headquartered multinational diagnostic group operating across 3 operating markets through 6 specialised brands.",
    partners: [
      {
        name: "General Electric",
        shortName: "GE",
        modalities: "MRI · CT · Ultrasound",
      },
      {
        name: "Siemens Healthineers",
        shortName: "Siemens",
        modalities: "MRI · PET-CT · Mammography",
      },
      {
        name: "Philips HealthTech",
        shortName: "Philips",
        modalities: "CT · Ultrasound · Nuclear",
      },
      {
        name: "Toshiba Medical",
        shortName: "Toshiba",
        modalities: "CT · MRI · X-Ray",
      },
    ],
  },
} as const;

export type AboutCopy = typeof aboutCopy;
