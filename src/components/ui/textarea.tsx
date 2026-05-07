import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: React.ReactNode
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    const textareaEl = (
      <textarea
        id={id}
        className={cn(
          "flex min-h-[80px] w-full bg-transparent px-0 py-[14px] text-[16px] text-ink border-b border-rule transition-colors placeholder:text-ink-faint focus-visible:outline-none focus-visible:border-ink disabled:cursor-not-allowed disabled:opacity-50 resize-y",
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
          {textareaEl}
        </div>
      )
    }
    return textareaEl
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
