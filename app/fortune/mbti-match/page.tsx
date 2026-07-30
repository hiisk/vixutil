'use client';
import ToolIcon from '@/components/ToolIcon';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import MatchResultCard from '@/components/MatchResultCard';
import { MBTI_TYPES, calcMbtiMatch, type MbtiType } from '@/lib/mbti-match';

function MbtiPicker({
  label, value, onChange, accent,
}: { label: string; value: MbtiType | null; onChange: (t: MbtiType) => void; accent: string }) {
  return (
    <div>
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{label}</p>
      <div className="grid grid-cols-4 gap-1.5">
        {MBTI_TYPES.map(t => {
          const on = value === t;
          return (
            <button
              key={t}
              onClick={() => onChange(t)}
              className={`rounded-lg py-2 text-xs font-black transition-all border ${
                on ? `${accent} border-transparent text-white shadow-md scale-105`
                   : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-violet-300'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function MbtiMatchPage() {
  const [me, setMe] = useState<MbtiType | null>(null);
  const [partner, setPartner] = useState<MbtiType | null>(null);
  const [submitted, setSubmitted] = useState<[MbtiType, MbtiType] | null>(null);

  const result = useMemo(() => (submitted ? calcMbtiMatch(submitted[0], submitted[1]) : null), [submitted]);

  function calculate() {
    if (!me || !partner) return;
    setSubmitted([me, partner]);
    setTimeout(() => document.getElementById('match-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-500" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">MBTI 궁합</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">🧠 MBTI 궁합</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">두 사람의 MBTI로 보는 궁합</p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-4 flex flex-col gap-5">
          <MbtiPicker label="내 MBTI" value={me} onChange={setMe} accent="bg-gradient-to-br from-violet-500 to-indigo-600" />
          <MbtiPicker label="상대 MBTI" value={partner} onChange={setPartner} accent="bg-gradient-to-br from-sky-500 to-blue-600" />
          <button
            onClick={calculate}
            disabled={!me || !partner}
            className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 disabled:from-slate-200 disabled:to-slate-200 dark:disabled:from-slate-800 dark:disabled:to-slate-800 disabled:text-slate-400 text-white text-sm font-black py-3.5 transition-all active:scale-[0.99] shadow-md shadow-violet-200 disabled:shadow-none"
          >
            {!me || !partner ? '두 MBTI를 모두 골라주세요' : '궁합 보기 ✨'}
          </button>
        </div>

        {result && submitted ? (
          <MatchResultCard
            a={{ emoji: '🧠', name: submitted[0] }}
            b={{ emoji: '💭', name: submitted[1] }}
            result={{ score: result.score, label: result.info.label, emoji: result.info.emoji, headline: result.info.headline, reason: result.reason, loveComment: result.loveComment, adviceComment: result.adviceComment }}
            heroGradient="from-violet-500 via-indigo-500 to-sky-500"
            accentText="text-violet-500"
            shareTitle={`${submitted[0]} × ${submitted[1]} 궁합 ${result.score}점`}
            shareDescription={`${result.info.label} — ${result.info.headline}`}
          />
        ) : (
          <div className="text-center py-10 text-slate-300 dark:text-slate-600">
            <ToolIcon emoji="☝️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
            <p className="text-sm">두 사람의 MBTI를 골라 궁합을 확인해보세요</p>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-2">MBTI 궁합은 어떻게 정해지나요?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            공식 기준은 없지만, 널리 통용되는 통념을 규칙으로 옮겼어요. 세상을 보는 방식(N/S)과
            판단하는 방식(T/F)이 <strong className="text-slate-800 dark:text-slate-100">같으면 대화가 잘 통하고</strong>,
            에너지 방향(E/I)과 생활 방식(J/P)은 <strong className="text-slate-800 dark:text-slate-100">다를 때 서로를 보완</strong>한다는
            원리입니다. 그래서 어느 축이 맞고 어긋나는지에 따라 점수가 나와요.
            다만 이것은 <strong className="text-slate-800 dark:text-slate-100">오락·참고용</strong>이에요 —
            궁합이 낮아도 두 사람 사이는 유형이 아니라 서로를 대하는 마음이 정합니다.
          </p>
        </div>

        <Faq items={SECTION_FAQ['fortune/mbti-match']} />
      </div>
      <SiteFooter />
    </div>
  );
}
