'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

const ALLOWANCES = ['직책수당', '직무수당', '가족수당', '식대', '교통비', '기타 고정수당'];

export default function StandardWagePage() {
  const [basic, setBasic] = useState('');
  const [allowances, setAllowances] = useState<Record<string, string>>(
    Object.fromEntries(ALLOWANCES.map(k => [k, '']))
  );
  const [weeklyHours, setWeeklyHours] = useState('40');
  const [result, setResult] = useState<null | {
    standard: number; hourly: number; monthlyHours: number;
    allowanceTotal: number; rows: { name: string; amount: number }[];
  }>(null);

  function calculate() {
    const b = Number(basic);
    if (b <= 0) return;
    const w = Number(weeklyHours);
    const monthlyHours = (w + w / 5) * (365 / 7 / 12);
    const rows = ALLOWANCES.map(name => ({ name, amount: Number(allowances[name] || 0) }));
    const allowanceTotal = rows.reduce((s, r) => s + r.amount, 0);
    const standard = b + allowanceTotal;
    setResult({ standard, hourly: standard / monthlyHours, monthlyHours: Math.round(monthlyHours), allowanceTotal, rows });
  }

  return (
    <CalcShell title="통상임금 계산기" description="기본급 + 고정수당 기준 통상임금 · 통상시급 계산">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">기본 정보</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>월 기본급 (원)</Label>
              <input type="number" value={basic} onChange={e => setBasic(e.target.value)}
                placeholder="예: 2,500,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>주 소정근로시간</Label>
              <select value={weeklyHours} onChange={e => setWeeklyHours(e.target.value)} className={inputCls}>
                <option value="40">40시간 (월 209h)</option>
                <option value="44">44시간 (월 226h)</option>
              </select>
            </div>
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-4 mb-3">고정수당 (해당 항목만 입력)</p>
          <div className="grid grid-cols-2 gap-3">
            {ALLOWANCES.map(name => (
              <div key={name}>
                <Label>{name}</Label>
                <input type="number" value={allowances[name]}
                  onChange={e => setAllowances(prev => ({ ...prev, [name]: e.target.value }))}
                  placeholder="0" className={inputCls} min="0" />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-600 rounded-2xl p-5 col-span-2 sm:col-span-1">
                <p className="text-blue-200 text-xs mb-1">통상임금 (월)</p>
                <p className="text-white text-3xl font-black">{fmt(result.standard)}원</p>
              </div>
              <SummaryCard label="통상시급" value={`${fmt(result.hourly)}원`} />
            </div>
            <Card>
              <CardHeader title="구성 내역" sub={`월 ${result.monthlyHours}h 기준`} />
              <div className="divide-y divide-slate-100">
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-600">기본급</span>
                  <span className="font-semibold">{fmt(Number(basic))}원</span>
                </div>
                {result.rows.filter(r => r.amount > 0).map(r => (
                  <div key={r.name} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600">{r.name}</span>
                    <span className="font-semibold">{fmt(r.amount)}원</span>
                  </div>
                ))}
                <div className="px-5 py-3 bg-slate-50 flex justify-between font-bold text-sm">
                  <span>통상임금 합계</span>
                  <span className="text-blue-600">{fmt(result.standard)}원</span>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs font-bold text-slate-500 mb-2">수당 단가 참고</p>
              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                {[
                  { label: '연장근로', rate: '×1.5', value: result.hourly * 1.5 },
                  { label: '야간가산', rate: '×0.5', value: result.hourly * 0.5 },
                  { label: '휴일근로', rate: '×1.5', value: result.hourly * 1.5 },
                ].map(item => (
                  <div key={item.label} className="bg-slate-50 rounded-lg p-2">
                    <p className="text-slate-400">{item.label} {item.rate}</p>
                    <p className="font-bold text-slate-800">{fmt(item.value)}원/h</p>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
