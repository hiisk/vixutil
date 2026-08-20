'use client';
import ToolIcon from '@/components/ToolIcon';
import Ad from '@/components/Ad';
import RelatedContent from '@/components/RelatedContent';
import { FORTUNE_RELATED } from '@/lib/fortune-related';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import MatchResultCard from '@/components/MatchResultCard';
import { MBTI_TYPES, calcMbtiMatch, type MbtiType } from '@/lib/mbti-match';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

function MbtiPicker({
  label, value, onChange, accent,
}: { label: string; value: MbtiType | null; onChange: (t: MbtiType) => void; accent: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{label}</p>
      <div className="grid grid-cols-4 gap-1.5">
        {MBTI_TYPES.map(t => {
          const on = value === t;
          return (
            <button
              key={t}
              onClick={() => onChange(t)}
              className={`rounded-lg py-2 text-xs font-bold transition-all border ${
                on ? `${accent} border-transparent text-white shadow-sm scale-105`
                   : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
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
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="page-back hover:text-violet-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">MBTI 궁합</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/fortune/mbti-match" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="hero-band max-w-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="page-h1">MBTI 궁합</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">두 사람의 MBTI로 보는 궁합</p>
        </div>

        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-4 flex flex-col gap-5">
          <MbtiPicker label="내 MBTI" value={me} onChange={setMe} accent="bg-sec" />
          <MbtiPicker label="상대 MBTI" value={partner} onChange={setPartner} accent="bg-sec" />
          <button
            onClick={calculate}
            disabled={!me || !partner}
            className="w-full rounded-xl bg-sec disabled:from-slate-200 disabled:to-slate-200 dark:disabled:from-slate-800 dark:disabled:to-slate-800 disabled:text-slate-500 dark:text-slate-400 text-sm font-bold py-3.5 transition-all active:scale-[0.99] shadow-sm shadow-violet-200 disabled:shadow-none"
          >
            {!me || !partner ? '두 MBTI를 모두 골라주세요' : '궁합 보기 ✨'}
          </button>
        </div>
        {/*
          광고는 «누른 직후»에 둔다. 푸터에 두었더니 낱장에서 스크롤 깊이
          68~76%였다 — 서너 화면 아래라 대부분 못 본다. 입력 카드 바로 밑이면
          첫 화면에서 보이고, 결과는 그 아래에 나오면서 스크롤이 결과로
          옮겨가니 도구를 가리지도 않는다.
        */}

        <Ad />

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
          <div className="py-10 text-slate-500 dark:text-slate-400">
            <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="☝️" className="h-6 w-6" /></span>
            <p className="text-sm">두 사람의 MBTI를 골라 궁합을 확인해보세요</p>
          </div>
        )}

        <div className="mt-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">MBTI 궁합은 어떻게 정해지나요?</h2>
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
      <RelatedContent items={FORTUNE_RELATED} currentSlug="mbti-match" basePath="/fortune" accent="violet" bg="" />
      <SiteFooter referral={false} />
    </div>
  );
}
