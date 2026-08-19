'use client';
import { useState } from 'react';
import { Card, Label, inputCls, selectCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';
import { GPA } from '@/lib/calc-l10n/gpa';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Scale = '4.0' | '4.3' | '4.5';

/**
 * 같은 문자 등급이라도 척도마다 값이 다르다 — 그래서 척도를 고르게 해 두었다.
 * 4.5 척도는 마이너스 등급을 쓰지 않으므로 목록 자체가 짧다. 억지로 A−를
 * 끼워 넣으면 B+와 같은 값이 되어 고를 이유가 없는 항목이 생긴다.
 */
const POINTS: Record<Scale, Record<string, number>> = {
  '4.0': { 'A+': 4.0, A: 4.0, 'A−': 3.7, 'B+': 3.3, B: 3.0, 'B−': 2.7, 'C+': 2.3, C: 2.0, 'C−': 1.7, 'D+': 1.3, D: 1.0, F: 0 },
  '4.3': { 'A+': 4.3, A: 4.0, 'A−': 3.7, 'B+': 3.3, B: 3.0, 'B−': 2.7, 'C+': 2.3, C: 2.0, 'C−': 1.7, 'D+': 1.3, D: 1.0, F: 0 },
  '4.5': { 'A+': 4.5, A: 4.0, 'B+': 3.5, B: 3.0, 'C+': 2.5, C: 2.0, 'D+': 1.5, D: 1.0, F: 0 },
};

interface Row { name: string; credits: string; grade: string }

export default function GpaIntl({ lang }: { lang: CalcLang }) {
  const c = GPA[lang].ui;
  const tag = localeTag(lang);
  const [scale, setScale] = useState<Scale>('4.0');
  const [rows, setRows] = useState<Row[]>([
    { name: '', credits: '3', grade: 'A' },
    { name: '', credits: '3', grade: 'B+' },
    { name: '', credits: '2', grade: 'A+' },
  ]);
  const [result, setResult] = useState<{ gpa: number; credits: number; points: number } | null>(null);

  const grades = Object.keys(POINTS[scale]);

  function update(i: number, key: keyof Row, v: string) {
    setRows(prev => prev.map((r, idx) => (idx === i ? { ...r, [key]: v } : r)));
  }

  function calculate() {
    const table = POINTS[scale];
    let credits = 0;
    let points = 0;
    for (const r of rows) {
      const cr = parseFloat(r.credits);
      const pt = table[r.grade];
      if (!(cr > 0) || pt === undefined) continue;
      credits += cr;
      points += cr * pt;
    }
    if (credits === 0) return;
    setResult({ gpa: points / credits, credits, points });
  }

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={(['4.0', '4.3', '4.5'] as Scale[]).map(s => ({ value: s, label: s }))}
        value={scale}
        onChange={s => {
          // 4.5로 옮기면 A−·B−·C− 가 사라진다. 남겨 두면 조용히 계산에서 빠지므로
          // 부호를 떼어 낸 기본 등급으로 옮긴다 — 그건 어느 척도에나 있다.
          setRows(prev => prev.map(r => (POINTS[s][r.grade] === undefined ? { ...r, grade: r.grade[0] } : r)));
          setScale(s);
          setResult(null);
        }}
      />

      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-2">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-7 gap-2 items-end">
              <div className="col-span-3">
                {i === 0 && <Label>{c.course}</Label>}
                <input type="text" value={row.name} onChange={e => update(i, 'name', e.target.value)} className={inputCls} />
              </div>
              <div className="col-span-2">
                {i === 0 && <Label>{c.credits}</Label>}
                <input type="number" value={row.credits} onChange={e => update(i, 'credits', e.target.value)} className={inputCls} />
              </div>
              <div className="col-span-2">
                {i === 0 && <Label>{c.grade}</Label>}
                <select value={row.grade} onChange={e => update(i, 'grade', e.target.value)} className={selectCls}>
                  {grades.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
          ))}
          {rows.length < 15 && (
            <button type="button" onClick={() => setRows(prev => [...prev, { name: '', credits: '3', grade: 'A' }])}
              className="mt-1 text-sm text-blue-600 font-semibold hover:underline text-left">
              {c.add}
            </button>
          )}
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.gpa}</p>
            <p className="stat-value">
              {result.gpa.toLocaleString(tag, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / {scale}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <SummaryCard label={c.totalCredits} value={result.credits.toLocaleString(tag)} />
            <SummaryCard label={c.totalPoints} value={result.points.toLocaleString(tag, { maximumFractionDigits: 1 })} />
          </div>
        </>
      )}
    </div>
  );
}
