import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FractionBar from '@/components/fraction/FractionBar';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { fractionOf, slugOf } from '@/lib/fraction/list';
import { fractionFacts, nearby, sameDenominator } from '@/lib/fraction/facts';
import { FRACTION_UI } from '@/lib/fraction/ui';

/**
 * 분수 한 장 — 분자와 분모에서 나온 것만 싣는다.
 *
 * 큰 카드에 분수와 소수를 나란히 둔다. 이 페이지에 오는 사람의 물음이 대개
 * "이게 소수로 얼마인가" 하나이기 때문이다.
 */
export default function FractionPage({ slug, lang }: { slug: string; lang: Lang }) {
  const fr = fractionOf(slug);
  if (!fr) return null;
  const f = fractionFacts(fr);
  const ui = FRACTION_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/fraction`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const mixed = f.reciprocal.rest === 0 ? String(f.reciprocal.whole) : `${f.reciprocal.whole} ${f.reciprocal.rest}/${f.reciprocal.d}`;

  const rows: [string, string][] = [
    [ui.decimalLabel, ui.dec(f.decimal)],
    [ui.percentLabel, `${ui.dec(f.percent)}%`],
    [ui.ratioLabel, `${f.n} : ${f.d - f.n}`],
    [f.decimal.terminating ? ui.placesLabel : ui.periodLabel, f.decimal.terminating ? String(f.places) : `${f.decimal.period} (${f.periodLength})`],
    [ui.degreesLabel, `${ui.dec(f.degrees)}°`],
    [ui.minutesLabel, ui.dec(f.minutes)],
    [ui.reciprocalLabel, `${f.reciprocal.n}/${f.reciprocal.d} = ${mixed}`],
    [ui.equivalentLabel, f.equivalents.map(e => `${e.n}/${e.d}`).join(', ')],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${f.n}/${f.d}`, path },
        ])}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-lime-600 to-emerald-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{f.n}/{f.d}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/fraction/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 flex w-64 items-center justify-center gap-4 rounded-2xl border-2 border-lime-400 dark:border-lime-700 bg-lime-50 dark:bg-lime-950/40 px-4 py-4 shadow-lg">
          <div className="text-center leading-none">
            <div className="text-3xl font-black text-slate-900 dark:text-slate-100">{f.n}</div>
            <div className="my-1 h-px w-8 bg-slate-400 dark:bg-slate-500" />
            <div className="text-3xl font-black text-slate-900 dark:text-slate-100">{f.d}</div>
          </div>
          <span className="text-2xl font-bold text-slate-400 dark:text-slate-500">=</span>
          <div className="text-2xl font-black text-lime-700 dark:text-lime-300 tabular-nums">{ui.dec(f.decimal)}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{ui.metaTitle(f)}</h1>
          <p className="text-xs font-bold text-lime-700 dark:text-lime-400 mb-2">
            {f.decimal.terminating ? ui.terminatingLabel : ui.repeatingLabel}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        {!f.decimal.terminating && (
          <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {ui.periodNote}
          </p>
        )}

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.barTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.barNote}</p>
          <FractionBar f={fr} />
        </section>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.sameDenomTitle}</h2>
          <div className="flex flex-wrap gap-1.5">
            {sameDenominator(fr).map(o => (
              <Link
                key={slugOf(o)}
                href={`${hub}/${slugOf(o)}`}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-lime-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
              >
                {o.n}/{o.d}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.nearbyTitle}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {nearby(fr).map(o => {
              const g = fractionFacts(o);
              return (
                <Link
                  key={slugOf(o)}
                  href={`${hub}/${slugOf(o)}`}
                  className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm font-black text-lime-700 dark:text-lime-400 tabular-nums shrink-0 w-[52px] text-right">{o.n}/{o.d}</span>
                  <span className="text-sm text-slate-700 dark:text-slate-200 tabular-nums">{ui.dec(g.decimal)}</span>
                  <span className="ml-auto text-[11px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0">{ui.dec(g.percent)}%</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.fractionFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/fraction/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
