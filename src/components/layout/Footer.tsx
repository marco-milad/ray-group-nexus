import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { globalCopy } from "@/data/en/global";
import { brands } from "@/data/en/brands";
import { BrandChip } from "@/components/ui/brand-chip";

export function Footer() {
  return (
    <footer
      className="mt-12 border-t border-white/10 text-white"
      style={{ backgroundColor: "var(--rl-eerie)" }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold text-white"
                style={{ backgroundColor: "var(--rl-green)" }}
                aria-hidden
              >
                R
              </span>
              <span className="text-lg font-semibold tracking-tight">
                {globalCopy.brand.name}
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-white/70 leading-relaxed">
              {globalCopy.footer.tagline}
            </p>
            <p className="mt-3 text-xs text-white/50">{globalCopy.brand.hq}</p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              {globalCopy.footer.quickLinks}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-white/80 hover:text-white">
                  {globalCopy.nav.links.about}
                </Link>
              </li>
              <li>
                <Link to="/platforms" className="text-white/80 hover:text-white">
                  {globalCopy.nav.links.platforms}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-white">
                  {globalCopy.nav.links.services}
                </Link>
              </li>
              <li>
                <Link to="/network" className="text-white/80 hover:text-white">
                  {globalCopy.nav.links.network}
                </Link>
              </li>
              <li>
                <Link to="/investors" className="text-white/80 hover:text-white">
                  {globalCopy.nav.links.investors}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white">
                  {globalCopy.nav.links.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms + Social */}
          <div className="md:col-span-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              {globalCopy.footer.ourPlatforms}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {brands.map((b) => (
                <BrandChip
                  key={b.id}
                  name={b.name}
                  color={b.color}
                  className="border-white/15 bg-white/5 text-white/85"
                />
              ))}
            </div>

            <div className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              {globalCopy.footer.followUs}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@raylabgroup.com"
                aria-label="Email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          {globalCopy.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
