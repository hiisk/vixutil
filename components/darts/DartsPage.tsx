'use client';
/*
 * ── 왜 클라이언트 컴포넌트인가 (2026-08-13) ──────────────────
 * 서버 컴포넌트가 그린 마크업은 **요청마다 두 번** 나간다 — 브라우저가 볼 HTML과,
 * 그 옆에 인라인으로 붙는 RSC 짐(직렬화된 트리)이다. 클래스 문자열까지 두 번
 * 실린다. 재 보니 낱장 한 장에서 RSC 짐이 61%였고 보이는 글자는 6%였다.
 *
 * Hobby의 Fast Origin Transfer 한도가 30일에 10GB인데, 주소 20만 개를 한 번 훑는
 * 데만 6GB가 들어 사이트가 실제로 멈췄다(한도의 348%).
 *
 * 마크업을 클라이언트 컴포넌트로 옮기면 그 마크업은 **캐시되는 JS 묶음**으로
 * 가고, 요청마다 넘어가는 것은 props(slug·lang) 둘뿐이다. HTML은 그대로 서버에서
 * 그려지므로 크롤러가 읽는 내용은 하나도 줄지 않는다. 게다가 JS는 Fast Data
 * Transfer(한도 100GB, 여유 많음)로 세어지고 크롤러는 애초에 받아 가지 않는다.
 *
 * 실측: /laundry 낱장이 gzip 27.8KB → 14.0KB (RSC 61% → 17%).
 */
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
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: String(score), path },
        ])}
      />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-red-600 to-rose-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{score}</span>
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
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
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
            <p className="note-xs mt-3">
              {ui.routeCountLabel}: {f.routeCount}
            </p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.ruleTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.ruleNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.boardTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.boardNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {neighbours(score).map(o => {
              const g = dartsFacts(o);
              return (
                <Link prefetch={false}
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
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.scoreFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/darts/${score}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
