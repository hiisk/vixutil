'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryGrid, SummaryCard } from '@/components/CalcShell';

const TIP_RATES = [10, 15, 18, 20, 25];
const w = (n: number) => Math.round(n).toLocaleString();

export default function TipPage() {
  const [amount, setAmount] = useState('');
  const [tipRate, setTipRate] = useState<number | null>(15);
  const [customRate, setCustomRate] = useState('');
  const [people, setPeople] = useState('2');
  const [result, setResult] = useState<{
    tipAmount: number;
    tipPerPerson: number;
    total: number;
    totalPerPerson: number;
    rate: number;
  } | null>(null);

  function calculate() {
    const a = Number(amount);
    const p = Number(people) || 1;
    const rate = tipRate !== null ? tipRate : Number(customRate);
    if (!a || !rate) return;

    const tipAmount = a * (rate / 100);
    const total = a + tipAmount;
    setResult({
      tipAmount,
      tipPerPerson: tipAmount / p,
      total,
      totalPerPerson: total / p,
      rate,
    });
  }

  function handleRateBtn(r: number) {
    setTipRate(r);
    setCustomRate('');
  }

  function handleCustomRate(v: string) {
    setCustomRate(v);
    setTipRate(null);
  }

  return (
    <CalcShell title="팁 계산기" description="금액과 팁 비율, 인원수를 입력하면 1인당 금액을 자동 계산합니다">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">결제 정보</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>금액 (원)</Label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="예: 50000"
                className={inputCls}
              />
            </div>

            <div>
              <Label>팁 비율</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {TIP_RATES.map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRateBtn(r)}
                    className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                      tipRate === r
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-200 text-slate-500 hover:border-blue-300'
                    }`}
                  >
                    {r}%
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={customRate}
                  onChange={e => handleCustomRate(e.target.value)}
                  placeholder="직접 입력 (%)"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <Label>인원수</Label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPeople(String(n))}
                    className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                      people === String(n)
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-200 text-slate-500 hover:border-blue-300'
                    }`}
                  >
                    {n}명
                  </button>
                ))}
                <input
                  type="number"
                  value={Number(people) > 6 ? people : ''}
                  onChange={e => setPeople(e.target.value)}
                  placeholder="직접 입력"
                  className={`${inputCls} w-24`}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <SummaryGrid>
              <SummaryCard
                label="팁 금액"
                value={`${w(result.tipAmount)}원`}
                sub={`${result.rate}% 기준`}
                variant="primary"
              />
              <SummaryCard
                label="총 금액"
                value={`${w(result.total)}원`}
                sub={`원금 + 팁`}
              />
              <SummaryCard
                label="1인당 팁"
                value={`${w(result.tipPerPerson)}원`}
                sub={`${Number(people)}명 기준`}
                variant="green"
              />
              <SummaryCard
                label="1인당 총액"
                value={`${w(result.totalPerPerson)}원`}
                sub={`${Number(people)}명 기준`}
                variant="green"
              />
            </SummaryGrid>

            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">상세 내역</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: '원금', value: `${w(Number(amount))}원` },
                  { label: `팁 (${result.rate}%)`, value: `+${w(result.tipAmount)}원` },
                  { label: '합계', value: `${w(result.total)}원`, bold: true },
                  { label: '인원수', value: `${people}명` },
                  { label: '1인당 부담', value: `${w(result.totalPerPerson)}원`, bold: true },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-2 ${i < 4 ? 'border-b border-slate-100' : ''}`}
                  >
                    <span className="text-sm text-slate-500">{row.label}</span>
                    <span className={`text-sm ${row.bold ? 'font-black text-slate-900' : 'text-slate-700'}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
