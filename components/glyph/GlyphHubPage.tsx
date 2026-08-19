import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import CopyGlyph from '@/components/glyph/CopyGlyph';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { GLYPHS, GLYPH_ICON, GLYPH_KINDS, glyphsOfKind } from '@/lib/glyph/list';
import { GLYPH_UI } from '@/lib/glyph/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 특수문자 목록 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 여기서 바로 복사되는 것이 중요하다. 글자를 누르러 왔는데 상세 페이지로
 * 한 번 더 들어가야 한다면 목록이 제 몫을 못 하는 것이다.
 */
export default function GlyphHubPage({ lang }: { lang: Lang }) {
  const ui = GLYPH_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/text/char`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd data={itemListJsonLd(ui.hubTitle, path, GLYPHS.map(g => ({ name: g.char, path: `${path}/${g.slug}` })))} />

      <PageGlow accent="sky" />
      <div className="h-1 topbar" />

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
            <LangPicker current={localeOfLang(lang)} route={`/text/char`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band ">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={GLYPH_ICON} className="h-5 w-5" /></span>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        {GLYPH_KINDS.map(kind => (
          <section key={kind} className="mb-8">
            <h2 className="sec-h2-tight">
              {ui.kindLabel[kind]}
              <span className="ml-1.5 text-xs font-bold text-slate-400 dark:text-slate-500">{glyphsOfKind(kind).length}</span>
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.kindNote[kind]}</p>
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
              {glyphsOfKind(kind).map(g => (
                <CopyGlyph key={g.slug} char={g.char} copyLabel={ui.copyLabel} copiedLabel={ui.copiedLabel} size="sm" />
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {glyphsOfKind(kind).map(g => (
                <Link prefetch={false}
                  key={g.slug}
                  href={`${path}/${g.slug}`}
                  className="text-[11px] font-bold text-slate-300 dark:text-slate-600 hover:text-cyan-600 transition-colors"
                  aria-label={`${g.char} ${ui.unicodeLabel}`}
                >
                  {g.char}
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-8">
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/text/char`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
