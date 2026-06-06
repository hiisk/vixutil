'use client';
import { useMemo, useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, inputCls, TabBar,
  SummaryCard, SummaryGrid, RatioBar, TableWrap, ShowMoreBtn,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

type Freq = 12 | 4 | 1;

interface YearRow {
  year: number; cumulativePrincipal: number;
  annualInterest: number; cumulativeInterest: number;
  balance: number; yieldPct: number;
}

function simulate(principal: number, monthly: number, rate: number, years: number, freq: Freq): YearRow[] {
  const r = rate / 100;
  let balance = principal;
  const rows: YearRow[] = [];
  for (let y = 1; y <= years; y++) {
    const start = balance;
    for (let m = 1; m <= 12; m++) {
      balance += monthly;
      if (freq === 12) balance *= 1 + r / 12;
      else if (freq === 4 && m % 3 === 0) balance *= 1 + r / 4;
      else if (freq === 1 && m === 12) balance *= 1 + r;
    }
    const cp = principal + monthly * 12 * y;
    rows.push({
      year: y, cumulativePrincipal: cp,
      annualInterest: balance - start - monthly * 12,
      cumulativeInterest: balance - cp,
      balance, yieldPct: cp > 0 ? ((balance - cp) / cp) * 100 : 0,
    });
  }
  return rows;
}

const w = (n: number) => Math.round(n).toLocaleString('ko-KR');

export default function CompoundPage() {
  const [freq, setFreq] = useState<Freq>(12);
  const [principal, setPrincipal] = useState(10_000_000);
  const [monthly, setMonthly] = useState(300_000);
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('20');
  const [applyTax, setApplyTax] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const rows = useMemo(() => {
    const r = Number(rate);
    const y = Number(years);
    if (!principal || !r || !y || y > 100 || y < 1) return null;
    setShowAll(false);
    return simulate(principal, monthly, r, y, freq);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [principal, monthly, rate, years, freq]);

  const last = rows?.[rows.length - 1];
  const taxCut = last ? Math.round(last.cumulativeInterest * 0.154) : 0;
  const afterTax = last ? last.balance - taxCut : 0;
  const display = rows ? (showAll ? rows : rows.slice(0, 20)) : [];

  return (
    <CalcShell wide title="복리 계산기" description="복리 주기 · 적립식 · 연도별 자산 성장 테이블">
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 12, label: '월복리', sub: '매월 이자' },
            { value: 4, label: '분기복리', sub: '3개월마다' },
            { value: 1, label: '연복리', sub: '매년 이자' },
          ]}
          value={freq}
          onChange={(v) => setFreq(Number(v) as Freq)}
        />

        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">투자 조건</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <Label>초기 원금 (원)</Label>
              <CommaInput value={principal} onChange={setPrincipal} placeholder="예: 10,000,000" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label>월 추가납입 (원, 선택)</Label>
              <CommaInput value={monthly} onChange={setMonthly} placeholder="예: 300,000" />
            </div>
            <div>
              <Label>연이율 (%)</Label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                placeholder="예: 5" min="0" max="100" step="0.1" className={inputCls} />
            </div>
            <div>
              <Label>기간 (년)</Label>
              <input type="number" value={years} onChange={e => setYears(e.target.value)}
                placeholder="예: 20" min="1" max="100" className={inputCls} />
            </div>
          </div>
          <label className="flex items-center gap-2 mt-4 text-sm text-slate-600 cursor-pointer select-none">
            <input type="checkbox" checked={applyTax} onChange={e => setApplyTax(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded" />
            이자소득세 15.4% 적용 (이자 14% + 지방소득세 1.4%)
          </label>
        </Card>

        {last && (
          <>
            <SummaryGrid>
              <SummaryCard label="최종 자산" value={`${w(last.balance)}원`} variant="primary" />
              {applyTax
                ? <SummaryCard label="세후 자산" value={`${w(afterTax)}원`} sub={`-${w(taxCut)}원 세금`} />
                : <SummaryCard label="총 납입 원금" value={`${w(last.cumulativePrincipal)}원`} />}
              <SummaryCard label="총 수익" value={`+${w(last.cumulativeInterest)}원`} variant="green" />
              <SummaryCard label="수익률" value={`${last.yieldPct.toFixed(1)}%`} variant="green" />
            </SummaryGrid>

            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">원금 vs 수익 비율</p>
              <RatioBar
                a={last.cumulativePrincipal} b={last.cumulativeInterest}
                labelA={`납입 원금 ${w(last.cumulativePrincipal)}원`}
                labelB={`수익 ${w(last.cumulativeInterest)}원`}
              />
            </Card>

            <Card>
              <CardHeader
                title="연도별 수익 현황"
                sub={`${freq === 12 ? '월복리' : freq === 4 ? '분기복리' : '연복리'} 기준`}
              />
              <TableWrap>
                <table className="calc-table">
                  <thead>
                    <tr>
                      <th>연차</th>
                      <th>누적 원금</th>
                      <th>연간 이자</th>
                      <th>누적 이자</th>
                      <th>총 자산</th>
                      <th>수익률</th>
                    </tr>
                  </thead>
                  <tbody>
                    {display.map(r => (
                      <tr key={r.year}>
                        <td>{r.year}년</td>
                        <td>{w(r.cumulativePrincipal)}원</td>
                        <td className="text-emerald-700 font-semibold">+{w(r.annualInterest)}원</td>
                        <td className="text-emerald-700 font-semibold">+{w(r.cumulativeInterest)}원</td>
                        <td className="font-bold text-slate-900">{w(r.balance)}원</td>
                        <td className="text-blue-700 font-semibold">{r.yieldPct.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrap>
              <ShowMoreBtn total={rows?.length ?? 0} showing={20} onClick={() => setShowAll(true)} />
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
