'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard,
} from '@/components/CalcShell';

// 단순경비율 (업종코드 940909 — 기타 자유직업 관련 서비스업) 2025년 기준
const EXPENSE_RATE = 0.641;

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function FreelancePage() {
  const [income, setIncome] = useState('');
  const [period, setPeriod] = useState<'once'|'monthly'|'annual'>('once');
  const [result, setResult] = useState<{
    base: number; incomeTax: number; localTax: number; withholding: number; net: number;
    annualEstimate: number; expenseDeduction: number; estimatedFinalTax: number;
  } | null>(null);

  function calculate() {
    const v = Number(income);
    if (!v) return;
    const base = period === 'annual' ? Math.round(v/12) : period === 'monthly' ? v : v;
    const incomeTax = Math.round(base * 0.03);
    const localTax = Math.round(base * 0.003);
    const withholding = incomeTax + localTax;
    const net = base - withholding;

    // 종합소득세 추정 (단순경비율)
    const annualEstimate = period === 'once' ? base * 12 : period === 'monthly' ? v * 12 : v;
    const expenseDeduction = Math.round(annualEstimate * EXPENSE_RATE);
    const businessIncome = Math.max(0, annualEstimate - expenseDeduction);
    const taxableIncome = Math.max(0, (businessIncome - 1_500_000) / 10000); // 만원 단위
    let finalTax = 0;
    if (taxableIncome <= 1400) finalTax = taxableIncome * 0.06;
    else if (taxableIncome <= 5000) finalTax = taxableIncome * 0.15 - 126;
    else finalTax = taxableIncome * 0.24 - 576;
    const estimatedFinalTax = Math.max(0, finalTax) * 10000;

    setResult({ base, incomeTax, localTax, withholding, net, annualEstimate, expenseDeduction, estimatedFinalTax });
  }

  return (
    <CalcShell title="프리랜서 세금 계산기" description="3.3% 원천징수 내역 + 5월 종합소득세 납부 추정">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">수입 정보</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>수입 구분</Label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  {v:'once',l:'건별 수입'},
                  {v:'monthly',l:'월 수입'},
                  {v:'annual',l:'연 수입'},
                ] as const).map(opt=>(
                  <button key={opt.v} onClick={()=>setPeriod(opt.v)}
                    className={`py-2.5 text-sm font-semibold rounded-xl border transition-colors ${
                      period===opt.v ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-500 hover:border-blue-300'
                    }`}>
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>수입금액 (원)</Label>
              <input type="number" value={income} onChange={e=>setIncome(e.target.value)}
                placeholder="예: 5,000,000" className={inputCls}/>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-600 rounded-2xl p-5 col-span-2 sm:col-span-1">
                <p className="text-blue-200 text-xs mb-1">이번 건 실수령액</p>
                <p className="text-white text-3xl font-black">{fmt(result.net)}원</p>
                <p className="text-blue-200 text-sm mt-1">원천징수 후</p>
              </div>
              <div className="flex flex-col gap-2">
                <SummaryCard label="수입금액" value={`${fmt(result.base)}원`}/>
                <SummaryCard label="원천징수 (3.3%)" value={`-${fmt(result.withholding)}원`} variant="red"/>
              </div>
            </div>

            <Card>
              <CardHeader title="원천징수 내역"/>
              <div className="divide-y divide-slate-100 text-sm">
                <Row l="소득세 (3%)" v={`-${fmt(result.incomeTax)}원`} red/>
                <Row l="지방소득세 (0.3%)" v={`-${fmt(result.localTax)}원`} red/>
                <Row l="합계 (3.3%)" v={`-${fmt(result.withholding)}원`} red bold/>
              </div>
            </Card>

            <Card>
              <CardHeader title="5월 종합소득세 납부 추정" sub="단순경비율 64.1% 기준"/>
              <div className="p-5 flex flex-col gap-2.5 text-sm">
                <Row l="연간 추정 수입" v={`${fmt(result.annualEstimate)}원`}/>
                <Row l={`경비 공제 (${(EXPENSE_RATE*100).toFixed(1)}%)`} v={`-${fmt(result.expenseDeduction)}원`}/>
                <Row l="사업소득금액" v={`${fmt(result.annualEstimate-result.expenseDeduction)}원`}/>
                <div className="border-t border-slate-100 pt-2.5">
                  <Row l="예상 종합소득세" v={`≈ ${fmt(result.estimatedFinalTax)}원`} bold/>
                </div>
                <div className="border-t border-slate-100 pt-2.5">
                  <Row
                    l="기납부 원천세 (연간)"
                    v={`${fmt(result.incomeTax*12)}원`}
                  />
                  <div className="mt-1.5">
                    <Row
                      l="예상 환급/추납"
                      v={result.incomeTax*12 > result.estimatedFinalTax
                        ? `환급 ≈ ${fmt(result.incomeTax*12 - result.estimatedFinalTax)}원`
                        : `추납 ≈ ${fmt(result.estimatedFinalTax - result.incomeTax*12)}원`}
                      bold
                    />
                  </div>
                </div>
              </div>
              <div className="px-5 pb-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  * 연간 수입을 기준으로 추정한 값입니다. 부양가족·의료비 등 공제 미반영.
                  실제 세금은 세무사 상담을 권장합니다.
                </p>
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}

function Row({l,v,red,bold}:{l:string;v:string;red?:boolean;bold?:boolean}) {
  return (
    <div className={`flex justify-between px-5 py-2.5 ${bold?'font-bold bg-slate-50':''}`}>
      <span className="text-slate-600">{l}</span>
      <span className={red?'text-red-500 font-semibold':'text-slate-800'}>{v}</span>
    </div>
  );
}
