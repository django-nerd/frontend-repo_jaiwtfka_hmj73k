import React from 'react'
import { Sparkles } from 'lucide-react'

// Minimal 8-bit style world with only the needed countries as chunky pixel blocks
// Coordinates are approximate and intentionally blocky to evoke retro vibes
const COUNTRIES = {
  BULGARIA: {
    id: 'BULGARIA',
    label: 'Bulgaria',
    fill: '#f59e0b',
    x: 540,
    y: 180,
    w: 28,
    h: 16,
  },
  FRANCE: {
    id: 'FRANCE',
    label: 'France',
    fill: '#22c55e',
    x: 500,
    y: 180,
    w: 24,
    h: 18,
  },
  USA: {
    id: 'USA',
    label: 'USA',
    fill: '#3b82f6',
    x: 150,
    y: 170,
    w: 120,
    h: 40,
  },
  UK: {
    id: 'UK',
    label: 'United Kingdom',
    fill: '#a855f7',
    x: 485,
    y: 165,
    w: 14,
    h: 16,
  },
  SINGAPORE: {
    id: 'SINGAPORE',
    label: 'Singapore',
    fill: '#ef4444',
    x: 720,
    y: 280,
    w: 20,
    h: 10,
  },
}

const WorldGrid = () => {
  const cells = []
  const cellSize = 16
  // draw a subtle pixel grid background
  for (let x = 0; x < 900; x += cellSize) {
    cells.push(<line key={`v-${x}`} x1={x} y1={0} x2={x} y2={420} stroke="#e5e7eb" strokeWidth={1} />)
  }
  for (let y = 0; y < 420; y += cellSize) {
    cells.push(<line key={`h-${y}`} x1={0} y1={y} x2={900} y2={y} stroke="#e5e7eb" strokeWidth={1} />)
  }
  return <g opacity={0.35}>{cells}</g>
}

export default function PixelMap({ highlighted = [], onSelect, selected }) {
  const isHighlighted = (id) => highlighted.includes(id)

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-amber-50 to-sky-50">
        <svg
          viewBox="0 0 900 420"
          className="w-full h-auto block [image-rendering:pixelated]"
        >
          <rect x="0" y="0" width="900" height="420" fill="#fafaf9" />

          <WorldGrid />

          {/* Low-fi continents blobs for context */}
          <g opacity={0.15}>
            <rect x="80" y="140" width="260" height="120" fill="#9ca3af" />
            <rect x="390" y="140" width="200" height="110" fill="#9ca3af" />
            <rect x="640" y="240" width="220" height="120" fill="#9ca3af" />
            <rect x="430" y="280" width="120" height="50" fill="#9ca3af" />
          </g>

          {/* Countries of interest */}
          {Object.values(COUNTRIES).map((c) => {
            const active = isHighlighted(c.id) || selected === c.id
            return (
              <g key={c.id}
                 onClick={() => onSelect && onSelect(c.id)}
                 onMouseEnter={() => onSelect && onSelect(c.id)}
                 role="button"
                 tabIndex={0}
                >
                {/* Shadow */}
                <rect x={c.x + 3} y={c.y + 3} width={c.w} height={c.h} fill="#000" opacity={active ? 0.25 : 0.1} />
                {/* Main block */}
                <rect
                  x={c.x}
                  y={c.y}
                  width={c.w}
                  height={c.h}
                  fill={active ? c.fill : '#cbd5e1'}
                  stroke="#111827"
                  strokeWidth={2}
                />
                {/* Shine */}
                <rect x={c.x} y={c.y} width={Math.max(4, c.w * 0.2)} height={4} fill="#ffffff" opacity={active ? 0.7 : 0.3} />
              </g>
            )
          })}

          {/* Title badge */}
          <g>
            <rect x={20} y={20} width={280} height={44} fill="#ffffff" stroke="#111827" strokeWidth={2} />
            <text x={40} y={49} fontFamily="monospace" fontSize="18" fill="#111827">Interactive 64-bit World</text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-gray-200 bg-white">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Hover or click a country to see photos
        </span>
        {Object.values(COUNTRIES).map((c) => (
          <span key={c.id} className="inline-flex items-center gap-2 px-2 py-1 rounded border border-gray-200 bg-white">
            <span className="w-3 h-3 border border-black" style={{ background: c.fill }} />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export const COUNTRY_META = COUNTRIES
