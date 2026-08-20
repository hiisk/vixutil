'use client';
import { useEffect, useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { AGE } from '@/lib/calc-l10n/age-discount';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { calcAge, type AgeResult } from '@/lib/global-calc';
import { localeTag } from '@/lib/locales';

/** 요일 이름은 그 언어에서 꺼낸다 — 2024년 1월 7일이 일요일이라 거기에 번호를 더한다 */
const weekdayName = (i: number, tag: string) =>
  new Date(2024, 0, 7 + i).toLocaleDateString(tag, { weekday: 'long' });

const isoToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export default function AgeIntl({ lang }: { lang: CalcLang }) {
  const c = AGE[lang].ui;
  const tag = localeTag(lang);
  const [birth, setBirth] = useState('');
  const [on, setOn] = useState('');
  const [result, setResult] = useState<AgeResult | null>(null);

  /* 기준일의 «오늘»은 첫 그림 뒤에 넣는다 — 서버가 UTC라 렌더에서 부르면 날짜가 하루 어긋난다 */
  useEffect(() => setOn(isoToday()), []);

  const fmt = (n: number) => n.toLocaleString(tag);

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>{c.birth}</Label>
            <input type="date" value={birth} onChange={e => setBirth(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.on}</Label>
            <input type="date" value={on} onChange={e => setOn(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="mt-4">
          <PrimaryBtn onClick={() => setResult(calcAge(birth, on || isoToday()))}>{c.calc}</PrimaryBtn>
        </div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.exact}</p>
            <p className="stat-value">{fmt(result.years)}</p>
            <p className="stat-sub mt-2">{fmt(result.months)} {c.moUnit} · {fmt(result.days)} {c.dUnit}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <SummaryCard
              label={c.nextBirthday}
              value={`${fmt(result.toNextBirthday)} ${c.daysUnit}`}
              sub={`${c.turns} ${fmt(result.nextAge)}`}
              variant="green"
            />
            <SummaryCard label={c.bornOn} value={weekdayName(result.bornWeekday, tag)} />
            <SummaryCard label={c.totMonths} value={fmt(result.totalMonths)} />
            <SummaryCard label={c.totWeeks} value={fmt(result.totalWeeks)} />
            <SummaryCard label={c.totDays} value={fmt(result.totalDays)} />
            <SummaryCard label={c.totHours} value={fmt(result.totalHours)} />
          </div>

          {result.leapling && (
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{c.leapNote}</p>
          )}
        </>
      )}
    </div>
  );
}
