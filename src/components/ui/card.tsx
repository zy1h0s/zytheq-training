import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border border-rule bg-paper text-ink transition-colors duration-400 ease-out hover:bg-paper-warm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, description, action, children, ...props }, ref) => {
    if (title || description || action) {
      return (
        <div
          ref={ref}
          className={cn("flex items-start justify-between gap-4 p-6", className)}
          {...props}
        >
          <div className="flex flex-col space-y-1.5 min-w-0">
            {title && (
              <h3 className="font-serif font-medium text-[22px] leading-[1.2] tracking-[-0.01em]">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-[14px] leading-[1.6] text-ink-mute">{description}</p>
            )}
            {children}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )
    }
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-serif font-medium text-[22px] leading-[1.2] tracking-[-0.01em]",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[14px] leading-[1.6] text-ink-mute", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0 border-t border-rule mt-auto font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
