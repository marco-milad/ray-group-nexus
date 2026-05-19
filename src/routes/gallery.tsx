import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { canonical, hreflangLinks } from "@/lib/seo";
import { jsonLdScript, webPageSchema, breadcrumbSchema, breadcrumbsForRoute } from "@/lib/schema";
import { Reveal } from "@/components/ui/reveal";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionShell } from "@/components/layout/SectionShell";
import { brands } from "@/data/en/brands";
import { useCountUp } from "@/hooks/useCountUp";

const GALLERY_TITLE = "Gallery — Ray Lab Group";
const GALLERY_DESCRIPTION =
  "From advanced imaging suites to specialized clinics — a visual journey across Ray Lab Group's diagnostic network.";

export const Route = createFileRoute("/gallery")({
  head: () => {
    const url = canonical("/gallery");
    return {
      meta: [
        { title: GALLERY_TITLE },
        { name: "description", content: GALLERY_DESCRIPTION },
        { property: "og:title", content: GALLERY_TITLE },
        { property: "og:description", content: GALLERY_DESCRIPTION },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }, ...hreflangLinks("/gallery")],
      scripts: [
        jsonLdScript(
          webPageSchema({
            url,
            name: GALLERY_TITLE,
            description: GALLERY_DESCRIPTION,
            breadcrumbId: `${url}#breadcrumb`,
          }),
        ),
        jsonLdScript(breadcrumbSchema({ url, items: breadcrumbsForRoute("/gallery") })),
      ],
    };
  },
  component: GalleryPage,
});

type GalleryItem = {
  id: string;
  brandSlug: string;
  src: string;
  alt: string;
  caption: string;
};

const galleryItems: GalleryItem[] = [
  // Cairo Scan — MRI, mammography, CT, X-ray, ultrasound, women's imaging reception
  {
    id: "cs-1",
    brandSlug: "cairo-scan",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778713996/photo_2026-05-14_02-08-55_moxv4r.jpg",
    alt: "Cairo Scan women's imaging team beside Fujifilm Amulet Innovality mammography unit",
    caption:
      "Women's Imaging — Cairo Scan's all-female mammography team beside the Fujifilm Amulet Innovality 3D system.",
  },
  {
    id: "cs-2",
    brandSlug: "cairo-scan",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778713996/photo_2026-05-14_02-08-43_fcqxt2.jpg",
    alt: "Cairo Scan GE Healthcare CT scanner suite",
    caption:
      "GE Healthcare CT Suite — multi-slice volumetric imaging for neuro, chest, and abdominal exams.",
  },
  {
    id: "cs-3",
    brandSlug: "cairo-scan",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778713996/photo_2026-05-14_02-08-19_keof8y.jpg",
    alt: "Cairo Scan Siemens Healthineers digital X-ray room",
    caption:
      "Digital Radiography — Siemens Healthineers ceiling-mounted X-ray suite for routine and trauma imaging.",
  },
  {
    id: "cs-4",
    brandSlug: "cairo-scan",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778713996/photo_%D9%A2%D9%A0%D9%A2%D9%A6-%D9%A0%D9%A5-%D9%A1%D9%A2_%D9%A1%D9%A4-%D9%A0%D9%A9-%D9%A2%D9%A7_odvm0v.jpg",
    alt: "Cairo Scan radiographer positioning a patient for 3D mammography",
    caption:
      "Tomosynthesis in Progress — a Cairo Scan radiographer guiding a patient through her 3D mammogram.",
  },
  {
    id: "cs-5",
    brandSlug: "cairo-scan",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778713996/photo_%D9%A2%D9%A0%D9%A2%D9%A6-%D9%A0%D9%A5-%D9%A1%D9%A2_%D9%A1%D9%A4-%D9%A0%D9%A9-%D9%A2%D9%A0_maojoq.jpg",
    alt: "Cairo Scan Fujifilm Amulet Innovality mammography suite",
    caption:
      "Fujifilm Amulet Innovality — dedicated breast imaging suite at Cairo Scan Women's Imaging.",
  },
  {
    id: "cs-6",
    brandSlug: "cairo-scan",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778713996/photo_%D9%A2%D9%A0%D9%A2%D9%A6-%D9%A0%D9%A5-%D9%A1%D9%A2_%D9%A1%D9%A4-%D9%A0%D9%A9-%D9%A2%D9%A6_jeoxli.jpg",
    alt: "Cairo Scan Siemens MAGNETOM Altea MRI scanner with anesthesia trolley",
    caption:
      "Siemens MAGNETOM Altea 1.5T MRI — BioMatrix-driven exams with on-site anesthesia support.",
  },
  {
    id: "cs-7",
    brandSlug: "cairo-scan",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778713996/photo_2026-05-14_02-08-36_buxbvd.jpg",
    alt: "Cairo Scan Siemens MAGNETOM Lumina 3T MRI suite",
    caption:
      "Siemens MAGNETOM Lumina 3T MRI — high-field neuro, body, and musculoskeletal imaging.",
  },
  {
    id: "cs-8",
    brandSlug: "cairo-scan",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778713995/photo_%D9%A2%D9%A0%D9%A2%D9%A6-%D9%A0%D9%A5-%D9%A1%D9%A2_%D9%A1%D9%A4-%D9%A0%D9%A9-%D9%A2%D9%A1_lgenst.jpg",
    alt: "Cairo Scan Women's Imaging reception desk",
    caption: "Women's Imaging Reception — dedicated check-in for breast and gynecological exams.",
  },
  {
    id: "cs-9",
    brandSlug: "cairo-scan",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778713995/photo_2026-05-14_02-08-28_jzx4he.jpg",
    alt: "Cairo Scan GE LOGIQ P9 ultrasound examination room",
    caption:
      "GE LOGIQ P9 Ultrasound — abdominal, OB, and vascular workups in a dedicated exam suite.",
  },
  {
    id: "cs-10",
    brandSlug: "cairo-scan",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778715023/photo_2026-05-14_02-28-04_jn9zes.jpg",
    alt: "Cairo Scan Toshiba MRI scanner suite",
    caption:
      "Toshiba MRI Suite — open-architecture scanner serving routine neuro and musculoskeletal exams.",
  },
  {
    id: "cs-11",
    brandSlug: "cairo-scan",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778715024/photo_2026-05-14_02-29-25_iiarof.jpg",
    alt: "Cairo Scan Siemens ACUSON Redwood ultrasound exam in progress",
    caption:
      "Siemens ACUSON Redwood Ultrasound — sonographer-led abdominal and vascular workups in a calming exam suite.",
  },
  {
    id: "cs-12",
    brandSlug: "cairo-scan",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778715023/photo_2026-05-14_02-27-40_rwkgbr.jpg",
    alt: "Cairo Scan patient reviewing services brochure in waiting area",
    caption:
      "Patient Lounge — guests browse the Cairo Scan services menu while waiting for their consultation.",
  },

  // Cairo Scan Polyclinics — specialty clinic entrance, reception, waiting hall
  {
    id: "csp-1",
    brandSlug: "cairo-scan-polyclinics",
    src: "https://res.cloudinary.com/dcui0elwh/image/upload/v1779190380/WhatsApp_Image_2026-05-14_at_14.46.37_2_cj2lxg.jpg",
    alt: "Cairo Scan Polyclinics entrance corridor with specialty clinic signage",
    caption:
      "Specialty Clinics Entrance — Cairo Scan Polyclinics' branded corridor leading to consultation suites.",
  },
  {
    id: "csp-2",
    brandSlug: "cairo-scan-polyclinics",
    src: "https://res.cloudinary.com/dcui0elwh/image/upload/v1779190380/WhatsApp_Image_2026-05-14_at_14.46.37_1_whvr3d.jpg",
    alt: "Cairo Scan Polyclinics receptionist on the phone at the front desk",
    caption:
      "Reception Desk — Cairo Scan Polyclinics' front-of-house team coordinating patient appointments.",
  },
  {
    id: "csp-3",
    brandSlug: "cairo-scan-polyclinics",
    src: "https://res.cloudinary.com/dcui0elwh/image/upload/v1779190380/WhatsApp_Image_2026-05-14_at_14.46.37_m2olpm.jpg",
    alt: "Cairo Scan Polyclinics waiting hall with bench seating and reception",
    caption:
      "Patient Waiting Hall — a spacious, well-lit lounge welcoming patients across our specialty clinics.",
  },

  // TechnoScan — CT scanner, ultrasound, medical team, diagnostic center
  {
    id: "ts-1",
    brandSlug: "technoscan",
    src: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=900&q=80&auto=format&fit=crop",
    alt: "TechnoScan CT scanner",
    caption: "High-slice CT imaging anchors TechnoScan's nationwide footprint.",
  },
  {
    id: "ts-2",
    brandSlug: "technoscan",
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80&auto=format&fit=crop",
    alt: "TechnoScan ultrasound equipment",
    caption: "3D/4D ultrasound suites supporting OB, vascular, and abdominal exams.",
  },
  {
    id: "ts-3",
    brandSlug: "technoscan",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80&auto=format&fit=crop",
    alt: "TechnoScan medical team in consultation",
    caption: "Consultant-led reads — a model founded by Prof. Dr. Osama Khalil.",
  },
  {
    id: "ts-4",
    brandSlug: "technoscan",
    src: "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=900&q=80&auto=format&fit=crop",
    alt: "TechnoScan diagnostic center floor",
    caption: "35+ diagnostic centres across Cairo, the Delta, Canal, and Upper Egypt.",
  },

  // CRC — consultant review, Siemens CT suite, patient positioning, control room
  {
    id: "crc-1",
    brandSlug: "crc",
    src: "https://res.cloudinary.com/dcui0elwh/image/upload/v1779188304/DSC09161_pbcueg.jpg",
    alt: "CRC consultants reviewing vascular imaging at a Riyadh workstation",
    caption:
      "Consultant Reads — CRC radiologists reviewing a vascular study side-by-side at our Riyadh centre.",
  },
  {
    id: "crc-2",
    brandSlug: "crc",
    src: "https://res.cloudinary.com/dcui0elwh/image/upload/v1779188306/DSC01183_jenlso.jpg",
    alt: "CRC Siemens Healthineers CT scanner with technologist positioning a patient",
    caption: "Siemens CT Suite — technologist positioning a patient for a contrast-enhanced study.",
  },
  {
    id: "crc-3",
    brandSlug: "crc",
    src: "https://res.cloudinary.com/dcui0elwh/image/upload/v1779188318/DSC01203_n4ghxm.jpg",
    alt: "CRC technologist viewed through the bore of a Siemens CT scanner",
    caption:
      "Patient-First Care — a CRC technologist guiding the patient through the CT examination.",
  },
  {
    id: "crc-4",
    brandSlug: "crc",
    src: "https://res.cloudinary.com/dcui0elwh/image/upload/v1779188299/DSC01218_i4scq7.jpg",
    alt: "CRC control room operator at PACS reporting workstation",
    caption:
      "Control Room — PACS and reporting workstation overseeing scans in real time at CRC Riyadh.",
  },
  {
    id: "crc-5",
    brandSlug: "crc",
    src: "https://res.cloudinary.com/dcui0elwh/image/upload/v1779190756/new_rf0lbh.jpg",
    alt: "CRC patient positioned for a chest X-ray on a Hitachi digital radiography system",
    caption:
      "Digital X-Ray Suite — patient positioning for a chest radiograph on CRC's Hitachi DR system.",
  },

  // MedRay — imaging center, hospital corridor, diagnostic equipment
  {
    id: "mr-1",
    brandSlug: "medray",
    src: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=80&auto=format&fit=crop",
    alt: "MedRay imaging center",
    caption: "MedRay's flagship imaging hub anchors Greater Amman.",
  },
  {
    id: "mr-2",
    brandSlug: "medray",
    src: "https://images.unsplash.com/photo-1551601651-bc60f254d532?w=900&q=80&auto=format&fit=crop",
    alt: "MedRay hospital corridor",
    caption: "Bright, accessible corridors connect MedRay's 7 Jordan branches.",
  },
  {
    id: "mr-3",
    brandSlug: "medray",
    src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=80&auto=format&fit=crop",
    alt: "MedRay diagnostic equipment",
    caption: "Full-spectrum diagnostics — including PET-CT, EOS, and breast MRI.",
  },
  {
    id: "mr-4",
    brandSlug: "medray",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778716252/photo_2026-05-14_02-50-37_xpwrtd.jpg",
    alt: "MedRay flagship building at Al-Basma Medical Complex, Amman",
    caption:
      "Flagship Branch — MedRay's international radiology centre at the Al-Basma Medical Complex in Amman.",
  },
  {
    id: "mr-5",
    brandSlug: "medray",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778716283/photo_2026-05-14_02-51-08_ge3bcp.jpg",
    alt: "MedRay patient waiting lounge with signature wooden lattice screen",
    caption: "Patient Lounge — a calm, design-led waiting area welcoming MedRay's Jordan patients.",
  },
  {
    id: "mr-6",
    brandSlug: "medray",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778716071/photo_2026-05-14_02-46-51_ssky1l.jpg",
    alt: "MedRay radiographers at modality workstations between MRI and DXA rooms",
    caption:
      "Modality Corridor — radiographers prepping MRI and DXA exams side-by-side at MedRay Amman.",
  },
  {
    id: "mr-7",
    brandSlug: "medray",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778716069/photo_2026-05-14_02-46-45_zyt4nw.jpg",
    alt: "MedRay nuclear medicine gamma camera suite with sky-themed ceiling",
    caption:
      "Nuclear Medicine — dual-head gamma camera suite supporting SPECT, bone, and cardiac studies.",
  },
  {
    id: "mr-8",
    brandSlug: "medray",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778716069/photo_2026-05-14_02-46-32_ezbeof.jpg",
    alt: "MedRay Siemens 1.5T MRI suite with floral sky-themed ceiling",
    caption:
      "Siemens 1.5T MRI — a wide-bore suite designed for patient comfort across long protocols.",
  },
  {
    id: "mr-9",
    brandSlug: "medray",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778716068/photo_2026-05-14_02-46-39_nadmz4.jpg",
    alt: "MedRay large-bore CT scanner viewed from inside the gantry",
    caption:
      "Volumetric CT Suite — large-bore scanner for cardiac, vascular, and oncology imaging.",
  },
  {
    id: "mr-10",
    brandSlug: "medray",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778716068/photo_2026-05-14_02-46-20_hixr7l.jpg",
    alt: "MedRay Siemens ACUSON ultrasound exam room",
    caption: "Siemens ACUSON Ultrasound — premium imaging for OB, vascular, and small-parts exams.",
  },
  {
    id: "mr-11",
    brandSlug: "medray",
    src: "https://res.cloudinary.com/dq0om55vx/image/upload/v1778716068/photo_2026-05-14_02-46-04_iksec7.jpg",
    alt: "MedRay radiologist reporting room with multi-monitor reading workstations",
    caption:
      "Radiologist Reading Room — calibrated multi-monitor stations powering MedRay's consultant reads.",
  },

  // Specialized Clinics — outpatient clinic, doctor consultation, medical office
  {
    id: "sc-1",
    brandSlug: "specialized-clinics",
    src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=900&q=80&auto=format&fit=crop",
    alt: "Specialized Clinics outpatient clinic",
    caption: "Multi-specialty outpatient care under Cairo Scan and TechnoScan.",
  },
  {
    id: "sc-2",
    brandSlug: "specialized-clinics",
    src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=80&auto=format&fit=crop",
    alt: "Specialized Clinics doctor consultation",
    caption: "50+ consultant physicians across 18 specialties.",
  },
  {
    id: "sc-3",
    brandSlug: "specialized-clinics",
    src: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=900&q=80&auto=format&fit=crop",
    alt: "Specialized Clinics medical office",
    caption: "Dedicated office spaces for our partner physicians.",
  },

  // Ray Medical — teleradiology workstation, radiologist at screen, digital reporting
  {
    id: "rm-1",
    brandSlug: "ray-medical",
    src: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=900&q=80&auto=format&fit=crop",
    alt: "Ray Medical teleradiology workstation",
    caption: "Tele-reading stations staffed 24/7 across Egypt and KSA.",
  },
  {
    id: "rm-2",
    brandSlug: "ray-medical",
    src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=900&q=80&auto=format&fit=crop",
    alt: "Ray Medical radiologist at screen",
    caption: "60+ subspecialty consultants reading on calibrated displays.",
  },
  {
    id: "rm-3",
    brandSlug: "ray-medical",
    src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=900&q=80&auto=format&fit=crop",
    alt: "Ray Medical digital reporting",
    caption: "Structured digital reports — ~90-minute average turnaround.",
  },
];

type FilterTab = { slug: string; name: string; color: string };

const heroStats: { target: number; suffix: string; label: string }[] = [
  { target: 78, suffix: "+", label: "Branches" },
  { target: 6, suffix: "", label: "Brands" },
  { target: 3, suffix: "", label: "Operating Markets" },
];

function GalleryPage() {
  const [activeBrand, setActiveBrand] = React.useState<string>("all");
  const [statsVisible, setStatsVisible] = React.useState(false);
  const statsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const tabs: FilterTab[] = React.useMemo(
    () => [
      { slug: "all", name: "All", color: "var(--rl-green)" },
      ...brands.map((b) => ({ slug: b.slug, name: b.name, color: b.color })),
    ],
    [],
  );

  const filtered =
    activeBrand === "all" ? galleryItems : galleryItems.filter((i) => i.brandSlug === activeBrand);

  return (
    <main>
      {/* Hero — tightened padding */}
      <section
        className="relative overflow-hidden isolate py-10 md:py-14"
        style={{ backgroundColor: "var(--rl-light-bg)" }}
      >
        {/* Background photo — MedRay patient lounge, Amman */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="https://res.cloudinary.com/dq0om55vx/image/upload/v1778716283/photo_2026-05-14_02-51-08_ge3bcp.jpg"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="hero-bg-image absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 50%" }}
          />
        </div>

        {/* Readability overlay — left-to-right white fade so dark text stays crisp */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in oklab, var(--rl-light-bg) 95%, transparent) 0%, color-mix(in oklab, var(--rl-light-bg) 88%, transparent) 35%, color-mix(in oklab, var(--rl-light-bg) 55%, transparent) 65%, color-mix(in oklab, var(--rl-light-bg) 30%, transparent) 100%)",
          }}
        />

        {/* Brand tint — soft green radial accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1400px 700px at 10% -20%, color-mix(in oklab, var(--rl-mantis) 26%, transparent), transparent 55%), radial-gradient(1000px 600px at 95% 20%, color-mix(in oklab, var(--rl-pistachio) 18%, transparent), transparent 55%)",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--rl-eerie) 1px, transparent 1px), linear-gradient(90deg, var(--rl-eerie) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <PageWrapper>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: "rgba(79,153,7,0.1)",
                  color: "var(--rl-green)",
                }}
              >
                Our Gallery
              </span>
              <h1
                className="mt-4 text-4xl md:text-5xl font-bold tracking-tight"
                style={{ color: "var(--rl-eerie)" }}
              >
                Inside Ray Lab
              </h1>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                From advanced imaging suites to specialized clinics — a visual journey across Ray
                Lab Group's diagnostic network.
              </p>
            </div>
          </Reveal>

          {/* Stats bar — styled like HeroSection StatCard with animated counters */}
          <Reveal delay={80}>
            <div ref={statsRef} className="mx-auto mt-7 grid max-w-2xl grid-cols-3 gap-3">
              {heroStats.map((s) => (
                <HeroStatCard
                  key={s.label}
                  target={s.target}
                  suffix={s.suffix}
                  label={s.label}
                  animate={statsVisible}
                />
              ))}
            </div>
          </Reveal>
        </PageWrapper>
      </section>

      {/* Filter tabs + masonry grid — sm size to tighten gap with hero */}
      <SectionShell bg="bg-background" size="sm">
        <div
          className="sticky top-16 z-40 rounded-2xl p-2 mb-8 overflow-x-auto border border-border/60 bg-card shadow-sm"
          style={{
            maskImage: "linear-gradient(to right, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, black 85%, transparent)",
          }}
        >
          <div className="inline-flex h-auto w-max min-w-full justify-start gap-1 bg-transparent p-0 sm:flex-wrap sm:justify-center">
            {tabs.map((t) => {
              const isActive = activeBrand === t.slug;
              return (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => setActiveBrand(t.slug)}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: isActive ? "var(--rl-green)" : "transparent",
                    color: isActive ? "white" : "var(--rl-muted)",
                    boxShadow: isActive ? "0 2px 8px rgba(79,153,7,0.4)" : "none",
                    fontWeight: isActive ? 700 : 600,
                    transform: isActive ? "scale(1.03)" : "scale(1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "rgba(79,153,7,0.08)";
                      e.currentTarget.style.color = "var(--rl-green)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--rl-muted)";
                    }
                  }}
                >
                  {t.slug !== "all" && (
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: isActive ? "white" : t.color }}
                    />
                  )}
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((item, i) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              <Reveal delay={Math.min(i * 50, 400)}>
                <GalleryCard item={item} />
              </Reveal>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No images yet for this brand. Check back soon.
          </p>
        )}
      </SectionShell>
    </main>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  const brand = brands.find((b) => b.slug === item.brandSlug);
  const brandColor = brand?.color ?? "var(--rl-green)";
  const brandName = brand?.name ?? item.brandSlug;

  return (
    <figure
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
      style={{ borderTopColor: brandColor, borderTopWidth: "3px" }}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="block w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />

      {/* Hover-only overlay with caption */}
      <div
        className="pointer-events-none absolute inset-0 z-10 flex items-end p-5 pb-14 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(20,28,20,0.92) 0%, rgba(20,28,20,0.7) 50%, rgba(20,28,20,0.35) 100%)",
        }}
      >
        <p className="text-sm leading-relaxed text-white">{item.caption}</p>
      </div>

      {/* Always-visible brand badge — bottom-left, sits above the overlay */}
      <span
        className="absolute bottom-3 left-3 z-20 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
        style={{
          backgroundColor: brandColor,
          color: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "white" }} />
        {brandName}
      </span>
    </figure>
  );
}

function HeroStatCard({
  target,
  suffix,
  label,
  animate,
}: {
  target: number;
  suffix: string;
  label: string;
  animate: boolean;
}) {
  const count = useCountUp(target, 1800, animate);
  return (
    <div
      className="group rounded-2xl border bg-white/70 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/90"
      style={{ borderColor: "rgba(79,153,7,0.15)" }}
    >
      <div
        className="text-2xl md:text-3xl font-bold tracking-tight tabular-nums"
        style={{ color: "var(--rl-green)" }}
      >
        {animate ? `${count}${suffix}` : `${target}${suffix}`}
      </div>
      <div className="mt-1.5 text-[11px] md:text-xs font-medium text-foreground/70">{label}</div>
      <div
        className="mt-2.5 h-0.5 w-6 rounded-full transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: "var(--rl-green)", opacity: 0.3 }}
      />
    </div>
  );
}
