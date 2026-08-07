import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import TimesGrid from '@/components/times/TimesGrid';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { productOf, slugOf } from '@/lib/times/list';
import { neighbours, timesFacts } from '@/lib/times/facts';
import { TIMES_UI } from '@/lib/times/ui';

/**
 * 곱셈 한 칸 — 답 하나와 그 답이 나온 길.
 *
 * 곱만 크게 적어 두면 표를 한 줄 옮긴 것과 같다. 나누기로 되돌리는 식과 앞뒤
 * 칸을 함께 두면 "왜 그 값인가"가 남는다.
 */
export default function TimesPage({ slug, lang }: { slug: string; lang: Lang }) {
  const p = productOf(slug);
  if (!p) return null;
  const f = timesFacts(p);
  const ui = TIMES_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/times`;
  const canonical = slugOf(p);
  const path = `${hub}/${canonical}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.productLabel, String(f.product)],
    [ui.swappedLabel, `${f.b} × ${f.a} = ${f.product}`],
    [ui.divisionLabel, f.divisions.join(' · ')],
    ...(f.repeated ? ([[ui.repeatedLabel, f.repeated]] as [string, string][]) : []),
    ...(f.before !== undefined ? ([[ui.beforeLabel, `${f.a} × ${f.b - 1} = ${f.before}`]] as [string, string][]) : []),
    ...(f.after !== undefined ? ([[ui.afterLabel, `${f.a} × ${f.b + 1} = ${f.after}`]] as [string, string][]) : []),
    [ui.otherPairsLabel, f.otherPairs.length ? f.otherPairs.map(o => `${o.a} × ${o.b}`).join(' · ') : ui.noneLabel],
    [ui.squareLabel, f.square ? ui.yes : ui.no],
    [ui.evenLabel, f.even ? ui.yes : ui.no],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${f.a} × ${f.b}`, path },
        ])}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-teal-600 to-emerald-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{f.a} × {f.b}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/times/${canonical}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-64 rounded-2xl border-2 border-teal-400 dark:border-teal-700 bg-teal-50 dark:bg-teal-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-lg font-bold text-slate-600 dark:text-slate-300 tabular-nums">{f.a} × {f.b} =</div>
          <div className="text-6xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.product}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{ui.metaTitle(f)}</h1>
          <p className="text-xs font-bold text-teal-700 dark:text-teal-400 mb-2">{ui.tableName(f.a)}</p>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {neighbours(p).map(o => (
              <Link
                key={slugOf(o)}
                href={`${hub}/${slugOf(o)}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                {o.a} × {o.b} = {o.a * o.b}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.gridTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.gridNote}</p>
          <TimesGrid path={hub} current={p} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.productFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/times/${canonical}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
