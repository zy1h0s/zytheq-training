/*
 * Search Input Component
 * Input with search icon and clear button
 */

'use client';

import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { InputHTMLAttributes, forwardRef } from 'react';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-mute" />
        <input
          ref={ref}
          type="text"
          value={value}
          className={cn(
            'w-full pl-11 pr-11 py-3 bg-paper-warm/40 border border-rule rounded-xl text-ink placeholder:text-ink-faint transition-all duration-300 hover:border-ink-faint',
            'focus:outline-none focus:ring-1 focus:ring-ink/20 focus:border-ink',
            className
          )}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-mute hover:text-ink"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
