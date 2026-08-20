import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import YearDecades from '@/components/year/YearDecades';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { YEAR_ICON } from '@/lib/year/list';
import { longYears, skipped, yearFacts } from '@/lib/year/facts';
import { YEAR_UI } from '@/lib/year/ui';

/**
 * 연도 목록 — 규칙을 먼저 보이고 십 년씩 늘어놓는다.
 *
 * 사람이 이 표에 오는 까닭은 "그 해가 윤년이냐"거나 "무슨 요일이냐"거나
 * "무슨 띠냐"다. 셋 다 규칙에서 나오므로 규칙이 목록보다 앞이다.
 */
export default function YearHubPage({ lang }: { lang: Lang }) {
  const ui = YEAR_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/year`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />

      <PageGlow accent="rose" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/year" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main id="main" className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band ">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={YEAR_ICON} className="h-5 w-5" /></span>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.leapTitle}</h2>
          <p className="note-xs">{ui.leapNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.skippedTitle}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{ui.skippedNote}</p>
          <div className="flex flex-wrap gap-2">
            {skipped().map(y => (
              <span
                key={y}
               
                className="rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 text-xs font-bold text-rose-800 dark:text-rose-300 tabular-nums hover:border-rose-500 transition-colors">
                {y} · {yearFacts(y).days}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.weekTitle}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{ui.weekNote}</p>
          <div className="flex flex-wrap gap-1.5">
            {longYears().map(y => (
              <span
                key={y}
               
                className="rounded-lg border chip-off px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-rose-400 hover:text-rose-700 dark:hover:text-rose-400 transition-colors">
                {y}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.cycleTitle}</h2>
          <p className="note-xs">{ui.cycleNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.decadeTitle}</h2>
          <YearDecades name={ui.decadeName} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/year`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
