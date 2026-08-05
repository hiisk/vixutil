'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

function calcPropertyTax(taxBase: number): number {
  if (taxBase <= 60_000_000) return taxBase * 0.001;
  if (taxBase <= 150_000_000) return 60_000 + (taxBase - 60_000_000) * 0.0015;
  if (taxBase <= 300_000_000) return 195_000 + (taxBase - 150_000_000) * 0.0025;
  return 570_000 + (taxBase - 300_000_000) * 0.004;
}

export default function PropertyTaxPage() {
  const [publicPrice, setPublicPrice] = useState('');
  const [isOneHouse, setIsOneHouse] = useState(true);
  const [isCity, setIsCity] = useState(true);
  const [result, setResult] = useState<null | {
    fairRate: number; taxBase: number; propertyTax: number; cityTax: number; eduTax: number; total: number;
  }>(null);

  function calculate() {
    const p = Number(publicPrice);
    if (p <= 0) return;

    let fairRate = 0.6;
    if (isOneHouse) {
      if (p <= 300_000_000) fairRate = 0.45;
      else if (p <= 600_000_000) fairRate = 0.5;
    }

    const taxBase = p * fairRate;
    const propertyTax = calcPropertyTax(taxBase);
    const cityTax = isCity ? taxBase * 0.0014 : 0;
    const eduTax = propertyTax * 0.2;
    setResult({ fairRate, taxBase, propertyTax, cityTax, eduTax, total: propertyTax + cityTax + eduTax });
  }

  return (
    <CalcShell
      path="/calculator/property-tax"
      title="재산세 계산기"
      description="주택 공시가격 기준 재산세 계산"
      intro={
        <>
          <h2>시세가 아니라 공시가격이 기준입니다</h2>
          <p>
            재산세는 실제 거래가가 아니라 <strong>공시가격</strong>으로 매깁니다. 공시가격은 보통 시세보다
            낮아서, 시세 10억 집의 세금이 10억 기준으로 나오지 않습니다. 본인 집 공시가격은{' '}
            <strong>부동산공시가격 알리미</strong>에서 확인할 수 있습니다.
          </p>
          <h2>공정시장가액비율을 한 번 더 곱합니다</h2>
          <p>
            공시가격에 <strong>공정시장가액비율</strong>을 곱한 것이 과세표준입니다. 주택은 60%가 기본이고,
            1주택자는 공시가격에 따라 <strong>45~50%</strong>로 더 낮게 적용됩니다. 공시가격이 그대로
            과세표준이 되는 게 아니라 한 단계 더 깎이는 구조입니다. 이 비율은 정부가 조정할 수 있습니다.
          </p>
          <h2>세율</h2>
          <p>
            과세표준 <strong>6,000만원 이하 0.1%</strong>부터 <strong>3억원 초과 0.4%</strong>까지
            누진 구간으로 나뉩니다. 여기에 <strong>지방교육세</strong>(재산세의 20%)가 붙고, 도시지역에
            있으면 <strong>도시지역분</strong>(과세표준의 0.14%)이 추가됩니다.
          </p>
          <h2>종부세는 별개입니다</h2>
          <p>
            공시가격이 일정 기준을 넘으면 재산세와 <strong>종합부동산세</strong>를 함께 냅니다.
            이 계산기는 재산세만 계산하므로 고가 주택이나 다주택이라면 실제 보유세는 여기서 나온 금액보다
            큽니다. 재산세는 <strong>매년 6월 1일 기준 소유자</strong>에게 부과되므로, 5월 31일에 팔면
            그해 재산세는 산 사람이 냅니다. 세율과 특례는 개정되므로 정확한 금액은 고지서를 따릅니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>주택 공시가격 (원)</Label>
              <input type="number" value={publicPrice} onChange={e => setPublicPrice(e.target.value)}
                placeholder="예: 500,000,000" className={inputCls} min="0" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={isOneHouse} onChange={e => setIsOneHouse(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">1세대 1주택 특례 적용</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={isCity} onChange={e => setIsCity(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">도시지역 (도시지역분 포함)</span>
            </label>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">재산세 합계</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
              <p className="text-blue-200 text-sm mt-1">
                공정시장가액비율 {(result.fairRate * 100).toFixed(0)}% · 과세표준 {fmt(result.taxBase)}원
              </p>
            </div>
            <Card>
              <CardHeader title="세금 내역" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '재산세', value: result.propertyTax },
                  ...(result.cityTax > 0 ? [{ label: '도시지역분 (0.14%)', value: result.cityTax }] : []),
                  { label: '지방교육세 (재산세×20%)', value: result.eduTax },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className="font-semibold">{fmt(r.value)}원</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">* 7월(건물분)·9월(토지분) 2회 납부 · 20만원 이하 일시납</p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
