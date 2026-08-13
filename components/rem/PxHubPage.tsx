import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import PxTable from '@/components/rem/PxTable';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { PIXELS, PX_ICON } from '@/lib/rem/list';
import { COMMON, wholeRems } from '@/lib/rem/facts';
import { PX_UI } from '@/lib/rem/ui';

/**
 * 단위 목록 — 자주 쓰는 값을 먼저, 전체는 그 아래에.
 *
 * 시안에서 옮겨 적는 값은 대개 정해져 있다. 16·14·24가 맨 앞에 있으면 대부분은
 * 여기서 끝난다.
 */
export default function PxHubPage({ lang }: { lang: Lang }) {
  const ui = PX_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/rem`;
  const base = localeOfLang(lang);
  const head: [string, string, string] = ['px', ui.remLabel, ui.ptLabel];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, PIXELS.map(px => ({ name: `${px}px`, path: `${path}/${px}` })))}
      />

      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-700 to-fuchsia-500" />

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
            <LangPicker current={localeOfLang(lang)} route="/rem" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-violet-700 to-fuchsia-500">
            <ToolIcon emoji={PX_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.commonTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.commonNote}</p>
          <PxTable path={path} pixels={COMMON} head={head} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.remTitle}</h2>
          <p className="note-xs">{ui.remNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.absoluteTitle}</h2>
          <p className="note-xs">{ui.absoluteNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.wholeTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.wholeNote}</p>
          <div className="flex flex-wrap gap-2">
            {wholeRems().map(px => (
              <Link prefetch={false}
                key={px}
                href={`${path}/${px}`}
                className="rounded-xl border border-violet-300 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/40 px-3 py-1.5 text-xs font-bold text-violet-800 dark:text-violet-300 tabular-nums hover:border-violet-500 transition-colors"
              >
                {px}px = {px / 16}rem
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.allTitle}</h2>
          <div className="flex flex-wrap gap-1">
            {PIXELS.map(px => (
              <Link prefetch={false}
                key={px}
                href={`${path}/${px}`}
                className="w-11 rounded-md border chip-off py-1 text-center text-[11px] font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-violet-500 hover:text-violet-700 dark:hover:text-violet-400 transition-colors"
              >
                {px}
              </Link>
            ))}
          </div>
        </section>

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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/rem`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
