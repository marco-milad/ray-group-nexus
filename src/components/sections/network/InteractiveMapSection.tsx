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

const POPUP_STYLES = `
  .rl-popup .maplibregl-popup-content {
    padding: 0;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10);
    border: 1px solid rgba(0,0,0,0.07);
    min-width: 220px;
    max-width: 272px;
    font-family: inherit;
  }
  .rl-popup .maplibregl-popup-close-button {
    font-size: 18px;
    color: #9ca3af;
    padding: 6px 10px;
    line-height: 1;
    top: 4px;
    right: 4px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 10;
    position: absolute;
  }
  .rl-popup .maplibregl-popup-close-button:hover { color: #374151; }
  .rl-popup .maplibregl-popup-tip { border-top-color: #fff; }
`;

function injectPopupStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("rl-popup-styles")) return;
  const style = document.createElement("style");
  style.id = "rl-popup-styles";
  style.textContent = POPUP_STYLES;
  document.head.appendChild(style);
}

function buildPopupHTML(
  brandName: string,
  color: string,
  name: string,
  city: string,
  address: string,
  mapsUrl: string,
): string {
  const hasValidUrl = Boolean(mapsUrl && mapsUrl.length > 10);

  const addressRow = address
    ? `<div style="display:flex;gap:6px;align-items:flex-start;margin-bottom:14px;">
        <span style="margin-top:1px;flex-shrink:0;font-size:12px;color:#9ca3af;">📍</span>
        <span style="font-size:12px;color:#6b7280;line-height:1.5;">${escapeHtml(address)}</span>
       </div>`
    : `<div style="margin-bottom:14px;"></div>`;

  const mapsButton = hasValidUrl
    ? `<a href="${escapeAttr(mapsUrl)}" target="_blank" rel="noopener noreferrer"
         style="display:block;width:100%;text-align:center;padding:9px 0;border-radius:8px;
                font-size:12px;font-weight:700;letter-spacing:0.03em;text-decoration:none;
                color:#fff;background:${color};"
         onmouseover="this.style.opacity='0.88'"
         onmouseout="this.style.opacity='1'">
         Get Directions →
       </a>`
    : `<div style="text-align:center;padding:8px 0;font-size:11px;color:#d1d5db;font-style:italic;">
         Maps link coming soon
       </div>`;

  return `
    <div>
      <div style="height:4px;background:${color};width:100%;"></div>
      <div style="padding:14px 16px 16px;">
        <div style="margin-bottom:8px;">
          <span style="display:inline-block;padding:2px 8px;border-radius:999px;
                       font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;
                       color:${color};background:${color}18;border:1px solid ${color}30;">
            ${escapeHtml(brandName)}
          </span>
        </div>
        <div style="font-size:15px;font-weight:700;color:#111827;line-height:1.3;margin-bottom:4px;">
          ${escapeHtml(name)}
        </div>
        <div style="font-size:12px;color:#9ca3af;font-weight:500;margin-bottom:10px;">
          ${escapeHtml(city)}
        </div>
        <div style="height:1px;background:#f3f4f6;margin-bottom:10px;"></div>
        ${addressRow}
        ${mapsButton}
      </div>
    </div>
  `;
}

export function InteractiveMapSection() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<MapLibreMap | null>(null);
  const markersRef = React.useRef<TaggedMarker[]>([]);
  const [activeBrand, setActiveBrand] = React.useState<string>("all");
  const [loaded, setLoaded] = React.useState(false);

  const tabs: FilterTab[] = React.useMemo(() => {
    const usedSlugs = new Set(branches.map((b) => b.brand));
    return [
      { slug: "all", name: "All", color: "var(--rl-green)" },
      ...brands
        .filter((b) => usedSlugs.has(b.slug))
        .map((b) => ({ slug: b.slug, name: b.name, color: b.color })),
    ];
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const node = containerRef.current;
    if (!node) return;

    injectPopupStyles();

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

      const popup = new maplibregl.Popup({
        offset: 18,
        closeButton: true,
        maxWidth: "280px",
        className: "rl-popup",
      }).setHTML(
        buildPopupHTML(brandName, color, branch.name, branch.city, branch.address, branch.mapsUrl),
      );

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

  React.useEffect(() => {
    const map = mapRef.current;

    // Show/hide markers
    markersRef.current.forEach(({ marker, brand }) => {
      const visible = activeBrand === "all" || brand === activeBrand;
      marker.getElement().style.display = visible ? "" : "none";
    });

    if (!map) return;

    // Zoom to fit visible markers, or reset to initial view for "all"
    if (activeBrand === "all") {
      map.flyTo({ center: INITIAL_CENTER, zoom: INITIAL_ZOOM, duration: 800 });
      return;
    }

    const visibleLngLats = markersRef.current
      .filter(({ brand }) => brand === activeBrand)
      .map(({ marker }) => marker.getLngLat());

    if (visibleLngLats.length === 0) return;

    if (visibleLngLats.length === 1) {
      map.flyTo({ center: visibleLngLats[0], zoom: 13, duration: 800 });
      return;
    }

    const bounds = visibleLngLats.reduce(
      (acc, lngLat) => acc.extend(lngLat),
      new maplibregl.LngLatBounds(visibleLngLats[0], visibleLngLats[0]),
    );

    map.fitBounds(bounds, { padding: 80, maxZoom: 13, duration: 800 });
  }, [activeBrand]);

  return (
    <SectionShell bg="bg-background">
      <SectionHeader eyebrow="Interactive Map" headline="Find a Branch Near You" />

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
