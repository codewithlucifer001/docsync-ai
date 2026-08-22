"use client";

import React, { useState, useEffect } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useSession, signIn } from "next-auth/react";
import { GitBranch, Search, Lock, Globe, Check, Loader2, X, Github, RefreshCw } from "lucide-react";

interface RepoItem {
  id: number | string;
  name: string;
  full_name: string;
  private: boolean;
  default_branch: string;
  description: string;
}

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
  const { data: session, status } = useSession();
  const [search, setSearch] = useState("");
  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectingId, setConnectingId] = useState<string | number | null>(null);

  const fetchRepos = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/repos");
      const data = await res.json();
      setRepos(data.repos || []);
      setIsAuthenticated(data.authenticated || false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchRepos();
    }
  }, [isOpen, status]);

  if (!isOpen) return null;

  const filtered = repos.filter(
    (r) =>
      r.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleConnect = async (repo: RepoItem) => {
    setConnectingId(repo.id);
    setTimeout(() => {
      onRepoConnected({
        id: `repo_${repo.id}`,
        name: repo.name,
        fullName: repo.full_name,
        freshnessIndex: 100.0
      });
      setConnectingId(null);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <GlassPanel className="w-full max-w-2xl max-h-[85vh] flex flex-col p-6 space-y-5 border-[var(--border-glow)] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)]">
            <Github className="h-4 w-4" /> GitHub Workspace Repositories
          </div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">Connect Repository</h3>
        </div>

        {!isAuthenticated && status !== "authenticated" ? (
          <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs space-y-0.5">
              <span className="font-bold text-[var(--text-primary)] block">Authenticate with GitHub</span>
              <span className="text-[var(--text-secondary)]">Link your personal/organization repositories live.</span>
            </div>
            <button
              onClick={() => signIn("github")}
              className="px-4 py-2 rounded-lg bg-[var(--accent-primary)] text-white text-xs font-mono font-semibold hover:bg-indigo-500 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md shadow-indigo-500/20"
            >
              <Github className="h-4 w-4" /> Sign In with GitHub
            </button>
          </div>
        ) : null}

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search repositories by name..."
            className="w-full pl-9 pr-4 py-2.5 text-xs font-mono rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] text-[var(--text-primary)] outline-none"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[220px] max-h-[340px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-2 text-[var(--text-muted)] font-mono text-xs">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--accent-primary)]" />
              <span>Fetching repositories...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-[var(--text-muted)] font-mono text-xs">
              No matching repositories found.
            </div>
          ) : (
            filtered.map((repo) => {
              const isConnected = connectedRepoIds.includes(`repo_${repo.id}`) || connectedRepoIds.includes(String(repo.id));
              const isConnecting = connectingId === repo.id;

              return (
                <div
                  key={repo.id}
                  className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/50 hover:bg-[var(--bg-surface-elevated)] flex items-center justify-between gap-4 transition-all"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      {repo.private ? (
                        <Lock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      ) : (
                        <Globe className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      )}
                      <span className="font-mono text-xs font-bold text-[var(--text-primary)] truncate">
                        {repo.full_name}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] truncate max-w-md">
                      {repo.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleConnect(repo)}
                    disabled={isConnected || isConnecting}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      isConnected
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default"
                        : "bg-[var(--accent-primary)] hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 active:scale-95"
                    }`}
                  >
                    {isConnecting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : isConnected ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <GitBranch className="h-3.5 w-3.5" />
                    )}
                    <span>{isConnected ? "Connected" : isConnecting ? "Linking..." : "Connect"}</span>
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