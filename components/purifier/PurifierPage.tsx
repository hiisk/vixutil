import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PurifierList from '@/components/purifier/PurifierList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/purifier/list';
import { atArea, atCadr, purifierFacts } from '@/lib/purifier/facts';
import { PURIFIER_UI } from '@/lib/purifier/ui';

const TONE: Record<string, string> = {
  ample: 'border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40',
  enough: 'border-cyan-400 bg-cyan-50 dark:border-cyan-700 dark:bg-cyan-950/40',
  tight: 'border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/40',
  short: 'border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-950/40',
};

export default function PurifierPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = purifierFacts(c);
  const ui = PURIFIER_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/purifier`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const pair = `${ui.areaText(f)} · CADR ${f.cadr}`;

  const rows: [string, string][] = [
    [ui.areaLabel, ui.areaText(f)],
    [ui.volumeLabel, `${f.volume} ㎥`],
    [ui.cadrLabel, `${f.cadr} ㎥/min`],
    [ui.achLabel, `${f.ach}`],
    [ui.halfLabel, `${f.halfMinutes} ${ui.minuteWord}`],
    [ui.tenthLabel, `${f.tenthMinutes} ${ui.minuteWord}`],
    [ui.neededLabel, `${f.needed} ㎥/min`],
    ...(f.shortfall > 0 ? ([[ui.shortfallLabel, `${f.shortfall} ㎥/min`]] as [string, string][]) : []),
    [ui.coversLabel, `${f.coversSqm} ㎡`],
    ...(f.pick ? ([[ui.pickLabel, `${f.pick} ㎥/min`]] as [string, string][]) : []),
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd data={breadcrumbJsonLd([{ name: ui.home, path: homeHref }, { name: ui.section, path: hub }, { name: pair, path }])} />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-cyan-800 to-sky-400" />

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
            <LangPicker current={localeOfLang(lang)} route={`/purifier/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className={`mx-auto mb-5 w-72 rounded-2xl border-2 px-4 py-5 text-center shadow-lg ${TONE[f.grade]}`}>
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300 truncate tabular-nums">{pair}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.ach}</div>
          <div className="mt-1 text-sm font-bold text-slate-700 dark:text-slate-200">ACH · {ui.gradeName(f.grade)}</div>
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
          <h2 className="sec-h2-tight">{ui.decayTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.decayNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.areaRowTitle}</h2>
          <PurifierList cells={atArea(c.area)} path={hub} areaWord={ui.pyeongWord} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.cadrRowTitle}</h2>
          <PurifierList cells={atCadr(c.cadr)} path={hub} areaWord={ui.pyeongWord} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.adTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.adNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.ruleTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.ruleNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => <li key={h} className="cell-note">{h}</li>)}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.limitTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.limitNote}</p>
        </section>

        <Faq items={ui.cellFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/purifier/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
