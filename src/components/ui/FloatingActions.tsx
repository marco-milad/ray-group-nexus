import * as React from "react";

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/ray-lab-groupgi",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/raylabgroup",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/raylabgroup",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@raylabgroup",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
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
        {socials.map(({ label, href, icon }) => (
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
            {icon}
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
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
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
