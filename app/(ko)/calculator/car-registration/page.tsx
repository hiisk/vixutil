'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls, selectCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import {
  calcRegistration, CAR_TYPES,
  type CarType, type RegistrationResult,
} from '@/lib/car-registration';

const w = (n: number) => Math.round(n).toLocaleString();

export default function CarRegistrationPage() {
  const [price, setPrice] = useState(30_000_000);
  const [carType, setCarType] = useState<CarType>('passenger');
  const [bondRate, setBondRate] = useState('12');
  const [bondDiscountRate, setBondDiscountRate] = useState('8');
  const [etcFee, setEtcFee] = useState(150_000);
  const [result, setResult] = useState<RegistrationResult | null>(null);

  function calculate() {
    if (price <= 0) return;
    setResult(calcRegistration({
      price,
      carType,
      bondRate: Number(bondRate) || 0,
      bondDiscountRate: Number(bondDiscountRate) || 0,
      etcFee,
    }));
  }

  return (
    <CalcShell
      path="/calculator/car-registration"
      title="자동차 취등록세 계산기"
      description="차값 외에 실제로 더 나가는 취득세·공채·등록비를 계산합니다"
      intro={
        <>
          <h2>차값이 전부가 아닙니다</h2>
          <p>
            예산을 짤 때 가장 자주 빠지는 것이 <strong>취득세</strong>입니다. 비영업용 승용차는 차값의{' '}
            <strong>7%</strong>라서 3,000만원 차면 210만원이 따로 나갑니다. 여기에 공채와 등록 실비까지
            더하면 차값의 8% 안팎이 추가로 필요합니다.
          </p>
          <h2>경차는 세율도 낮고 감면도 있습니다</h2>
          <p>
            경차 취득세는 <strong>4%</strong>이고, 그 위에 <strong>75만원까지 감면</strong>됩니다.
            2,000만원 경차라면 4%인 80만원에서 75만원을 빼 <strong>5만원</strong>만 내면 됩니다.
            세액이 감면 한도보다 작으면 아예 안 냅니다. 승합·화물차는 5%입니다.
          </p>
          <h2>공채는 대부분 돌려받습니다</h2>
          <p>
            차를 등록할 때 지역개발채권이나 도시철도채권을 의무로 사야 하는데, 이건 세금이 아니라{' '}
            <strong>채권 매입</strong>입니다. 만기까지 들고 있으면 이자까지 돌려받습니다. 다만 대부분
            그 자리에서 되파는데, 이때 <strong>할인율만큼만 실제 손실</strong>이 됩니다. 그래서 이
            계산기는 매입액 전체가 아니라 매도 손실만 비용으로 잡습니다.
          </p>
          <h2>지역마다 다릅니다</h2>
          <p>
            공채 매입 비율은 지자체 조례로 정해지고 차종·배기량에 따라서도 달라집니다. 기본값은 흔한
            수준으로 넣어뒀으니 <strong>등록할 지역의 실제 비율</strong>을 넣으면 정확해집니다.
            친환경차·다자녀 감면은 요건이 복잡해 반영하지 않았고, 신차 출고가에 이미 포함된
            개별소비세·교육세도 따로 계산하지 않습니다. 결과는 추정치입니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="차량 정보" />
          <div className="flex flex-col gap-3">
            <div>
              <Label>차량 가격 (원)</Label>
              <CommaInput value={price} onChange={setPrice} placeholder="예: 30,000,000" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                신차는 출고가, 중고차는 과세표준액 기준
              </p>
            </div>
            <div>
              <Label>차종</Label>
              <select
                value={carType}
                onChange={e => setCarType(e.target.value as CarType)}
                className={selectCls}
              >
                {CAR_TYPES.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.label} — 취득세 {(t.rate * 100).toFixed(0)}%
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {CAR_TYPES.find(t => t.id === carType)?.note}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="공채 · 기타" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>공채 매입 비율 (%)</Label>
              <input
                type="number" value={bondRate} onChange={e => setBondRate(e.target.value)}
                step="0.1" min="0" className={inputCls}
              />
            </div>
            <div>
              <Label>즉시 매도 할인율 (%)</Label>
              <input
                type="number" value={bondDiscountRate} onChange={e => setBondDiscountRate(e.target.value)}
                step="0.1" min="0" max="100" className={inputCls}
              />
            </div>
            <div className="col-span-2">
              <Label>등록 대행·번호판 등 실비 (원)</Label>
              <CommaInput value={etcFee} onChange={setEtcFee} placeholder="예: 150,000" />
            </div>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 leading-relaxed">
            공채를 만기까지 보유할 계획이면 할인율을 0으로 두세요. 되파는 경우에만 손실이 생깁니다.
          </p>
        </Card>

        <PrimaryBtn onClick={calculate}>취등록세 계산</PrimaryBtn>

        {result && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                차값 외 추가 비용
              </p>
              <p className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {w(result.extraTotal)}<span className="text-lg font-bold ml-1">원</span>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                차값의 {result.extraRate.toFixed(1)}% · 총 {w(result.grandTotal)}원 필요
              </p>
            </Card>

            <Card className="p-5">
              <CardHeader title="내역" />
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">취득세</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                    {w(result.acquisitionTax)}원
                  </span>
                </div>
                {result.exemption > 0 && (
                  <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400">
                    <span>경차 감면</span>
                    <span className="tabular-nums">
                      −{w(result.exemption)}원 (감면 전 {w(result.acquisitionTaxBefore)}원)
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">공채 매도 손실</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                    {w(result.bondCost)}원
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>공채 매입액 (되팔면 대부분 회수)</span>
                  <span className="tabular-nums">{w(result.bondPurchase)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">등록 실비</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                    {w(result.etcFee)}원
                  </span>
                </div>
              </div>

              <SummaryGrid>
                <SummaryCard label="차량 가격" value={`${w(price)}원`} />
                <SummaryCard label="총 필요 금액" value={`${w(result.grandTotal)}원`} />
              </SummaryGrid>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
