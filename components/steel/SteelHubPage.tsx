import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import SteelList from '@/components/steel/SteelList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CELLS, FORMULA, SHAPES, STEEL_ICON, atShape, sizeOf, slugOf } from '@/lib/steel/list';
import { STEEL_UI } from '@/lib/steel/ui';
import { REBAR_UI } from '@/lib/rebar/ui';

export default function SteelHubPage({ lang }: { lang: Lang }) {
  const ui = STEEL_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/steel`;
  const base = localeOfLang(lang);
  const notes: [string, string][] = [
    [ui.densityTitle, ui.densityNote],
    [ui.formulaTitle, ui.formulaNote],
    [ui.hollowTitle, ui.hollowNote],
    [ui.excludedTitle, ui.excludedNote],
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
          name: `${ui.shapeLabel[c.shape]} ${sizeOf(c)}`,
          path: `${path}/${slugOf(c)}`,
        })))}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-slate-600 to-sky-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/steel" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-slate-600 to-sky-400">
            <ToolIcon emoji={STEEL_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
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
          <p className="note-xs">{ui.unitLabel}</p>
        </section>

        {/* 형상마다 한 줄 — 이름 옆에 단면적 식을 붙여, 표가 아니라 식으로 읽히게 둔다 */}
        {SHAPES.map(shape => (
          <section key={shape} className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
              {ui.shapeLabel[shape]}
              <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500 tabular-nums">
                {FORMULA[shape]}
              </span>
            </h3>
            <SteelList cells={atShape(shape)} path={path} lang={lang} by="size" />
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

        {/*
          철근은 같은 밀도에서 나오는 다른 표다 — 이형철근은 공칭지름이 규격으로
          따로 정해져 있어 여기 형상 축에 넣을 수 없고, 그쪽에 제 섹션이 있다.
          이름표는 REBAR_UI에서 가져온다: 가리키는 페이지가 제 언어로 쓰는 이름과
          늘 같아진다.
        */}
        <section className="mb-8 mt-8">
          <h2 className="sec-h2">{ui.relatedTitle}</h2>
          <Link prefetch={false}
            href={`${prefix}/rebar`}
            className="block rounded-xl border chip-off px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-sky-400 transition-colors"
          >
            {REBAR_UI[lang].section}
          </Link>
        </section>

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/steel`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
