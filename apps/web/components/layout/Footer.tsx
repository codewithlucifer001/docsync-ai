"use client";

import React from "react";
import Link from "next/link";
import { Terminal, ShieldCheck, Activity, ArrowUpRight, Cpu } from "lucide-react";
import { DocSyncLogo } from "@/components/ui/DocSyncLogo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 backdrop-blur-md pt-14 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block hover:opacity-85 transition-opacity">
              <DocSyncLogo size={28} showText={true} />
            </Link>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Autonomous AST-driven CI/CD documentation engine. Zero runtime code execution, deterministic Tree-sitter parsing, and multi-agent LangGraph pipelines.
            </p>
            <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-[var(--accent-success)]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Parser Engine: v2.4 Online (Port 8000)</span>
            </div>
          </div>

          {/* Core Telemetry */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-[var(--text-primary)] font-bold tracking-wider uppercase text-[11px]">Telemetry & Engine</h4>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li><Link href="/dashboard" className="hover:text-[var(--accent-primary)] flex items-center gap-1">Workspace Telemetry <ArrowUpRight className="h-3 w-3" /></Link></li>
              <li><Link href="/docs-viewer" className="hover:text-[var(--accent-primary)] flex items-center gap-1">AST Docs Portal <ArrowUpRight className="h-3 w-3" /></Link></li>
              <li><Link href="/dev/design-system" className="hover:text-[var(--accent-primary)] flex items-center gap-1">Primitives Sandbox <ArrowUpRight className="h-3 w-3" /></Link></li>
              <li><a href="http://127.0.0.1:8000/docs" target="_blank" rel="noreferrer" className="hover:text-[var(--accent-primary)] flex items-center gap-1">FastAPI Swagger <ArrowUpRight className="h-3 w-3" /></a></li>
            </ul>
          </div>

          {/* Architecture Modules */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-[var(--text-primary)] font-bold tracking-wider uppercase text-[11px]">Architecture Stack</h4>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-center gap-1.5"><Cpu className="h-3 w-3 text-[var(--accent-cyan)]" /> Tree-sitter AST Parsers</li>
              <li className="flex items-center gap-1.5"><Terminal className="h-3 w-3 text-indigo-400" /> LangGraph Multi-Agent</li>
              <li className="flex items-center gap-1.5"><Activity className="h-3 w-3 text-amber-400" /> CI/CD GitHub Action</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-emerald-400" /> Pre-Merge Drift Guard</li>
            </ul>
          </div>

          {/* Deployment Target */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-[var(--text-primary)] font-bold tracking-wider uppercase text-[11px]">Deployment Target</h4>
            <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span>Target</span>
                <span className="text-[var(--accent-cyan)] font-bold">Vercel / S3</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span>Sync Cadence</span>
                <span className="text-[var(--text-primary)]">On git push</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span>OpenAPI Version</span>
                <span className="text-emerald-400">3.1.0 JSON/YAML</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-[var(--border-subtle)] pt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)]">
          <p>© 2026 DocSync AI Inc. All systems nominal.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" /> AST Drift Free
            </span>
            <span>TypeScript 5.0 + Python 3.13</span>
          </div>
        </div>
      </div>
    </footer>
  );
}