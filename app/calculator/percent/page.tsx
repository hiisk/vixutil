'use client';
import { useState } from 'react';
import CalcShell, { Card, TabBar } from '@/components/CalcShell';

type Mode = 'ratio' | 'amount' | 'change';

function InputRow({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-500 dark:text-slate-400 w-32 shrink-0">{label}</span>
      <input type="number" value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  );
}

export default function PercentPage() {
  const [mode, setMode] = useState<Mode>('ratio');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [dir, setDir] = useState<'up' | 'down'>('up');

  const result = (() => {
    const av = Number(a);
    const bv = Number(b);
    if (!av || !bv) return null;
    if (mode === 'ratio') return { value: (av / bv) * 100, label: `${a}은 ${b}의 몇 %` };
    if (mode === 'amount') return { value: bv * av / 100, label: `${b}의 ${a}%` };
    const changed = dir === 'up' ? bv * (1 + av / 100) : bv * (1 - av / 100);
    return { value: changed, label: `${b}에서 ${a}% ${dir === 'up' ? '증가' : '감소'}` };
  })();

  return (
    <CalcShell path="/calculator/percent" title="퍼센트 계산기" description="비율·금액·증감율 즉시 계산">
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'ratio', label: 'X는 Y의 몇%' },
            { value: 'amount', label: 'Y의 X%는' },
            { value: 'change', label: '증가·감소' },
          ]}
          value={mode}
          onChange={v => { setMode(v as Mode); setA(''); setB(''); }}
        />
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            {mode === 'ratio' && (
              <>
                <InputRow label="X (비교 대상)" value={a} onChange={setA} placeholder="X" />
                <InputRow label="Y (기준값)" value={b} onChange={setB} placeholder="Y" />
              </>
            )}
            {mode === 'amount' && (
              <>
                <InputRow label="X% (비율)" value={a} onChange={setA} placeholder="%" />
                <InputRow label="Y (기준값)" value={b} onChange={setB} placeholder="Y" />
              </>
            )}
            {mode === 'change' && (
              <>
                <InputRow label="변화율 (%)" value={a} onChange={setA} placeholder="%" />
                <InputRow label="기준값" value={b} onChange={setB} placeholder="Y" />
                <div className="flex gap-2">
                  {(['up', 'down'] as const).map(d => (
                    <button key={d} onClick={() => setDir(d)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${dir === d ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                      {d === 'up' ? '▲ 증가' : '▼ 감소'}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </Card>

        {result && (
          <div className="bg-blue-600 rounded-2xl p-6 text-center">
            <p className="text-blue-200 text-sm mb-2">{result.label}</p>
            <p className="text-white text-4xl font-black">
              {mode === 'ratio'
                ? `${result.value.toFixed(4)}%`
                : result.value.toLocaleString(undefined, { maximumFractionDigits: 2 })
              }
            </p>
          </div>
        )}
      </div>
    </CalcShell>
  );
}
