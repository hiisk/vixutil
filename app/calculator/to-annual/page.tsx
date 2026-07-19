'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard, RatioBar } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function ToAnnualPage() {
  const [monthly, setMonthly] = useState('');
  const [bonus, setBonus] = useState('0');
  const [extra, setExtra] = useState('');
  const [result, setResult] = useState<null | {
    base: number; bonusTotal: number; extraTotal: number; annual: number; monthlyAvg: number;
  }>(null);

  function calculate() {
    const m = Number(monthly);
    if (m <= 0) return;
    const base = m * 12;
    const bonusTotal = m * Number(bonus);
    const extraTotal = Number(extra || 0);
    const annual = base + bonusTotal + extraTotal;
    setResult({ base, bonusTotal, extraTotal, annual, monthlyAvg: annual / 12 });
  }

  return (
    <CalcShell
      path="/calculator/to-annual"
      title="연봉 계산기"
      description="월급 → 연봉 환산"
      intro={
        <>
          <h2>월급 × 12가 연봉이 아닐 수 있습니다</h2>
          <p>
            회사마다 <strong>상여금·성과급·명절수당</strong>을 어떻게 주느냐가 달라서, 매달 받는
            금액에 12를 곱한 값이 계약상 연봉과 어긋나는 경우가 많습니다. 연봉을 13이나 14로 나눠
            지급하는 회사도 있습니다.
          </p>
          <h2>세전인지 세후인지 맞춰야 합니다</h2>
          <p>
            채용 공고의 연봉은 대개 <strong>세전</strong>이고, 본인이 아는 월급은 <strong>세후
            실수령액</strong>인 경우가 많습니다. 이 둘을 그대로 비교하면 연봉이 실제보다 낮게 나옵니다.
            실수령액에서 연봉을 역산하려면 4대보험과 세금을 되돌려야 하므로{' '}
            <strong>목표 실수령액 → 연봉 계산기</strong>를 쓰세요.
          </p>
          <h2>이직 협상에서는 총보상으로 보세요</h2>
          <p>
            연봉만 비교하면 놓치는 것이 많습니다. <strong>퇴직금 별도 여부</strong>, 성과급 비중,
            식대·교통비 같은 비과세 항목, 복리후생까지 합쳐야 실제 조건이 견줘집니다. 특히 퇴직금이
            연봉에 포함된 조건인지 아닌지는 실질 차이가 큽니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>월 기본급 (원)</Label>
              <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)}
                placeholder="예: 3,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>상여금 (기본급의 몇 개월분)</Label>
              <select value={bonus} onChange={e => setBonus(e.target.value)} className={inputCls}>
                {[0,1,2,3,4,6,8,10,12].map(n => (
                  <option key={n} value={n}>{n}개월 {n === 0 ? '(없음)' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>기타 연간 수당·인센티브 (원, 선택)</Label>
              <input type="number" value={extra} onChange={e => setExtra(e.target.value)}
                placeholder="예: 1,000,000" className={inputCls} min="0" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">연봉 (총 보수)</p>
              <p className="text-white text-3xl font-black">{fmt(result.annual)}원</p>
              <p className="text-blue-200 text-sm mt-1">월 평균 {fmt(result.monthlyAvg)}원</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="기본 연봉 (×12)" value={`${fmt(result.base)}원`} />
              <SummaryCard label="상여금 합계" value={`${fmt(result.bonusTotal)}원`} variant="green" />
              {result.extraTotal > 0 && (
                <SummaryCard label="기타 수당" value={`${fmt(result.extraTotal)}원`} variant="green" />
              )}
            </div>
            {result.bonusTotal > 0 && (
              <Card className="p-4">
                <RatioBar a={result.base} b={result.bonusTotal + result.extraTotal}
                  labelA="기본급" labelB="상여·수당" />
              </Card>
            )}
          </>
        )}
      </div>
    </CalcShell>
  );
}
