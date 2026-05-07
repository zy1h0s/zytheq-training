import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: React.ReactNode
  options: SelectOption[]
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, id, options, placeholder, onChange, ...props }, ref) => {
    const selectEl = (
      <div className="relative">
        <select
          id={id}
          ref={ref}
          onChange={onChange}
          className={cn(
            "flex w-full appearance-none bg-transparent px-0 py-[12px] pr-8 text-[16px] text-ink border-b border-rule transition-colors focus:outline-none focus:border-ink disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
      </div>
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
          {selectEl}
        </div>
      )
    }
    return selectEl
  }
)
Select.displayName = "Select"

export { Select }
