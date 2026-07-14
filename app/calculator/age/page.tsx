'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, SummaryCard } from '@/components/CalcShell';

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

export default function AgePage() {
  const today = new Date().toISOString().split('T')[0];
  const [birth, setBirth] = useState('');
  const [base, setBase] = useState(today);

  const result = (() => {
    if (!birth) return null;
    const b = new Date(birth);
    const d = new Date(base);
    if (isNaN(b.getTime()) || isNaN(d.getTime()) || b > d) return null;

    const byear = b.getFullYear();
    const dyear = d.getFullYear();
    const koreanAge = dyear - byear + 1;
    const calAge = dyear - byear;

    const hadBirthday = d.getMonth() > b.getMonth() || (d.getMonth() === b.getMonth() && d.getDate() >= b.getDate());
    const internationalAge = calAge - (hadBirthday ? 0 : 1);

    const diffMs = d.getTime() - b.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const nextBirthday = new Date(dyear, b.getMonth(), b.getDate());
    if (nextBirthday <= d) nextBirthday.setFullYear(dyear + 1);
    const dday = Math.ceil((nextBirthday.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

    return { internationalAge, koreanAge, calAge, diffDays, dday, birthDow: DAYS_OF_WEEK[b.getDay()] };
  })();

  return (
    <CalcShell title="나이 계산기" description="만 나이 · 한국 나이 · 연 나이 계산">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>생년월일</Label>
              <input type="date" value={birth} onChange={e => setBirth(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>기준일 (오늘)</Label>
              <input type="date" value={base} onChange={e => setBase(e.target.value)} className={inputCls} />
            </div>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5 text-center">
              <p className="text-blue-200 text-xs mb-1">만 나이 (법적 기준)</p>
              <p className="text-white text-5xl font-black">{result.internationalAge}세</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="한국 나이" value={`${result.koreanAge}세`} />
              <SummaryCard label="연 나이" value={`${result.calAge}세`} />
              <SummaryCard label="살아온 날" value={`${result.diffDays.toLocaleString()}일`} />
              <SummaryCard label="다음 생일까지" value={`D-${result.dday}`} />
            </div>
            <Card className="p-4 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">태어난 요일: <span className="font-bold text-slate-800 dark:text-slate-100">{result.birthDow}요일</span></p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
