import * as React from "react";

const LOGO_URL =
  "https://res.cloudinary.com/dcui0elwh/image/upload/q_auto/f_auto/v1776482763/Ray_Lab_dual_logo_1_pshzij.svg";

const BRAND_TEXT = "RAYLAB GROUP";
const TAGLINE_WORDS = ["Diagnostic", "Intelligence.", "Delivered", "at", "Scale."];

type Phase = "typing" | "tagline" | "swap" | "logo" | "exit";

export function Preloader({ onComplete, skip = false }: { onComplete: () => void; skip?: boolean }) {
  const [phase, setPhase] = React.useState<Phase>("typing");
  const [visibleChars, setVisibleChars] = React.useState(0);
  const [visibleWords, setVisibleWords] = React.useState(0);

  React.useEffect(() => {
    if (skip) {
      onComplete();
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1 — type brand name char by char
    BRAND_TEXT.split("").forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleChars(i + 1), 100 + i * 60));
    });

    // Phase 2 — tagline words
    const taglineStart = 100 + BRAND_TEXT.length * 60 + 300;
    timers.push(setTimeout(() => setPhase("tagline"), taglineStart));
    TAGLINE_WORDS.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleWords(i + 1), taglineStart + 100 + i * 220));
    });

    // Phase 3 — swap (text fades out)
    const swapStart = taglineStart + 100 + TAGLINE_WORDS.length * 220 + 400;
    timers.push(setTimeout(() => setPhase("swap"), swapStart));

    // Phase 4 — logo fades in
    timers.push(setTimeout(() => setPhase("logo"), swapStart + 500));

    // Phase 5 — exit
    timers.push(setTimeout(() => setPhase("exit"), swapStart + 1600));

    // Phase 6 — unmount
    timers.push(setTimeout(() => onComplete(), swapStart + 2200));

    return () => timers.forEach(clearTimeout);
  }, [onComplete, skip]);

  if (skip) return null;

  const textVisible = phase === "typing" || phase === "tagline";
  const logoVisible = phase === "logo" || phase === "exit";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "var(--rl-eerie)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        opacity: phase === "exit" ? 0 : 1,
        transition: phase === "exit" ? "opacity 0.6s ease" : "none",
        pointerEvents: phase === "exit" ? "none" : "auto",
      }}
    >
      {/* Text layer — brand name + tagline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          opacity: textVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
          position: "absolute",
        }}
      >
        {/* Brand name — typewriter */}
        <div
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "2.5rem",
            fontWeight: 900,
            letterSpacing: "0.15em",
            display: "flex",
            alignItems: "center",
            minHeight: "3rem",
          }}
        >
          {BRAND_TEXT.split("").map((char, i) => (
            <span
              key={i}
              style={{
                opacity: visibleChars > i ? 1 : 0,
                transition: "opacity 0.1s ease",
                color: i < 3 ? "var(--rl-green)" : "white",
                whiteSpace: "pre",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          {/* Cursor */}
          {visibleChars < BRAND_TEXT.length && (
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "2.2rem",
                backgroundColor: "var(--rl-green)",
                marginLeft: "2px",
                animation: "blink 0.7s steps(1) infinite",
              }}
            />
          )}
        </div>

        {/* Divider */}
        <div
          style={{
            width: phase === "tagline" ? "160px" : "0px",
            height: "1px",
            backgroundColor: "var(--rl-green)",
            transition: "width 0.4s ease",
            opacity: 0.6,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "0 1rem",
          }}
        >
          {TAGLINE_WORDS.map((word, i) => (
            <span
              key={i}
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "1rem",
                fontWeight: 500,
                color: i >= 2 ? "var(--rl-green)" : "rgba(255,255,255,0.75)",
                opacity: visibleWords > i ? 1 : 0,
                transform: visibleWords > i ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                letterSpacing: "0.02em",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Logo layer */}
      <div
        style={{
          position: "absolute",
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <img
          src={LOGO_URL}
          alt="Ray Lab Group"
          style={{ height: "56px", width: "auto", objectFit: "contain" }}
        />
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}
