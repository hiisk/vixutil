'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import {
  AREA_LIMIT, NON_HOUSING_RATES, housingAcqRate, housingRatesFor,
} from '@/lib/home-buying-cost';

const fmt = (n: number) => Math.round(n).toLocaleString();

/**
 * 취득 후 주택 수와 지역으로 취득세율을 고른다.
 *
 * 표준세율(1~3%) 산식은 lib/home-buying-cost.ts의 housingAcqRate가 갖고 있다.
 * 2026-08-12까지 이 파일 안에 그 산식이 박혀 있었고 나눗수를 3억이 아니라
 * 300만으로 적어 두어 6~9억 구간 세율이 397~597%로 나왔다 — 7억 주택의
 * 취득세가 32억으로 표시됐다. 페이지 안에 있어 검사가 닿지 못한 자리였다.
 * 이제 lib을 부르고 tests/acquisition-tax.test.ts가 경계값을 지킨다.
 */
function getHousingRate(price: number, houses: number, isAdjusted: boolean): number {
  if (houses >= 3 || (isAdjusted && houses >= 2)) return 0.12;
  if (houses === 2) return isAdjusted ? 0.12 : 0.08;
  return housingAcqRate(price);
}

export default function AcquisitionTaxPage() {
  const [price, setPrice] = useState('');
  const [type, setType] = useState<'house' | 'other'>('house');
  const [houses, setHouses] = useState('1');
  const [adjusted, setAdjusted] = useState(false);
  const [firstBuy, setFirstBuy] = useState(false);
  const [overArea, setOverArea] = useState(false);
  const [result, setResult] = useState<null | {
    rate: number; acquisitionTax: number; ruralTax: number; eduTax: number; total: number; discount: number;
  }>(null);

  function calculate() {
    const p = Number(price);
    if (p <= 0) return;

    /*
     * 세율 셋을 lib에서 한꺼번에 받는다. 주택은 지방교육세가 취득세액의 10%
     * (중과는 0.4% 고정)이고, 농어촌특별세는 국민주택규모를 넘을 때만 붙는다 —
     * 그래서 6억 이하 85㎡ 이하 주택이 널리 알려진 1.1%가 된다.
     */
    const rates = type === 'other'
      ? NON_HOUSING_RATES
      : housingRatesFor(getHousingRate(p, Number(houses), adjusted), overArea);
    const rate = rates.acquisition;

    const acquisitionTax = p * rate;
    const ruralTax = p * rates.rural;
    const eduTax = p * rates.eduLocal;
    const subtotal = acquisitionTax + ruralTax + eduTax;
    const discount = firstBuy && type === 'house' ? Math.min(2_000_000, acquisitionTax) : 0;
    const total = subtotal - discount;

    setResult({ rate: rate * 100, acquisitionTax, ruralTax, eduTax, total, discount });
  }

  return (
    <CalcShell
      path="/calculator/acquisition-tax"
      title="취득세 계산기"
      description="부동산 취득세 · 농어촌특별세 · 지방교육세 계산"
      intro={
        <>
          <h2>취득세만 내는 게 아닙니다</h2>
          <p>
            집을 살 때는 취득세에 <strong>지방교육세</strong>와 <strong>농어촌특별세</strong>가 함께 붙습니다.
            주택은 지방교육세가 <strong>취득세액의 10%</strong>이고, 농어촌특별세는 전용면적
            {AREA_LIMIT}㎡를 넘을 때만 취득가액의 0.2%가 붙습니다. 그래서 6억원 이하 85㎡ 이하 주택의
            총 세율이 널리 알려진 <strong>1.1%</strong>이고, 9억원 초과는 <strong>3.3%</strong>입니다.
            비주택(상가·토지)은 4% + 0.4% + 0.2% = <strong>4.6%</strong>입니다.
          </p>
          <h2>1주택 실수요자 세율</h2>
          <p>
            <strong>6억원 이하는 1%</strong>, <strong>9억원 초과는 3%</strong>입니다. 그 사이 6~9억 구간은
            계단식이 아니라 <strong>가격에 따라 1%에서 3%로 매끄럽게 올라가는</strong> 산식을 씁니다.
            예전처럼 6억원에서 1원만 넘어도 세율이 껑충 뛰던 문제를 없앤 구조입니다.
          </p>
          <h2>주택 수가 많으면 중과됩니다</h2>
          <p>
            2주택 이상이면 세율이 크게 올라가고, <strong>조정대상지역에서는 2주택부터 12%</strong>가
            적용됩니다. 3주택 이상은 지역과 무관하게 중과 대상입니다. 조정대상지역 지정은 정책에 따라 바뀌므로
            계약 시점 기준으로 확인해야 합니다.
          </p>
          <h2>전용면적 85㎡가 한 줄을 가릅니다</h2>
          <p>
            국민주택규모(전용면적 {AREA_LIMIT}㎡) 이하는 <strong>농어촌특별세가 비과세</strong>입니다.
            같은 값의 집이라도 면적 한 줄로 취득가액의 0.2%가 생기거나 사라집니다 — 9억원 초과 주택의
            총 세율이 3.3%와 3.5%로 갈리는 이유입니다.
          </p>
          <h2>생애최초 감면</h2>
          <p>
            생애최초로 주택을 사면 취득세를 <strong>최대 200만원까지</strong> 감면받습니다. 다만 소득·주택
            가격 등 요건이 붙습니다. 이 계산기는 감면 한도만 반영한 <strong>추정치</strong>이며, 실제
            세액과 감면 여부는 관할 지방자치단체 세무과에서 확인해야 합니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>취득가액 (원)</Label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)}
                placeholder="예: 500,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>부동산 구분</Label>
              <div className="grid grid-cols-2 gap-2">
                {[{ v: 'house', l: '주택' }, { v: 'other', l: '비주택 (상가·토지)' }].map(o => (
                  <button key={o.v} onClick={() => setType(o.v as 'house' | 'other')}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition-colors border ${type === o.v ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300'}`}>
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
            {type === 'house' && (
              <>
                <div>
                  <Label>취득 후 주택 수</Label>
                  <select value={houses} onChange={e => setHouses(e.target.value)} className={inputCls}>
                    <option value="1">1주택</option>
                    <option value="2">2주택</option>
                    <option value="3">3주택 이상</option>
                    <option value="9">법인</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={adjusted} onChange={e => setAdjusted(e.target.checked)}
                    className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">조정대상지역</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={overArea} onChange={e => setOverArea(e.target.checked)}
                    className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">
                    전용면적 {AREA_LIMIT}㎡ 초과 (농어촌특별세 과세)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={firstBuy} onChange={e => setFirstBuy(e.target.checked)}
                    className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">생애최초 취득 (최대 200만원 감면)</span>
                </label>
              </>
            )}
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">총 납부세액</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
              <p className="text-blue-200 text-sm mt-1">취득세율 {result.rate.toFixed(2)}%</p>
            </div>
            <Card>
              <CardHeader title="세금 내역" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '취득세', value: result.acquisitionTax },
                  { label: '농어촌특별세', value: result.ruralTax },
                  { label: '지방교육세', value: result.eduTax },
                  ...(result.discount > 0 ? [{ label: '생애최초 감면', value: -result.discount }] : []),
                ].map(r => (
                  <div key={r.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className={`font-semibold ${r.value < 0 ? 'text-emerald-600' : ''}`}>
                      {r.value < 0 ? '-' : ''}{fmt(Math.abs(r.value))}원
                    </span>
                  </div>
                ))}
                <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950 flex justify-between font-bold text-sm">
                  <span>합계</span>
                  <span className="text-blue-600">{fmt(result.total)}원</span>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
