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
import NumberGrid from '@/components/number/NumberGrid';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { GRID_MAX, neighboursOf, numberOf } from '@/lib/number/list';
import { factorText, familiesOf, numberFacts } from '@/lib/number/facts';
import { NUMBER_UI } from '@/lib/number/ui';

/** 점을 늘어놓아 보이기에 너무 긴 줄 — 소수 197은 한 줄이 197칸이다 */
const DRAWABLE = 40;

/**
 * 수 한 장 — 그 수 하나에서 나온 것만 싣는다.
 *
 * 맨 위의 큰 카드에 로마 숫자와 2진수를 함께 둔 것은, 같은 수를 다른 방식으로
 * 적은 것뿐이라는 게 한눈에 보이게 하기 위해서다. 아래 표는 그것을 늘려 놓은 것이다.
 */
export default function NumberPage({ slug, lang }: { slug: string; lang: Lang }) {
  const n = numberOf(slug);
  if (!n) return null;
  const f = numberFacts(n);
  const ui = NUMBER_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/number`;
  const path = `${hub}/${n}`;
  const base = localeOfLang(lang);
  const families = familiesOf(n);

  const rows: [string, string][] = [
    [ui.factorLabel, f.prime ? ui.factorPrime : factorText(f.factors)],
    [ui.divisorLabel, f.divisors.join(', ')],
    [ui.divisorSumLabel, ui.fmt(f.divisorSum)],
    [ui.properSumLabel, ui.fmt(f.properSum)],
    [ui.totientLabel, ui.fmt(f.totient)],
    [ui.digitSumLabel, ui.fmt(f.digitSum)],
    [ui.digitalRootLabel, String(f.digitalRoot)],
    [ui.romanLabel, f.roman ?? ui.romanNone],
    [ui.binLabel, f.bin],
    [ui.octLabel, f.oct],
    [ui.hexLabel, f.hex],
    [ui.base36Label, f.base36],
    [ui.bitsLabel, ui.bitsValue(f.bits)],
    [ui.collatzLabel, ui.collatzValue(f.collatz.steps, f.collatz.peak)],
    // 앞뒤 소수는 값이 아니라 다른 페이지의 이름이라 자릿수를 끊지 않는다
    [ui.prevPrimeLabel, f.prevPrime === null ? ui.noneLabel : String(f.prevPrime)],
    [ui.nextPrimeLabel, String(f.nextPrime)],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: String(n), path },
        ])}
      />

      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-600 to-violet-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{n}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/number/${n}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-52 rounded-2xl border-2 border-indigo-400 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-4 text-center shadow-lg">
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{n}</div>
          <div className="mt-1 text-sm font-bold text-indigo-700 dark:text-indigo-300">{f.roman ?? ui.romanNone}</div>
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5 break-all">{f.bin}</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{ui.metaTitle(n)}</h1>
          <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mb-2">{ui.kindLabel[f.kind]}</p>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 cell-note mb-4">
          {ui.kindNote[f.kind]}
        </p>

        {families.length > 0 && (
          <section className="mb-8">
            <h2 className="sec-h2">{ui.familyTitle}</h2>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {families.map(fam => (
                <div key={fam} className="px-4 py-2.5 bg-white dark:bg-slate-900">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{ui.familyLabel[fam]}</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">{ui.familyNote[fam]}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.rectTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.rectNote(f)}</p>
          {f.rect.cols <= DRAWABLE && (
            <div
              className="inline-grid gap-[3px]"
              style={{ gridTemplateColumns: `repeat(${f.rect.cols}, 10px)` }}
              aria-hidden
            >
              {Array.from({ length: n }, (_, i) => (
                <span key={i} className="h-[10px] w-[10px] rounded-[2px] bg-indigo-400/70 dark:bg-indigo-500/60" />
              ))}
            </div>
          )}
        </section>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        {n <= GRID_MAX && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.gridTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.gridNote}</p>
            <NumberGrid path={hub} current={n} />
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {neighboursOf(n).map(o => (
              <Link
                key={o}
                href={`${hub}/${o}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {o}
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

        <Faq items={ui.numberFaq(f)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/number/${n}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
