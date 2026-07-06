'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, inputCls, PrimaryBtn, TabBar,
  SummaryCard, RatioBar, TableWrap, ShowMoreBtn,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { CALC_FAQ } from '@/lib/calc-faq';

interface MonthRow {
  month: number; payment: number; principal: number; interest: number; balance: number;
}

function calcEP(p: number, r: number, n: number): MonthRow[] {
  const pmt = r === 0 ? p / n : p * r * Math.pow(1+r,n) / (Math.pow(1+r,n)-1);
  let bal = p;
  return Array.from({length:n},(_,i)=>{
    const int = bal * r; const pri = pmt - int; bal = Math.max(0,bal-pri);
    return {month:i+1,payment:Math.round(pmt),principal:Math.round(pri),interest:Math.round(int),balance:Math.round(bal)};
  });
}

function calcEPrin(p: number, r: number, n: number): MonthRow[] {
  const perMon = p / n; let bal = p;
  return Array.from({length:n},(_,i)=>{
    const int = bal * r; bal = Math.max(0,bal-perMon);
    return {month:i+1,payment:Math.round(perMon+int),principal:Math.round(perMon),interest:Math.round(int),balance:Math.round(bal)};
  });
}

const fmt = (n: number) => n.toLocaleString();

export default function LoanPage() {
  const [mode, setMode] = useState<'ep'|'eprin'>('ep');
  const [amount, setAmount] = useState(300_000_000);
  const [rate, setRate] = useState('3.5');
  const [months, setMonths] = useState('360');
  const [rows, setRows] = useState<MonthRow[]|null>(null);
  const [showAll, setShowAll] = useState(false);

  function calculate() {
    const p = amount, r = Number(rate)/100/12, m = Number(months);
    if(!p||!r||!m||m>600) return;
    setShowAll(false);
    setRows(mode==='ep' ? calcEP(p,r,m) : calcEPrin(p,r,m));
  }

  const totalRepay = rows ? rows.reduce((s,r)=>s+r.payment,0) : 0;
  const totalInterest = totalRepay - amount;
  const display = rows ? (showAll ? rows : rows.slice(0,24)) : [];

  return (
    <CalcShell wide title="대출 이자 계산기" description="원리금균등·원금균등 비교 + 월별 상환 스케줄" faq={CALC_FAQ.loan}>
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            {value:'ep', label:'원리금균등', sub:'매월 동일 금액'},
            {value:'eprin', label:'원금균등', sub:'원금 고정, 이자 감소'},
          ]}
          value={mode}
          onChange={(v)=>{setMode(v as 'ep'|'eprin');setRows(null);}}
        />

        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">대출 조건</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label>대출금액 (원)</Label>
              <CommaInput value={amount} onChange={setAmount} placeholder="예: 300,000,000" />
            </div>
            <div>
              <Label>연이율 (%)</Label>
              <input type="number" value={rate} onChange={e=>setRate(e.target.value)}
                placeholder="예: 4.5" className={inputCls}/>
            </div>
            <div>
              <Label>대출기간 (개월)</Label>
              <input type="number" value={months} onChange={e=>setMonths(e.target.value)}
                placeholder="예: 360 (30년)" className={inputCls}/>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {rows && (
          <>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-600 rounded-2xl p-4">
                <p className="text-blue-200 text-xs mb-1">{mode==='ep'?'월 납입액':'첫 달 납입액'}</p>
                <p className="text-white font-black text-lg leading-tight">{fmt(rows[0].payment)}원</p>
                {mode==='eprin' && (
                  <p className="text-blue-200 text-xs mt-1">마지막 달 {fmt(rows[rows.length-1].payment)}원</p>
                )}
              </div>
              <SummaryCard label="총 상환액" value={`${fmt(totalRepay)}원`}/>
              <SummaryCard label="총 이자" value={`${fmt(totalInterest)}원`} variant="red"/>
            </div>

            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">원금 vs 이자 비율</p>
              <RatioBar
                a={amount} b={totalInterest}
                labelA={`원금 ${fmt(amount)}원`}
                labelB={`이자 ${fmt(totalInterest)}원`}
              />
            </Card>

            <Card>
              <CardHeader title="월별 상환 스케줄" sub={`전체 ${rows.length}개월`}/>
              <TableWrap>
                <table className="calc-table">
                  <thead>
                    <tr>
                      <th>회차</th><th>납입액</th><th>원금</th><th>이자</th><th>잔금</th>
                    </tr>
                  </thead>
                  <tbody>
                    {display.map(r=>(
                      <tr key={r.month}>
                        <td>{r.month}회</td>
                        <td>{fmt(r.payment)}원</td>
                        <td className="text-blue-700 font-semibold">{fmt(r.principal)}원</td>
                        <td className="text-red-500">{fmt(r.interest)}원</td>
                        <td>{fmt(r.balance)}원</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrap>
              <div className="px-5 pb-4">
                {!showAll && <ShowMoreBtn total={rows.length} showing={24} onClick={()=>setShowAll(true)}/>}
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
