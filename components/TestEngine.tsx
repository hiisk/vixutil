'use client';
import ToolIcon from '@/components/ToolIcon';
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


export type TestLang = 'ko' | 'en' | 'zh';

/** 사용자에게 보이는 문구만 언어별로 갈라둔다. 채점 로직은 세 언어가 동일하다. */
const UI: Record<TestLang, {
  allTests: string; start: string; restart: string; retake: string; more: string;
  traits: string; resultOf: (cat: string) => string; meta: (n: number) => string;
  myMbti: (t: string) => string;
}> = {
  ko: {
    allTests: '전체 테스트', start: '테스트 시작하기 →', restart: '다시하기',
    retake: '다시 테스트하기', more: '다른 테스트 보기', traits: '{ui.traits}',
    resultOf: cat => `${cat} 테스트 결과`,
    meta: n => `${n}문항 · 약 2분 소요`,
    myMbti: t => `나의 MBTI는 ${t}!`,
  },
  en: {
    allTests: 'All tests', start: 'Start the test →', restart: 'Start over',
    retake: 'Take it again', more: 'More tests', traits: 'Key traits',
    resultOf: cat => `${cat} test result`,
    meta: n => `${n} questions · about 2 minutes`,
    myMbti: t => `My MBTI is ${t}!`,
  },
  zh: {
    allTests: '全部测试', start: '开始测试 →', restart: '重新开始',
    retake: '再测一次', more: '更多测试', traits: '主要特征',
    resultOf: cat => `${cat}测试结果`,
    meta: n => `${n} 题 · 约 2 分钟`,
    myMbti: t => `我的 MBTI 是 ${t}！`,
  },
};

export default function TestEngine({ test, lang = 'ko' }: { test: Test; lang?: TestLang }) {
  const ui = UI[lang];
  const hubHref = lang === 'ko' ? '/test' : `/${lang}/test`;
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
          <Link href={hubHref} className="text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.allTests}
          </Link>
        </div>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-lg mx-auto w-full text-center">
        {/*
          목록 카드와 같은 그라데이션·이모지를 크게 다시 보여준다. 들어오자마자
          텍스트만 있으면 허전하고, 어떤 카드를 눌렀는지도 이어지지 않는다.
        */}
        <div className={`w-32 h-32 rounded-3xl mb-6 flex items-center justify-center bg-gradient-to-br ${thumbGradient(test.slug, 'test')} shadow-xl shadow-violet-500/20`}>
          <ToolIcon emoji={test.icon} accent="rgba(255,255,255,0.55)" className="w-14 h-14 drop-shadow-md" />
        </div>
        <span className="text-xs font-bold text-violet-500 bg-violet-50 dark:bg-violet-950/30 px-3 py-1 rounded-full mb-3">{test.category}</span>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-3">{test.title}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">{test.desc}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-8">{ui.meta(test.questions.length)}</p>
        <button onClick={() => setPhase('question')}
          className="w-full max-w-xs bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 active:scale-[0.99] text-white font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-violet-500/25">
          {ui.start}
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
        <div key={current} className="flex-1 px-4 py-10 max-w-lg mx-auto w-full te-fade">
          <span className="inline-block text-xs font-black text-violet-500 bg-violet-50 dark:bg-violet-950/40 px-2.5 py-1 rounded-full mb-4">Q{current + 1}</span>
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-8 leading-relaxed whitespace-pre-line tracking-tight">{q.q}</h2>
          <div className="flex flex-col gap-2.5">
            {q.opts.map((opt, i) => (
              <button key={i} onClick={() => pick(opt.score)}
                className="group w-full text-left flex items-center gap-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-2xl pl-3 pr-4 py-3.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-700 hover:shadow-sm active:scale-[0.99] transition-all">
                <span className="shrink-0 w-7 h-7 rounded-full border-2 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs font-black flex items-center justify-center transition-colors group-hover:border-violet-500 group-hover:bg-violet-500 group-hover:text-white">
                  {['A', 'B', 'C', 'D', 'E'][i] ?? i + 1}
                </span>
                <span className="flex-1 leading-snug">{opt.text}</span>
                <svg className="w-4 h-4 shrink-0 text-slate-200 dark:text-slate-700 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <style jsx>{`
          .te-fade { animation: teFade 0.28s ease-out; }
          @keyframes teFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
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
            {ui.restart}
          </button>
        </div>
      </header>
      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        {/* Result hero card */}
        <div className={`te-pop relative overflow-hidden rounded-3xl bg-gradient-to-br ${grad} p-8 text-white text-center mb-6 shadow-xl`}>
          {/* decorative bg emoji */}
          <span className="absolute -top-4 -right-4 text-[100px] opacity-10 select-none">{result.emoji}</span>
          <span className="absolute -bottom-4 -left-4 text-[80px] opacity-10 select-none">{result.emoji}</span>
          {/* soft glow */}
          <span aria-hidden className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
          {/* main emoji */}
          <div className="te-pop-emoji text-7xl mb-4 filter drop-shadow-lg relative z-10">{result.emoji}</div>
          <span className="relative z-10 text-xs font-bold bg-white/20 dark:bg-slate-900/20 px-3 py-1 rounded-full">{ui.resultOf(test.category)}</span>
          {mbtiType && (
            <p className="relative z-10 text-4xl font-black mt-4 tracking-widest">{mbtiType}</p>
          )}
          <h2 className="relative z-10 text-2xl font-black mt-2 mb-3">{result.title}</h2>
          <p className="relative z-10 text-sm leading-relaxed text-white/90">{result.desc}</p>
        </div>

        {/* Traits */}
        {result.traits && result.traits.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 mb-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">{ui.traits}</p>
            <div className="flex flex-wrap gap-2">
              {result.traits.map((t, i) => (
                <span key={i} className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-slate-200 shadow-sm">
                  ✦ {t}
                </span>
              ))}
            </div>
          </div>
        )}
        <style jsx>{`
          .te-pop { animation: tePop 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
          .te-pop-emoji { animation: tePopEmoji 0.55s cubic-bezier(0.34, 1.56, 0.64, 1); }
          @keyframes tePop { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
          @keyframes tePopEmoji { 0% { opacity: 0; transform: scale(0.3); } 60% { transform: scale(1.15); } 100% { opacity: 1; transform: scale(1); } }
        `}</style>

        <ShareButton
          title={`${test.title} 결과: ${mbtiType ? `${mbtiType} ` : ''}${result.emoji} ${result.title}`}
          description={`${mbtiType ? `${ui.myMbti(mbtiType)}\n` : ''}${result.title}\n\n${result.desc}`}
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
            {ui.retake}
          </button>
          <Link href={hubHref}
            className="w-full block text-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl py-3.5 font-bold text-sm transition-colors">
            {ui.more}
          </Link>
        </div>
      </div>
    </div>
  );
}
