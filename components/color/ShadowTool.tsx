'use client';
import { useMemo, useState } from 'react';
import { hexToRgb } from '@/lib/color';
import { CARD, ColorInput, useCopy } from './ui';

/**
 * 그림자 — 값을 만지며 눈으로 확인한다.
 *
 * 자연스러운 프리셋은 그림자를 여러 겹 겹친다. 실제 그림자는 가까운 곳이
 * 진하고 멀수록 옅게 퍼지는데, 한 겹으로는 그 느낌이 안 나기 때문이다.
 */
const PRESETS = [
  { label: '얕게', css: '0 1px 2px rgba(15,23,42,0.08), 0 1px 3px rgba(15,23,42,0.10)' },
  { label: '보통', css: '0 4px 6px -1px rgba(15,23,42,0.10), 0 2px 4px -2px rgba(15,23,42,0.08)' },
  { label: '떠 있게', css: '0 10px 15px -3px rgba(15,23,42,0.12), 0 4px 6px -4px rgba(15,23,42,0.10)' },
  { label: '깊게', css: '0 25px 50px -12px rgba(15,23,42,0.25)' },
];

export default function ShadowTool() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(8);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(-4);
  const [color, setColor] = useState('#0f172a');
  const [alpha, setAlpha] = useState(20);
  const [inset, setInset] = useState(false);
  const [preset, setPreset] = useState<string | null>(null);
  const { copied, copy } = useCopy();

  const css = useMemo(() => {
    if (preset) return preset;
    const rgb = hexToRgb(color) ?? { r: 15, g: 23, b: 42 };
    return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${(alpha / 100).toFixed(2)})`;
  }, [x, y, blur, spread, color, alpha, inset, preset]);

  const slider = (label: string, value: number, min: number, max: number, set: (n: number) => void) => (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</span>
        <span className="text-sm font-black text-indigo-600 tabular-nums">{value}px</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => { setPreset(null); set(Number(e.target.value)); }}
        className="w-full accent-indigo-500" aria-label={label}
      />
    </div>
  );

  return (
    <div>
      <div className="rounded-2xl bg-slate-100 dark:bg-slate-950 py-14 flex items-center justify-center">
        <div className="w-40 h-28 rounded-2xl bg-white dark:bg-slate-800" style={{ boxShadow: css }} />
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {PRESETS.map(p => (
          <button
            key={p.label}
            onClick={() => setPreset(p.css)}
            className={`rounded-xl border py-2.5 text-xs font-bold transition-colors ${
              preset === p.css
                ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className={`${CARD} mt-4 flex flex-col gap-3`}>
        <div className="grid grid-cols-2 gap-3">
          {slider('가로 위치', x, -40, 40, setX)}
          {slider('세로 위치', y, -40, 40, setY)}
          {slider('흐림', blur, 0, 80, setBlur)}
          {slider('번짐', spread, -20, 40, setSpread)}
        </div>

        <ColorInput value={color} onChange={c => { setPreset(null); setColor(c); }} label="그림자 색" />

        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">투명도</span>
            <span className="text-sm font-black text-indigo-600 tabular-nums">{alpha}%</span>
          </div>
          <input
            type="range" min={0} max={100} value={alpha}
            onChange={e => { setPreset(null); setAlpha(Number(e.target.value)); }}
            className="w-full accent-indigo-500" aria-label="투명도"
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox" checked={inset}
            onChange={e => { setPreset(null); setInset(e.target.checked); }}
            className="w-4 h-4 accent-indigo-500"
          />
          <span className="text-sm text-slate-700 dark:text-slate-200">안쪽 그림자(inset) — 눌린 느낌</span>
        </label>
      </div>

      <button
        onClick={() => copy(`box-shadow: ${css};`)}
        className="mt-3 w-full rounded-xl bg-gradient-to-r from-slate-600 to-indigo-700 text-white font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
      >
        {copied ? '✅ CSS를 복사했습니다' : 'CSS 복사하기'}
      </button>

      <div className="mt-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3">
        <p className="text-xs font-mono text-slate-600 dark:text-slate-300 break-all">box-shadow: {css};</p>
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          자연스러운 그림자는 대개 아래로만 살짝 내려가고(가로 0), 색은 검정 대신 배경보다 조금 어두운
          남색 계열을 옅게 씁니다. 순수한 검정 그림자는 탁해 보입니다.
        </p>
      </div>
    </div>
  );
}
