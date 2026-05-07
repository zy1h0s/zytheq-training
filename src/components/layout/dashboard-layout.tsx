"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: "admin" | "trainer" | "crm" | "candidate" | "other";
  userName?: string;
  onLogout?: () => void;
}

export function DashboardLayout({
  children,
  role = "trainer",
  userName,
  onLogout,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-paper">
      <Sidebar role={role} userName={userName} onLogout={onLogout} />
      <div className="flex flex-1 flex-col overflow-hidden relative z-10 ml-64">
        <Header userName={userName} role={role} />
        <main className="flex-1 overflow-y-auto bg-transparent p-8 lg:p-12">
          <div className="mx-auto max-w-[1280px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
