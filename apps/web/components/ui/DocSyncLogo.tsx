import React from "react";

interface DocSyncLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function DocSyncLogo({ size = 28, className = "", showText = false }: DocSyncLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="docsync-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="docsync-grad-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0891B2" stopOpacity="0.1" />
          </linearGradient>
          <filter id="docsync-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Back Glow */}
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="10"
          fill="url(#docsync-grad-glow)"
          filter="url(#docsync-blur)"
        />

        {/* Outer Squircle Container */}
        <rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="9"
          fill="#0B0F19"
          stroke="url(#docsync-grad-primary)"
          strokeWidth="1.5"
        />

        {/* Document Sheet Layer 1 (Left Code Page) */}
        <path
          d="M10 13C10 11.8954 10.8954 11 12 11H20L25 16V27C25 28.1046 24.1046 29 23 29H12C10.8954 29 10 28.1046 10 27V13Z"
          fill="#1E293B"
          stroke="#475569"
          strokeWidth="1.2"
        />

        {/* Folded Corner */}
        <path
          d="M20 11V16H25"
          fill="none"
          stroke="#64748B"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Synced AST Node Pathways */}
        <path
          d="M14 18H18"
          stroke="#818CF8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14 22H21"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Active Sync Pulse Node (Cyan AST Dot) */}
        <circle
          cx="28"
          cy="12"
          r="4.5"
          fill="url(#docsync-grad-primary)"
          stroke="#0B0F19"
          strokeWidth="1.5"
        />

        {/* Inner Core Light */}
        <circle
          cx="28"
          cy="12"
          r="1.8"
          fill="#FFFFFF"
        />

        {/* Sync Ring Segment */}
        <path
          d="M24 23C26.5 25.5 29.5 25.5 32 23"
          stroke="#06B6D4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="2 3"
        />
      </svg>

      {showText && (
        <span className="font-extrabold tracking-tight text-[var(--text-primary)] text-sm">
          DocSync <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">AI</span>
        </span>
      )}
    </div>
  );
}