import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import WireList from '@/components/wire/WireList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CELLS, KNOWN, WIRE_ICON, sizeLabel, sizeSlug, slugOf } from '@/lib/wire/list';
import { BY_AREA, atSize, wireFacts } from '@/lib/wire/facts';
import { WIRE_UI } from '@/lib/wire/ui';

/**
 * 전선 목록 — 굵은 것부터, 두 계열을 단면적으로 섞어 늘어놓는다.
 */
export default function WireHubPage({ lang }: { lang: Lang }) {
  const ui = WIRE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/wire`;
  const base = localeOfLang(lang);
  const notes: [string, string][] = [
    [ui.awgTitle, ui.awgNote],
    [ui.roundTitle, ui.roundNote],
    [ui.heatTitle, ui.heatNote],
    [ui.dropTitle, ui.dropNote],
    [ui.twinTitle, ui.twinNote],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, CELLS.map(c => ({ name: `${sizeLabel(c.size)} · ${c.amp}A`, path: `${path}/${slugOf(c)}` })))}
      />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-600" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/wire" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600">
            <ToolIcon emoji={WIRE_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        {notes.map(([title, note]) => (
          <section key={title} className="mb-6">
            <h2 className="sec-h2-tight">{title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{note}</p>
          </section>
        ))}

        <section className="mb-4 mt-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="note-xs">{ui.reachLabel} · {ui.systemName('eu')}</p>
        </section>

        {BY_AREA.map(size => {
          const f = wireFacts({ size, amp: 10 });
          return (
            <section key={sizeSlug(size)} className="mb-6">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
                {sizeLabel(size)}
                <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500 tabular-nums">{f.area}mm² · {f.safeAmp}A</span>
                {KNOWN[sizeSlug(size)] && <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">{ui.knownName(KNOWN[sizeSlug(size)])}</span>}
              </h3>
              <WireList cells={atSize(size)} path={path} />
            </section>
          );
        })}

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
            <Link key={l.lang} href={`${l.prefix}/wire`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
