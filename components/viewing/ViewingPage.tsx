import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import ViewingList from '@/components/viewing/ViewingList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/viewing/list';
import { atInch, atResolution, viewingFacts } from '@/lib/viewing/facts';
import { VIEWING_UI } from '@/lib/viewing/ui';

export default function ViewingPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = viewingFacts(c);
  const ui = VIEWING_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/viewing`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.widthLabel, `${f.width} cm`],
    [ui.heightLabel, `${f.height} cm`],
    [ui.smpteLabel, `${f.smpte} cm`],
    [ui.thxLabel, `${f.thx} cm`],
    [ui.limitLabel, `${f.limit} cm`],
    ...(f.worth === null ? [] : ([[ui.worthLabel, `${f.worth} cm`]] as [string, string][])),
    [ui.pixelLabel, `${f.pixels} × ${f.lines}`],
    [ui.ppiLabel, `${f.ppi}`],
  ];

  const near = [f.smaller, f.bigger].filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${c.inch}" ${ui.resName(c.res)}`, path },
        ])}
      />

      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-blue-700 to-sky-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name tabular-nums">{c.inch}&quot; {ui.resName(c.res).split(' ')[0]}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/viewing/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-blue-400 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300 tabular-nums">{c.inch}&quot; · {ui.resName(c.res).split(' ')[0]}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.smpte}</div>
          <div className="mt-1 text-sm font-bold text-blue-700 dark:text-blue-300 tabular-nums">cm · THX {f.thx}cm</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
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
          <h2 className="sec-h2-tight">{ui.limitTitle}</h2>
          <p className="note-xs">{ui.limitNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.worthTitle}</h2>
          <p className="note-xs">{ui.worthNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <ViewingList cells={near.map(n => ({ inch: n.inch, res: n.res }))} path={hub} name={ui.resName} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.inchRowTitle}</h2>
          <ViewingList cells={atInch(c.inch)} path={hub} name={ui.resName} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.resRowTitle}</h2>
          <ViewingList cells={atResolution(c.res)} path={hub} name={ui.resName} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.roomTitle}</h2>
          <p className="note-xs">{ui.roomNote}</p>
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
            <Link key={l.lang} href={`${l.prefix}/viewing/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
