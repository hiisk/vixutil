import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CARDS, MAJORS, SUITS, SUIT_ELEMENT, TAROT_ICON, cardsOfSuit } from '@/lib/tarot/deck';
import { cardView } from '@/lib/tarot/facts';
import { TAROT_UI } from '@/lib/tarot/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 타로 78장 목록 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 메이저는 번호 순으로 한 줄씩, 마이너는 수트별로 묶는다. 수트마다 무엇을
 * 다루는지 한 줄씩 붙여 두면, 목록만 훑어도 읽는 방법이 눈에 들어온다.
 */
export default function TarotHubPage({ lang }: { lang: Lang }) {
  const ui = TAROT_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/fortune/card`;
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
      <JsonLd
        data={itemListJsonLd(
          ui.hubTitle,
          path,
          CARDS.map(c => ({ name: cardView(c.slug, lang)?.name ?? c.slug, path: `${path}/${c.slug}` })),
        )}
      />

      <PageGlow accent="violet" />
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
            <LangPicker current={localeOfLang(lang)} route={`/fortune/card`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band ">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={TAROT_ICON} className="h-5 w-5" /></span>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.majorTitle}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{ui.majorLead}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MAJORS.map(c => {
              const v = cardView(c.slug, lang)!;
              return (
                <Link prefetch={false}
                  key={c.slug}
                  href={`${path}/${c.slug}`}
                  className="rounded-xl border chip-off px-3 py-2.5 hover:shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  <span className="block text-[11px] font-bold text-violet-500 dark:text-violet-400 tabular-nums">{c.number}</span>
                  <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{v.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <h2 className="sec-h2">{ui.minorTitle}</h2>
        {SUITS.map(suit => (
          <section key={suit} className="mb-8">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">
              {ui.suitLabel[suit]}
              <span className="ml-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {ui.elementLabel[SUIT_ELEMENT[suit]]}
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{ui.suitTheme[suit]}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cardsOfSuit(suit).map(c => (
                <Link prefetch={false}
                  key={c.slug}
                  href={`${path}/${c.slug}`}
                  className="rounded-xl border chip-off px-3 py-2 text-sm font-bold text-slate-800 dark:text-slate-100 truncate hover:shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  {cardView(c.slug, lang)?.name}
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/fortune/card`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
