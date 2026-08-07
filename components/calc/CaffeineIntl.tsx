'use client';
import { useState } from 'react';
import { Card, Label, inputCls, selectCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { CAFFEINE } from '@/lib/calc-l10n/life';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

const HALF_LIFE = 5;      // 시간. 성인 평균이고 개인차는 1.5~9.5시간이다.
const THRESHOLD = 50;     // mg. 이 아래면 수면에 큰 지장이 적다고 흔히 말하는 선.

const PRESETS: [string, number][] = [
  ['p1', 150], ['p2', 75], ['p3', 70], ['p4', 80],
  ['p5', 35], ['p6', 47], ['p7', 30], ['p8', 5],
];

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function clock(totalMinutes: number): string {
  const m = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

export default function CaffeineIntl({ lang }: { lang: CalcLang }) {
  const c = CAFFEINE[lang].ui;
  const tag = localeTag(lang);
  const [preset, setPreset] = useState('p1');
  const [custom, setCustom] = useState('150');
  const [time, setTime] = useState('09:00');
  const [after, setAfter] = useState('12');
  const [result, setResult] = useState<{ mg: number; at: string; below: string; rows: { h: number; mg: number }[] } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 1 });
  const dose = preset === 'p9' ? parseFloat(custom) : (PRESETS.find(([k]) => k === preset)?.[1] ?? 0);

  function calculate() {
    const h = parseFloat(after);
    if (!(dose > 0) || !(h >= 0) || !time) return;
    const start = toMinutes(time);
    const left = (hours: number) => dose * Math.pow(0.5, hours / HALF_LIFE);
    // 50mg을 지나는 시각은 지수식을 뒤집어 바로 구한다.
    const belowHours = dose <= THRESHOLD ? 0 : (Math.log(THRESHOLD / dose) / Math.log(0.5)) * HALF_LIFE;
    const rows = Array.from({ length: Math.min(Math.ceil(h), 24) + 1 }, (_, i) => ({ h: i, mg: left(i) }));
    setResult({ mg: left(h), at: clock(start + h * 60), below: clock(start + belowHours * 60), rows });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.source}</Label>
            <select value={preset} onChange={e => setPreset(e.target.value)} className={selectCls}>
              {PRESETS.map(([key, mg]) => (
                <option key={key} value={key}>{c[key]} · {mg} mg</option>
              ))}
              <option value="p9">{c.p9}</option>
            </select>
          </div>
          {preset === 'p9' && (
            <div>
              <Label>{c.amount}</Label>
              <input type="number" value={custom} onChange={e => setCustom(e.target.value)} className={inputCls} />
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.time}</Label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.after}</Label>
              <input type="number" value={after} onChange={e => setAfter(e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="bg-blue-600 rounded-2xl p-6 text-center">
            <p className="text-blue-200 text-xs mb-1">{c.remaining} · {result.at} {c.at}</p>
            <p className="text-white text-4xl font-black">{fmt(result.mg)} {c.unit}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SummaryCard label={c.belowThreshold} value={result.below} variant="green" />
            <SummaryCard label={c.halfLifeNote} value={`${HALF_LIFE} h`} />
          </div>

          <Card className="p-5">
            <p className="label-caps mb-3">{c.timeline}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 text-left">
                    <th className="py-1.5 font-semibold">{c.hoursCol}</th>
                    <th className="py-1.5 font-semibold text-right">{c.mgCol}</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {result.rows.map(r => (
                    <tr key={r.h} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="py-1.5 text-slate-500 dark:text-slate-400">+{r.h} h</td>
                      <td className={`py-1.5 text-right ${r.mg < THRESHOLD ? 'text-emerald-600' : 'text-slate-800 dark:text-slate-100'}`}>
                        {fmt(r.mg)} {c.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
