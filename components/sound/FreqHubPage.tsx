import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { FREQS, FREQ_ICON, FREQ_RANGES, freqSlug, freqsOfRange } from '@/lib/sound/freqs';
import { freqFacts } from '@/lib/sound/facts';
import { SOUND_UI } from '@/lib/sound/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 주파수 목록 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 113가지를 한 줄로 늘어놓으면 못 찾는다. 사람이 소리를 갈라 듣는 방식대로
 * 저음·중음·고음으로 나누고, 줄마다 음이름과 파장을 함께 적어 목록에서
 * 이미 견줄 수 있게 한다.
 */
export default function FreqHubPage({ lang }: { lang: Lang }) {
  const ui = SOUND_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/sound/hz`;
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
          FREQS.map(f => ({ name: `${f.hz} Hz`, path: `${path}/${freqSlug(f.hz)}` })),
        )}
      />

      <PageGlow accent="emerald" />
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
            <LangPicker current={localeOfLang(lang)} route={`/sound/hz`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-sec-soft">
            <ToolIcon emoji={FREQ_ICON} className="w-7 h-7" />
          </div>
          <h1 className="page-h1">{ui.hubTitle}</h1>
          <p className="note-sm">{ui.hubLead}</p>
        </div>

        <p className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-xs text-amber-800 dark:text-amber-200 leading-relaxed mb-8">
          {ui.safety}
        </p>

        {FREQ_RANGES.map(range => {
          const list = freqsOfRange(range);
          if (list.length === 0) return null;
          return (
            <section key={range} className="mb-8">
              <h2 className="sec-h2">
                {ui.rangeLabel[range]}
                <span className="ml-1.5 text-xs font-bold text-slate-400 dark:text-slate-500">{list.length}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {list.map(x => {
                  const f = freqFacts(x);
                  return (
                    <Link prefetch={false}
                      key={x.hz}
                      href={`${path}/${freqSlug(x.hz)}`}
                      className="rounded-xl border chip-off px-3 py-2.5 hover:shadow-sm hover:-translate-y-0.5 transition-all"
                    >
                      <span className="block text-sm font-black text-slate-800 dark:text-slate-100 tabular-nums">{x.hz} Hz</span>
                      <span className="block text-[11px] text-slate-400 dark:text-slate-500 tabular-nums truncate">
                        {f.note} · {f.wavelengthLabel}
                      </span>
                    </Link>
                  );
                })}
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
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/sound/hz`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
