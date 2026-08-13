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
import DewGrid from '@/components/dew/DewGrid';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { cellOf, slugOf } from '@/lib/dew/list';
import { dewFacts } from '@/lib/dew/facts';
import { DEW_UI } from '@/lib/dew/ui';

/**
 * 이슬점 한 칸 — 이슬점과 품은 물의 양을 함께 둔다.
 *
 * 이슬점만 적으면 그 값이 무엇인지 잡히지 않는다. "1세제곱미터에 몇 그램"을
 * 옆에 두면 습도라는 말이 가리키던 것이 손에 잡힌다.
 */
export default function DewPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = dewFacts(c);
  const ui = DEW_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/dew`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.tempLabel, `${c.t} °C`],
    [ui.humidLabel, `${c.rh} %`],
    [ui.spreadLabel, `${f.spread} °C`],
    [ui.absoluteLabel, `${f.absolute} g/m³`],
    [ui.capacityLabel, `${f.capacity} g/m³`],
    [ui.comfortLabel, ui.comfortName(f.comfort)],
    [ui.fahrenheitLabel, `${f.fahrenheit} °F`],
  ];

  const near = [f.drier, f.wetter, f.colder, f.warmer].filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${c.t}°C · ${c.rh}%`, path },
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
          <span className="row-name">
            {c.t}°C · {c.rh}%
          </span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/dew/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-cyan-400 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{ui.dewLabel}</div>
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{f.dew}<span className="text-2xl"> °C</span></div>
          <div className="mt-1 text-sm font-bold text-cyan-800 dark:text-cyan-300 tabular-nums">
            {ui.tempLabel} {c.t} °C · {ui.humidLabel} {c.rh} %
          </div>
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
          <h2 className="sec-h2-tight">{ui.whyTitle}</h2>
          <p className="note-xs">{ui.whyNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.comfortTitle}</h2>
          <p className="note-xs">{ui.comfortNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {near.map(o => (
              <Link prefetch={false}
                key={slugOf(o)}
                href={`${hub}/${slugOf(o)}`}
                className="rounded-xl border chip-off px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-cyan-500 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors"
              >
                {o.t}°C · {o.rh}% → {dewFacts(o).dew}°
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.tableTitle}</h2>
          <DewGrid path={hub} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.fogTitle}</h2>
          <p className="note-xs">{ui.fogNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.dewFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/dew/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
