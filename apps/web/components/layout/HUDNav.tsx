"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Terminal, Activity, FileText, Sun, Moon, LogIn, LogOut, Github } from "lucide-react";
import { DocSyncLogo } from "@/components/ui/DocSyncLogo";

export function HUDNav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("docsync_theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (t: "dark" | "light") => {
    const root = document.documentElement;
    if (t === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      root.setAttribute("data-theme", "light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("docsync_theme", nextTheme);
    applyTheme(nextTheme);
  };

  const links = [
    { href: "/dashboard", label: "Telemetry", icon: Activity },
    { href: "/docs-viewer", label: "Docs Preview", icon: FileText },
    { href: "/dev/design-system", label: "Primitives", icon: Terminal }
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
      <nav className="flex items-center justify-between px-6 py-3 rounded-full border border-[var(--border-glow)] bg-[var(--bg-surface)]/80 backdrop-blur-xl shadow-2xl transition-colors">
        <Link href="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
          <DocSyncLogo size={26} showText={true} />
        </Link>

        <div className="flex items-center gap-2">
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
                      ? "bg-[var(--accent-primary)] text-white shadow-md shadow-indigo-500/20"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="h-4 w-[1px] bg-[var(--border-subtle)] mx-1" />

          {status === "authenticated" && session?.user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="h-5 w-5 rounded-full border border-[var(--accent-primary)]"
                  />
                ) : (
                  <Github className="h-4 w-4 text-[var(--accent-primary)]" />
                )}
                <span className="text-xs font-mono font-medium text-[var(--text-primary)] max-w-[100px] truncate hidden md:inline">
                  {session.user.name || "GitHub User"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => signOut()}
                aria-label="Sign out"
                title="Sign out"
                className="p-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-rose-400 hover:text-rose-300 hover:border-rose-500/40 transition-all cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => signIn("github")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--accent-primary)] text-white text-xs font-mono font-semibold hover:bg-indigo-500 transition-all shadow-md shadow-indigo-500/20 active:scale-95 cursor-pointer"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all cursor-pointer shadow-sm active:scale-90"
          >
            {mounted && theme === "light" ? (
              <Moon className="h-4 w-4 text-indigo-500" />
            ) : (
              <Sun className="h-4 w-4 text-amber-400" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}