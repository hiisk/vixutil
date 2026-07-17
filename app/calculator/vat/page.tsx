'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, inputCls, PrimaryBtn,
  SummaryCard, SummaryGrid, TabBar,
} from '@/components/CalcShell';

const w = (n: number) => Math.round(n).toLocaleString();

type Mode = 'from-supply' | 'from-total';

interface Result {
  supply: number;
  vat: number;
  total: number;
  vatRate: string;
}

export default function VatPage() {
  const [mode, setMode] = useState<Mode>('from-supply');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const v = Number(input);
    if (!v || v <= 0) return;
    if (mode === 'from-supply') {
      const vat = v * 0.1;
      setResult({ supply: v, vat, total: v + vat, vatRate: '10%' });
    } else {
      const supply = v / 1.1;
      const vat = v / 11;
      setResult({ supply, vat, total: v, vatRate: '10%' });
    }
  }

  function handleModeChange(m: Mode) {
    setMode(m);
    setInput('');
    setResult(null);
  }

  return (
    <CalcShell
      path="/calculator/vat"
      title="부가세 계산기"
      description="공급가액 ↔ 부가세 ↔ 공급대가 계산"
      intro={
        <>
          <h2>세 가지 용어</h2>
          <p>
            <strong>공급가액</strong>은 부가세를 뺀 물건값, <strong>부가세</strong>는 그 10%,{' '}
            <strong>공급대가</strong>는 둘을 합친 최종 결제 금액입니다. 견적서에{' '}
            &ldquo;VAT 별도&rdquo;라고 적혀 있으면 적힌 숫자가 공급가액이라 실제로는 10%를 더 내야 합니다.
          </p>
          <h2>110만원의 부가세는 10만원입니다</h2>
          <p>
            가장 흔한 실수가 <strong>총액에서 10%를 빼는 것</strong>입니다. 110만원에서 10%인 11만원을
            빼면 99만원이 되는데 틀린 계산입니다. 부가세가 포함된 금액에서 역산할 때는{' '}
            <strong>÷ 1.1</strong>을 해야 합니다. 110만원 ÷ 1.1 = 100만원이 공급가액이고 부가세는
            10만원입니다.
          </p>
          <h2>사업자는 받아서 냅니다</h2>
          <p>
            부가세는 사업자의 돈이 아니라 <strong>소비자에게 대신 받아 국가에 내는 돈</strong>입니다.
            그래서 매출 부가세에서 매입할 때 낸 부가세를 뺀 차액만 납부합니다. 통장에 들어온 금액에
            부가세가 섞여 있는 걸 잊고 다 쓰면 신고 때 곤란해지므로, 받는 즉시 떼어두는 것이 안전합니다.
            간이과세자나 면세사업자는 계산 방식이 다릅니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar<Mode>
          options={[
            { value: 'from-supply', label: '공급가액 → 부가세' },
            { value: 'from-total', label: '공급대가 → 부가세' },
          ]}
          value={mode}
          onChange={handleModeChange}
        />

        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>
                {mode === 'from-supply' ? '공급가액 (원, 부가세 제외)' : '공급대가 (원, 부가세 포함)'}
              </Label>
              <input
                type="number"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={mode === 'from-supply' ? '예: 100,000' : '예: 110,000'}
                className={inputCls}
              />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <Card>
            <CardHeader title="계산 결과" sub="부가가치세법 기준" />
            <div className="p-4">
              <SummaryGrid>
                <SummaryCard
                  label="공급가액"
                  value={`${w(result.supply)}원`}
                  sub="부가세 제외"
                />
                <SummaryCard
                  label="부가세 (10%)"
                  value={`${w(result.vat)}원`}
                  variant="primary"
                />
                <SummaryCard
                  label="공급대가"
                  value={`${w(result.total)}원`}
                  sub="부가세 포함"
                />
                <SummaryCard
                  label="부가세율"
                  value={result.vatRate}
                  sub="표준세율"
                />
              </SummaryGrid>
            </div>
            <div className="px-5 pb-4">
              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-300 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">공급가액</span>
                  <span className="font-semibold">{w(result.supply)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">부가가치세 (×10%)</span>
                  <span className="font-semibold text-blue-600">+{w(result.vat)}원</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1.5 font-bold text-slate-800 dark:text-slate-100">
                  <span>공급대가 합계</span>
                  <span>{w(result.total)}원</span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalcShell>
  );
}
