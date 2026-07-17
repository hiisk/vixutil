'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

const INH_BRACKETS = [
  { limit: 100_000_000, rate: 0.1, deduct: 0 },
  { limit: 500_000_000, rate: 0.2, deduct: 10_000_000 },
  { limit: 1_000_000_000, rate: 0.3, deduct: 60_000_000 },
  { limit: 3_000_000_000, rate: 0.4, deduct: 160_000_000 },
  { limit: Infinity, rate: 0.5, deduct: 460_000_000 },
];

function calcInhTax(base: number) {
  if (base <= 0) return 0;
  const b = INH_BRACKETS.find(br => base <= br.limit)!;
  return base * b.rate - b.deduct;
}

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function InheritanceTaxPage() {
  const [estate, setEstate] = useState('');
  const [hasSpouse, setHasSpouse] = useState(true);
  const [children, setChildren] = useState('2');
  const [financial, setFinancial] = useState('');
  const [result, setResult] = useState<null | {
    basicDeduct: number; childDeduct: number; unifiedDeduct: number;
    spouseDeduct: number; financialDeduct: number; totalDeduct: number;
    taxBase: number; tax: number;
  }>(null);

  function calculate() {
    const e = Number(estate);
    if (e <= 0) return;

    const basicDeduct = 200_000_000;
    const childDeduct = Number(children) * 50_000_000;
    const unifiedDeduct = Math.max(500_000_000, basicDeduct + childDeduct);
    const spouseDeduct = hasSpouse ? Math.max(500_000_000, Math.min(e * 0.5, 3_000_000_000)) : 0;
    const financialDeduct = Math.min(Number(financial || 0) * 0.2, 200_000_000);
    const totalDeduct = unifiedDeduct + spouseDeduct + financialDeduct;
    const taxBase = Math.max(0, e - totalDeduct);
    const tax = calcInhTax(taxBase);
    setResult({ basicDeduct, childDeduct, unifiedDeduct, spouseDeduct, financialDeduct, totalDeduct, taxBase, tax });
  }

  return (
    <CalcShell
      path="/calculator/inheritance-tax"
      title="상속세 간편 계산기"
      description="상속재산 기준 예상 상속세 계산"
      intro={
        <>
          <h2>공제부터 빼고 봅니다</h2>
          <p>
            상속재산 전액에 세금이 붙는 게 아닙니다. <strong>일괄공제 5억원</strong>이 기본으로 적용되고
            (기초공제 2억 + 자녀당 5,000만원의 합계가 5억을 넘으면 큰 쪽), 배우자가 있으면{' '}
            <strong>배우자상속공제로 최소 5억원</strong>이 더 붙습니다. 배우자 공제는 법정상속분 범위에서{' '}
            <strong>최대 30억원</strong>까지 늘어납니다. 금융재산이 있으면 그 20%를 2억원 한도로 추가 공제합니다.
          </p>
          <h2>배우자 유무가 갈림길입니다</h2>
          <p>
            배우자가 있으면 공제만 <strong>10억원</strong>부터 시작합니다. 그래서 배우자와 자녀가 있는 집은
            상속재산이 10억원을 넘지 않으면 상속세가 나오지 않는 경우가 많습니다. 배우자 없이 자녀만 있으면
            5억원이 기준선이라 문턱이 훨씬 낮아집니다.
          </p>
          <h2>세율</h2>
          <p>
            과세표준 <strong>1억원 이하 10%</strong>에서 <strong>30억원 초과 50%</strong>까지 5단계
            누진세율입니다. 증여세와 같은 세율표입니다.
          </p>
          <h2>간편 계산입니다</h2>
          <p>
            실제 상속세는 재산 평가 방법(특히 부동산·비상장주식), 사전증여재산 합산(<strong>10년 이내</strong>),
            동거주택 상속공제, 가업상속공제, 신고세액공제 등에 따라 크게 달라집니다. 상속은 신고 기한
            (<strong>사망일이 속한 달의 말일부터 6개월</strong>)이 정해져 있고 금액도 커서, 이 계산기로
            대략을 가늠한 뒤 세무 상담을 받는 것을 권합니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>상속재산 총액 (원)</Label>
              <input type="number" value={estate} onChange={e => setEstate(e.target.value)}
                placeholder="예: 2,000,000,000" className={inputCls} min="0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>자녀 수</Label>
                <select value={children} onChange={e => setChildren(e.target.value)} className={inputCls}>
                  {[0,1,2,3,4,5].map(n => (
                    <option key={n} value={n}>{n}명</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 py-3 cursor-pointer select-none">
                  <input type="checkbox" checked={hasSpouse} onChange={e => setHasSpouse(e.target.checked)}
                    className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">배우자 있음</span>
                </label>
              </div>
            </div>
            <div>
              <Label>금융재산 (원, 선택)</Label>
              <input type="number" value={financial} onChange={e => setFinancial(e.target.value)}
                placeholder="0" className={inputCls} min="0" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">금융재산의 20%, 최대 2억원 공제</p>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">예상 상속세</p>
              <p className="text-white text-3xl font-black">{fmt(result.tax)}원</p>
              <p className="text-blue-200 text-sm mt-1">과세표준 {fmt(result.taxBase)}원</p>
            </div>
            <Card>
              <CardHeader title="공제 내역" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '일괄공제', value: result.unifiedDeduct, note: `(기초 2억 + 자녀 ${children}명 × 5천만 vs 5억 중 큰 금액)` },
                  ...(result.spouseDeduct > 0 ? [{ label: '배우자 공제', value: result.spouseDeduct, note: '(법정상속분 vs 5억 중 큰 금액)' }] : []),
                  ...(result.financialDeduct > 0 ? [{ label: '금융재산 공제', value: result.financialDeduct, note: '(금융재산×20%, 최대 2억)' }] : []),
                ].map(row => (
                  <div key={row.label} className="px-5 py-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700 dark:text-slate-200">{row.label}</span>
                      <span className="font-semibold text-emerald-600">-{fmt(row.value)}원</span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{row.note}</p>
                  </div>
                ))}
                <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950 flex justify-between font-bold text-sm">
                  <span>총 공제</span>
                  <span className="text-emerald-600">-{fmt(result.totalDeduct)}원</span>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">* 신고기한: 상속개시일(사망일)로부터 6개월 이내 / 간이 계산으로 실제 세액과 다를 수 있습니다</p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
