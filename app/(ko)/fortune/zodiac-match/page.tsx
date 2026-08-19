'use client';
import ToolIcon from '@/components/ToolIcon';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ShareButton from '@/components/ShareButton';
import ReferralCards from '@/components/ReferralCards';
import { ANIMALS } from '@/lib/fortune-data';
import { calcZodiacMatch } from '@/lib/zodiac-match';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

/** 선택된 두 띠를 두 줄로 배치한 이모지 그리드에서 고른다. */
function AnimalPicker({
  label, value, onChange, accent,
}: { label: string; value: number | null; onChange: (i: number) => void; accent: string }) {
  return (
    <div>
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{label}</p>
      <div className="grid grid-cols-6 gap-1.5">
        {ANIMALS.map((a, i) => {
          const on = value === i;
          return (
            <button
              key={a.id}
              onClick={() => onChange(i)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all border ${
                on
                  ? `${accent} border-transparent text-white shadow-md scale-105`
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-rose-300'
              }`}
            >
              <span className="text-lg leading-none">{a.emoji}</span>
              <span className={`text-[9px] font-bold mt-0.5 ${on ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                {a.name.replace('띠', '')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** 점수를 채우는 하트 게이지 */
function HeartGauge({ score }: { score: number }) {
  return (
    <div className="relative w-full h-3 rounded-full bg-white/30 dark:bg-slate-900/30 overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-white/90 dark:bg-white/80 transition-all duration-700"
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export default function ZodiacMatchPage() {
  const [me, setMe] = useState<number | null>(null);
  const [partner, setPartner] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<[number, number] | null>(null);

  const result = useMemo(
    () => (submitted ? calcZodiacMatch(submitted[0], submitted[1]) : null),
    [submitted],
  );
  const meAnimal = submitted ? ANIMALS[submitted[0]] : null;
  const partnerAnimal = submitted ? ANIMALS[submitted[1]] : null;

  function calculate() {
    if (me === null || partner === null) return;
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">띠 궁합</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/fortune/zodiac-match" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">🐲 띠 궁합</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">두 사람의 띠로 보는 전통 궁합</p>
        </div>

        {/* 입력 */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-4 flex flex-col gap-5">
          <AnimalPicker label="내 띠" value={me} onChange={setMe} accent="bg-gradient-to-br from-rose-500 to-pink-600" />
          <AnimalPicker label="상대 띠" value={partner} onChange={setPartner} accent="bg-gradient-to-br from-violet-500 to-purple-600" />
          <button
            onClick={calculate}
            disabled={me === null || partner === null}
            className="w-full rounded-xl bg-sec disabled:from-slate-200 disabled:to-slate-200 dark:disabled:from-slate-800 dark:disabled:to-slate-800 disabled:text-slate-400 text-sm font-black py-3.5 transition-all active:scale-[0.99] shadow-md shadow-rose-200 disabled:shadow-none"
          >
            {me === null || partner === null ? '두 띠를 모두 골라주세요' : '궁합 보기 💘'}
          </button>
        </div>

        {result && meAnimal && partnerAnimal && (
          <div id="match-result" className="space-y-4">
            {/* 결과 히어로 */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 p-6 text-white text-center shadow-lg">
              <span className="absolute -top-6 -right-4 text-[110px] opacity-15 select-none">{result.info.emoji}</span>
              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl">{meAnimal.emoji}</span>
                    <span className="text-[11px] font-bold mt-1">{meAnimal.name}</span>
                  </div>
                  <ToolIcon emoji="💗" className="w-7 h-7 opacity-80 text-slate-800 dark:text-slate-100" />
                  <div className="flex flex-col items-center">
                    <span className="text-4xl">{partnerAnimal.emoji}</span>
                    <span className="text-[11px] font-bold mt-1">{partnerAnimal.name}</span>
                  </div>
                </div>
                <p className="text-6xl font-black leading-none tracking-tight">{result.score}<span className="text-2xl">점</span></p>
                <div className="mt-4 max-w-[220px] mx-auto"><HeartGauge score={result.score} /></div>
                <p className="text-base font-black mt-4">{result.info.emoji} {result.info.label}</p>
                <p className="text-sm text-white/90 mt-1">{result.info.headline}</p>
              </div>
            </div>

            {/* 관계 원리 */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
              <p className="text-xs font-black text-rose-500 uppercase tracking-wide mb-2">왜 이렇게 나왔나요?</p>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.reason}</p>
            </div>

            {/* 연애·조언 */}
            <div className="grid gap-3">
              <div className="rounded-2xl border border-rose-100 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/20 p-5">
                <p className="text-xs font-black text-rose-600 dark:text-rose-400 mb-1.5">💕 연애 궁합</p>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.loveComment}</p>
              </div>
              <div className="rounded-2xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20 p-5">
                <p className="text-xs font-black text-amber-600 dark:text-amber-400 mb-1.5">💡 관계 조언</p>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.adviceComment}</p>
              </div>
            </div>

            <ShareButton
              title={`${meAnimal.name} × ${partnerAnimal.name} 궁합 ${result.score}점`}
              description={`${result.info.label} — ${result.info.headline}`}
              type="fortune"
            />

            <ReferralCards placement="result" />
          </div>
        )}

        {!result && (
          <div className="text-center py-10 text-slate-300 dark:text-slate-600">
            <ToolIcon emoji="☝️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
            <p className="text-sm">두 사람의 띠를 골라 궁합을 확인해보세요</p>
          </div>
        )}

        {/* 설명 */}
        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-2">띠 궁합은 어떻게 정해지나요?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            십이지(띠)에는 예로부터 잘 어울리는 관계와 부딪치기 쉬운 관계가 정해져 있습니다.
            짝을 이루는 <strong className="text-slate-800 dark:text-slate-100">육합</strong>, 셋이 무리 짓는{' '}
            <strong className="text-slate-800 dark:text-slate-100">삼합</strong>은 좋은 궁합으로, 정반대에 놓인{' '}
            <strong className="text-slate-800 dark:text-slate-100">충</strong>은 노력이 필요한 궁합으로 봅니다.
            이 계산기는 그 전통 상성을 그대로 따릅니다.
            다만 이것은 <strong className="text-slate-800 dark:text-slate-100">오락·참고용</strong>이에요.
            궁합이 낮게 나와도 걱정하지 마세요 — 두 사람의 관계를 결정하는 건 태어난 해가 아니라
            서로를 대하는 마음이니까요.
          </p>
        </div>

        <Faq items={SECTION_FAQ['fortune/zodiac-match']} />
      </div>
      <SiteFooter referral={false} />
    </div>
  );
}
