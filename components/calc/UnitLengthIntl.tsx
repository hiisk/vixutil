'use client';
import { useState } from 'react';
import { Card, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';
import { UNIT_LENGTH } from '@/lib/calc-l10n/unit-length';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

/** 길이 단위 변환 — 다국어판. 아홉 개 모두 국제 정의가 있어 한국어판과 목록이 같다. */
const UNITS: { key: string; label: string; toMeter: number }[] = [
  { key: 'mm', label: 'mm', toMeter: 0.001 },
  { key: 'cm', label: 'cm', toMeter: 0.01 },
  { key: 'm', label: 'm', toMeter: 1 },
  { key: 'km', label: 'km', toMeter: 1000 },
  { key: 'in', label: 'in', toMeter: 0.0254 },
  { key: 'ft', label: 'ft', toMeter: 0.3048 },
  { key: 'yd', label: 'yd', toMeter: 0.9144 },
  { key: 'mi', label: 'mi', toMeter: 1609.344 },
  { key: 'nmi', label: 'NM', toMeter: 1852 },
];

function fmt(val: number, lang: CalcLang): string {
  if (val === 0) return '0';
  if (Math.abs(val) >= 0.0001 && Math.abs(val) < 1e12) {
    return parseFloat(val.toPrecision(8)).toLocaleString(localeTag(lang), { maximumSignificantDigits: 8 });
  }
  return val.toExponential(5);
}

export default function UnitLengthIntl({ lang }: { lang: CalcLang }) {
  const c = UNIT_LENGTH[lang].ui;
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [results, setResults] = useState<{ key: string; label: string; val: number }[] | null>(null);

  function calculate() {
    const n = parseFloat(value);
    if (isNaN(n)) return;
    const from = UNITS.find(u => u.key === fromUnit)!;
    const meters = n * from.toMeter;
    setResults(UNITS.map(u => ({ key: u.key, label: u.label, val: meters / u.toMeter })));
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.input}</p>
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
          <p className="label-caps mb-3">{c.result}</p>
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
