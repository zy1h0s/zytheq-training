"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: "trainer" | "candidate";
}

export function DashboardLayout({ children, role = "trainer" }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-paper">
      <Sidebar role={role} />
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        <Header />
        <main className="flex-1 overflow-y-auto bg-transparent p-8 lg:p-12">
          <div className="mx-auto max-w-[1280px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
