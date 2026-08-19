import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CMD_ITEMS, CMD_ICON, CMD_CATEGORIES, cmdsOf } from '@/lib/cmd/list';
import { cmdDesc } from '@/lib/cmd/desc';
import { CMD_UI } from '@/lib/cmd/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 명령어 목록 — 열 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 갈래마다 명령 이름과 한 줄 설명을 나란히 둔다. 목록만 훑어도 "무엇을 쓰는
 * 명령인지"가 보여야 한다 — 이름만 늘어놓으면 이미 아는 사람만 쓸 수 있다.
 */
export default function CmdHubPage({ lang }: { lang: Lang }) {
  const ui = CMD_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/cmd`;
  const base = localeOfLang(lang);
  const n = String(CMD_ITEMS.length);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd data={itemListJsonLd(ui.hubTitle, path, CMD_ITEMS.map(x => ({ name: x.name, path: `${path}/${x.slug}` })))} />

      <PageGlow accent="indigo" />
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
          <span className="text-sm text-slate-400 dark:text-slate-500 font-medium truncate">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/cmd" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg bg-sec-soft">
            <ToolIcon emoji={CMD_ICON} className="w-8 h-8" />
          </div>
          <div className="hero-band">
            <PageHero title={ui.hubTitle} desc={ui.hubLead.replace('{n}', n)} />
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-3 mb-8">
          {ui.hubNotice}
        </p>

        {CMD_CATEGORIES.map(cat => {
          const list = cmdsOf(cat);
          if (!list.length) return null;
          return (
            <section key={cat} className="mb-9">
              <h2 className="sec-h2 flex items-baseline gap-2">
                {ui.catLabel[cat]}
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{list.length}</span>
              </h2>
              <p className="mb-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ui.catNote[cat]}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {list.map(x => (
                  <Link prefetch={false}
                    key={x.slug}
                    href={`${path}/${x.slug}`}
                    className="group rounded-xl border chip-off px-4 py-3 hover:border-indigo-300 hover:shadow-sm transition-all"
                  >
                    <span className="block text-sm font-black text-slate-800 dark:text-slate-100 font-mono group-hover:text-indigo-700 transition-colors break-all">
                      {x.name}
                    </span>
                    <span className="block mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {cmdDesc(x.slug, lang)}
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/cmd`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
