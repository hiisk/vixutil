import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { ERR_ITEMS, ERR_ICON, ERR_CATEGORIES, errsOf } from '@/lib/errmsg/list';
import { errDesc } from '@/lib/errmsg/desc';
import { ERR_UI } from '@/lib/errmsg/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 오류 목록 — 열 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 문구를 그대로 크게 두고 그 아래 한 줄 설명을 둔다. 사람들이 찾는 방식이 하나뿐
 * 이라서다 — 자기가 본 문구와 눈으로 맞춰 본다. 그래서 문구를 줄이거나 다듬지
 * 않고, 등폭 글꼴로 원문 그대로 싣는다.
 */
export default function ErrHubPage({ lang }: { lang: Lang }) {
  const ui = ERR_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/error`;
  const base = localeOfLang(lang);
  const n = String(ERR_ITEMS.length);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd data={itemListJsonLd(ui.hubTitle, path, ERR_ITEMS.map(x => ({ name: x.message, path: `${path}/${x.slug}` })))} />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-rose-800 to-rose-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm text-slate-400 dark:text-slate-500 font-medium truncate">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/error" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg bg-gradient-to-br from-rose-800 to-rose-400">
            <ToolIcon emoji={ERR_ICON} accent="rgba(255,255,255,0.55)" className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2.5">{ui.hubTitle}</h1>
          <p className="note-sm max-w-xl mx-auto">{ui.hubLead.replace('{n}', n)}</p>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/20 px-4 py-3 mb-8">
          {ui.hubNotice}
        </p>

        {ERR_CATEGORIES.map(cat => {
          const list = errsOf(cat);
          if (!list.length) return null;
          return (
            <section key={cat} className="mb-9">
              <h2 className="sec-h2 flex items-baseline gap-2">
                {ui.catLabel[cat]}
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{list.length}</span>
              </h2>
              <p className="mb-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ui.catNote[cat]}</p>
              <div className="flex flex-col gap-2">
                {list.map(x => (
                  <Link prefetch={false}
                    key={x.slug}
                    href={`${path}/${x.slug}`}
                    className="group rounded-xl border chip-off px-4 py-3 hover:border-rose-300 hover:shadow-sm transition-all"
                  >
                    <span className="block text-[13px] font-black text-slate-800 dark:text-slate-100 font-mono group-hover:text-rose-700 transition-colors break-words">
                      {x.message}
                    </span>
                    <span className="block mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {errDesc(x.slug, lang)}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/error`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
