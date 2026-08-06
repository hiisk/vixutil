import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import CableList from '@/components/cable/CableList';
import CableSpecTable from '@/components/cable/CableSpecTable';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/cable/list';
import { atRate, atResolution, cableFacts } from '@/lib/cable/facts';
import { CABLE_UI } from '@/lib/cable/ui';

export default function CablePage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = cableFacts(c);
  const ui = CABLE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/cable`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.rateLabel, `${c.hz} Hz`],
    [ui.pixelLabel, `${f.w} × ${f.h}`],
    [ui.rawLabel, `${f.raw8} Gbps`],
    [ui.raw10Label, `${f.raw10} Gbps`],
    [ui.lowestLabel, f.lowest ? ui.specName(f.lowest) : ui.noneLabel],
  ];

  const near = [f.slower, f.faster].filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${ui.resName(c.res)} ${c.hz}Hz`, path },
        ])}
      />

      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-700 to-violet-400" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate tabular-nums">{ui.resName(c.res).split(' ')[0]} {c.hz}Hz</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/cable/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-indigo-400 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300 tabular-nums truncate">{ui.resName(c.res)} · {c.hz}Hz</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.raw8}</div>
          <div className="mt-1 text-sm font-bold text-indigo-700 dark:text-indigo-300 tabular-nums">Gbps · {f.lowest ? ui.specName(f.lowest) : ui.noneLabel}</div>
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
          <h2 className="sec-h2">{ui.usedLabel}</h2>
          <CableSpecTable specs={f.specs} name={ui.specName} verdictName={ui.verdictName} />
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.encodingNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.blankingTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.blankingNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.dscTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.dscNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <CableList cells={near.map(n => ({ res: n.res, hz: n.hz }))} path={hub} name={ui.resName} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.resRowTitle}</h2>
          <CableList cells={atResolution(c.res)} path={hub} name={ui.resName} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.rateRowTitle}</h2>
          <CableList cells={atRate(c.hz)} path={hub} name={ui.resName} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.cableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.cableNote}</p>
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
            <Link key={l.lang} href={`${l.prefix}/cable/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
