import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { IMG_SIZES, IMG_SIZE_ICON, SIZE_KINDS, sizesOfKind } from '@/lib/imgsize/list';
import { sizeFacts } from '@/lib/imgsize/facts';
import { IMG_SIZE_UI } from '@/lib/imgsize/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 이미지 크기 목록 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 줄마다 픽셀과 화면비를 함께 적는다. 대개는 목록에서 숫자만 보고 가므로,
 * 상세로 들어가지 않아도 답이 보여야 한다.
 */
export default function SizeHubPage({ lang }: { lang: Lang }) {
  const ui = IMG_SIZE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/image/size`;
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
      <JsonLd data={itemListJsonLd(ui.hubTitle, path, IMG_SIZES.map(x => ({ name: x.name, path: `${path}/${x.slug}` })))} />

      <PageGlow accent="rose" />
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
            <LangPicker current={localeOfLang(lang)} route={`/image/size`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main id="main" className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band ">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={IMG_SIZE_ICON} className="h-5 w-5" /></span>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        {SIZE_KINDS.map(kind => (
          <section key={kind} className="mb-8">
            <h2 className="sec-h2-tight">
              {ui.kindLabel[kind]}
              <span className="ml-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">{sizesOfKind(kind).length}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{ui.kindNote[kind]}</p>
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {sizesOfKind(kind).map(x => {
                const f = sizeFacts(x);
                return (
                  <Link prefetch={false}
                    key={x.slug}
                    href={`${path}/${x.slug}`}
                    className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{x.name}</span>
                    <span className="text-right shrink-0">
                      <span className="block text-sm font-bold text-pink-600 dark:text-pink-400 tabular-nums">{x.w}×{x.h}</span>
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400">{f.ratioLabel}</span>
                    </span>
                  </Link>
                );
              })}
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/image/size`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
