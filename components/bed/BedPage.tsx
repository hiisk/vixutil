import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import BedList from '@/components/bed/BedList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/bed/list';
import { atBed, atRoom, bedFacts } from '@/lib/bed/facts';
import { BED_UI } from '@/lib/bed/ui';

export default function BedPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = bedFacts(c);
  const ui = BED_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/bed`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.sizeLabel, `${f.width} × ${f.length} mm`],
    [ui.areaLabel, `${f.area} m²`],
    [ui.perPersonLabel, `${f.perPerson} mm`],
    [ui.roomLabel, `${c.room} mm`],
    [ui.gapLabel, `${f.gap} mm`],
    [ui.wallGapLabel, `${f.wallGap} mm`],
    [ui.fitLabel, ui.fitName(f.fit)],
    ...(f.twin ? ([[ui.twinLabel, `${ui.bedName(f.twin.key)} ${f.twin.diff > 0 ? '+' : ''}${f.twin.diff} mm`]] as [string, string][]) : []),
  ];

  const near = [f.smaller, f.larger].filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${ui.bedName(c.bed)} ${c.room}`, path },
        ])}
      />

      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-violet-700 to-fuchsia-400" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate tabular-nums">{ui.bedName(c.bed)} · {c.room}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/bed/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-violet-400 dark:border-violet-700 bg-violet-50 dark:bg-violet-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300 truncate">{ui.bedName(c.bed)} · {c.room} mm</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.gap}</div>
          <div className="mt-1 text-sm font-bold text-violet-700 dark:text-violet-300 tabular-nums">mm · {ui.fitName(f.fit)}</div>
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
          <h2 className="sec-h2">{ui.roomRowTitle}</h2>
          <BedList cells={atRoom(c.room)} path={hub} name={ui.bedName} current={slug} />
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.nameNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.walkTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.walkNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.personTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.personNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <BedList cells={near.map(n => ({ bed: n.bed, room: n.room }))} path={hub} name={ui.bedName} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.bedRowTitle}</h2>
          <BedList cells={atBed(c.bed)} path={hub} name={ui.bedName} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.ksTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.ksNote}</p>
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
            <Link key={l.lang} href={`${l.prefix}/bed/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
