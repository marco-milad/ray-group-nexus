import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { PageWrapper } from "./PageWrapper";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  /** Background utility, e.g. "bg-background" or inline style class */
  bg?: string;
  /** Disable max-width container (for full-bleed sections) */
  fullBleed?: boolean;
  id?: string;
  size?: "sm" | "md" | "lg";
}

export function Section({
  children,
  className,
  bg,
  fullBleed = false,
  id,
  size = "md",
}: SectionProps) {
  const padding =
    size === "sm" ? "py-12 md:py-16" : size === "lg" ? "py-20 md:py-32" : "py-16 md:py-24";

  return (
    <section id={id} className={cn(padding, bg, className)}>
      <Reveal>{fullBleed ? children : <PageWrapper>{children}</PageWrapper>}</Reveal>
    </section>
  );
}
