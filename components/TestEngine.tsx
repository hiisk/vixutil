'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Test } from '@/lib/types';
import ShareButton from './ShareButton';
import PageGlow from './PageGlow';
import ReferralCards from './ReferralCards';
import { thumbGradient } from '@/lib/thumbnail';

const DEFAULT_GRADIENT = 'from-violet-500 to-pink-600';

function getMbtiType(scores: Record<string, number>): string {
  const e = (scores.EI ?? 0) >= 8 ? 'E' : 'I';
  const s = (scores.SN ?? 0) >= 8 ? 'S' : 'N';
  const t = (scores.TF ?? 0) >= 8 ? 'T' : 'F';
  const j = (scores.JP ?? 0) >= 8 ? 'J' : 'P';
  return e + s + t + j;
}

export default function TestEngine({ test }: { test: Test }) {
  const [phase, setPhase] = useState<'start' | 'question' | 'result'>('start');
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [axisScores, setAxisScores] = useState<Record<string, number>>({});

  const isMbti = test.type === 'mbti';

  function pick(score: number) {
    const q = test.questions[current];
    if (isMbti && q.axis) {
      setAxisScores(prev => ({ ...prev, [q.axis!]: (prev[q.axis!] ?? 0) + score }));
    }
    const next = total + score;
    if (current + 1 >= test.questions.length) {
      setTotal(next);
      setPhase('result');
    } else {
      setTotal(next);
      setCurrent(c => c + 1);
    }
  }

  function restart() { setPhase('start'); setCurrent(0); setTotal(0); setAxisScores({}); }

  const mbtiType = isMbti ? getMbtiType(axisScores) : null;
  const result = isMbti
    ? (test.results.find(r => r.mbtiType === mbtiType) ?? test.results[0])
    : (test.results.find(r => total >= r.min && total <= r.max) ?? test.results[test.results.length - 1]);
  const progress = Math.round((current / test.questions.length) * 100);
  const grad = result?.color ?? DEFAULT_GRADIENT;

  /* ── START ── */
  if (phase === 'start') return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-500 to-pink-500" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-2">
          <Link href="/test" className="text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            전체 테스트
          </Link>
        </div>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-lg mx-auto w-full text-center">
        {/*
          목록 카드와 같은 그라데이션·이모지를 크게 다시 보여준다. 들어오자마자
          텍스트만 있으면 허전하고, 어떤 카드를 눌렀는지도 이어지지 않는다.
        */}
        <div className={`w-32 h-32 rounded-3xl mb-6 flex items-center justify-center bg-gradient-to-br ${thumbGradient(test.slug, 'test')} shadow-xl shadow-violet-500/20`}>
          <span className="text-6xl drop-shadow-md" aria-hidden="true">{test.icon}</span>
        </div>
        <span className="text-xs font-bold text-violet-500 bg-violet-50 dark:bg-violet-950/30 px-3 py-1 rounded-full mb-3">{test.category}</span>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-3">{test.title}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">{test.desc}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-8">{test.questions.length}문항 · 약 2분 소요</p>
        <button onClick={() => setPhase('question')}
          className="w-full max-w-xs bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 active:scale-[0.99] text-white font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-violet-500/25">
          테스트 시작하기 →
        </button>
      </div>
    </div>
  );

  /* ── QUESTION ── */
  if (phase === 'question') {
    const q = test.questions[current];
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
        <div className="h-1.5 bg-violet-100 dark:bg-violet-950/40">
          <div className="h-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
            <span className="text-sm font-bold text-violet-600 truncate mr-2">{test.title}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">{current + 1} / {test.questions.length}</span>
          </div>
        </header>
        <div className="flex-1 px-4 py-10 max-w-lg mx-auto w-full">
          <p className="text-xs font-bold text-violet-400 mb-4">Q{current + 1}</p>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-8 leading-relaxed whitespace-pre-line">{q.q}</h2>
          <div className="flex flex-col gap-3">
            {q.opts.map((opt, i) => (
              <button key={i} onClick={() => pick(opt.score)}
                className="w-full text-left bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-700 active:scale-[0.99] transition-all">
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── RESULT ── */
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <div className="h-1 bg-gradient-to-r from-violet-500 to-pink-500" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <button onClick={restart} className="text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            다시하기
          </button>
        </div>
      </header>
      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        {/* Result hero card */}
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${grad} p-8 text-white text-center mb-6 shadow-lg`}>
          {/* decorative bg emoji */}
          <span className="absolute -top-4 -right-4 text-[100px] opacity-10 select-none">{result.emoji}</span>
          <span className="absolute -bottom-4 -left-4 text-[80px] opacity-10 select-none">{result.emoji}</span>
          {/* main emoji */}
          <div className="text-7xl mb-4 filter drop-shadow-lg relative z-10">{result.emoji}</div>
          <span className="relative z-10 text-xs font-bold bg-white/20 dark:bg-slate-900/20 px-3 py-1 rounded-full">{test.category} 테스트 결과</span>
          {mbtiType && (
            <p className="relative z-10 text-4xl font-black mt-4 tracking-widest">{mbtiType}</p>
          )}
          <h2 className="relative z-10 text-2xl font-black mt-2 mb-3">{result.title}</h2>
          <p className="relative z-10 text-sm leading-relaxed text-white/90">{result.desc}</p>
        </div>

        {/* Traits */}
        {result.traits && result.traits.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 mb-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">주요 특징</p>
            <div className="flex flex-wrap gap-2">
              {result.traits.map((t, i) => (
                <span key={i} className="text-xs font-semibold px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-slate-200">
                  ✦ {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <ShareButton
          title={`${test.title} 결과: ${mbtiType ? `${mbtiType} ` : ''}${result.emoji} ${result.title}`}
          description={`${mbtiType ? `나의 MBTI는 ${mbtiType}!\n` : ''}${result.title}\n\n${result.desc}`}
          type="test"
        />

        {/*
          결과 화면은 사용자가 직접 버튼을 눌러 도달한, 시선이 가장 오래 머무는
          자리다. 공유 버튼 다음·다음 행동 버튼 앞에 둔다 — 결과를 다 읽고 나서
          자연스럽게 눈에 들어오되, 결과 자체를 가리지는 않는 위치다.
        */}
        <ReferralCards placement="result" />

        <div className="mt-6 flex flex-col gap-3">
          <button onClick={restart}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3.5 font-bold text-sm transition-colors">
            다시 테스트하기
          </button>
          <Link href="/test"
            className="w-full block text-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl py-3.5 font-bold text-sm transition-colors">
            다른 테스트 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
