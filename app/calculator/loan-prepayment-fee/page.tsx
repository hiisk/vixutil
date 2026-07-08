'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryGrid, SummaryCard } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { CALC_FAQ } from '@/lib/calc-faq';

const RATE_PRESETS = [
  { label: '신용대출 (약 0.7%)', rate: 0.7 },
  { label: '전세자금대출 (약 0.7%)', rate: 0.7 },
  { label: '주택담보대출 (약 1.3%)', rate: 1.3 },
];

const w = (n: number) => Math.round(n).toLocaleString();

export default function LoanPrepaymentFeePage() {
  const [principal, setPrincipal] = useState(50_000_000);
  const [rate, setRate] = useState<number | null>(1.3);
  const [customRate, setCustomRate] = useState('');
  const [termMonths, setTermMonths] = useState('36');
  const [elapsedMonths, setElapsedMonths] = useState('12');

  const [result, setResult] = useState<{
    fee: number;
    remainingMonths: number;
    remainingRatio: number;
    usedRate: number;
  } | null>(null);

  function calculate() {
    const term = Number(termMonths);
    const elapsed = Number(elapsedMonths);
    const usedRate = rate !== null ? rate : Number(customRate);
    if (!principal || !term || !usedRate || elapsed < 0) return;

    const remainingMonths = Math.max(0, term - elapsed);
    const remainingRatio = term > 0 ? remainingMonths / term : 0;
    const fee = principal * (usedRate / 100) * remainingRatio;

    setResult({ fee, remainingMonths, remainingRatio, usedRate });
  }

  function handleRateBtn(r: number) {
    setRate(r);
    setCustomRate('');
  }

  function handleCustomRate(v: string) {
    setCustomRate(v);
    setRate(null);
  }

  return (
    <CalcShell
      title="중도상환수수료 계산기"
      description="대출을 만기 전에 갚을 때 발생하는 중도상환수수료를 계산합니다"
      faq={CALC_FAQ['loan-prepayment-fee']}
      intro={
        <>
          <h2>중도상환수수료란?</h2>
          <p>
            대출 실행일로부터 <strong>일정 기간이 지나기 전에</strong> 원금을 조기 상환하면, 금융사가 대출 취급에 든
            비용을 보전하기 위해 부과하는 수수료입니다. 통상 <strong>대출 실행 후 3년이 지나면 면제</strong>되는
            경우가 많습니다.
          </p>
          <h2>계산 방식</h2>
          <p>
            중도상환수수료 = 중도상환원금 × 수수료율 × (잔존기간 ÷ 전체 대출기간). 잔존기간이 길수록(조기에 갚을수록)
            수수료가 커지고, 만기에 가까워질수록 수수료가 줄어듭니다. 이 계산기는 일수 대신 개월 수 기준으로
            근사 계산합니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">대출 정보</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>중도상환원금 (원)</Label>
              <CommaInput value={principal} onChange={setPrincipal} placeholder="예: 50,000,000" />
            </div>

            <div>
              <Label>수수료율</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {RATE_PRESETS.map(p => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handleRateBtn(p.rate)}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                      rate === p.rate
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-200 text-slate-500 hover:border-blue-300'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <input
                type="number"
                step="0.1"
                value={customRate}
                onChange={e => handleCustomRate(e.target.value)}
                placeholder="직접 입력 (%)"
                className={inputCls}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>전체 대출기간 (개월)</Label>
                <input
                  type="number"
                  value={termMonths}
                  onChange={e => setTermMonths(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <Label>이미 갚은 기간 (개월)</Label>
                <input
                  type="number"
                  value={elapsedMonths}
                  onChange={e => setElapsedMonths(e.target.value)}
                  className={inputCls}
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
                label="중도상환수수료"
                value={`${w(result.fee)}원`}
                sub={`수수료율 ${result.usedRate}%`}
                variant="primary"
              />
              <SummaryCard
                label="잔존기간"
                value={`${result.remainingMonths}개월`}
                sub={`전체 대비 ${(result.remainingRatio * 100).toFixed(0)}%`}
              />
            </SummaryGrid>

            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">계산 상세</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: '중도상환원금', value: `${w(principal)}원` },
                  { label: '수수료율', value: `${result.usedRate}%` },
                  { label: '잔존기간 비율', value: `${(result.remainingRatio * 100).toFixed(1)}%` },
                  { label: '중도상환수수료', value: `${w(result.fee)}원`, bold: true },
                ].map((row, i) => (
                  <div key={i} className={`flex justify-between items-center py-2 ${i < 3 ? 'border-b border-slate-100' : ''}`}>
                    <span className="text-sm text-slate-500">{row.label}</span>
                    <span className={`text-sm ${row.bold ? 'font-black text-slate-900' : 'text-slate-700'}`}>{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3">
                실제 수수료는 금융사·상품 약정에 따라 계산 기준(일할 계산 등)이 다를 수 있어 참고용으로만 확인하세요.
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
