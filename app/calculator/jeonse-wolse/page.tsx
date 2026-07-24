'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { calcJeonseWolse, type JeonseWolseResult } from '@/lib/jeonse-wolse';

const w = (n: number) => Math.round(n).toLocaleString();

export default function JeonseWolsePage() {
  const [jeonseDeposit, setJeonseDeposit] = useState(300_000_000);
  const [wolseDeposit, setWolseDeposit] = useState(30_000_000);
  const [monthlyRent, setMonthlyRent] = useState(1_000_000);
  const [rate, setRate] = useState('4.0');
  const [result, setResult] = useState<JeonseWolseResult | null>(null);

  function calculate() {
    if (jeonseDeposit <= 0) return;
    setResult(calcJeonseWolse({
      jeonseDeposit, wolseDeposit, monthlyRent, rate: Number(rate) || 0,
    }));
  }

  const cheaperLabel = result
    ? result.cheaper === 'jeonse' ? '전세가 유리' : result.cheaper === 'wolse' ? '월세가 유리' : '거의 같음'
    : '';

  return (
    <CalcShell
      path="/calculator/jeonse-wolse"
      title="전세 월세 유불리 계산기"
      description="같은 집의 전세와 월세, 지금 내 상황에서 어느 쪽이 이득인지 비교합니다"
      intro={
        <>
          <h2>핵심은 묶인 돈의 기회비용입니다</h2>
          <p>
            전세는 큰 보증금을 통째로 묶는 대신 월세를 안 냅니다. 월세는 보증금이 작아 돈이
            남지만 매달 월세가 나갑니다. 어느 쪽이 이득인지는 <strong>그 돈을 다른 데서 몇 %로
            굴릴 수 있느냐</strong>에 달려 있습니다. 그래서 두 방식의 연간 실비용을 같은 기준으로
            계산해 비교합니다.
          </p>
          <p>
            <strong>전세 연 비용 = 전세보증금 × 자금비용률</strong><br />
            <strong>월세 연 비용 = 월세×12 + 월세보증금 × 자금비용률</strong>
          </p>
          <h2>자금비용률을 어떻게 잡나요</h2>
          <p>
            전세금을 대출로 마련한다면 <strong>전세자금대출 금리</strong>를, 내 돈이라면 그 돈을
            예금이나 투자로 굴렸을 때 벌 수 있는 <strong>수익률(기회비용)</strong>을 넣으세요. 이 값이
            높을수록 큰 전세보증금을 묶는 부담이 커져 월세가 유리해집니다.
          </p>
          <h2>손익분기 금리 한 줄로 답이 나옵니다</h2>
          <p>
            이 계산기는 두 방식의 비용이 같아지는 <strong>손익분기 금리</strong>를 함께 알려줍니다.
            내 돈이 그 금리보다 높게 굴러가면 월세가, 낮으면 전세가 유리합니다. 지금 예금금리와
            비교하면 바로 판단할 수 있습니다.
          </p>
          <h2>계산에 안 들어간 것</h2>
          <p>
            전세는 <strong>보증금 미반환 위험</strong>이 있고, 월세는 매달 나가는 현금이 부담이지만
            목돈이 묶이지 않아 <strong>유동성</strong>이 좋습니다. 이런 위험·편의는 숫자로 담기 어려워
            빠져 있습니다. 전세대출 이자에 대한 소득공제, 월세 세액공제 같은 세제 혜택도 반영하지
            않았습니다. 순수하게 자금 비용만 비교한 결과입니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="전세 조건" />
          <div>
            <Label>전세보증금 (원)</Label>
            <CommaInput value={jeonseDeposit} onChange={setJeonseDeposit} placeholder="예: 300,000,000" />
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="월세 조건" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>월세 보증금 (원)</Label>
              <CommaInput value={wolseDeposit} onChange={setWolseDeposit} placeholder="예: 30,000,000" />
            </div>
            <div>
              <Label>월세 (원)</Label>
              <CommaInput value={monthlyRent} onChange={setMonthlyRent} placeholder="예: 1,000,000" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="자금비용률" />
          <div>
            <Label>연 자금비용률 (%)</Label>
            <input
              type="number" value={rate} onChange={e => setRate(e.target.value)}
              step="0.1" min="0" className={inputCls}
            />
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              전세대출 금리, 또는 내 돈이면 예금·투자 기회비용
            </p>
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>유불리 비교</PrimaryBtn>

        {result && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                비교 결과
              </p>
              <p className={`text-3xl font-black ${
                result.cheaper === 'jeonse' ? 'text-blue-600 dark:text-blue-400'
                : result.cheaper === 'wolse' ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-slate-900 dark:text-slate-100'
              }`}>
                {cheaperLabel}
              </p>
              {result.cheaper !== 'equal' && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  연 {w(Math.abs(result.annualDiff))}원 · 월 {w(result.monthlyDiff)}원 저렴
                </p>
              )}
            </Card>

            <Card className="p-5">
              <CardHeader title="연간 비용 비교" />
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">전세 연 비용</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.jeonseAnnualCost)}원</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>전세보증금 × 자금비용률</span>
                  <span className="tabular-nums">{w(jeonseDeposit)} × {rate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">월세 연 비용</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{w(result.wolseAnnualCost)}원</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>월세×12 + 월세보증금 × 자금비용률</span>
                  <span className="tabular-nums">{w(monthlyRent * 12)} + {w(wolseDeposit)}×{rate}%</span>
                </div>
              </div>

              <SummaryGrid>
                <SummaryCard label="전세 연 비용" value={`${w(result.jeonseAnnualCost)}원`} variant={result.cheaper === 'jeonse' ? 'primary' : 'default'} />
                <SummaryCard label="월세 연 비용" value={`${w(result.wolseAnnualCost)}원`} variant={result.cheaper === 'wolse' ? 'green' : 'default'} />
                <SummaryCard
                  label="손익분기 금리"
                  value={result.breakevenRate === null ? '—' : `${result.breakevenRate.toFixed(2)}%`}
                  sub={result.breakevenRate === null ? undefined : '이보다 높으면 월세'}
                />
                <SummaryCard label="월 차액" value={`${w(result.monthlyDiff)}원`} />
              </SummaryGrid>

              {result.breakevenRate !== null && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 leading-relaxed">
                  내 돈이 연 {result.breakevenRate.toFixed(2)}%보다 높게 굴러가면 월세가, 낮으면 전세가 유리합니다.
                  지금 넣은 자금비용률은 {rate}%입니다.
                </p>
              )}
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
