// ═══════════════════════════════════════════════════════════
// INVESTORS PAGE COPY — src/data/en/investors.ts
//
// This page tells a STORY with conviction — not just data.
// Every number has a "So What?" interpretation.
// Every risk is named and mitigated.
// Every section builds toward one conclusion: invest.
//
// Structure:
// Hero → Thesis → Performance → Shareholders →
// Strategy → Risk & Mitigation → Expansion → Governance → Exit Vision
// ═══════════════════════════════════════════════════════════

export const investorsCopy = {
  seo: {
    title: "Investor Relations — Ray Lab Group",
    description:
      "Ray Lab Group investor relations — investment thesis, financial performance, shareholder structure, growth strategy, and governance.",
  },

  hero: {
    eyebrow: "Investor Relations",
    headline: "A Platform Built for",
    headlineAccent: "Regional Scale.",
    subheadline:
      "Ray Lab Group is the MENA region's most geographically diverse private diagnostic group — backed by leading development finance institutions and growing across Egypt, Saudi Arabia, and Jordan.",
    primaryCta: "Download Group Overview",
    secondaryCta: "Submit Investor Inquiry",
  },

  // ── SECTION 1: Investment Thesis ─────────────
  thesis: {
    eyebrow: "Investment Thesis",
    headline: "Why Ray Lab Group",
    subheadline:
      "Four structural advantages that make Ray Lab Group a compelling diagnostic platform investment in MENA — each backed by demonstrated operational evidence.",
    pillars: [
      {
        number: "01",
        title: "Fragmented Market, Consolidated Play",
        body: "Private diagnostics in Egypt, KSA, and Jordan remain highly fragmented. Ray Lab Group is the only platform operating at scale across all three markets under unified governance.",
        soWhat:
          "First-mover consolidation advantage in a market with no comparable multi-country operator — creating a defensible competitive moat.",
      },
      {
        number: "02",
        title: "Resilient, Recurring Revenue",
        body: "Diagnostic imaging is non-discretionary healthcare spend. Demand is driven by population growth, chronic disease prevalence, and physician referrals — not consumer sentiment.",
        soWhat:
          "Revenue is recurring, predictable, and structurally insulated from economic cycles — a rare characteristic in MENA private healthcare.",
      },
      {
        number: "03",
        title: "Proven Hub-and-Spoke Scalability",
        body: "The group's hub-and-spoke expansion model is validated: Jordan grew from 5 to 7 branches; Egypt expanded 12 branches in a single year without proportional fixed cost increases.",
        soWhat:
          "Capital-efficient growth model where marginal branches generate high incremental contribution — not high incremental overhead.",
      },
      {
        number: "04",
        title: "DFI-Backed, EU-Governed",
        body: "Backed by EBRD, FMO, Proparco, DEG, and Mediterrania Capital — a consortium representing €79.3B+ in combined portfolios, with Malta HQ providing EU regulatory standing.",
        soWhat:
          "Institutional backing signals rigorous due diligence, ESG compliance, and governance standards that align with international co-investment requirements.",
      },
    ],
  },

  // ── SECTION 2: Financial Highlights ──────────
  performance: {
    eyebrow: "Financial Highlights",
    headline: "2025 Performance at a Glance",
    subheadline:
      "Record year across all key metrics — driven by Egypt expansion and growing teleradiology demand.",
    metrics: [
      {
        value: "$36.2M",
        label: "Total Operating Revenue",
        note: "2025 full year",
        soWhat:
          "Demonstrating strong recurring demand across core markets — with teleradiology and clinics as emerging growth contributors.",
      },
      {
        value: "1.6M+",
        label: "Diagnostic Exams Performed",
        note: "Across all platforms",
        soWhat:
          "Volume at this scale indicates entrenched physician referral relationships and strong brand recall across patient populations.",
      },
      {
        value: "344K",
        label: "Lab Tests Performed",
        note: "Cairo Scan + TechnoScan",
        soWhat:
          "Lab expansion (launched 2012) has become a material revenue contributor — with significantly higher margin per interaction than imaging.",
      },
      {
        value: "12",
        label: "New Branches Launched",
        note: "Egypt 2025 — Delta, Canal, Upper Egypt",
        soWhat:
          "Fastest single-year expansion in group history — proving the hub-and-spoke model scales beyond Cairo into underserved markets.",
      },
    ],

    context: {
      title: "Revenue Quality & Payer Mix",
      body: "Revenue is generated across a diversified payer base — insured patients via private health plans and professional syndicates, corporate clients, and self-paying patients. This mix reduces concentration risk and provides revenue stability across economic cycles.",
      note: "Teleradiology (Ray Medical) introduces a B2B per-report revenue model — inherently scalable with near-zero marginal cost per additional hospital client.",
    },

    revenueBreakdown: {
      title: "Revenue Mix (Estimated)",
      note: "Diversified across imaging, lab, teleradiology, and outpatient clinics — reducing single-stream dependency.",
      items: [
        { label: "Imaging Services", value: 65, display: "~65%", note: "Core recurring revenue" },
        {
          label: "Laboratory Services",
          value: 22,
          display: "~22%",
          note: "Higher margin per test",
        },
        { label: "Teleradiology", value: 8, display: "~8%", note: "Scalable B2B model" },
        { label: "Specialized Clinics", value: 5, display: "~5%", note: "New — high growth track" },
      ],
    },

    growthChart: {
      title: "Branch Growth Trajectory",
      note: "Consistent year-on-year expansion — accelerating in 2025 with Egypt nationwide rollout.",
      data: [
        { year: "2021", branches: 28 },
        { year: "2022", branches: 35 },
        { year: "2023", branches: 42 },
        { year: "2024", branches: 53 },
        { year: "2025", branches: 65 },
      ],
    },
  },

  // ── SECTION 3: Shareholders ───────────────────
  shareholders: {
    eyebrow: "Institutional Shareholders",
    headline: "Backed by €79.3B+ in Combined Institutional Capital",
    subheadline:
      "Ray Lab Group's shareholder base reflects the highest standards of international development finance — providing long-term capital, ESG oversight, and governance credibility that signals quality to any prospective co-investor.",
    combinedPortfolio: {
      value: "€79.3B+",
      label: "Combined Institutional Portfolio",
      sublabel: "Across all 5 institutional shareholders",
      soWhat:
        "This level of institutional backing represents rigorous independent due diligence — each DFI applied its own investment committee process before committing.",
    },
    credibilitySignals: {
      title: "What DFI Backing Means for Co-investors",
      items: [
        {
          icon: "shield-check",
          label: "EU-Regulated Governance",
          body: "Malta HQ + EBRD and FMO oversight = international governance standards applied consistently across all group operations.",
        },
        {
          icon: "leaf",
          label: "ESG Compliance Framework",
          body: "DFI investment mandates enforce environmental, social, and governance standards — meeting the bar for ESG-screened institutional portfolios.",
        },
        {
          icon: "trending-up",
          label: "Long-term Capital Alignment",
          body: "Development finance institutions invest for sustainable impact, not short-term exits — aligning with the group's long-term regional platform vision.",
        },
        {
          icon: "globe-2",
          label: "MENA Growth Mandate",
          body: "All shareholders have active Africa & MENA growth investment mandates — their continued support signals conviction in the regional growth thesis.",
        },
      ],
    },
  },

  // ── SECTION 4: Growth Strategy ───────────────
  strategy: {
    eyebrow: "Growth Strategy",
    headline: "Three Vectors of Expansion",
    subheadline:
      "Ray Lab Group's growth is driven by three concurrent, mutually reinforcing strategies — each contributing to scale, margin improvement, and competitive advantage.",
    vectors: [
      {
        number: "01",
        title: "Geographic Expansion",
        body: "Hub-and-spoke rollout across underserved Egyptian governorates, KSA network densification in Riyadh and Jeddah, and feasibility studies for UAE and Iraq entry by 2027.",
        metric: "12 new branches in Egypt — 2025",
        soWhat:
          "Each new branch enters a market with existing physician referral demand and brand recognition — reducing customer acquisition cost to near zero.",
      },
      {
        number: "02",
        title: "Vertical Integration",
        body: "Extending from diagnostics into outpatient specialist clinics — creating a fully integrated care pathway from consultation to imaging to laboratory. 9+ clinic locations launched in 2025.",
        metric: "18 specialties · 50+ physicians",
        soWhat:
          "Vertical integration increases revenue per patient episode, reduces referral leakage to competitors, and creates a defensible care ecosystem.",
      },
      {
        number: "03",
        title: "Technology-Enabled Scale",
        body: "Ray Medical provides 24/7 teleradiology coverage across Egypt and KSA — shifting from fixed consultant costs to a scalable per-report model. AI-enabled workflows reduce turnaround time and diagnostic error rates.",
        metric: "~90min turnaround · 60+ consultants",
        soWhat:
          "Teleradiology decouples revenue growth from headcount growth — the platform scales horizontally across any number of hospital clients with minimal marginal cost.",
      },
    ],
  },

  // ── SECTION 5: Risk & Mitigation ─────────────
  risks: {
    eyebrow: "Risk & Mitigation",
    headline: "We Know the Risks. Here's How We Manage Them.",
    subheadline:
      "Transparent risk disclosure is a hallmark of institutional-grade governance. Below are the key risks we monitor — and the structural mitigants in place.",
    items: [
      {
        risk: "Market Fragmentation",
        mitigation:
          "Consolidation strategy with proven hub-and-spoke execution. Ray Lab is already the largest multi-country diagnostic operator in the region — scale itself is the moat.",
        status: "Actively managed",
      },
      {
        risk: "Talent & Consultant Dependency",
        mitigation:
          "Consultant-led network model reduces single-physician risk. 60+ consultants across Ray Medical alone. Teleradiology enables subspecialty access without geographic constraints.",
        status: "Structurally mitigated",
      },
      {
        risk: "Geographic & Political Risk",
        mitigation:
          "Multi-country diversification across Egypt, KSA, and Jordan ensures no single-market dependency. Malta HQ provides EU legal standing and international arbitration access.",
        status: "Diversified",
      },
      {
        risk: "Regulatory & Payer Risk",
        mitigation:
          "Diversified payer mix (insured, corporate, self-pay) reduces dependency on any single reimbursement scheme. DFI backing enforces compliance standards across all markets.",
        status: "Diversified",
      },
      {
        risk: "Execution Risk at Scale",
        mitigation:
          "Hub-and-spoke model is proven — 12 branches launched in 2025 with operational continuity maintained. Shared infrastructure (Ray Medical, physician portal) reduces per-branch complexity.",
        status: "Demonstrated capability",
      },
    ],
  },

  // ── SECTION 6: Expansion Roadmap ─────────────
  expansion: {
    eyebrow: "Expansion Roadmap",
    headline: "Where We Are. Where We're Going.",
    statuses: {
      done: "Completed",
      active: "In Progress",
      planned: "Planned",
    },
    milestones: [
      {
        status: "done",
        year: "2025",
        title: "Egypt Nationwide Footprint",
        body: "TechnoScan expanded to Delta, Suez Canal, and Upper Egypt — 12 new branches. Cairo Scan Specialized Clinics expanded to 5 locations.",
        metric: "+12 branches · 55+ total in Egypt",
        soWhat:
          "Validates hub-and-spoke scalability beyond Cairo — now the only diagnostic brand with meaningful Upper Egypt presence.",
      },
      {
        status: "done",
        year: "2026",
        title: "Jordan Hub-and-Spoke Complete",
        body: "MedRay grew from 5 to 7 branches across Greater Amman, reinforcing its position as Jordan's most accessible radiology network.",
        metric: "7 total branches · Greater Amman",
        soWhat:
          "Proves the model replicates across different regulatory environments and physician ecosystems.",
      },
      {
        status: "done",
        year: "2026",
        title: "Ray Medical Launches — Teleradiology Arm",
        body: "Teleradiology division launched across Egypt and KSA — 60+ consultants, ~90-minute average turnaround, 24/7 coverage.",
        metric: "60+ consultants · 24/7 coverage",
        soWhat:
          "Opens a new scalable B2B revenue stream — any hospital becomes a potential client without capital investment.",
      },
      {
        status: "active",
        year: "2026",
        title: "KSA Network Densification",
        body: "CRC expanding within Riyadh and evaluating Jeddah entry. Target: 6+ Saudi branches by end 2026.",
        metric: "Target: 6+ branches",
        soWhat:
          "KSA is the highest-revenue private healthcare market in the region — CRC's consultant-led positioning is premium in a quality-sensitive market.",
      },
      {
        status: "active",
        year: "2026",
        title: "Ray Medical GCC Scale-Up",
        body: "Targeting 100+ consultant radiologists and new hospital partnerships across the Gulf Cooperation Council.",
        metric: "Target: 100+ consultants",
        soWhat:
          "Each new hospital client is low-cost to acquire and high-margin to serve — the B2B teleradiology model compounds as the network grows.",
      },
      {
        status: "planned",
        year: "2027",
        title: "New Market Entry — UAE & Iraq",
        body: "Feasibility studies underway for diagnostic platform entry under the Ray Lab Group umbrella. UAE is the primary 2027 target.",
        metric: "UAE entry targeted 2027",
        soWhat:
          "UAE represents the highest GDP-per-capita private healthcare market in MENA — a premium positioning opportunity for the Ray Lab brand.",
      },
    ],
  },

  // ── SECTION 7: Exit Vision ────────────────────
  exit: {
    eyebrow: "Platform Vision",
    headline: "Built for Long-Term Value Creation",
    subheadline:
      "Ray Lab Group is building the defining private diagnostic platform across MENA — with a capital structure, governance framework, and operational model designed for institutional-scale value creation.",
    statements: [
      {
        title: "Regional Consolidation Platform",
        body: "As the only multi-country diagnostic operator at scale in MENA, Ray Lab Group is uniquely positioned to lead — or participate in — regional consolidation as the sector matures.",
      },
      {
        title: "Scalable, Asset-Light Technology Layer",
        body: "Ray Medical's teleradiology model creates a technology-enabled revenue layer that scales horizontally across any number of hospital and clinic clients — with near-zero marginal cost per new partner.",
      },
      {
        title: "Institutional-Grade Platform",
        body: "EU governance, DFI backing, international reporting standards, and multi-market operational track record position Ray Lab Group as a credible platform for strategic partnership, co-investment, or long-term value realisation.",
      },
    ],
    cta: {
      label: "Start a Conversation",
      body: "For data room access, financial documentation, or partnership discussions — our investor relations team responds within 48 hours.",
      button: "Submit Investor Inquiry",
    },
  },

  // ── SECTION 8: Governance ─────────────────────
  governance: {
    eyebrow: "Corporate Governance",
    headline: "International Standards. Institutional Accountability.",
    subheadline:
      "Ray Lab Group's EU-based holding structure reflects the governance requirements of its DFI shareholders — providing transparency, compliance, and institutional reporting practices across all markets.",
    standards: [
      {
        label: "Reporting Standards",
        value: "International accounting practices with institutional-grade financial reporting.",
      },
      {
        label: "DFI Compliance",
        value: "EBRD, FMO, Proparco, and DEG compliance frameworks applied across all operations.",
      },
      {
        label: "ESG Framework",
        value: "Environmental, social, and governance monitoring mandated by DFI investment terms.",
      },
      {
        label: "Legal Jurisdiction",
        value:
          "Malta (EU) — providing access to international arbitration and EU regulatory standing.",
      },
    ],
    details: {
      title: "Corporate Structure",
      items: [
        { label: "Legal Entity", value: "Private Limited Liability Company" },
        { label: "Incorporated", value: "2023 (consolidated group)" },
        { label: "HQ Jurisdiction", value: "Malta — European Union" },
        { label: "Operating Markets", value: "Egypt · Saudi Arabia · Jordan" },
        { label: "Reporting Currency", value: "USD" },
      ],
    },
    offices: {
      title: "Registered Offices",
      primary: {
        label: "Primary Registered Office",
        address: "B2, Industry Street, Zone 5\nCentral Business District, Qormi\nCBD 5030, Malta",
      },
      secondary: {
        label: "Ta' Xbiex Office",
        address: "Whitehall Mansions — Level 2\nTa' Xbiex Wharf\nTa' Xbiex XBX 1026, Malta",
      },
    },
  },

  // ── PRESS ROOM ────────────────────────────────
  press: {
    eyebrow: "Press Room",
    headline: "Latest from Ray Lab Group",
    readMore: "Read Full Release",
    recentLabel: "Recent Stories",
    categories: {
      all: "All",
      announcement: "Group Announcement",
      expansion: "Expansion",
      technology: "Technology",
      clinics: "Clinics",
    },
    featured: {
      category: "Group Announcement",
      headline: "Ray Lab Group Completes 1.6 Million Diagnostic Examinations in 2025",
      date: "April 2025",
      body: "Ray Lab Group announces record diagnostic output for 2025, driven by Egypt expansion and growing teleradiology demand. Total operating revenue reaches $36.2M across the group's three-market operating network.",
    },
    articles: [
      {
        category: "Expansion",
        headline: "TechnoScan Opens 3 New Branches in Upper Egypt",
        date: "March 2025",
      },
      {
        category: "Technology",
        headline: "LUMINA 3T Tesla MRI Now Available at 8 Cairo Scan Locations",
        date: "February 2025",
      },
      {
        category: "Clinics",
        headline: "TechnoScan Specialized Clinics Launches Across Cairo",
        date: "January 2025",
      },
      {
        category: "Expansion",
        headline: "MedRay Jordan Expands to 7th Branch in Abdoun District",
        date: "December 2024",
      },
    ],
  },

  // ── PAGE TABS ─────────────────────────────────
  tabs: {
    thesis: "Investment Thesis",
    performance: "Financial Highlights",
    shareholders: "Shareholders",
    strategy: "Growth Strategy",
    risks: "Risk & Mitigation",
    expansion: "Expansion Roadmap",
    press: "Press Room",
    governance: "Governance",
    exit: "Platform Vision",
  },
} as const;

export type InvestorsCopy = typeof investorsCopy;
