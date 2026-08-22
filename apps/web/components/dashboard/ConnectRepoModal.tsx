"use client";

import React, { useState, useEffect } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Skeleton } from "@/components/ui/Skeleton";
import { Lock, Globe, Plus, Search, X, Loader2, Sparkles, Check } from "lucide-react";

interface RepoItem {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  default_branch: string;
  description: string;
}

const DEFAULT_REPOS: RepoItem[] = [
  {
    id: 101,
    name: "payment-gateway",
    full_name: "enterprise-org/payment-gateway",
    private: true,
    default_branch: "main",
    description: "Stripe & PayPal microservice with automated Next.js 15 route handlers."
  },
  {
    id: 102,
    name: "auth-fastapi-service",
    full_name: "enterprise-org/auth-fastapi-service",
    private: false,
    default_branch: "master",
    description: "OAuth2 & JWT authentication microservice written in Python FastAPI."
  },
  {
    id: 103,
    name: "analytics-worker",
    full_name: "enterprise-org/analytics-worker",
    private: false,
    default_branch: "main",
    description: "Event streaming and metrics aggregation pipeline."
  },
  {
    id: 104,
    name: "docsync-core-engine",
    full_name: "docsync-ai/docsync-core-engine",
    private: false,
    default_branch: "main",
    description: "Tree-sitter AST parser and LangGraph multi-agent doc generator."
  }
];

interface ConnectRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectedRepoIds: string[];
  onRepoConnected: (repo: any) => void;
}

export function ConnectRepoModal({
  isOpen,
  onClose,
  connectedRepoIds,
  onRepoConnected
}: ConnectRepoModalProps) {
  const [repos, setRepos] = useState<RepoItem[]>(DEFAULT_REPOS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [connectingId, setConnectingId] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch("/api/repos")
      .then((res) => res.json())
      .then((data) => {
        if (data.repos && data.repos.length > 0) {
          setRepos(data.repos);
        }
        setLoading(false);
      })
      .catch(() => {
        setRepos(DEFAULT_REPOS);
        setLoading(false);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredRepos = repos.filter(
    (r) =>
      r.full_name.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleConnect = async (e: React.MouseEvent, repo: RepoItem) => {
    e.preventDefault();
    e.stopPropagation();

    const normalizedId = "repo_" + repo.id;
    if (connectedRepoIds.includes(normalizedId)) return;

    setConnectingId(repo.id);

    try {
      const res = await fetch("/api/repos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          githubRepoId: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          defaultBranch: repo.default_branch,
          private: repo.private
        })
      });
      const data = await res.json();
      onRepoConnected(data.repository || {
        id: normalizedId,
        name: repo.name,
        fullName: repo.full_name,
        defaultBranch: repo.default_branch,
        freshnessIndex: 100.0
      });
    } catch {
      onRepoConnected({
        id: normalizedId,
        name: repo.name,
        fullName: repo.full_name,
        defaultBranch: repo.default_branch,
        freshnessIndex: 100.0
      });
    } finally {
      setConnectingId(null);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <GlassPanel
        className="w-full max-w-xl p-6 space-y-5 border-[var(--border-glow)] shadow-2xl relative bg-[var(--bg-surface)]/95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--accent-primary)]" /> Connect Repository
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Select or search a repository to enable autonomous AST doc generation.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search e.g. 'payment', 'fastapi', 'analytics'..."
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] text-[var(--text-primary)] outline-none"
          />
        </div>

        {/* Repositories List */}
        <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
          {loading ? (
            <>
              <div className="p-4 rounded-lg border border-[var(--border-subtle)] space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-3/4" />
              </div>
              <div className="p-4 rounded-lg border border-[var(--border-subtle)] space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </>
          ) : filteredRepos.length === 0 ? (
            <div className="text-center py-8 text-xs text-[var(--text-muted)]">
              No repositories match "{search}".
            </div>
          ) : (
            filteredRepos.map((repo) => {
              const isAlreadyConnected = connectedRepoIds.includes("repo_" + repo.id);

              return (
                <div
                  key={repo.id}
                  className="p-3.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] bg-[var(--bg-surface-elevated)]/40 flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[var(--text-primary)] truncate">
                        {repo.full_name}
                      </span>
                      {repo.private ? (
                        <Lock className="h-3 w-3 text-amber-400 shrink-0" />
                      ) : (
                        <Globe className="h-3 w-3 text-[var(--accent-cyan)] shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] truncate">
                      {repo.description || "No description provided."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleConnect(e, repo)}
                    disabled={connectingId === repo.id || isAlreadyConnected}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium shrink-0 flex items-center gap-1.5 transition-colors ${
                      isAlreadyConnected
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default"
                        : "bg-[var(--accent-primary)] text-white hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
                    }`}
                  >
                    {connectingId === repo.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : isAlreadyConnected ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                    <span>{isAlreadyConnected ? "Connected" : "Connect"}</span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </GlassPanel>
    </div>
  );
}