"use client";

import React, { useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Footer } from "@/components/layout/Footer";
import { 
  Search, 
  Layers, 
  Copy, 
  Check, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  RefreshCw, 
  Terminal 
} from "lucide-react";

interface EndpointDoc {
  id: string;
  method: "GET" | "POST";
  path: string;
  desc: string;
  module: string;
  tag: string;
  requestBody?: string;
  responseBody: string;
  params?: { name: string; type: string; required: boolean; desc: string }[];
}

const ENDPOINTS: EndpointDoc[] = [
  {
    id: "ep_1",
    method: "POST",
    path: "/generate",
    tag: "AST Engine",
    module: "apps/parser-service/app/main.py",
    desc: "Executes LangGraph multi-agent AST doc generation pipeline across modified TypeScript/Python files.",
    requestBody: JSON.stringify({
      repo_name: "enterprise-org/payment-gateway",
      commit_sha: "f82c91a",
      files: [{ filename: "routes/charge.ts", content: "export async function POST(req: Request) { ... }" }]
    }, null, 2),
    responseBody: JSON.stringify({
      status: "success",
      repo_name: "enterprise-org/payment-gateway",
      commit_sha: "f82c91a",
      freshness_score: 100.0,
      drift_count: 0,
      routes_detected: 1
    }, null, 2),
    params: [
      { name: "repo_name", type: "string", required: true, desc: "GitHub repository slug" },
      { name: "commit_sha", type: "string", required: true, desc: "Git commit hash" },
      { name: "files", type: "Array<FilePayload>", required: true, desc: "Source files to parse" }
    ]
  },
  {
    id: "ep_2",
    method: "GET",
    path: "/health",
    tag: "Telemetry",
    module: "apps/parser-service/app/main.py",
    desc: "Heartbeat probe returning service status, AST parser health, and active worker metadata.",
    responseBody: JSON.stringify({ status: "healthy", service: "DocSync AI Parser Service", uptime_sec: 4320 }, null, 2)
  },
  {
    id: "ep_3",
    method: "GET",
    path: "/api/repos",
    tag: "Workspace",
    module: "apps/web/app/api/repos/route.ts",
    desc: "Retrieves workspace connected repositories, telemetry freshness indices, and commit markers.",
    responseBody: JSON.stringify({
      repos: [
        { id: 101, name: "payment-gateway", freshnessIndex: 100.0, default_branch: "main" },
        { id: 102, name: "auth-fastapi-service", freshnessIndex: 98.7, default_branch: "master" }
      ]
    }, null, 2)
  }
];

export default function DocsViewerPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [activeTab, setActiveTab] = useState<"api" | "openapi">("api");
  const [selectedEpId, setSelectedEpId] = useState("ep_1");
  const [codeLang, setCodeLang] = useState<"curl" | "ts" | "py">("curl");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isRunningTest, setIsRunningTest] = useState(false);

  const tags = ["All", "AST Engine", "Telemetry", "Workspace"];

  const filteredEndpoints = ENDPOINTS.filter(ep => {
    const matchesTag = activeTag === "All" || ep.tag === activeTag;
    const matchesSearch = ep.path.toLowerCase().includes(search.toLowerCase()) || 
                          ep.desc.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const selectedEp = ENDPOINTS.find(e => e.id === selectedEpId) || ENDPOINTS[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRunTest = () => {
    setIsRunningTest(true);
    setTestOutput(null);
    setTimeout(() => {
      setTestOutput(selectedEp.responseBody);
      setIsRunningTest(false);
    }, 400);
  };

  const getCodeSnippet = () => {
    const baseUrl = "http://127.0.0.1:8000";
    if (codeLang === "curl") {
      if (selectedEp.method === "GET") {
        return `curl -X GET "${baseUrl}${selectedEp.path}" \\\n  -H "Accept: application/json"`;
      }
      return `curl -X POST "${baseUrl}${selectedEp.path}" \\\n  -H "Content-Type: application/json" \\\n  -d '${selectedEp.requestBody}'`;
    }
    if (codeLang === "ts") {
      if (selectedEp.method === "GET") {
        return `const res = await fetch("${baseUrl}${selectedEp.path}");\nconst data = await res.json();\nconsole.log(data);`;
      }
      return `const res = await fetch("${baseUrl}${selectedEp.path}", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify(${selectedEp.requestBody})\n});\nconst data = await res.json();`;
    }
    if (codeLang === "py") {
      if (selectedEp.method === "GET") {
        return `import requests\n\nres = requests.get("${baseUrl}${selectedEp.path}")\nprint(res.json())`;
      }
      return `import requests\n\npayload = ${selectedEp.requestBody?.replace(/true/g, "True").replace(/false/g, "False")}\nres = requests.post("${baseUrl}${selectedEp.path}", json=payload)\nprint(res.json())`;
    }
    return "";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 relative pt-28 pb-20 px-6 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--accent-primary)] mb-2">
              <Sparkles className="h-3.5 w-3.5" /> AST Reference Explorer
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Autonomous API & Module Explorer
            </h1>
          </div>

          <div className="flex items-center gap-2 border border-[var(--border-subtle)] p-1 rounded-xl bg-[var(--bg-surface-elevated)]/60">
            <button 
              onClick={() => setActiveTab("api")}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                activeTab === "api"
                  ? "bg-[var(--accent-primary)] text-white shadow-md shadow-indigo-500/20 font-semibold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Endpoint Sandbox
            </button>
            <button 
              onClick={() => setActiveTab("openapi")}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                activeTab === "openapi"
                  ? "bg-[var(--accent-primary)] text-white shadow-md shadow-indigo-500/20 font-semibold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              OpenAPI Spec
            </button>
          </div>
        </div>

        {/* Live AST Telemetry Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/50 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div className="font-mono">
              <span className="text-[10px] text-[var(--text-muted)] block">AST Status</span>
              <span className="text-xs font-bold text-[var(--text-primary)]">100% In-Sync</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/50 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Cpu className="h-4 w-4" />
            </div>
            <div className="font-mono">
              <span className="text-[10px] text-[var(--text-muted)] block">Parser Engine</span>
              <span className="text-xs font-bold text-[var(--text-primary)]">Tree-sitter v0.23</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/50 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="font-mono">
              <span className="text-[10px] text-[var(--text-muted)] block">Drift Guard</span>
              <span className="text-xs font-bold text-[var(--text-primary)]">0 Drifts</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/50 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <RefreshCw className="h-4 w-4" />
            </div>
            <div className="font-mono">
              <span className="text-[10px] text-[var(--text-muted)] block">Live Endpoints</span>
              <span className="text-xs font-bold text-[var(--text-primary)]">{ENDPOINTS.length} Detected</span>
            </div>
          </div>
        </div>

        {activeTab === "api" ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-1 min-w-[280px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)]" />
                <input 
                  type="text" 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter endpoints..."
                  className="w-full pl-9 pr-4 py-2.5 text-xs font-mono rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] text-[var(--text-primary)] outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                      activeTag === tag
                        ? "bg-[var(--accent-primary)] text-white font-semibold"
                        : "bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-3">
                {filteredEndpoints.map((ep) => {
                  const isSelected = selectedEpId === ep.id;
                  return (
                    <div
                      key={ep.id}
                      onClick={() => {
                        setSelectedEpId(ep.id);
                        setTestOutput(null);
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[var(--bg-surface-elevated)] border-[var(--accent-primary)] shadow-lg shadow-indigo-500/10"
                          : "bg-[var(--bg-surface)]/60 border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                            ep.method === "POST"
                              ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                              : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          }`}>
                            {ep.method}
                          </span>
                          <span className="font-semibold text-[var(--text-primary)]">{ep.path}</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                          {ep.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2">{ep.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="lg:col-span-7 space-y-5">
                <GlassPanel className="p-6 space-y-6">
                  <div className="flex items-start justify-between border-b border-[var(--border-subtle)] pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-mono">
                        <span className={`px-2.5 py-0.5 rounded font-bold text-xs ${
                          selectedEp.method === "POST"
                            ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        }`}>
                          {selectedEp.method}
                        </span>
                        <span className="text-base font-bold text-[var(--text-primary)]">{selectedEp.path}</span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] font-mono">{selectedEp.module}</p>
                    </div>

                    <button
                      onClick={handleRunTest}
                      disabled={isRunningTest}
                      className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-xs font-mono font-bold hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
                    >
                      <Play className={`h-3.5 w-3.5 fill-black ${isRunningTest ? "animate-spin" : ""}`} />
                      {isRunningTest ? "Executing..." : "Send Request"}
                    </button>
                  </div>

                  {selectedEp.params && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Request Parameters</h4>
                      <div className="border border-[var(--border-subtle)] rounded-lg overflow-hidden font-mono text-xs divide-y divide-[var(--border-subtle)]">
                        {selectedEp.params.map((p, idx) => (
                          <div key={idx} className="p-2.5 flex items-center justify-between bg-[var(--bg-surface-elevated)]/40">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[var(--text-primary)]">{p.name}</span>
                              <span className="text-[10px] text-[var(--accent-cyan)]">{p.type}</span>
                            </div>
                            <span className="text-[11px] text-[var(--text-secondary)]">{p.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[#0d1117] shadow-xl">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/5">
                        <span className="text-[11px] font-mono text-[var(--text-muted)]">request-preview.{codeLang}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-black/30 p-0.5 rounded-md border border-white/5">
                            {(["curl", "ts", "py"] as const).map((lang) => (
                              <button
                                key={lang}
                                onClick={() => setCodeLang(lang)}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                                  codeLang === lang
                                    ? "bg-[var(--accent-primary)] text-white font-bold"
                                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                                }`}
                              >
                                {lang.toUpperCase()}
                              </button>
                            ))}
                          </div>
                          <button
                            onClick={() => handleCopy(getCodeSnippet(), "code")}
                            className="p-1 text-xs font-mono text-[var(--text-muted)] hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === "code" ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          </button>
                        </div>
                      </div>
                      <pre className="p-4 font-mono text-xs text-indigo-300 whitespace-pre-wrap break-words leading-relaxed max-h-48 overflow-y-auto">
                        {getCodeSnippet()}
                      </pre>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[#0d1117] shadow-xl">
                      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/5">
                        <span className="text-[11px] font-mono text-[var(--text-muted)]">response.json</span>
                        {testOutput && (
                          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> 200 OK
                          </span>
                        )}
                      </div>
                      <pre className="p-4 font-mono text-xs text-emerald-300 whitespace-pre-wrap break-words leading-relaxed max-h-48 overflow-y-auto">
                        {testOutput || selectedEp.responseBody}
                      </pre>
                    </div>
                  </div>
                </GlassPanel>
              </div>
            </div>
          </div>
        ) : (
          <GlassPanel className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <span className="font-mono text-xs text-[var(--accent-cyan)] flex items-center gap-2">
                <Layers className="h-4 w-4" /> docs/generated/openapi.json
              </span>
              <button
                onClick={() => handleCopy(JSON.stringify(ENDPOINTS, null, 2), "spec")}
                className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                {copiedKey === "spec" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedKey === "spec" ? "Copied" : "Copy Spec"}
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#0d1117] font-mono text-xs text-indigo-300 border border-white/5 max-h-[500px] overflow-y-auto leading-relaxed">
{`{
  "openapi": "3.1.0",
  "info": {
    "title": "DocSync AI Enterprise API Spec",
    "version": "1.0.0"
  },
  "paths": {
    "/generate": {
      "post": {
        "summary": "Run LangGraph AST parser pipeline",
        "responses": { "200": { "description": "Generated documentation payload" } }
      }
    },
    "/health": {
      "get": {
        "summary": "Telemetry heartbeat probe",
        "responses": { "200": { "description": "Microservice is healthy" } }
      }
    }
  }
}`}
            </pre>
          </GlassPanel>
        )}
      </main>

      <Footer />
    </div>
  );
}