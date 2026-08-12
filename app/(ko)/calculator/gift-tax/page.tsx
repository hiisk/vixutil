'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';

import {
  MARRIAGE_BIRTH_DEDUCTION, RELATION_DEDUCTION, RELATION_LABEL, calcGiftTax,
  type GiftTaxResult, type Relation,
} from '@/lib/gift-tax';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function GiftTaxPage() {
  const [amount, setAmount] = useState('');
  const [relation, setRelation] = useState<Relation>('parent-adult');
  const [prior, setPrior] = useState('');
  const [marriageBirth, setMarriageBirth] = useState(false);
  const [result, setResult] = useState<GiftTaxResult | null>(null);

  function calculate() {
    const a = Number(amount);
    if (a <= 0) return;
    setResult(calcGiftTax({
      amount: a,
      relation,
      priorAmount: Number(prior || 0),
      marriageBirth,
      selfReport: true,
    }));
  }

  return (
    <CalcShell
      path="/calculator/gift-tax"
      title="증여세 간편 계산기"
      description="증여금액·관계 기준 예상 증여세 계산"
      intro={
        <>
          <h2>관계에 따라 공제액이 다릅니다</h2>
          <p>
            증여재산공제는 <strong>배우자 6억원</strong>, <strong>직계존속 → 성인 자녀 5,000만원</strong>,{' '}
            <strong>미성년 자녀 2,000만원</strong>, 기타 친족 1,000만원입니다. 타인에게 받으면 공제가 없습니다.
            공제액을 뺀 나머지에만 세금이 붙으므로, 같은 금액이라도 누가 주느냐에 따라 세액이 크게 달라집니다.
          </p>
          <h2>10년 안에 또 받으면 합쳐서 세율을 매깁니다</h2>
          <p>
            같은 사람에게서 <strong>10년 안에</strong> 받은 증여는 모두 합쳐 세액을 냅니다. 쪼개 받아
            낮은 세율을 여러 번 쓰는 것을 막기 위한 것입니다. 다만 합쳐서 낸 세액을 그대로 다 내는 것이
            아니라 <strong>먼저 낸 증여에 대한 세액을 공제</strong>합니다 — 그래서 한 번에 받은 사람과
            나눠 받은 사람의 세금 총액이 같아집니다. 사전증여 칸에 값을 넣으면 이 계산기가 그 공제까지
            함께 셈해 보여 줍니다.
          </p>
          <h2>혼인·출산 때는 공제가 더 있습니다</h2>
          <p>
            직계존속에게서 받을 때 혼인이나 자녀 출생을 전후한 일정 기간 안이면{' '}
            <strong>1억원까지 추가로 공제</strong>됩니다. 성인 자녀의 기본 공제 5,000만원과 합치면
            1억 5,000만원이 됩니다. 혼인과 출산을 합쳐 1억원 한도이므로 혼인으로 다 쓰면 출산으로 또
            받을 수는 없습니다. <strong>기간 요건과 대상 범위는 이 계산기가 판단하지 않습니다</strong> —
            해당되는지는 홈택스나 세무서에서 확인하세요.
          </p>
          <h2>세율</h2>
          <p>
            과세표준 <strong>1억원 이하 10%</strong>부터 시작해 5억·10억·30억 구간을 지나며{' '}
            <strong>30억 초과는 50%</strong>까지 올라가는 누진세율입니다. 상속세와 같은 세율표를 씁니다.
          </p>
          <h2>10년 단위로 합산합니다</h2>
          <p>
            공제는 <strong>10년 동안 합산</strong>해서 적용됩니다. 성인 자녀에게 5,000만원을 준 뒤 3년 만에
            또 주면 두 번째는 공제가 남아 있지 않습니다. 나눠서 주면 세금을 피할 수 있다는 이야기가 통하지
            않는 이유입니다. 10년이 지나면 공제가 되살아납니다.
          </p>
          <h2>간편 계산입니다</h2>
          <p>
            이 계산기는 증여금액과 관계만으로 <strong>대략의 세액</strong>을 냅니다. 실제로는 신고세액공제,
            증여재산의 평가 방법, 부담부증여(빚을 함께 넘기는 경우), 창업자금·가업승계 특례 등 세액을 바꾸는
            요소가 많습니다. 금액이 크다면 세무 상담을 받는 것이 확실합니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>증여금액 (원)</Label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                placeholder="예: 100,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>증여자와의 관계</Label>
              <select value={relation} onChange={e => setRelation(e.target.value as Relation)} className={inputCls}>
                {(Object.keys(RELATION_LABEL) as Relation[]).map(k => (
                  <option key={k} value={k}>{RELATION_LABEL[k]}</option>
                ))}
              </select>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                공제한도: {(RELATION_DEDUCTION[relation] / 100_000_000).toFixed(1)}억원 (10년 합산 기준)
              </p>
            </div>
            <div>
              <Label>10년 내 동일인 기증여 합산액 (원)</Label>
              <input type="number" value={prior} onChange={e => setPrior(e.target.value)}
                placeholder="0" className={inputCls} min="0" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                합산해 세액을 낸 뒤 먼저 낸 세액을 공제합니다 — 두 번 물지 않습니다.
              </p>
            </div>
            {(relation === 'parent-adult' || relation === 'parent-minor') && (
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={marriageBirth}
                  onChange={e => setMarriageBirth(e.target.checked)}
                  className="w-4 h-4 accent-blue-600" />
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  혼인·출산 공제 적용 (최대 {MARRIAGE_BIRTH_DEDUCTION / 100_000_000}억원)
                </span>
              </label>
            )}
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">예상 증여세</p>
              <p className="text-white text-3xl font-black">{fmt(result.tax)}원</p>
              <p className="text-blue-200 text-sm mt-1">자진신고 시 {fmt(result.payable)}원 (3% 공제)</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="공제금액" value={`${fmt(result.deduction)}원`} variant="green" />
              <SummaryCard label="과세표준" value={`${fmt(result.taxBase)}원`} />
              {result.priorTaxCredit > 0 && (
                <>
                  <SummaryCard label="합산 산출세액" value={`${fmt(result.grossTax)}원`} />
                  <SummaryCard label="기납부세액 공제" value={`−${fmt(result.priorTaxCredit)}원`} variant="green" />
                </>
              )}
              <SummaryCard label="신고세액공제 (3%)" value={`−${fmt(result.reportCredit)}원`} variant="green" />
              <SummaryCard label="실효세율" value={`${(result.effectiveRate * 100).toFixed(1)}%`} />
            </div>
            <Card className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                * 신고기한: 증여일이 속하는 달의 말일부터 3개월 이내<br />
                * 자진신고 시 세액의 3% 공제 적용<br />
                * 공제한도는 10년 단위로 초기화됩니다<br />
                * 사전증여가 있으면 합산해 세액을 낸 뒤 먼저 낸 세액을 공제합니다<br />
                * 혼인·출산 공제의 기간 요건(혼인신고일·출생일 전후 몇 년인가)과 대상 범위는
                이 계산기가 판단하지 않습니다 — 홈택스나 세무서에서 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
