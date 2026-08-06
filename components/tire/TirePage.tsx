import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TireRims from '@/components/tire/TireRims';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { labelOf, slugOf, tireOf } from '@/lib/tire/list';
import { diameterOf, sameShape, tireFacts } from '@/lib/tire/facts';
import { TIRE_UI } from '@/lib/tire/ui';

/**
 * 규격 한 장 — 치수보다 "바꿔 껴도 되는가"가 먼저다.
 *
 * 외경만 크게 적어 두면 정작 궁금한 것이 남는다. 그래서 3% 안에 드는 규격을
 * 속도계 차이와 함께 표로 세운다.
 */
export default function TirePage({ slug, lang }: { slug: string; lang: Lang }) {
  const t = tireOf(slug);
  if (!t) return null;
  const f = tireFacts(t);
  const ui = TIRE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/tire`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.widthLabel, `${t.width} mm`],
    [ui.aspectLabel, `${t.aspect} %`],
    [ui.rimLabel, `${t.rim} in (${f.rimMm} mm)`],
    [ui.sidewallLabel, `${f.sidewall} mm`],
    [ui.diameterLabel, `${f.diameter} mm (${f.diameterInch} in)`],
    [ui.circumferenceLabel, `${f.circumference} mm`],
    [ui.revsLabel, String(f.revsPerKm)],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: f.label, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-slate-700 to-slate-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{f.label}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/tire/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-4 py-5 text-center shadow-lg">
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-wide tabular-nums">{f.label}</div>
          <div className="mt-1 text-sm font-bold text-slate-600 dark:text-slate-300 tabular-nums">
            {ui.diameterLabel} {f.diameter} mm
          </div>
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
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.altTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.altNote}</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {f.alternatives.map(alt => (
              <Link
                key={alt.slug}
                href={`${hub}/${alt.slug}`}
                className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">{alt.label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums text-right">
                  {alt.diameter} mm · {alt.speedo > 0 ? '+' : ''}{alt.speedo}% {alt.speedo > 0 ? ui.fasterTag : alt.speedo < 0 ? ui.slowerTag : ''}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {sameShape(t).length > 0 && (
          <section className="mb-8">
            <h2 className="sec-h2">{ui.sameShapeTitle}</h2>
            <div className="flex flex-wrap gap-2">
              {sameShape(t).map(o => (
                <Link
                  key={slugOf(o)}
                  href={`${hub}/${slugOf(o)}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  {labelOf(o)} · {diameterOf(o)}mm
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.sameRimTitle}</h2>
          <TireRims path={hub} current={slug} name={ui.rimName} only={t.rim} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.readTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.readNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.tireFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/tire/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
