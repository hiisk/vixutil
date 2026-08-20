'use client';
import { useState } from 'react';
import { Card, CardHeader, Label, TabBar, inputCls } from '@/components/CalcShell';
import { PET_AGE } from '@/lib/calc-l10n/sizes';
import type { CalcLang } from '@/lib/calc-l10n/types';

/**
 * app/(ko)/calculator/pet-age/page.tsx의 식 그대로 — 첫해 15, 둘째 해 9,
 * 그 뒤 소형 4 · 중형 5 · 대형 6(고양이 4)씩 더한다.
 */
const PER_YEAR = { small: 4, medium: 5, large: 6, cat: 4 } as const;

function humanAge(age: number, perYear: number): number {
  if (age <= 0) return 0;
  if (age <= 1) return 15 * age;
  if (age <= 2) return 15 + 9 * (age - 1);
  return 24 + perYear * (age - 2);
}

const STAGE_MAX = [6, 24, 45, 60, Infinity];

type DogSize = 'small' | 'medium' | 'large';

export default function PetAgeIntl({ lang }: { lang: CalcLang }) {
  const c = PET_AGE[lang].ui;
  const [kind, setKind] = useState<'dog' | 'cat'>('dog');
  const [size, setSize] = useState<DogSize>('small');
  const [age, setAge] = useState('');

  const n = Number(age);
  const perYear = kind === 'cat' ? PER_YEAR.cat : PER_YEAR[size];
  const result = n > 0 && n <= 30 ? humanAge(n, perYear) : null;
  const stageIdx = result !== null ? STAGE_MAX.findIndex(m => result < m) : -1;
  const stageLabels = [c.st1, c.st2, c.st3, c.st4, c.st5];
  const stageDescs = [c.sd1, c.sd2, c.sd3, c.sd4, c.sd5];

  const sizes: { id: DogSize; label: string; hint: string }[] = [
    { id: 'small', label: c.small, hint: c.smallHint },
    { id: 'medium', label: c.medium, hint: c.mediumHint },
    { id: 'large', label: c.large, hint: c.largeHint },
  ];

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'dog', label: c.dog },
          { value: 'cat', label: c.cat },
        ]}
        value={kind}
        onChange={v => setKind(v as 'dog' | 'cat')}
      />

      {kind === 'dog' && (
        <div className="grid grid-cols-3 gap-2">
          {sizes.map(s => (
            <button
              key={s.id}
              onClick={() => setSize(s.id)}
              className={`rounded-xl border px-3 py-3 text-center transition-colors ${
                size === s.id
                  ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/30'
                  : 'chip-off hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className={`block text-sm font-bold ${size === s.id ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-200'}`}>
                {s.label}
              </span>
              <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.hint}</span>
            </button>
          ))}
        </div>
      )}

      <Card className="p-5">
        <Label>{c.ageLabel}</Label>
        <input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          placeholder={c.agePh}
          min={0}
          step={0.5}
          className={inputCls}
        />
      </Card>

      {result !== null && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-sub mb-2">{c.humanLabel}</p>
            <p className="text-slate-900 dark:text-slate-50 text-5xl font-bold">{Math.round(result)}</p>
            <p className="text-slate-500 dark:text-slate-400 text-xl mt-1">{c.yearsUnit}</p>
            {stageIdx >= 0 && <p className="stat-sub mt-3 font-semibold">{stageLabels[stageIdx]}</p>}
          </div>

          {stageIdx >= 0 && (
            <Card className="p-5">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{stageDescs[stageIdx]}</p>
            </Card>
          )}

          <Card>
            <CardHeader title={c.tableTitle} sub={c.tableSub} />
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {[1, 2, 3, 5, 7, 10, 13, 15].map(y => (
                <button
                  key={y}
                  onClick={() => setAge(String(y))}
                  className={`w-full px-5 py-3 flex justify-between items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                    n === y ? 'bg-blue-50 dark:bg-blue-950/30' : ''
                  }`}
                >
                  <span className={`font-semibold ${n === y ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-200'}`}>{y}</span>
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">{Math.round(humanAge(y, perYear))}</span>
                </button>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
