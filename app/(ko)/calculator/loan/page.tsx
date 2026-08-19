'use client';
import { useState } from 'react';
import AreaChart from '@/components/AreaChart';
import CalcShell, {
  Card, CardHeader, Insight, Label, inputCls, TabBar,
  SummaryCard, RatioBar, TableWrap, ShowMoreBtn,
} from '@/components/CalcShell';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import CommaInput from '@/components/CommaInput';
import { CALC_FAQ } from '@/lib/calc-faq';
import { equalPayment, monthlyRate } from '@/lib/loan-schedule';

interface MonthRow {
  month: number; payment: number; principal: number; interest: number; balance: number;
}

// 월 상환액은 lib/loan-schedule.ts에서 온다 — 같은 식이 네 페이지에 흩어져 있었다
function calcEP(p: number, annualRate: number, n: number): MonthRow[] {
  const r = monthlyRate(annualRate);
  const pmt = equalPayment(p, annualRate, n);
  let bal = p;
  return Array.from({length:n},(_,i)=>{
    const int = bal * r; const pri = pmt - int; bal = Math.max(0,bal-pri);
    return {month:i+1,payment:Math.round(pmt),principal:Math.round(pri),interest:Math.round(int),balance:Math.round(bal)};
  });
}

function calcEPrin(p: number, annualRate: number, n: number): MonthRow[] {
  const r = monthlyRate(annualRate);
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
  const [showAll, setShowAll] = useState(false);

  /*
    ── 버튼을 없앴다 (2026-08-19) ──────────────────────────────────
    값을 넣고 「계산하기」를 눌러야 답이 나왔다. 그런데 이 계산은 세 숫자를
    읽어 곱하고 더하는 것이 전부다 — 기다릴 것도, 확인받을 것도 없다. 버튼은
    사람에게 «한 번 더 하세요»를 시키고 있었을 뿐이다.

    금리를 3.5에서 4.0으로 바꿔 보는 것이 이 계산기를 쓰는 진짜 방식인데,
    그때마다 버튼을 다시 눌러야 하면 그 비교를 안 하게 된다. 이제 숫자를 고치면
    답과 그래프가 바로 따라 움직인다.

    입력이 아직 성립하지 않으면(빈 칸·기간 초과) null이고, 그 동안은 결과가
    통째로 안 그려진다 — 예전에 버튼을 안 누른 상태와 같다.
  */
  const rows = ((): MonthRow[] | null => {
    const p = amount, annualRate = Number(rate), m = Number(months);
    if (!p || !Number.isFinite(annualRate) || annualRate < 0 || !m || m > 600) return null;
    return mode === 'ep' ? calcEP(p, annualRate, m) : calcEPrin(p, annualRate, m);
  })();

  const totalRepay = rows ? rows.reduce((s,r)=>s+r.payment,0) : 0;
  const totalInterest = totalRepay - amount;
  const display = rows ? (showAll ? rows : rows.slice(0,24)) : [];

  return (
    <CalcShell
      path="/calculator/loan"
      wide
      title="대출 이자 계산기"
      description="원리금균등·원금균등 비교 + 월별 상환 스케줄"
      faq={CALC_FAQ.loan}
      intro={
        <>
          <h2>원리금균등 vs 원금균등</h2>
          <p>
            <strong>원리금균등</strong>은 매달 내는 돈이 끝까지 똑같습니다. 관리하기 편하고 초반 부담이
            작아서 가장 많이 쓰입니다. <strong>원금균등</strong>은 원금을 기간으로 똑같이 나눠 갚고 남은
            원금에 이자를 붙이므로, <strong>처음에 많이 내고 갈수록 줄어듭니다</strong>.
          </p>
          <h2>총 이자는 원금균등이 적습니다</h2>
          <p>
            원금을 빨리 줄일수록 이자가 붙을 원금이 작아지기 때문입니다. 대신 초기 상환액이 커서 그 부담을
            감당할 수 있어야 합니다. 결국 <strong>총 이자를 아낄 것이냐, 초기 부담을 낮출 것이냐</strong>의
            선택입니다. 월별 상환 스케줄에서 두 방식의 차이가 언제 어떻게 뒤집히는지 볼 수 있습니다.
          </p>
          <h2>이자는 기간에 가장 민감합니다</h2>
          <p>
            같은 금액이라도 <strong>기간이 길어지면 총 이자가 눈에 띄게 불어납니다</strong>. 월 상환액을
            낮추려고 기간을 늘리는 건 편해지는 값을 이자로 치르는 셈입니다. 여유가 생겼을 때 원금을 미리
            갚으면 남은 이자가 줄어드는데, 대출 초기 몇 년은 <strong>중도상환수수료</strong>가 붙을 수
            있으니 확인이 필요합니다.
          </p>
          <h2>변동금리라면</h2>
          <p>
            이 계산기는 입력한 금리가 <strong>끝까지 유지된다고 가정</strong>합니다. 변동금리 대출은
            금리가 오르면 월 상환액도 함께 오르므로, 지금 금리로 나온 결과는 현재 조건의 스냅숏입니다.
            금리를 몇 %p 올려서도 한번 계산해 보면 감당 가능한 범위인지 가늠할 수 있습니다.
          </p>
        </>
      }
    >
      {/*
        ── 계기로 다시 짰다 (2026-08-19) ──────────────────────────────
        예전 순서는 «폼 카드 → 결과 카드 → 표 카드»였다. 서류를 채워 제출하는
        모양인데, 계산기는 서류가 아니라 다이얼을 돌리면 숫자가 반응하는 물건이다.

        그래서 답을 맨 위에 두고 조작부를 그 아래 붙였다. 금리를 3.5에서 4.0으로
        바꾸는 내내 답이 시야에서 안 사라진다 — 이 계산기를 쓰는 진짜 방식이
        그 «바꿔 보기»이기 때문이다.

        판도 겹치지 않는다. 값·조작·해설이 각각 카드에 담기면 층이 셋이 되는데
        실제로는 한 물건의 세 부분이다. 생김새는 globals.css의 .readout·.dial에.
      */}
      <div className="flex flex-col gap-7">
        <div className="flex items-center justify-between gap-3">
          {/* 두 방식은 결과를 통째로 바꾸므로 조작부보다 먼저 온다 */}
          <div className="seg" role="group" aria-label="상환 방식">
            {([['ep','원리금균등'],['eprin','원금균등']] as const).map(([v,label])=>(
              <button key={v} type="button" className="seg-btn" aria-pressed={mode===v}
                onClick={()=>{setMode(v);setShowAll(false);}}>{label}</button>
            ))}
          </div>
          <LangPicker current="ko" route="/calculator/loan" available={ALL_LOCALES10} />
        </div>

        {rows && (
          <div className="readout">
            <p className="readout-label">{mode==='ep'?'월 납입액':'첫 달 납입액'}</p>
            <p className="readout-value">{fmt(rows[0].payment)}원</p>
            <div className="readout-specs">
              <p className="spec"><span className="spec-k">총 상환액</span><span className="spec-v">{fmt(totalRepay)}원</span></p>
              <p className="spec"><span className="spec-k">총 이자</span><span className="spec-v">{fmt(totalInterest)}원</span></p>
              <p className="spec"><span className="spec-k">이자 비중</span><span className="spec-v">{Math.round((totalInterest/(amount||1))*100)}%</span></p>
              <p className="spec">
                <span className="spec-k">{mode==='ep'?'기간':'마지막 달'}</span>
                <span className="spec-v">{mode==='ep'?`${Math.round(rows.length/12)}년`:`${fmt(rows[rows.length-1].payment)}원`}</span>
              </p>
            </div>
          </div>
        )}

        {/* 조작부 — 상자가 아니라 «고칠 수 있는 값»으로 둔다 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <label className="dial">
            <span className="dial-k">대출금액 (원)</span>
            {/* className=""라서 .dial이 생김새를 정한다 — 상자 없이 값만 */}
            <CommaInput value={amount} onChange={setAmount} placeholder="300,000,000" className="" />
          </label>
          <label className="dial">
            <span className="dial-k">연이율 (%)</span>
            <input type="number" inputMode="decimal" value={rate} onChange={e=>setRate(e.target.value)} placeholder="3.5" />
          </label>
          <label className="dial">
            <span className="dial-k">기간 (개월)</span>
            <input type="number" inputMode="numeric" value={months} onChange={e=>setMonths(e.target.value)} placeholder="360" />
          </label>
        </div>

        {rows && (
          <>
            <RatioBar
              a={amount} b={totalInterest}
              labelA={`원금 ${fmt(amount)}원`}
              labelB={`이자 ${fmt(totalInterest)}원`}
            />

            {/* 숫자를 말로 — 「184,968,240원」과 「원금의 62%」는 다른 정보다 */}
            <Insight>
              {Math.round(rows.length/12)}년 동안 이자로만 <strong>{fmt(totalInterest)}원</strong>을 낸다 — 빌린 돈의{' '}
              <strong>{Math.round((totalInterest / (amount || 1)) * 100)}%</strong>다.
              기간을 줄이면 월 부담은 늘지만 이 몫이 빠르게 줄어든다.
            </Insight>

            {/* 「이 빚이 어떻게 줄어드는가」는 표 360줄이 아니라 선 하나로 읽힌다 */}
            <AreaChart
              values={rows.map(r => r.balance)}
              label="남은 잔금"
              from="1회"
              to={`${rows.length}회`}
              peak={`시작 ${fmt(rows[0].balance)}원`}
            />

            {/* 360줄은 «필요하면 펴는 것»이지 기본으로 펼 것이 아니다 */}
            <details className="fold border-t border-slate-200 dark:border-slate-800">
              <summary>월별 상환 스케줄 <span className="font-normal text-slate-400">{rows.length}개월</span></summary>
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
                        <td>{fmt(r.principal)}원</td>
                        <td>{fmt(r.interest)}원</td>
                        <td>{fmt(r.balance)}원</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrap>
              {!showAll && (
                <div className="pb-2">
                  <ShowMoreBtn total={rows.length} showing={24} onClick={()=>setShowAll(true)}/>
                </div>
              )}
            </details>
          </>
        )}
      </div>
    </CalcShell>
  );
}
