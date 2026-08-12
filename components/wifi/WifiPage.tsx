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
import WifiBand from '@/components/wifi/WifiBand';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { channelOf, labelOf, slugOf } from '@/lib/wifi/list';
import { centerOf, cleanSet, neighbours, wifiFacts } from '@/lib/wifi/facts';
import { WIFI_UI } from '@/lib/wifi/ui';

/**
 * 채널 한 장 — 겹치는 채널을 이름으로 보인다.
 *
 * "6번은 2437MHz"만 적으면 공유기 앞에서 할 일이 없다. 어느 번호와 부딪치는지가
 * 보여야 옆집이 6번을 쓰고 있을 때 어디로 옮길지 정해진다.
 */
export default function WifiPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = channelOf(slug);
  if (!c) return null;
  const f = wifiFacts(c);
  const ui = WIFI_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/wifi`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const clean = new Set(cleanSet(c.band).map(x => x.n));

  const rows: [string, string][] = [
    [ui.centerLabel, `${f.center} MHz`],
    [ui.spanLabel, `${f.span.from} – ${f.span.to} MHz`],
    [ui.overlapLabel, f.overlaps.length ? f.overlaps.map(o => o.n).join(', ') : ui.noneTag],
    [ui.pairLabel, f.pair ? String(f.pair.n) : ui.noneTag],
    [ui.dfsLabel, f.dfs ? ui.yesTag : ui.noneTag],
    [ui.restrictedLabel, f.restricted ? ui.yesTag : ui.noneTag],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: labelOf(c), path },
        ])}
      />

      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-blue-700 to-sky-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{labelOf(c)}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/wifi/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-blue-400 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-lg font-bold text-slate-600 dark:text-slate-300">{ui.bandName(c.band)}</div>
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{c.n}</div>
          <div className="mt-1 text-sm font-bold text-blue-800 dark:text-blue-300 tabular-nums">{f.center} MHz</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        {f.overlaps.length > 0 && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.overlapTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.overlapNote}</p>
            <div className="flex flex-wrap gap-2">
              {f.overlaps.map(o => (
                <Link
                  key={slugOf(o)}
                  href={`${hub}/${slugOf(o)}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  {o.n} · {centerOf(o)}MHz
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.cleanTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.cleanNote}</p>
          <div className="flex flex-wrap gap-2">
            {cleanSet(c.band).slice(0, 12).map(o => (
              <Link
                key={slugOf(o)}
                href={`${hub}/${slugOf(o)}`}
                className="rounded-xl border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 text-xs font-bold text-blue-800 dark:text-blue-300 tabular-nums hover:border-blue-500 transition-colors"
              >
                {o.n}
              </Link>
            ))}
          </div>
        </section>

        {f.dfs && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.dfsTitle}</h2>
            <p className="note-xs">{ui.dfsNote}</p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {neighbours(c).map(o => (
              <Link
                key={slugOf(o)}
                href={`${hub}/${slugOf(o)}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                {o.n} · {centerOf(o)}MHz
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.bandName(c.band)}</h2>
          <WifiBand band={c.band} path={hub} current={slug} clean={clean} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <p className="mb-8 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          {ui.caution}
        </p>

        <Faq items={ui.wifiFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/wifi/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
