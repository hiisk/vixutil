'use client';
import { useState } from 'react';
import MoneyInput from '@/components/MoneyInput';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import { GRADE_LABEL, SAFE_DEBT_RATIO, calcJeonseSafety } from '@/lib/jeonse-safety';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;
const pct = (n: number | null) => (n === null ? '—' : `${n.toFixed(1)}%`);

/** 등급별 색 — 위험은 붉게, 안전은 푸르게 */
const GRADE_BG: Record<string, string> = {
  safe: 'bg-blue-600',
  caution: 'bg-amber-500',
  danger: 'bg-rose-600',
};
const GRADE_SUB: Record<string, string> = {
  safe: 'text-blue-200',
  caution: 'text-amber-100',
  danger: 'text-rose-200',
};

export default function JeonseSafetyPage() {
  const [marketPrice, setMarketPrice] = useState('');
  const [deposit, setDeposit] = useState('');
  const [seniorDebt, setSeniorDebt] = useState('0');
  const [auctionRatio, setAuctionRatio] = useState('');
  const [auctionCostRatio, setAuctionCostRatio] = useState('3');
  const [useProtection, setUseProtection] = useState(false);
  const [threshold, setThreshold] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<null | ReturnType<typeof calcJeonseSafety>>(null);
  // 계산에 쓴 보증금은 따로 붙들어 둔다 — 안전 보증금과의 차액을 보여줄 때 쓴다
  const [usedDeposit, setUsedDeposit] = useState(0);

  function calculate() {
    const price = Number(marketPrice);
    const dep = Number(deposit);
    const ratio = Number(auctionRatio);
    if (price <= 0 || dep <= 0 || ratio <= 0) return;
    setUsedDeposit(dep);
    setResult(calcJeonseSafety({
      marketPrice: price,
      deposit: dep,
      seniorDebt: Number(seniorDebt || 0),
      auctionRatio: ratio,
      auctionCostRatio: Number(auctionCostRatio || 0),
      minProtection: useProtection && Number(threshold) > 0
        ? { threshold: Number(threshold), amount: Number(amount || 0) }
        : null,
    }));
  }

  return (
    <CalcShell
      path="/calculator/jeonse-safety"
      title="전세 보증금 안전도 계산기"
      description="경매로 넘어갔을 때 떼일 금액과 깡통전세 판정"
      intro={
        <>
          <h2>등기부에서 무엇을 봐야 하나</h2>
          <p>
            전세 계약에서 확인할 것은 딱 한 가지입니다 — <strong>집이 경매로 넘어가도 내 보증금이
            돌아오는가</strong>. 그 답은 등기부등본 <strong>을구</strong>에 있습니다. 을구에 적힌{' '}
            <strong>근저당권 채권최고액</strong>이 나보다 앞선 돈이고, 경매가 되면 그 돈이 내 보증금보다
            먼저 빠져나갑니다. 갑구의 가압류·압류·가등기도 마찬가지입니다. 이 계산기에는 그렇게 앞선
            금액을 모두 더해 &lsquo;선순위 채권&rsquo;으로 넣으세요.
          </p>
          <p>
            채권최고액은 보통 실제 대출금의 110~120%로 잡히므로 실제 남은 빚보다 큽니다. 그래도
            등기부만 보고는 잔액을 알 수 없으니, 최악을 보려면 적힌 금액을 그대로 넣는 편이 안전합니다.
          </p>
          <h2>전세가율과 부채비율은 다릅니다</h2>
          <p>
            <strong>전세가율</strong>은 보증금 ÷ 시세입니다. 흔히 &ldquo;전세가율 80%면 위험&rdquo;이라고
            하지만, 이 값은 <strong>집주인의 빚을 세지 않습니다</strong>. 실제로 봐야 하는 것은{' '}
            <strong>부채비율</strong> — (선순위 채권 + 내 보증금) ÷ 시세입니다. 전세가율이 60%라도
            근저당이 시세의 50%면 부채비율은 110%가 되고, 그건 <strong>시세대로 팔려도 못 돌려받는다</strong>는
            뜻입니다. 이렇게 집값보다 빚과 보증금이 큰 집을 <strong>깡통전세</strong>라고 부릅니다.
          </p>
          <h2>낙찰가율이 왜 중요한가</h2>
          <p>
            경매에서 집은 시세대로 팔리지 않습니다. 유찰될 때마다 최저가가 깎여 시세의 70~80%,
            시장이 식으면 그보다 낮게 낙찰되기도 합니다. 부채비율이 90%여서 &ldquo;시세대로면
            간신히 된다&rdquo;는 집도 낙찰가율 75%에서는 크게 떼입니다. 낙찰가율은{' '}
            <strong>지역·물건 종류·그 시기의 시장</strong>에 따라 달라서 이 계산기는 값을 넣어 두지
            않았습니다 — 법원경매 정보에서 그 지역·같은 종류 물건의 최근 낙찰가율을 확인해 넣으세요.
            경매비용(집행비용)도 낙찰가에서 먼저 빠지므로 비율로 함께 받습니다.
          </p>
          <h2>확정일자와 전입신고를 미루면 순위가 밀립니다</h2>
          <p>
            위 계산은 내가 <strong>근저당보다 앞선 순위</strong>임을 전제로 합니다. 그 순위를 만드는 것이{' '}
            <strong>전입신고 + 확정일자</strong>이고, 대항력은 <strong>다음 날 0시</strong>에 생깁니다.
            잔금 치른 날 집주인이 같은 날 대출을 받으면 근저당이 앞서게 됩니다. 계약 후 잔금일에
            바로 전입신고와 확정일자를 받고, 등기부를 <strong>계약 전·잔금 전·잔금 다음 날</strong>{' '}
            세 번 확인하세요.
          </p>
          <h2>소액임차인 최우선변제와 전세보증보험</h2>
          <p>
            보증금이 일정 금액 이하인 임차인은 그중 일부를 <strong>선순위 근저당보다 앞서</strong>{' '}
            받습니다. 다만 지역별 기준액과 우선변제액은 대통령령·고시로 정해지고 여러 번 개정돼
            왔으며, 어느 기준이 적용되는지는 <strong>근저당 설정일</strong>에 따라 갈립니다. 그래서
            이 계산기는 두 금액을 박아 두지 않고 입력으로 받습니다 — 현행 기준을 확인해 넣으세요.
          </p>
          <p>
            결국 가장 확실한 방법은 계산이 아니라 <strong>전세보증금 반환보증</strong>에 가입하는
            것입니다. 부채비율이 높으면 보증 가입 자체가 거절될 수 있는데, 그 거절이야말로 가장
            정직한 신호입니다.
          </p>
          <h2>이 계산은 어림입니다</h2>
          <p>
            시세도 낙찰가율도 추정이고, 등기부 을구만 봐서는 드러나지 않는 선순위(앞선 임차인·조세채권
            등)도 있습니다. 안전 등급을 가르는 기준(부채비율 {SAFE_DEBT_RATIO}% 이하를 &lsquo;안전&rsquo;으로
            봄)도 법이 정한 선이 아니라 <strong>이 계산기가 정한 어림 기준</strong>입니다.{' '}
            <strong>법률·투자 조언이 아니라 계약 전에 자릿수를 가늠하는 계산</strong>이니, 실제 판단은
            등기부와 계약서를 들고 전문가와 확인하세요. 계약 전 확인 순서는{' '}
            <Link href="/checklist/jeonse-fraud" className="underline">전세사기 예방 체크리스트</Link>에
            정리돼 있습니다.
          </p>
          <h2>같이 보면 좋은 계산기</h2>
          <p>
            보증금을 월세로 돌리는 환산은{' '}
            <Link href="/calculator/jeonwolse" className="underline">전월세 전환 계산기</Link>,
            전세와 월세 중 어느 쪽이 이득인지는{' '}
            <Link href="/calculator/jeonse-wolse" className="underline">전세 월세 유불리 계산기</Link>,
            갱신 때 올릴 수 있는 폭은{' '}
            <Link href="/calculator/lease-renewal" className="underline">계약갱신 인상 한도 계산기</Link>에서
            봅니다. 상가 임대차의 보증금 + 월세×100은{' '}
            <Link href="/calculator/deposit-conversion" className="underline">환산보증금 계산기</Link>,
            집주인 쪽에서 본 수익률은{' '}
            <Link href="/calculator/rental-yield" className="underline">임대수익률 계산기</Link>가 답합니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>집 시세 (원)</Label>
              <MoneyInput value={marketPrice} onChange={setMarketPrice} placeholder="예: 500000000" />
            </div>
            <div>
              <Label>내 보증금 (원)</Label>
              <MoneyInput value={deposit} onChange={setDeposit} placeholder="예: 300000000" />
            </div>
            <div>
              <Label>선순위 채권 (원) — 등기부 을구의 근저당 설정액 등</Label>
              <MoneyInput value={seniorDebt} onChange={setSeniorDebt} placeholder="예: 100000000" />
            </div>
            <div>
              <Label>낙찰가율 (%) — 그 지역 최근 경매 낙찰가율</Label>
              <input type="number" value={auctionRatio} onChange={e => setAuctionRatio(e.target.value)}
                placeholder="예: 80" className={inputCls} min="0" step="0.1" />
            </div>
            <div>
              <Label>경매비용 (낙찰가의 %)</Label>
              <input type="number" value={auctionCostRatio} onChange={e => setAuctionCostRatio(e.target.value)}
                placeholder="예: 3" className={inputCls} min="0" step="0.1" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={useProtection} onChange={e => setUseProtection(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">소액임차인 최우선변제 반영</span>
            </label>
            {useProtection && (
              <>
                <div>
                  <Label>소액임차인 기준액 (원) — 현행 고시 확인</Label>
                  <MoneyInput value={threshold} onChange={setThreshold} placeholder="예: 165000000" />
                </div>
                <div>
                  <Label>최우선변제액 (원) — 현행 고시 확인</Label>
                  <MoneyInput value={amount} onChange={setAmount} placeholder="예: 55000000" />
                </div>
              </>
            )}
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className={`${GRADE_BG[result.grade]} rounded-lg p-5`}>
              <p className={`${GRADE_SUB[result.grade]} text-xs mb-1`}>
                {result.shortfall > 0 ? '경매로 넘어가면 떼일 금액' : '떼일 금액 없음'}
              </p>
              <p className="text-white text-3xl font-bold">
                {result.shortfall > 0 ? man(result.shortfall) : '0원'}
              </p>
              <p className={`${GRADE_SUB[result.grade]} text-xs mt-1`}>
                안전도 {GRADE_LABEL[result.grade]} · 전세가율 {pct(result.jeonseRatio)} · 부채비율 {pct(result.debtRatio)}
              </p>
            </div>

            {result.debtRatio !== null && result.debtRatio > 100 && (
              <Card className="p-4">
                <p className="text-sm text-rose-600 dark:text-rose-400 font-semibold">
                  부채비율이 100%를 넘습니다 — 시세대로 팔려도 선순위 채권과 내 보증금을 다 덮지 못하는
                  깡통전세입니다.
                </p>
              </Card>
            )}

            <Card>
              <CardHeader title="경매로 넘어가면" sub="낙찰가에서 순서대로 빠져나가는 돈" />
              <div className="divide-y divide-slate-100">
                {[
                  ['낙찰가 (시세 × 낙찰가율)', result.auctionPrice],
                  ['경매비용', -result.auctionCost],
                  ['배당에 쓰이는 돈', result.distributable],
                  ['최우선변제로 먼저 받는 몫', result.priorityPayout],
                  ['선순위 채권이 가져가는 몫', -result.seniorPayout],
                  ['순위대로 받는 내 몫', result.ordinaryPayout],
                  ['내가 돌려받는 총액', result.recovered],
                  ['떼일 금액', -result.shortfall],
                ].map(([k, v]) => (
                  <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{fmt(v as number)}원</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="두 비율" sub="전세가율은 집주인 빚을 세지 않는다" />
              <div className="divide-y divide-slate-100">
                {[
                  ['전세가율 (보증금 ÷ 시세)', pct(result.jeonseRatio)],
                  ['부채비율 ((선순위 + 보증금) ÷ 시세)', pct(result.debtRatio)],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="보증금을 얼마까지 낮추면 안전한가" sub="깎아 달라고 할 때 부를 숫자" />
              <div className="px-5 py-4">
                <p className="text-2xl font-bold">{man(result.safeDeposit)}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  이 금액까지면 위 조건에서 떼이는 돈이 없습니다
                  {usedDeposit > result.safeDeposit && (
                    <> — 지금 보증금보다 {man(usedDeposit - result.safeDeposit)} 낮은 금액입니다</>
                  )}
                  . 낙찰가율을 더 보수적으로 낮춰 넣으면 이 금액도 함께 내려갑니다.
                </p>
              </div>
            </Card>

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 어림 계산입니다 — 시세·낙찰가율은 추정이고, 등기부 을구만으로는 앞선 임차인·조세채권 같은
                선순위가 다 드러나지 않습니다. 안전 등급 기준(부채비율 {SAFE_DEBT_RATIO}% 이하를 안전으로 봄)도
                법이 정한 선이 아니라 이 계산기가 정한 어림 기준입니다. 법률·투자 조언이 아닙니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
