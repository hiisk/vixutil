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
import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import { idiomText, idiomGloss } from '@/lib/hanja/types';
import { localeHref } from '@/lib/locales';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import type { Idiom } from '@/lib/hanja/types';
import type { FormulaLang } from '@/lib/formula/terms';
import { HANJA_UI, hanjaCategories, HANJA_SECTION, hanjaFaq, idiomHeading, HANJA_LANGS } from '@/lib/hanja-ui';
import LangPicker from '@/components/LangPicker';
import { relatedIdioms } from '@/lib/hanja-tools';

/**
 * 사자성어 상세 — 세 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 네 글자를 한 덩어리로만 보여주면 외울 수밖에 없다. 글자마다 새김을 붙여
 * 쪼개 보여주면 왜 그 뜻이 되는지가 보인다.
 */
export default function HanjaPage({ idiom: i, lang }: { idiom: Idiom; lang: FormulaLang }) {
  const ui = HANJA_UI[lang];
  const t = idiomText(i, lang);
  const s = HANJA_SECTION;
  const homeHref = localeHref(lang, '/hanja');
  const path = localeHref(lang, `/hanja/${i.slug}`);
  const related = relatedIdioms(i.slug);
  const chars = [...i.hanja];
  /*
    새김은 언어마다 쓸모가 다르다. 한국어는 훈음("넉 사")을 그대로 쓰고,
    나머지 언어는 그 글자의 뜻만 한 낱말로 적는다 — 훈음은 우리 방식이라
    다른 언어에서는 읽히지 않는다.
  */
  const glossOf = (n: number): string => idiomGloss(i, lang, n);

  const block = (label: string, body: string) => (
    <div className="mt-3 rounded-2xl border chip-off px-4 py-3.5">
      <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-1.5">{label}</p>
      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{body}</p>
    </div>
  );

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: localeHref(lang, '/hanja') },
          { name: idiomHeading(i, lang), path },
        ])}
      />
      <JsonLd data={webAppJsonLd(idiomHeading(i, lang), t.meaning, path)} />

      <PageGlow accent={s.accent} />
      <div className={`h-1 bg-gradient-to-r ${s.grad}`} />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className={`flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 ${s.linkHover} transition-colors font-medium shrink-0`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href={localeHref(lang, '/hanja')} className={`text-sm text-slate-400 dark:text-slate-500 ${s.linkHover} transition-colors font-medium truncate`}>
            {ui.section}
          </Link>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={`/hanja/${i.slug}`} available={HANJA_LANGS} />
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-3">
            {hanjaCategories(lang)[i.category] ?? i.category}
          </p>
          <div className={`rounded-2xl bg-gradient-to-br ${s.grad} text-white px-6 py-7`}>
            <p className="text-4xl sm:text-5xl font-black tracking-[0.15em]">{i.hanja}</p>
            <p className="text-base font-bold text-white/85 mt-3">{i.reading}</p>
            <p className="text-xs text-white/65 mt-1">{i.pinyin}</p>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-5">
            {idiomHeading(i, lang)}
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {chars.map((ch, n) => (
            <div key={n} className="rounded-xl border chip-off px-2 py-3 text-center">
              <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{ch}</p>
              <p className="mt-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-tight">
                {glossOf(n)}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] text-slate-400 dark:text-slate-500">{ui.charsTitle}</p>

        {block(ui.meaningTitle, t.meaning)}
        {block(ui.originTitle, t.origin)}
        {block(ui.usageTitle, t.usage)}

        <div className="mt-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 overflow-hidden">
          {([[ui.hanjaLabel, i.hanja], [ui.simplified, i.simplified], [ui.reading, i.reading], [ui.pinyin, i.pinyin]] as const).map(([label, value]) => (
            <div key={label} className="flex items-baseline gap-3 px-4 py-2.5 border-b border-slate-200/70 dark:border-slate-700/70 last:border-0">
              <span className="w-20 shrink-0 text-xs font-bold text-slate-400 dark:text-slate-500">{label}</span>
              <span className="flex-1 text-sm font-bold text-slate-800 dark:text-slate-100">{value}</span>
            </div>
          ))}
        </div>

        <Faq items={hanjaFaq(i, lang)} lang={lang} />

        <section className="mt-8" aria-label={ui.related}>
          <h2 className="sec-h2">{ui.related}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link prefetch={false}
                key={r.slug}
                href={localeHref(lang, `/hanja/${r.slug}`)}
                className={`group hub-card ${s.hoverBorder}`}
              >
                <ToolIcon emoji={r.icon} className="hub-card-icon" />
                <span className="hub-card-body">
                  <span className={`hub-card-title ${s.hoverText}`}>
                    {r.hanja}
                    {/* 중국어 표제는 한자(또는 간체)와 글자가 같다 — 그대로 두면 "四面楚歌 四面楚歌"가 된다 */}
                    {idiomHeading(r, lang) !== r.hanja && idiomHeading(r, lang) !== r.simplified && (
                      <span className="font-medium text-slate-500 dark:text-slate-400"> {idiomHeading(r, lang)}</span>
                    )}
                  </span>
                  <span className="hub-card-desc">{idiomText(r, lang).meaning}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9 leading-relaxed">{ui.footNote}</p>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
