'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import { TIP } from '@/lib/calc-l10n/tip';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

/**
 * 팁 계산기 — 다국어판.
 *
 * 통화 기호를 넣지 않는다. 숫자만 받으면 달러든 유로든 엔이든 그대로 쓸 수
 * 있고, 언어와 통화가 일대일이 아니라서(스페인어권만 해도 열 몇 나라다)
 * 기호를 붙이는 순간 누군가에게는 틀린 표시가 된다.
 *
 * 팁 비율의 기본값도 두지 않았다. 15%를 미리 넣어 두면 그것이 표준이라는
 * 뜻이 되는데, 일본·유럽에서는 사실이 아니다.
 */
const RATES = [5, 10, 12, 15, 18, 20, 25];

export default function TipIntl({ lang }: { lang: CalcLang }) {
  const c = TIP[lang].ui;
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(10);
  const [people, setPeople] = useState('1');
  const [result, setResult] = useState<{ base: number; tip: number; total: number; each: number } | null>(null);

  const fmt = (n: number) => n.toLocaleString(localeTag(lang), { maximumFractionDigits: 2 });

  function calculate() {
    const base = parseFloat(amount);
    const n = Math.max(1, parseInt(people, 10) || 1);
    if (isNaN(base) || base <= 0) return;
    const tip = (base * rate) / 100;
    const total = base + tip;
    setResult({ base, tip, total, each: total / n });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.amount}</Label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className={inputCls} />
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{c.hintTax}</p>
          </div>
          <div>
            <Label>{c.rate}</Label>
            <div className="flex flex-wrap gap-1.5">
              {RATES.map(r => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                    r === rate
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {r}%
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">{c.hintService}</p>
          </div>
          <div>
            <Label>{c.people}</Label>
            <input type="number" min={1} value={people} onChange={e => setPeople(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="mt-4">
          <PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn>
        </div>
      </Card>

      {result && (
        <>
          <Card className="p-5 text-center">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">{c.each}</p>
            <p className="text-4xl font-black text-blue-600">{fmt(result.each)}</p>
          </Card>

          <Card className="p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.detail}</p>
            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {[
                [c.base, result.base],
                [c.tipAmount, result.tip],
                [c.total, result.total],
              ].map(([label, v]) => (
                <div key={label as string} className="flex justify-between items-center py-2.5 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{label}</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-100">{fmt(v as number)}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
