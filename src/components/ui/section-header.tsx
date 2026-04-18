import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  headlineAccent?: string;
  subheadline?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  headline,
  headlineAccent,
  subheadline,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <div
          className="text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: "var(--rl-green)" }}
        >
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
        {headline}
        {headlineAccent && (
          <>
            {" "}
            <span style={{ color: "var(--rl-green)" }}>{headlineAccent}</span>
          </>
        )}
      </h2>
      {subheadline && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          {subheadline}
        </p>
      )}
    </div>
  );
}
