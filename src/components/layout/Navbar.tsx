import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { globalCopy } from "@/data/en/global";
import { brands } from "@/data/en/brands";
import { cn } from "@/lib/utils";

const links = globalCopy.nav.links;

const primaryLinks: ReadonlyArray<{ to: "/about" | "/services" | "/network" | "/investors" | "/contact"; label: string }> = [
  { to: "/about", label: links.about },
  { to: "/services", label: links.services },
  { to: "/network", label: links.network },
  { to: "/investors", label: links.investors },
  { to: "/contact", label: links.contact },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all",
        scrolled
          ? "border-border/60 bg-background/80 backdrop-blur-md"
          : "border-transparent bg-background/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold text-white"
            style={{ backgroundColor: "var(--rl-green)" }}
            aria-hidden
          >
            R
          </span>
          <span className="text-base font-semibold tracking-tight">
            {globalCopy.brand.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground">
                {links.platforms}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>
                {globalCopy.nav.platformsDropdownLabel}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/platforms" className="cursor-pointer">
                  All Platforms
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {brands.map((b) => (
                <DropdownMenuItem key={b.id} asChild>
                  <Link
                    to="/platforms/$slug"
                    params={{ slug: b.slug }}
                    className="cursor-pointer"
                  >
                    <span
                      className="mr-2 inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: b.color }}
                      aria-hidden
                    />
                    {b.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {primaryLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "text-foreground bg-accent" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Mobile trigger */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex"
            style={{
              backgroundColor: "var(--rl-green)",
              color: "white",
            }}
          >
            <Link to="/contact">{globalCopy.cta.contactUs}</Link>
          </Button>

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
                        className="h-1.5 w-1.5 rounded-full"
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
                  >
                    {l.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="mt-4"
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
