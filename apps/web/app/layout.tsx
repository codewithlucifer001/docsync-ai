import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { HUDNav } from "@/components/layout/HUDNav";
import { Providers } from "@/components/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "DocSync AI — Autonomous AST CI/CD Documentation Engine",
  description: "Eliminate stale docs with AST-driven Tree-sitter parsing and LangGraph multi-agent documentation synthesis."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-[#0b0f19] text-gray-100 antialiased selection:bg-indigo-500 selection:text-white">
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <HUDNav />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}