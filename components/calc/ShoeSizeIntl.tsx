'use client';
import { useState } from 'react';
import { Card, Label, TabBar, inputCls } from '@/components/CalcShell';
import { SHOE_SIZE } from '@/lib/calc-l10n/sizes';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

/**
 * app/(ko)/calculator/shoe-size/page.tsx의 표를 그대로 옮겼다 — 값이 어긋나면
 * 한국어판과 답이 달라진다. UK = US남성 − 1, US여성 = US남성 + 1.5.
 */
const CHART = [
  { mm: 220, eu: 35, usM: 3.5 },
  { mm: 225, eu: 35.5, usM: 4 },
  { mm: 230, eu: 36, usM: 4.5 },
  { mm: 235, eu: 37, usM: 5 },
  { mm: 240, eu: 38, usM: 6 },
  { mm: 245, eu: 38.5, usM: 6.5 },
  { mm: 250, eu: 39.5, usM: 7 },
  { mm: 255, eu: 40, usM: 7.5 },
  { mm: 260, eu: 41, usM: 8 },
  { mm: 265, eu: 42, usM: 8.5 },
  { mm: 270, eu: 43, usM: 9 },
  { mm: 275, eu: 43.5, usM: 9.5 },
  { mm: 280, eu: 44, usM: 10 },
  { mm: 285, eu: 45, usM: 10.5 },
  { mm: 290, eu: 45.5, usM: 11 },
  { mm: 295, eu: 46, usM: 11.5 },
  { mm: 300, eu: 47, usM: 12.5 },
];

const nearest = (mm: number) =>
  CHART.reduce((best, row) => (Math.abs(row.mm - mm) < Math.abs(best.mm - mm) ? row : best));

export default function ShoeSizeIntl({ lang }: { lang: CalcLang }) {
  const c = SHOE_SIZE[lang].ui;
  const tag = localeTag(lang);
  const [unit, setUnit] = useState<'cm' | 'mm'>('cm');
  const [foot, setFoot] = useState('');

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 1 });

  const raw = parseFloat(foot);
  const mm = unit === 'cm' ? raw * 10 : raw;
  const valid = mm >= 200 && mm <= 320;
  const row = valid ? nearest(mm) : null;
  // 걸을 때 발이 앞으로 밀린다 — 5~10mm 여유의 가운데인 7mm를 더한다
  const reco = valid ? nearest(mm + 7) : null;

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <div className="mb-3">
          <TabBar
            options={[{ value: 'cm', label: 'cm' }, { value: 'mm', label: 'mm' }]}
            value={unit}
            onChange={v => { setUnit(v as 'cm' | 'mm'); setFoot(''); }}
          />
        </div>
        <Label>{c.footLen}</Label>
        <input
          type="number"
          value={foot}
          onChange={e => setFoot(e.target.value)}
          placeholder={unit === 'cm' ? '25.5' : '255'}
          step={unit === 'cm' ? 0.1 : 1}
          className={inputCls}
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{c.hint}</p>
      </Card>

      {row && reco && (
        <>
          <div className="stat-pri">
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center mb-4">
              {c.footLen} {fmt(mm)} mm · {fmt(mm / 10)} cm
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center">
              <div>
                <p className="stat-label">EU</p>
                <p className="stat-value">{fmt(row.eu)}</p>
              </div>
              <div>
                <p className="stat-label">UK</p>
                <p className="stat-value">{fmt(row.usM - 1)}</p>
              </div>
              <div>
                <p className="stat-label">{c.usM}</p>
                <p className="stat-value">{fmt(row.usM)}</p>
              </div>
              <div>
                <p className="stat-label">{c.usW}</p>
                <p className="stat-value">{fmt(row.usM + 1.5)}</p>
              </div>
            </div>
          </div>

          <Card className="p-5 border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30">
            <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
              <strong>{c.recoTitle}</strong> — {c.recoBody}{' '}
              <strong>
                {reco.mm} mm ({fmt(reco.mm / 10)} cm) · EU {fmt(reco.eu)} · UK {fmt(reco.usM - 1)} · {c.usM} {fmt(reco.usM)} · {c.usW} {fmt(reco.usM + 1.5)}
              </strong>
            </p>
          </Card>

          <Card>
            <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
              <p className="label-caps">{c.chart}</p>
            </div>
            <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 grid grid-cols-6 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>mm</span>
              <span className="text-right">{c.cmCol}</span>
              <span className="text-right">EU</span>
              <span className="text-right">UK</span>
              <span className="text-right">{c.usM}</span>
              <span className="text-right">{c.usW}</span>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-96 overflow-y-auto">
              {CHART.map(r => (
                <button
                  key={r.mm}
                  onClick={() => setFoot(unit === 'cm' ? String(r.mm / 10) : String(r.mm))}
                  className={`w-full px-5 py-2.5 grid grid-cols-6 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                    r.mm === row.mm ? 'bg-blue-50 dark:bg-blue-950/30' : ''
                  }`}
                >
                  <span className={`font-semibold text-left ${r.mm === row.mm ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-200'}`}>
                    {r.mm}
                  </span>
                  <span className="text-right text-slate-500 dark:text-slate-400">{fmt(r.mm / 10)}</span>
                  <span className="text-right text-slate-500 dark:text-slate-400">{fmt(r.eu)}</span>
                  <span className="text-right text-slate-500 dark:text-slate-400">{fmt(r.usM - 1)}</span>
                  <span className="text-right text-slate-500 dark:text-slate-400">{fmt(r.usM)}</span>
                  <span className="text-right text-slate-500 dark:text-slate-400">{fmt(r.usM + 1.5)}</span>
                </button>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
