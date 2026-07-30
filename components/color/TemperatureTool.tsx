'use client';
import { useMemo, useState } from 'react';
import { kelvinToRgb, rgbToHex, rgbString } from '@/lib/color';
import { CARD, ValueRow } from './ui';
import { TEMPERATURE_UI, type ColorLang } from '@/lib/color-ui-intl';

const PRESETS = [
  { k: 1900, key: 'candle' },
  { k: 2700, key: 'incandescent' },
  { k: 4000, key: 'warmWhite' },
  { k: 5600, key: 'blue' },
  { k: 6500, key: 'daylight' },
  { k: 9000, key: 'overcast' },
] as const;

export default function TemperatureTool({ lang = 'ko' }: { lang?: ColorLang } = {}) {
  const ui = TEMPERATURE_UI[lang];
  const [kelvin, setKelvin] = useState(4000);
  const [compare, setCompare] = useState(6500);

  const a = useMemo(() => kelvinToRgb(kelvin), [kelvin]);
  const b = useMemo(() => kelvinToRgb(compare), [compare]);

  return (
    <div>
      <div className="flex rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 h-40">
        <div className="flex-1 flex flex-col items-center justify-center" style={{ background: rgbToHex(a) }}>
          <span className="text-2xl font-black text-slate-900/70">{kelvin}K</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center" style={{ background: rgbToHex(b) }}>
          <span className="text-2xl font-black text-slate-900/70">{compare}K</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.left}</span>
          <span className="text-sm font-black text-orange-600 tabular-nums">{kelvin}K</span>
        </div>
        <input
          type="range" min={1000} max={12000} step={100} value={kelvin}
          onChange={e => setKelvin(Number(e.target.value))}
          className="w-full accent-orange-500" aria-label={ui.left}
        />
        <div className="flex items-baseline justify-between mt-3 mb-1.5">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.rightCompare}</span>
          <span className="text-sm font-black text-cyan-600 tabular-nums">{compare}K</span>
        </div>
        <input
          type="range" min={1000} max={12000} step={100} value={compare}
          onChange={e => setCompare(Number(e.target.value))}
          className="w-full accent-cyan-500" aria-label={ui.right}
        />
      </div>

      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-5 mb-2">{ui.commonTitle}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {PRESETS.map(p => (
          <button
            key={p.k}
            onClick={() => setKelvin(p.k)}
            className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
              kelvin === p.k
                ? 'border-orange-300 bg-orange-50 dark:bg-orange-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-orange-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded border border-slate-200 dark:border-slate-600 shrink-0" style={{ background: rgbToHex(kelvinToRgb(p.k)) }} />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.presets[p.key]}</span>
            </span>
            <span className="block text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{p.k}K · {ui.descs[p.key]}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <ValueRow label="HEX" value={rgbToHex(a).toUpperCase()} lang={lang} />
        <ValueRow label="RGB" value={rgbString(a)} lang={lang} />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.colderTitle}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.colderBody}
        </p>
      </div>
    </div>
  );
}
