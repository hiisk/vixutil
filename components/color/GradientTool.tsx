'use client';
import { useMemo, useState } from 'react';
import { CARD, ColorInput, useCopy } from './ui';
import { GRADIENT_UI, type ColorLang } from '@/lib/color-ui-intl';

const PRESETS = [
  { from: '#f97316', to: '#db2777' },
  { from: '#0ea5e9', to: '#4f46e5' },
  { from: '#22c55e', to: '#0d9488' },
  { from: '#1e293b', to: '#4c1d95' },
];

export default function GradientTool({ lang = 'ko' }: { lang?: ColorLang } = {}) {
  const ui = GRADIENT_UI[lang];
  const [from, setFrom] = useState('#8b5cf6');
  const [to, setTo] = useState('#0ea5e9');
  const [useMid, setUseMid] = useState(false);
  const [mid, setMid] = useState('#d946ef');
  const [angle, setAngle] = useState(135);
  const [radial, setRadial] = useState(false);
  const { copied, copy } = useCopy();

  const css = useMemo(() => {
    const stops = useMid ? `${from}, ${mid}, ${to}` : `${from}, ${to}`;
    return radial ? `radial-gradient(circle, ${stops})` : `linear-gradient(${angle}deg, ${stops})`;
  }, [from, to, mid, useMid, angle, radial]);

  return (
    <div>
      <div className="h-44 rounded-lg border border-slate-200 dark:border-slate-700" style={{ background: css }} />

      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <ColorInput value={from} onChange={setFrom} label={ui.startColor} />
        <ColorInput value={to} onChange={setTo} label={ui.endColor} />
      </div>

      <div className={`${CARD} mt-4`}>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={useMid} onChange={e => setUseMid(e.target.checked)} className="w-4 h-4 accent-fuchsia-500" />
          <span className="text-sm text-slate-700 dark:text-slate-200">{ui.addMid}</span>
        </label>
        {useMid && <div className="mt-3"><ColorInput value={mid} onChange={setMid} label={ui.midColor} /></div>}

        <label className="flex items-center gap-3 cursor-pointer mt-3">
          <input type="checkbox" checked={radial} onChange={e => setRadial(e.target.checked)} className="w-4 h-4 accent-fuchsia-500" />
          <span className="text-sm text-slate-700 dark:text-slate-200">{ui.radial}</span>
        </label>

        {!radial && (
          <>
            <div className="flex items-baseline justify-between mt-4 mb-1.5">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.angle}</span>
              <span className="text-sm font-black text-fuchsia-600 tabular-nums">{angle}°</span>
            </div>
            <input
              type="range" min={0} max={360} value={angle}
              onChange={e => setAngle(Number(e.target.value))}
              className="w-full accent-fuchsia-500" aria-label={ui.angle}
            />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[0, 90, 135, 180].map(a => (
                <button
                  key={a}
                  onClick={() => setAngle(a)}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-fuchsia-300 transition-colors"
                >
                  {a}°
                </button>
              ))}
            </div>
          </>
        )}

        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.presets}</p>
        <div className="grid grid-cols-4 gap-2">
          {PRESETS.map((p, i) => (
            <button
              key={ui.presetNames[i]}
              onClick={() => { setFrom(p.from); setTo(p.to); }}
              className="rounded-lg h-10 border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
            >
              {ui.presetNames[i]}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => copy(`background: ${css};`)}
        className="mt-3 w-full rounded-xl bg-sec font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
      >
        {copied ? ui.copiedCss : ui.copyCss}
      </button>

      <div className="mt-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3">
        <p className="text-xs font-mono text-slate-600 dark:text-slate-300 break-all">background: {css};</p>
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
