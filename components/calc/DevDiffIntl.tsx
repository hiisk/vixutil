'use client';
import { useState } from 'react';
import { Card, Label, PrimaryBtn } from '@/components/CalcShell';
import { DEV_DIFF } from '@/lib/calc-l10n/dev-tools5';
import type { CalcLang } from '@/lib/calc-l10n/types';

type Line = { kind: 'same' | 'add' | 'del'; text: string };

/** 최장 공통 부분수열 — diff·git과 같은 생각이다. */
function diffLines(a: string[], b: string[]): Line[] {
  const n = a.length, m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);

  const out: Line[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { out.push({ kind: 'same', text: a[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ kind: 'del', text: a[i] }); i++; }
    else { out.push({ kind: 'add', text: b[j] }); j++; }
  }
  while (i < n) out.push({ kind: 'del', text: a[i++] });
  while (j < m) out.push({ kind: 'add', text: b[j++] });
  return out;
}

export default function DevDiffIntl({ lang }: { lang: CalcLang }) {
  const c = DEV_DIFF[lang].ui;
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [result, setResult] = useState<Line[] | null>(null);

  function compare() {
    const a = left.split('\n').slice(0, 1000);
    const b = right.split('\n').slice(0, 1000);
    setResult(diffLines(a, b));
  }

  const counts = result
    ? { add: result.filter(l => l.kind === 'add').length, del: result.filter(l => l.kind === 'del').length, same: result.filter(l => l.kind === 'same').length }
    : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-3">
        {[[c.original, left, setLeft], [c.modified, right, setRight]].map(([label, val, set]) => (
          <Card key={label as string} className="p-4">
            <Label>{label as string}</Label>
            <textarea
              value={val as string}
              onChange={e => (set as (v: string) => void)(e.target.value)}
              rows={10}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Card>
        ))}
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 text-center">{c.limit}</p>

      <PrimaryBtn onClick={compare}>{c.compare}</PrimaryBtn>

      {result && counts && (
        <Card className="p-5">
          <div className="flex items-center gap-4 mb-3 text-xs font-bold">
            <span className="text-emerald-600">+ {counts.add} {c.added}</span>
            <span className="text-rose-600">− {counts.del} {c.removed}</span>
            <span className="text-slate-400 dark:text-slate-500">{counts.same} {c.same}</span>
          </div>
          {counts.add === 0 && counts.del === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">{c.identical}</p>
          ) : (
            <pre className="text-xs font-mono max-h-[32rem] overflow-auto">
              {result.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.kind === 'add' ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300'
                      : l.kind === 'del' ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300'
                        : 'text-slate-500 dark:text-slate-400'
                  }
                >
                  <span className="select-none opacity-60">{l.kind === 'add' ? '+ ' : l.kind === 'del' ? '− ' : '  '}</span>
                  {l.text || ' '}
                </div>
              ))}
            </pre>
          )}
        </Card>
      )}
    </div>
  );
}
