import type { ClinicalPathway } from "@/types/service";

/**
 * Pathways are a UX layer over services.
 * They organize content by patient need — not by technical modality.
 */
export const pathways: ClinicalPathway[] = [
  {
    id: "oncology",
    name: "Oncology",
    description: "Staging, monitoring, and surveillance across all cancer pathways.",
    icon: "target",
    serviceIds: ["pet-ct", "ct-scan", "mri", "isotopic-scan", "oncology-imaging"],
    order: 1,
  },
  {
    id: "womens-health",
    name: "Women's Health",
    description: "Comprehensive imaging for breast health, fertility, and gynecological care.",
    icon: "heart",
    serviceIds: [
      "mammography-digital",
      "tomosynthesis",
      "breast-mri",
      "ultrasound-3d4d",
      "hsg-barium",
      "panorama",
    ],
    order: 2,
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Brain, spine, and nerve imaging for neurological conditions.",
    icon: "brain",
    serviceIds: ["mri", "ct-scan", "eeg", "emg", "neuroradiology"],
    order: 3,
  },
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Comprehensive cardiac assessment from resting ECG to advanced echo.",
    icon: "heart-pulse",
    serviceIds: ["ecg", "ecg-treadmill", "ecg-holter", "echo-ultrasound", "doppler-ultrasound"],
    order: 4,
  },
  {
    id: "orthopaedics",
    name: "Orthopaedics & MSK",
    description: "Joint, bone, and soft tissue imaging for musculoskeletal conditions.",
    icon: "bone",
    serviceIds: [
      "mri",
      "mri-arthrography",
      "xray",
      "dexa",
      "eos-imaging",
      "msk-radiology",
      "pain-therapy",
    ],
    order: 5,
  },
  {
    id: "spine",
    name: "Spine & Back Pain",
    description: "Imaging and guided procedures for spinal conditions and chronic back pain.",
    icon: "align-center",
    serviceIds: ["mri", "ct-scan", "xray", "emg", "pain-therapy"],
    order: 6,
  },
  {
    id: "hepatology",
    name: "Liver & GI",
    description: "Liver, GI tract, and abdominal imaging and laboratory assessment.",
    icon: "filter",
    serviceIds: [
      "fibroscan",
      "ultrasound-standard",
      "ct-scan",
      "mri",
      "hsg-barium",
      "biochemistry",
    ],
    order: 7,
  },
  {
    id: "general-health",
    name: "General Health Check",
    description: "Routine screening and diagnostic packages for proactive health management.",
    icon: "clipboard-check",
    serviceIds: ["xray", "ecg", "ultrasound-standard", "haematology", "biochemistry", "dexa"],
    order: 8,
  },
];

export const getPathwayById = (id: string) => pathways.find((p) => p.id === id);
export const getPathwaysSorted = () => [...pathways].sort((a, b) => a.order - b.order);
