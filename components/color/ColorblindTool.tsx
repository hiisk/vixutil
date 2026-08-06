'use client';
import { useMemo, useState } from 'react';
import { hexToRgb, rgbToHex, simulateCvd, judgeContrast, type CvdType } from '@/lib/color';
import { CARD, ColorInput } from './ui';
import { COLORBLIND_UI, type ColorLang } from '@/lib/color-ui-intl';

const TYPES: CvdType[] = ['protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'];


export default function ColorblindTool({ lang = 'ko' }: { lang?: ColorLang } = {}) {
  const ui = COLORBLIND_UI[lang];
  const [a, setA] = useState('#22c55e');
  const [b, setB] = useState('#ef4444');

  const rows = useMemo(() => {
    const ra = hexToRgb(a), rb = hexToRgb(b);
    if (!ra || !rb) return [];
    return TYPES.map(type => {
      const sa = simulateCvd(ra, type);
      const sb = simulateCvd(rb, type);
      // 시뮬레이션한 두 색이 서로 구분되는지 — 대비가 1.4 아래면 사실상 같은 색이다
      const ratio = judgeContrast(sa, sb).ratio;
      return { type, a: rgbToHex(sa), b: rgbToHex(sb), ratio, ok: ratio >= 1.4 };
    });
  }, [a, b]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <ColorInput value={a} onChange={setA} label={ui.first} />
        <ColorInput value={b} onChange={setB} label={ui.second} />
      </div>

      <div className="mt-4 flex rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 h-20">
        <div className="flex-1" style={{ background: a }} />
        <div className="flex-1" style={{ background: b }} />
      </div>
      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-2">{ui.normal}</p>

      <div className="flex flex-col gap-3 mt-5">
        {rows.map(r => (
          <div key={r.type} className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex h-16">
              <div className="flex-1" style={{ background: r.a }} />
              <div className="flex-1" style={{ background: r.b }} />
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900">
              <span className="hub-card-body">
                <span className="block text-sm font-bold text-slate-800 dark:text-slate-100">{ui.types[r.type]}</span>
                <span className="block text-[11px] text-slate-400 dark:text-slate-500">{ui.descs[r.type]}</span>
              </span>
              <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${
                r.ok
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 border-emerald-200 dark:border-emerald-900/60'
                  : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 border-rose-200 dark:border-rose-900/60'
              }`}>
                {r.ok ? ui.distinguishable : ui.hardToTell}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.adviceTitle}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.advice}
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">
          {ui.approxNote}
        </p>
      </div>
    </div>
  );
}
