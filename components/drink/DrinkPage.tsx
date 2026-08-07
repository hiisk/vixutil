import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import DrinkList from '@/components/drink/DrinkList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/drink/list';
import { atAbv, atVolume, drinkFacts } from '@/lib/drink/facts';
import { DRINK_UI } from '@/lib/drink/ui';

export default function DrinkPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = drinkFacts(c);
  const ui = DRINK_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/drink`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const pair = `${f.abv}% · ${f.ml}ml`;

  const rows: [string, string][] = [
    [ui.abvLabel, `${f.abv}%`],
    [ui.mlLabel, `${f.ml} ml`],
    [ui.pureLabel, `${f.pureMl} ml`],
    [ui.gramsLabel, `${f.grams} g`],
    [ui.ukLabel, `${f.ukUnits}`],
    [ui.whoLabel, `${f.whoDrinks}`],
    [ui.usLabel, `${f.usDrinks}`],
    [ui.kcalLabel, `${f.kcal} kcal`],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd data={breadcrumbJsonLd([{ name: ui.home, path: homeHref }, { name: ui.section, path: hub }, { name: pair, path }])} />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-900 to-amber-400" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate tabular-nums">{pair}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/drink/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-amber-400 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300 truncate tabular-nums">
            {pair}{f.landmark ? ` · ${ui.landmarkName(f.landmark)}` : ''}
          </div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.grams} g</div>
          <div className="mt-1 text-sm font-bold text-amber-800 dark:text-amber-300 tabular-nums">
            UK {f.ukUnits} · WHO {f.whoDrinks} · US {f.usDrinks}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
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
          <h2 className="sec-h2-tight">{ui.countryTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.countryNote}</p>
        </section>

        {f.twin && (
          <section className="mb-8">
            <h2 className="sec-h2">{ui.twinTitle}</h2>
            <DrinkList cells={[cellOf(f.twin)!]} path={hub} />
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.twinNote}</p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.abvRowTitle}</h2>
          <DrinkList cells={atAbv(c.abv)} path={hub} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.mlRowTitle}</h2>
          <DrinkList cells={atVolume(c.ml)} path={hub} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.volumeDefTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.volumeDefNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.kcalTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.kcalNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => <li key={h} className="cell-note">{h}</li>)}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.guideTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.guideNote}</p>
        </section>

        <Faq items={ui.cellFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/drink/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
