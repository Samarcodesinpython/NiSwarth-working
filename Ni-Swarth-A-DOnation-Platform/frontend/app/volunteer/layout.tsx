import React from "react";
import { Sidebar } from "@/app/volunteer/Sidebar";

export default function VolunteerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
    </div>
  );
} 