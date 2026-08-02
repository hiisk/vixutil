'use client';
import { useState } from 'react';
import { Card, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';
import { DUTCH_PAY } from '@/lib/calc-l10n/dutch-pay';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

/**
 * 더치페이 — 다국어판.
 *
 * 반올림 단위를 고르게 둔다. 한국어판은 원 단위로 박혀 있는데, 통화마다 실제로
 * 주고받는 최소 단위가 다르다 — 유로·달러는 0.01, 엔은 1, 원은 보통 100.
 * 언어와 통화가 일대일이 아니므로 기본값을 언어로 정하지 않고 사람이 고른다.
 */
const STEPS = [0.01, 1, 10, 100, 1000];

interface Extra { id: number; name: string; amount: string; who: number }

export default function DutchPayIntl({ lang }: { lang: CalcLang }) {
  const c = DUTCH_PAY[lang].ui;
  const [total, setTotal] = useState('');
  const [people, setPeople] = useState('2');
  const [step, setStep] = useState(1);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [nextId, setNextId] = useState(1);
  const [result, setResult] = useState<{ shares: number[]; base: number; sum: number } | null>(null);

  const fmt = (n: number) =>
    n.toLocaleString(localeTag(lang), { maximumFractionDigits: step < 1 ? 2 : 0 });

  const n = Math.min(20, Math.max(2, parseInt(people, 10) || 2));

  function roundTo(v: number) {
    return Math.round(v / step) * step;
  }

  function calculate() {
    const t = parseFloat(total);
    if (isNaN(t) || t <= 0) return;
    const assigned = extras.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
    const base = (t - assigned) / n;
    const shares = Array.from({ length: n }, (_, i) => {
      const mine = extras
        .filter(e => e.who === i)
        .reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
      return roundTo(base + mine);
    });
    setResult({ shares, base: roundTo(base), sum: shares.reduce((s, v) => s + v, 0) });
  }

  function addExtra() {
    setExtras([...extras, { id: nextId, name: '', amount: '', who: 0 }]);
    setNextId(nextId + 1);
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.basic}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.total}</Label>
            <input type="number" value={total} onChange={e => setTotal(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.people}</Label>
              <input type="number" min={2} max={20} value={people} onChange={e => setPeople(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.rounding}</Label>
              <select value={step} onChange={e => setStep(Number(e.target.value))} className={selectCls}>
                {STEPS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{c.extras}</p>
          <button onClick={addExtra} className="text-xs font-bold text-blue-600 hover:underline">+ {c.addExtra}</button>
        </div>
        {extras.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-slate-500">{c.noExtras}</p>
        ) : (
          <div className="flex flex-col gap-2">
            {extras.map((e, i) => (
              <div key={e.id} className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                <input
                  type="text" value={e.name} placeholder={c.itemName}
                  onChange={ev => setExtras(extras.map((x, j) => j === i ? { ...x, name: ev.target.value } : x))}
                  className={inputCls}
                />
                <input
                  type="number" value={e.amount} placeholder={c.itemAmount}
                  onChange={ev => setExtras(extras.map((x, j) => j === i ? { ...x, amount: ev.target.value } : x))}
                  className={`${inputCls} w-28`}
                />
                <select
                  value={e.who}
                  onChange={ev => setExtras(extras.map((x, j) => j === i ? { ...x, who: Number(ev.target.value) } : x))}
                  className={`${selectCls} w-28`}
                >
                  {Array.from({ length: n }, (_, k) => (
                    <option key={k} value={k}>{c.person} {k + 1}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </Card>

      <PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn>

      {result && (
        <>
          <Card className="p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.result}</p>
            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {result.shares.map((s, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{c.person} {i + 1}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{fmt(s)}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400">{c.base}</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">{fmt(result.base)}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">{c.check}</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{fmt(result.sum)}</span>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
