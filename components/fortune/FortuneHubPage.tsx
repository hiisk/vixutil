import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { TAROT_UI } from '@/lib/tarot/ui';
import { TAROT_ICON } from '@/lib/tarot/deck';
import { langOfLocale } from '@/lib/i18n/lang';
import { fortuneHubCards, fortuneHubCopy, type FortuneIntlLang } from '@/lib/fortune-tools-intl';

/**
 * 운세 허브 — 아홉 언어 공용.
 *
 * 예전에는 언어마다 page.tsx에 같은 배열을 복사해 두었다. 도구를 하나 늘릴 때
 * 아홉 곳을 고쳐야 하고, 곧 한두 곳이 빠진다. 문구는
 * [[lib/fortune-tools-intl.ts]]에서 꺼내고 화면은 여기 하나만 둔다.
 */
export default function FortuneHubPage({ lang }: { lang: FortuneIntlLang }) {
  const c = fortuneHubCopy(lang);
  const cards = fortuneHubCards(lang);
  const tarot = TAROT_UI[langOfLocale(lang)];

  return (
    <div className="page-wrap">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/${lang}/fortune`} className="font-black text-violet-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{c.kicker}</span>
          <span className="ml-auto">
            <LangPicker current={lang} route="/fortune" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <ToolIcon emoji="🔮" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{c.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{c.lead}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map(t => (
            <Link key={t.href} href={t.href}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.color} text-white p-5 min-h-[9rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
              <div className="flex items-start justify-between gap-2">
                <ToolIcon emoji={t.icon} accent="rgba(255,255,255,0.55)" className="w-8 h-8 drop-shadow-lg transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-bold bg-white/20 rounded-full px-2 py-0.5 shrink-0">{t.badge}</span>
              </div>
              <div>
                <div className="text-base font-black drop-shadow leading-tight">{t.title}</div>
                <div className="text-xs font-medium text-white/80 mt-1">{t.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* 타로 78장 사전은 도구가 아니라 자료 페이지라 카드 격자 밖에 둔다 */}
        <Link
          href={`/${lang}/fortune/card`}
          className="group mt-6 flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-gradient-to-br from-violet-600 to-purple-500">
            <ToolIcon emoji={TAROT_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{tarot.hubTitle}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{tarot.hubLead}</span>
          </span>
          <span className="ml-auto text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">78</span>
        </Link>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-violet-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">{c.footer}</p>
      </footer>
    </div>
  );
}
