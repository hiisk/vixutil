'use client';
import ToolIcon from '@/components/ToolIcon';
import Ad from '@/components/Ad';
import RelatedContent from '@/components/RelatedContent';
import { FORTUNE_RELATED } from '@/lib/fortune-related';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { MBTI_TYPES } from '@/lib/fortune-data';
import FortuneDisplay from '@/components/FortuneDisplay';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

const GROUPS = [
  { label: '분석가형', color: 'bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-900/50', types: ['INTJ','INTP','ENTJ','ENTP'] },
  { label: '외교관형', color: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50', types: ['INFJ','INFP','ENFJ','ENFP'] },
  { label: '수호자형', color: 'bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-900/50', types: ['ISTJ','ISFJ','ESTJ','ESFJ'] },
  { label: '탐험가형', color: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50', types: ['ISTP','ISFP','ESTP','ESFP'] },
];

export default function MbtiPage() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    // 공유 링크(?id=)로 들어온 경우 선택 상태를 복원한다. URL은 프리렌더 시점에
    // 알 수 없으므로 마운트 후에 읽을 수밖에 없다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (id && MBTI_TYPES.some(t => t.id === id)) setSelected(id);
  }, []);

  function handleSelect(id: string) {
    setSelected(id);
    window.history.replaceState(null, '', `?id=${id}`);
  }

  const type = MBTI_TYPES.find(t => t.id === selected);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="page-back hover:text-sky-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex-1 truncate">
            {type ? `${type.id} 운세` : 'MBTI 운세'}
          </span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/fortune/mbti" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="hero-band max-w-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="page-h1">MBTI 오늘의 운세</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">내 MBTI 유형을 선택하세요</p>
        </div>

        <div className="space-y-3 mb-6">
          {GROUPS.map(g => (
            <div key={g.label}>
              <p className={`text-xs font-bold mb-2 px-2.5 py-1 rounded-full border inline-block ${g.color}`}>{g.label}</p>
              <div className="grid grid-cols-4 gap-2">
                {g.types.map(id => {
                  const t = MBTI_TYPES.find(x => x.id === id)!;
                  return (
                    <button
                      key={id}
                      onClick={() => handleSelect(id)}
                      className={`rounded-xl p-2.5 text-center transition-all border ${
                        selected === id
                          ? 'bg-sky-600 border-sky-600 text-white shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="text-lg mb-0.5">{t.emoji}</div>
                      <p className={`text-xs font-bold ${selected === id ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>{id}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/*

          고르개 바로 아래가 광고 자리다. 결과 블록 «안»에 두면 고르기 전에

          광고가 아예 없고, FortuneDisplay 안쪽 것과 겹치면 고른 뒤 둘이 된다.

          안쪽은 showReferral={false}로 끄고 여기 하나만 둔다.

        */}

        <Ad />

        {type ? (
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
              <span className="font-semibold text-slate-700 dark:text-slate-200">{type.nickname}</span>
              <span className="text-slate-500 dark:text-slate-400">·</span>
              <span>{type.trait}</span>
            </div>
            <FortuneDisplay
              showReferral={false}
              subjectId={`mbti-${type.id}`}
              subjectName={type.name}
              subjectEmoji={type.emoji}
              badge={type.nickname}
            />
            {/* 오늘 운세만 보고 나가는 사람이 많다 — 그 유형의 «특징»으로 가는 길을 둔다 */}
            <Link
              href={`/fortune/mbti/${type.id.toLowerCase()}`}
              className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-sec px-4 py-3.5 active:scale-[0.99] transition-transform"
            >
              <span className="min-w-0">
                <span className="block text-[11px] font-medium text-white/75">인지기능 · 강점과 약점 · 궁합</span>
                <span className="block text-sm font-bold text-white">{type.id} 특징 자세히 보기</span>
              </span>
              <svg className="h-4 w-4 shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="py-12 text-slate-500 dark:text-slate-400">
            <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="☝️" className="h-6 w-6" /></span>
            <p className="text-sm">MBTI 유형을 선택하면 오늘의 운세를 볼 수 있습니다</p>
          </div>
        )}

        {/* 유형 낱장 열여섯 — 「INFP 특징」으로 들어오는 사람이 닿는 자리다 */}
        <section className="mt-8">
          <p className="label-caps mb-3">유형별 특징</p>
          <div className="grid grid-cols-4 gap-2">
            {MBTI_TYPES.map(t => (
              <Link key={t.id} prefetch={false} href={`/fortune/mbti/${t.id.toLowerCase()}`}
                className="group rounded-xl border chip-off px-2 py-2.5 text-center hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-sec transition-colors">{t.id}</span>
              </Link>
            ))}
          </div>
        </section>

        <Faq items={SECTION_FAQ['fortune/mbti']} />
      </div>
      <RelatedContent items={FORTUNE_RELATED} currentSlug="mbti" basePath="/fortune" accent="violet" bg="" />
      <SiteFooter referral={false} />
    </div>
  );
}
