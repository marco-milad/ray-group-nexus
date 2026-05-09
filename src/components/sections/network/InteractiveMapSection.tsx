import * as React from "react";
import maplibregl, { Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/ui/section-header";
import { branches } from "@/data/en/branches";
import { brands } from "@/data/en/brands";

const MAPTILER_KEY = "EQq4HHajPXXFld2vJJvW";
const MAP_STYLE = `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`;
const INITIAL_CENTER: [number, number] = [32.5, 29.5];
const INITIAL_ZOOM = 5;

type FilterTab = { slug: string; name: string; color: string };
type TaggedMarker = { marker: Marker; brand: string };

export function InteractiveMapSection() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<MapLibreMap | null>(null);
  const markersRef = React.useRef<TaggedMarker[]>([]);
  const [activeBrand, setActiveBrand] = React.useState<string>("all");
  const [loaded, setLoaded] = React.useState(false);

  // Filter tabs — only brands that actually have entries in `branches`
  const tabs: FilterTab[] = React.useMemo(() => {
    const usedSlugs = new Set(branches.map((b) => b.brand));
    return [
      { slug: "all", name: "All", color: "var(--rl-green)" },
      ...brands
        .filter((b) => usedSlugs.has(b.slug))
        .map((b) => ({ slug: b.slug, name: b.name, color: b.color })),
    ];
  }, []);

  // Initialise map + markers once on mount
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const node = containerRef.current;
    if (!node) return;

    const map = new maplibregl.Map({
      container: node,
      style: MAP_STYLE,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      attributionControl: { compact: true },
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    const onLoad = () => setLoaded(true);
    map.on("load", onLoad);

    const brandBySlug = new Map(brands.map((b) => [b.slug, b]));

    branches.forEach((branch) => {
      const brand = brandBySlug.get(branch.brand);
      const color = brand?.color ?? "var(--rl-green)";
      const brandName = brand?.name ?? branch.brand;

      const el = document.createElement("div");
      el.style.width = "16px";
      el.style.height = "16px";
      el.style.borderRadius = "9999px";
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.35)";
      el.style.backgroundColor = color;
      el.style.cursor = "pointer";
      el.setAttribute("aria-label", `${brandName} — ${branch.name}`);

      const popupHTML = `
        <div style="font-family: inherit; max-width: 240px;">
          <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: ${color}; margin-bottom: 4px;">
            ${escapeHtml(brandName)}
          </div>
          <div style="font-size: 13px; font-weight: 600; line-height: 1.3; margin-bottom: 4px; color: #1a1a1a;">
            ${escapeHtml(branch.name)}
          </div>
          <div style="font-size: 11px; color: #737373; margin-bottom: 2px;">
            ${escapeHtml(branch.city)}
          </div>
          <div style="font-size: 11px; color: #737373; margin-bottom: 10px; line-height: 1.4;">
            ${escapeHtml(branch.address)}
          </div>
          <a href="${escapeAttr(branch.mapsUrl)}" target="_blank" rel="noopener noreferrer"
             style="display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: ${color}; text-decoration: none;">
            Open in Maps →
          </a>
        </div>
      `;

      const popup = new maplibregl.Popup({
        offset: 18,
        closeButton: true,
        maxWidth: "280px",
      }).setHTML(popupHTML);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([branch.lng, branch.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push({ marker, brand: branch.brand });
    });

    return () => {
      map.off("load", onLoad);
      markersRef.current.forEach(({ marker }) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Apply filter without recreating markers
  React.useEffect(() => {
    markersRef.current.forEach(({ marker, brand }) => {
      const visible = activeBrand === "all" || brand === activeBrand;
      marker.getElement().style.display = visible ? "" : "none";
    });
  }, [activeBrand]);

  return (
    <SectionShell bg="bg-background">
      <SectionHeader eyebrow="Interactive Map" headline="Find a Branch Near You" />

      {/* Filter tabs */}
      <div className="mt-8 mb-6 flex flex-wrap items-center justify-center gap-2">
        {tabs.map((t) => {
          const isActive = activeBrand === t.slug;
          return (
            <button
              key={t.slug}
              type="button"
              onClick={() => setActiveBrand(t.slug)}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: isActive ? t.color : "transparent",
                color: isActive ? "white" : "var(--rl-muted)",
                boxShadow: isActive ? `0 2px 8px ${t.color}55` : "none",
                fontWeight: isActive ? 700 : 600,
                transform: isActive ? "scale(1.03)" : "scale(1)",
                border: isActive ? "1px solid transparent" : "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = `${t.color}14`;
                  e.currentTarget.style.color = t.color;
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

      {/* Map container */}
      <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-sm">
        <div ref={containerRef} className="h-[350px] md:h-[500px] w-full" aria-label="Branch map" />
        {!loaded && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "var(--rl-light-bg)" }}
            aria-hidden
          >
            <div className="flex flex-col items-center gap-3">
              <div
                className="h-8 w-8 rounded-full border-2 animate-spin"
                style={{
                  borderColor: "rgba(79,153,7,0.2)",
                  borderTopColor: "var(--rl-green)",
                }}
              />
              <div className="text-sm text-muted-foreground">Loading map…</div>
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  );
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return c;
    }
  });
}

function escapeAttr(s: string): string {
  return escapeHtml(s);
}
