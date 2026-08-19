'use client';
import { useState } from 'react';
import { Card } from '@/components/CalcShell';
import { AVERAGE } from '@/lib/calc-l10n/daily';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

/* 계산은 한국어판 app/(ko)/calculator/average와 같다 — 답이 갈리면 안 된다 */
function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,]+/)
    .filter(s => s !== '')
    .map(Number)
    .filter(n => Number.isFinite(n));
}

function median(sorted: number[]): number {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/* 가장 많이 나온 값들 — 모두 한 번씩이면 최빈값은 없다 */
function modes(nums: number[]): number[] {
  const count = new Map<number, number>();
  for (const n of nums) count.set(n, (count.get(n) ?? 0) + 1);
  const max = Math.max(...count.values());
  if (max === 1) return [];
  return [...count.entries()].filter(([, c]) => c === max).map(([n]) => n).sort((a, b) => a - b);
}

export default function AverageIntl({ lang }: { lang: CalcLang }) {
  const c = AVERAGE[lang].ui;
  const tag = localeTag(lang);
  const [text, setText] = useState('');

  const fmt = (n: number) => {
    const r = Math.round(n * 10000) / 10000;
    return r.toLocaleString(tag, { maximumFractionDigits: 4 });
  };

  const nums = parseNumbers(text);
  const stats = (() => {
    if (nums.length === 0) return null;
    const sorted = [...nums].sort((a, b) => a - b);
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    const sqDiff = nums.reduce((a, b) => a + (b - mean) ** 2, 0);
    return {
      n: nums.length,
      sum,
      mean,
      median: median(sorted),
      modes: modes(nums),
      min: sorted[0],
      max: sorted[sorted.length - 1],
      range: sorted[sorted.length - 1] - sorted[0],
      sampleSd: nums.length > 1 ? Math.sqrt(sqDiff / (nums.length - 1)) : null,
      popSd: Math.sqrt(sqDiff / nums.length),
    };
  })();

  const rows: [string, string][] = stats
    ? [
        [c.median, fmt(stats.median)],
        [c.mode, stats.modes.length ? stats.modes.map(fmt).join(', ') : c.noMode],
        [c.minMax, `${fmt(stats.min)} · ${fmt(stats.max)}`],
        [c.range, fmt(stats.range)],
        [c.sampleSd, stats.sampleSd === null ? c.needTwo : fmt(stats.sampleSd)],
        [c.popSd, fmt(stats.popSd)],
      ]
    : [];

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{c.input}</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={c.placeholder}
          rows={6}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-base font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-slate-400 dark:text-slate-500">{c.hint}</p>
          <button
            onClick={() => setText('')}
            className="text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          >
            {c.clear}
          </button>
        </div>
      </Card>

      {stats && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-sub mb-2">{c.mean}</p>
            <p className="text-slate-900 dark:text-slate-50 text-5xl font-black">{fmt(stats.mean)}</p>
            <p className="stat-sub mt-3 opacity-90">
              {c.count} {fmt(stats.n)} · {c.sum} {fmt(stats.sum)}
            </p>
          </div>

          <Card>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map(([label, value]) => (
                <div key={label} className="px-5 py-3 flex justify-between gap-3 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{label}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100 text-right">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          {Math.abs(stats.mean - stats.median) > (stats.range || 1) * 0.15 && (
            <Card className="p-5 border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30">
              <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">{c.skewNote}</p>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
