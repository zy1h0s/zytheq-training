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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          ref={ref}
          type="text"
          value={value}
          className={cn(
            'w-full pl-11 pr-11 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 backdrop-blur-sm transition-all duration-300 hover:border-white/20',
            'focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30',
            className
          )}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
