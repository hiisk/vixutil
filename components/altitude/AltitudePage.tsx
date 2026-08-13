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
import AltitudeTable from '@/components/altitude/AltitudeTable';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { PLACES, altitudeOf } from '@/lib/altitude/list';
import { altitudeFacts, neighbours } from '@/lib/altitude/facts';
import { ALTITUDE_UI } from '@/lib/altitude/ui';

/**
 * 고도 한 장 — 끓는점을 큰 글씨로 둔다.
 *
 * 기압 hPa는 크기가 잘 안 잡히는 수다. 같은 높이를 "물이 몇 도에 끓는가"로
 * 말하면 그 자리에서 무엇이 달라지는지가 곧장 보인다.
 */
export default function AltitudePage({ slug, lang }: { slug: string; lang: Lang }) {
  const m = altitudeOf(slug);
  if (m === undefined) return null;
  const f = altitudeFacts(m);
  const ui = ALTITUDE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/altitude`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const head: [string, string, string] = [ui.heightLabel, ui.pressureLabel, ui.boilLabel];
  const here = PLACES.find(p => p.m === m);

  const rows: [string, string][] = [
    [ui.pressureLabel, `${f.hpa} hPa (${f.pressurePercent}%)`],
    [ui.feetLabel, `${f.ft} ft`],
    [ui.tempLabel, `${f.tempC} °C`],
    [ui.oxygenLabel, `${f.o2hpa} hPa (${f.o2Percent}%)`],
    [ui.cookLabel, `×${f.cookFactor}`],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${m} m`, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-cyan-700 to-sky-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{m} m</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/altitude/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-cyan-400 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-lg font-bold text-slate-600 dark:text-slate-300 tabular-nums">{m} m{here ? ` · ${ui.placeName(here.key)}` : ''}</div>
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.boilC}<span className="text-2xl"> °C</span></div>
          <div className="mt-1 text-sm font-bold text-cyan-800 dark:text-cyan-300">{ui.boilLabel}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="row-pair">
              <dt className="row-label">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.boilTitle}</h2>
          <p className="note-xs">{ui.boilNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.oxygenTitle}</h2>
          <p className="note-xs">{ui.oxygenNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <AltitudeTable path={hub} altitudes={[...neighbours(m), m].sort((a, b) => a - b)} current={m} head={head} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.placeTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.placeNote}</p>
          <div className="flex flex-wrap gap-2">
            {PLACES.map(p => (
              <Link prefetch={false}
                key={p.key}
                href={`${hub}/${p.m}`}
                className="rounded-xl border chip-off px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-cyan-500 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors"
              >
                {ui.placeName(p.key)} · {p.m}m
              </Link>
            ))}
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

        <p className="mb-8 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          {ui.caution}
        </p>

        <Faq items={ui.altitudeFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/altitude/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
