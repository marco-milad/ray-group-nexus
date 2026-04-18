import { cn } from "@/lib/utils";

interface BrandChipProps {
  name: string;
  color: string;
  className?: string;
}

export function BrandChip({ name, color, className }: BrandChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium",
        className,
      )}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      {name}
    </span>
  );
}
