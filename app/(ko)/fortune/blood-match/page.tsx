'use client';
import ToolIcon from '@/components/ToolIcon';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import MatchResultCard from '@/components/MatchResultCard';
import { BLOOD_TYPES, calcBloodMatch, type BloodType } from '@/lib/blood-match';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

function TypeRow({
  label, value, onChange, accent,
}: { label: string; value: BloodType | null; onChange: (t: BloodType) => void; accent: string }) {
  return (
    <div>
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{label}</p>
      <div className="grid grid-cols-4 gap-2">
        {BLOOD_TYPES.map(t => {
          const on = value === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`rounded-2xl py-3 flex flex-col items-center justify-center transition-all border ${
                on ? `${accent} border-transparent text-white shadow-md scale-105`
                   : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-rose-300'
              }`}
            >
              <span className="text-xl leading-none">{t.emoji}</span>
              <span className={`text-xs font-black mt-1 ${on ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>{t.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function BloodMatchPage() {
  const [me, setMe] = useState<BloodType | null>(null);
  const [partner, setPartner] = useState<BloodType | null>(null);
  const [submitted, setSubmitted] = useState<[BloodType, BloodType] | null>(null);

  const result = useMemo(() => (submitted ? calcBloodMatch(submitted[0], submitted[1]) : null), [submitted]);
  const meT = submitted ? BLOOD_TYPES.find(t => t.id === submitted[0])! : null;
  const partnerT = submitted ? BLOOD_TYPES.find(t => t.id === submitted[1])! : null;

  function calculate() {
    if (!me || !partner) return;
    setSubmitted([me, partner]);
    setTimeout(() => document.getElementById('match-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="rose" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="page-back hover:text-rose-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">혈액형 궁합</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/fortune/blood-match" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="page-h1">🩸 혈액형 궁합</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">두 사람의 혈액형으로 보는 궁합</p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-4 flex flex-col gap-5">
          <TypeRow label="내 혈액형" value={me} onChange={setMe} accent="bg-gradient-to-br from-rose-500 to-red-600" />
          <TypeRow label="상대 혈액형" value={partner} onChange={setPartner} accent="bg-gradient-to-br from-orange-500 to-amber-600" />
          <button
            onClick={calculate}
            disabled={!me || !partner}
            className="w-full rounded-xl bg-sec disabled:from-slate-200 disabled:to-slate-200 dark:disabled:from-slate-800 dark:disabled:to-slate-800 disabled:text-slate-400 text-sm font-black py-3.5 transition-all active:scale-[0.99] shadow-md shadow-rose-200 disabled:shadow-none"
          >
            {!me || !partner ? '두 혈액형을 모두 골라주세요' : '궁합 보기 💘'}
          </button>
        </div>

        {result && meT && partnerT ? (
          <MatchResultCard
            a={{ emoji: meT.emoji, name: meT.name, sub: meT.trait }}
            b={{ emoji: partnerT.emoji, name: partnerT.name, sub: partnerT.trait }}
            result={{ score: result.score, label: result.label, emoji: result.emoji, headline: result.headline, reason: result.reason, loveComment: result.love, adviceComment: result.advice }}
            heroGradient="from-rose-500 via-red-500 to-orange-500"
            accentText="text-rose-500"
            shareTitle={`${meT.name} × ${partnerT.name} 궁합 ${result.score}점`}
            shareDescription={`${result.label} — ${result.headline}`}
          />
        ) : (
          <div className="text-center py-10 text-slate-300 dark:text-slate-600">
            <ToolIcon emoji="☝️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
            <p className="text-sm">두 사람의 혈액형을 골라 궁합을 확인해보세요</p>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-2">혈액형 궁합, 믿어도 되나요?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            아니요, <strong className="text-slate-800 dark:text-slate-100">과학적 근거는 없습니다</strong>.
            혈액형과 성격·궁합의 관련성은 여러 차례 검증됐지만 일관된 연관은 확인되지 않았어요.
            잘 맞는 것처럼 느껴지는 건 누구에게나 해당되는 모호한 설명을 자기 이야기로 받아들이는
            <strong className="text-slate-800 dark:text-slate-100"> 바넘 효과</strong> 때문입니다.
            이 궁합은 순전히 <strong className="text-slate-800 dark:text-slate-100">재미</strong>로만 봐주세요 —
            결과가 낮게 나와도 두 사람 사이는 혈액형이 아니라 서로를 대하는 마음이 정합니다.
          </p>
        </div>

        <Faq items={SECTION_FAQ['fortune/blood-match']} />
      </div>
      <SiteFooter />
    </div>
  );
}
