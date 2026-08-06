import ToolIcon from '@/components/ToolIcon';
import { alternateLanguages10 } from '@/lib/locales';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { ALGS, CUBE_ICON } from '@/lib/cube/list';
import { CUBE_UI } from '@/lib/cube/ui';
import { OPENINGS, CHESS_ICON } from '@/lib/chess/list';
import { chessUi, fill } from '@/lib/chess/ui';
import { HANDS, POKER_ICON } from '@/lib/poker/list';
import { pokerUi, fill as pokerFill } from '@/lib/poker/ui';
import { SECTION_FAQ } from '@/lib/section-faq';
import { GAME_TOOLS } from '@/lib/game-tools';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '두뇌 게임 — 반응속도·클릭속도·기억력 테스트',
  description:
    '반응속도, 초당 클릭 수(CPS), 순서·숫자·패턴 기억력, 타자 연습, 색 구분, 가청 주파수, 암산까지 1분이면 끝나는 측정 게임 10종. 설치 없이 브라우저에서 바로.',
  alternates: {
    canonical: '/game',
    languages: alternateLanguages10('/game'),
  },
});

const CATEGORY_ORDER = ['반응·속도', '기억력', '감각', '두뇌'];

export default function GameHubPage() {
  const grouped = CATEGORY_ORDER.map(c => ({
    category: c,
    tools: GAME_TOOLS.filter(t => t.category === c),
  })).filter(g => g.tools.length > 0);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '두뇌 게임', path: '/game' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          '두뇌 게임',
          '/game',
          GAME_TOOLS.map(t => ({ name: t.title, path: `/game/${t.slug}` })),
        )}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-fuchsia-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-emerald-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">두뇌 게임</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/game" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-9">
          <ToolIcon emoji="🕹️" className="w-12 h-12 mx-auto mb-4 text-slate-800 dark:text-slate-100" />
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">두뇌 게임</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            1분이면 끝나는 측정 게임
            <br className="sm:hidden" /> — 점수가 남으면 한 번 더 하게 됩니다
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/70 dark:bg-emerald-950/30 px-4 py-3.5 mb-7 text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed text-center">
🎮 기록은 이 브라우저에만 저장됩니다. 회원가입도, 순위표 등록도 없습니다.
        </div>

        <div className="flex flex-col gap-7">
          {grouped.map(g => (
            <section key={g.category} aria-label={g.category}>
              <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
                {g.category}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {g.tools.map(t => (
                  <Link
                    key={t.slug}
                    href={`/game/${t.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow-md hover:border-emerald-200 transition-all"
                  >
                    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${t.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <div className="relative">
                      <ToolIcon emoji={t.icon} color={t.og[0]} accent={t.og[1]} className="w-9 h-9 block mb-3" />
                      <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mb-1">{t.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{t.desc}</p>
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        바로 쓰기
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <Link
          href="/game/cube"
          className="group mt-8 flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-gradient-to-br from-amber-500 to-rose-500">
            <ToolIcon emoji={CUBE_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{CUBE_UI.ko.hubTitle}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{CUBE_UI.ko.hubLead}</span>
          </span>
          <span className="ml-auto text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">{ALGS.length}</span>
        </Link>

        <Link
          href="/game/chess"
          className="group mt-3 flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-gradient-to-br from-violet-600 to-indigo-500">
            <ToolIcon emoji={CHESS_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{fill(chessUi('ko').hubTitle, { n: OPENINGS.length })}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{chessUi('ko').hubLead}</span>
          </span>
          <span className="ml-auto text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">{OPENINGS.length}</span>
        </Link>

        <Link
          href="/game/poker"
          className="group mt-3 flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-gradient-to-br from-emerald-600 to-teal-500">
            <ToolIcon emoji={POKER_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{pokerFill(pokerUi('ko').hubTitle, { n: HANDS.length })}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{pokerFill(pokerUi('ko').hubLead, { n: HANDS.length })}</span>
          </span>
          <span className="ml-auto text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">{HANDS.length}</span>
        </Link>

        <div className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="sec-h2">이럴 때 쓰세요</h2>
          <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>🎮 <b className="text-slate-800 dark:text-slate-100">게임 하기 전 손 풀 때</b> — 반응속도와 표적 클릭으로 몸을 깨웁니다</li>
            <li>☕ <b className="text-slate-800 dark:text-slate-100">쉬는 시간 1분</b> — 한 판이 5초에서 30초면 끝납니다</li>
            <li>🧠 <b className="text-slate-800 dark:text-slate-100">머리가 안 돌아갈 때</b> — 암산과 기억력으로 시동을 겁니다</li>
            <li>👥 <b className="text-slate-800 dark:text-slate-100">친구와 겨룰 때</b> — 같은 기기로 번갈아 하면 조건이 같습니다</li>
          </ul>
        </div>

        <Faq items={SECTION_FAQ.game} />

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9">
모든 결과는 재미로 보는 값입니다 · 무료 · 회원가입 없음
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
