import type { Project } from "../data/content";

/**
 * Original, lightweight abstract previews for each project.
 * Pure SVG + CSS — no external images, no heavy assets.
 */
export function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  if (kind === "triage") return <TriageVisual />;
  if (kind === "rag") return <RagVisual />;
  return <ArVisual />;
}

/* ---------------------------------------------------------------- */
/*  CardioAssist — vitals curve, risk bands, triage queue            */
/* ---------------------------------------------------------------- */

function TriageVisual() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-[#F7F5EF] via-[#F3F5F0] to-[#E9EDE4]">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(18,20,15,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,20,15,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <svg viewBox="0 0 520 340" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {/* risk bands */}
        <rect x="24" y="26" width="472" height="26" fill="#DCE2D4" opacity="0.55" />
        <rect x="24" y="26" width="330" height="26" fill="#C7CFBD" opacity="0.45" />
        <rect x="24" y="26" width="150" height="26" fill="#E9EDE4" opacity="0.9" />

        {/* ECG line */}
        <path
          d="M24 176 H92 l14 -34 l12 66 l16 -92 l14 60 h34 l12 -18 l14 18 H300 l10 -28 l10 56 l14 -74 l12 46 h36 l10 -14 l12 14 H496"
          fill="none"
          stroke="#12140F"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.82"
        />
        {/* baseline grid ticks */}
        {[24, 120, 216, 312, 408, 496].map((x) => (
          <line key={x} x1={x} y1="176" x2={x} y2="184" stroke="rgba(18,20,15,0.3)" strokeWidth="0.8" />
        ))}

        {/* queue rows */}
        {[
          { y: 218, w: 168, tone: "#12140F", op: 0.85, label: "HIGH" },
          { y: 246, w: 128, tone: "#6E726A", op: 0.7, label: "MED" },
          { y: 274, w: 96, tone: "#9AA096", op: 0.7, label: "LOW" },
        ].map((row) => (
          <g key={row.label}>
            <circle cx="30" cy={row.y + 5} r="3" fill={row.tone} opacity={row.op} />
            <rect x="42" y={row.y} width={row.w} height="10" rx="5" fill={row.tone} opacity={0.16} />
            <text
              x="496"
              y={row.y + 9}
              textAnchor="end"
              fontSize="7.5"
              letterSpacing="1.8"
              fontFamily="'JetBrains Mono', monospace"
              fill="#6E726A"
            >
              {row.label}
            </text>
          </g>
        ))}

        {/* decision badge */}
        <g>
          <rect x="24" y="300" width="106" height="22" rx="11" fill="#12140F" opacity="0.9" />
          <text
            x="77"
            y="314.5"
            textAnchor="middle"
            fontSize="7.5"
            letterSpacing="1.6"
            fontFamily="'JetBrains Mono', monospace"
            fill="#FCFCFA"
          >
            &lt; 10 SEC
          </text>
        </g>
        <line x1="24" y1="72" x2="496" y2="72" stroke="rgba(18,20,15,0.14)" strokeWidth="0.8" />
        <text
          x="496"
          y="66"
          textAnchor="end"
          fontSize="7"
          letterSpacing="1.8"
          fontFamily="'JetBrains Mono', monospace"
          fill="#9AA096"
        >
          RISK STRATIFICATION
        </text>
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  NeuroGrid — chunk graph, vectors, citation beams                 */
/* ---------------------------------------------------------------- */

function RagVisual() {
  const nodes = [
    { x: 78, y: 74 },
    { x: 150, y: 130 },
    { x: 70, y: 196 },
    { x: 168, y: 250 },
    { x: 106, y: 300 },
  ];
  const hub = { x: 300, y: 170 };

  return (
    <div className="relative h-full w-full bg-gradient-to-tr from-[#F3F5F0] via-[#FCFCFA] to-[#F7F5EF]">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(18,20,15,0.13) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <svg viewBox="0 0 520 340" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {/* document stack */}
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={44 + i * 5}
            y={44 + i * 5}
            width="76"
            height="96"
            fill="#FCFCFA"
            stroke="rgba(18,20,15,0.16)"
            strokeWidth="0.9"
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={68}
            y1={62 + i * 13}
            x2={68 + (i === 4 ? 30 : 44)}
            y2={62 + i * 13}
            stroke="rgba(18,20,15,0.18)"
            strokeWidth="1.4"
          />
        ))}

        {/* beams to hub */}
        {nodes.map((n, i) => (
          <path
            key={i}
            d={`M ${n.x} ${n.y} C ${n.x + 90} ${n.y}, ${hub.x - 90} ${hub.y}, ${hub.x} ${hub.y}`}
            fill="none"
            stroke="rgba(18,20,15,0.22)"
            strokeWidth="0.85"
            strokeDasharray="3 5"
          />
        ))}

        {/* chunk nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="13" fill="#FCFCFA" stroke="rgba(18,20,15,0.2)" strokeWidth="0.9" />
            <circle cx={n.x} cy={n.y} r="4" fill="#12140F" opacity={0.3 + i * 0.12} />
          </g>
        ))}

        {/* hub */}
        <circle cx={hub.x} cy={hub.y} r="56" fill="#E9EDE4" opacity="0.62" />
        <circle cx={hub.x} cy={hub.y} r="40" fill="#FCFCFA" stroke="rgba(18,20,15,0.22)" strokeWidth="0.9" />
        <circle cx={hub.x} cy={hub.y} r="26" fill="none" stroke="rgba(18,20,15,0.14)" strokeWidth="0.8" strokeDasharray="2 4" />
        <text
          x={hub.x}
          y={hub.y + 3}
          textAnchor="middle"
          fontSize="8"
          letterSpacing="1.6"
          fontFamily="'JetBrains Mono', monospace"
          fill="#2A2D26"
        >
          RAG
        </text>

        {/* output / citation panel */}
        <rect x="392" y="112" width="96" height="116" fill="#FCFCFA" stroke="rgba(18,20,15,0.16)" strokeWidth="0.9" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1="406"
            y1={130 + i * 15}
            x2={406 + (i % 3 === 2 ? 46 : 68)}
            y2={130 + i * 15}
            stroke={i === 5 ? "rgba(123,143,94,0.85)" : "rgba(18,20,15,0.16)"}
            strokeWidth={i === 5 ? 2.2 : 1.4}
          />
        ))}
        <path d={`M ${hub.x + 40} ${hub.y} H 392`} stroke="rgba(18,20,15,0.28)" strokeWidth="0.9" />
        <circle cx="392" cy={hub.y} r="2.6" fill="#12140F" opacity="0.6" />

        {/* latency label */}
        <text
          x="24"
          y="322"
          fontSize="7"
          letterSpacing="1.8"
          fontFamily="'JetBrains Mono', monospace"
          fill="#9AA096"
        >
          500+ CHUNKS · SUB-SECOND RETRIEVAL
        </text>
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Elegance — wireframe object in an AR reticle                     */
/* ---------------------------------------------------------------- */

function ArVisual() {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#FCFCFA] via-[#F7F5EF] to-[#E9EDE4]">
      <div className="absolute inset-0 grid-lines opacity-50" />
      <svg viewBox="0 0 520 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="arGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DCE2D4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F3F5F0" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* floor ellipse */}
        <ellipse cx="260" cy="268" rx="118" ry="24" fill="none" stroke="rgba(18,20,15,0.2)" strokeWidth="0.9" strokeDasharray="3 6" />

        {/* wireframe product silhouette (abstract jacket/frame) */}
        <g stroke="rgba(18,20,15,0.55)" strokeWidth="1.1" fill="none">
          <path d="M212 106 L260 88 L308 106 L330 168 L306 176 L306 256 L214 256 L214 176 L190 168 Z" />
          <path d="M260 88 V256" strokeDasharray="4 6" opacity="0.55" />
          <path d="M212 106 L236 150 L260 128 L284 150 L308 106" />
          <path d="M214 200 H306" strokeDasharray="4 6" opacity="0.5" />
        </g>
        <path
          d="M212 106 L260 88 L308 106 L330 168 L306 176 L306 256 L214 256 L214 176 L190 168 Z"
          fill="url(#arGlass)"
          opacity="0.28"
        />

        {/* reticle corners */}
        {[
          { x: 158, y: 74, sx: 1, sy: 1 },
          { x: 362, y: 74, sx: -1, sy: 1 },
          { x: 158, y: 272, sx: 1, sy: -1 },
          { x: 362, y: 272, sx: -1, sy: -1 },
        ].map((c, i) => (
          <g key={i} stroke="rgba(18,20,15,0.45)" strokeWidth="1.2">
            <line x1={c.x} y1={c.y} x2={c.x + 18 * c.sx} y2={c.y} />
            <line x1={c.x} y1={c.y} x2={c.x} y2={c.y + 18 * c.sy} />
          </g>
        ))}

        {/* measurement ticks */}
        <line x1="366" y1="88" x2="366" y2="256" stroke="rgba(18,20,15,0.22)" strokeWidth="0.8" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line
            key={i}
            x1="366"
            y1={88 + i * 28}
            x2="372"
            y2={88 + i * 28}
            stroke="rgba(18,20,15,0.22)"
            strokeWidth="0.8"
          />
        ))}
        <text
          x="382"
          y="176"
          fontSize="7"
          letterSpacing="1.6"
          fontFamily="'JetBrains Mono', monospace"
          fill="#6E726A"
        >
          3D
        </text>

        {/* cart chip */}
        <g>
          <rect x="24" y="266" width="112" height="26" rx="13" fill="#FCFCFA" stroke="rgba(18,20,15,0.18)" strokeWidth="0.9" />
          <circle cx="40" cy="279" r="3.2" fill="#7B8F5E" />
          <text
            x="52"
            y="282"
            fontSize="7"
            letterSpacing="1.5"
            fontFamily="'JetBrains Mono', monospace"
            fill="#2A2D26"
          >
            TRY ON
          </text>
        </g>

        <text
          x="496"
          y="304"
          textAnchor="end"
          fontSize="7"
          letterSpacing="1.8"
          fontFamily="'JetBrains Mono', monospace"
          fill="#9AA096"
        >
          200+ ITEMS · AR.JS
        </text>
      </svg>
    </div>
  );
}
