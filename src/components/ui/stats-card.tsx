import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden group", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ochre">
            {title}
          </div>
          <div className="p-3 bg-paper-dim border border-rule group-hover:bg-paper-warm group-hover:border-ochre transition-colors">
            <Icon className="w-5 h-5 text-ink" />
          </div>
        </div>

        <div>
          <div className="font-serif text-[42px] leading-[1] font-light text-ink tracking-[-0.03em] mb-3">
            {value}
          </div>
          
          <div className="flex items-center gap-2">
            {trend && (
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 border",
                  trend.value > 0
                    ? "text-moss bg-moss/5 border-moss/20"
                    : "text-crimson bg-crimson/5 border-crimson/20"
                )}
              >
                {trend.value > 0 ? "+" : ""}
                {trend.value}%
              </span>
            )}
            {(description || trend) && (
              <span className="text-[13px] text-ink-mute">
                {description || trend?.label}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
