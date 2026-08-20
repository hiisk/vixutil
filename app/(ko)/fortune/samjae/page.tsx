'use client';
import { useState, useEffect } from 'react';
import CoupangAd from '@/components/CoupangAd';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import ShareButton from '@/components/ShareButton';
import ToolIcon from '@/components/ToolIcon';
import { ANIMALS } from '@/lib/fortune-data';
import { animalsInSamjae, samjaeFor, SAMJAE_COLORS, type SamjaePhase } from '@/lib/samjae';

/**
 * 삼재 — 연초마다 크게 검색되는데 없던 자리.
 *
 * 규칙은 lib/samjae.ts에 있고 tests/samjae.test.ts가 붙든다. 「2026년은
 * 눌삼재입니다」가 맞는지는 화면으로 확인이 안 되는 종류다.
 *
 * ── 올해를 언제 읽는가 ─────────────────────────────────────
 * 이 페이지는 «올해»가 답의 중심이라 new Date()를 렌더 중에 부르면 안 된다.
 * ISR로 미리 구워 둔 HTML은 빌드 시점의 해를 담고 있어서, 해가 바뀌면 서버가
 * 그린 것과 브라우저가 그린 것이 갈린다. 마운트 뒤에 한 번 읽는다.
 */

const PHASE_COPY: Record<SamjaePhase, { hanja: string; head: string; body: string }> = {
  들삼재: {
    hanja: '入三災',
    head: '삼재가 드는 해',
    body: '세 해 가운데 기운이 가장 세다고 봅니다. 옛말로는 이 해에 새로 벌이는 일을 조심하라 했습니다 — 이사·창업·큰 계약처럼 되돌리기 어려운 결정을 한 박자 늦추라는 뜻으로 읽으면 됩니다.',
  },
  눌삼재: {
    hanja: '臥三災',
    head: '삼재가 머무는 해',
    body: '눕는다는 뜻으로, 큰일이 터지기보다 잔일이 길게 이어진다고 봅니다. 몸이 상하거나 하던 일이 늘어지기 쉬운 해라 하여, 벌여 놓은 것을 마무리하는 쪽에 무게를 두라 했습니다.',
  },
  날삼재: {
    hanja: '出三災',
    head: '삼재가 나가는 해',
    body: '셋 가운데 가장 약합니다. 다만 «나가면서 한 번 크게 흔든다»는 말도 있어, 마지막 해를 더 조심하라는 지방도 있습니다. 이 해가 지나면 아홉 해 동안은 삼재가 없습니다.',
  },
};

/** 열두 띠를 두 줄로 — /fortune/zodiac-match와 같은 생김새다 */
function AnimalPicker({ value, onChange }: { value: number | null; onChange: (i: number) => void }) {
  return (
    <div className="grid grid-cols-6 gap-1.5">
      {ANIMALS.map((a, i) => {
        const on = value === i;
        return (
          <button
            key={a.id} type="button" onClick={() => onChange(i)} aria-pressed={on}
            className={`aspect-square rounded-xl transition-all border flex flex-col items-center justify-center ${
              on
                ? 'bg-sec border-transparent text-white shadow-sm scale-105'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
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
  );
}

export default function SamjaePage() {
  const [selected, setSelected] = useState<number | null>(null);
  /* 빌드 시점이 아니라 보는 시점의 해여야 한다 — 위 주석 참고 */
  const [thisYear, setThisYear] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThisYear(new Date().getFullYear());
  }, []);

  const result = selected !== null && thisYear !== null ? samjaeFor(selected, thisYear) : null;
  const thisYearAnimals = thisYear !== null ? animalsInSamjae(thisYear) : null;
  const animal = selected !== null ? ANIMALS[selected] : null;

  function pick(i: number) {
    setSelected(i);
    setTimeout(() => document.getElementById('samjae-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="amber" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="page-back hover:text-amber-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">삼재</span>
        </div>
      </header>

      <div className="hero-band max-w-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="page-h1">삼재</h1>
          <p className="page-lede">띠를 고르면 삼재가 드는 세 해와, 지금이 그중 어디인지 알려드립니다.</p>
        </div>

        {/* 올해 삼재인 띠 — 이 페이지를 찾는 가장 흔한 이유다 */}
        {thisYear !== null && thisYearAnimals && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-4">
            <p className="label-caps mb-2">{thisYear}년 삼재</p>
            <div className="flex flex-wrap items-center gap-2">
              {thisYearAnimals.map(({ animalIdx }) => (
                <button
                  key={animalIdx} type="button" onClick={() => pick(animalIdx)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm font-bold text-slate-800 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <span>{ANIMALS[animalIdx].emoji}</span>
                  {ANIMALS[animalIdx].name}
                </button>
              ))}
              <span className="text-sm text-slate-600 dark:text-slate-300">
                — {thisYearAnimals[0].phase}
              </span>
            </div>
            <p className="mt-3 note-xs">
              삼재는 띠 하나가 아니라 삼합 무리 셋이 함께 듭니다. 그래서 어느 해든 삼재인 띠가 정확히 셋입니다.
            </p>
          </div>
        )}

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-4">
          <p className="fld-lbl">내 띠</p>
          <AnimalPicker value={selected} onChange={pick} />
        </div>

        {result && animal && (
          <div id="samjae-result" className="flex flex-col gap-4">
            <div
              className="result-card"
              style={{ '--grade': result.current ? SAMJAE_COLORS.in : SAMJAE_COLORS.clear } as React.CSSProperties}
            >
              <p className="text-4xl mb-1">{animal.emoji}</p>
              <p className="label-caps">{animal.name}</p>
              {result.current ? (
                <>
                  <p className="text-4xl font-bold leading-tight tracking-tight mt-2" style={{ color: SAMJAE_COLORS.in }}>
                    삼재입니다
                  </p>
                  <p className="text-base font-bold mt-2">
                    {result.current.year}년 · {result.current.phase}
                    <span className="text-slate-500 dark:text-slate-400 font-medium"> ({PHASE_COPY[result.current.phase].hanja})</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-4xl font-bold leading-tight tracking-tight mt-2" style={{ color: SAMJAE_COLORS.clear }}>
                    삼재가 아닙니다
                  </p>
                  <p className="text-base font-bold mt-2">
                    다음 삼재는 {result.block[0].year}년 — {result.yearsUntil}해 뒤
                  </p>
                </>
              )}
            </div>

            {/* 세 해를 한눈에 — 지금 어디쯤인지가 이 표의 전부다 */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
              <p className="label-caps mb-3">{result.current ? '이번 삼재 세 해' : '다음 삼재 세 해'}</p>
              <div className="kv-table">
                {result.block.map(b => {
                  const now = b.year === thisYear;
                  return (
                    <div key={b.year} className={`kv-row ${now ? 'is-now' : ''}`}>
                      <span className="flex items-center gap-2 min-w-0">
                        <span className="tabular-nums font-bold text-slate-900 dark:text-white">{b.year}</span>
                        <span className="truncate">
                          {ANIMALS[b.branchIdx].emoji} {ANIMALS[b.branchIdx].name}해
                          {b.ownAnimal && <span className="text-sec font-bold"> · 본인 띠</span>}
                        </span>
                      </span>
                      <span className="shrink-0">
                        {b.phase}
                        {now && <span className="text-sec font-bold"> ← 올해</span>}
                      </span>
                    </div>
                  );
                })}
              </div>
              {result.block.some(b => b.ownAnimal) && (
                <p className="mt-3 note-xs">
                  {animal.name}는 삼합 무리의 마지막 자리(묘고)라, 삼재의 끝해가 본인 띠 해와 겹칩니다.
                  «본띠 해에 나가는 삼재»라 하여 예로부터 따로 이름을 붙여 불렀습니다.
                </p>
              )}
            </div>

            {/* 지금(또는 앞으로 올) 단계의 뜻 */}
            {(() => {
              const phase = result.current?.phase ?? '들삼재';
              const c = PHASE_COPY[phase];
              return (
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                      {phase} <span className="text-slate-500 dark:text-slate-400 font-medium">{c.hanja}</span>
                    </h2>
                    <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{c.head}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{c.body}</p>
                </div>
              );
            })()}

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">삼재라는 말을 어떻게 받아들일까</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                삼재의 «삼»은 세 해가 아니라 세 가지 재앙을 뜻합니다 — 불·물·바람(화재·수재·풍재)을 큰 삼재라 하고,
                병들고 다투고 굶는 것을 작은 삼재라 했습니다. 자연재해와 흉년이 삶을 통째로 흔들던 시절에
                «열두 해에 세 해쯤은 조심해서 지내자»고 정해 둔 달력에 가깝습니다.
                그래서 삼재에 걸렸다는 것은 나쁜 일이 정해졌다는 뜻이 아니라,
                <strong className="text-slate-800 dark:text-slate-100"> 큰 결정을 한 번 더 따져 보라는 표시</strong>로 읽는 편이 맞습니다.
                이 계산기도 <strong className="text-slate-800 dark:text-slate-100">오락·참고용</strong>입니다.
              </p>
            </div>

            <ShareButton
              title={result.current
                ? `${animal.name}는 ${result.current.year}년 ${result.current.phase}`
                : `${animal.name}의 다음 삼재는 ${result.block[0].year}년`}
              description="삼재가 드는 세 해와 지금이 어디인지 확인해보세요"
              type="fortune"
            />

            <CoupangAd />
          </div>
        )}

        {!result && (
          <div className="py-10 text-slate-500 dark:text-slate-400">
            <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg">
              <ToolIcon emoji="☝️" className="h-6 w-6" />
            </span>
            <p className="text-sm">띠를 고르면 삼재가 드는 해가 나옵니다</p>
          </div>
        )}

        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">삼재는 어떻게 정해지나요?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            열두 띠는 넷씩 나뉘어 <strong className="text-slate-800 dark:text-slate-100">삼합</strong>이라는 무리를 이룹니다.
            무리마다 삼재가 드는 세 해가 정해져 있고, 그 세 해는 무리의 마지막 자리에서 끝납니다 —
            신자진생(원숭이·쥐·용)은 인묘진년, 인오술생(범·말·개)은 신유술년,
            해묘미생(돼지·토끼·양)은 사오미년, 사유축생(뱀·닭·소)은 해자축년입니다.
            네 무리의 구간이 열두 지지를 빈틈없이 나눠 갖기 때문에
            <strong className="text-slate-800 dark:text-slate-100"> 어느 해든 삼재인 띠는 정확히 셋</strong>이고,
            누구나 열두 해 가운데 세 해가 자기 차례입니다.
          </p>
        </div>

        <Faq items={SECTION_FAQ['fortune/samjae']} />
      </div>
      <SiteFooter referral={false} />
    </div>
  );
}
