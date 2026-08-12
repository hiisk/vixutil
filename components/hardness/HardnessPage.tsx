import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import HardnessList from '@/components/hardness/HardnessList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { ppmOf } from '@/lib/hardness/list';
import { WRMG_EDGES, atBand, hardnessFacts, valueOf } from '@/lib/hardness/facts';
import { HARDNESS_UI, fmtNum } from '@/lib/hardness/ui';

export default function HardnessPage({ slug, lang }: { slug: string; lang: Lang }) {
  const ppm = ppmOf(slug);
  if (ppm === undefined) return null;
  const f = hardnessFacts(ppm);
  const ui = HARDNESS_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/hardness`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const here = `${ppm} ppm`;
  const n = (x: number) => fmtNum(lang, x);

  const rows: [string, string][] = [
    [ui.bandLabel, ui.bandNames[f.band]],
    [ui.wrmgLabel, ui.wrmgNames[f.wrmgBand]],
    [ui.doubleLabel, `${f.doublePpm} ppm`],
    [ui.halfLabel, `${n(f.halfPpm)} ppm`],
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
      <div className="h-1 bg-gradient-to-r from-sky-700 to-cyan-400" />

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
            <LangPicker current={localeOfLang(lang)} route={`/hardness/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-sky-400 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{ui.bandNames[f.band]}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{ppm} ppm</div>
          <div className="mt-1 text-sm font-bold text-sky-700 dark:text-sky-300 tabular-nums">
            {n(valueOf(f, 'dh'))} °dH · {n(valueOf(f, 'gpg'))} gpg
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            {n(valueOf(f, 'fh'))} °fH · {n(valueOf(f, 'e'))} °e · {n(valueOf(f, 'mmol'))} mmol/L
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        {/* 여섯 단위를 한 자리에 — 나라를 옮겨 다니는 사람이 찾는 것이 이 표다 */}
        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {f.values.map(u => (
            <div key={u.key} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{ui.unitNames[u.key]}</dt>
              <dd className="cell-num text-right break-all">{n(u.value)} {u.symbol}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.bandTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.bandNote}</p>
          {/* 같은 물에 두 기준이 서로 다른 이름을 붙이는 것을 나란히 보인다 */}
          <ul className="list-card">
            {rows.map(([k, val]) => (
              <li key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300">{k}</span>
                <span className="cell-num shrink-0">{val}</span>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-3 px-4 py-2.5 text-slate-400 dark:text-slate-500">
              <span className="text-sm">WRMG</span>
              <span className="text-sm font-bold tabular-nums shrink-0">
                {WRMG_EDGES.map(e => `${n(e.dh)} °dH`).join(' · ')}
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <HardnessList ppms={f.neighbours.map(s => ppmOf(s)!)} path={hub} lang={lang} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.bandNames[f.band]}</h2>
          <HardnessList ppms={atBand(f.band)} path={hub} lang={lang} current={slug} />
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
            <Link key={l.lang} href={`${l.prefix}/hardness/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
