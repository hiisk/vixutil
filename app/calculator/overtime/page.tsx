'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function OvertimePage() {
  const [monthly, setMonthly] = useState('');
  const [stdHours, setStdHours] = useState('209');
  const [overtime, setOvertime] = useState('');
  const [night, setNight] = useState('');
  const [holiday, setHoliday] = useState('');
  const [result, setResult] = useState<null | {
    hourly: number; overtimePay: number; nightPay: number;
    holidayPay: number; total: number;
  }>(null);

  function calculate() {
    const m = Number(monthly);
    const s = Number(stdHours);
    if (m <= 0 || s <= 0) return;

    const hourly = m / s;
    const overtimePay = hourly * 1.5 * Number(overtime || 0);
    const nightPay = hourly * 0.5 * Number(night || 0);
    const holidayPay = hourly * 1.5 * Number(holiday || 0);
    setResult({ hourly, overtimePay, nightPay, holidayPay, total: overtimePay + nightPay + holidayPay });
  }

  return (
    <CalcShell title="야근수당 계산기" description="통상시급 기준 연장·야간·휴일 수당 계산">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">기본 정보</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>월 기본급 (원)</Label>
              <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)}
                placeholder="예: 3,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>월 소정근로시간</Label>
              <select value={stdHours} onChange={e => setStdHours(e.target.value)} className={inputCls}>
                <option value="209">209시간 (주 40h 기준)</option>
                <option value="226">226시간 (주 44h 기준)</option>
                <option value="174">174시간 (주 35h 기준)</option>
              </select>
            </div>
          </div>

          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-4 mb-3">수당 시간 입력</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>연장근로 시간 (×1.5배)</Label>
              <input type="number" value={overtime} onChange={e => setOvertime(e.target.value)}
                placeholder="0" className={inputCls} min="0" />
            </div>
            <div>
              <Label>야간근로 시간 — 22:00~06:00 (×0.5배 가산)</Label>
              <input type="number" value={night} onChange={e => setNight(e.target.value)}
                placeholder="0" className={inputCls} min="0" />
            </div>
            <div>
              <Label>휴일근로 시간 (×1.5배)</Label>
              <input type="number" value={holiday} onChange={e => setHoliday(e.target.value)}
                placeholder="0" className={inputCls} min="0" />
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">추가 수당 합계</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
              <p className="text-blue-200 text-sm mt-1">통상시급 {fmt(result.hourly)}원 기준</p>
            </div>
            <Card>
              <CardHeader title="수당 내역" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '연장근로수당', rate: '통상시급 × 1.5', hours: Number(overtime || 0), pay: result.overtimePay },
                  { label: '야간근로수당', rate: '통상시급 × 0.5 (가산)', hours: Number(night || 0), pay: result.nightPay },
                  { label: '휴일근로수당', rate: '통상시급 × 1.5', hours: Number(holiday || 0), pay: result.holidayPay },
                ].map(row => (
                  <div key={row.label} className="px-5 py-3.5 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{row.label}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{row.rate} · {row.hours}시간</p>
                    </div>
                    <span className="font-bold text-blue-600">{fmt(row.pay)}원</span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between">
                <span className="font-bold text-sm text-slate-800 dark:text-slate-100">합계</span>
                <span className="font-black text-blue-600">{fmt(result.total)}원</span>
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
