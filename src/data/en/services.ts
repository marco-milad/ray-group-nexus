import type { ServiceItem } from "@/types/service";

export const services: ServiceItem[] = [
  // ── IMAGING & RADIOLOGY ──────────────────────
  {
    id: "mri",
    name: "MRI (Open & Closed)",
    description:
      "Standard and open-bore MRI for all body parts. 3T Tesla (Lumina) and 1.5T available. Open MRI for claustrophobic or larger patients.",
    categoryId: "imaging",
    availableAt: ["cairo-scan", "technoscan", "medray", "crc"],
    icon: "scan",
    highlight: "High-resolution soft tissue imaging",
    priority: "high",
    order: 1,
    featured: true,
  },
  {
    id: "mri-arthrography",
    name: "MR Arthrography",
    description:
      "Direct and indirect MR arthrography for joint assessment — shoulder, hip, wrist, and knee. Reported by consultant MSK radiologists.",
    categoryId: "imaging",
    availableAt: ["cairo-scan", "crc", "medray"],
    icon: "bone",
    highlight: "Precision joint imaging",
    priority: "medium",
    order: 2,
  },
  {
    id: "ct-scan",
    name: "CT Scan",
    description:
      "Multi-slice CT with low-dose protocols for chest, abdomen, neuro, and angiography pathways across all major branches.",
    categoryId: "imaging",
    availableAt: ["cairo-scan", "technoscan", "medray", "crc"],
    icon: "circle-dashed",
    highlight: "Fast, detailed cross-sectional imaging",
    priority: "high",
    order: 3,
  },
  {
    id: "pet-ct",
    name: "PET / CT",
    description:
      "Combined positron emission and CT imaging for oncology staging, treatment monitoring, and cardiac viability assessment.",
    categoryId: "imaging",
    availableAt: ["cairo-scan", "technoscan", "medray"],
    icon: "radio",
    highlight: "Whole-body oncology imaging",
    priority: "high",
    order: 4,
    featured: true,
  },
  {
    id: "isotopic-scan",
    name: "Isotopic Scan",
    description:
      "Nuclear medicine bone scans, thyroid imaging, renal scans, and SPECT studies by subspecialty nuclear medicine consultants.",
    categoryId: "imaging",
    availableAt: ["cairo-scan", "technoscan"],
    icon: "atom",
    highlight: "Nuclear medicine diagnostics",
    priority: "medium",
    order: 5,
  },
  {
    id: "xray",
    name: "X-Ray (Digital)",
    description:
      "Digital X-ray for chest, skeletal, and spine imaging. Same-day reporting available at all branches.",
    categoryId: "imaging",
    availableAt: ["cairo-scan", "technoscan", "medray", "crc"],
    icon: "square-dashed",
    highlight: "Same-day results",
    priority: "medium",
    order: 6,
  },

  // ── ULTRASOUND ────────────────────────────────
  {
    id: "ultrasound-standard",
    name: "Standard Ultrasound",
    description:
      "B-mode and real-time ultrasound for abdominal, pelvic, thyroid, breast, and musculoskeletal applications.",
    categoryId: "ultrasound",
    availableAt: ["cairo-scan", "technoscan", "medray", "crc"],
    icon: "waves",
    highlight: "Real-time soft tissue imaging",
    priority: "high",
    order: 1,
  },
  {
    id: "ultrasound-3d4d",
    name: "3D / 4D Ultrasound",
    description:
      "Volume rendering for fetal assessment, gynecological evaluation, and soft tissue characterisation.",
    categoryId: "ultrasound",
    availableAt: ["cairo-scan", "technoscan", "medray"],
    icon: "box",
    highlight: "Volume fetal & soft tissue imaging",
    priority: "medium",
    order: 2,
  },
  {
    id: "echo-ultrasound",
    name: "ECHO Ultrasound",
    description:
      "Transthoracic echocardiography for cardiac structure and function — reported by cardiology-trained consultants.",
    categoryId: "ultrasound",
    availableAt: ["cairo-scan", "crc", "medray"],
    icon: "heart",
    highlight: "Cardiac structure & function",
    priority: "high",
    order: 3,
  },
  {
    id: "doppler-ultrasound",
    name: "Doppler Ultrasound",
    description:
      "Colour and spectral Doppler for vascular assessment — carotid, peripheral arteries, deep veins, and portal system.",
    categoryId: "ultrasound",
    availableAt: ["cairo-scan", "technoscan", "medray", "crc"],
    icon: "git-branch",
    highlight: "Vascular flow assessment",
    priority: "medium",
    order: 4,
  },
  {
    id: "fibroscan",
    name: "FibroScan",
    description:
      "Liver stiffness measurement for cirrhosis staging — non-invasive, rapid, and reproducible.",
    categoryId: "ultrasound",
    availableAt: ["medray"],
    icon: "filter",
    highlight: "Non-invasive liver assessment",
    priority: "medium",
    order: 5,
  },

  // ── WOMEN'S IMAGING ───────────────────────────
  {
    id: "mammography-digital",
    name: "Digital Mammography",
    description:
      "Full-field digital mammography with CAD-assisted reading. Screening and diagnostic protocols available.",
    categoryId: "womens",
    availableAt: ["cairo-scan", "technoscan", "crc", "medray"],
    icon: "shield-check",
    highlight: "AI-assisted breast screening",
    priority: "high",
    order: 1,
    featured: true,
  },
  {
    id: "tomosynthesis",
    name: "Tomosynthesis (3D Mammography)",
    description:
      "3D mammography with improved lesion detection and reduced recall rates vs. standard 2D mammography.",
    categoryId: "womens",
    availableAt: ["technoscan", "cairo-scan"],
    icon: "layers",
    highlight: "Lower recall, higher detection",
    priority: "high",
    order: 2,
  },
  {
    id: "breast-mri",
    name: "Breast MRI",
    description:
      "High-resolution bilateral breast MRI for high-risk screening, pre-operative planning, and treatment response.",
    categoryId: "womens",
    availableAt: ["cairo-scan", "medray"],
    icon: "scan-line",
    highlight: "High-risk breast screening",
    priority: "medium",
    order: 3,
  },
  {
    id: "panorama",
    name: "Panorama",
    description:
      "Panoramic breast imaging with contrast enhancement for comprehensive field-of-view evaluation.",
    categoryId: "womens",
    availableAt: ["cairo-scan"],
    icon: "maximize",
    highlight: "Wide-field breast imaging",
    priority: "medium",
    order: 4,
  },
  {
    id: "hsg-barium",
    name: "H.S.G. & Barium Studies",
    description:
      "Hysterosalpingography for fallopian tube patency and barium studies for upper and lower GI tract evaluation.",
    categoryId: "womens",
    availableAt: ["cairo-scan", "technoscan"],
    icon: "test-tube",
    highlight: "Fertility & GI assessment",
    priority: "low",
    order: 5,
  },

  // ── CARDIOLOGY ────────────────────────────────
  {
    id: "ecg",
    name: "ECG (Resting)",
    description:
      "12-lead resting electrocardiogram with consultant interpretation — available as walk-in at all branches.",
    categoryId: "cardiology",
    availableAt: ["cairo-scan", "technoscan", "medray", "crc"],
    icon: "activity",
    highlight: "Walk-in, same-day results",
    priority: "high",
    order: 1,
  },
  {
    id: "ecg-treadmill",
    name: "Exercise Treadmill ECG",
    description:
      "Graded exercise stress test for ischaemia detection and functional cardiac assessment under clinical supervision.",
    categoryId: "cardiology",
    availableAt: ["cairo-scan", "technoscan", "crc"],
    icon: "trending-up",
    highlight: "Cardiac stress assessment",
    priority: "medium",
    order: 2,
  },
  {
    id: "ecg-holter",
    name: "ECG Holter Monitor (24–72 hrs)",
    description:
      "Ambulatory ECG monitoring for arrhythmia detection and palpitation workup over 24, 48, or 72 hours.",
    categoryId: "cardiology",
    availableAt: ["cairo-scan", "technoscan", "medray"],
    icon: "timer",
    highlight: "Continuous arrhythmia detection",
    priority: "medium",
    order: 3,
  },

  // ── ADVANCED DIAGNOSTICS ──────────────────────
  {
    id: "emg",
    name: "EMG",
    description:
      "Electromyography and nerve conduction studies for peripheral neuropathy, radiculopathy, and neuromuscular disease.",
    categoryId: "advanced",
    availableAt: ["cairo-scan", "technoscan"],
    icon: "zap",
    highlight: "Nerve & muscle assessment",
    priority: "medium",
    order: 1,
  },
  {
    id: "eeg",
    name: "EEG",
    description:
      "Routine and ambulatory electroencephalography for epilepsy diagnosis, sleep disorders, and encephalopathy.",
    categoryId: "advanced",
    availableAt: ["cairo-scan", "technoscan"],
    icon: "brain",
    highlight: "Brain activity monitoring",
    priority: "medium",
    order: 2,
  },
  {
    id: "dexa",
    name: "DEXA Scan",
    description:
      "Dual-energy X-ray absorptiometry for bone mineral density — osteoporosis screening and monitoring.",
    categoryId: "advanced",
    availableAt: ["cairo-scan", "crc", "medray"],
    icon: "bone",
    highlight: "Osteoporosis screening",
    priority: "medium",
    order: 3,
  },
  {
    id: "eos-imaging",
    name: "EOS Imaging",
    description:
      "Low-dose biplanar X-ray for full-body orthopaedic assessment in standing position — scoliosis, lower limb alignment.",
    categoryId: "advanced",
    availableAt: ["medray"],
    icon: "ruler",
    highlight: "Low-dose full-body orthopaedics",
    priority: "medium",
    order: 4,
  },
  {
    id: "pain-therapy",
    name: "Pain Therapy",
    description:
      "Image-guided pain management including joint injections, nerve blocks, and epidural steroid injections.",
    categoryId: "advanced",
    availableAt: ["cairo-scan", "technoscan"],
    icon: "syringe",
    highlight: "Image-guided pain relief",
    priority: "low",
    order: 5,
  },

  // ── LAB SERVICES ──────────────────────────────
  {
    id: "haematology",
    name: "Haematology",
    description:
      "Complete blood count, coagulation studies, blood film analysis, and bone marrow evaluation.",
    categoryId: "lab",
    availableAt: ["cairo-scan", "technoscan"],
    icon: "droplets",
    highlight: "Complete blood analysis",
    priority: "high",
    order: 1,
    featured: true,
  },
  {
    id: "biochemistry",
    name: "Biochemistry",
    description:
      "Liver, kidney, thyroid, lipid, and metabolic panels. Tumour markers and hormonal assays.",
    categoryId: "lab",
    availableAt: ["cairo-scan", "technoscan"],
    icon: "flask-conical",
    highlight: "Comprehensive metabolic panels",
    priority: "high",
    order: 2,
  },
  {
    id: "microbiology",
    name: "Microbiology",
    description: "Culture and sensitivity, virology, serology, and molecular PCR testing.",
    categoryId: "lab",
    availableAt: ["cairo-scan"],
    icon: "microscope",
    highlight: "PCR & culture testing",
    priority: "medium",
    order: 3,
  },

  // ── TELERADIOLOGY (Ray Medical) ───────────────
  {
    id: "neuroradiology",
    name: "Neuroradiology",
    description: "Brain, spine, head & neck imaging — MRI-first protocol with double-reading QA.",
    categoryId: "teleradiology",
    availableAt: ["ray-medical"],
    icon: "brain",
    highlight: "Brain & spine subspecialty",
    priority: "high",
    order: 1,
    featured: true,
  },
  {
    id: "msk-radiology",
    name: "MSK Radiology",
    description: "Joint, bone, and soft tissue imaging. MR Arthrography reporting available.",
    categoryId: "teleradiology",
    availableAt: ["ray-medical"],
    icon: "bone",
    highlight: "Joint & musculoskeletal subspecialty",
    priority: "high",
    order: 2,
  },
  {
    id: "chest-radiology",
    name: "Chest Radiology",
    description: "CT chest, HRCT, and pulmonary nodule programme reporting.",
    categoryId: "teleradiology",
    availableAt: ["ray-medical"],
    icon: "wind",
    highlight: "Pulmonary & chest subspecialty",
    priority: "high",
    order: 3,
  },
  {
    id: "breast-imaging-reporting",
    name: "Breast Imaging Reporting",
    description: "Mammography, tomosynthesis, and breast MRI subspecialty reporting.",
    categoryId: "teleradiology",
    availableAt: ["ray-medical"],
    icon: "shield-check",
    highlight: "Women's imaging subspecialty",
    priority: "medium",
    order: 4,
  },
  {
    id: "oncology-imaging",
    name: "Oncology Imaging",
    description:
      "Staging, response assessment, and surveillance reporting across all oncology pathways.",
    categoryId: "teleradiology",
    availableAt: ["ray-medical"],
    icon: "target",
    highlight: "Oncology staging & surveillance",
    priority: "high",
    order: 5,
  },
];

// ─────────────────────────────────────────────
// INDEXED LOOKUP — built once, O(1) access
// ─────────────────────────────────────────────
const _byId = new Map(services.map((s) => [s.id, s]));
const _byBrand = new Map<string, ServiceItem[]>();
const _byCat = new Map<string, ServiceItem[]>();

for (const s of services) {
  for (const brand of s.availableAt) {
    if (!_byBrand.has(brand)) _byBrand.set(brand, []);
    _byBrand.get(brand)!.push(s);
  }
  if (!_byCat.has(s.categoryId)) _byCat.set(s.categoryId, []);
  _byCat.get(s.categoryId)!.push(s);
}

export const getServiceById = (id: string) => _byId.get(id);
export const getServicesByBrand = (slug: string) => _byBrand.get(slug) ?? [];
export const getServicesByCategory = (cat: string) => _byCat.get(cat) ?? [];
export const getFeaturedServices = () => services.filter((s) => s.featured);
export const getServicesSortedByPriority = (list: ServiceItem[]) =>
  [...list].sort((a, b) => {
    const rank = { high: 0, medium: 1, low: 2 };
    return rank[a.priority] - rank[b.priority] || a.order - b.order;
  });
