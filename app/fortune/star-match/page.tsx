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
import { SIGNS, ELEMENT_LABEL, calcStarMatch } from '@/lib/star-match';

function SignPicker({
  label, value, onChange, accent,
}: { label: string; value: number | null; onChange: (i: number) => void; accent: string }) {
  return (
    <div>
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{label}</p>
      <div className="grid grid-cols-6 gap-1.5">
        {SIGNS.map((s, i) => {
          const on = value === i;
          return (
            <button
              key={s.id}
              onClick={() => onChange(i)}
              title={`${s.name} (${s.period})`}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all border ${
                on
                  ? `${accent} border-transparent text-white shadow-md scale-105`
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-violet-300'
              }`}
            >
              <span className="text-lg leading-none">{s.emoji}</span>
              <span className={`text-[8px] font-bold mt-0.5 ${on ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                {s.name.replace('자리', '')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScoreGauge({ score }: { score: number }) {
  return (
    <div className="relative w-full h-3 rounded-full bg-white/30 dark:bg-slate-900/30 overflow-hidden">
      <div className="absolute inset-y-0 left-0 rounded-full bg-white/90 dark:bg-white/80 transition-all duration-700" style={{ width: `${score}%` }} />
    </div>
  );
}

export default function StarMatchPage() {
  const [me, setMe] = useState<number | null>(null);
  const [partner, setPartner] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<[number, number] | null>(null);

  const result = useMemo(() => (submitted ? calcStarMatch(submitted[0], submitted[1]) : null), [submitted]);
  const meSign = submitted ? SIGNS[submitted[0]] : null;
  const partnerSign = submitted ? SIGNS[submitted[1]] : null;

  function calculate() {
    if (me === null || partner === null) return;
    setSubmitted([me, partner]);
    setTimeout(() => document.getElementById('star-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">별자리 궁합</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">⭐ 별자리 궁합</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">두 사람의 별자리로 보는 원소 궁합</p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-4 flex flex-col gap-5">
          <SignPicker label="내 별자리" value={me} onChange={setMe} accent="bg-gradient-to-br from-violet-500 to-purple-600" />
          <SignPicker label="상대 별자리" value={partner} onChange={setPartner} accent="bg-gradient-to-br from-fuchsia-500 to-pink-600" />
          <button
            onClick={calculate}
            disabled={me === null || partner === null}
            className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 disabled:from-slate-200 disabled:to-slate-200 dark:disabled:from-slate-800 dark:disabled:to-slate-800 disabled:text-slate-400 text-white text-sm font-black py-3.5 transition-all active:scale-[0.99] shadow-md shadow-violet-200 disabled:shadow-none"
          >
            {me === null || partner === null ? '두 별자리를 모두 골라주세요' : '궁합 보기 ✨'}
          </button>
        </div>

        {result && meSign && partnerSign && (
          <div id="star-result" className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-6 text-white text-center shadow-lg">
              <span className="absolute -top-6 -right-4 text-[110px] opacity-15 select-none">{result.info.emoji}</span>
              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl">{meSign.emoji}</span>
                    <span className="text-[11px] font-bold mt-1">{meSign.name}</span>
                    <span className="text-[9px] opacity-80">{ELEMENT_LABEL[meSign.element].emoji} {ELEMENT_LABEL[meSign.element].label}</span>
                  </div>
                  <ToolIcon emoji="💗" className="w-7 h-7 opacity-80 text-slate-800 dark:text-slate-100" />
                  <div className="flex flex-col items-center">
                    <span className="text-4xl">{partnerSign.emoji}</span>
                    <span className="text-[11px] font-bold mt-1">{partnerSign.name}</span>
                    <span className="text-[9px] opacity-80">{ELEMENT_LABEL[partnerSign.element].emoji} {ELEMENT_LABEL[partnerSign.element].label}</span>
                  </div>
                </div>
                <p className="text-6xl font-black leading-none tracking-tight">{result.score}<span className="text-2xl">점</span></p>
                <div className="mt-4 max-w-[220px] mx-auto"><ScoreGauge score={result.score} /></div>
                <p className="text-base font-black mt-4">{result.info.emoji} {result.info.label}</p>
                <p className="text-sm text-white/90 mt-1">{result.info.headline}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
              <p className="text-xs font-black text-violet-500 uppercase tracking-wide mb-2">왜 이렇게 나왔나요?</p>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.reason}</p>
            </div>

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
              title={`${meSign.name} × ${partnerSign.name} 궁합 ${result.score}점`}
              description={`${result.info.label} — ${result.info.headline}`}
              type="fortune"
            />

            <ReferralCards placement="result" />
          </div>
        )}

        {!result && (
          <div className="text-center py-10 text-slate-300 dark:text-slate-600">
            <ToolIcon emoji="☝️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
            <p className="text-sm">두 사람의 별자리를 골라 궁합을 확인해보세요</p>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-2">별자리 궁합은 어떻게 정해지나요?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            점성술에서 12별자리는 각각 <strong className="text-slate-800 dark:text-slate-100">불·흙·바람·물</strong> 네 원소 중
            하나에 속합니다. 같은 원소끼리는 잘 통하고, <strong className="text-slate-800 dark:text-slate-100">불↔바람·흙↔물</strong>은
            서로를 북돋는 보완 관계, <strong className="text-slate-800 dark:text-slate-100">불↔물·흙↔바람</strong>은 성질이 어긋나
            노력이 필요한 관계로 봅니다. 이 계산기는 그 통설을 그대로 따릅니다.
            다만 이것은 <strong className="text-slate-800 dark:text-slate-100">오락·참고용</strong>이에요 — 궁합이 낮게 나와도
            두 사람의 관계를 정하는 건 별자리가 아니라 서로를 대하는 마음입니다.
          </p>
        </div>

        <Faq items={SECTION_FAQ['fortune/star-match']} />
      </div>
      <SiteFooter />
    </div>
  );
}
