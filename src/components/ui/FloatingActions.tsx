import * as React from "react";
import { Linkedin, Twitter, Facebook, Instagram, ChevronUp, type LucideIcon } from "lucide-react";

type Social = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

const socials: ReadonlyArray<Social> = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ray-lab",
    Icon: Linkedin,
  },
  {
    label: "X",
    href: "https://x.com/raylabgroup",
    Icon: Twitter,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/raylabgroup",
    Icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/raylabgroup",
    Icon: Instagram,
  },
];

const iconStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "28px",
  height: "28px",
  borderRadius: "8px",
  color: "rgba(255,255,255,0.45)",
  textDecoration: "none",
  transition: "color 0.2s ease, background-color 0.2s ease",
  cursor: "pointer",
  background: "transparent",
  border: "none",
};

export function FloatingActions() {
  const [showScrollUp, setShowScrollUp] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowScrollUp(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      className="hidden sm:flex"
      style={{
        position: "fixed",
        right: "1.25rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Top line */}
      <div
        style={{
          width: "2px",
          height: "48px",
          background: "linear-gradient(to bottom, transparent, #4F9907)",
        }}
      />

      {/* Pill */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          padding: "12px 0",
          backgroundColor: "var(--rl-eerie)",
          borderRadius: "24px",
          width: "40px",
        }}
      >
        {socials.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            style={iconStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--rl-green)";
              e.currentTarget.style.backgroundColor = "rgba(79,153,7,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.45)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Icon size={14} strokeWidth={2} />
          </a>
        ))}

        {/* Divider */}
        <div
          style={{
            width: "20px",
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.1)",
            margin: "2px 0",
          }}
        />

        {/* Scroll to top */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            ...iconStyle,
            backgroundColor: showScrollUp ? "var(--rl-green)" : "transparent",
            color: showScrollUp ? "white" : "rgba(255,255,255,0.45)",
            opacity: showScrollUp ? 1 : 0.3,
            transform: showScrollUp ? "translateY(0)" : "translateY(4px)",
            transition: "all 0.3s ease",
            cursor: showScrollUp ? "pointer" : "default",
          }}
        >
          <ChevronUp size={13} strokeWidth={2.5} />
        </button>
      </div>

      {/* Bottom line */}
      <div
        style={{
          width: "2px",
          height: "48px",
          background: "linear-gradient(to top, transparent, #4F9907)",
        }}
      />
    </div>
  );
}
