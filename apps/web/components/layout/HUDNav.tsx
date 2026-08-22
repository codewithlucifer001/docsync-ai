"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Terminal, Activity, FileText, Github, LogOut } from "lucide-react";
import { DocSyncLogo } from "@/components/ui/DocSyncLogo";

export function HUDNav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const links = [
    { href: "/dashboard", label: "Telemetry", icon: Activity },
    { href: "/docs-viewer", label: "Docs Preview", icon: FileText },
    { href: "/dev/design-system", label: "Primitives", icon: Terminal }
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
      <nav className="flex items-center justify-between px-6 py-3 rounded-full border border-gray-800 bg-gray-900/90 backdrop-blur-xl shadow-2xl">
        <Link href="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
          <DocSyncLogo size={26} showText={true} />
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium font-mono transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="h-4 w-[1px] bg-gray-800 mx-1 hidden sm:block" />

          {status === "authenticated" && session?.user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-gray-800 border border-gray-700">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt="User"
                    className="h-4 w-4 rounded-full border border-indigo-500"
                  />
                ) : (
                  <Github className="h-3.5 w-3.5 text-indigo-400" />
                )}
                <span className="text-xs font-mono font-medium text-gray-200 max-w-[100px] truncate hidden md:inline">
                  {session.user.name || "GitHub User"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => signOut()}
                className="p-1.5 rounded-full border border-gray-800 bg-gray-800 text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
                title="Sign out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => signIn("github")}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold transition-all shadow-md shadow-indigo-500/20 active:scale-95 cursor-pointer"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}