'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { BIRTHDAY } from '@/lib/calc-l10n/dates2';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

const DAY = 86_400_000;

// 별자리 경계 — [월, 그 달에 별자리가 바뀌는 날]. 그 날 이후는 다음 별자리다.
const SIGN_START: [number, number][] = [
  [1, 20], [2, 19], [3, 21], [4, 20], [5, 21], [6, 21],
  [7, 23], [8, 23], [9, 23], [10, 23], [11, 22], [12, 22],
];
const SIGN_KEY = ['z11', 'z12', 'z1', 'z2', 'z3', 'z4', 'z5', 'z6', 'z7', 'z8', 'z9', 'z10'];

function starSign(month: number, day: number): string {
  const [, boundary] = SIGN_START[month - 1];
  // 경계일 전이면 앞 달에 시작한 별자리다. 1월은 12월로 감는다.
  const idx = day >= boundary ? month - 1 : (month + 10) % 12;
  return SIGN_KEY[idx];
}

export default function BirthdayIntl({ lang }: { lang: CalcLang }) {
  const c = BIRTHDAY[lang].ui;
  const tag = localeTag(lang);
  const [birthdate, setBirthdate] = useState('');
  const [result, setResult] = useState<{
    age: number; days: number; toNext: number; nextAge: number;
    weekday: string; sign: string; animal: string;
  } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag);

  function calculate() {
    if (!birthdate) return;
    const [y, m, d] = birthdate.split('-').map(Number);
    if (!y || !m || !d) return;
    const born = new Date(y, m - 1, d);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (born > today) return;

    let age = today.getFullYear() - y;
    const hadBirthday = today.getMonth() > m - 1 || (today.getMonth() === m - 1 && today.getDate() >= d);
    if (!hadBirthday) age--;

    // 2월 29일생은 평년에 해당 날짜가 없다 — Date가 3월 1일로 넘겨 주는 것을 그대로 쓴다.
    let next = new Date(today.getFullYear(), m - 1, d);
    if (next < today) next = new Date(today.getFullYear() + 1, m - 1, d);

    setResult({
      age,
      days: Math.round((today.getTime() - born.getTime()) / DAY),
      toNext: Math.round((next.getTime() - today.getTime()) / DAY),
      nextAge: age + 1,
      weekday: born.toLocaleDateString(tag, { weekday: 'long' }),
      // 서기 4년이 자(쥐)해다 — 12로 나눈 나머지로 십이지를 잡는다.
      sign: c[starSign(m, d)],
      animal: c[`a${((y - 4) % 12 + 12) % 12 + 1}`],
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.section}</p>
        <div>
          <Label>{c.birthdate}</Label>
          <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} className={inputCls} />
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="bg-blue-600 rounded-2xl p-6 text-center">
            <p className="text-blue-200 text-xs mb-1">{c.daysLived}</p>
            <p className="text-white text-4xl font-black">{fmt(result.days)}</p>
            <p className="text-blue-200 text-sm mt-2">{c.age} {result.age}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SummaryCard
              label={c.nextBirthday}
              value={`${fmt(result.toNext)} ${c.daysUnit}`}
              sub={`${c.turns} ${result.nextAge}`}
              variant="green"
            />
            <SummaryCard label={c.bornOn} value={result.weekday} />
            <SummaryCard label={c.starSign} value={result.sign} />
            <SummaryCard label={c.animal} value={result.animal} />
          </div>
        </>
      )}
    </div>
  );
}
