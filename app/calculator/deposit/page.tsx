'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function DepositPage() {
  const [mode, setMode] = useState<'simple' | 'compound'>('simple');
  const [principal, setPrincipal] = useState(10_000_000);
  const [rate, setRate] = useState('3.5');
  const [period, setPeriod] = useState('12');
  const [unit, setUnit] = useState<'month' | 'year'>('month');
  const [result, setResult] = useState<null | {
    interest: number; tax: number; netInterest: number; total: number;
  }>(null);

  function calculate() {
    const p = principal;
    const r = Number(rate) / 100;
    const periodVal = Number(period);
    if (p <= 0 || r <= 0 || periodVal <= 0) return;

    const years = unit === 'year' ? periodVal : periodVal / 12;
    let interest = 0;
    if (mode === 'simple') {
      interest = p * r * years;
    } else {
      interest = p * (Math.pow(1 + r, years) - 1);
    }
    const tax = interest * 0.154;
    setResult({ interest, tax, netInterest: interest - tax, total: p + interest - tax });
  }

  return (
    <CalcShell
      path="/calculator/deposit"
      title="예금 이자 계산기"
      description="단리·복리 예금 이자 및 세후 수령액 계산"
      intro={
        <>
          <h2>단리와 복리</h2>
          <p>
            <strong>단리</strong>는 원금에만 이자가 붙고, <strong>복리</strong>는 붙은 이자에 다시 이자가
            붙습니다. 1년짜리면 둘의 차이가 거의 없지만 기간이 길어질수록 벌어집니다. 은행 정기예금은
            대부분 단리이거나 만기일시지급 방식이므로, 상품 설명에 <strong>월복리</strong>라고 적혀 있지
            않다면 단리로 보는 게 맞습니다.
          </p>
          <h2>세후 금액이 진짜 받는 돈입니다</h2>
          <p>
            이자에는 <strong>이자소득세 15.4%</strong>(소득세 14% + 지방소득세 1.4%)가 원천징수됩니다.
            금리 4%짜리에 넣어도 실제로 손에 쥐는 건 3.4% 수준이라는 뜻입니다. 상품을 비교할 때는 표시
            금리가 아니라 <strong>세후 수령액</strong>으로 견주세요.
          </p>
          <h2>중도해지하면 계산이 달라집니다</h2>
          <p>
            만기를 채우지 못하면 약정 금리가 아니라 훨씬 낮은{' '}
            <strong>중도해지이율</strong>이 적용됩니다. 이 계산기는 만기까지 유지하는 것을 전제로 하므로,
            중간에 쓸 가능성이 있는 돈이라면 결과보다 훨씬 적게 받을 수 있습니다. 이자가 연 2,000만원을
            넘으면 금융소득종합과세 대상이 되어 세금이 더 붙는 점도 감안하세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'simple', label: '단리' },
            { value: 'compound', label: '복리' },
          ]}
          value={mode}
          onChange={v => { setMode(v as 'simple' | 'compound'); setResult(null); }}
        />
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>예치금액 (원)</Label>
              <CommaInput value={principal} onChange={setPrincipal} placeholder="예: 10,000,000" />
            </div>
            <div>
              <Label>연 이자율 (%)</Label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                placeholder="예: 3.5" className={inputCls} min="0" step="0.1" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Label>예치기간</Label>
                <input type="number" value={period} onChange={e => setPeriod(e.target.value)}
                  placeholder="1" className={inputCls} min="0" />
              </div>
              <div>
                <Label>단위</Label>
                <select value={unit} onChange={e => setUnit(e.target.value as 'month' | 'year')} className={inputCls}>
                  <option value="month">개월</option>
                  <option value="year">년</option>
                </select>
              </div>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">만기 수령액 (세후)</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="원금" value={`${fmt(principal)}원`} />
              <SummaryCard label="세전 이자" value={`${fmt(result.interest)}원`} variant="green" />
              <SummaryCard label="이자소득세 (15.4%)" value={`-${fmt(result.tax)}원`} variant="red" />
              <SummaryCard label="세후 이자" value={`${fmt(result.netInterest)}원`} variant="green" />
            </div>
          </>
        )}
      </div>
    </CalcShell>
  );
}
