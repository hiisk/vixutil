import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SqrtStrip from '@/components/sqrt/SqrtStrip';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { numberOf } from '@/lib/sqrt/list';
import { neighbours, sqrtFacts } from '@/lib/sqrt/facts';
import { SQRT_UI } from '@/lib/sqrt/ui';

/**
 * 제곱근 한 장 — 근호 꼴을 소수보다 위에 둔다.
 *
 * 소수는 반올림한 값이라 답으로 적으면 틀리는 자리가 있다. 정확한 값인 근호
 * 꼴을 크게 두고, 반올림했다는 것을 값 옆에 붙여 둔다.
 */
export default function SqrtPage({ slug, lang }: { slug: string; lang: Lang }) {
  const n = numberOf(slug);
  if (n === undefined) return null;
  const f = sqrtFacts(n);
  const ui = SQRT_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/sqrt`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.valueLabel, f.exact !== null ? String(f.exact) : `≈ ${ui.dec(f.value)}`],
    [ui.radicalLabel, `√${n} = ${f.radical}`],
    [ui.betweenLabel, f.exact !== null ? String(f.exact) : `${f.between[0]} < √${n} < ${f.between[1]}`],
    [ui.squareLabel, `${n}² = ${f.square}`],
    [ui.cbrtLabel, f.cbrtExact !== null ? `∛${n} = ${f.cbrtExact}` : `∛${n} ≈ ${ui.dec(f.cbrt)}`],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `√${n}`, path },
        ])}
      />

      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-600 to-violet-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">√{n}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/sqrt/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-64 rounded-2xl border-2 border-indigo-400 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-lg font-bold text-slate-600 dark:text-slate-300 tabular-nums">√{n} =</div>
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.radical}</div>
          <div className="mt-1 text-sm font-bold text-indigo-700 dark:text-indigo-300 tabular-nums">
            {f.exact !== null ? ui.exactTag : `≈ ${ui.dec(f.value)}`}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{ui.metaTitle(f)}</h1>
          <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mb-2">{f.exact !== null ? ui.exactTag : ui.approxTag}</p>
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

        {f.outside > 1 && (
          <section className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.simplifyTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.simplifyNote}</p>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-center text-sm font-bold text-slate-700 dark:text-slate-200 tabular-nums">
              √{n} = √({f.outside * f.outside} × {f.inside}) = {f.radical}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {neighbours(n).map(o => (
              <Link
                key={o}
                href={`${hub}/${o}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                √{o} = {sqrtFacts(o).radical}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.allTitle}</h2>
          <SqrtStrip path={hub} current={n} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.sqrtFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/sqrt/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
