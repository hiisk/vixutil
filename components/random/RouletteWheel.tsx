'use client';
import ToolIcon from '@/components/ToolIcon';
import { useRef, useState } from 'react';
import { RANDOM_UI, type RandomLang } from '@/lib/random-ui-intl';

const COLORS = [
  '#f43f5e', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#ec4899',
  '#f97316', '#06b6d4', '#84cc16', '#a855f7', '#ef4444', '#14b8a6',
];

const R = 150;
const CX = 160;
const CY = 160;

function pointFor(angleDeg: number, radius: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [CX + radius * Math.sin(rad), CY - radius * Math.cos(rad)];
}

function clip(s: string): string {
  return s.length > 8 ? s.slice(0, 7) + '…' : s;
}

export default function RouletteWheel({ lang = 'ko' }: { lang?: RandomLang }) {
  const ui = RANDOM_UI[lang];
  const [options, setOptions] = useState<string[]>([...ui.rouletteDefaults]);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const rotRef = useRef(0);

  const n = options.length;
  const seg = 360 / n;

  function setOpt(i: number, v: string) {
    setOptions(prev => prev.map((o, idx) => (idx === i ? v : o)));
  }
  function addOpt() {
    if (options.length >= 12) return;
    setOptions(prev => [...prev, '']);
  }
  function removeOpt(i: number) {
    if (options.length <= 2) return;
    setOptions(prev => prev.filter((_, idx) => idx !== i));
  }

  function spin() {
    const valid = options.map(o => o.trim());
    if (spinning || valid.some(o => o === '') || valid.length < 2) return;
    setWinner(null);
    setSpinning(true);
    const winnerIndex = Math.floor(Math.random() * n);
    const midAngle = winnerIndex * seg + seg / 2;
    const targetMod = (360 - midAngle) % 360;
    const prevMod = ((rotRef.current % 360) + 360) % 360;
    const forward = ((targetMod - prevMod) % 360 + 360) % 360;
    const next = rotRef.current + 360 * 5 + forward;
    rotRef.current = next;
    setRotation(next);
    window.setTimeout(() => {
      setWinner(options[winnerIndex]);
      setSpinning(false);
    }, 4100);
  }

  const filled = options.every(o => o.trim() !== '');

  return (
    <div>
      {/* 휠 */}
      <div className="relative mx-auto mb-6" style={{ width: 320, maxWidth: '100%' }}>
        {/* 포인터 */}
        <ToolIcon emoji="🔻" className="absolute left-1/2 -translate-x-1/2 -top-1 z-10 w-8 h-8 drop-shadow text-slate-800 dark:text-slate-100" />
        <svg
          viewBox="0 0 320 320"
          className="w-full h-auto select-none"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.16, 1)' : 'none',
          }}
        >
          {options.map((opt, i) => {
            const a1 = i * seg;
            const a2 = (i + 1) * seg;
            const [x1, y1] = pointFor(a1, R);
            const [x2, y2] = pointFor(a2, R);
            const large = seg > 180 ? 1 : 0;
            const mid = a1 + seg / 2;
            const [lx, ly] = pointFor(mid, R * 0.62);
            const flip = mid > 90 && mid < 270;
            return (
              <g key={i}>
                <path
                  d={`M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} Z`}
                  fill={COLORS[i % COLORS.length]}
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text
                  x={lx}
                  y={ly}
                  fill="#fff"
                  fontSize="15"
                  fontWeight="800"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${flip ? mid + 180 : mid} ${lx} ${ly})`}
                  style={{ pointerEvents: 'none' }}
                >
                  {clip(opt || '?')}
                </text>
              </g>
            );
          })}
          <circle cx={CX} cy={CY} r="20" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
        </svg>
      </div>

      {/* 결과 */}
      {winner && (
        <div className="wc-pop text-center rounded-lg bg-sec py-5 mb-6">
          <div className="text-xs font-bold text-rose-100 mb-1">{ui.winner}</div>
          <div className="text-3xl font-bold">{winner}</div>
        </div>
      )}

      <button
        onClick={spin}
        disabled={spinning || !filled}
        className="w-full bg-sec font-bold text-lg rounded-lg py-4 mb-6 shadow-sm shadow-rose-200 dark:shadow-none hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {spinning ? ui.spinning : ui.spin}
      </button>

      {/* 프리셋 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {ui.presets.map(p => (
          <button
            key={p.label}
            onClick={() => { setOptions([...p.items]); setWinner(null); }}
            className="text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-full px-3 py-1.5 hover:bg-sec-soft transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 항목 편집 */}
      <div className="space-y-2">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
            <input
              value={opt}
              onChange={e => setOpt(i, e.target.value)}
              placeholder={ui.optionPlaceholder(i + 1)}
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <button
              onClick={() => removeOpt(i)}
              disabled={options.length <= 2}
              className="w-8 h-8 shrink-0 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-sec-soft disabled:opacity-30 transition-colors"
              aria-label={ui.remove}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addOpt}
        disabled={options.length >= 12}
        className="mt-3 w-full rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-sm font-bold py-2.5 hover:border-slate-300 dark:hover:border-slate-700 hover:text-rose-500 disabled:opacity-40 transition-colors"
      >
        {ui.addOption}
      </button>

      <style jsx>{`
        @keyframes wcPop { 0% { opacity: 0; transform: scale(0.8); } 60% { transform: scale(1.04); } 100% { opacity: 1; transform: scale(1); } }
        .wc-pop { animation: wcPop 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>
    </div>
  );
}
