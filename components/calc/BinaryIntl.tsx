'use client';
import { useState } from 'react';
import { Card, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';
import { BINARY } from '@/lib/calc-l10n/binary';
import type { CalcLang } from '@/lib/calc-l10n/types';

type Base = 2 | 8 | 10 | 16;

const BASES: { value: Base; key: string; hint: string }[] = [
  { value: 2, key: 'b2', hint: 'hint2' },
  { value: 8, key: 'b8', hint: 'hint8' },
  { value: 10, key: 'b10', hint: 'hint10' },
  { value: 16, key: 'b16', hint: 'hint16' },
];

/** 2진수를 네 자리씩 띄운다 — 한 묶음이 16진수 한 자리다. */
function formatBinary(bin: string): string {
  const padded = bin.padStart(Math.ceil(bin.length / 4) * 4, '0');
  return padded.match(/.{1,4}/g)?.join(' ') ?? padded;
}

function validateInput(val: string, base: Base): boolean {
  if (!val) return false;
  const patterns: Record<Base, RegExp> = {
    2: /^[01]+$/, 8: /^[0-7]+$/, 10: /^-?\d+$/, 16: /^[0-9a-fA-F]+$/,
  };
  return patterns[base].test(val.trim());
}

interface ConvertResult { bin: string; oct: string; dec: string; hex: string; binFormatted: string }

export default function BinaryIntl({ lang }: { lang: CalcLang }) {
  const c = BINARY[lang].ui;
  const [value, setValue] = useState('');
  const [base, setBase] = useState<Base>(10);
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    const trimmed = value.trim();
    if (!trimmed) { setError(c.empty); return; }
    if (!validateInput(trimmed, base)) { setError(c.invalid); return; }
    const decimal = parseInt(trimmed, base);
    if (!isFinite(decimal)) { setError(c.invalid); return; }

    setResult({
      bin: decimal >= 0 ? decimal.toString(2) : '-' + Math.abs(decimal).toString(2),
      oct: decimal.toString(8),
      dec: decimal.toString(10),
      hex: decimal.toString(16).toUpperCase(),
      binFormatted: decimal >= 0
        ? formatBinary(decimal.toString(2))
        : '-' + formatBinary(Math.abs(decimal).toString(2)),
    });
  }

  const rows: { base: Base; key: string; display: string }[] = result
    ? [
        { base: 2, key: 'b2', display: result.binFormatted },
        { base: 8, key: 'b8', display: result.oct },
        { base: 10, key: 'b10', display: result.dec },
        { base: 16, key: 'b16', display: result.hex },
      ]
    : [];

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.input}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.base}</Label>
            <select value={base} onChange={e => { setBase(Number(e.target.value) as Base); setResult(null); setError(''); }} className={selectCls}>
              {BASES.map(b => <option key={b.value} value={b.value}>{c[b.key]}</option>)}
            </select>
          </div>
          <div>
            <Label>
              {c.input} <span className="font-normal text-slate-400 dark:text-slate-500">{c[BASES.find(b => b.value === base)!.hint]}</span>
            </Label>
            <input type="text" inputMode="text" value={value} onChange={e => setValue(e.target.value)} className={inputCls} />
          </div>
        </div>
        {error && <p className="mt-3 text-xs font-semibold text-rose-600">{error}</p>}
        <div className="mt-4">
          <PrimaryBtn onClick={calculate}>{c.convert}</PrimaryBtn>
        </div>
      </Card>

      {result && (
        <Card className="p-5">
          <p className="label-caps mb-3">{c.result}</p>
          <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map(r => (
              <div key={r.base} className={`flex justify-between items-center gap-3 py-3 ${r.base === base ? 'font-bold' : ''}`}>
                <span className={`text-sm shrink-0 ${r.base === base ? 'text-blue-600' : 'text-slate-500 dark:text-slate-400'}`}>
                  {c[r.key]}
                  {r.base === base && <span className="ml-1 text-xs text-blue-400">{c.entered}</span>}
                </span>
                <span className={`text-sm font-mono break-all text-right ${r.base === base ? 'text-blue-700 dark:text-blue-300 font-black' : 'text-slate-800 dark:text-slate-100'}`}>
                  {r.display}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-5">
        <p className="label-caps mb-3">{c.table}</p>
        <div className="grid grid-cols-4 gap-x-3 gap-y-1.5 text-xs font-mono">
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="flex justify-between text-slate-600 dark:text-slate-300">
              <span className="text-slate-400 dark:text-slate-500">{i}</span>
              <span>{i.toString(2).padStart(4, '0')}</span>
              <span className="text-slate-400 dark:text-slate-500">{i.toString(16).toUpperCase()}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
