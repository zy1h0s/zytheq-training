import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  label?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    const inputEl = (
      <input
        id={id}
        type={type}
        className={cn(
          "flex w-full bg-transparent px-0 py-[12px] text-[16px] text-ink border-b border-rule transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-ink placeholder:text-ink-faint focus-visible:outline-none focus-visible:border-ink disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
    if (label) {
      return (
        <div className="space-y-1.5">
          <label
            htmlFor={id}
            className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-mute"
          >
            {label}
          </label>
          {inputEl}
        </div>
      )
    }
    return inputEl
  }
)
Input.displayName = "Input"

export { Input }
