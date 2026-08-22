"use client";

import React, { useState } from "react";
import { KineticHeadline } from "@/components/motion/KineticHeadline";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";
import { MeshGradientBG } from "@/components/ui/MeshGradientBG";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCursorStore } from "@/hooks/useMagneticCursor";
import {
  GitPullRequest,
  Activity,
  ShieldCheck,
  Zap,
  Cpu,
  GitBranch,
  Sliders,
  Sparkles,
  RefreshCw,
  Layers,
  CheckCircle2,
  Terminal,
  MousePointer2
} from "lucide-react";

export default function DesignSystemSandbox() {
  const { setVariant, resetVariant } = useCursorStore();
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [lastClicked, setLastClicked] = useState<string>("None (Hover or click to test)");

  return (
    <main className="relative min-h-screen pt-28 pb-32 px-6 max-w-6xl mx-auto space-y-24">
      <MeshGradientBG />

      {/* Hero Header */}
      <section className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--accent-primary)]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          DocSync AI // Design Tokens & Primitives Workbench
        </div>
        <KineticHeadline
          text="Design Tokens, Motion Primitives & Theme Inspector"
          highlightWords={["Tokens,", "Motion", "Inspector"]}
          className="text-3xl sm:text-5xl"
        />
        <p className="text-[var(--text-secondary)] max-w-2xl text-sm sm:text-base">
          Isolated developer workbench. Hover or click the trigger buttons to test cursor physics, and use the state toggle below to test async loading states.
        </p>

        {/* Cursor Trigger Button Suite */}
        <div className="space-y-2 pt-2">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setLastClicked("Magnetic Snap activated")}
              onMouseEnter={() => setVariant("magnetic")}
              onMouseLeave={resetVariant}
              className="px-5 py-2.5 rounded-full bg-[var(--accent-primary)] text-white text-xs font-medium shadow-md transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <MousePointer2 className="h-3.5 w-3.5" /> Magnetic Snap
            </button>
            <button
              onClick={() => setLastClicked("Text Capsule activated")}
              onMouseEnter={() => setVariant("text", "PARSE")}
              onMouseLeave={resetVariant}
              className="px-5 py-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-medium hover:border-[var(--accent-cyan)] transition-colors cursor-pointer"
            >
              Hover: Text Cursor
            </button>
            <button
              onClick={() => setLastClicked("Cyan Glow activated")}
              onMouseEnter={() => setVariant("glow")}
              onMouseLeave={resetVariant}
              className="px-5 py-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-medium text-[var(--accent-cyan)] cursor-pointer"
            >
              Hover: Glow Target
            </button>
          </div>
          <div className="text-[11px] font-mono text-[var(--text-muted)]">
            Last Action: <span className="text-[var(--accent-cyan)]">{lastClicked}</span>
          </div>
        </div>
      </section>

      {/* Bento Grid Feature Tiles */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Feature Matrix // Bento Primitives
          </h2>
          <span className="text-xs font-mono text-[var(--accent-primary)]">4 Interactive Tiles</span>
        </div>

        <BentoGrid>
          <BentoTile size="2x1">
            <GlassPanel interactive glowOnHover className="h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-indigo-500/10 text-[var(--accent-primary)]">
                  <Activity className="h-5 w-5" />
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-[var(--accent-success)] border border-emerald-500/20">
                  99.4% Freshness
                </span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">Tree-sitter AST Diffing</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Extracts typed signatures, decorators, and route trees across TS/JS and Python without runtime code execution.
                </p>
              </div>
            </GlassPanel>
          </BentoTile>

          <BentoTile size="1x1">
            <GlassPanel interactive className="h-full flex flex-col justify-between">
              <span className="p-2 w-fit rounded-lg bg-cyan-500/10 text-[var(--accent-cyan)]">
                <Zap className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">LangGraph Agent</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Multi-step doc generation with validation feedback loops.</p>
              </div>
            </GlassPanel>
          </BentoTile>

          <BentoTile size="1x1">
            <GlassPanel className="h-full flex flex-col justify-between">
              <span className="p-2 w-fit rounded-lg bg-emerald-500/10 text-[var(--accent-success)]">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">CI/CD Guard</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Catches undocumented API shifts pre-merge.</p>
              </div>
            </GlassPanel>
          </BentoTile>

          <BentoTile size="2x1">
            <GlassPanel className="h-full flex flex-col justify-between">
              <span className="p-2 w-fit rounded-lg bg-amber-500/10 text-[var(--accent-warning)]">
                <GitPullRequest className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">Automated Pull Requests</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Generates clean Markdown docs and synced openapi.yaml specs straight into your branch or docs repo.
                </p>
              </div>
            </GlassPanel>
          </BentoTile>
        </BentoGrid>
      </section>

      {/* Async Shimmer & Skeleton States */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Async Shimmer & Skeleton States
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Click the button to switch between loading placeholders and resolved data.
            </p>
          </div>
          <button
            onClick={() => setIsLoadingState(!isLoadingState)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/10 text-xs font-mono text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoadingState ? "animate-spin" : ""}`} />
            <span>Switch to: {isLoadingState ? "Resolved Data View" : "Shimmer Loading View"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoadingState ? (
            <>
              {/* Skeleton Placeholder 1 */}
              <GlassPanel className="p-6 space-y-4 border-dashed border-indigo-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded-md bg-indigo-500/20" />
                    <Skeleton className="h-4 w-40 bg-indigo-500/20" />
                  </div>
                  <Skeleton className="h-5 w-20 rounded-full bg-indigo-500/20" />
                </div>
                <Skeleton className="h-3.5 w-5/6 bg-indigo-500/15" />
                <Skeleton className="h-3.5 w-2/3 bg-indigo-500/15" />
                <div className="flex items-center gap-3 pt-3 border-t border-[var(--border-subtle)]">
                  <Skeleton className="h-4 w-24 rounded bg-indigo-500/20" />
                  <Skeleton className="h-4 w-28 rounded bg-indigo-500/20" />
                </div>
              </GlassPanel>

              {/* Skeleton Placeholder 2 */}
              <GlassPanel className="p-6 space-y-4 border-dashed border-cyan-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded-md bg-cyan-500/20" />
                    <Skeleton className="h-4 w-48 bg-cyan-500/20" />
                  </div>
                  <Skeleton className="h-5 w-20 rounded-full bg-cyan-500/20" />
                </div>
                <Skeleton className="h-3.5 w-4/5 bg-cyan-500/15" />
                <Skeleton className="h-3.5 w-1/2 bg-cyan-500/15" />
                <div className="flex items-center gap-3 pt-3 border-t border-[var(--border-subtle)]">
                  <Skeleton className="h-4 w-24 rounded bg-cyan-500/20" />
                  <Skeleton className="h-4 w-28 rounded bg-cyan-500/20" />
                </div>
              </GlassPanel>
            </>
          ) : (
            <>
              {/* Resolved Data Card 1 */}
              <GlassPanel className="p-6 space-y-4 border-emerald-500/30 bg-emerald-950/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-[var(--accent-primary)]" />
                    <span className="font-mono text-sm font-semibold text-[var(--text-primary)]">
                      acme-corp/payment-service
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> 100% Synced
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Next.js 15 route handlers parsed with automated OpenAPI v3.1 specification sync.
                </p>
                <div className="flex items-center gap-4 text-[11px] font-mono text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
                  <span>Commit: <strong className="text-[var(--text-primary)]">#f82c91</strong></span>
                  <span>Routes: <strong className="text-[var(--text-primary)]">14 detected</strong></span>
                </div>
              </GlassPanel>

              {/* Resolved Data Card 2 */}
              <GlassPanel className="p-6 space-y-4 border-cyan-500/30 bg-cyan-950/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-[var(--accent-cyan)]" />
                    <span className="font-mono text-sm font-semibold text-[var(--text-primary)]">
                      acme-corp/auth-gateway
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> 98.7% Synced
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  FastAPI microservice endpoints with Pydantic v2 schemas and OAuth2 JWT authentication.
                </p>
                <div className="flex items-center gap-4 text-[11px] font-mono text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
                  <span>Commit: <strong className="text-[var(--text-primary)]">#d4e109</strong></span>
                  <span>Routes: <strong className="text-[var(--text-primary)]">8 detected</strong></span>
                </div>
              </GlassPanel>
            </>
          )}
        </div>
      </section>

      {/* Active CSS Token Registry */}
      <section className="space-y-4">
        <GlassPanel className="p-6 space-y-6 border-[var(--border-subtle)] bg-[var(--bg-surface)]/60">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)]">
              <Sliders className="h-4 w-4 text-[var(--accent-primary)]" />
              Active CSS Token Registry & Style Variables
            </div>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">styles/tokens.css</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1">
              <div className="text-[10px] text-[var(--text-muted)]">--accent-primary</div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[var(--accent-primary)]" />
                <span className="text-[var(--text-primary)] font-semibold">Electric Violet</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1">
              <div className="text-[10px] text-[var(--text-muted)]">--accent-cyan</div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[var(--accent-cyan)]" />
                <span className="text-[var(--text-primary)] font-semibold">Cyan Glow</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1">
              <div className="text-[10px] text-[var(--text-muted)]">--blur-panel</div>
              <div className="text-[var(--text-primary)] font-semibold">16px Backdrop</div>
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1">
              <div className="text-[10px] text-[var(--text-muted)]">--radius-md</div>
              <div className="text-[var(--text-primary)] font-semibold">14px Radius</div>
            </div>
          </div>
        </GlassPanel>
      </section>
    </main>
  );
}