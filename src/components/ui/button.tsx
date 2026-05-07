import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap text-[14px] font-medium tracking-[0.02em] transition-all duration-300 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-paper hover:bg-ochre hover:-translate-y-[2px]",
        secondary:
          "bg-transparent text-ink border-b border-ink hover:text-ochre hover:border-ochre !p-0 pb-1 rounded-none",
        destructive:
          "bg-crimson text-paper hover:-translate-y-[2px] hover:shadow-strong",
        outline:
          "border border-rule bg-transparent hover:border-ink hover:-translate-y-[1px]",
        ghost: "hover:bg-paper-warm text-ink-soft hover:text-ink",
        link: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        default: "px-[28px] py-[16px]",
        sm: "px-4 py-2 text-xs",
        lg: "px-[32px] py-[18px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
