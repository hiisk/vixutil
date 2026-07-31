import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CARDS, MAJORS, SUITS, SUIT_ELEMENT, TAROT_ICON, cardsOfSuit } from '@/lib/tarot/deck';
import { cardView } from '@/lib/tarot/facts';
import { TAROT_UI } from '@/lib/tarot/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 타로 78장 목록 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 메이저는 번호 순으로 한 줄씩, 마이너는 수트별로 묶는다. 수트마다 무엇을
 * 다루는지 한 줄씩 붙여 두면, 목록만 훑어도 읽는 방법이 눈에 들어온다.
 */
export default function TarotHubPage({ lang }: { lang: Lang }) {
  const ui = TAROT_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/fortune/card`;
  const base = lang === 'ko' ? 'ko' : 'en';

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          ui.hubTitle,
          path,
          CARDS.map(c => ({ name: cardView(c.slug, lang)?.name ?? c.slug, path: `${path}/${c.slug}` })),
        )}
      />

      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/fortune/card`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <ToolIcon emoji={TAROT_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.majorTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{ui.majorLead}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MAJORS.map(c => {
              const v = cardView(c.slug, lang)!;
              return (
                <Link
                  key={c.slug}
                  href={`${path}/${c.slug}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 hover:shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  <span className="block text-[11px] font-bold text-violet-500 dark:text-violet-400 tabular-nums">{c.number}</span>
                  <span className="block text-sm font-black text-slate-800 dark:text-slate-100 truncate">{v.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.minorTitle}</h2>
        {SUITS.map(suit => (
          <section key={suit} className="mb-8">
            <h3 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-1">
              {ui.suitLabel[suit]}
              <span className="ml-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">
                {ui.elementLabel[SUIT_ELEMENT[suit]]}
              </span>
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.suitTheme[suit]}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cardsOfSuit(suit).map(c => (
                <Link
                  key={c.slug}
                  href={`${path}/${c.slug}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-bold text-slate-800 dark:text-slate-100 truncate hover:shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  {cardView(c.slug, lang)?.name}
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/fortune/card`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
