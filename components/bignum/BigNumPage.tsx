import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import BigNumList from '@/components/bignum/BigNumList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/bignum/list';
import { atFactor, atUnit, bigNumFacts } from '@/lib/bignum/facts';
import { BIGNUM_UI } from '@/lib/bignum/ui';

export default function BigNumPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = bigNumFacts(c);
  const ui = BIGNUM_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/bignum`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.westernLabel, f.western],
    [ui.indianLabel, f.indian],
    [ui.eastLabel, f.east],
    [ui.digitsLabel, `${f.digits}`],
    [ui.valueLabel, `${c.factor} × 10^${f.exp}`],
    ...(f.twins.length ? ([[ui.twinLabel, f.twins.map(t => `${c.factor} ${ui.unitName(t.key)}`).join(', ')]] as [string, string][]) : []),
  ];

  const near = [f.smaller, f.larger].filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${c.factor} ${ui.unitName(c.unit)}`, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-cyan-600 to-sky-400" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate tabular-nums">{c.factor} {ui.unitName(c.unit)}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/bignum/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-full max-w-md rounded-2xl border-2 border-cyan-400 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300 tabular-nums">{c.factor} {ui.unitName(c.unit)}</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums break-all">{f.western}</div>
          <div className="mt-1 text-sm font-bold text-cyan-700 dark:text-cyan-300 tabular-nums">10^{f.exp} · {f.digits}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.metaTitle(f)}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.amountTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {f.amounts.map(a => (
              <li key={a.key} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300">{ui.unitName(a.key)}</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums shrink-0">{a.amount}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.indianTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.indianNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.eastTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.eastNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.neighbourTitle}</h2>
          <BigNumList cells={near.map(n => ({ unit: n.unit, factor: n.factor }))} path={hub} name={ui.unitName} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.unitRowTitle}</h2>
          <BigNumList cells={atUnit(c.unit)} path={hub} name={ui.unitName} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.factorRowTitle}</h2>
          <BigNumList cells={atFactor(c.factor)} path={hub} name={ui.unitName} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.careTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.careNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.cellFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/bignum/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
