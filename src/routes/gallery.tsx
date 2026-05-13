import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
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
      links: [{ rel: "canonical", href: url }],
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
  // Cairo Scan — MRI, radiology lab, reception, X-ray
  {
    id: "cs-1",
    brandSlug: "cairo-scan",
    src: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=900&q=80&auto=format&fit=crop",
    alt: "Cairo Scan MRI machine",
    caption: "3T MRI suite delivering advanced neuro and musculoskeletal imaging.",
  },
  {
    id: "cs-2",
    brandSlug: "cairo-scan",
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80&auto=format&fit=crop",
    alt: "Cairo Scan radiology lab",
    caption: "Cairo Scan's clinical pathology lab — accredited workflows end-to-end.",
  },
  {
    id: "cs-3",
    brandSlug: "cairo-scan",
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80&auto=format&fit=crop",
    alt: "Cairo Scan reception desk",
    caption: "Patient-first reception across 20 centres in Cairo and Giza.",
  },
  {
    id: "cs-4",
    brandSlug: "cairo-scan",
    src: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=900&q=80&auto=format&fit=crop",
    alt: "Cairo Scan X-ray room",
    caption: "Digital X-ray rooms calibrated daily by our radiographers.",
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

  // CRC — radiology suite, consultation room, equipment
  {
    id: "crc-1",
    brandSlug: "crc",
    src: "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=900&q=80&auto=format&fit=crop",
    alt: "CRC radiology suite",
    caption: "CRC's consultant-led imaging suite in Riyadh.",
  },
  {
    id: "crc-2",
    brandSlug: "crc",
    src: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=900&q=80&auto=format&fit=crop",
    alt: "CRC consultation room",
    caption: "Quiet consultation rooms designed for sub-specialty case reviews.",
  },
  {
    id: "crc-3",
    brandSlug: "crc",
    src: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=900&q=80&auto=format&fit=crop",
    alt: "CRC medical equipment",
    caption: "Modality-rich centres covering MRI, CT, mammography, and DEXA.",
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
  { target: 74, suffix: "+", label: "Branches" },
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
        className="relative overflow-hidden py-10 md:py-14"
        style={{ backgroundColor: "var(--rl-light-bg)" }}
      >
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
