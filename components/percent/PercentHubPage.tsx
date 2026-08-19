import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { PERCENTS, BASES } from '@/lib/percent/list';
import { percentFacts } from '@/lib/percent/facts';
import { PERCENT_UI } from '@/lib/percent/ui';

/** 자주 쓰는 기준수 — 목록 맨 위에 이 줄부터 깐다 */
const COMMON_BASES = [100, 200, 500, 1000, 10000];

/**
 * 퍼센트 목록 — 1,200칸을 늘어놓기 전에 자주 쓰는 줄부터 보인다.
 *
 * 사람이 여기 오는 까닭은 대개 "100의 몇 %"나 "1000의 몇 %"다. 그 다섯 줄을
 * 위에 두고, 전체 기준수는 그 아래에 눈금처럼 깐다.
 */
export default function PercentHubPage({ lang }: { lang: Lang }) {
  const ui = PERCENT_UI[lang];
  const num = ui.num;
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const path = `${prefix}/percent`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([
        { name: ui.home, path: homeHref },
        { name: ui.section, path },
      ])} />

      <PageGlow accent="sky" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-sky-600 shrink-0">{ui.home}</Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={base} route="/percent" available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">{ui.hubTitle}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.hubLead}</p>

        {COMMON_BASES.map(b => (
          <section key={b} className="mt-6">
            <h2 className="sec-h2">{ui.byPercentTitle(percentFacts(PERCENTS[0], b))}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {PERCENTS.map(p => (
                <span key={p}
                  className="chip-v">
                  {p}% → {num(percentFacts(p, b).value)}
                </span>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-8">
          <h2 className="sec-h2">{ui.byBaseTitle(percentFacts(10, BASES[0]))}</h2>
          <div className="flex flex-wrap gap-1.5">
            {BASES.map(b => (
              <span key={b}
                className="chip-v">
                {num(b)}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => <li key={h} className="cell-note">{h}</li>)}
          </ul>
        </section>

        <Faq items={ui.hubFaq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/percent`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
