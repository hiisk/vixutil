import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import ResistorBands from '@/components/resistor/ResistorBands';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { valueOf } from '@/lib/resistor/list';
import { neighbours, resistorFacts, sameDecade } from '@/lib/resistor/facts';
import { RESISTOR_UI } from '@/lib/resistor/ui';

/**
 * 저항 한 장 — 값 하나에서 나온 것만 싣는다.
 *
 * 띠를 두 벌 그린다. 네 띠와 다섯 띠는 같은 값을 다르게 적은 것뿐인데, 실물을
 * 손에 들고 세는 사람에게는 그 둘을 구별하는 것이 첫 관문이다.
 */
export default function ResistorPage({ slug, lang }: { slug: string; lang: Lang }) {
  const ohms = valueOf(slug);
  if (!ohms) return null;
  const f = resistorFacts(ohms);
  const ui = RESISTOR_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/resistor`;
  const path = `${hub}/${ohms}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.valueLabel, `${f.ohms} Ω`],
    [ui.codeLabel, f.code],
    [ui.band4Label, f.bands4.map(c => ui.colorLabel[c]).join(' · ')],
    [ui.band5Label, f.bands5.map(c => ui.colorLabel[c]).join(' · ')],
    [ui.multiplierLabel, `×10${'⁰¹²³⁴⁵⁶⁷⁸⁹'[f.exp]}`],
    [ui.toleranceLabel, `±${f.tolerance}%`],
    [ui.rangeLabel, `${f.min} – ${f.max} Ω`],
    [ui.seriesLabel, f.inSeries.map(s => ui.seriesName[s]).join(' · ')],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: f.display, path },
        ])}
      />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-500 to-yellow-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{f.display}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/resistor/${ohms}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <ResistorBands bands={f.bands4} />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{ui.metaTitle(f)}</h1>
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">{ui.seriesName[f.series]}</p>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.band5Label}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.bandNote}</p>
          <ResistorBands bands={f.bands5} />
        </section>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 cell-note mb-8">
          <span className="font-bold">{ui.readTitle}</span> · {ui.readNote}
        </p>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.sameDecadeTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.decadeNote}</p>
          <div className="flex flex-wrap gap-1.5">
            {sameDecade(ohms).map(o => (
              <Link
                key={o}
                href={`${hub}/${o}`}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                {resistorFacts(o).display}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {neighbours(ohms).map(o => {
              const g = resistorFacts(o);
              return (
                <Link
                  key={o}
                  href={`${hub}/${o}`}
                  className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm font-black text-amber-700 dark:text-amber-400 shrink-0 w-[70px] text-right">{g.display}</span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">{g.code}</span>
                  <span className="cell-cut">{g.bands4.slice(0, 3).map(c => ui.colorLabel[c]).join(' · ')}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.valueFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/resistor/${ohms}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
