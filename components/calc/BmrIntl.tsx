'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, TabBar } from '@/components/CalcShell';
import { BMR } from '@/lib/calc-l10n/health';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Sex = 'm' | 'f';

export default function BmrIntl({ lang }: { lang: CalcLang }) {
  const c = BMR[lang].ui;
  const tag = localeTag(lang);
  const [sex, setSex] = useState<Sex>('m');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ mifflin: number; harris: number } | null>(null);

  const fmt = (n: number) => Math.round(n).toLocaleString(tag);

  function calculate() {
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!(a > 0) || !(h > 0) || !(w > 0)) return;
    setResult({
      mifflin: sex === 'm' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161,
      harris: sex === 'm'
        ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a
        : 447.593 + 9.247 * w + 3.098 * h - 4.330 * a,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'm' as Sex, label: c.male },
          { value: 'f' as Sex, label: c.female },
        ]}
        value={sex}
        onChange={s => { setSex(s); setResult(null); }}
      />

      <Card className="p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.section}</p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>{c.age}</Label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.height}</Label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.weight}</Label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-blue-600 rounded-2xl p-5">
            <p className="text-blue-200 text-xs mb-1">{c.mifflin} · {c.recommended}</p>
            <p className="text-white text-3xl font-black">{fmt(result.mifflin)}</p>
            <p className="text-blue-200 text-xs mt-1">{c.unit}</p>
          </div>
          <Card className="p-5">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{c.harris}</p>
            <p className="text-slate-800 dark:text-slate-100 text-3xl font-black">{fmt(result.harris)}</p>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">{c.unit}</p>
          </Card>
        </div>
      )}
    </div>
  );
}
