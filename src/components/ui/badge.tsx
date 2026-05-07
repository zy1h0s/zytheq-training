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
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
