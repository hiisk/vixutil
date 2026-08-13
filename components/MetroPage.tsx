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
import ToolIcon from '@/components/ToolIcon';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import MetroGame from '@/components/metro/MetroGame';
import { LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { countryName, lineCopy, lineIcon, lineTitle, type MetroLine } from '@/lib/metro/types';
import { METRO_LANGS, metroPrefix, type MetroLang } from '@/lib/metro/lang';
import { METRO_UI } from '@/lib/metro/ui';
import { relatedLines } from '@/lib/metro-lines';
import { lineFacts } from '@/lib/metro/facts';
import LangPicker from '@/components/LangPicker';

/**
 * 지하철 노선 상세 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 게임이 위, 읽을 거리가 아래다. 검색으로 들어온 사람은 이 노선이 어떤
 * 노선인지부터 알고 싶어 하므로 소개와 힌트를 게임 아래에 문장으로 둔다.
 *
 * 푸터와 FAQ 컴포넌트는 ko·en 두 언어만 아니까, 나머지 여섯 언어는 영어 쪽을
 * 준다 — 그 언어로 실제 페이지가 있는 섹션이 아직 지하철뿐이기 때문이다.
 */
export default function MetroPage({ line, lang }: { line: MetroLine; lang: MetroLang }) {
  const ui = METRO_UI[lang];
  const t = lineCopy(line, lang);
  const prefix = metroPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/metro`;
  const path = `${prefix}/metro/${line.slug}`;
  const related = relatedLines(line.slug);
  const title = lineTitle(line, lang);
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);

  const faq = [
    ...ui.lineFaq(lineFacts(line, lang)),
    { q: ui.howTitle, a: ui.how.join(' ') },
    { q: `${title} — ${ui.hint}`, a: t.hint },
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/metro` },
          { name: title, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(title, t.intro, path)} />

      <PageGlow accent="indigo" />
      <div className="h-1" style={{ background: line.color }} />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href={`${prefix}/metro`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/metro/${line.slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg"
            style={{ background: line.color }}
          >
            <ToolIcon emoji={lineIcon(line)} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1.5">{title}</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
            {countryName(line.city, lang)} · {ui.stationCount(line.stations.length)}
            {line.loop ? ` · ${ui.loopNote}` : ''}
          </p>
          <p className="note-sm max-w-xl mx-auto">{t.intro}</p>
        </div>

        <MetroGame line={line} lang={lang} />

        <section className="mt-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={faq} lang={base} title={ui.faqTitle} />

        <section className="mt-8" aria-label={ui.related}>
          <h2 className="sec-h2">{ui.related}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link prefetch={false}
                key={r.slug}
                href={`${prefix}/metro/${r.slug}`}
                className="group hub-card hover:shadow-sm transition-all"
              >
                <span className="w-2.5 h-8 rounded-full shrink-0" style={{ background: r.color }} />
                <span className="hub-card-body">
                  <span className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                    {lineTitle(r, lang)}
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {countryName(r.city, lang)} · {ui.stationCount(r.stations.length)}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <nav className="foot-nav" aria-label="Language">
          {METRO_LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false}
              key={l.lang}
              href={`${l.prefix}/metro/${line.slug}`}
              hrefLang={l.hreflang}
              className="dim-link"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
