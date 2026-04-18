import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  note?: string;
  className?: string;
  accent?: string;
}

export function StatCard({ value, label, note, className, accent }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div
        className="text-3xl md:text-4xl font-bold tracking-tight"
        style={accent ? { color: accent } : { color: "var(--rl-green)" }}
      >
        {value}
      </div>
      <div className="mt-2 text-sm font-medium text-foreground">{label}</div>
      {note && <div className="mt-1 text-xs text-muted-foreground">{note}</div>}
    </div>
  );
}
