'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, TabBar, inputCls,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import {
  DEFAULT_EXCISE_RATE, EXCISE_LEVERAGE,
  calcExcise, compareRates, fromReleasePrice,
  type ExciseBreakdown, type RateCompare,
} from '@/lib/car-excise-tax';

const w = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${Math.round(n / 10_000).toLocaleString()}만원`;
// 0.035 × 100은 3.5000000000000004가 된다 — 세율은 그대로 내보내지 않는다
const pct = (r: number) => `${Number((r * 100).toFixed(2))}%`;

type Mode = 'base' | 'release';

export default function CarExciseTaxPage() {
  const [mode, setMode] = useState<Mode>('release');
  const [amount, setAmount] = useState(30_000_000);
  const [rate, setRate] = useState(String(DEFAULT_EXCISE_RATE * 100));
  const [lowRate, setLowRate] = useState('3.5');
  const [cap, setCap] = useState(0);
  const [result, setResult] = useState<null | {
    now: ExciseBreakdown;
    cmp: RateCompare | null;
  }>(null);

  function calculate() {
    if (amount <= 0) return;
    const r = Math.max(0, Number(rate) || 0) / 100;
    // 출고가로 넣었으면 먼저 공장도가로 되짚는다 — 그다음은 두 길이 같다
    const base = mode === 'base' ? amount : fromReleasePrice(amount, r).base;
    if (base <= 0) return;

    const low = Math.max(0, Number(lowRate) || 0) / 100;
    setResult({
      now: calcExcise(base, r),
      cmp: lowRate !== '' && low < r ? compareRates(base, r, low, cap) : null,
    });
  }

  return (
    <CalcShell
      path="/calculator/car-excise-tax"
      title="자동차 개별소비세 계산기"
      description="출고가에 든 개별소비세·교육세·부가세를 되짚고 세율 인하 효과를 봅니다"
      intro={
        <>
          <h2>출고가는 공장도가가 아닙니다</h2>
          <p>
            제조사가 매기는 값은 <strong>공장도가</strong>이고, 우리가 보는 출고가는 거기에 세금 셋이
            층으로 얹힌 금액입니다. 순서가 정해져 있습니다 — 공장도가에{' '}
            <strong>개별소비세</strong>가 붙고, 그 개별소비세액의 <strong>30%</strong>가 교육세로
            붙고, 마지막에 <strong>셋을 합한 금액</strong>에 부가세 10%가 붙습니다. 공장도가
            2,000만원에 세율 5%면 개소세 100만원, 교육세 30만원, 부가세 213만원이 얹혀 출고가는
            2,343만원이 됩니다.
          </p>
          <h2>세금 위에 세금이 붙습니다</h2>
          <p>
            부가세의 과세표준이 공장도가가 아니라 <strong>세금까지 얹은 금액</strong>이라는 점이
            중요합니다. 그래서 개별소비세가 1원 줄면 출고가는 1원이 아니라{' '}
            <strong>{EXCISE_LEVERAGE.toFixed(2)}원</strong>(= 1.3 × 1.1) 내려갑니다. 개소세를 기준으로
            잡는 교육세와, 둘을 얹은 금액에 붙는 부가세가 함께 줄기 때문입니다. 반대로 소비자가 아는
            숫자는 출고가 하나뿐이라, 그 안에 세금이 얼마 들었는지 알려면 이 배수로 나눠 되짚어야
            합니다. 위쪽 <strong>출고가로 역산</strong> 탭이 그 계산입니다.
          </p>
          <h2>인하는 실제로 얼마를 아껴 줍니까</h2>
          <p>
            승용차 개별소비세를 5%에서 <strong>3.5%</strong>로 내리면, 공장도가 2,000만원 차는 개소세가
            30만원 깎이고 출고가는 <strong>42만 9,000원</strong> 내려갑니다. 세율 차이는 1.5%p인데
            출고가는 1.83% 싸지는 셈입니다. 다만 인하할 때 <strong>깎아 주는 세액에 상한</strong>을 둔
            적이 있습니다. 한도가 100만원이면 공장도가 1억짜리 차는 150만원어치가 깎일 자리에서
            100만원까지만 깎여, 아끼는 금액이 214만원이 아니라 143만원이 됩니다. 한도를 넣지 않으면
            비싼 차에서 아끼는 금액이 부풀려지므로 입력으로 두었습니다.
          </p>
          <h2>세율은 시기마다 다릅니다</h2>
          <p>
            승용차 개별소비세 기본 세율은 <strong>5%</strong>지만, 소비를 살리려고{' '}
            <strong>탄력세율</strong>로 3.5%까지 내린 시기가 여러 번 있었고 그때마다 반년 단위로
            연장되거나 그냥 끝났습니다. 그래서 이 계산기는 세율을 넣어 두지 않고{' '}
            <strong>입력으로 받습니다</strong> — 화면의 5%는 기본 세율일 뿐이니, 계약 시점에 실제로
            적용된 세율을 넣으세요. 배기량 1,000cc 이하 경차는 개별소비세 과세 대상이 아니라 세율에{' '}
            <strong>0</strong>을 넣으면 되고, 그때 출고가는 공장도가의 1.1배입니다.
          </p>
          <h2>여기까지가 출고가입니다</h2>
          <p>
            이 계산은 <strong>출고가가 만들어지는 데까지</strong>만 답합니다. 차를 살 때 실제로 더
            나가는 취득세·공채·등록 실비는 출고가 <em>다음</em>에 붙는 돈이라{' '}
            <Link href="/calculator/car-registration" className="underline">자동차 취등록세 계산기</Link>에서
            보세요. 딜러 할인이나 옵션 가격에 따라 실제 과세표준이 달라질 수 있고, 친환경차 감면처럼
            한도가 붙은 감면은 금액이 시기·차종마다 달라 넣어 두지 않았습니다 — 아는 한도가 있으면
            감면 한도 칸에 직접 넣어 계산하세요. 결과는 추정치입니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar<Mode>
          options={[
            { value: 'release', label: '출고가로 역산', sub: '세금이 얼마 들었나' },
            { value: 'base', label: '공장도가로 계산', sub: '출고가가 얼마가 되나' },
          ]}
          value={mode}
          onChange={setMode}
        />

        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>{mode === 'release' ? '출고가 (원)' : '공장도가 (원)'}</Label>
              <CommaInput value={amount} onChange={setAmount} placeholder="예: 30,000,000" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {mode === 'release'
                  ? '세금이 모두 포함된, 우리가 보는 가격'
                  : '제조사가 매기는 값 = 개별소비세의 과세표준'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>개별소비세 세율 (%)</Label>
                <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                  className={inputCls} min="0" step="0.1" />
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  기본 세율 {pct(DEFAULT_EXCISE_RATE)} · 경차는 0
                </p>
              </div>
              <div>
                <Label>비교할 인하 세율 (%)</Label>
                <input type="number" value={lowRate} onChange={e => setLowRate(e.target.value)}
                  className={inputCls} min="0" step="0.1" />
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  비우면 비교를 생략합니다
                </p>
              </div>
            </div>
            <div>
              <Label>감면 한도 (원, 없으면 0)</Label>
              <CommaInput value={cap} onChange={setCap} placeholder="예: 1,000,000" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                인하 때 깎아 주는 개별소비세에 상한이 있었으면 그 금액
              </p>
            </div>
            <PrimaryBtn onClick={calculate}>개별소비세 계산</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">출고가에 든 세금</p>
              <p className="stat-value">{w(result.now.taxTotal)}원</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                출고가 {man(result.now.releasePrice)}의 {result.now.taxRatio.toFixed(1)}% ·
                공장도가 {man(result.now.base)}
              </p>
            </div>

            <Card>
              <CardHeader title="층층이 얹은 내역" sub={`개별소비세 ${pct(result.now.exciseRate)}`} />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  ['공장도가 (과세표준)', result.now.base],
                  [`개별소비세 (과세표준 × ${pct(result.now.exciseRate)})`, result.now.excise],
                  ['교육세 (개별소비세 × 30%)', result.now.educationTax],
                  ['부가세 (앞의 셋 합 × 10%)', result.now.vat],
                  ['세금 합계', result.now.taxTotal],
                  ['출고가', result.now.releasePrice],
                ].map(([k, v]) => (
                  <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold tabular-nums">{w(v as number)}원</span>
                  </div>
                ))}
              </div>
            </Card>

            {result.cmp && (
              <Card>
                <CardHeader
                  title="세율이 내려가면"
                  sub={`${pct(result.cmp.before.exciseRate)} → ${pct(result.cmp.nominalRate)}`}
                />
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    ['깎이는 개별소비세', result.cmp.exciseCut],
                    ['내린 뒤 출고가', result.cmp.after.releasePrice],
                    ['아끼는 금액', result.cmp.saving],
                  ].map(([k, v]) => (
                    <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">{k}</span>
                      <span className="font-semibold tabular-nums">{w(v as number)}원</span>
                    </div>
                  ))}
                  <div className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">출고가가 내려가는 비율</span>
                    <span className="font-semibold tabular-nums">{result.cmp.savingRatio.toFixed(2)}%</span>
                  </div>
                </div>
                <p className="px-5 py-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  개별소비세 {w(result.cmp.exciseCut)}원이 깎이는데 출고가는{' '}
                  {w(result.cmp.saving)}원 내려갑니다 — 교육세와 부가세가 함께 줄어 감면액의{' '}
                  {EXCISE_LEVERAGE.toFixed(2)}배가 됩니다.
                  {result.cmp.capped && (
                    <>
                      {' '}감면 한도 {w(cap)}원에 걸려 세율은 명목{' '}
                      {pct(result.cmp.nominalRate)}지만 실제로는{' '}
                      {pct(result.cmp.after.exciseRate)}가 적용된 셈입니다.
                    </>
                  )}
                </p>
              </Card>
            )}

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                * 세율은 시기마다 달라 입력값으로 계산합니다 · 취득세·공채는 출고가 다음에 붙는 돈이라{' '}
                <Link href="/calculator/car-registration" className="underline">자동차 취등록세 계산기</Link>에서
                보세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
