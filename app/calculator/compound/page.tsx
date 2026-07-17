'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, inputCls, PrimaryBtn, TabBar,
  SummaryCard, SummaryGrid, RatioBar, TableWrap, ShowMoreBtn,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { CALC_FAQ } from '@/lib/calc-faq';

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
  const [rows, setRows] = useState<YearRow[] | null>(null);
  const [showAll, setShowAll] = useState(false);

  function calculate() {
    const r = Number(rate);
    const y = Number(years);
    if (!principal || !r || !y || y > 100 || y < 1) return;
    setShowAll(false);
    setRows(simulate(principal, monthly, r, y, freq));
  }

  const last = rows?.[rows.length - 1];
  const taxCut = last ? Math.round(last.cumulativeInterest * 0.154) : 0;
  const afterTax = last ? last.balance - taxCut : 0;
  const display = rows ? (showAll ? rows : rows.slice(0, 20)) : [];

  return (
    <CalcShell
      path="/calculator/compound"
      wide
      title="복리 계산기"
      description="복리 주기 · 적립식 · 연도별 자산 성장 테이블"
      faq={CALC_FAQ.compound}
      intro={
        <>
          <h2>복리 주기가 왜 중요한가</h2>
          <p>
            같은 연이율이라도 이자를 <strong>얼마나 자주 원금에 얹느냐</strong>에 따라 결과가 달라집니다.
            월복리는 매달, 분기복리는 3개월마다, 연복리는 1년에 한 번 이자가 원금이 됩니다. 주기가 짧을수록
            유리하지만 차이는 생각보다 크지 않고, <strong>기간과 수익률이 훨씬 큰 변수</strong>입니다.
          </p>
          <h2>시간이 원금보다 강합니다</h2>
          <p>
            복리는 뒤로 갈수록 가팔라집니다. 초반 몇 년은 단리와 별 차이가 없어 보이지만, 후반에는 이자가
            이자를 낳으면서 격차가 벌어집니다. 연도별 테이블에서 <strong>원금과 이자가 역전되는 지점</strong>을
            보면 이게 눈에 보입니다. 일찍 시작하는 것이 많이 넣는 것보다 유리한 이유입니다.
          </p>
          <h2>세금과 물가는 빠져 있습니다</h2>
          <p>
            이 계산기는 세전·명목 기준입니다. 예금 이자에는 <strong>이자소득세 15.4%</strong>가 붙고,
            물가가 오르면 같은 금액의 실질 가치는 떨어집니다. 30년 뒤 금액이 지금 돈으로 얼마인지 알고
            싶다면 물가상승률 계산기를 함께 쓰세요. 투자 수익률은 매년 일정하지 않다는 점도 감안해야 합니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 12, label: '월복리', sub: '매월 이자' },
            { value: 4, label: '분기복리', sub: '3개월마다' },
            { value: 1, label: '연복리', sub: '매년 이자' },
          ]}
          value={freq}
          onChange={(v) => { setFreq(Number(v) as Freq); setRows(null); }}
        />

        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">투자 조건</p>
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
          <label className="flex items-center gap-2 mt-4 text-sm text-slate-600 dark:text-slate-300 cursor-pointer select-none">
            <input type="checkbox" checked={applyTax} onChange={e => setApplyTax(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded" />
            이자소득세 15.4% 적용 (이자 14% + 지방소득세 1.4%)
          </label>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
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
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">원금 vs 수익 비율</p>
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
                      <th>연차</th><th>누적 원금</th><th>연간 이자</th>
                      <th>누적 이자</th><th>총 자산</th><th>수익률</th>
                    </tr>
                  </thead>
                  <tbody>
                    {display.map(r => (
                      <tr key={r.year}>
                        <td>{r.year}년</td>
                        <td>{w(r.cumulativePrincipal)}원</td>
                        <td className="text-emerald-700 dark:text-emerald-300 font-semibold">+{w(r.annualInterest)}원</td>
                        <td className="text-emerald-700 dark:text-emerald-300 font-semibold">+{w(r.cumulativeInterest)}원</td>
                        <td className="font-bold text-slate-900 dark:text-slate-100">{w(r.balance)}원</td>
                        <td className="text-blue-700 dark:text-blue-300 font-semibold">{r.yieldPct.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrap>
              {!showAll && <ShowMoreBtn total={rows?.length ?? 0} showing={20} onClick={() => setShowAll(true)} />}
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
