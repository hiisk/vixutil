import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import RebarList from '@/components/rebar/RebarList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/rebar/list';
import { atBar, atLength, rebarFacts } from '@/lib/rebar/facts';
import { REBAR_UI, barName, fmtNum } from '@/lib/rebar/ui';

export default function RebarPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = rebarFacts(c);
  const ui = REBAR_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/rebar`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const here = `${barName(c.d)} ${c.length}m`;
  const n = (x: number) => fmtNum(lang, x);

  const rows: [string, string][] = [
    [ui.barLabel, barName(c.d)],
    [ui.lengthLabel, `${c.length} m`],
    [ui.diameterLabel, `${n(f.bar.mm)} mm`],
    [ui.areaLabel, `${n(f.area)} mm²`],
    [ui.unitLabel, `${n(f.unit)} kg/m`],
    [ui.perBarLabel, `${n(f.perBar)} kg`],
    [ui.perHundredLabel, `${n(f.perHundred)} kg`],
    [ui.perTonLabel, `${f.barsPerTon}`],
    [ui.lapLabel, `${n(f.lapMetres)} m · ${n(f.lapWeight)} kg`],
    [ui.orderLabel, `${n(f.orderPerHundred)} kg`],
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

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-600 to-yellow-400" />

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
            <LangPicker current={localeOfLang(lang)} route={`/rebar/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-amber-400 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{here}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{n(f.perBar)} kg</div>
          <div className="mt-1 text-sm font-bold text-amber-700 dark:text-amber-300 tabular-nums">{n(f.unit)} kg/m</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            ⌀ {n(f.bar.mm)} mm · {n(f.area)} mm²
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.nominalTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.nominalNote}</p>
          {/* 맞는 값과 틀리는 값을 나란히 — 어느 지름을 넣었는지가 두 줄의 차이다 */}
          <ul className="list-card">
            <li className="flex items-baseline justify-between gap-3 px-4 py-2.5">
              <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                ⌀ {n(f.bar.mm)} mm · {n(f.area)} mm²
              </span>
              <span className="cell-num shrink-0">{n(f.unit)} kg/m</span>
            </li>
            <li className="flex items-baseline justify-between gap-3 px-4 py-2.5 text-slate-400 dark:text-slate-500">
              <span className="text-sm tabular-nums">⌀ {c.d} mm</span>
              <span className="text-sm font-bold tabular-nums shrink-0 line-through">{n(f.nameUnit)} kg/m</span>
            </li>
          </ul>
        </section>

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
          <RebarList cells={f.neighbours.map(x => ({ d: x.d, length: x.length }))} path={hub} lang={lang} by="both" />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.barRowTitle}</h2>
          <RebarList cells={atBar(c.d)} path={hub} lang={lang} by="length" current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.lengthRowTitle}</h2>
          <RebarList cells={atLength(c.length)} path={hub} lang={lang} by="bar" current={slug} />
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
            <Link key={l.lang} href={`${l.prefix}/rebar/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
