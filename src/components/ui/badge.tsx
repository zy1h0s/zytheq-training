import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] uppercase font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-ink text-paper hover:bg-ink-soft",
        secondary:
          "border-transparent bg-paper-dim text-ink hover:bg-rule-soft",
        destructive:
          "border-transparent bg-crimson/10 text-crimson hover:bg-crimson/20",
        outline: "border-rule text-ink",
        ochre: "border-ochre bg-ochre-faint text-ochre",
        success:
          "border-moss/30 bg-moss/10 text-moss",
        danger:
          "border-crimson/30 bg-crimson/10 text-crimson",
        warning:
          "border-ochre/30 bg-ochre/10 text-ochre",
        info:
          "border-rule bg-paper-dim text-ink-mute",
      },
      size: {
        default: "px-2 py-0.5 text-[10px]",
        sm: "px-1.5 py-0 text-[9px]",
        lg: "px-3 py-1 text-[11px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
