import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { BAND_HEX } from '@/components/resistor/ResistorBands';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { DECADES, E24, RESISTOR_ICON, VALUES } from '@/lib/resistor/list';
import { DIGIT_COLORS, SERIES, resistorFacts } from '@/lib/resistor/facts';
import { RESISTOR_UI } from '@/lib/resistor/ui';

/**
 * 저항 목록 — 색과 숫자의 대응을 먼저 보이고, 자릿수별로 스물넷씩 늘어놓는다.
 *
 * 색이 곧 숫자라는 것만 알면 나머지는 읽을 수 있으므로, 그 표를 맨 위에 둔다.
 */
export default function ResistorHubPage({ lang }: { lang: Lang }) {
  const ui = RESISTOR_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/resistor`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, VALUES.map(v => ({ name: resistorFacts(v).display, path: `${path}/${v}` })))}
      />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-500 to-yellow-400" />

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
            <LangPicker current={localeOfLang(lang)} route="/resistor" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-amber-500 to-yellow-400">
            <ToolIcon emoji={RESISTOR_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-9">
          <h2 className="sec-h2-tight">{ui.bandTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.bandNote}</p>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5">
            {DIGIT_COLORS.map((c, i) => (
              <div key={c} className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1.5">
                <span className="h-4 w-4 shrink-0 rounded-[3px] border border-black/10" style={{ backgroundColor: BAND_HEX[c] }} />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate">{ui.colorLabel[c]}</span>
                <span className="ml-auto text-xs font-black text-slate-400 dark:text-slate-500 tabular-nums">{i}</span>
              </div>
            ))}
          </div>
          <p className="note-xs mt-3">
            <span className="font-bold">{ui.readTitle}</span> · {ui.readNote}
          </p>
        </section>

        <section className="mb-9">
          <h2 className="sec-h2">{ui.seriesLabel}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {SERIES.map(s => (
              <div key={s} className="px-4 py-3 bg-white dark:bg-slate-900">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{ui.seriesName[s]}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">{ui.seriesNote[s]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <h2 className="sec-h2-tight">{ui.decadeTitle}</h2>
          <p className="note-xs">{ui.decadeNote}</p>
        </section>

        {DECADES.map(d => (
          <section key={d} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              {resistorFacts(E24[0] * d).display} – {resistorFacts(E24[E24.length - 1] * d).display}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {E24.map(v => {
                const f = resistorFacts(v * d);
                return (
                  <Link prefetch={false}
                    key={v}
                    href={`${path}/${v * d}`}
                    className="rounded-lg border chip-off px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    {f.code}
                  </Link>
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/resistor`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
