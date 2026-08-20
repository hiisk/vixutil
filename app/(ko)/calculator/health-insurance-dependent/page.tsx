'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import { checkDependent, HID_LIMITS, type HidResult } from '@/lib/health-insurance-dependent';

const won = (n: number) => n.toLocaleString('ko-KR');

/** 걸린 항목을 사람 말로 — 무엇이 얼마나 넘었는지까지 */
const REASON: Record<string, (over: number) => string> = {
  income: o => `합산소득이 연 2,000만 원을 ${won(o)}원 넘습니다`,
  biz: o => `사업소득이 허용치를 ${won(o)}원 넘습니다`,
  property: o => `재산세 과세표준이 5.4억 원을 ${won(o)}원 넘습니다`,
  propertyMid: () => '과세표준 3.6억~5.4억 구간인데 합산소득이 연 1,000만 원을 넘습니다',
};

export default function DependentPage() {
  const [income, setIncome] = useState('1000');
  const [biz, setBiz] = useState('0');
  const [registered, setRegistered] = useState(false);
  const [property, setProperty] = useState('20000');
  const [result, setResult] = useState<HidResult | null>(null);

  function calculate() {
    setResult(checkDependent({
      otherIncomeWon: (Number(income) || 0) * 10000,
      bizIncomeWon: (Number(biz) || 0) * 10000,
      bizRegistered: registered,
      propertyWon: (Number(property) || 0) * 10000,
    }));
  }

  const failed = result?.checks.filter(c => c.failed) ?? [];

  return (
    <CalcShell
      path="/calculator/health-insurance-dependent"
      title="건강보험 피부양자 자격 계산기"
      description="소득·재산·사업자등록으로 피부양자 자격을 유지할 수 있는지 확인합니다"
      intro={
        <>
          <h2>기준이 셋이고, 하나만 넘어도 탈락합니다</h2>
          <p>
            피부양자에서 빠졌다는 통보는 대개 갑자기 옵니다. 소득·재산·사업자등록 세 기준을
            각각 보는데 <strong>하나만 넘어도 자격이 없어지고</strong>, 세 기준의 단위가 서로
            달라(연 소득, 재산세 과세표준, 등록 여부) 머릿속으로 맞춰 보기 어렵기 때문입니다.
          </p>
          <h2>재산은 시가가 아니라 과세표준입니다</h2>
          <p>
            가장 많이 헷갈리는 자리입니다. 기준은 <strong>재산세 과세표준 5.4억 원</strong>이고,
            이는 공시가격의 대략 60%입니다. 시가 9억짜리 아파트라도 과세표준은 그보다 한참
            낮습니다. 재산세 고지서나 위택스에서 확인할 수 있습니다.
          </p>
          <h2>사업소득은 등록 여부로 문턱이 완전히 다릅니다</h2>
          <p>
            사업자등록이 <strong>있으면 사업소득 1원만 있어도</strong> 탈락합니다. 등록이 없으면
            연 500만 원까지 허용됩니다. 프리랜서가 사업자등록을 낸 순간 피부양자에서 빠지는
            일이 흔한 이유입니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="소득 (연간, 만원)" />
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>사업소득 외 합산소득</Label>
                <input type="number" value={income} onChange={e => setIncome(e.target.value)} min="0" className={inputCls} />
              </div>
              <div>
                <Label>사업소득</Label>
                <input type="number" value={biz} onChange={e => setBiz(e.target.value)} min="0" className={inputCls} />
              </div>
            </div>
            <p className="note">
              이자·배당·근로·연금·기타소득을 더한 값입니다. 금융소득은 연 1,000만 원을 넘을 때만 합산합니다.
            </p>
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input type="checkbox" checked={registered} onChange={e => setRegistered(e.target.checked)} className="h-4 w-4" />
              사업자등록이 있습니다
            </label>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="재산세 과세표준 (만원)" />
          <input type="number" value={property} onChange={e => setProperty(e.target.value)} min="0" className={inputCls} />
          <p className="note mt-3">
            공시가격이 아니라 <strong>과세표준</strong>입니다. 재산세 고지서나 위택스에서 확인하세요.
          </p>
        </Card>

        <PrimaryBtn onClick={calculate}>자격 확인</PrimaryBtn>

        {result && (
          <>
            <SummaryGrid>
              <SummaryCard
                label="피부양자 자격"
                value={result.eligible ? '유지됩니다' : '탈락합니다'}
                variant="primary"
              />
              <SummaryCard label="합산소득" value={`${won(Math.round(result.totalIncomeWon / 10000))}만원`} />
              <SummaryCard label="소득 기준" value={`${won(HID_LIMITS.incomeWon / 10000)}만원`} />
            </SummaryGrid>

            {failed.length > 0 && (
              <Card className="p-5">
                <CardHeader title="걸린 항목" />
                <div className="kv-table">
                  {failed.map(c => (
                    <div key={c.id} className="kv-row !block">
                      <span className="block text-sm text-slate-700 dark:text-slate-200">
                        {REASON[c.id](c.overWon)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="note mt-3">
                  탈락하면 지역가입자가 됩니다.{' '}
                  <Link href="/calculator/health-insurance-local" className="font-bold text-sec underline underline-offset-2">
                    지역가입자 보험료
                  </Link>
                  로 얼마가 될지 볼 수 있습니다.
                </p>
              </Card>
            )}

            <Card className="p-5">
              <CardHeader title="2026년 기준" />
              <div className="kv-table">
                <div className="kv-row"><span>합산소득</span><span className="tabular-nums font-bold">연 2,000만원 이하</span></div>
                <div className="kv-row"><span>사업소득 (등록 있음)</span><span className="tabular-nums font-bold">0원</span></div>
                <div className="kv-row"><span>사업소득 (등록 없음)</span><span className="tabular-nums font-bold">연 500만원 이하</span></div>
                <div className="kv-row"><span>재산세 과세표준</span><span className="tabular-nums font-bold">5.4억원 이하</span></div>
                <div className="kv-row"><span>과세표준 3.6~5.4억</span><span className="tabular-nums font-bold">소득 1,000만원 이하</span></div>
              </div>
              <p className="note mt-3">
                기준은 해마다 바뀔 수 있습니다. 실제 자격은 국민건강보험공단에서 확인하세요.
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
