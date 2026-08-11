import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { SC_ITEMS, SC_ICON, SC_APPS, scOf } from '@/lib/shortcut/list';
import { scDesc } from '@/lib/shortcut/desc';
import { SC_UI } from '@/lib/shortcut/ui';
import KeyCombo from '@/components/shortcut/KeyCombo';
import LangPicker from '@/components/LangPicker';

/**
 * 단축키 목록 — 열 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 앱마다 표를 둔다. 하는 일과 두 조합을 한 줄에 두는 것이 목록의 값이다 —
 * 이름만 늘어놓으면 이미 아는 사람만 쓸 수 있고, 설명만 늘어놓으면 눌러야 할
 * 키를 찾으려고 낱장을 하나하나 열어야 한다.
 */
export default function ScHubPage({ lang }: { lang: Lang }) {
  const ui = SC_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/shortcut`;
  const base = localeOfLang(lang);
  const n = String(SC_ITEMS.length);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, SC_ITEMS.map(x => ({
          name: `${ui.appLabel[x.app]} ${x.action}`,
          path: `${path}/${x.slug}`,
        })))}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-slate-900 to-sky-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm text-slate-400 dark:text-slate-500 font-medium truncate">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/shortcut" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg bg-gradient-to-br from-slate-900 to-sky-500">
            <ToolIcon emoji={SC_ICON} accent="rgba(255,255,255,0.55)" className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2.5">{ui.hubTitle}</h1>
          <p className="note-sm max-w-xl mx-auto">{ui.hubLead.replace('{n}', n)}</p>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-3 mb-8">
          {ui.hubNotice}
        </p>

        {SC_APPS.map(app => {
          const list = scOf(app);
          if (!list.length) return null;
          return (
            <section key={app} className="mb-9">
              <h2 className="sec-h2 flex items-baseline gap-2">
                {ui.appLabel[app]}
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{list.length}</span>
              </h2>
              <p className="mb-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ui.appNote[app]}</p>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-[11px] font-bold text-slate-400 dark:text-slate-500">
                      <th scope="col" className="text-left px-4 py-2">{ui.actionCol}</th>
                      <th scope="col" className="text-left px-4 py-2 w-2/5">{ui.keysCol}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {list.map(x => (
                      <tr key={x.slug} className="hover:bg-sky-50/50 dark:hover:bg-sky-900/10 transition-colors">
                        <th scope="row" className="text-left px-4 py-3 align-top font-normal">
                          <Link href={`${path}/${x.slug}`} className="block group">
                            <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-700 transition-colors">
                              {x.action}
                            </span>
                            <span className="block mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {scDesc(x.slug, lang)}
                            </span>
                          </Link>
                        </th>
                        <td className="px-4 py-3 align-top">
                          <KeyCombo combo={x.win} size="sm" naLabel={ui.naNote} />
                          {x.win !== x.mac && (
                            <span className="block mt-1.5">
                              <KeyCombo combo={x.mac} size="sm" naLabel={ui.naNote} />
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            <Link key={l.lang} href={`${l.prefix}/shortcut`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
