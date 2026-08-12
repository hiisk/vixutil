import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import DpiList from '@/components/dpi/DpiList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CELLS, DPI_ICON, GAMES, REF_DPI, pairsFrom, pointsOf } from '@/lib/dpi/list';
import { REF_CM, dpiFacts, shownSens } from '@/lib/dpi/facts';
import { DPI_UI, cellName, fmtNum } from '@/lib/dpi/ui';

export default function DpiHubPage({ lang }: { lang: Lang }) {
  const ui = DPI_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/dpi`;
  const base = localeOfLang(lang);
  const n = (x: number) => fmtNum(lang, x);
  const notes: [string, string][] = [
    [ui.formulaTitle, ui.formulaNote],
    [ui.edpiTitle, ui.edpiNote],
    [ui.convertTitle, ui.convertNote],
    [ui.targetTitle, ui.targetNote],
    [ui.limitTitle, ui.limitNote],
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
        data={itemListJsonLd(ui.hubTitle, path, CELLS.map(c => ({
          name: cellName(lang, dpiFacts(c)),
          path: `${path}/${c.slug}`,
        })))}
      />

      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-500 to-fuchsia-400" />

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
            <LangPicker current={localeOfLang(lang)} route="/dpi" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-violet-500 to-fuchsia-400">
            <ToolIcon emoji={DPI_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
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

        <section className="mb-6">
          <h2 className="sec-h2-tight">{ui.aimTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.aimNote}</p>
          <Link href={`${prefix}/game/aim`} className="mt-2 inline-block text-sm font-bold text-violet-700 dark:text-violet-300 hover:underline">
            {ui.aimLink}
          </Link>
        </section>

        <section className="mb-4 mt-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="note-xs">{ui.refDpiNote}</p>
        </section>

        {/* 게임마다 두 줄 — 나가는 변환 일곱과 DPI 아홉이 128칸 전부다 */}
        {GAMES.map(g => (
          <section key={g.slug} className="mb-8">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2 tabular-nums">
              {g.name}
              <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500 tabular-nums">
                {ui.yawLabel} {n(g.yaw)} · {REF_CM} cm/360° {n(shownSens(g.yaw, REF_DPI, REF_CM))}
              </span>
            </h3>
            <p className="note-xs mb-1.5">{ui.pairRowTitle}</p>
            <DpiList cells={pairsFrom(g.slug)} path={path} lang={lang} by="to" />
            <p className="note-xs mt-3 mb-1.5">{ui.pointRowTitle}</p>
            <DpiList cells={pointsOf(g.slug)} path={path} lang={lang} by="dpi" />
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
            <Link key={l.lang} href={`${l.prefix}/dpi`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
