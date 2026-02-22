import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { ToastProvider } from "@/components/providers/ToastProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Data Dictionary | Schema Intelligence Platform",
  description: "Automated data dictionary and schema intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} text-slate-900 min-h-screen antialiased`}>
        <Sidebar />
        <div className="pl-64">
          <Navbar />
          <main className="pt-20 p-8 min-h-screen">
            {children}
          </main>
        </div>
        <ToastProvider />
      </body>
    </html>
  );
}
