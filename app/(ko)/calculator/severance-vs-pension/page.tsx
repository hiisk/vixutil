'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls,
  SummaryCard, SummaryGrid, TableWrap,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import {
  DEFERRED_RATE_EARLY, DEFERRED_RATE_LATE, RATE_STEP_YEAR,
  breakevenYears, compare, compareTable,
} from '@/lib/severance-vs-pension';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

/** 비교표에 세울 기간 — 10년과 11년을 나란히 두면 감액이 커지는 문턱이 보인다 */
const TABLE_YEARS = [5, 10, 11, 15, 20];

export default function SeveranceVsPensionPage() {
  const [payout, setPayout] = useState(100_000_000);
  const [years, setYears] = useState('20');
  const [months, setMonths] = useState('0');
  const [pensionYears, setPensionYears] = useState('15');
  const [returnRate, setReturnRate] = useState('4');
  const [startAge, setStartAge] = useState('60');
  const [result, setResult] = useState<null | {
    c: ReturnType<typeof compare>;
    table: ReturnType<typeof compareTable>;
    breakeven: number | null;
  }>(null);

  function calculate() {
    const serviceMonths = (Number(years) || 0) * 12 + (Number(months) || 0);
    if (payout <= 0 || serviceMonths <= 0) return;
    const input = {
      payout,
      serviceMonths,
      pensionYears: Number(pensionYears) || 0,
      returnRate: (Number(returnRate) || 0) / 100,
      startAge: Number(startAge) || 0,
    };
    if (input.pensionYears <= 0) return;
    setResult({
      c: compare(input),
      table: compareTable(input, TABLE_YEARS),
      breakeven: breakevenYears(input),
    });
  }

  return (
    <CalcShell
      path="/calculator/severance-vs-pension"
      title="퇴직금 일시금 vs 연금 비교 계산기"
      description="퇴직금을 한 번에 받을 때와 연금으로 나눠 받을 때의 세후 금액을 견줍니다"
      intro={
        <>
          <h2>연금으로 받으면 퇴직소득세를 깎아 줍니다</h2>
          <p>
            퇴직금을 한 번에 받으면 퇴직소득세를 <strong>그 자리에서 전액</strong> 냅니다. 대신 IRP에
            넣어 두고 연금으로 받으면 받을 때마다 그 몫에 해당하는 세금만 나눠 내고, 그 금액마저
            깎아 줍니다. 세금을 미루는 동안 <strong>세금 낼 몫까지 계좌에 남아 수익을 냅니다</strong> —
            일시금은 세금을 떼고 남은 돈만 굴릴 수 있으니, 같은 수익률이어도 굴러가는 원금이 다릅니다.
          </p>
          <h2>30%·40% 감액이 무엇인가</h2>
          <p>
            연금수령 <strong>10년 이내</strong>에 받는 몫은 원래 퇴직소득세의
            {' '}<strong>{pct(DEFERRED_RATE_EARLY)}</strong>만 냅니다(30% 감액).
            {' '}<strong>{RATE_STEP_YEAR}년째부터</strong> 받는 몫은
            {' '}<strong>{pct(DEFERRED_RATE_LATE)}</strong>만 냅니다(40% 감액). 퇴직소득세가 1,000만원인
            사람이 10년에 나눠 받으면 700만원, 20년에 나눠 받으면 650만원을 내는 셈입니다. 세금이
            사라지는 것이 아니라 <strong>덜 내고 늦게 내는</strong> 구조입니다.
          </p>
          <h2>{RATE_STEP_YEAR}년째가 문턱입니다</h2>
          <p>
            감액이 한 번 더 커지는 자리가 <strong>{RATE_STEP_YEAR}년째</strong>입니다. 10년에 걸쳐
            받으면 전부 70%를 내지만, 11년으로 한 해만 늘리면 마지막 한 해분이 60%로 내려갑니다.
            수령 기간을 길게 잡을수록 11년째 뒤로 넘어가는 몫이 늘어나 평균 납부율이 60%에
            가까워집니다. 아래 표가 5년·10년·11년·15년·20년을 나란히 보여 줍니다.
          </p>
          <h2>운용수익에는 다른 세금이 붙습니다</h2>
          <p>
            계좌에 남은 돈이 낸 <strong>운용수익</strong>은 이연퇴직소득이 아니므로 퇴직소득세 감액을
            받지 못하고 <strong>연금소득세</strong>가 붙습니다. 나이에 따라 5.5%·4.4%·3.3%(지방소득세
            포함)이고, 한 해 수령액이 1,500만원을 넘으면 16.5%로 뜁니다. 법이 정한 인출 순서가
            <strong> 이연퇴직소득 먼저</strong>라서, 초반에는 감액된 퇴직소득세만 붙고 원금을 다 받은
            뒤부터 운용수익에 연금소득세가 붙습니다. 자세한 셈은{' '}
            <Link href="/calculator/pension-tax" className="underline">연금소득세 계산기</Link>에 있습니다.
          </p>
          <h2>IRP를 중간에 해지하면 어떻게 되나</h2>
          <p>
            연금이 아닌 <strong>일시금으로 빼면 감액이 사라집니다</strong>. 이연해 둔 퇴직소득세를
            그대로 전액 내는 것이라, 결과는 처음부터 일시금으로 받은 것과 같아집니다. 게다가
            세액공제를 받았던 납입금과 운용수익 부분은 <strong>기타소득세 16.5%</strong>가 붙습니다.
            연금수령한도(평가액 ÷ (11 − 연금수령연차) × 120%)를 넘겨 받은 초과분도 연금외수령으로
            보아 감액이 안 됩니다 — 짧은 기간에 몰아 받으면 이 한도에 걸립니다.
          </p>
          <h2>이 계산이 답하지 않는 것</h2>
          <p>
            <strong>일시금을 받아 직접 굴리는 수익은 넣지 않았습니다.</strong> 그 수익률과 거기 붙는
            세금이 사람마다 달라서입니다. 그만큼 결과는 연금 쪽에 유리하게 기울어 있다고 보세요.
            연금수령한도도 넘지 않는다고 보고 셈합니다. 운용수익률·수령 기간·수령 시작 나이는
            확인할 수 없는 값이라 <strong>미리 넣어 두지 않고 입력으로 받습니다</strong>.
          </p>
          <p>
            세금만 보면 연금이 거의 언제나 앞섭니다. 일시금을 고르는 이유는 대개 세금이 아니라
            <strong> 당장 목돈이 필요해서</strong>입니다 — 대출을 갚거나 사업을 시작하는 경우가 그렇습니다.
            일시금으로 받을 때의 세금만 자세히 보려면{' '}
            <Link href="/calculator/retirement-income-tax" className="underline">퇴직소득세 계산기</Link>,
            퇴직금이 얼마인지는{' '}
            <Link href="/calculator/severance" className="underline">퇴직금 계산기</Link>에서 보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="퇴직 정보" />
          <div className="flex flex-col gap-3">
            <div>
              <Label>퇴직금 (원)</Label>
              <CommaInput value={payout} onChange={setPayout} placeholder="예: 100,000,000" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                비과세 항목을 뺀 퇴직소득금액 기준
              </p>
            </div>
            <div>
              <Label>근속 기간</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <input type="number" value={years} onChange={e => setYears(e.target.value)}
                    min="0" className={inputCls} />
                  <span className="text-sm text-slate-500 dark:text-slate-400 shrink-0">년</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" value={months} onChange={e => setMonths(e.target.value)}
                    min="0" max="11" className={inputCls} />
                  <span className="text-sm text-slate-500 dark:text-slate-400 shrink-0">개월</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="연금으로 받는다면" sub="확인할 수 없는 값이라 넣어 두지 않았습니다" />
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>수령 기간 (년)</Label>
                <input type="number" value={pensionYears} onChange={e => setPensionYears(e.target.value)}
                  placeholder="예: 15" className={inputCls} min="1" />
              </div>
              <div>
                <Label>수령 시작 나이 (만)</Label>
                <input type="number" value={startAge} onChange={e => setStartAge(e.target.value)}
                  placeholder="예: 60" className={inputCls} min="0" />
              </div>
            </div>
            <div>
              <Label>연 운용수익률 (%)</Label>
              <input type="number" value={returnRate} onChange={e => setReturnRate(e.target.value)}
                placeholder="예: 4" className={inputCls} step="0.1" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                아직 안 받은 잔액에 붙는 수익률 · 손실을 보는 경우를 보려면 음수를 넣으세요
              </p>
            </div>
            <PrimaryBtn onClick={calculate}>두 선택 비교하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">
                {result.c.better === 'pension' ? '연금으로 나눠 받는 쪽이 유리' :
                  result.c.better === 'lump' ? '일시금으로 받는 쪽이 유리' : '두 쪽이 사실상 같음'}
              </p>
              <p className="text-white text-3xl font-black">
                {result.c.better === 'tie' ? '차이 없음' : `${man(Math.abs(result.c.diff))} 차이`}
              </p>
              <p className="text-blue-200 text-xs mt-1">
                연금 세후 {man(result.c.pension.net)} · 일시금 세후 {man(result.c.lump.netPayout)}
              </p>
            </div>

            <SummaryGrid>
              <SummaryCard label="일시금 세후" value={`${fmt(result.c.lump.netPayout)}원`}
                sub={`세금 ${fmt(result.c.lump.totalTax)}원`} />
              <SummaryCard label="연금 세후 총액" value={`${fmt(result.c.pension.net)}원`}
                sub={`세금 ${fmt(result.c.pension.totalTax)}원`} variant="primary" />
              <SummaryCard label="세후 월 수령액" value={`${fmt(result.c.pension.netMonthly)}원`}
                sub={`${result.c.pension.years}년 평균`} variant="green" />
              <SummaryCard label="차액" value={`${result.c.diff >= 0 ? '+' : '−'}${fmt(Math.abs(result.c.diff))}원`}
                sub={result.c.diff >= 0 ? '연금이 앞선 금액' : '일시금이 앞선 금액'}
                variant={result.c.diff >= 0 ? 'green' : 'red'} />
            </SummaryGrid>

            <Card>
              <CardHeader title="일시금으로 받으면" />
              <div className="divide-y divide-slate-100">
                {[
                  ['퇴직금', `${fmt(result.c.lump.netPayout + result.c.lump.totalTax)}원`],
                  ['근속연수 (올림)', `${result.c.lump.years}년`],
                  ['퇴직소득세', `${fmt(result.c.lump.incomeTax)}원`],
                  ['지방소득세', `${fmt(result.c.lump.localTax)}원`],
                  ['세후 수령액', `${fmt(result.c.lump.netPayout)}원`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold tabular-nums">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title={`연금으로 ${result.c.pension.years}년에 걸쳐 받으면`} />
              <div className="divide-y divide-slate-100">
                {[
                  ['세전 총 수령액', `${fmt(result.c.pension.grossTotal)}원`],
                  ['그중 운용수익', `${fmt(result.c.pension.gainTotal)}원`],
                  ['나눠 낸 퇴직소득세', `${fmt(result.c.pension.severanceTax)}원`],
                  ['평균 납부율 (감액 뒤)', pct(result.c.pension.avgDeferredRate)],
                  ['운용수익 연금소득세', `${fmt(result.c.pension.pensionTax)}원`],
                  ['세후 총 수령액', `${fmt(result.c.pension.net)}원`],
                  ['세후 월 수령액', `${fmt(result.c.pension.netMonthly)}원`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold tabular-nums">{v}</span>
                  </div>
                ))}
              </div>
              <p className="px-5 pb-4 pt-1 text-xs text-slate-400 dark:text-slate-500">
                일시금이라면 낼 세금 {fmt(result.c.lump.totalTax)}원 가운데
                {' '}{fmt(result.c.lump.totalTax - result.c.pension.severanceTax)}원이 감액으로 줄었습니다
              </p>
            </Card>

            <Card>
              <CardHeader title="수령 기간을 바꾸면" sub={`${RATE_STEP_YEAR}년째부터 감액이 40%로 커집니다`} />
              <div className="divide-y divide-slate-100">
                {result.table.map(row => (
                  <div key={row.years} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">
                      {row.years}년에 나눠
                      <span className="text-slate-400 text-xs ml-1">
                        월 {man(row.netMonthly)} · 납부율 {pct(row.avgDeferredRate)}
                      </span>
                    </span>
                    <span className="font-semibold tabular-nums">
                      세후 {man(row.net)}
                      <span className={`text-xs ml-1 ${row.diff >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {row.diff >= 0 ? '+' : '−'}{man(Math.abs(row.diff))}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="px-5 pb-4 pt-1 text-xs text-slate-400 dark:text-slate-500">
                오른쪽 작은 숫자는 일시금 세후와의 차액입니다
                {result.breakeven !== null
                  ? ` · ${result.breakeven}년에 걸쳐 받으면 연금 쪽이 앞섭니다`
                  : ' · 이 수익률에서는 연금 쪽이 일시금을 넘어서지 못합니다'}
              </p>
            </Card>

            <Card>
              <CardHeader title="연차별 내역" />
              <TableWrap>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-slate-400 dark:text-slate-500">
                      <th className="px-3 py-2 text-left font-medium">연차</th>
                      <th className="px-3 py-2 text-right font-medium">나이</th>
                      <th className="px-3 py-2 text-right font-medium">수령액</th>
                      <th className="px-3 py-2 text-right font-medium">납부율</th>
                      <th className="px-3 py-2 text-right font-medium">세금</th>
                      <th className="px-3 py-2 text-right font-medium">세후</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {result.c.pension.rows.map(row => (
                      <tr key={row.year}>
                        <td className="px-3 py-2">{row.year}년째</td>
                        <td className="px-3 py-2 text-right tabular-nums">{row.age}세</td>
                        <td className="px-3 py-2 text-right tabular-nums">{fmt(row.gross)}</td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {row.fromDeferred > 0 ? pct(row.deferredRate) : '—'}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {fmt(row.severanceTax + row.pensionTax)}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums font-semibold">{fmt(row.net)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrap>
              <p className="px-5 pb-4 pt-2 text-xs text-slate-400 dark:text-slate-500">
                납부율은 그 해에 받은 이연퇴직소득에 적용된 퇴직소득세 비율입니다 · 원금을 다 받은
                해부터는 운용수익만 남아 연금소득세가 붙습니다(&mdash;로 표시)
              </p>
            </Card>

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 연금수령 10년 이내 30%, {RATE_STEP_YEAR}년째부터 40% 감액 기준 · 일시금을 받아 따로
                굴리는 수익은 넣지 않았습니다 · 연금수령한도를 넘기지 않는다고 보고 셈했습니다 ·
                정확한 세액은 원천징수영수증과 금융기관 안내를 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
