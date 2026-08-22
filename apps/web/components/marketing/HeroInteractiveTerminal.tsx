"use client";

import React, { useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Terminal, ArrowRight, CheckCircle2, Copy, Check } from "lucide-react";

export function HeroInteractiveTerminal() {
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<"ts" | "py">("ts");

  const tsCode = `// apps/api/users.ts
export async function POST(req: Request) {
  const body = await req.json();
  return Response.json({ status: 201, user: body });
}`;

  const tsDoc = `### POST /api/users
Creates a new user instance.
- **Request Body**: \`UserPayload\` (JSON)
- **Response**: \`201 Created\` → \`{ status: number, user: object }\``;

  const pyCode = `# app/routes/auth.py
@router.post("/login", response_model=TokenResponse)
async def login(credentials: OAuth2PasswordRequestForm):
    return auth_service.authenticate(credentials)`;

  const pyDoc = `### POST /login
Authenticates developer credentials via OAuth2.
- **Param**: \`credentials\` (OAuth2PasswordRequestForm)
- **Returns**: \`TokenResponse\` (JWT Bearer Token)`;

  const copyCommand = () => {
    navigator.clipboard.writeText("npx docsync-ai init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassPanel className="w-full max-w-4xl p-0 overflow-hidden border-[var(--border-glow)] shadow-2xl shadow-indigo-500/10">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-[var(--text-muted)] flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5" /> docsync-ast-inspector.v1
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang("ts")}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              lang === "ts"
                ? "bg-[var(--accent-primary)] text-white"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            TypeScript
          </button>
          <button
            onClick={() => setLang("py")}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              lang === "py"
                ? "bg-[var(--accent-primary)] text-white"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Python (FastAPI)
          </button>
        </div>
      </div>

      {/* Split Terminal Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border-subtle)] text-xs font-mono">
        {/* Source AST Window */}
        <div className="p-5 bg-black/40 space-y-3">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-[10px] uppercase tracking-wider font-semibold">
            <span>Input Code (Tree-sitter AST Parse)</span>
            <span className="text-[var(--accent-cyan)]">Realtime Diff</span>
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
            <code>{lang === "ts" ? tsCode : pyCode}</code>
          </pre>
        </div>

        {/* Live LangGraph Generated Docs */}
        <div className="p-5 bg-indigo-950/20 space-y-3">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-[10px] uppercase tracking-wider font-semibold">
            <span className="text-[var(--accent-primary)]">Synced Output (/docs/api.md)</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="h-3 w-3" /> 100% Fresh
            </span>
          </div>
          <pre className="text-indigo-200 overflow-x-auto whitespace-pre leading-relaxed font-sans text-xs">
            <code>{lang === "ts" ? tsDoc : pyDoc}</code>
          </pre>
        </div>
      </div>

      {/* Terminal Footer Bar */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] text-xs">
        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>CI/CD Action: <strong className="text-[var(--text-primary)]">docsync-generate.yml</strong></span>
        </div>
        <button
          onClick={copyCommand}
          className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--accent-primary)] hover:text-indigo-400 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? "Copied to clipboard" : "npx docsync-ai init"}</span>
        </button>
      </div>
    </GlassPanel>
  );
}