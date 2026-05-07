"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, description, children }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-ink/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Dialog */}
      <div className="relative z-50 w-full max-w-lg p-8 bg-paper border border-ink shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-serif text-[32px] leading-[1.1] text-ink font-light tracking-[-0.02em]">{title}</h2>
            {description && (
              <p className="mt-2 text-[15px] text-ink-mute">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-ink-mute hover:text-ochre hover:bg-paper-warm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}
