'use client';
import { useState } from 'react';
import MoneyInput from '@/components/MoneyInput';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { calcYouthSavings, type MatchTier, type YouthSavingsResult } from '@/lib/youth-savings';

const fmt = (n: number) => Math.round(n).toLocaleString();
const pct = (n: number) => n.toFixed(2);

/**
 * 화면에서 고쳐 쓰는 구간 한 줄.
 *
 * 값을 미리 채워 두지 않는다 — 상품마다 다르고 해마다 바뀌는 숫자를 기본값으로
 * 놓으면 그게 답처럼 보인다. 안내문에 적힌 표를 그대로 옮겨 적게 한다.
 */
type TierRow = { ceiling: string; rate: string; limit: number };

const emptyRow: TierRow = { ceiling: '', rate: '', limit: 0 };

export default function YouthSavingsPage() {
  const [monthly, setMonthly] = useState(700_000);
  const [months, setMonths] = useState('60');
  const [rate, setRate] = useState('');
  const [income, setIncome] = useState('');
  const [taxFree, setTaxFree] = useState(true);
  const [rows, setRows] = useState<TierRow[]>([emptyRow]);
  const [result, setResult] = useState<YouthSavingsResult | null>(null);
  /* 계산한 뒤 체크박스를 건드려도 결과의 세금 라벨이 숫자와 어긋나지 않게 그때의 값을 붙들어 둔다 */
  const [shownTaxFree, setShownTaxFree] = useState(true);

  function setRow(i: number, patch: Partial<TierRow>) {
    setRows(rs => rs.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  }

  function calculate() {
    const n = Number(months);
    if (monthly <= 0 || n <= 0) return;

    /*
     * 상한을 비운 줄은 "이 위로 전부"라는 뜻이다. 자기 구간만 아는 사람은
     * 비율과 한도 두 칸만 채우면 되게 한다.
     */
    const tiers: MatchTier[] = rows
      .filter(r => Number(r.rate) > 0)
      .map(r => ({
        label: r.ceiling.trim() === '' ? '소득 구간 무관' : `연소득 ${Number(r.ceiling).toLocaleString()}만원 이하`,
        incomeCeiling: r.ceiling.trim() === '' ? Infinity : Number(r.ceiling) * 10_000,
        matchRate: Number(r.rate) / 100,
        matchLimit: r.limit,
      }));

    setShownTaxFree(taxFree);
    setResult(calcYouthSavings({
      monthly,
      months: n,
      annualRate: Number(rate) || 0,
      annualIncome: (Number(income) || 0) * 10_000,
      tiers,
      taxFree,
    }));
  }

  return (
    <CalcShell
      path="/calculator/youth-savings"
      title="청년 목돈 마련 계좌 계산기"
      description="정부 기여금과 비과세를 반영한 만기 수령액"
      intro={
        <>
          <h2>정부 기여금이 무엇인가</h2>
          <p>
            청년을 대상으로 한 일부 적립식 상품은 내가 넣은 돈에 <strong>정부가 매달 일정 금액을 얹어
            줍니다</strong>. 은행이 주는 이자와는 다른 돈입니다. 이자는 금리에서 나오지만 기여금은 납입액에
            직접 비례해 붙고, <strong>얹어 준 그 돈에도 다시 이자가 붙습니다</strong>. 그래서 같은 금리·같은
            납입액이라도 일반 적금과 만기 수령액이 크게 벌어집니다. 이 계산기는 그 벌어진 폭을
            숫자로 보여 줍니다. 기여금이 없는 보통 적금이라면{' '}
            <Link href="/calculator/savings" className="underline">적금 계산기</Link>를 쓰세요.
          </p>

          <h2>왜 실효 수익률이 그렇게 높게 나오나</h2>
          <p>
            적금은 첫 회차 납입금만 만기까지 온전히 예치되고 마지막 회차는 한 달치 이자만 받습니다.
            즉 <strong>내 돈은 평균 절반쯤만 계좌에 머뭅니다</strong>. 그런데 정부 기여금은 납입액에
            비례해 그대로 붙습니다. 적은 실제 예치액으로 큰 수익을 얻는 셈이라, &ldquo;같은 결과를 내는
            일반 적금 금리&rdquo;로 환산하면 <strong>두 자릿수</strong>가 나오기도 합니다. 계산이 틀린 게
            아니라 그게 이 상품의 값입니다. 이 계산기는 원금 대비 연 환산 수익률과, 같은 만기 수령액을
            내는 일반 과세 적금의 연이율을 함께 냅니다.
          </p>

          <h2>이자소득 비과세가 만드는 차이</h2>
          <p>
            일반 예금·적금 이자에는 <strong>이자소득세 15.4%</strong>(소득세 14% + 지방소득세 1.4%)가
            원천징수됩니다. 이런 정책성 상품은 요건을 갖추면 이 세금이 면제되는 경우가 있습니다.
            이자에 붙는 세금이 사라지면 만기 수령액이 그만큼 그대로 늘어납니다. 세금만 따로 보려면{' '}
            <Link href="/calculator/interest-tax" className="underline">이자소득세 계산기</Link>에서
            확인할 수 있습니다. 비과세 여부는 상품과 가입 요건에 따라 다르니 안내문을 보고 켜고 끄세요.
          </p>

          <h2>소득 구간이 무엇을 가르나</h2>
          <p>
            기여금은 소득에 따라 갈립니다. 대체로 <strong>소득이 낮을수록 얹어 주는 비율이 높고,
            비율이 붙는 납입액 한도는 낮게</strong> 잡힙니다. 한도가 걸리면 그 위로 더 넣어도 기여금은
            한 푼도 늘지 않습니다 — 더 넣은 몫은 전부 내 돈이고 이자만 붙습니다. 그래서 &ldquo;얼마까지
            넣는 게 효율적인가&rdquo;가 갈리는 지점이 이 한도입니다.
          </p>
          <p>
            <strong>비율·한도·소득 구간의 값은 이 계산기에 넣어 두지 않았습니다.</strong> 상품마다 다르고
            해마다 바뀌는 숫자라, 박아 두면 조용히 틀린 답을 내놓게 됩니다. 가입 안내문이나 공고에
            적힌 구간표를 그대로 옮겨 적으세요. 자기 구간만 알면 비율과 한도 두 칸만 채워도 됩니다.
          </p>

          <h2>중도 해지하면 어떻게 되나</h2>
          <p>
            <strong>만기 전에 깨면 정부 기여금을 못 받거나 깎입니다.</strong> 이 계산은 만기까지 한 회차도
            거르지 않고 넣었을 때의 금액입니다. 대부분의 상품이 중도 해지 시 기여금을 주지 않고,
            약정이율 대신 <strong>중도해지이율</strong>(보통 약정이율보다 훨씬 낮습니다)을 적용하며,
            비과세 혜택도 사라져 이미 붙은 이자에 세금이 매겨질 수 있습니다. 위에서 계산한 &ldquo;기여금 +
            기여금 이자&rdquo;가 곧 <strong>중도에 그만두면 놓치는 금액</strong>입니다. 3년, 5년을 계속
            넣을 수 있는 금액인지부터 정하세요.
          </p>

          <h2>이 계산의 한계</h2>
          <p>
            이자는 <strong>단리</strong>로, 회차별 예치 기간을 더해 셈합니다(대부분의 은행 적금이 이
            방식입니다). 기여금은 매달 같은 금액이 들어온다고 보고, 넣은 이율은 우대금리까지 포함한
            최종 이율로 봅니다. 우대금리 조건 충족 여부, 기본금리와 우대금리가 갈리는 구조, 만기 후
            이율, 회차를 거른 경우, 소득이 중간에 바뀌어 구간이 옮겨 가는 경우는 다루지 않습니다.
            기여금 지급액의 원 단위 절사 기준도 상품마다 달라 실제 입금액과 몇 원 차이가 날 수 있습니다.
            가입 여부와 실제 지급액은 반드시 취급 기관에서 확인하세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>월 납입액 (원)</Label>
              <CommaInput value={monthly} onChange={setMonthly} placeholder="예: 700,000" />
            </div>
            <div>
              <Label>납입 기간 (개월)</Label>
              <select value={months} onChange={e => setMonths(e.target.value)} className={inputCls}>
                {[12, 24, 36, 48, 60, 72].map(n => (
                  <option key={n} value={n}>{n}개월 ({n / 12}년)</option>
                ))}
              </select>
            </div>
            <div>
              <Label>연이율 (%, 우대금리 포함)</Label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                placeholder="예: 4.5" className={inputCls} min="0" step="0.1" />
            </div>
            <div>
              <Label>내 연소득 (만원)</Label>
              <MoneyInput value={income} onChange={setIncome} placeholder="예: 3000" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                아래 구간표에서 어느 줄이 적용되는지만 가릅니다
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
              <input type="checkbox" checked={taxFree} onChange={e => setTaxFree(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              이자소득 비과세 상품이다 (끄면 15.4%를 뗍니다)
            </label>
          </div>
        </Card>

        <Card>
          <CardHeader title="정부 기여금 구간표" sub="안내문의 값을 그대로 옮겨 적으세요" />
          <div className="p-5 flex flex-col gap-4">
            {rows.map((row, i) => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-3">
                <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{i + 1}번째 구간</p>
                <div>
                  <Label>연소득 상한 <span className="dial-opt">만원, 비우면 소득 무관</span></Label>
                  <input type="number" value={row.ceiling} onChange={e => setRow(i, { ceiling: e.target.value })}
                    placeholder="예: 2400" className={inputCls} min="0" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>기여금 비율 (%)</Label>
                    <input type="number" value={row.rate} onChange={e => setRow(i, { rate: e.target.value })}
                      placeholder="예: 3" className={inputCls} min="0" step="0.1" />
                  </div>
                  <div>
                    <Label>납입액 한도 (원)</Label>
                    <CommaInput value={row.limit} onChange={v => setRow(i, { limit: v })} placeholder="예: 400,000" />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-2">
              <button type="button" onClick={() => setRows(rs => [...rs, emptyRow])}
                className="text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                + 구간 추가
              </button>
              {rows.length > 1 && (
                <button type="button" onClick={() => setRows(rs => rs.slice(0, -1))}
                  className="text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  − 마지막 줄 삭제
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              기여금은 <strong>min(월 납입액, 한도) × 비율</strong>로 매달 붙습니다. 비율을 비우거나 0으로 두면
              기여금 없는 일반 적금과 같은 결과가 나옵니다.
            </p>
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>만기 수령액 계산</PrimaryBtn>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">만기 수령액</p>
              <p className="stat-value">{fmt(result.maturity)}원</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                {result.gap > 0
                  ? `일반 적금보다 ${fmt(result.gap)}원 더 받습니다`
                  : '기여금이 없어 일반 적금과 결과가 같습니다'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <SummaryCard label="내 납입 원금" value={`${fmt(result.principal)}원`} />
              <SummaryCard label="정부 기여금" value={`${fmt(result.matchTotal)}원`} variant="green" />
              <SummaryCard
                label="이자 합계 (세전)"
                value={`${fmt(result.grossInterest)}원`}
                sub={`내 원금 몫 ${fmt(result.principalInterest)}원`}
                variant="green"
              />
              <SummaryCard label="기여금에 붙는 이자" value={`${fmt(result.matchInterest)}원`} variant="green" />
              <SummaryCard
                label={shownTaxFree ? '이자소득세 (비과세)' : '이자소득세 (15.4%)'}
                value={shownTaxFree ? '0원' : `-${fmt(result.tax)}원`}
                variant={shownTaxFree ? 'default' : 'red'}
              />
              <SummaryCard label="일반 적금과의 차액" value={`+${fmt(result.gap)}원`} variant="primary" />
            </div>

            <Card>
              <CardHeader title="연 환산 수익률" sub="기여금이 얹히면 실효 수익률이 크게 뛴다" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  ['원금 대비 연 환산 수익률', `${pct(result.annualReturn)}%`],
                  ['같은 결과를 내는 일반 과세 적금 금리', `연 ${pct(result.equivalentRate)}%`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold tabular-nums">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="같은 돈을 일반 적금에 넣었다면" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  ['이 계좌 만기 수령액', fmt(result.maturity)],
                  ['일반 과세 적금 만기 수령액', fmt(result.plainMaturity)],
                  ['차액', fmt(result.gap)],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold tabular-nums">{v}원</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="적용된 기여금" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  ['적용 구간', result.tier ? result.tier.label : '해당 구간 없음 (기여금 0원)'],
                  ['월 기여금', `${fmt(result.monthlyMatch)}원`],
                  ['기여금 총액', `${fmt(result.matchTotal)}원`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            {result.matchCapped && result.tier && (
              <Card className="p-4 border-amber-300 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/20">
                <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                  ⚠️ 월 납입액이 기여금 한도({fmt(result.tier.matchLimit)}원)를 넘었습니다. 넘은 금액에는
                  기여금이 붙지 않고 이자만 붙습니다 — 한도까지만 넣고 나머지는 다른 곳에 넣는 것과
                  기여금은 같습니다.
                </p>
              </Card>
            )}

            <Card className="p-4 border-amber-300 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/20">
              <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                ⚠️ <strong>중도 해지하면 정부 기여금을 못 받거나 깎입니다.</strong> 위 금액은 만기까지 한 회차도
                거르지 않고 넣었을 때의 값입니다. 만기 전에 깨면 기여금
                {result.matchTotal + result.matchInterest > 0
                  ? ` ${fmt(result.matchTotal + result.matchInterest)}원(기여금 + 그 이자)을 `
                  : '을 '}
                놓치고, 약정이율 대신 훨씬 낮은 중도해지이율이 적용되며 비과세 혜택도 사라질 수 있습니다.
              </p>
            </Card>

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 단리·회차별 예치 기간 기준 · 기여금 비율·한도·소득 구간은 입력한 값을 그대로 씁니다
                · 우대금리 조건과 원 단위 절사는 반영하지 않으니 실제 지급액은 취급 기관에서 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
