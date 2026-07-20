'use client';
import { useState } from 'react';
import Link from 'next/link';
import ShareButton from './ShareButton';
import type { Generator } from '@/lib/types';
import { makeOne, makeBatch } from '@/lib/generate';
import PageGlow from './PageGlow';
import { thumbGradient } from '@/lib/thumbnail';
import ReferralCards from './ReferralCards';

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(text).catch(() => {});
    setOk(true);
    setTimeout(() => setOk(false), 1800);
  }
  return (
    <button
      onClick={copy}
      className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border transition-all ${
        ok
          ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300'
          : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 hover:border-emerald-400 hover:text-emerald-600'
      }`}
    >
      {ok ? '✓ 복사됨' : '복사'}
    </button>
  );
}

export default function GeneratorEngine({ gen }: { gen: Generator }) {
  const [results, setResults]   = useState<string[]>([]);
  const [saved, setSaved]       = useState<string[]>([]);
  const [animKey, setAnimKey]   = useState(0);
  const [copiedAll, setCopiedAll] = useState(false);

  function generate() {
    setResults(makeBatch(gen));
    setAnimKey(k => k + 1);
  }

  function refreshOne(idx: number) {
    setResults(prev => {
      const next = [...prev];
      let r = makeOne(gen);
      let tries = 0;
      while (next.includes(r) && tries < 20) { r = makeOne(gen); tries++; }
      next[idx] = r;
      return next;
    });
  }

  function toggleSave(text: string) {
    setSaved(prev =>
      prev.includes(text) ? prev.filter(s => s !== text) : [text, ...prev].slice(0, 20)
    );
  }

  async function copyAll() {
    await navigator.clipboard.writeText(results.join('\n')).catch(() => {});
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  }

  const hasResults = results.length > 0;

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/generator" className="text-sm text-slate-400 dark:text-slate-500 hover:text-emerald-600 flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            생성기 전체
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{gen.title}</span>
        </div>
      </header>

      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        {/* 인트로 */}
        <div className="text-center mb-7">
          {/* 목록 카드와 같은 그라데이션·이모지 — 텍스트만 있으면 허전하다 */}
          <div className={`w-24 h-24 rounded-3xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br ${thumbGradient(gen.slug, 'generator')} shadow-xl shadow-emerald-500/20`}>
            <span className="text-5xl drop-shadow-md" aria-hidden="true">{gen.icon}</span>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full">{gen.category}</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-3 mb-1.5">{gen.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{gen.desc}</p>
        </div>

        {/* 생성 버튼 */}
        <button
          onClick={generate}
          className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white rounded-2xl py-4 font-black text-base transition-all shadow-md shadow-emerald-200 mb-5"
        >
          {hasResults ? '🔄 다시 생성하기' : `✨ ${gen.title} 시작`}
        </button>

        {/* 결과 리스트 */}
        {hasResults && (
          <div key={animKey} className="space-y-2.5 mb-4 animate-in">

            {results.map((r, i) => {
              const isSaved = saved.includes(r);
              return (
                <div
                  key={`${r}-${i}`}
                  className="group flex items-start gap-3 bg-white dark:bg-slate-900 rounded-2xl px-4 py-3.5 border border-slate-100 dark:border-slate-800 hover:border-emerald-200 hover:shadow-sm transition-all"
                >
                  <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 text-xs font-black flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="flex-1 text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed whitespace-pre-line min-w-0">
                    {r}
                  </p>
                  <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                    {/* 새로고침 */}
                    <button
                      onClick={() => refreshOne(i)}
                      title="이 항목만 다시 생성"
                      className="text-slate-300 dark:text-slate-600 hover:text-emerald-500 transition-colors p-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    </button>
                    {/* 저장 */}
                    <button
                      onClick={() => toggleSave(r)}
                      title={isSaved ? '저장 취소' : '저장'}
                      className={`transition-colors p-1 ${isSaved ? 'text-rose-500' : 'text-slate-300 dark:text-slate-600 hover:text-rose-400'}`}
                    >
                      <svg className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>
                    <CopyBtn text={r} />
                  </div>
                </div>
              );
            })}

            {/* 전체 복사 */}
            <button
              onClick={copyAll}
              className="w-full text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-emerald-600 py-2 transition-colors"
            >
              {copiedAll ? '✓ 전체 복사됨' : '전체 복사하기'}
            </button>
          </div>
        )}

        {hasResults && (
          // 공유 문구에는 저장한 결과가 있으면 그것을, 없으면 방금 뽑은 결과를 싣는다.
          <ShareButton
            title={gen.title}
            description={(saved.length > 0 ? saved : results).slice(0, 3).join(' · ')}
            type="generator"
          />
        )}

        {/* 저장 목록 */}
        {saved.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">❤️ 저장한 결과 <span className="text-slate-400 dark:text-slate-500 font-normal">({saved.length})</span></p>
              <button onClick={() => setSaved([])} className="text-xs text-slate-400 dark:text-slate-500 hover:text-red-400 transition-colors">전체 삭제</button>
            </div>
            <div className="space-y-2">
              {saved.map((s, i) => (
                <div key={i} className="flex items-center gap-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl px-3 py-2.5 border border-rose-100 dark:border-rose-900/40">
                  <p className="flex-1 text-sm font-semibold text-slate-800 dark:text-slate-100 whitespace-pre-line min-w-0">{s}</p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <CopyBtn text={s} />
                    <button
                      onClick={() => toggleSave(s)}
                      className="text-rose-400 hover:text-rose-600 p-1 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 생성 버튼을 눌러 결과가 나온 뒤에만 — 빈 화면에 광고부터 띄우지 않는다 */}
        {hasResults && <ReferralCards placement="result" />}
      </div>

      <style jsx global>{`
        @keyframes animIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: animIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}
