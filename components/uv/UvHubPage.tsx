import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import UvList from '@/components/uv/UvList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CELLS, INDEXES, SKINS, UV_ICON, slugOf } from '@/lib/uv/list';
import { atIndex, bandOf, uvFacts } from '@/lib/uv/facts';
import { UV_UI } from '@/lib/uv/ui';

export default function UvHubPage({ lang }: { lang: Lang }) {
  const ui = UV_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/uv`;
  const base = localeOfLang(lang);
  const notes: [string, string][] = [
    [ui.medTitle, ui.medNote],
    [ui.spfTitle, ui.spfNote],
    [ui.bandTitle, ui.bandNote],
    [ui.shadowTitle, ui.shadowNote],
    [ui.careTitle, ui.careNote],
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, CELLS.map(c => ({ name: `UV ${c.uv} · ${ui.skinName(c.skin)}`, path: `${path}/${slugOf(c)}` })))}
      />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-orange-500 to-yellow-400" />

      <header className="page-head">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/uv" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-orange-500 to-yellow-400">
            <ToolIcon emoji={UV_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.hubLead}</p>
        </div>

        {notes.map(([title, note]) => (
          <section key={title} className="mb-6">
            <h2 className="sec-h2-tight">{title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{note}</p>
          </section>
        ))}

        <section className="mb-8 mt-8">
          <h2 className="sec-h2">{ui.skinLabel}</h2>
          <ul className="list-card">
            {SKINS.map(s => (
              <li key={s.key} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300">{ui.skinName(s.key)}</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums shrink-0">{s.med} J/m²</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.burnLabel}</p>
        </section>

        {INDEXES.map(uv => (
          <section key={uv} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2 tabular-nums">
              UV {uv}
              <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">{ui.bandName(bandOf(uv))}</span>
              <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500 tabular-nums">{uvFacts({ uv, skin: 'ii' }).irradiance} W/m²</span>
            </h3>
            <UvList cells={atIndex(uv)} path={path} name={ui.skinName} />
          </section>
        ))}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/uv`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
