'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, inputCls, PrimaryBtn, TabBar, SummaryCard,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

/*
 * 근로자퇴직급여 보장법 제8조, 근로기준법 제2조
 *
 * 1일 평균임금 = 퇴직 전 3개월 임금 총액 / 퇴직 전 3개월 총 일수
 *
 * 3개월 임금 총액 =
 *   (직전 3개월 급여 합계)
 *   + 연간 상여금 × (3개월 일수 / 365)
 *   + 연간 연차수당 × (3개월 일수 / 365)
 *
 * 1일 통상임금 = 월 통상임금 / 30  (평균임금보다 높으면 통상임금 사용)
 *
 * 퇴직금 = max(평균임금, 통상임금) × 30 × (총 재직일수 / 365)
 */

interface Result {
  severancePay: number;
  dailyAvgWage: number;
  dailyStdWage: number;
  appliedWage: number;
  totalDays: number;
  threeMonthDays: number;
  threeMonthTotal: number;
  wageBase: number;
  bonus3M: number;
  leave3M: number;
  years: number;
  months: number;
}

function calcThreeMonthDays(endDate: Date): number {
  const start = new Date(endDate);
  start.setMonth(start.getMonth() - 3);
  return Math.round((endDate.getTime() - start.getTime()) / 86400000);
}

function calcSeverance({
  startDate, endDate,
  wage1, wage2, wage3,
  annualBonus, annualLeavePay,
  monthlyStdWage,
}: {
  startDate: Date; endDate: Date;
  wage1: number; wage2: number; wage3: number;
  annualBonus: number; annualLeavePay: number;
  monthlyStdWage: number;
}): Result {
  const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / 86400000);
  const d3m = calcThreeMonthDays(endDate);

  const wageBase = wage1 + wage2 + wage3;
  const bonus3M = annualBonus * (d3m / 365);
  const leave3M = annualLeavePay * (d3m / 365);
  const threeMonthTotal = wageBase + bonus3M + leave3M;

  const dailyAvgWage = threeMonthTotal / d3m;
  const dailyStdWage = monthlyStdWage > 0 ? monthlyStdWage / 30 : 0;
  const appliedWage = dailyStdWage > dailyAvgWage ? dailyStdWage : dailyAvgWage;

  const severancePay = appliedWage * 30 * (totalDays / 365);

  const fullYears = Math.floor(totalDays / 365);
  const remDays = totalDays - fullYears * 365;
  const remMonths = Math.floor(remDays / 30);

  return {
    severancePay, dailyAvgWage, dailyStdWage, appliedWage,
    totalDays, threeMonthDays: d3m, threeMonthTotal,
    wageBase, bonus3M, leave3M,
    years: fullYears, months: remMonths,
  };
}

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function SeverancePage() {
  const [mode, setMode] = useState<'simple' | 'detail'>('simple');
  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState('2026-06-06');

  // 간편 모드
  const [simpleWage, setSimpleWage] = useState(3_000_000);

  // 상세 모드
  const [wage1, setWage1] = useState(3_000_000);
  const [wage2, setWage2] = useState(3_000_000);
  const [wage3, setWage3] = useState(3_000_000);
  const [annualBonus, setAnnualBonus] = useState(0);
  const [annualLeavePay, setAnnualLeavePay] = useState(0);
  const [monthlyStdWage, setMonthlyStdWage] = useState(0);

  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    if (!startDate || !endDate) { setError('입사일과 퇴직일을 입력해주세요.'); return; }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) { setError('퇴직일은 입사일보다 이후여야 합니다.'); return; }
    const days = (end.getTime() - start.getTime()) / 86400000;
    if (days < 365) { setError('퇴직금은 계속 근로기간 1년 이상부터 발생합니다.'); return; }

    let w1: number, w2: number, w3: number;
    if (mode === 'simple') {
      const m = simpleWage;
      if (!m) { setError('월 평균임금을 입력해주세요.'); return; }
      w1 = w2 = w3 = m;
    } else {
      w1 = wage1;
      w2 = wage2;
      w3 = wage3;
      if (!w1 && !w2 && !w3) { setError('직전 3개월 급여를 입력해주세요.'); return; }
    }

    setResult(calcSeverance({
      startDate: start, endDate: end,
      wage1: w1, wage2: w2, wage3: w3,
      annualBonus,
      annualLeavePay,
      monthlyStdWage,
    }));
  }

  return (
    <CalcShell
      title="퇴직금 계산기"
      description="근로자퇴직급여 보장법 기준 · 평균임금 + 상여금 + 연차수당 반영"
    >
      <div className="flex flex-col gap-4">
        {/* 입력 방식 */}
        <TabBar
          options={[
            { value: 'simple', label: '간편 입력', sub: '월 평균임금만' },
            { value: 'detail', label: '상세 입력', sub: '3개월분 + 상여금' },
          ]}
          value={mode}
          onChange={(v) => { setMode(v); setResult(null); }}
        />

        {/* 공통: 재직기간 */}
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">재직기간</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>입사일</Label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>퇴직일</Label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className={inputCls} />
            </div>
          </div>
        </Card>

        {/* 임금 입력 */}
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">임금 정보</p>
          {mode === 'simple' ? (
            <div>
              <Label>월 평균임금 (원)</Label>
              <CommaInput
                value={simpleWage}
                onChange={setSimpleWage}
                placeholder="예: 3,000,000"
              />
              <p className="text-xs text-slate-400 mt-1.5">세전 급여 기준 (기본급 + 각종 수당 포함)</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label>직전 1개월 급여</Label>
                  <CommaInput value={wage1} onChange={setWage1} placeholder="예: 3,000,000" />
                </div>
                <div>
                  <Label>직전 2개월 급여</Label>
                  <CommaInput value={wage2} onChange={setWage2} placeholder="예: 3,000,000" />
                </div>
                <div>
                  <Label>직전 3개월 급여</Label>
                  <CommaInput value={wage3} onChange={setWage3} placeholder="예: 3,000,000" />
                </div>
              </div>
              <p className="text-xs text-slate-400">기본급 + 제수당 포함, 퇴직 전 3개월간 실수령 세전 금액</p>
            </div>
          )}

          {/* 상여금·연차수당 (두 모드 공통) */}
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label>연간 상여금 (원, 선택)</Label>
              <CommaInput value={annualBonus} onChange={setAnnualBonus} placeholder="예: 7,000,000" />
              <p className="text-xs text-slate-400 mt-1">연간 정기 상여 합계</p>
            </div>
            <div>
              <Label>연간 연차미사용수당 (원, 선택)</Label>
              <CommaInput value={annualLeavePay} onChange={setAnnualLeavePay} placeholder="예: 500,000" />
            </div>
          </div>

          {/* 통상임금 비교 */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <Label>월 통상임금 (원, 선택 — 평균임금과 비교)</Label>
            <CommaInput value={monthlyStdWage} onChange={setMonthlyStdWage} placeholder="입력 시 평균임금과 비교해 높은 값 적용" />
            <p className="text-xs text-slate-400 mt-1.5">
              통상임금이 평균임금보다 높으면 통상임금 기준으로 계산 (근로기준법 제2조)
            </p>
          </div>
        </Card>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        <PrimaryBtn onClick={calculate}>퇴직금 계산하기</PrimaryBtn>

        {/* 결과 */}
        {result && (
          <>
            {/* 결과 요약 */}
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard
                label="퇴직금 (세전)"
                value={`${fmt(result.severancePay)}원`}
                sub={result.dailyStdWage > result.dailyAvgWage ? '통상임금 기준 적용' : '평균임금 기준 적용'}
                variant="primary"
              />
              <SummaryCard
                label="재직기간"
                value={`${result.years}년 ${result.months}개월`}
                sub={`총 ${fmt(result.totalDays)}일`}
              />
              <SummaryCard
                label="1일 평균임금"
                value={`${fmt(result.dailyAvgWage)}원`}
              />
              {result.dailyStdWage > 0 && (
                <SummaryCard
                  label="1일 통상임금"
                  value={`${fmt(result.dailyStdWage)}원`}
                  variant={result.dailyStdWage > result.dailyAvgWage ? 'green' : 'default'}
                  sub={result.dailyStdWage > result.dailyAvgWage ? '↑ 통상임금 적용' : '평균임금이 높음'}
                />
              )}
            </div>

            {/* 계산 내역 */}
            <Card>
              <CardHeader title="평균임금 산출 내역" sub={`직전 3개월 ${result.threeMonthDays}일 기준`} />
              <div className="p-5 flex flex-col gap-2.5 text-sm">
                <Row label="3개월 급여 합계" value={`${fmt(result.wageBase)}원`} />
                {result.bonus3M > 0 && (
                  <Row
                    label={`상여금 산입분 (연간 × ${result.threeMonthDays}/365)`}
                    value={`+${fmt(result.bonus3M)}원`}
                  />
                )}
                {result.leave3M > 0 && (
                  <Row
                    label={`연차수당 산입분 (연간 × ${result.threeMonthDays}/365)`}
                    value={`+${fmt(result.leave3M)}원`}
                  />
                )}
                <div className="border-t border-slate-100 pt-2.5">
                  <Row label="3개월 임금 총액" value={`${fmt(result.threeMonthTotal)}원`} bold />
                </div>
                <div className="border-t border-slate-100 pt-2.5">
                  <Row
                    label={`1일 평균임금 (÷ ${result.threeMonthDays}일)`}
                    value={`${result.dailyAvgWage.toFixed(0)}원`}
                    bold
                  />
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader title="퇴직금 산출 공식" />
              <div className="p-5 text-sm text-slate-600 space-y-2">
                <p className="font-mono text-xs bg-slate-50 rounded-lg p-3 text-slate-700 leading-relaxed">
                  퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365)
                  <br />
                  = {fmt(result.appliedWage)}원 × 30 × ({fmt(result.totalDays)} ÷ 365)
                  <br />
                  = <strong>{fmt(result.severancePay)}원</strong>
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  * 퇴직소득세가 별도 부과됩니다. 근속연수·퇴직소득공제에 따라 실수령액이 달라집니다.
                </p>
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between items-center ${bold ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
