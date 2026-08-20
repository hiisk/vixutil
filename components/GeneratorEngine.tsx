'use client';
import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ShareButton from './ShareButton';
import type { Generator } from '@/lib/types';
import { makeOne, makeBatch } from '@/lib/generate';
import PageGlow from './PageGlow';
import { thumbSurface } from '@/lib/thumbnail';
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
          : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-emerald-400 hover:text-emerald-600'
      }`}
    >
      {ok ? '✓ 복사됨' : '복사'}
    </button>
  );
}

  /*
   * headerRight — 머리줄 오른쪽에 얹을 것(언어 고르개).
   * 예전에는 부르는 쪽이 이 엔진 **위에** 자기 줄을 하나 더 만들어 고르개를
   * 놓았다. 화면 위쪽 50px이 고르개 하나에 쓰였고, 머리 띠가 두 겹으로 보였다.
   * 머리줄이 이미 있으므로 그 안에 넣는다.
   */
export default function GeneratorEngine({ gen, headerRight }: { gen: Generator; headerRight?: React.ReactNode }) {
  /*
   * ── 열자마자 한 벌을 뽑는다 (2026-08-19) ────────────────────────
   * 「시작」을 눌러야 아무 일이 일어났다. 그런데 생성기는 **입력이 없는 도구**다 —
   * 누르기 전에 사람이 정할 것이 하나도 없는데 버튼이 한 번을 가로막고 있었고,
   * 그동안 화면은 절반이 빈 채로 서 있었다. 버튼은 남되 「다시 생성하기」가 된다 —
   * 마음에 안 들면 다시 돌리는 것이 이 도구를 쓰는 방식이다.
   *
   * useState의 초기값으로 뽑으면 안 된다. 클라이언트 컴포넌트도 서버에서 한 번
   * 그려지므로 서버가 뽑은 것과 브라우저가 뽑은 것이 달라 하이드레이션이 어긋난다.
   * 마운트 뒤에 뽑으면 서버는 빈 화면을 그리고 브라우저가 채운다.
   */
  const [results, setResults]   = useState<string[]>([]);
  const [saved, setSaved]       = useState<string[]>([]);
  const [animKey, setAnimKey]   = useState(0);
  const [copiedAll, setCopiedAll] = useState(false);

  function generate() {
    setResults(makeBatch(gen));
    setAnimKey(k => k + 1);
  }

  /*
   * 첫 화면에 한 벌 — 갈래(gen)가 바뀌면 다시 뽑는다.
   *
   * 무작위는 «바깥 세계»라 효과 안에서 읽는 것이 맞다. 렌더 중에 뽑으면 서버가
   * 뽑은 값과 브라우저가 뽑은 값이 달라 하이드레이션이 어긋난다.
   * ThemeToggle이 DOM에서 테마를 읽는 것과 같은 자리다.
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResults(makeBatch(gen));
    setAnimKey(k => k + 1);
  }, [gen]);

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
      <div className="h-1 topbar" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/generator" className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            생성기 전체
          </Link>
          <span className="text-slate-200">·</span>
          <span className="row-name">{gen.title}</span>
        {headerRight && <span className="ml-auto shrink-0">{headerRight}</span>}
        </div>
      </header>

      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        {/*
          머리 — 사이트의 다른 갈래와 같은 규격이다. 예전에는 96px짜리 아이콘 판과
          제목 타일이 **둘 다 가운데**에 떠 있어서, 도구는 아래 있는데 화면 위쪽
          절반을 소개가 차지했다. 칩 하나로 줄이고 왼쪽에 세운다.
        */}
        <div className="hero-band">
          <div className="mb-3 flex items-center gap-2">
            <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg">
              <ToolIcon emoji={gen.icon} className="h-5 w-5" />
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{gen.category}</span>
          </div>
          <PageHero title={gen.title} desc={gen.desc} />
        </div>

        {/* 생성 버튼 */}
        <button
          onClick={generate}
          className="btn-pri !py-4 !text-base"
        >
          {hasResults ? '다시 생성하기' : `${gen.title} 시작`}
        </button>

        {/* 결과 리스트 */}
        {hasResults && (
          <div key={animKey} className="space-y-2.5 mb-4 animate-in">

            {results.map((r, i) => {
              const isSaved = saved.includes(r);
              return (
                <div
                  key={`${r}-${i}`}
                  className="group flex items-start gap-3 bg-white dark:bg-slate-900 rounded-lg px-4 py-3.5 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all"
                >
                  <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 text-xs font-bold flex items-center justify-center mt-0.5">
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
                      className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors p-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    </button>
                    {/* 저장 */}
                    <button
                      onClick={() => toggleSave(r)}
                      title={isSaved ? '저장 취소' : '저장'}
                      className={`transition-colors p-1 ${isSaved ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400 hover:text-rose-400'}`}
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
              className="w-full text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-600 py-2 transition-colors"
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
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">❤️ 저장한 결과 <span className="text-slate-500 dark:text-slate-400 font-normal">({saved.length})</span></p>
              <button onClick={() => setSaved([])} className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-400 transition-colors">전체 삭제</button>
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
