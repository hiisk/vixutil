'use client';
import { useState } from 'react';
import { Card, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';
import { UNIT_WEIGHT } from '@/lib/calc-l10n/unit-weight';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

/**
 * 무게 단위 변환 — 다국어판.
 *
 * 단위 이름은 기호 그대로 둔다(mg, kg, lb). 언어마다 풀어 쓰면 목록이 길어지고,
 * 정작 이 화면에서 사람이 찾는 건 기호다. 근·돈·냥은 한국어판에만 있다 —
 * 자세한 이유는 lib/calc-l10n/unit-weight.ts 주석에 적었다.
 */
const UNITS: { key: string; label: string; toKg: number }[] = [
  { key: 'mg', label: 'mg', toKg: 1e-6 },
  { key: 'g', label: 'g', toKg: 0.001 },
  { key: 'kg', label: 'kg', toKg: 1 },
  { key: 't', label: 't', toKg: 1000 },
  { key: 'oz', label: 'oz', toKg: 0.028349523125 },
  { key: 'lb', label: 'lb', toKg: 0.45359237 },
  { key: 'stone', label: 'stone', toKg: 6.35029318 },
];

function fmt(val: number, lang: CalcLang): string {
  if (val === 0) return '0';
  if (Math.abs(val) >= 0.000001 && Math.abs(val) < 1e13) {
    return parseFloat(val.toPrecision(8)).toLocaleString(localeTag(lang), { maximumSignificantDigits: 8 });
  }
  return val.toExponential(5);
}

export default function UnitWeightIntl({ lang }: { lang: CalcLang }) {
  const c = UNIT_WEIGHT[lang].ui;
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kg');
  const [results, setResults] = useState<{ key: string; label: string; val: number }[] | null>(null);

  function calculate() {
    const n = parseFloat(value);
    if (isNaN(n)) return;
    const from = UNITS.find(u => u.key === fromUnit)!;
    const kg = n * from.toKg;
    setResults(UNITS.map(u => ({ key: u.key, label: u.label, val: kg / u.toKg })));
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.input}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.number}</Label>
            <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder={c.placeholder} className={inputCls} />
          </div>
          <div>
            <Label>{c.unit}</Label>
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className={selectCls}>
              {UNITS.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <PrimaryBtn onClick={calculate}>{c.convert}</PrimaryBtn>
        </div>
      </Card>

      {results && (
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.result}</p>
          <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
            {results.map(r => (
              <div key={r.key} className={`flex justify-between items-center py-3 ${r.key === fromUnit ? 'font-bold' : ''}`}>
                <span className={`text-sm ${r.key === fromUnit ? 'text-blue-600' : 'text-slate-500 dark:text-slate-400'}`}>
                  {r.label}
                  {r.key === fromUnit && <span className="ml-1 text-xs text-blue-400">{c.entered}</span>}
                </span>
                <span className={`text-sm font-mono ${r.key === fromUnit ? 'text-blue-700 dark:text-blue-300 font-black' : 'text-slate-800 dark:text-slate-100'}`}>
                  {fmt(r.val, lang)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
