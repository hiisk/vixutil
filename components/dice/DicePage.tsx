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
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SumBars from '@/components/dice/SumBars';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { DICE_ICON, rollOf } from '@/lib/dice/list';
import { neighbourSums, rollFacts, similarOdds } from '@/lib/dice/facts';
import { DICE_UI } from '@/lib/dice/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 굴림 한 장 — 분포 그림 하나와 숫자 여섯 개.
 *
 * 확률만 적으면 감이 오지 않는다. 몇 번에 한 번인지, 이 값 이상이 얼마나
 * 자주 나오는지까지 있어야 판단이 선다.
 */
export default function DicePage({ slug, lang }: { slug: string; lang: Lang }) {
  const r = rollOf(slug);
  if (!r) return null;
  const f = rollFacts(r);
  const ui = DICE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/random/dice`;
  const path = `${hub}/${slug}`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);
  const faq = ui.rollFaq(f);
  const title = `${f.dice}d6 = ${f.sum}`;

  // 표에 적는 숫자도 글과 같은 소수점 기호를 쓴다 — 독일어는 12,5%다
  const n = ui.fmt;
  const rows: [string, string][] = [
    [ui.waysLabel, `${n(f.ways)} / ${n(f.total)}`],
    [ui.percentLabel, `${n(f.percent)}%`],
    [ui.oneInLabel, n(f.oneIn)],
    [ui.atLeastLabel, `${n(f.atLeast)}%`],
    [ui.atMostLabel, `${n(f.atMost)}%`],
    [ui.meanLabel, n(f.mean)],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: title, path },
        ])}
      />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-rose-600 to-orange-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{title}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/random/dice/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-rose-600 to-orange-500">
            <ToolIcon emoji={DICE_ICON} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{title}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <div className="rounded-2xl border-2 border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 px-4 py-4 mb-4 text-center">
          <div className="text-[11px] font-bold text-rose-700 dark:text-rose-400 mb-1">{ui.percentLabel}</div>
          <p className="text-3xl font-black text-slate-900 dark:text-slate-100 tabular-nums">{n(f.percent)}%</p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 mb-4">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2 px-1">{ui.curveTitle}</div>
          <SumBars curve={f.curve} active={f.sum} label={`${title} ${ui.curveTitle}`} className="w-full" />
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400">{k}</dt>
              <dd className="text-sm font-black text-slate-800 dark:text-slate-100 tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {neighbourSums(slug).map(o => {
              const of_ = rollFacts(o);
              return (
                <Link
                  key={o.slug}
                  href={`${hub}/${o.slug}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors tabular-nums"
                >
                  {of_.sum} · {n(of_.percent)}%
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.similarTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.similarNote}</p>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {similarOdds(slug).map(o => {
              const of_ = rollFacts(o);
              return (
                <Link
                  key={o.slug}
                  href={`${hub}/${o.slug}`}
                  className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm font-black text-rose-700 dark:text-rose-400 font-mono shrink-0 w-[86px] tabular-nums">{of_.dice}d6 = {of_.sum}</span>
                  <span className="text-sm text-slate-700 dark:text-slate-200 tabular-nums">{n(of_.percent)}%</span>
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

        <Faq items={faq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(x => x.lang !== lang).map(x => (
            <Link key={x.lang} href={`${x.prefix}/random/dice/${slug}`} hrefLang={x.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {x.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
