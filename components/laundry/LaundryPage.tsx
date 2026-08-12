'use client';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LaundryList from '@/components/laundry/LaundryList';
import LaundrySymbol from '@/components/laundry/LaundrySymbol';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { atFamily, cellOf } from '@/lib/laundry/list';
import { laundryFacts } from '@/lib/laundry/facts';
import { LAUNDRY_UI } from '@/lib/laundry/ui';

export default function LaundryPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = laundryFacts(c);
  const ui = LAUNDRY_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/laundry`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const here = ui.name(f);

  /* 표는 그림에서 읽어 낸 값만 적는다 — 없는 자리는 줄을 아예 두지 않는다 */
  const rows: [string, string][] = [
    [ui.familyLabel, ui.family[f.family]],
    /* 짜기 기호에는 바탕 도형이 없다 — 비틀린 천 하나다 */
    [ui.shapeLabel, f.kind === 'wring' ? ui.twist : ui.shapeName[f.family]],
    [ui.dotsLabel, String(f.dots)],
    [ui.barsLabel, String(f.bars)],
    ...(f.temp !== undefined ? [[ui.tempLabel, `${f.temp} °C`] as [string, string]] : []),
    [ui.notationLabel, ui.notationName[f.notation]],
    [ui.strengthLabel, ui.strengthName[f.strength]],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: here, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-600 to-cyan-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{here}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/laundry/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        {/* 그림이 먼저다 — 라벨을 들고 온 사람은 이름이 아니라 모양으로 찾는다 */}
        <div
          className={`mx-auto mb-5 w-64 rounded-2xl border-2 px-4 py-5 text-center shadow-lg ${
            f.forbidden
              ? 'border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40'
              : 'border-sky-400 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/40'
          }`}
        >
          <LaundrySymbol
            cell={c}
            label={here}
            className={`mx-auto w-24 h-24 ${f.forbidden ? 'text-rose-700 dark:text-rose-300' : 'text-slate-800 dark:text-slate-100'}`}
          />
          <div className="mt-2 text-sm font-bold text-slate-700 dark:text-slate-200">{here}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.meaning(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-6">
          <h2 className="sec-h2-tight">{ui.dotsTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.dotsNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.barsTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.barsNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <LaundryList cells={f.neighbours} path={hub} lang={lang} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.familyRowTitle}</h2>
          <LaundryList cells={atFamily(f.family)} path={hub} lang={lang} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.standardTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.standardNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.cellFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/laundry/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
