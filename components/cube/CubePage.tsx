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
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import CubeTop from '@/components/cube/CubeTop';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { CUBE_ICON, algOf, algsOfStep } from '@/lib/cube/list';
import { caseFacts, diagram } from '@/lib/cube/facts';
import { reverseAlg } from '@/lib/cube/sim';
import { CUBE_UI } from '@/lib/cube/ui';
import LangPicker from '@/components/LangPicker';

/** 이웃 여덟 개 — 같은 단계 안에서 앞뒤로 자른다 */
function siblings(slug: string) {
  const item = algOf(slug)!;
  const all = algsOfStep(item.step);
  const i = all.findIndex(a => a.slug === slug);
  const from = Math.max(0, Math.min(i - 4, all.length - 9));
  return all.slice(from, from + 9).filter(a => a.slug !== slug);
}

/**
 * 공식 한 장 — 그림 하나, 공식 한 줄, 역순 한 줄.
 *
 * 큐브를 손에 들고 보는 화면이라 공식이 가장 크고, 나머지는 아래로 내린다.
 */
export default function CubePage({ slug, lang }: { slug: string; lang: Lang }) {
  const item = algOf(slug);
  if (!item) return null;
  const f = caseFacts(item);
  const ui = CUBE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/game/cube`;
  const path = `${hub}/${slug}`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);
  const faq = ui.caseFaq(f);

  const rows: [string, string][] = [
    [ui.stepTitle, ui.stepLabel[item.step]],
    ...(f.shape ? ([[ui.shapeTitle, `${ui.shapeLabel[f.shape]} · ${ui.moveCount(f.moves)}`]] as [string, string][]) : []),
    ...(f.moving ? ([[ui.movingTitle, `${ui.movingLabel[f.moving]} · ${ui.moveCount(f.moves)}`]] as [string, string][]) : []),
    ...(f.place ? ([[ui.placeTitle, `${ui.placeLabel[f.place]} · ${ui.moveCount(f.moves)}`]] as [string, string][]) : []),
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: item.label, path },
        ])}
      />

      <PageGlow accent="amber" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{item.label}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/game/cube/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-sec-soft">
            <ToolIcon emoji={CUBE_ICON} className="w-7 h-7" />
          </div>
          <PageHero title={item.label} desc={ui.desc(f)} />
        </div>

        <div className="rounded-2xl border chip-off p-4 mb-4">
          <CubeTop state={diagram(f)} slot={item.step === 'f2l'} label={item.label} className="w-full max-w-[220px] mx-auto" />
        </div>

        <div className="rounded-2xl border-2 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 px-4 py-4 mb-4">
          <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400 mb-1">{ui.algLabel}</div>
          <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 font-mono leading-snug break-words">{item.alg}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={v} className="row-pair">
              <dt className="row-label">{k}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 text-right">{v}</dd>
            </div>
          ))}
          <div className="row-pair">
            <dt className="row-label">{ui.reverseLabel}</dt>
            <dd className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono text-right break-words">{reverseAlg(item.alg)}</dd>
          </div>
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.siblingTitle}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {siblings(slug).map(o => {
              const of_ = caseFacts(o);
              return (
                <Link prefetch={false}
                  key={o.slug}
                  href={`${hub}/${o.slug}`}
                  className="rounded-2xl border chip-off p-2.5 hover:border-amber-400 hover:shadow-md transition-all"
                >
                  <CubeTop state={diagram(of_)} slot={o.step === 'f2l'} label={o.label} className="w-full max-w-[84px] mx-auto" />
                  <div className="mt-1.5 text-center text-[11px] font-black text-slate-700 dark:text-slate-200">{o.label}</div>
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
            <Link prefetch={false} key={x.lang} href={`${x.prefix}/game/cube/${slug}`} hrefLang={x.hreflang} className="dim-link">
              {x.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
