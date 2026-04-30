import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { globalCopy } from "@/data/en/global";
import { brands } from "@/data/en/brands";
import { cn } from "@/lib/utils";

const links = globalCopy.nav.links;

const primaryLinks: ReadonlyArray<{
  to: "/about" | "/services" | "/network" | "/investors";
  label: string;
}> = [
  { to: "/about", label: links.about },
  { to: "/services", label: links.services },
  { to: "/network", label: links.network },
  { to: "/investors", label: links.investors },
];

const LOGO_URL =
  "https://res.cloudinary.com/dcui0elwh/image/upload/q_auto/f_auto/v1776482775/Ray_Lab_dual_logo_klipdn.svg";

function NavLink({
  to,
  label,
}: {
  to: "/about" | "/services" | "/network" | "/investors";
  label: string;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Link
      to={to}
      className="relative rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
      style={{
        color: hovered ? "var(--rl-green)" : "var(--rl-eerie)",
        backgroundColor: hovered ? "rgba(79,153,7,0.08)" : "transparent",
        opacity: hovered ? 1 : 0.75,
      }}
      activeProps={{
        className: "relative rounded-md px-3 py-2 text-sm font-medium",
        style: {
          color: "var(--rl-green)",
          opacity: 1,
          borderBottom: "2px solid var(--rl-green)",
          borderRadius: "0",
          paddingBottom: "6px",
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [logoError, setLogoError] = React.useState(false);
  const [platformHov, setPlatformHov] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/95 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-background/60 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          {logoError ? (
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold text-white"
                style={{ backgroundColor: "var(--rl-green)" }}
              >
                R
              </span>
              <span className="text-base font-semibold tracking-tight">
                {globalCopy.brand.name}
              </span>
            </div>
          ) : (
            <img
              src={LOGO_URL}
              alt={globalCopy.brand.name}
              className="h-8 w-auto object-contain"
              onError={() => setLogoError(true)}
            />
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Platforms dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setPlatformHov(true)}
            onMouseLeave={() => setPlatformHov(false)}
          >
            <Link
              to="/platforms"
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{
                color: platformHov ? "var(--rl-green)" : "var(--rl-eerie)",
                backgroundColor: platformHov ? "rgba(79,153,7,0.08)" : "transparent",
                opacity: platformHov ? 1 : 0.75,
              }}
            >
              {links.platforms}
              <ChevronDown
                className="h-3.5 w-3.5 transition-transform duration-200"
                style={{ transform: platformHov ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </Link>

            {platformHov && (
              <div className="absolute left-0 top-full pt-1 z-50">
                <div className="w-64 rounded-md border border-border bg-background shadow-md">
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    {globalCopy.nav.platformsDropdownLabel}
                  </div>
                  <div className="h-px bg-border my-1" />
                  <Link
                    to="/platforms"
                    className="flex items-center px-2 py-1.5 text-sm rounded-md mx-1 hover:bg-accent"
                  >
                    All Platforms
                  </Link>
                  <div className="h-px bg-border my-1" />
                  {brands.map((b) => (
                    <Link
                      key={b.id}
                      to="/platforms/$slug"
                      params={{ slug: b.slug }}
                      className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md mx-1 mb-0.5 hover:bg-accent"
                    >
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: b.color }}
                      />
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary links */}
          {primaryLinks.map((l) => (
            <NavLink key={l.to} to={l.to} label={l.label} />
          ))}
        </nav>

        {/* CTA + Mobile trigger */}
        <div className="flex items-center gap-2">
          {/* Contact Us — desktop only */}
          <Button
            asChild
            size="sm"
            className="hidden lg:inline-flex rounded-md font-medium"
            style={{ backgroundColor: "var(--rl-green)", color: "white" }}
          >
            <Link to="/contact">{globalCopy.cta.contactUs}</Link>
          </Button>

          {/* Hamburger — mobile only */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label={globalCopy.nav.mobileMenuLabel}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto">
              <SheetTitle className="text-base">{globalCopy.brand.name}</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                >
                  Home
                </Link>
                <Link
                  to="/platforms"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                >
                  {links.platforms}
                </Link>
                <div className="pl-3 mt-1 mb-2 flex flex-col gap-0.5 border-l border-border/60">
                  {brands.map((b) => (
                    <Link
                      key={b.id}
                      to="/platforms/$slug"
                      params={{ slug: b.slug }}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: b.color }}
                      />
                      {b.name}
                    </Link>
                  ))}
                </div>
                {primaryLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                    activeProps={{
                      className:
                        "rounded-md px-3 py-2 text-sm font-medium text-foreground bg-accent border-l-2 border-[var(--rl-green)]",
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="mt-4 rounded-md"
                  style={{ backgroundColor: "var(--rl-green)", color: "white" }}
                >
                  <Link to="/contact" onClick={() => setMobileOpen(false)}>
                    {globalCopy.cta.contactUs}
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
