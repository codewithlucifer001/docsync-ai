import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { HUDNav } from "@/components/layout/HUDNav";
import { ClientProviders } from "./providers";

export const metadata: Metadata = {
  title: "DocSync AI | Design System Sandbox",
  description: "Autonomous code-to-docs engine design primitives and motion showcase."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="antialiased selection:bg-indigo-500 selection:text-white">
        <ClientProviders>
          <CustomCursor />
          <HUDNav />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
