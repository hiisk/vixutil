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
import RingList from '@/components/ring/RingList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf } from '@/lib/ring/list';
import { atBand, ringFacts } from '@/lib/ring/facts';
import { RING_UI, signed } from '@/lib/ring/ui';

export default function RingPage({ slug, lang }: { slug: string; lang: Lang }) {
  const mm = cellOf(slug);
  if (mm === undefined) return null;
  const f = ringFacts(mm);
  const ui = RING_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/ring`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const here = `${mm} mm`;

  /* 세 규격을 큰 글씨 아래 바로 놓는다 — 이 화면을 여는 이유가 그 셋이다 */
  const scales: [string, string][] = [
    [ui.usLabel, `${f.usHalf}`],
    [ui.jpLabel, `${f.jpWhole}`],
    [ui.isoLabel, `${f.iso}`],
  ];

  const rows: [string, string][] = [
    [ui.mmLabel, `${f.mm} mm`],
    [ui.diameterLabel, `${f.diameter} mm`],
    [ui.inchLabel, `${f.inch} in`],
    [ui.nearestLabel, `US ${f.usHalf} · ${f.usHalfMm} mm`],
    [ui.gapLabel, `${signed(f.usGap)} mm`],
    [ui.bandLabel, ui.bandNames[f.band]],
  ];

  /* 이웃은 자기 다음부터 원형으로 감아 온 여섯 — facts.ts의 around */
  const nearCells = f.neighbours.map(s => cellOf(s)!);
  const step = [f.prev, f.next].filter((s): s is string => s !== null).map(s => cellOf(s)!);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: here, path },
        ])}
      />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{here}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/ring/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{ui.mmLabel}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.mm} mm</div>
          <div className="mt-1 text-sm font-bold text-rose-700 dark:text-rose-300 tabular-nums">
            US {f.usHalf} · JP {f.jpWhole} · EU {f.iso}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            {ui.diameterLabel} {f.diameter} mm
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.tableTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.ruleNote}</p>
          <ul className="list-card">
            {scales.map(([k, v]) => (
              <li key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-slate-600 dark:text-slate-300">{k}</span>
                <span className="cell-num shrink-0">{v}</span>
              </li>
            ))}
          </ul>
        </section>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.usTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.usNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.jpTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.jpNote}</p>
        </section>

        {step.length > 0 && (
          <section className="mb-8">
            <h2 className="sec-h2">{ui.stepTitle}</h2>
            <p className="note-xs">{`${ui.prevLabel} · ${ui.nextLabel}`}</p>
            <RingList cells={step} path={hub} />
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <RingList cells={nearCells} path={hub} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.bandNames[f.band]}</h2>
          <RingList cells={atBand(f.band)} path={hub} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.cellFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/ring/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
