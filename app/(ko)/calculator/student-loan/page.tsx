'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, {
  Card, CardHeader, Label, inputCls, PrimaryBtn, ShowMoreBtn, SummaryCard, SummaryGrid, TableWrap,
} from '@/components/CalcShell';
import { MAX_YEARS, compare } from '@/lib/student-loan';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${Math.round(n / 10_000).toLocaleString()}만원`;

export default function StudentLoanPage() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('120');
  const [grace, setGrace] = useState('0');
  const [income, setIncome] = useState('');
  const [threshold, setThreshold] = useState('');
  const [repayRate, setRepayRate] = useState('');
  const [growth, setGrowth] = useState('3');
  const [result, setResult] = useState<ReturnType<typeof compare> | null>(null);
  const [shown, setShown] = useState(12);

  function calculate() {
    const p = Number(principal);
    const r = Number(rate);
    const m = Number(months);
    if (p <= 0 || m <= 0) return;
    setShown(12);
    setResult(compare(
      { principal: p, annualRate: r, months: m, graceMonths: Number(grace || 0) },
      {
        principal: p,
        annualRate: r,
        annualIncome: Number(income || 0),
        threshold: Number(threshold || 0),
        repayRate: Number(repayRate || 0),
        incomeGrowth: Number(growth || 0),
      },
    ));
  }

  const icl = result?.icl;

  return (
    <CalcShell
      path="/calculator/student-loan"
      title="학자금 대출 상환 계산기"
      description="취업 후 상환과 일반 상환 — 총 상환액·총 이자·끝나는 해를 나란히"
      intro={
        <>
          <h2>두 방식은 갚는 규칙 자체가 다릅니다</h2>
          <p>
            <strong>일반 상환</strong>은 정해진 기간에 원리금균등으로 갚습니다. 소득이 얼마든 매달 같은
            금액이 나가고, 만기가 되면 끝납니다. <strong>취업 후 상환(ICL)</strong>은 다릅니다.
            <strong>소득이 상환기준소득을 넘는 해에만</strong> 갚고, 그 해 갚는 돈은
            <strong> (연 소득 − 상환기준소득) × 상환율</strong>입니다. 월 상환액이 정해져 있지 않으니
            일반 대출 계산기로는 답이 나오지 않습니다 — 언제 끝나는지가 소득에 달려 있기 때문입니다.
          </p>
          <h2>유예는 면제가 아닙니다 — 이자는 계속 붙습니다</h2>
          <p>
            소득이 기준 아래인 해는 <strong>상환 유예</strong>입니다. 그 해에 내는 돈은 0원이지만
            <strong> 이자는 그대로 붙어 잔액에 얹힙니다.</strong> 갚지 않은 해가 &ldquo;없던 해&rdquo;가
            되는 것이 아니라, 원금이 그만큼 불어난 채로 다음 해가 시작됩니다. 아래 연도별 표에서
            유예된 해의 잔액이 어떻게 되는지 직접 보세요.
          </p>
          <h2>소득이 오르면 기간이 줄어듭니다</h2>
          <p>
            갚는 금액이 기준 초과 소득에 비례하므로, 소득이 오를수록 해마다 갚는 돈이 커지고 상환이
            일찍 끝납니다. 일찍 끝나면 이자가 붙는 기간도 짧아져 총 이자가 줄어듭니다. 그래서 이
            계산기는 <strong>소득 증가율</strong>을 입력으로 받아 연도별로 굴립니다. 증가율을 0%와 5%로
            각각 넣어 결과가 얼마나 벌어지는지 보는 편이 실제 판단에 더 도움이 됩니다.
          </p>
          <h2>총액이 적은 쪽이 늘 유리한 것은 아닙니다</h2>
          <p>
            이 계산기는 총 상환액을 맞대 주지만, 그 숫자만으로 결정하지 마세요. 취업 후 상환은
            <strong> 소득이 적은 해에 내는 돈이 0원</strong>이라 현금 흐름이 훨씬 가볍습니다. 총액이
            더 크더라도 당장 갚을 여력이 없다면 그쪽이 현실적인 선택일 수 있습니다. 반대로 소득이
            안정적이라면 일반 상환으로 빨리 끝내는 편이 이자를 아낍니다. 무엇보다{' '}
            <strong>앞으로의 소득은 아무도 모릅니다</strong> — 여기서 나온 총액은 &ldquo;입력한 소득
            경로가 실제로 그렇게 될 때&rdquo;의 값입니다.
          </p>
          <h2>기준소득·상환율·금리를 직접 넣는 이유</h2>
          <p>
            <strong>상환기준소득·상환율·학자금 대출 금리는 해마다 고시로 바뀝니다.</strong> 금리는
            반기마다 정해지고, 상환기준소득도 매년 새로 고시됩니다. 확인하지 못한 숫자를 기본값으로
            넣어 두면 그것이 답처럼 보이므로 이 계산기는 값을 비워 두었습니다 — 한국장학재단이 공고한
            그 해의 값을 넣어 쓰세요.
          </p>
          <h2>이 계산의 한계</h2>
          <p>
            취업 후 상환은 <strong>연 단위로 굴립니다.</strong> 이자를 그 해 초 잔액에 한 번 붙이고
            그 해 상환액을 한 번 뺍니다. 실제로는 원천공제로 달마다 나뉘어 들어가므로 총 이자가 여기서
            낸 값보다 조금 적게 나옵니다. 상환 기간을 해 단위로 보는 계산이라 결론이 뒤집힐 정도는
            아니지만, 총액을 원 단위로 맞추는 용도는 아닙니다. 의무 상환 외에 자발적으로 더 갚는 경우,
            군 복무·실직에 따른 상환 유예 신청, 대출 종류별 특례도 담지 않았습니다. 갈아타기까지 함께
            재려면{' '}
            <Link href="/calculator/refinance" className="underline">대출 갈아타기 계산기</Link>,
            일반 상환의 달별 스케줄이 필요하면{' '}
            <Link href="/calculator/loan" className="underline">대출 이자 계산기</Link>를 보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>대출 원금 (원)</Label>
              <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)}
                placeholder="예: 30000000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>연이율 (%, 그 해 고시 금리)</Label>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)}
                placeholder="예: 1.7" className={inputCls} min="0" step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>일반 상환 기간 (개월)</Label>
                <input type="number" value={months} onChange={e => setMonths(e.target.value)}
                  placeholder="예: 120" className={inputCls} min="1" />
              </div>
              <div>
                <Label>거치기간 (개월)</Label>
                <input type="number" value={grace} onChange={e => setGrace(e.target.value)}
                  placeholder="예: 0" className={inputCls} min="0" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
            취업 후 상환 조건
          </p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>첫해 연 소득 (원, 세전)</Label>
              <input type="number" value={income} onChange={e => setIncome(e.target.value)}
                placeholder="예: 30000000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>상환기준소득 (원, 그 해 고시값)</Label>
              <input type="number" value={threshold} onChange={e => setThreshold(e.target.value)}
                placeholder="예: 25000000" className={inputCls} min="0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>상환율 (%, 고시값)</Label>
                <input type="number" value={repayRate} onChange={e => setRepayRate(e.target.value)}
                  placeholder="예: 20" className={inputCls} min="0" step="0.1" />
              </div>
              <div>
                <Label>소득 증가율 (%/년)</Label>
                <input type="number" value={growth} onChange={e => setGrowth(e.target.value)}
                  placeholder="예: 3" className={inputCls} min="0" step="0.1" />
              </div>
            </div>
            <PrimaryBtn onClick={calculate}>두 방식 비교하기</PrimaryBtn>
          </div>
        </Card>

        {result && icl && (
          <>
            {/* 갚지 못하는 경우가 먼저다 — 총액 비교보다 이 사실이 중요하다 */}
            {icl.finishYear === null ? (
              <div className="rounded-2xl border-2 border-red-300 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 p-5">
                <p className="text-red-800 dark:text-red-300 text-sm font-bold mb-1">
                  이 소득으로는 취업 후 상환이 끝나지 않습니다
                </p>
                <p className="text-xs leading-relaxed text-red-700 dark:text-red-300/90">
                  넣으신 소득이 {MAX_YEARS}년 동안 상환기준소득을 넘지 못해 <strong>갚는 해가 없거나 너무
                  적습니다.</strong> 상환이 유예되는 동안에도 이자는 계속 붙으므로{' '}
                  {icl.growing
                    ? <><strong>잔액이 줄지 않고 오히려 늘어납니다</strong> — {MAX_YEARS}년 뒤 잔액이 약 {man(icl.years[icl.years.length - 1].balance)}입니다.</>
                    : <>잔액이 줄어들지 않습니다.</>}{' '}
                  완료 연도를 지어내지 않고 비워 두었습니다. 소득 증가율을 올려 보거나, 일반 상환 쪽 결과를
                  기준으로 보세요.
                </p>
              </div>
            ) : (
              <div className="bg-blue-600 rounded-2xl p-5">
                <p className="text-blue-200 text-xs mb-1">총 상환액이 적은 쪽</p>
                <p className="text-white text-3xl font-black">
                  {result.cheaper === 'standard' ? '일반 상환' : '취업 후 상환'}
                </p>
                <p className="text-blue-200 text-xs mt-1">
                  차액 {man(Math.abs(result.totalDiff))} · 취업 후 상환은 {icl.finishYear}년째에 끝납니다
                </p>
              </div>
            )}

            <SummaryGrid>
              <SummaryCard label="일반 상환 총액" value={man(result.standard.totalPaid)}
                sub={`이자 ${man(result.standard.totalInterest)}`} />
              <SummaryCard label="일반 상환 월 납입" value={`${fmt(result.standard.monthlyAfterGrace)}원`}
                sub={`${result.standard.repayMonths}개월`} />
              <SummaryCard label="취업 후 상환 총액"
                value={icl.finishYear === null ? '—' : man(icl.totalPaid)}
                sub={icl.finishYear === null ? '끝나지 않음' : `이자 ${man(icl.totalInterest)}`}
                variant={icl.finishYear === null ? 'red' : 'default'} />
              <SummaryCard label="취업 후 상환 기간"
                value={icl.finishYear === null ? '—' : `${icl.finishYear}년`}
                sub={`유예 ${icl.deferredYears}년`}
                variant={icl.finishYear === null ? 'red' : 'default'} />
            </SummaryGrid>

            <Card>
              <CardHeader title="두 방식 맞대기" sub={`원금 ${man(Number(principal))}`} />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  ['총 상환액', man(result.standard.totalPaid), icl.finishYear === null ? '끝나지 않음' : man(icl.totalPaid)],
                  ['총 이자', man(result.standard.totalInterest), icl.finishYear === null ? `${MAX_YEARS}년간 ${man(icl.totalInterest)}` : man(icl.totalInterest)],
                  ['끝나는 해', `${result.standard.finishYear}년`, icl.finishYear === null ? '없음' : `${icl.finishYear}년`],
                  ['상환 유예된 해', '0년', `${icl.deferredYears}년`],
                ].map(([k, a, b]) => (
                  <div key={k} className="px-5 py-3 grid grid-cols-3 gap-2 text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold text-right">{a}</span>
                    <span className="font-semibold text-right">{b}</span>
                  </div>
                ))}
                <div className="px-5 py-3 grid grid-cols-3 gap-2 text-xs text-slate-400 dark:text-slate-500">
                  <span />
                  <span className="text-right">일반 상환</span>
                  <span className="text-right">취업 후 상환</span>
                </div>
              </div>
            </Card>

            {result.standard.monthlyDuringGrace > 0 && Number(grace) > 0 && (
              <Card className="p-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  일반 상환에 거치기간 {grace}개월을 두었습니다. 거치 중에는 이자만{' '}
                  <strong>월 {fmt(result.standard.monthlyDuringGrace)}원</strong>을 내고, 거치가 끝나면 원금을
                  남은 {result.standard.repayMonths}개월에 몰아 갚아{' '}
                  <strong>월 {fmt(result.standard.monthlyAfterGrace)}원</strong>이 됩니다. 거치 동안 원금이 줄지
                  않으므로 총 이자는 그만큼 늘어납니다.
                </p>
              </Card>
            )}

            <Card>
              <CardHeader title="취업 후 상환 — 연도별" sub={`${icl.years.length}년`} />
              <TableWrap>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                      <th className="px-3 py-2 text-left font-medium">해</th>
                      <th className="px-3 py-2 text-right font-medium">연 소득</th>
                      <th className="px-3 py-2 text-right font-medium">상환액</th>
                      <th className="px-3 py-2 text-right font-medium">붙은 이자</th>
                      <th className="px-3 py-2 text-right font-medium">남은 잔액</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {icl.years.slice(0, shown).map(y => (
                      <tr key={y.year} className={y.deferred ? 'bg-amber-50/60 dark:bg-amber-950/20' : undefined}>
                        <td className="px-3 py-2">
                          {y.year}
                          {y.deferred && <span className="ml-1 text-xs text-amber-600 dark:text-amber-400">유예</span>}
                        </td>
                        <td className="px-3 py-2 text-right text-slate-500 dark:text-slate-400">{man(y.income)}</td>
                        <td className="px-3 py-2 text-right font-semibold">{y.payment > 0 ? man(y.payment) : '0원'}</td>
                        <td className="px-3 py-2 text-right text-slate-500 dark:text-slate-400">{man(y.interest)}</td>
                        <td className="px-3 py-2 text-right">{man(y.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrap>
              <div className="px-3 pb-3">
                <ShowMoreBtn total={icl.years.length} showing={shown} onClick={() => setShown(icl.years.length)} />
              </div>
              {icl.deferredYears > 0 && (
                <p className="px-5 pb-4 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                  노란 줄이 상환 유예된 해입니다. 내는 돈은 0원이지만 <strong>이자는 붙어 잔액이 늘어납니다</strong> —
                  유예는 면제가 아닙니다.
                </p>
              )}
            </Card>

            <Card className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                <strong>총액이 적은 쪽이 늘 유리한 것은 아닙니다.</strong> 취업 후 상환은 소득이 적은 해에
                내는 돈이 0원이라 현금 흐름이 훨씬 가볍고, 앞으로의 소득이 얼마가 될지는 아무도 모릅니다.
                위 총액은 넣으신 소득 증가율 {growth || 0}%가 실제로 그대로 이어질 때의 값입니다.
              </p>
            </Card>

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 상환기준소득·상환율·금리는 해마다 고시로 바뀝니다 · 취업 후 상환을 연 단위로 굴린 추정치이며
                자발적 상환·복무 중 유예·대출 종류별 특례는 담지 않았습니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
