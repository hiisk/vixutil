import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { FRACTION_ICON, slugOf } from '@/lib/fraction/list';
import { DENOMINATORS, fractionFacts, fractionsOfDenominator, terminates } from '@/lib/fraction/facts';
import { FRACTION_UI } from '@/lib/fraction/ui';

/**
 * 분수 목록 — 분모별로 묶는다.
 *
 * 분모가 이 섹션의 뼈대다. 소수가 딱 떨어지는지 순환하는지가 분모 하나로
 * 정해지므로, 분모로 묶어 놓으면 목록 자체가 그 규칙을 보여 준다.
 */
export default function FractionHubPage({ lang }: { lang: Lang }) {
  const ui = FRACTION_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/fraction`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />

      <PageGlow accent="emerald" />
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
            <LangPicker current={localeOfLang(lang)} route="/fraction" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main id="main" className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band ">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={FRACTION_ICON} className="h-5 w-5" /></span>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-6">
          <h2 className="sec-h2-tight">{ui.denominatorTitle}</h2>
          <p className="note-xs">{ui.denominatorNote}</p>
        </section>

        {DENOMINATORS.map(d => (
          <section key={d} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              /{d}
              <span className="ml-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {terminates(d) ? ui.terminatingLabel : ui.repeatingLabel}
              </span>
            </h3>
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {fractionsOfDenominator(d).map(f => {
                const g = fractionFacts(f);
                return (
                  <span
                    key={slugOf(f)}
                   
                    className="flex items-baseline gap-3 px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <span className="text-sm font-bold text-lime-700 dark:text-lime-400 tabular-nums shrink-0 w-[52px] text-right">{f.n}/{f.d}</span>
                    <span className="text-sm text-slate-700 dark:text-slate-200 tabular-nums">{ui.dec(g.decimal)}</span>
                    <span className="ml-auto text-[11px] text-slate-500 dark:text-slate-400 tabular-nums shrink-0">{ui.dec(g.percent)}%</span>
                  </span>
                );
              })}
            </div>
          </section>
        ))}

        <section className="mt-8">
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/fraction`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
