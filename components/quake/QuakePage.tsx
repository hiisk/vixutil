import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import QuakeList from '@/components/quake/QuakeList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { magnitudeOf } from '@/lib/quake/list';
import { around, atTenth, quakeFacts } from '@/lib/quake/facts';
import { QUAKE_UI } from '@/lib/quake/ui';

export default function QuakePage({ slug, lang }: { slug: string; lang: Lang }) {
  const m = magnitudeOf(slug);
  if (m === undefined) return null;
  const f = quakeFacts(m);
  const ui = QUAKE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/quake`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.magnitudeLabel, m.toFixed(2)],
    [ui.energyLabel, `${ui.bigNumber(f.logJoule)} J`],
    [ui.tntLabel, `${Math.round(f.tntTons).toLocaleString()} t`],
    [ui.hiroshimaLabel, f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)],
    [ui.stepLabel, `×${f.stepRatio}`],
    [ui.perLowerLabel, `${f.perOneLower}`],
  ];

  const near = [f.lower, f.higher].filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `M ${m.toFixed(2)}`, path },
        ])}
      />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-rose-800 to-orange-400" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate tabular-nums">M {m.toFixed(2)}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/quake/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300 tabular-nums">{ui.magnitudeLabel}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{m.toFixed(2)}</div>
          <div className="mt-1 text-sm font-bold text-rose-700 dark:text-rose-300 tabular-nums">TNT {Math.round(f.tntTons).toLocaleString()} t</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
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
          <h2 className="sec-h2-tight">{ui.logTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.logNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.amplitudeTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.amplitudeNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <QuakeList magnitudes={near.map(n => n.magnitude)} path={hub} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.tenthTitle}</h2>
          <QuakeList magnitudes={atTenth(m)} path={hub} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.tableTitle}</h2>
          <QuakeList magnitudes={around(m)} path={hub} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.intensityTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.intensityNote}</p>
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
            <Link key={l.lang} href={`${l.prefix}/quake/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
