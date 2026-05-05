import * as React from "react";
import { cn } from "@/lib/utils";

const useIsoLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Reveal — IntersectionObserver-driven scroll fade-in.
 * Respects prefers-reduced-motion. Triggers once, then stays visible.
 * Content is visible by default before hydration to avoid no-JS issues.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  useIsoLayoutEffect(() => {
    setHydrated(true);
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      className={cn("will-change-transform", className)}
      style={{
        opacity: !hydrated || visible ? 1 : 0,
        transform: !hydrated || visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${delay}ms`,
        transition: hydrated ? "opacity 1.2s ease-out, transform 1.2s ease-out" : "none",
      }}
    >
      {children}
    </Component>
  );
}
