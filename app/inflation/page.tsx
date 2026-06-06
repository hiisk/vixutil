'use client';
import { useState } from 'react';
import CalcShell, {
  Card, Label, inputCls, PrimaryBtn, TabBar,
  SummaryGrid, SummaryCard, TableWrap, ShowMoreBtn,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

type Tab = 'future' | 'present';

const w = (n: number) => Math.round(n).toLocaleString();

interface YearRow {
  year: number;
  value: number;
  cumInflation: number;
  purchasePower: number;
}

// 미래 가치 계산: PV * (1 + r)^n
function calcFuture(pv: number, rate: number, years: number): YearRow[] {
  return Array.from({ length: years }, (_, i) => {
    const y = i + 1;
    const value = pv * Math.pow(1 + rate / 100, y);
    const cumInflation = (value / pv - 1) * 100;
    const purchasePower = (pv / value) * 100;
    return { year: y, value, cumInflation, purchasePower };
  });
}

// 현재 가치 역산: FV / (1 + r)^n
function calcPresent(fv: number, rate: number, years: number): YearRow[] {
  return Array.from({ length: years }, (_, i) => {
    const y = i + 1;
    const value = fv / Math.pow(1 + rate / 100, y);
    const cumInflation = (1 - value / fv) * 100;
    const purchasePower = (value / fv) * 100;
    return { year: y, value, cumInflation, purchasePower };
  });
}

export default function InflationPage() {
  const [tab, setTab] = useState<Tab>('future');

  // 탭1: 미래 가치
  const [amount, setAmount] = useState(1_000_000);
  const [inflRate, setInflRate] = useState('3');
  const [years, setYears] = useState('10');
  const [futureRows, setFutureRows] = useState<YearRow[] | null>(null);
  const [showAllF, setShowAllF] = useState(false);

  // 탭2: 현재 가치 역산
  const [futureAmount, setFutureAmount] = useState(0);
  const [inflRate2, setInflRate2] = useState('3');
  const [years2, setYears2] = useState('10');
  const [presentRows, setPresentRows] = useState<YearRow[] | null>(null);
  const [showAllP, setShowAllP] = useState(false);

  function calcFutureRows() {
    const a = amount, r = Number(inflRate), y = Number(years);
    if (!a || !r || !y || y > 100) return;
    setShowAllF(false);
    setFutureRows(calcFuture(a, r, y));
  }

  function calcPresentRows() {
    const a = futureAmount, r = Number(inflRate2), y = Number(years2);
    if (!a || !r || !y || y > 100) return;
    setShowAllP(false);
    setPresentRows(calcPresent(a, r, y));
  }

  const fLast = futureRows?.[futureRows.length - 1];
  const pLast = presentRows?.[presentRows.length - 1];

  const QUICK_RATES = ['1', '2', '3', '4', '5'];
  const QUICK_YEARS = ['5', '10', '20', '30'];

  return (
    <CalcShell wide title="물가상승률 계산기" description="인플레이션에 따른 미래 필요 금액과 실질 구매력 변화를 계산합니다">
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'future', label: '미래 가치', sub: '현재 금액 → 미래 필요 금액' },
            { value: 'present', label: '현재 가치 역산', sub: '미래 금액 → 현재 가치' },
          ]}
          value={tab}
          onChange={v => { setTab(v); setFutureRows(null); setPresentRows(null); }}
        />

        {/* 탭1: 미래 가치 */}
        {tab === 'future' && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">조건 입력</p>
              <div className="flex flex-col gap-3">
                <div>
                  <Label>현재 금액 (원)</Label>
                  <CommaInput value={amount} onChange={setAmount} placeholder="예: 1,000,000" />
                </div>
                <div>
                  <Label>연 물가상승률 (%)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {QUICK_RATES.map(r => (
                      <button key={r} type="button" onClick={() => setInflRate(r)}
                        className={`px-3.5 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                          inflRate === r ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-500 hover:border-blue-300'
                        }`}>{r}%</button>
                    ))}
                  </div>
                  <input type="number" value={inflRate} onChange={e => setInflRate(e.target.value)}
                    placeholder="%" step="0.1" className={inputCls} />
                </div>
                <div>
                  <Label>기간 (년)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {QUICK_YEARS.map(y => (
                      <button key={y} type="button" onClick={() => setYears(y)}
                        className={`px-3.5 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                          years === y ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-500 hover:border-blue-300'
                        }`}>{y}년</button>
                    ))}
                  </div>
                  <input type="number" value={years} onChange={e => setYears(e.target.value)}
                    placeholder="년" min={1} max={100} className={inputCls} />
                </div>
              </div>
              <div className="mt-4"><PrimaryBtn onClick={calcFutureRows}>계산하기</PrimaryBtn></div>
            </Card>

            {fLast && (
              <>
                <SummaryGrid>
                  <SummaryCard label={`${years}년 후 필요 금액`} value={`${w(fLast.value)}원`} variant="primary" />
                  <SummaryCard label="가격 상승분" value={`+${w(fLast.value - amount)}원`} variant="red" />
                  <SummaryCard label="누적 물가상승" value={`${fLast.cumInflation.toFixed(1)}%`} />
                  <SummaryCard label="실질 구매력" value={`${fLast.purchasePower.toFixed(1)}%`}
                    sub="현재 대비" />
                </SummaryGrid>

                <Card>
                  <div className="px-5 py-4 border-b border-slate-100">
                    <p className="font-bold text-slate-800 text-sm">연도별 물가 변화</p>
                    <p className="text-xs text-slate-400 mt-0.5">연 {inflRate}% 물가상승률 적용</p>
                  </div>
                  <TableWrap>
                    <table className="calc-table">
                      <thead>
                        <tr>
                          <th>연차</th>
                          <th>필요 금액</th>
                          <th>가격 상승분</th>
                          <th>누적 상승률</th>
                          <th>구매력</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(showAllF ? futureRows! : futureRows!.slice(0, 20)).map(r => (
                          <tr key={r.year}>
                            <td>{r.year}년 후</td>
                            <td className="font-black text-slate-900">{w(r.value)}원</td>
                            <td className="text-red-500 font-semibold">+{w(r.value - amount)}원</td>
                            <td className="text-red-500 font-semibold">+{r.cumInflation.toFixed(1)}%</td>
                            <td className="text-blue-700 font-semibold">{r.purchasePower.toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </TableWrap>
                  <div className="p-4">
                    <ShowMoreBtn total={futureRows!.length} showing={20} onClick={() => setShowAllF(true)} />
                  </div>
                </Card>
              </>
            )}
          </>
        )}

        {/* 탭2: 현재 가치 역산 */}
        {tab === 'present' && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">조건 입력</p>
              <div className="flex flex-col gap-3">
                <div>
                  <Label>미래 목표 금액 (원)</Label>
                  <CommaInput value={futureAmount} onChange={setFutureAmount} placeholder="예: 1,000,000" />
                </div>
                <div>
                  <Label>연 물가상승률 (%)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {QUICK_RATES.map(r => (
                      <button key={r} type="button" onClick={() => setInflRate2(r)}
                        className={`px-3.5 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                          inflRate2 === r ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-500 hover:border-blue-300'
                        }`}>{r}%</button>
                    ))}
                  </div>
                  <input type="number" value={inflRate2} onChange={e => setInflRate2(e.target.value)}
                    placeholder="%" step="0.1" className={inputCls} />
                </div>
                <div>
                  <Label>기간 (년)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {QUICK_YEARS.map(y => (
                      <button key={y} type="button" onClick={() => setYears2(y)}
                        className={`px-3.5 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                          years2 === y ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-500 hover:border-blue-300'
                        }`}>{y}년</button>
                    ))}
                  </div>
                  <input type="number" value={years2} onChange={e => setYears2(e.target.value)}
                    placeholder="년" min={1} max={100} className={inputCls} />
                </div>
              </div>
              <div className="mt-4"><PrimaryBtn onClick={calcPresentRows}>계산하기</PrimaryBtn></div>
            </Card>

            {pLast && (
              <>
                <SummaryGrid>
                  <SummaryCard label={`${years2}년 전 현재 가치`} value={`${w(pLast.value)}원`} variant="primary" />
                  <SummaryCard label="가치 하락분" value={`-${w(futureAmount - pLast.value)}원`} variant="red" />
                  <SummaryCard label="실질 가치 비율" value={`${pLast.purchasePower.toFixed(1)}%`}
                    sub="미래 대비" />
                  <SummaryCard label="미래 목표 금액" value={`${w(futureAmount)}원`} />
                </SummaryGrid>

                <Card>
                  <div className="px-5 py-4 border-b border-slate-100">
                    <p className="font-bold text-slate-800 text-sm">연도별 현재 가치</p>
                    <p className="text-xs text-slate-400 mt-0.5">연 {inflRate2}% 물가상승률 기준</p>
                  </div>
                  <TableWrap>
                    <table className="calc-table">
                      <thead>
                        <tr>
                          <th>기준</th>
                          <th>현재 가치</th>
                          <th>가치 하락분</th>
                          <th>구매력 비율</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(showAllP ? presentRows! : presentRows!.slice(0, 20)).map(r => (
                          <tr key={r.year}>
                            <td>{r.year}년 전</td>
                            <td className="font-black text-slate-900">{w(r.value)}원</td>
                            <td className="text-red-500 font-semibold">-{w(futureAmount - r.value)}원</td>
                            <td className="text-blue-700 font-semibold">{r.purchasePower.toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </TableWrap>
                  <div className="p-4">
                    <ShowMoreBtn total={presentRows!.length} showing={20} onClick={() => setShowAllP(true)} />
                  </div>
                </Card>
              </>
            )}
          </>
        )}
      </div>
    </CalcShell>
  );
}
