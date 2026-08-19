'use client';
import { useState } from 'react';
import MoneyInput from '@/components/MoneyInput';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import { decliningTable, halfLife } from '@/lib/depreciation';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function CarDepreciationPage() {
  const [price, setPrice] = useState('40000000');
  const [rate, setRate] = useState('15');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState<null | { rows: ReturnType<typeof decliningTable>; half: number | null }>(null);

  function calculate() {
    const p = Number(price);
    const r = Number(rate) / 100;
    const y = Number(years);
    if (p <= 0 || r < 0 || r >= 1 || y <= 0 || y > 30) return;
    setResult({ rows: decliningTable(p, r, y), half: halfLife(r) });
  }

  return (
    <CalcShell
      path="/calculator/car-depreciation"
      title="자동차 감가상각 계산기"
      description="연식별 잔존가치와 값이 절반이 되는 해"
      intro={
        <>
          <h2>앞쪽 해에 훨씬 많이 떨어집니다</h2>
          <p>
            감가는 해마다 같은 <strong>금액</strong>이 아니라 같은 <strong>비율</strong>로 떨어집니다.
            남은 값에 비율이 걸리므로, 4,000만원짜리가 해마다 15%씩 떨어진다면 첫해에 600만원이
            빠지지만 다섯째 해에는 315만원만 빠집니다. &ldquo;새 차는 사자마자 값이 떨어진다&rdquo;는
            말이 이 모양입니다.
          </p>
          <h2>감가율은 차종마다 크게 다릅니다</h2>
          <p>
            인기 차종과 그렇지 않은 차종이 <strong>두 배 넘게 갈립니다</strong>. 주행거리와 사고 이력도
            크게 작용합니다. 그래서 이 계산기는 평균값을 넣어 두지 않았습니다 — 같은 연식의 실제
            중고차 시세를 두어 개 찾아 역산해 보면 그 차의 감가율이 나옵니다.
          </p>
          <h2>유지비까지 합쳐야 진짜 비용입니다</h2>
          <p>
            차를 굴리는 데 드는 돈은 값이 떨어지는 것과 매년 나가는 것의 합입니다.
            매년 나가는 쪽은 <Link href="/calculator/car-cost" className="underline">차량 유지비 계산기</Link>에서
            세어 보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>구매가 (원)</Label>
              <MoneyInput value={price} onChange={setPrice} placeholder="예: 40000000" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>연 감가율 (%)</Label>
                <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                  placeholder="예: 15" className={inputCls} min="0" max="99" step="0.1" />
              </div>
              <div>
                <Label>볼 기간 (년)</Label>
                <input type="number" value={years} onChange={e => setYears(e.target.value)}
                  placeholder="예: 10" className={inputCls} min="1" max="30" />
              </div>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">{years}년 뒤 남는 값</p>
              <p className="stat-value">
                {fmt(result.rows[result.rows.length - 1].value)}원
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                산 값의 {Math.round(result.rows[result.rows.length - 1].ratio * 100)}%
                {result.half !== null && ` · 절반이 되는 데 ${result.half.toFixed(1)}년`}
              </p>
            </div>
            <Card>
              <CardHeader title="해마다 남는 값" />
              <div className="divide-y divide-slate-100">
                {result.rows.map(r => (
                  <div key={r.year} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">
                      {r.year === 0 ? '산 날' : `${r.year}년째`}
                      {r.year > 0 && (
                        <span className="ml-2 text-xs text-slate-400 dark:text-slate-500">
                          −{fmt(r.lost)}원
                        </span>
                      )}
                    </span>
                    <span className="font-semibold">
                      {fmt(r.value)}원
                      <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">
                        {Math.round(r.ratio * 100)}%
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 정률법으로 셈한 값입니다 · 실제 시세는 차종·주행거리·사고 이력에 따라 크게 다릅니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
