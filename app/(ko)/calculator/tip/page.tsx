'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryGrid, SummaryCard } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

const TIP_RATES = [10, 15, 18, 20, 25];
const w = (n: number) => Math.round(n).toLocaleString();

export default function TipPage() {
  const [amount, setAmount] = useState(50_000);
  const [tipRate, setTipRate] = useState<number | null>(15);
  const [customRate, setCustomRate] = useState('');
  const [people, setPeople] = useState('4');

  const [result, setResult] = useState<{
    tipAmount: number;
    tipPerPerson: number;
    total: number;
    totalPerPerson: number;
    rate: number;
  } | null>(null);

  function calculate() {
    const a = amount;
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
    <CalcShell
      path="/calculator/tip"
      title="팁 계산기"
      description="금액과 팁 비율, 인원수를 입력하면 1인당 금액을 자동 계산합니다"
      intro={
        <>
          <h2>얼마가 적당한가</h2>
          <p>
            미국 기준으로 식당은 보통 <strong>15~20%</strong>, 서비스가 좋았다면 그 이상을 줍니다.
            카페 테이크아웃이나 바에서는 관행이 다르고, 나라에 따라 팁 문화가 아예 없거나 요금에
            포함돼 있기도 합니다. 유럽·일본처럼 팁을 주지 않는 것이 자연스러운 곳도 많습니다.
          </p>
          <h2>서비스료가 이미 붙었는지 확인하세요</h2>
          <p>
            영수증에 <strong>gratuity</strong>나 <strong>service charge</strong>가 이미 포함된 경우가
            있습니다. 단체 손님에게 자동으로 붙이는 식당이 많은데, 모르고 또 주면 두 번 내는 셈입니다.
            계산 전에 항목을 한 번 훑어보세요.
          </p>
          <h2>세금 전 금액이 기준입니다</h2>
          <p>
            원칙적으로 팁은 <strong>세금을 뺀 음식값</strong>을 기준으로 계산합니다. 세금이 포함된
            총액으로 계산하면 조금 더 내게 되는데, 편의상 그렇게 하는 사람도 많습니다. 인원수로 나눌
            때는 끝자리를 올림해 정리하면 계산이 깔끔합니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">결제 정보</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>금액 (원)</Label>
              <CommaInput value={amount} onChange={setAmount} placeholder="예: 50,000" />
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
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-300'
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
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-300'
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
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">상세 내역</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: '원금', value: `${w(amount)}원` },
                  { label: `팁 (${result.rate}%)`, value: `+${w(result.tipAmount)}원` },
                  { label: '합계', value: `${w(result.total)}원`, bold: true },
                  { label: '인원수', value: `${people}명` },
                  { label: '1인당 부담', value: `${w(result.totalPerPerson)}원`, bold: true },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-2 ${i < 4 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}
                  >
                    <span className="text-sm text-slate-500 dark:text-slate-400">{row.label}</span>
                    <span className={`text-sm ${row.bold ? 'font-black text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-200'}`}>
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
