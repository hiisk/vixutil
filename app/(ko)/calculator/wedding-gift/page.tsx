'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, SummaryGrid, SummaryCard } from '@/components/CalcShell';
import { CALC_FAQ } from '@/lib/calc-faq';

interface Relation {
  key: string;
  label: string;
  attend: { std: number; min: number; max: number };
  notAttend: number;
}

const RELATIONS: Relation[] = [
  { key: 'acquaintance', label: '그냥 아는 사이', attend: { std: 5, min: 3, max: 5 }, notAttend: 3 },
  { key: 'coworker', label: '직장 동료', attend: { std: 5, min: 5, max: 10 }, notAttend: 3 },
  { key: 'closeFriend', label: '친한 친구', attend: { std: 10, min: 10, max: 10 }, notAttend: 5 },
  { key: 'bestFriend', label: '베프·아주 친한 사이', attend: { std: 15, min: 10, max: 20 }, notAttend: 10 },
  { key: 'family', label: '가족·친척', attend: { std: 30, min: 20, max: 50 }, notAttend: 10 },
];

const LADDER = [3, 5, 7, 10, 15, 20, 30, 50, 100];

function bumpUp(v: number): number {
  const idx = LADDER.indexOf(v);
  if (idx === -1 || idx === LADDER.length - 1) return v;
  return LADDER[idx + 1];
}

export default function WeddingGiftPage() {
  const [relationKey, setRelationKey] = useState('closeFriend');
  const [attending, setAttending] = useState(true);
  const [venue, setVenue] = useState<'normal' | 'hotel'>('normal');

  const relation = RELATIONS.find(r => r.key === relationKey)!;

  const recommended = attending
    ? venue === 'hotel'
      ? bumpUp(relation.attend.std)
      : relation.attend.std
    : relation.notAttend;

  const rangeMin = attending ? relation.attend.min : relation.notAttend;
  const rangeMax = attending ? (venue === 'hotel' ? bumpUp(relation.attend.max) : relation.attend.max) : relation.notAttend;

  return (
    <CalcShell
      path="/calculator/wedding-gift"
            title="축의금 계산기"
      description="관계와 참석 여부에 따라 통상적인 축의금 금액대를 참고용으로 안내합니다"
      faq={CALC_FAQ['wedding-gift']}
      intro={
        <>
          <h2>정답은 없지만 통념은 있어요</h2>
          <p>
            축의금에 정해진 법칙은 없습니다. 다만 관계의 친밀도, 참석 여부, 예식장 급에 따라 통상적으로 오가는
            금액대의 경향은 있어서, 이 계산기는 그 <strong>일반적인 경향을 참고용</strong>으로 안내합니다.
          </p>
          <h2>홀수 금액 관행</h2>
          <p>
            전통적으로 3만·5만·7만원처럼 <strong>홀수 단위</strong>가 선호되지만, 10만원 이상 금액은 짝수여도
            무방하다는 인식이 일반적입니다. 다만 &apos;4&apos;가 들어가는 금액(4만원 등)은 피하는 것이 관례입니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">관계 및 상황</p>
          <div className="flex flex-col gap-4">
            <div>
              <Label>신랑·신부와의 관계</Label>
              <div className="flex flex-wrap gap-2">
                {RELATIONS.map(r => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setRelationKey(r.key)}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                      relationKey === r.key
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-300'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>결혼식 참석 여부</Label>
              <div className="flex gap-2">
                {[{ v: true, label: '참석' }, { v: false, label: '미참석 (계좌로만)' }].map(o => (
                  <button
                    key={String(o.v)}
                    type="button"
                    onClick={() => setAttending(o.v)}
                    className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                      attending === o.v
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-300'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {attending && (
              <div>
                <Label>예식장 급</Label>
                <div className="flex gap-2">
                  {[{ v: 'normal' as const, label: '일반 예식장' }, { v: 'hotel' as const, label: '호텔·고급 예식장' }].map(o => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => setVenue(o.v)}
                      className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                        venue === o.v
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-300'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        <SummaryGrid>
          <SummaryCard
            label="추천 축의금"
            value={`${recommended}만원`}
            sub={attending ? '참석 기준' : '미참석(계좌 송금) 기준'}
            variant="primary"
          />
          <SummaryCard
            label="참고 범위"
            value={`${rangeMin}~${rangeMax}만원`}
            sub="관계·상황에 따라 조정"
          />
        </SummaryGrid>

        <Card className="p-5 bg-slate-50 dark:bg-slate-950">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            💡 이 금액은 통상적인 경향을 참고용으로 안내하는 것으로, 지역·문화·개인 사정에 따라 크게 달라질 수
            있습니다. 특히 가족·친척 사이는 집안 관례를 따르는 경우가 많으니 참고만 해주세요.
          </p>
        </Card>
      </div>
    </CalcShell>
  );
}
