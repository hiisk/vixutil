import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { scoreOf } from '@/lib/darts/list';
import { dartsFacts, neighbours } from '@/lib/darts/facts';
import { DARTS_UI } from '@/lib/darts/ui';

/**
 * 남은 점수 한 장 — 수순을 다트 세 개로 그린다.
 *
 * 표에서 한 줄을 찾아 읽는 것과, 던질 순서를 그대로 보는 것은 다르다.
 * 이 페이지에 오는 사람은 지금 판 앞에 서 있다.
 */
export default function DartsPage({ slug, lang }: { slug: string; lang: Lang }) {
  const score = scoreOf(slug);
  if (!score) return null;
  const f = dartsFacts(score);
  const ui = DARTS_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/darts`;
  const path = `${hub}/${score}`;
  const base = localeOfLang(lang);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: String(score), path },
        ])}
      />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-red-600 to-rose-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{score}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/darts/${score}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-48 rounded-full border-4 border-red-500 dark:border-red-700 bg-red-50 dark:bg-red-950/40 py-8 text-center shadow-lg">
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-none tabular-nums">{score}</div>
          <div className="mt-2 text-xs font-bold text-red-700 dark:text-red-300">{ui.dartsLabel(f.darts)}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.metaTitle(f)}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.desc(f)}</p>
        </div>

        {f.bogey ? (
          <p className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-800 dark:text-amber-200 leading-relaxed mb-8">
            <span className="font-bold">{ui.bogeyTitle}</span> · {ui.bogeyNote}
          </p>
        ) : (
          <section className="mb-8">
            <h2 className="sec-h2">{ui.routeLabel}</h2>
            <div className="flex flex-wrap items-stretch gap-2">
              {f.route.map((t, i) => (
                <div
                  key={i}
                  className="flex min-w-[84px] flex-1 flex-col items-center rounded-2xl border-2 border-red-300 dark:border-red-800 bg-white dark:bg-slate-900 px-3 py-3"
                >
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">{i + 1}</span>
                  <span className="text-xl font-black text-red-700 dark:text-red-400">{t.label}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{ui.ringLabel[t.ring]} · {t.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mt-3">
              {ui.routeCountLabel}: {f.routeCount}
            </p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.ruleTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.ruleNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.boardTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.boardNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {neighbours(score).map(o => {
              const g = dartsFacts(o);
              return (
                <Link
                  key={o}
                  href={`${hub}/${o}`}
                  className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm font-black text-red-700 dark:text-red-400 tabular-nums shrink-0 w-[36px] text-right">{o}</span>
                  <span className="text-sm text-slate-700 dark:text-slate-200 truncate">{g.route.map(t => t.label).join(' · ') || ui.bogeyTitle}</span>
                  <span className="ml-auto text-[11px] text-slate-400 dark:text-slate-500 shrink-0">{ui.dartsLabel(g.darts)}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.scoreFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/darts/${score}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
