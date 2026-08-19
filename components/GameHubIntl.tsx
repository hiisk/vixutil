import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ToolIcon from '@/components/ToolIcon';
import { ALGS, CUBE_ICON } from '@/lib/cube/list';
import { langOfLocale } from '@/lib/i18n/lang';
import { CUBE_UI } from '@/lib/cube/ui';
import { OPENINGS, CHESS_ICON } from '@/lib/chess/list';
import { chessUi, fill } from '@/lib/chess/ui';
import { HANDS, POKER_ICON } from '@/lib/poker/list';
import { pokerUi, fill as pokerFill } from '@/lib/poker/ui';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import { gameToolsIntl, GAME_CATEGORY_ORDER, GAME_SHELL_UI, type GameIntlLang } from '@/lib/game-tools-intl';

/**
 * 두뇌 게임 허브의 번역 화면 — 일곱 언어가 이 하나를 쓴다.
 *
 * 색상 허브(ColorHubIntl)와 같은 이유로 한 곳에 모았다. 언어마다 page.tsx를
 * 복제하면 문구 하나를 고칠 때 일곱 곳을 손대야 하고, 그중 한 곳을 빼먹은 것은
 * 화면을 열어 보기 전까지 드러나지 않는다.
 */
export default function GameHubIntl({ lang }: { lang: GameIntlLang }) {
  // 데이터 섹션은 짧은 열쇠(pt·zh·tw)를 쓰고 도구 계층은 경로 꼴(pt-br·zh-hans)을 쓴다
  const short = langOfLocale(lang);
  const cube = CUBE_UI[short];
  const chess = chessUi(short);
  const poker = pokerUi(short);
  const tools = gameToolsIntl(lang);
  const ui = GAME_SHELL_UI[lang];
  const grouped = GAME_CATEGORY_ORDER[lang]
    .map(c => ({ category: c, tools: tools.filter(t => t.category === c) }))
    .filter(g => g.tools.length > 0);

  return (
    <div className="page-wrap">
      <PageGlow accent="emerald" />
      <div className="h-1 topbar" />

      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href={`/${lang}`} className="font-black text-emerald-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.section}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route="/game" />
          </span>
        </div>
      </header>

      {/* 머리 띠 — 화면을 가로지르고 안의 글만 본문 폭에 맞춘다 */}
      <div className="hero-band">
        <div className="max-w-5xl mx-auto px-4">
          <PageHero className="hero-flat" title={ui.section} desc={ui.hubLead} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 tool-lift pb-10">

        {grouped.map(g => (
          <section key={g.category} className="mb-8">
            <h2 className="sec-h2">{g.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {g.tools.map(t => (
                <Link
                  key={t.slug}
                  href={`/${lang}/game/${t.slug}`}
                  className="group flex min-h-[8rem] flex-col justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <span className="bg-sec-soft inline-flex h-9 w-9 items-center justify-center rounded-lg">
                    <ToolIcon emoji={t.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-base font-black drop-shadow leading-tight">{t.title}</span>
                    <span className="block text-[11px] font-medium opacity-80 mt-1 line-clamp-2">{t.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <Link
          href={`/${lang}/game/cube`}
          className="group flex items-center gap-4 rounded-lg border chip-off px-5 py-4 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-sec-soft">
            <ToolIcon emoji={CUBE_ICON} className="w-6 h-6 transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{cube.hubTitle}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{cube.hubLead}</span>
          </span>
          <span className="ml-auto text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">{ALGS.length}</span>
        </Link>

        <Link
          href={`/${lang}/game/chess`}
          className="group mt-3 flex items-center gap-4 rounded-lg border chip-off px-5 py-4 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-sec-soft">
            <ToolIcon emoji={CHESS_ICON} className="w-6 h-6 transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{fill(chess.hubTitle, { n: OPENINGS.length })}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{chess.hubLead}</span>
          </span>
          <span className="ml-auto text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">{OPENINGS.length}</span>
        </Link>

        <Link
          href={`/${lang}/game/poker`}
          className="group mt-3 flex items-center gap-4 rounded-lg border chip-off px-5 py-4 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-sec-soft">
            <ToolIcon emoji={POKER_ICON} className="w-6 h-6 transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{pokerFill(poker.hubTitle, { n: HANDS.length })}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{pokerFill(poker.hubLead, { n: HANDS.length })}</span>
          </span>
          <span className="ml-auto text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">{HANDS.length}</span>
        </Link>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6 leading-relaxed">{ui.notice}</p>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-emerald-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">{ui.hubFoot}</p>
      </footer>
    </div>
  );
}
