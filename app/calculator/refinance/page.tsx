'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { compareRefinance, type RefinanceResult } from '@/lib/refinance';

const w = (n: number) => Math.round(n).toLocaleString();
const signed = (n: number) => (n > 0 ? `+${w(n)}` : w(n));

export default function RefinancePage() {
  const [balance, setBalance] = useState(0);
  const [currentRate, setCurrentRate] = useState('');
  const [currentMonths, setCurrentMonths] = useState('');
  const [newRate, setNewRate] = useState('');
  const [newMonths, setNewMonths] = useState('');
  const [prepaymentFee, setPrepaymentFee] = useState(0);
  const [setupCost, setSetupCost] = useState(0);
  const [result, setResult] = useState<RefinanceResult | null>(null);

  function calculate() {
    if (balance <= 0 || !currentRate || !currentMonths || !newRate || !newMonths) return;
    setResult(
      compareRefinance({
        balance,
        currentRate: Number(currentRate),
        currentMonths: Number(currentMonths),
        newRate: Number(newRate),
        newMonths: Number(newMonths),
        prepaymentFee,
        setupCost,
      }),
    );
  }

  return (
    <CalcShell
      path="/calculator/refinance"
            title="대출 갈아타기 계산기"
      description="중도상환수수료까지 넣고 대환이 정말 이득인지, 몇 달 만에 본전인지 계산합니다."
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>남은 대출 원금 (원)</Label>
              <CommaInput value={balance} onChange={setBalance} placeholder="예: 100,000,000" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>현재 금리 (%)</Label>
                <input type="number" step="0.01" value={currentRate}
                  onChange={e => setCurrentRate(e.target.value)}
                  placeholder="예: 5.2" className={inputCls} />
              </div>
              <div>
                <Label>남은 기간 (개월)</Label>
                <input type="number" value={currentMonths}
                  onChange={e => setCurrentMonths(e.target.value)}
                  placeholder="예: 120" className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>갈아탈 금리 (%)</Label>
                <input type="number" step="0.01" value={newRate}
                  onChange={e => setNewRate(e.target.value)}
                  placeholder="예: 4.1" className={inputCls} />
              </div>
              <div>
                <Label>새 상환 기간 (개월)</Label>
                <input type="number" value={newMonths}
                  onChange={e => setNewMonths(e.target.value)}
                  placeholder="예: 120" className={inputCls} />
              </div>
            </div>

            <div>
              <Label>중도상환수수료 (원)</Label>
              <CommaInput value={prepaymentFee} onChange={setPrepaymentFee} placeholder="예: 1,200,000" />
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                보통 실행 후 3년이 지나면 면제됩니다. 모르면 0으로 두세요.
              </p>
            </div>

            <div>
              <Label>기타 비용 (인지세·근저당 설정비 등)</Label>
              <CommaInput value={setupCost} onChange={setSetupCost} placeholder="예: 300,000" />
            </div>

            <PrimaryBtn onClick={calculate}>비교하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <Card>
            <CardHeader title="갈아타기 비교" sub="원리금균등상환 기준 · 참고용 추정치" />

            <div className="p-4">
              <SummaryGrid>
                <SummaryCard
                  label="순이익 (비용 반영)"
                  value={`${signed(result.netBenefit)}원`}
                  sub={result.worthIt ? '갈아타는 게 이득' : '갈아타면 손해'}
                  variant={result.worthIt ? 'green' : 'red'}
                />
                <SummaryCard
                  label="월 납입액 변화"
                  value={`${signed(result.paymentDiff)}원`}
                  sub={`${w(result.currentPayment)} → ${w(result.newPayment)}`}
                  variant={result.paymentDiff < 0 ? 'green' : 'default'}
                />
                <SummaryCard
                  label="총이자 절감액"
                  value={`${signed(result.interestSaved)}원`}
                  sub={result.interestSaved < 0 ? '오히려 더 냅니다' : '비용 반영 전'}
                  variant={result.interestSaved < 0 ? 'red' : 'default'}
                />
                <SummaryCard
                  label="본전까지"
                  value={
                    result.breakEvenMonths === null
                      ? '해당 없음'
                      : result.breakEvenMonths === 0
                      ? '즉시'
                      : `${result.breakEvenMonths}개월`
                  }
                  sub={
                    result.breakEvenMonths === null
                      ? '월 납입액이 줄지 않음'
                      : `초기 비용 ${w(result.upfrontCost)}원 회수`
                  }
                />
              </SummaryGrid>
            </div>

            <div className="px-5 pb-4">
              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-300 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">현재 대출 총이자</span>
                  <span className="font-semibold">{w(result.currentTotalInterest)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">갈아탄 뒤 총이자</span>
                  <span className="font-semibold">{w(result.newTotalInterest)}원</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1.5">
                  <span className="text-slate-500 dark:text-slate-400">이자 절감액</span>
                  <span className={`font-semibold ${result.interestSaved >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {signed(result.interestSaved)}원
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">초기 비용 (수수료 + 부대비용)</span>
                  <span className="font-semibold text-red-600">-{w(result.upfrontCost)}원</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1.5 font-bold text-slate-800 dark:text-slate-100">
                  <span>순이익</span>
                  <span className={result.worthIt ? 'text-emerald-600' : 'text-red-600'}>
                    {signed(result.netBenefit)}원
                  </span>
                </div>
              </div>
            </div>

            {result.interestSaved < 0 && result.paymentDiff < 0 && (
              <div className="px-5 pb-5">
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 rounded-xl p-4">
                  <p className="text-sm font-bold text-amber-800 dark:text-amber-200 mb-1">
                    ⚠️ 월 부담은 줄지만 총이자는 더 냅니다
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                    상환 기간을 늘려서 월 납입액이 {w(-result.paymentDiff)}원 줄어 보이지만,
                    이자를 내는 기간이 길어져 총이자가 {w(-result.interestSaved)}원 늘어납니다.
                    당장의 현금흐름이 급하지 않다면 다시 생각해볼 조건입니다.
                  </p>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </CalcShell>
  );
}
