"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-rule bg-paper/95 px-8 backdrop-blur-md">
      <div className="flex flex-1 items-center gap-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <Input
            type="search"
            placeholder="Search candidates, courses..."
            className="pl-8 border-transparent focus-visible:border-rule"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="relative text-ink-mute hover:text-ink">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-ochre" />
        </Button>
        <div className="flex items-center gap-4 border-l border-rule pl-6">
          <div className="flex h-10 w-10 items-center justify-center bg-ink text-paper font-mono text-[12px]">
            JD
          </div>
          <div className="hidden flex-col md:flex">
            <span className="text-[14px] font-medium text-ink">John Doe</span>
            <span className="font-mono text-[10px] text-ink-mute uppercase tracking-[0.1em]">Senior Trainer</span>
          </div>
        </div>
      </div>
    </header>
  );
}
