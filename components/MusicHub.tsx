import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang } from '@/lib/i18n/lang';
import { MUSIC_ITEMS, colorOf, itemsOfKind, symbolOf, titleOf, type MusicItem } from '@/lib/music/catalog';
import { CHORD_QUALITIES, SCALE_MODES } from '@/lib/music/theory';
import { MUSIC_UI } from '@/lib/music/ui';
import LangPicker from '@/components/LangPicker';
import { LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';

/**
 * 음악 이론 허브 — 성질별로 묶어 보여 준다.
 *
 * 코드 96장을 한 줄로 늘어놓으면 밑음 열두 개가 여덟 번 되풀이돼 무엇을 고를지
 * 알 수 없다. 성질(메이저·마이너·세븐스…)로 묶으면 한 묶음이 열두 밑음이라
 * 원하는 코드를 두 번 눈으로 찾아 누를 수 있다.
 */
export default function MusicHub({ lang }: { lang: Lang }) {
  const ui = MUSIC_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/music`;
  const base = lang === 'ko' ? 'ko' : 'en';

  const card = (item: MusicItem) => (
    <Link
      key={item.slug}
      href={`${prefix}/music/${item.slug}`}
      className="group flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 hover:shadow-sm hover:border-slate-400 transition-all"
    >
      <span className="w-2 h-7 rounded-full shrink-0" style={{ background: colorOf(item) }} />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
          {titleOf(item, lang)}
        </span>
        <span className="block text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">{symbolOf(item)}</span>
      </span>
    </Link>
  );

  const group = (title: string, items: MusicItem[]) => (
    <section key={title} className="mb-7">
      <h3 className="flex items-baseline gap-2 text-sm font-black text-slate-700 dark:text-slate-200 mb-2.5">
        {title}
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{items.length}</span>
      </h3>
      <div className="grid sm:grid-cols-3 gap-2">{items.map(card)}</div>
    </section>
  );

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd data={breadcrumbJsonLd([{ name: ui.home, path: homeHref }, { name: ui.section, path: `${prefix}/music` }])} />
      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-sky-500 to-indigo-600" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 font-medium shrink-0">
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/music" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{ui.hubLead}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 tabular-nums">{MUSIC_ITEMS.length}</p>
        </div>

        <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3">
          {ui.chordGroup}
        </h2>
        {CHORD_QUALITIES.map(q =>
          group(q.name[lang], MUSIC_ITEMS.filter(i => i.kind === 'chord' && i.id === q.id)),
        )}

        <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="block pt-5">{ui.scaleGroup}</span>
        </h2>
        {SCALE_MODES.map(m =>
          group(m.name[lang], MUSIC_ITEMS.filter(i => i.kind === 'scale' && i.id === m.id)),
        )}

        <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="block pt-5">{ui.intervalGroup}</span>
        </h2>
        <div className="grid sm:grid-cols-3 gap-2 mb-7">{itemsOfKind('interval').map(card)}</div>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/music`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
