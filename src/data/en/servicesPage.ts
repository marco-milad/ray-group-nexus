export const servicesCopy = {
  seo: {
    title: "Diagnostic Services — Ray Lab Group",
    description:
      "Full-spectrum diagnostic services across MRI, CT, PET-CT, Ultrasound, Mammography, Lab Services, and more.",
  },
  hero: {
    eyebrow: "Diagnostic Services",
    headline: "Full-Spectrum",
    headlineAccent: "Diagnostic Excellence.",
    subheadline:
      "From routine imaging to advanced nuclear medicine — Ray Lab Group delivers accurate, consultant-led diagnostics across every clinical pathway.",
  },
  stats: {
    equipment: { value: "500+", label: "Equipment Units" },
    types: { value: "30+", label: "Service Types" },
    exams: { value: "1.6M+", label: "Annual Exams" },
  },
  browse: {
    eyebrow: "Browse by Category",
    headline: "Our Diagnostic Services",
  },
  categories: {
    imaging: "Imaging & Radiology",
    ultrasound: "Ultrasound",
    womens: "Women's Imaging",
    cardiology: "Cardiology",
    advanced: "Advanced Diagnostics",
    lab: "Lab Services",
    teleradiology: "Teleradiology",
  },
  availableAt: "Available at",
  pathways: {
    eyebrow: "Clinical Pathways",
    headline: "Organized Around How You Practice",
    items: [
      "Neurology",
      "Oncology",
      "Orthopaedics",
      "Spine & Back Pain",
      "Trauma",
      "Pre-operative Planning",
      "Paediatrics",
      "Cardiology",
      "Women's Health",
      "Endocrinology",
    ],
  },
  featured: {
    imaging: {
      tag: "Featured — MRI",
      headline: "LUMINA 3T MRI — Next-Generation MRI",
      body: "Ray Lab Group's flagship MRI offering delivers faster scans with superior image resolution. Now available across Cairo Scan and TechnoScan centers.",
      chips: ["Open MRI available", "MR Arthrography", "Paediatric protocol", "3T & 1.5T options"],
      stats: [
        { value: "3T", label: "Tesla Power" },
        { value: "20+", label: "MRI Units" },
        { value: "~45min", label: "Avg. Scan Time" },
      ],
    },
    lab: {
      tag: "Laboratory Services",
      headline: "Clinical Laboratory — Cairo Scan & TechnoScan",
      body: "Full-range biochemistry, haematology, microbiology, and molecular diagnostics — fully integrated with imaging workflows.",
      chips: ["Same-day results", "Online portal access", "Home collection available"],
      stats: [
        { value: "344K", label: "Lab Tests / Year" },
        { value: "2012", label: "Lab Launch Year" },
        { value: "500+", label: "Test Types" },
      ],
    },
  },
} as const;

export type ServicesCopy = typeof servicesCopy;
