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
    <CalcShell
      path="/calculator/overtime"
      title="야근수당 계산기"
      description="통상시급 기준 연장·야간·휴일 수당 계산"
      intro={
        <>
          <h2>가산율</h2>
          <p>
            <strong>연장근로</strong>(주 40시간 초과)와 <strong>휴일근로</strong>는 통상시급의{' '}
            <strong>1.5배</strong>입니다. <strong>야간근로</strong>(밤 10시~새벽 6시)는 여기서{' '}
            <strong>0.5배가 더 붙습니다</strong>.
          </p>
          <h2>야간 칸에 0.5배만 계산되는 이유</h2>
          <p>
            야간수당은 &ldquo;대신&rdquo; 받는 게 아니라 <strong>얹어서</strong> 받는 가산분입니다.
            밤 11시까지 연장근무를 했다면 연장 1.5배에 야간 0.5배가 더해져 <strong>2배</strong>가 됩니다.
            그래서 이 계산기는 야간 시간을 0.5배로만 계산하고, 그 시간은 연장 칸에도 함께 넣어야 합니다.
            중복해서 세는 게 아니라 그렇게 해야 2배가 맞습니다.
          </p>
          <h2>통상시급 209시간의 정체</h2>
          <p>
            기본값 209시간은 <strong>주 40시간 + 주휴 8시간</strong>을 월로 환산한 값(48 × 365 ÷ 12 ÷ 7)입니다.
            월급을 209로 나눈 것이 통상시급입니다. 통상임금에는 기본급 외에 정기적·일률적으로 주는 수당이
            들어가고 성과급처럼 들쭉날쭉한 것은 빠지는데, 회사마다 다툼이 잦은 지점입니다.
          </p>
          <h2>5인 미만 사업장은 다릅니다</h2>
          <p>
            상시 근로자 <strong>5인 미만 사업장</strong>에는 연장·야간·휴일 가산수당 규정이 적용되지 않습니다.
            일한 시간만큼의 임금은 받지만 1.5배 가산은 법적 의무가 아닙니다. 본인 회사 규모를 먼저 확인하세요.
          </p>
        </>
      }
    >
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
