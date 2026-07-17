'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, SummaryCard } from '@/components/CalcShell';
import { CALC_FAQ } from '@/lib/calc-faq';

const MIN_WAGE = 10_320;

function calcMonthly(hourly: number, weeklyHours: number) {
  const weeklyHoliday = weeklyHours >= 15 ? weeklyHours / 5 : 0;
  const monthlyHours = (weeklyHours + weeklyHoliday) * (365 / 7 / 12);
  return {
    hourly,
    daily: hourly * 8,
    weekly: hourly * (weeklyHours + weeklyHoliday),
    monthlyHours: Math.round(monthlyHours),
    monthly: Math.round(hourly * monthlyHours),
    annual: Math.round(hourly * monthlyHours * 12),
  };
}

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function MinimumWagePage() {
  const [hourly, setHourly] = useState(String(MIN_WAGE));
  const [weeklyHours, setWeeklyHours] = useState('40');
  const result = (() => {
    const h = Number(hourly);
    const w = Number(weeklyHours);
    if (h > 0 && w > 0) return calcMonthly(h, w);
    return null;
  })();

  return (
    <CalcShell
      path="/calculator/minimum-wage"
      title="최저시급 월급 계산기"
      description="2026년 최저시급 10,320원 기준"
      faq={CALC_FAQ['minimum-wage']}
      intro={
        <>
          <h2>2026년 최저시급 10,320원</h2>
          <p>
            최저임금은 <strong>모든 사업장에 적용</strong>됩니다. 5인 미만이든 아르바이트든 예외가 없고,
            근로자가 동의했더라도 최저임금보다 낮은 계약은 그 부분이 무효입니다. 수습 기간에는 3개월 이내에
            한해 90%까지 감액할 수 있지만, 1년 미만 계약이거나 단순노무직이면 이 감액도 적용되지 않습니다.
          </p>
          <h2>월급으로 환산하면 209시간</h2>
          <p>
            주 40시간을 일하면 <strong>주휴 8시간</strong>이 더해져 주 48시간분의 임금을 받습니다.
            이걸 월로 환산하면 48 × 365 ÷ 7 ÷ 12 = 약 <strong>209시간</strong>입니다. 한 달을 4주로 잡고
            160시간으로 계산하면 실제보다 적게 나옵니다. 최저시급 월급이 시급 × 209로 이야기되는 이유입니다.
          </p>
          <h2>여기에 다 포함된 게 아닙니다</h2>
          <p>
            이 계산기는 <strong>세전</strong> 금액입니다. 실제로는 4대보험과 세금이 빠지므로 통장에 들어오는
            돈은 더 적습니다. 반대로 연장·야간·휴일 근로를 했다면 가산수당이 별도로 붙습니다.
            최저임금에 산입되는 임금의 범위(상여금·복리후생비 등)는 법으로 정해져 있어, 수당이 많은 급여
            구조라면 최저임금 위반 여부 판단이 단순하지 않습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>시급 (원)</Label>
              <input type="number" value={hourly} onChange={e => setHourly(e.target.value)}
                placeholder="10030" className={inputCls} min="0" />
              <p className="text-xs text-blue-600 mt-1.5 font-semibold">2026년 최저시급: 10,320원</p>
            </div>
            <div>
              <Label>주 소정근로시간</Label>
              <select value={weeklyHours} onChange={e => setWeeklyHours(e.target.value)} className={inputCls}>
                <option value="15">15시간 (주휴수당 발생 최소)</option>
                <option value="20">20시간</option>
                <option value="30">30시간</option>
                <option value="40">40시간 (법정 전일제)</option>
                <option value="44">44시간</option>
                <option value="52">52시간 (연장 포함 최대)</option>
              </select>
            </div>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">월 급여</p>
              <p className="text-white text-3xl font-black">{fmt(result.monthly)}원</p>
              <p className="text-blue-200 text-sm mt-1">연봉 {fmt(result.annual)}원</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="시급" value={`${fmt(result.hourly)}원`} />
              <SummaryCard label="일급 (8h)" value={`${fmt(result.daily)}원`} />
              <SummaryCard label="주급 (주휴 포함)" value={`${fmt(result.weekly)}원`} />
              <SummaryCard label="월 소정근로시간" value={`${result.monthlyHours}시간`} />
            </div>
            <Card className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                주 {weeklyHours}시간 근무 기준 · 주휴수당 포함 월 소정근로시간 {result.monthlyHours}h 적용
                {Number(weeklyHours) < 15 && ' · 주 15시간 미만으로 주휴수당 미발생'}
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
