'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

const fmt = (n: number) => Math.round(n).toLocaleString();
const pct = (n: number) => n.toFixed(2) + '%';

export default function RoiPage() {
  const [mode, setMode] = useState<'simple' | 'annualized'>('simple');
  const [buy, setBuy] = useState(5_000_000);
  const [sell, setSell] = useState(7_000_000);
  const [fee, setFee] = useState(0);
  const [years, setYears] = useState('');

  const [result, setResult] = useState<{
    profit: number;
    roi: number;
    cagr?: number;
    isGain: boolean;
  } | null>(null);

  function calculate() {
    const b = buy;
    const s = sell;
    const f = fee;
    if (b <= 0 || s <= 0) return;

    const profit = s - b - f;
    const roi = (profit / b) * 100;
    let cagr: number | undefined;

    if (mode === 'annualized') {
      const y = Number(years);
      if (y > 0) cagr = (Math.pow(s / b, 1 / y) - 1) * 100;
    }

    setResult({ profit, roi, cagr, isGain: profit >= 0 });
  }

  return (
    <CalcShell
      path="/calculator/roi"
      title="투자 수익률 계산기"
      description="매수·매도 금액 기준 수익률 및 연환산 수익률(CAGR)"
      intro={
        <>
          <h2>총수익률과 연환산수익률</h2>
          <p>
            <strong>총수익률</strong>은 그냥 얼마가 늘었느냐이고, <strong>연환산수익률(CAGR)</strong>은
            그걸 &ldquo;매년 몇 %씩 복리로 불어난 셈이냐&rdquo;로 바꾼 값입니다. 기간이 다른 투자를
            비교하려면 총수익률로는 안 되고 이 값이 있어야 합니다.
          </p>
          <h2>기간을 빼면 비교가 안 됩니다</h2>
          <p>
            &ldquo;50% 벌었다&rdquo;는 말은 그것만으로 아무 뜻이 없습니다. 1년에 50%면 훌륭하지만
            10년에 50%면 <strong>연 4% 남짓</strong>이라 예금과 크게 다르지 않습니다. 수익률 자랑이
            기간을 빼놓고 이야기되는 경우가 많은 이유이기도 합니다.
          </p>
          <h2>50% 잃으면 100% 벌어야 본전입니다</h2>
          <p>
            수익률은 대칭이 아닙니다. 100만원이 50만원이 되면 −50%지만, 다시 100만원이 되려면{' '}
            <strong>+100%</strong>가 필요합니다. 손실이 커질수록 회복에 필요한 수익률이 가파르게
            올라갑니다.
          </p>
          <h2>수수료·세금·물가는 빠져 있습니다</h2>
          <p>
            이 계산기는 <strong>세전·명목</strong> 기준이고 매매 수수료도 반영하지 않습니다. 실제
            손에 남는 수익은 더 적고, 물가가 오른 만큼 실질 수익은 또 줄어듭니다. 중간에 추가로 넣거나
            뺀 돈이 있으면 이 방식으로는 정확히 계산되지 않습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'simple', label: '단순 수익률' },
            { value: 'annualized', label: '연환산 (CAGR)' },
          ]}
          value={mode}
          onChange={v => setMode(v as 'simple' | 'annualized')}
        />
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>매수 금액 (원)</Label>
              <CommaInput value={buy} onChange={setBuy} placeholder="예: 5,000,000" />
            </div>
            <div>
              <Label>매도 금액 (원)</Label>
              <CommaInput value={sell} onChange={setSell} placeholder="예: 7,000,000" />
            </div>
            <div>
              <Label>수수료·세금 합계 (원, 선택)</Label>
              <CommaInput value={fee} onChange={setFee} placeholder="0" />
            </div>
            {mode === 'annualized' && (
              <div>
                <Label>보유기간 (년)</Label>
                <input type="number" value={years} onChange={e => setYears(e.target.value)}
                  placeholder="예: 3" className={inputCls} min="0" step="0.5" />
              </div>
            )}
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className={`rounded-2xl p-5 ${result.isGain ? 'bg-blue-600' : 'bg-rose-500'}`}>
              <p className="text-white/70 text-xs mb-1">순손익</p>
              <p className="text-white text-3xl font-black">
                {result.isGain ? '+' : ''}{fmt(result.profit)}원
              </p>
              <p className="text-white/70 text-sm mt-1">수익률 {pct(result.roi)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="수익률" value={pct(result.roi)} variant={result.isGain ? 'green' : 'red'} />
              {result.cagr !== undefined && (
                <SummaryCard label="연환산 CAGR" value={pct(result.cagr)} variant={result.isGain ? 'green' : 'red'} />
              )}
            </div>
          </>
        )}
      </div>
    </CalcShell>
  );
}
