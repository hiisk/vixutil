'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

const BRACKETS = [
  { limit: 1400, rate: 0.06, deduct: 0 },
  { limit: 5000, rate: 0.15, deduct: 126 },
  { limit: 8800, rate: 0.24, deduct: 576 },
  { limit: 15000, rate: 0.35, deduct: 1544 },
  { limit: 30000, rate: 0.38, deduct: 1994 },
  { limit: 50000, rate: 0.40, deduct: 2594 },
  { limit: 100000, rate: 0.42, deduct: 3594 },
  { limit: Infinity, rate: 0.45, deduct: 6594 },
];

function earningDeduction(a: number) {
  if (a <= 500) return a * 0.7;
  if (a <= 1500) return 350 + (a - 500) * 0.4;
  if (a <= 4500) return 750 + (a - 1500) * 0.15;
  if (a <= 10000) return 1200 + (a - 4500) * 0.05;
  return Math.min(2000, 1475 + (a - 10000) * 0.02);
}

function calcNet(annual: number) {
  const monthly = Math.floor(annual / 12);
  const pension = Math.round(Math.min(monthly, 6_170_000) * 0.045);
  const health = Math.round(monthly * 0.03545);
  const longCare = Math.round(health * 0.1295);
  const employment = Math.round(monthly * 0.009);
  const a = annual / 10000;
  const taxable = Math.max(0, a - earningDeduction(a) - 150);
  const b = BRACKETS.find(br => taxable <= br.limit)!;
  const annualTax = Math.max(0, taxable * b.rate - b.deduct) * 10000;
  const incomeTax = Math.round(annualTax / 12);
  const localTax = Math.round(incomeTax * 0.1);
  const totalDeduction = pension + health + longCare + employment + incomeTax + localTax;
  return { monthly, totalDeduction, netMonthly: monthly - totalDeduction };
}

export default function DevSalaryPage() {
  const [tab, setTab] = useState<'salary' | 'stock'>('salary');
  const [annual, setAnnual] = useState('');
  const [grant, setGrant] = useState('');
  const [strike, setStrike] = useState('');
  const [currentP, setCurrentP] = useState('');
  const [salResult, setSalResult] = useState<null | ReturnType<typeof calcNet>>(null);
  const [stockResult, setStockResult] = useState<null | { gross: number; netAfterTax: number; totalExercise: number }>(null);

  function calcSalary() {
    const v = Number(annual);
    if (v <= 0) return;
    setSalResult(calcNet(v));
  }

  function calcStock() {
    const g = Number(grant);
    const s = Number(strike);
    const c = Number(currentP);
    if (g <= 0 || s <= 0 || c <= 0) return;
    const gross = (c - s) * g;
    const totalExercise = s * g;
    setStockResult({ gross, netAfterTax: gross * 0.8, totalExercise });
  }

  return (
    <CalcShell title="개발자 연봉 계산기" description="연봉 분석 · 스톡옵션 평가 계산">
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'salary', label: '연봉 분석' },
            { value: 'stock', label: '스톡옵션' },
          ]}
          value={tab}
          onChange={v => setTab(v as 'salary' | 'stock')}
        />

        {tab === 'salary' ? (
          <>
            <Card className="p-5">
              <div className="mb-3">
                <Label>연봉 (원)</Label>
                <input type="number" value={annual} onChange={e => setAnnual(e.target.value)}
                  placeholder="예: 80,000,000" className={inputCls} min="0" />
              </div>
              <PrimaryBtn onClick={calcSalary}>계산하기</PrimaryBtn>
            </Card>

            {salResult && (
              <>
                <div className="bg-blue-600 rounded-2xl p-5">
                  <p className="text-blue-200 text-xs mb-1">월 실수령액</p>
                  <p className="text-white text-3xl font-black">{fmt(salResult.netMonthly)}원</p>
                  <p className="text-blue-200 text-sm mt-1">연 {fmt(salResult.netMonthly * 12)}원</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <SummaryCard label="월 세전 급여" value={`${fmt(salResult.monthly)}원`} />
                  <SummaryCard label="월 공제 합계" value={`-${fmt(salResult.totalDeduction)}원`} variant="red" />
                  <SummaryCard label="시급 (월 209h)" value={`${fmt(salResult.monthly / 209)}원`} />
                  <SummaryCard label="일급 (8h)" value={`${fmt(salResult.monthly / 209 * 8)}원`} />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <Card className="p-5">
              <div className="flex flex-col gap-3">
                <div>
                  <Label>부여 수량 (주)</Label>
                  <input type="number" value={grant} onChange={e => setGrant(e.target.value)}
                    placeholder="예: 10,000" className={inputCls} min="0" />
                </div>
                <div>
                  <Label>행사가 (원/주)</Label>
                  <input type="number" value={strike} onChange={e => setStrike(e.target.value)}
                    placeholder="예: 5,000" className={inputCls} min="0" />
                </div>
                <div>
                  <Label>현재가 / IPO 예상가 (원/주)</Label>
                  <input type="number" value={currentP} onChange={e => setCurrentP(e.target.value)}
                    placeholder="예: 30,000" className={inputCls} min="0" />
                </div>
                <PrimaryBtn onClick={calcStock}>계산하기</PrimaryBtn>
              </div>
            </Card>

            {stockResult && (
              <>
                <div className="bg-blue-600 rounded-2xl p-5">
                  <p className="text-blue-200 text-xs mb-1">평가 차익 (세전)</p>
                  <p className="text-white text-3xl font-black">{fmt(stockResult.gross)}원</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <SummaryCard label="행사 총액" value={`${fmt(stockResult.totalExercise)}원`} />
                  <SummaryCard label="세후 차익 (20% 세율 추정)" value={`${fmt(stockResult.netAfterTax)}원`} variant="green" />
                </div>
                <Card className="p-4">
                  <p className="text-xs text-slate-400">* 스톡옵션 과세는 행사 시점, 보유 기간, 상장 여부에 따라 다릅니다. 세무사 상담 권장.</p>
                </Card>
              </>
            )}
          </>
        )}
      </div>
    </CalcShell>
  );
}
