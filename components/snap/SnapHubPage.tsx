import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import { LENSES, LENS_ICON } from '@/lib/lens/list';
import { LENS_UI } from '@/lib/lens/ui';
import { ALL_LOCALES10 } from '@/lib/locales';
import { langOfLocale } from '@/lib/i18n/lang';
import { snapHubCards, snapHubCopy } from '@/lib/snap-tools-intl';
import { newSnapHubCards } from '@/lib/snap/route';
import type { SnapIntlLang } from '@/lib/snap-intl';

/**
 * 스냅테스트 허브 — 아홉 언어 공용.
 *
 * 언어마다 page.tsx에 같은 화면을 복사해 두면 카드 하나를 늘릴 때 아홉 곳을
 * 고쳐야 하고, 곧 한두 곳이 빠진다. 문구는 [[lib/snap-tools-intl.ts]]에서
 * 꺼내고 화면은 여기 하나만 둔다.
 *
 * 링크는 실제로 만든 도구만 싣는다 — 없는 페이지를 걸면 404다.
 */
export default function SnapHubPage({ lang }: { lang: SnapIntlLang }) {
  const c = snapHubCopy(lang);
  // 새 스냅테스트는 열 언어짜리 표에 따로 있다 — 목록에서는 함께 보여야 한다
  const cards = [...snapHubCards(lang), ...newSnapHubCards(lang)];
  // 렌즈 사전은 자료 열쇠(pt·zh·tw)를 쓴다 — 경로형 로케일과 다르므로 옮겨서 읽는다
  const lensUi = LENS_UI[langOfLocale(lang)];

  return (
    <div className="page-wrap">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link prefetch={false} href={`/${lang}/snap`} className="font-black text-fuchsia-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{c.kicker}</span>
          <span className="ml-auto">
            <LangPicker current={lang} route="/snap" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <ToolIcon emoji="📸" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{c.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{c.lead}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map(t => (
            <Link prefetch={false} key={t.href} href={t.href}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.color} text-white p-6 min-h-[10rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
              <ToolIcon emoji={t.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
              <div>
                <div className="text-lg font-black drop-shadow leading-tight">{t.title}</div>
                <div className="text-xs font-medium text-white/80 mt-1">{t.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        <Link prefetch={false}
          href={`/${lang}/snap/lens`}
          className="group mt-6 flex items-center gap-4 rounded-2xl border chip-off px-5 py-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-gradient-to-br from-indigo-600 to-violet-500">
            <ToolIcon emoji={LENS_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{lensUi.hubTitle}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{lensUi.hubLead}</span>
          </span>
          <span className="ml-auto text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">{LENSES.length}</span>
        </Link>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-10 leading-relaxed">{c.privacy}</p>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-fuchsia-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">{c.footer}</p>
      </footer>
    </div>
  );
}
