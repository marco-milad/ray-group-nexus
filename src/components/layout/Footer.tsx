import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Facebook, Youtube, Mail } from "lucide-react";
import { globalCopy } from "@/data/en/global";
import { brands } from "@/data/en/brands";
import { BrandChip } from "@/components/ui/brand-chip";
import * as React from "react";

const LOGO_URL =
  "https://res.cloudinary.com/dcui0elwh/image/upload/q_auto/f_auto/v1776657151/svg_final_fwh3x1.svg";

const footerStats = [
  { value: "74+", label: "Branches" },
  { value: "3", label: "Markets" },
  { value: "1.6M+", label: "Annual Exams" },
  { value: "2019", label: "Est." },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/ray-lab-group" },
  { icon: Twitter, label: "X", href: "https://x.com/raylabgroup" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/raylabgroup" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@raylabgroup" },
];

export function Footer() {
  const [logoError, setLogoError] = React.useState(false);

  return (
    <footer
      className="border-t border-white/10 text-white"
      style={{ backgroundColor: "var(--rl-eerie)" }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid gap-12 py-16 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Logo */}
            <Link to="/" className="inline-block">
              {logoError ? (
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold text-white"
                    style={{ backgroundColor: "var(--rl-green)" }}
                  >
                    R
                  </span>
                  <span className="text-lg font-semibold">{globalCopy.brand.name}</span>
                </div>
              ) : (
                <img
                  src={LOGO_URL}
                  alt={globalCopy.brand.name}
                  width={180}
                  height={48}
                  className="h-9 w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              )}
            </Link>

            {/* Tagline */}
            <p className="max-w-sm text-sm text-white/60 leading-relaxed">
              {globalCopy.footer.tagline}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              {footerStats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-lg font-bold" style={{ color: "var(--rl-green)" }}>
                    {s.value}
                  </span>
                  <span className="text-xs text-white/40 mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <a
                href="mailto:info@raylabgroup.com"
                aria-label="Email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          {/* end Brand block */}

          {/* Quick links */}
          <div className="md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-5">
              {globalCopy.footer.quickLinks}
            </div>
            <ul className="space-y-3 text-sm">
              {Object.entries(globalCopy.nav.links).map(([key, label]) => {
                const routeMap: Record<string, string> = {
                  about: "/about",
                  services: "/services",
                  network: "/network",
                  platforms: "/platforms",
                  investors: "/investors",
                  contact: "/contact",
                };
                return (
                  <li key={key}>
                    <Link
                      to={routeMap[key] || "/"}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Platforms */}
          <div className="md:col-span-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-5">
              {globalCopy.footer.ourPlatforms}
            </div>
            <div className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <Link key={b.id} to="/platforms/$slug" params={{ slug: b.slug }}>
                  <BrandChip
                    name={b.name}
                    color={b.color}
                    className="border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                  />
                </Link>
              ))}
            </div>

            {/* HQ info */}
            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                Headquarters
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                B2, Industry Street, Zone 5<br />
                Central Business District
                <br />
                Qormi CBD 5030, Malta
              </p>
              <div
                className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(79,153,7,0.15)",
                  color: "var(--rl-mantis)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: "var(--rl-green)" }}
                />
                EU Regulated · Malta
              </div>
            </div>
          </div>
        </div>
        {/* end Main grid */}

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">{globalCopy.footer.copyright}</p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span>Privacy Policy</span>
            <span className="h-3 w-px bg-white/20" />
            <span>Terms of Use</span>
            <span className="h-3 w-px bg-white/20" />
            <span className="font-semibold" style={{ color: "var(--rl-green)" }}>
              Ray Lab Group
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
