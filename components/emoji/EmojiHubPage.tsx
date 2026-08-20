import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { EM_ITEMS, EM_ICON, EM_GROUPS, emojisOf } from '@/lib/emoji/list';
import { emojiDesc } from '@/lib/emoji/desc';
import { EMOJI_UI } from '@/lib/emoji/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 이모지 목록 — 열 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 격자에 글자를 크게 두고 그 아래 사람들이 부르는 이름을 둔다. 목록에서
 * 찾는 방식이 둘이라서다 — 그림을 알고 뜻을 모르는 사람은 글자를 훑고,
 * 뜻만 아는 사람은 이름을 읽는다.
 */
export default function EmojiHubPage({ lang }: { lang: Lang }) {
  const ui = EMOJI_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/emoji`;
  const base = localeOfLang(lang);
  const n = String(EM_ITEMS.length);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(ui.hubTitle, path, EM_ITEMS.map(x => ({
          name: `${x.char} ${x.common}`,
          path: `${path}/${x.slug}`,
        })))}
      />

      <PageGlow accent="amber" />
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
          <span className="text-sm text-slate-500 dark:text-slate-400 font-medium truncate">{ui.section}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route="/emoji" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main id="main" className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mb-7">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={EM_ICON} className="h-5 w-5" /></span>
          <div className="hero-band">
            <PageHero title={ui.hubTitle} desc={ui.hubLead.replace('{n}', n)} />
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3 mb-8">
          {ui.hubNotice}
        </p>

        {EM_GROUPS.map(g => {
          const list = emojisOf(g);
          if (!list.length) return null;
          return (
            <section key={g} className="mb-9">
              <h2 className="sec-h2 flex items-baseline gap-2">
                {ui.groupLabel[g]}
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{list.length}</span>
              </h2>
              <p className="mb-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ui.groupNote[g]}</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {list.map(x => (
                  <Link prefetch={false}
                    key={x.slug}
                    href={`${path}/${x.slug}`}
                    title={emojiDesc(x.slug, lang)}
                    className="group rounded-xl border chip-off px-2 py-3 text-center hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm hover:-translate-y-0.5 transition-all"
                  >
                    <span className="block text-3xl leading-none mb-1.5">{x.char}</span>
                    <span className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 leading-tight group-hover:text-sec transition-colors break-words">
                      {x.common}
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/emoji`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
