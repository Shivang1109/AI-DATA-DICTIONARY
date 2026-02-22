"use client";

import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="pl-64">
        <Navbar />
        <main className="pt-24 p-8 min-h-screen">
          {children}
        </main>
      </div>
    </>
  );
}
