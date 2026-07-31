import Link from 'next/link';
import ToolIcon from '@/components/ToolIcon';
import { ALGS, CUBE_ICON } from '@/lib/cube/list';
import { CUBE_UI } from '@/lib/cube/ui';
import { OPENINGS, CHESS_ICON } from '@/lib/chess/list';
import { chessUi, fill } from '@/lib/chess/ui';
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
  const cube = CUBE_UI[lang === 'pt-br' ? 'pt' : lang];
  const chess = chessUi(lang === 'pt-br' ? 'pt' : lang);
  const tools = gameToolsIntl(lang);
  const ui = GAME_SHELL_UI[lang];
  const grouped = GAME_CATEGORY_ORDER[lang]
    .map(c => ({ category: c, tools: tools.filter(t => t.category === c) }))
    .filter(g => g.tools.length > 0);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />

      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href={`/${lang}`} className="font-black text-emerald-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.section}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route="/game" />
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-2">{ui.eyebrow}</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.section}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">{ui.hubLead}</p>

        {grouped.map(g => (
          <section key={g.category} className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{g.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {g.tools.map(t => (
                <Link
                  key={t.slug}
                  href={`/${lang}/game/${t.slug}`}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.gradient} text-white p-5 min-h-[9rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}
                >
                  <ToolIcon emoji={t.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
                  <span>
                    <span className="block text-base font-black drop-shadow leading-tight">{t.title}</span>
                    <span className="block text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{t.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <Link
          href={`/${lang}/game/cube`}
          className="group flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-gradient-to-br from-amber-500 to-rose-500">
            <ToolIcon emoji={CUBE_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{cube.hubTitle}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{cube.hubLead}</span>
          </span>
          <span className="ml-auto text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">{ALGS.length}</span>
        </Link>

        <Link
          href={`/${lang}/game/chess`}
          className="group mt-3 flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-gradient-to-br from-violet-600 to-indigo-500">
            <ToolIcon emoji={CHESS_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{fill(chess.hubTitle, { n: OPENINGS.length })}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{chess.hubLead}</span>
          </span>
          <span className="ml-auto text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">{OPENINGS.length}</span>
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
