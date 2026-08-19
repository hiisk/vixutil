'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls } from '@/components/CalcShell';
import { BRANCHES, PAY, SAVINGS_MAX, rankMonths, savings, totalPay } from '@/lib/military-pay';

const fmt = (n: number) => Math.round(n).toLocaleString();
/** 만 원 단위로 읽기 좋게 — 2,010만 원처럼 */
const man = (n: number) => `${Math.round(n / 10_000).toLocaleString()}만 원`;

export default function MilitaryPayPage() {
  const [branch, setBranch] = useState('army');
  const [monthly, setMonthly] = useState('550000');
  const [rate, setRate] = useState('5');

  /*
   * 버튼을 없앴다 (2026-08-19). 값에서 바로 나오므로 저장할 상태가 없다.
   * 입력이 아직 성립하지 않으면 null이고, 그동안 결과가 안 그려진다 —
   * 예전에 버튼을 안 누른 상태와 같다.
   */
  const result: null | {
    months: number;
    ranks: ReturnType<typeof rankMonths>;
    pay: number;
    plan: ReturnType<typeof savings>;
  } = ((): null | {
    months: number;
    ranks: ReturnType<typeof rankMonths>;
    pay: number;
    plan: ReturnType<typeof savings>;
  } => {
    const b = BRANCHES.find(x => x.key === branch);
    if (!b) return null;
    const m = Math.min(Math.max(Number(monthly) || 0, 0), SAVINGS_MAX);
    return ({
      months: b.months,
      ranks: rankMonths(b.months),
      pay: totalPay(b.months),
      plan: savings(b.months, m, Number(rate) || 0),
    });
  
    return null;
  })();


  return (
    <CalcShell
      path="/calculator/military-pay"
      title="군인 월급 계산기"
      description="복무기간 동안 받는 봉급 총액과 장병내일준비적금 목돈"
      intro={
        <>
          <h2>월급은 계급이 오를 때마다 바뀝니다</h2>
          <p>
            병 봉급은 계급별로 정해져 있어서, 복무 기간에 받는 총액은 <strong>계급마다 몇 달을 지내는지</strong>로
            갈립니다. 2026년 기준으로 이등병 75만 원, 일병 90만 원, 상병 120만 원, 병장 150만 원입니다.
            2026년은 2025년과 같은 금액이 유지됐습니다.
          </p>
          <h2>정기진급 기간은 군별로 같습니다</h2>
          <p>
            이등병 2개월, 일병 6개월, 상병 6개월을 지내고 병장이 됩니다. 이 기간이 군별로 같기 때문에
            <strong> 복무가 긴 군일수록 병장으로 지내는 기간이 깁니다</strong> — 육군 18개월이면 병장 4개월,
            공군 21개월이면 7개월입니다. 그만큼 총액도 커집니다. 실제 진급일은 부대 사정으로 며칠 달라질 수 있습니다.
          </p>
          <h2>적금은 정부가 넣은 만큼 얹어 줍니다</h2>
          <p>
            장병내일준비적금은 월 <strong>55만 원까지</strong> 넣을 수 있고, 정부가 납입액의
            <strong> 100%를 매칭</strong>해 전역할 때 함께 줍니다. 18개월을 꽉 채워 넣으면 원금 990만 원에
            매칭 990만 원이 붙어 이자를 빼고도 1,980만 원입니다. 월급과 별개로 쌓이는 돈이라, 봉급 총액만
            보면 실제로 손에 쥐는 금액을 절반 가까이 놓치게 됩니다.
          </p>
          <h2>이자는 넣은 순서대로 붙습니다</h2>
          <p>
            적금 이자는 원금 전체에 붙는 게 아닙니다. 첫 달에 넣은 돈만 만기까지 놓여 있고 마지막 달에 넣은
            돈은 한 달만 놓입니다. 그래서 <strong>원금 × 이자율로 어림하면 두 배 가까이 크게 나옵니다</strong>.
            이 계산기는 매달 넣는 적금의 단리 공식으로 계산하고, 매칭지원금에는 이자를 붙이지 않습니다.
            장병내일준비적금 이자는 비과세입니다.
          </p>
          <h2>전역일이 궁금하면</h2>
          <p>
            입대일로 전역일과 진급일을 보려면 <Link href="/calculator/discharge">전역일 계산기</Link>를 쓰세요.
            같은 복무기간 자료를 씁니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>군별</Label>
              <select value={branch} onChange={e => setBranch(e.target.value)} className={inputCls}>
                {BRANCHES.map(b => (
                  <option key={b.key} value={b.key}>{b.label} ({b.months}개월)</option>
                ))}
              </select>
            </div>
            <div>
              <Label>적금 월 납입액 (최대 {fmt(SAVINGS_MAX)}원)</Label>
              <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)}
                placeholder="예: 550000" className={inputCls} min="0" max={SAVINGS_MAX} step="10000" />
            </div>
            <div>
              <Label>적금 연이율 (%)</Label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                placeholder="예: 5" className={inputCls} min="0" step="0.1" />
            </div>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">복무 {result.months}개월 동안 받는 봉급</p>
              <p className="stat-value">{fmt(result.pay)}원</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                적금까지 더하면 {man(result.pay + result.plan.total)}
              </p>
            </div>

            <Card>
              <CardHeader title="계급별 봉급" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {result.ranks.map(r => (
                  <div key={r.rank} className="row-pair">
                    <span className="row-label">{r.rank} · {r.months}개월</span>
                    <span className="val">{fmt(r.total)}원
                      <span className="val-unit"> (월 {fmt(r.monthly)})</span>
                    </span>
                  </div>
                ))}
                <div className="row-pair">
                  <span className="row-label font-bold">봉급 합계</span>
                  <span className="val font-bold">{fmt(result.pay)}원</span>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader title="장병내일준비적금" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                <div className="row-pair">
                  <span className="row-label">내가 넣은 돈</span>
                  <span className="val">{fmt(result.plan.principal)}원</span>
                </div>
                <div className="row-pair">
                  <span className="row-label">정부 매칭지원금</span>
                  <span className="val">{fmt(result.plan.match)}원</span>
                </div>
                <div className="row-pair">
                  <span className="row-label">이자 (비과세)</span>
                  <span className="val">{fmt(result.plan.interest)}원</span>
                </div>
                <div className="row-pair">
                  <span className="row-label font-bold">전역 때 받는 목돈</span>
                  <span className="val font-bold">{fmt(result.plan.total)}원</span>
                </div>
              </div>
            </Card>

            <p className="note-sm">
              봉급은 2026년 병 봉급표 기준이고, 급식비·수당은 넣지 않았습니다. 적금 이자는 넣으신 연이율로
              계산한 값이라 실제 은행 상품의 우대금리·정부 가산금리에 따라 달라집니다.
              계급별 봉급은 이등병 {man(PAY.이등병)} · 일병 {man(PAY.일병)} · 상병 {man(PAY.상병)} ·
              병장 {man(PAY.병장)}입니다.
            </p>
          </>
        )}
      </div>
    </CalcShell>
  );
}
