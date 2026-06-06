'use client';
import { useState } from 'react';
import CalcShell, {
  Card, Label, inputCls, selectCls, PrimaryBtn,
  SummaryGrid, SummaryCard, RatioBar, TableWrap, ShowMoreBtn,
} from '@/components/CalcShell';

const TAX_RATE = 0.154; // 이자소득세 15.4% (이자세 14% + 지방소득세 1.4%)
const w = (n: number) => Math.round(n).toLocaleString();

interface YearRow {
  period: number;
  label: string;
  interest: number;
  afterTaxInterest: number;
  cumInterest: number;
  balance: number;
}

function simulate(principal: number, annualRate: number, months: number): YearRow[] {
  const monthlyRate = annualRate / 100 / 12;
  const rows: YearRow[] = [];

  // 연도별 (12개월 단위)로 행 생성, 마지막 행은 남은 월
  let cumInterest = 0;
  let fullYears = Math.floor(months / 12);
  let remainMonths = months % 12;

  for (let y = 1; y <= fullYears; y++) {
    const interest = principal * monthlyRate * 12;
    const afterTax = interest * (1 - TAX_RATE);
    cumInterest += interest;
    rows.push({
      period: y,
      label: `${y}년`,
      interest,
      afterTaxInterest: afterTax,
      cumInterest,
      balance: principal + cumInterest,
    });
  }

  if (remainMonths > 0) {
    const interest = principal * monthlyRate * remainMonths;
    const afterTax = interest * (1 - TAX_RATE);
    cumInterest += interest;
    rows.push({
      period: fullYears + 1,
      label: `${fullYears > 0 ? fullYears + '년 ' : ''}${remainMonths}개월`,
      interest,
      afterTaxInterest: afterTax,
      cumInterest,
      balance: principal + cumInterest,
    });
  }

  return rows;
}

export default function SimpleInterestPage() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [period, setPeriod] = useState('12');
  const [unit, setUnit] = useState<'month' | 'year'>('month');
  const [rows, setRows] = useState<YearRow[] | null>(null);
  const [showAll, setShowAll] = useState(false);

  function calculate() {
    const p = Number(principal);
    const r = Number(rate);
    let months = Number(period);
    if (unit === 'year') months *= 12;
    if (!p || !r || !months || months < 1 || months > 1200) return;
    setShowAll(false);
    setRows(simulate(p, r, months));
  }

  const last = rows?.[rows.length - 1];
  const totalInterest = last?.cumInterest ?? 0;
  const afterTaxInterest = totalInterest * (1 - TAX_RATE);
  const taxAmount = totalInterest * TAX_RATE;
  const display = rows ? (showAll ? rows : rows.slice(0, 20)) : [];

  return (
    <CalcShell wide title="단리 계산기" description="원금, 연이율, 기간으로 단리 이자·세후이자·만기금액을 계산합니다">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">예금 조건</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label>원금 (원)</Label>
              <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)}
                placeholder="예: 10,000,000" className={inputCls} />
            </div>
            <div>
              <Label>연이율 (%)</Label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                placeholder="예: 3.5" step="0.01" className={inputCls} />
            </div>
            <div>
              <Label>단위</Label>
              <select value={unit} onChange={e => setUnit(e.target.value as 'month' | 'year')}
                className={selectCls}>
                <option value="month">개월</option>
                <option value="year">년</option>
              </select>
            </div>
            <div className="col-span-2">
              <Label>기간</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(unit === 'month' ? [3, 6, 12, 24, 36, 60] : [1, 2, 3, 5, 10]).map(n => (
                  <button key={n} type="button" onClick={() => setPeriod(String(n))}
                    className={`px-3.5 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                      period === String(n) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-500 hover:border-blue-300'
                    }`}>
                    {n}{unit === 'month' ? '개월' : '년'}
                  </button>
                ))}
              </div>
              <input type="number" value={period} onChange={e => setPeriod(e.target.value)}
                placeholder={unit === 'month' ? '개월 수 입력' : '년 수 입력'} min={1} className={inputCls} />
            </div>
          </div>
          <div className="mt-4"><PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn></div>
        </Card>

        {last && (
          <>
            <SummaryGrid>
              <SummaryCard label="만기 금액" value={`${w(last.balance)}원`} variant="primary" />
              <SummaryCard label="총 이자" value={`+${w(totalInterest)}원`} variant="green" />
              <SummaryCard label="세후 이자" value={`+${w(afterTaxInterest)}원`} sub={`세금 -${w(taxAmount)}원`} variant="green" />
              <SummaryCard label="세후 만기 금액" value={`${w(Number(principal) + afterTaxInterest)}원`} />
            </SummaryGrid>

            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">원금 vs 이자 비율</p>
              <RatioBar
                a={Number(principal)} b={totalInterest}
                labelA={`원금 ${w(Number(principal))}원`}
                labelB={`이자 ${w(totalInterest)}원`}
              />
            </Card>

            <Card>
              <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                <p className="font-bold text-slate-800 text-sm">기간별 이자 현황</p>
                <span className="text-xs text-slate-400">세율 {(TAX_RATE * 100).toFixed(1)}% 적용</span>
              </div>
              <TableWrap>
                <table className="calc-table">
                  <thead>
                    <tr>
                      <th>기간</th>
                      <th>해당 기간 이자</th>
                      <th>세후 이자</th>
                      <th>누적 이자</th>
                      <th>잔액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {display.map((r, i) => (
                      <tr key={i}>
                        <td>{r.label}</td>
                        <td className="text-emerald-700 font-semibold">+{w(r.interest)}원</td>
                        <td className="text-emerald-600">+{w(r.afterTaxInterest)}원</td>
                        <td className="text-emerald-700 font-semibold">+{w(r.cumInterest)}원</td>
                        <td className="font-black text-slate-900">{w(r.balance)}원</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrap>
              <div className="p-4">
                <ShowMoreBtn total={rows?.length ?? 0} showing={20} onClick={() => setShowAll(true)} />
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
