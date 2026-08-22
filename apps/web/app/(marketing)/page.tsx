"use client";

import React from "react";
import Link from "next/link";
import { KineticHeadline } from "@/components/motion/KineticHeadline";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";
import { MeshGradientBG } from "@/components/ui/MeshGradientBG";
import { HeroInteractiveTerminal } from "@/components/marketing/HeroInteractiveTerminal";
import { useCursorStore } from "@/hooks/useMagneticCursor";
import {
  ArrowRight,
  GitBranch,
  ShieldCheck,
  Zap,
  Activity,
  Cpu,
  RefreshCw,
  FileCheck,
  Layers,
  Sparkles,
  TrendingUp,
  Clock,
  AlertTriangle,
  Github,
  ChevronRight
} from "lucide-react";

export default function MarketingLandingPage() {
  const { setVariant, resetVariant } = useCursorStore();

  const metrics = [
    {
      label: "Doc Freshness Index",
      value: "99.4%",
      detail: "Autonomous sync on every git push",
      icon: <TrendingUp className="h-4 w-4 text-[var(--accent-success)]" />
    },
    {
      label: "Dev Onboarding Saved",
      value: "4.2 Days",
      detail: "Target: 4 working days/engineer cut",
      icon: <Clock className="h-4 w-4 text-[var(--accent-cyan)]" />
    },
    {
      label: "Drift Caught Pre-Merge",
      value: "100%",
      detail: "Zero stale routes in production",
      icon: <ShieldCheck className="h-4 w-4 text-[var(--accent-warning)]" />
    },
    {
      label: "Parse & Generation Time",
      value: "< 1.8s",
      detail: "Tree-sitter C-binding speed",
      icon: <Zap className="h-4 w-4 text-[var(--accent-primary)]" />
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      badge: "AST Extraction",
      title: "Tree-sitter Code Analysis",
      desc: "Parses your TypeScript and Python source into concrete syntax trees without running untrusted code or spinning up containers."
    },
    {
      step: "02",
      badge: "LangGraph Multi-Agent",
      title: "Self-Healing Documentation",
      desc: "Agent loops reconcile function signatures, type contracts, and Next.js / FastAPI route trees against existing documentation."
    },
    {
      step: "03",
      badge: "Pre-Merge Drift Guard",
      title: "Freshness Index Computation",
      desc: "Computes a mathematical drift score. If an API contract drifts without docs, the GitHub Action catches it before merge."
    },
    {
      step: "04",
      badge: "Zero-Touch Deploy",
      title: "Automated PR & Static Sync",
      desc: "Pushes clean Markdown + OpenAPI specs into your repo or deploys statically to Vercel and S3/CloudFront instantly."
    }
  ];

  return (
    <main className="relative min-h-screen pt-28 pb-24 px-6 max-w-7xl mx-auto space-y-32">
      <MeshGradientBG />

      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center space-y-8 pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-glow)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--accent-primary)] shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          DocSync AI 2.0 • Autonomous CI/CD Documentation Engine
        </div>

        <div className="max-w-4xl space-y-4">
          <KineticHeadline
            text="Turn code changes into always-fresh, auto-deployed documentation."
            highlightWords={["always-fresh", "auto-deployed", "documentation."]}
            className="text-4xl sm:text-6xl md:text-7xl justify-center"
          />
          <p className="text-base sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed pt-2">
            Eliminate stale READMEs, broken Swagger specs, and painful onboarding. Tree-sitter parses the AST on push, LangGraph drafts the docs, and your CI/CD deploys them.
          </p>
        </div>

        {/* CTA Button Strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/dev/design-system"
            onMouseEnter={() => setVariant("magnetic")}
            onMouseLeave={resetVariant}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--accent-primary)] text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition-all active:scale-95"
          >
            Explore Interactive Engine <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-sm font-medium text-[var(--text-primary)] hover:border-[var(--border-glow)] transition-colors"
          >
            <Github className="h-4 w-4" /> View GitHub Action
          </a>
        </div>

        {/* Interactive Terminal / Code Diff Playground */}
        <div className="w-full pt-8 flex justify-center">
          <HeroInteractiveTerminal />
        </div>
      </section>

      {/* METRICS & TELEMETRY STRIP */}
      <section id="metrics" className="space-y-6 scroll-mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <GlassPanel className="p-5 space-y-2 hover:border-[var(--accent-primary)] transition-all">
                <div className="flex items-center justify-between text-[var(--text-muted)] text-xs font-mono">
                  <span>{m.label}</span>
                  {m.icon}
                </div>
                <div className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                  {m.value}
                </div>
                <p className="text-[11px] text-[var(--text-secondary)]">{m.detail}</p>
              </GlassPanel>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS / PIPELINE SECTION */}
      <section id="features" className="space-y-12 scroll-mt-24">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)]">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            From commit to live docs in seconds
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            DocSync AI sits directly in your CI pipeline, ensuring documentation updates with every pull request.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1} direction="up">
              <GlassPanel className="h-full flex flex-col justify-between p-6 space-y-4 hover:border-[var(--accent-cyan)] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-[var(--border-subtle)] group-hover:text-[var(--accent-primary)]">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--accent-cyan)]">
                    {step.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">{step.desc}</p>
                </div>
              </GlassPanel>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* BENTO ARCHITECTURE GRID */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent-cyan)]">
            Engine Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Built for modern engineering teams
          </h2>
        </div>

        <BentoGrid>
          <BentoTile size="2x1">
            <GlassPanel interactive glowOnHover className="h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-[var(--accent-primary)] border border-indigo-500/20">
                  <Cpu className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono text-[var(--accent-success)]">FastAPI + Tree-sitter</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Isolated AST Parser Service</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  High-speed Python Tree-sitter microservice extracts classes, parameters, and routes without code execution risks.
                </p>
              </div>
            </GlassPanel>
          </BentoTile>

          <BentoTile size="1x1">
            <GlassPanel interactive className="h-full flex flex-col justify-between">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-[var(--accent-cyan)] border border-cyan-500/20 w-fit">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">LangGraph Engine</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Multi-step doc generation with validation feedback loops.</p>
              </div>
            </GlassPanel>
          </BentoTile>

          <BentoTile size="1x1">
            <GlassPanel className="h-full flex flex-col justify-between">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-[var(--accent-success)] border border-emerald-500/20 w-fit">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Drift Guard</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Blocks merges when public API contracts lack documentation.</p>
              </div>
            </GlassPanel>
          </BentoTile>

          <BentoTile size="2x1">
            <GlassPanel interactive glowOnHover className="h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-[var(--accent-warning)] border border-amber-500/20">
                  <GitBranch className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">GitHub Action</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Automated Pull Requests & Deployments</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Opens automated PRs updating Markdown & OpenAPI specs or deploys directly to Vercel and AWS S3/CloudFront.
                </p>
              </div>
            </GlassPanel>
          </BentoTile>
        </BentoGrid>
      </section>

      {/* FINAL CALL TO ACTION */}
      <ScrollReveal direction="up">
        <GlassPanel className="text-center py-16 px-8 border-[var(--border-glow)] bg-gradient-to-b from-[var(--glass-bg)] to-indigo-950/20 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Ready to stop writing manual documentation?
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto">
            Plug DocSync AI into your GitHub repository in under 2 minutes and experience drift-free documentation.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/dev/design-system"
              onMouseEnter={() => setVariant("magnetic")}
              onMouseLeave={resetVariant}
              className="px-8 py-4 rounded-full bg-[var(--accent-primary)] text-white text-sm font-semibold shadow-xl shadow-indigo-500/30 hover:bg-indigo-500 transition-all active:scale-95 flex items-center gap-2"
            >
              Get Started Now <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </GlassPanel>
      </ScrollReveal>
    </main>
  );
}