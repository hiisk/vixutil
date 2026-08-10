import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FilamentList from '@/components/filament/FilamentList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/filament/list';
import { atMaterial, atSpool, filamentFacts } from '@/lib/filament/facts';
import { FILAMENT_UI, kgOf, materialName } from '@/lib/filament/ui';

export default function FilamentPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = filamentFacts(c);
  const ui = FILAMENT_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/filament`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const here = `${materialName(c.material)} ${kgOf(c.grams)}`;
  const d175 = f.diameters[0];

  const rows: [string, string][] = [
    [ui.materialLabel, materialName(c.material)],
    [ui.spoolLabel, kgOf(c.grams)],
    [ui.densityLabel, `${f.density} g/cm³`],
    [ui.gramsPerMetreLabel, `${d175.gramsPerMetre} g`],
    [ui.per10gLabel, `${d175.metresPer10g} m`],
    [ui.volumeLabel, `${f.volume} cm³`],
  ];

  const near = [f.denser, f.lighter, f.bigger, f.smaller]
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: here, path },
        ])}
      />

      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-500 to-fuchsia-400" />

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
            <LangPicker current={localeOfLang(lang)} route={`/filament/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-violet-400 dark:border-violet-700 bg-violet-50 dark:bg-violet-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{here}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{d175.metres} m</div>
          <div className="mt-1 text-sm font-bold text-violet-700 dark:text-violet-300">⌀ {d175.diameter} mm</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            {ui.densityLabel} {f.density} g/cm³
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.lengthLabel}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.diameterNote}</p>
          <ul className="list-card">
            {f.diameters.map(d => (
              <li key={d.diameter} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                  ⌀ {d.diameter} mm · {d.gramsPerMetre} g/m
                </span>
                <span className="cell-num shrink-0">{d.metres} m</span>
              </li>
            ))}
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
          <FilamentList cells={near.map(n => ({ material: n.material, grams: n.grams }))} path={hub} by="spool" />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.materialRowTitle}</h2>
          <FilamentList cells={atMaterial(c.material)} path={hub} by="spool" current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.spoolRowTitle}</h2>
          <FilamentList cells={atSpool(c.grams)} path={hub} by="material" current={slug} />
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
            <Link key={l.lang} href={`${l.prefix}/filament/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
