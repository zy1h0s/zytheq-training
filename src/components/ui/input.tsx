import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full bg-transparent px-0 py-[12px] text-[16px] text-ink border-b border-rule transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-ink placeholder:text-ink-faint focus-visible:outline-none focus-visible:border-ink disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
