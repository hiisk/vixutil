'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';

type Relation = 'spouse' | 'parent-adult' | 'parent-minor' | 'child' | 'other-kin' | 'other';

const DEDUCTION: Record<Relation, number> = {
  'spouse': 600_000_000,
  'parent-adult': 50_000_000,
  'parent-minor': 20_000_000,
  'child': 50_000_000,
  'other-kin': 10_000_000,
  'other': 0,
};

const RELATION_LABEL: Record<Relation, string> = {
  'spouse': '배우자',
  'parent-adult': '직계존속 → 성인 자녀',
  'parent-minor': '직계존속 → 미성년 자녀',
  'child': '직계비속 → 부모',
  'other-kin': '기타 친족 (6촌 이내 혈족 등)',
  'other': '타인',
};

const GIFT_BRACKETS = [
  { limit: 100_000_000, rate: 0.1, deduct: 0 },
  { limit: 500_000_000, rate: 0.2, deduct: 10_000_000 },
  { limit: 1_000_000_000, rate: 0.3, deduct: 60_000_000 },
  { limit: 3_000_000_000, rate: 0.4, deduct: 160_000_000 },
  { limit: Infinity, rate: 0.5, deduct: 460_000_000 },
];

function calcGiftTax(base: number) {
  if (base <= 0) return 0;
  const b = GIFT_BRACKETS.find(br => base <= br.limit)!;
  return base * b.rate - b.deduct;
}

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function GiftTaxPage() {
  const [amount, setAmount] = useState('');
  const [relation, setRelation] = useState<Relation>('parent-adult');
  const [prior, setPrior] = useState('');
  const [result, setResult] = useState<null | {
    deduction: number; taxBase: number; tax: number; selfReport: number;
  }>(null);

  function calculate() {
    const a = Number(amount);
    if (a <= 0) return;
    const priorAmount = Number(prior || 0);
    const totalGift = a + priorAmount;
    const deduction = DEDUCTION[relation];
    const taxBase = Math.max(0, totalGift - deduction);
    const tax = calcGiftTax(taxBase);
    const selfReport = tax * 0.97;
    setResult({ deduction, taxBase, tax, selfReport });
  }

  return (
    <CalcShell path="/calculator/gift-tax" title="증여세 간편 계산기" description="증여금액·관계 기준 예상 증여세 계산">
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
                공제한도: {(DEDUCTION[relation] / 100_000_000).toFixed(1)}억원 (10년 합산 기준)
              </p>
            </div>
            <div>
              <Label>10년 내 동일인 기증여 합산액 (원)</Label>
              <input type="number" value={prior} onChange={e => setPrior(e.target.value)}
                placeholder="0" className={inputCls} min="0" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">예상 증여세</p>
              <p className="text-white text-3xl font-black">{fmt(result.tax)}원</p>
              <p className="text-blue-200 text-sm mt-1">자진신고 시 {fmt(result.selfReport)}원 (3% 공제)</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="공제금액" value={`${fmt(result.deduction)}원`} variant="green" />
              <SummaryCard label="과세표준" value={`${fmt(result.taxBase)}원`} />
            </div>
            <Card className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                * 신고기한: 증여일이 속하는 달의 말일부터 3개월 이내<br />
                * 자진신고 시 세액의 3% 공제 적용<br />
                * 공제한도는 10년 단위로 초기화됩니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
