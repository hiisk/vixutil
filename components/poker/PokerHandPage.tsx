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
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import Cards from '@/components/poker/Cards';
import HandGrid from '@/components/poker/HandGrid';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { HANDS, handOf, labelOf } from '@/lib/poker/list';
import { handFacts } from '@/lib/poker/facts';
import { fill, numFmt, pokerUi } from '@/lib/poker/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 시작 핸드 한 장 — 카드 두 장과 그 핸드에서 나오는 숫자들.
 *
 * 숫자는 전부 조합에서 나온다. 확률표를 옮겨 적지 않으므로 표가 바뀌어도
 * 문장과 어긋날 자리가 없다.
 */
export default function PokerHandPage({ slug, lang }: { slug: string; lang: Lang }) {
  const h = handOf(slug);
  if (!h) return null;
  const f = handFacts(h);
  const ui = pokerUi(lang);
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/game/poker`;
  const path = `${hub}/${slug}`;
  // 바닥글과 FAQ 제목은 그 언어 그대로 — 중국어 페이지에 영어 바닥글이 붙지 않게 한다
  const base = localeOfLang(lang);
  const n = HANDS.length;
  const pct = numFmt(lang, f.dealtPct, 3);
  const oneIn = numFmt(lang, f.oneIn, 1);

  const rows: [string, string][] = [
    [ui.combos, fill(ui.combosOf, { n: f.combos })],
    [ui.dealt, `${pct}%`],
    [ui.oneInLabel, fill(ui.oneIn, { n: oneIn })],
    [ui.score, String(f.score)],
    [ui.rankLabel, fill(ui.rankValue, { n: f.rank, total: n })],
    [ui.gapLabel, fill(ui.gapValue, { n: f.gap })],
    [ui.connected, f.connected ? ui.yes : ui.no],
    [ui.broadway, f.broadway ? ui.yes : ui.no],
  ];

  const faq = [
    { q: fill(ui.q1, { name: f.label }), a: fill(ui.a1, { combos: f.combos, pct, oneIn }) },
    { q: ui.q2, a: `${ui.kind[f.kind]} — ${ui.kindNote[f.kind]}` },
    { q: ui.q3, a: fill(ui.a3, { score: f.score, rank: f.rank, n, tier: ui.tier[f.tier] }) },
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: f.label, path },
        ])}
      />

      <PageGlow accent="emerald" />
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
          <span className="row-name">{f.label}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/game/poker/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main id="main" className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mb-5">
          <Cards cards={f.cards} kind={f.kind} />
        </div>

        <div className="mb-6">
          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">{ui.kind[f.kind]} · {ui.tier[f.tier]}</p>
          <div className="hero-band">
            <PageHero title={f.label} desc={ui.tierNote[f.tier]} />
          </div>
        </div>

        <dl className="rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="row-pair">
              <dt className="row-label">{k}</dt>
              <dd className="cell-num text-right">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.flopTitle}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{ui.flopNote}</p>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {f.flop.filter(x => x.pct > 0).map(x => (
              <div key={x.key} className="flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
                <span className="text-sm text-slate-600 dark:text-slate-300 shrink-0 w-40 truncate">{ui.flop[x.key]}</span>
                <span className="relative h-2 flex-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-emerald-500"
                    style={{ width: `${Math.min(100, x.pct)}%` }}
                  />
                </span>
                <span className="cell-num shrink-0 w-16 text-right">
                  {numFmt(lang, x.pct)}%
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.score}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3">
            {ui.scoreNote}
          </p>
        </section>

        {f.siblings.length > 0 && (
          <section className="mb-8">
            <h2 className="sec-h2">{ui.related}</h2>
            <div className="flex flex-wrap gap-2">
              {f.siblings.map(kin => {
                const other = handOf(kin);
                if (!other) return null;
                return (
                  <Link prefetch={false}
                    key={kin}
                    href={`${hub}/${kin}`}
                    className="rounded-xl border chip-off px-3 py-1.5 font-mono text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                  >
                    {labelOf(other)}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.chart}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{ui.chartNote}</p>
          <HandGrid path={hub} current={slug} />
        </section>

        <Faq items={faq} lang={base} title={ui.faq} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/game/poker/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
