'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, selectCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { calcSimpleVat, INDUSTRY_RATES, type SimpleVatResult } from '@/lib/simple-vat';

const w = (n: number) => Math.round(n).toLocaleString();

export default function SimpleVatPage() {
  const [sales, setSales] = useState(60_000_000);
  const [industryId, setIndustryId] = useState('retail');
  const [purchases, setPurchases] = useState(0);
  const [result, setResult] = useState<SimpleVatResult | null>(null);

  function calculate() {
    if (sales <= 0) return;
    setResult(calcSimpleVat({ sales, industryId, purchases }));
  }

  return (
    <CalcShell
      path="/calculator/simple-vat"
      title="간이과세 부가세 계산기"
      description="간이과세자의 연 매출로 예상 부가가치세 납부액을 계산합니다"
      intro={
        <>
          <h2>간이과세는 일반과세와 계산법이 다릅니다</h2>
          <p>
            일반과세자는 매출세액(매출×10%)에서 매입세액을 빼서 냅니다. 간이과세자는{' '}
            <strong>매출액 × 업종별 부가가치율 × 10%</strong>로 계산해 세부담이 훨씬 낮습니다.
            부가가치율은 업종에 따라 15~40%로 국세청이 정해두었습니다.
          </p>
          <h2>두 개의 매출 기준을 꼭 확인하세요</h2>
          <p>
            연 매출 <strong>4,800만원 미만이면 부가세 납부가 면제</strong>됩니다 — 신고는 하되 세금은
            안 냅니다. 반대로 연 매출 <strong>8,000만원 이상이면 간이과세 대상이 아니라</strong> 일반과세로
            전환되어 이 계산이 맞지 않습니다. 이 계산기는 두 경우 모두 결과에서 알려드립니다.
          </p>
          <h2>업종은 직접 골라주세요</h2>
          <p>
            부가가치율은 업종별로 정해져 있지만 어느 업종에 속하는지 경계가 애매한 경우가 있어,
            값을 자동으로 정하지 않고 <strong>직접 선택</strong>하도록 했습니다. 정확한 업종 분류는
            홈택스나 세무 상담으로 확인하는 것이 안전합니다. 결과는 추정치입니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="사업 정보" />
          <div className="flex flex-col gap-3">
            <div>
              <Label>연 매출액 (공급대가, 원)</Label>
              <CommaInput value={sales} onChange={setSales} placeholder="예: 60,000,000" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                부가세를 포함한 연간 총 매출
              </p>
            </div>
            <div>
              <Label>업종</Label>
              <select value={industryId} onChange={e => setIndustryId(e.target.value)} className={selectCls}>
                {INDUSTRY_RATES.map(i => (
                  <option key={i.id} value={i.id}>
                    {i.label} — 부가가치율 {(i.rate * 100).toFixed(0)}%
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {INDUSTRY_RATES.find(i => i.id === industryId)?.examples}
              </p>
            </div>
            <div>
              <Label>연 매입액 (세금계산서 수취분, 원)</Label>
              <CommaInput value={purchases} onChange={setPurchases} placeholder="예: 0" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                매입액의 0.5%가 세액공제됩니다 (없으면 0)
              </p>
            </div>
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>부가세 계산</PrimaryBtn>

        {result && (
          <>
            <Card className={`p-5 ${result.exempt ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/20' : ''}`}>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                예상 납부세액
              </p>
              <p className={`text-3xl font-black ${result.exempt ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}`}>
                {w(result.finalPayable)}<span className="text-lg font-bold ml-1">원</span>
              </p>
              {result.exempt && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                  연 매출 4,800만원 미만 — 납부 면제 대상입니다 (신고는 필요)
                </p>
              )}
            </Card>

            {result.overCeiling && (
              <Card className="p-4 border-amber-300 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/20">
                <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                  ⚠️ 연 매출이 8,000만원 이상이면 간이과세 대상이 아닙니다. 일반과세로 전환되어 이
                  계산과 크게 달라지므로, 일반 부가세 계산기를 이용하세요.
                </p>
              </Card>
            )}

            <Card className="p-5">
              <CardHeader title="계산 과정" />
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">매출세액</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.outputTax)}원</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>매출 × 부가가치율({(result.industry.rate * 100).toFixed(0)}%) × 10%</span>
                  <span className="tabular-nums">{w(result.sales)} × {(result.industry.rate * 100).toFixed(0)}% × 10%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">− 매입세액공제 (0.5%)</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">−{w(result.purchaseCredit)}원</span>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">계산상 납부세액</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.payable)}원</span>
                </div>
                {result.exempt && (
                  <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400">
                    <span>납부 면제 적용</span>
                    <span className="tabular-nums">→ 0원</span>
                  </div>
                )}
              </div>

              <SummaryGrid>
                <SummaryCard label="연 매출" value={`${w(result.sales)}원`} />
                <SummaryCard label="매출세액" value={`${w(result.outputTax)}원`} />
                <SummaryCard label="실제 납부" value={`${w(result.finalPayable)}원`} variant="primary" />
                <SummaryCard label="부가가치율" value={`${(result.industry.rate * 100).toFixed(0)}%`} />
              </SummaryGrid>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
