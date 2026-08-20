'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, TabBar, RatioBar, SummaryCard } from '@/components/CalcShell';
import { BODY_FAT } from '@/lib/calc-l10n/body-fat';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Sex = 'm' | 'f';
type Mode = 'navy' | 'bmi';

// ACSM 등급 경계 — 남녀가 다르다.
const BANDS: Record<Sex, number[]> = { m: [6, 14, 18, 25], f: [14, 21, 25, 32] };

export default function BodyFatIntl({ lang }: { lang: CalcLang }) {
  const c = BODY_FAT[lang].ui;
  const tag = localeTag(lang);
  const [mode, setMode] = useState<Mode>('navy');
  const [sex, setSex] = useState<Sex>('m');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ bf: number; fat: number; lean: number } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 1 });
  const levels = [c.lv0, c.lv1, c.lv2, c.lv3, c.lv4];

  function calculate() {
    setError('');
    const w = parseFloat(weight) || 0;
    let bf: number;

    if (mode === 'navy') {
      const h = parseFloat(height);
      const n = parseFloat(neck);
      const wa = parseFloat(waist);
      const hp = parseFloat(hip);
      if (!(h > 0) || !(n > 0) || !(wa > 0) || (sex === 'f' && !(hp > 0))) { setError(c.errFields); setResult(null); return; }
      if (sex === 'm' && wa <= n) { setError(c.errWaist); setResult(null); return; }
      if (sex === 'f' && wa + hp <= n) { setError(c.errWaistHip); setResult(null); return; }
      bf = sex === 'm'
        ? 86.010 * Math.log10(wa - n) - 70.041 * Math.log10(h) + 36.76
        : 163.205 * Math.log10(wa + hp - n) - 97.684 * Math.log10(h) - 78.387;
    } else {
      const b = parseFloat(bmi);
      const a = parseFloat(age);
      if (!(b > 0) || !(a > 0)) { setError(c.errFields); setResult(null); return; }
      bf = 1.2 * b + 0.23 * a - 10.8 * (sex === 'm' ? 1 : 0) - 5.4;
    }

    bf = Math.max(0, Math.min(70, bf));
    setResult({ bf, fat: w > 0 ? (bf / 100) * w : 0, lean: w > 0 ? w - (bf / 100) * w : 0 });
  }

  const bandIndex = result ? BANDS[sex].findIndex(max => result.bf < max) : -1;
  const level = result ? levels[bandIndex === -1 ? 4 : bandIndex] : '';

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'navy' as Mode, label: c.tabNavy },
          { value: 'bmi' as Mode, label: c.tabBmi },
        ]}
        value={mode}
        onChange={m => { setMode(m); setResult(null); setError(''); }}
      />

      <Card className="p-5">
        <div className="flex gap-2 mb-4">
          {(['m', 'f'] as Sex[]).map(s => (
            <button key={s} type="button" onClick={() => { setSex(s); setResult(null); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                sex === s ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}>
              {s === 'm' ? c.male : c.female}
            </button>
          ))}
        </div>

        {mode === 'navy' ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label>{c.height}</Label>
              <input type="number" value={height} onChange={e => setHeight(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.neck}</Label>
              <input type="number" value={neck} onChange={e => setNeck(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.waist}</Label>
              <input type="number" value={waist} onChange={e => setWaist(e.target.value)} className={inputCls} />
            </div>
            {sex === 'f' && (
              <div>
                <Label>{c.hip}</Label>
                <input type="number" value={hip} onChange={e => setHip(e.target.value)} className={inputCls} />
              </div>
            )}
            <div className={sex === 'f' ? 'col-span-2' : ''}>
              <Label>{c.weight}</Label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className={inputCls} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-x-4 gap-y-5">
            <div>
              <Label>{c.bmi}</Label>
              <input type="number" step="0.1" value={bmi} onChange={e => setBmi(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.age}</Label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.weight}</Label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className={inputCls} />
            </div>
          </div>
        )}

        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        {error && <p className="mt-3 text-xs text-rose-500">{error}</p>}
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.result}</p>
            <p className="stat-value">{fmt(result.bf)}%</p>
            <p className="stat-sub mt-2">{level}</p>
          </div>

          {result.fat > 0 && (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                <SummaryCard label={c.fatMass} value={`${fmt(result.fat)} kg`} variant="red" />
                <SummaryCard label={c.leanMass} value={`${fmt(result.lean)} kg`} variant="green" />
              </div>
              <Card className="p-5">
                <RatioBar
                  a={result.lean} b={result.fat}
                  labelA={`${c.leanMass} ${fmt(result.lean)} kg`}
                  labelB={`${c.fatMass} ${fmt(result.fat)} kg`}
                />
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
}
