import type { ServiceCategory } from "@/types/service";

/**
 * Categories are DATA — not just strings.
 * This enables tabs, filters, icons, and copy on the Services page.
 */
export const categories: ServiceCategory[] = [
  {
    id: "imaging",
    label: "Imaging & Radiology",
    description: "Advanced MRI, CT, PET/CT, and X-Ray across all major branches.",
    icon: "scan",
    order: 1,
  },
  {
    id: "ultrasound",
    label: "Ultrasound",
    description: "Standard, 3D/4D, Doppler, Echo, and FibroScan across the network.",
    icon: "activity",
    order: 2,
  },
  {
    id: "womens",
    label: "Women's Imaging",
    description: "Mammography, tomosynthesis, breast MRI, and gynecological imaging.",
    icon: "heart",
    order: 3,
  },
  {
    id: "cardiology",
    label: "Cardiology",
    description: "ECG, treadmill stress test, Holter monitoring, and echocardiography.",
    icon: "heartpulse",
    order: 4,
  },
  {
    id: "advanced",
    label: "Advanced Diagnostics",
    description: "EMG, EEG, DEXA, EOS Imaging, and image-guided pain therapy.",
    icon: "zap",
    order: 5,
  },
  {
    id: "lab",
    label: "Lab Services",
    description: "Full-range haematology, biochemistry, microbiology, and molecular diagnostics.",
    icon: "flask-conical",
    order: 6,
  },
  {
    id: "teleradiology",
    label: "Teleradiology",
    description:
      "24/7 subspecialty reporting via Ray Medical — 60+ consultants, ~90min turnaround.",
    icon: "monitor",
    order: 7,
  },
];

export function getCategoryById(id: string): ServiceCategory | undefined {
  return categories.find((c) => c.id === id);
}
