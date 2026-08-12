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
import SteelList from '@/components/steel/SteelList';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { atShape, cellOf } from '@/lib/steel/list';
import { steelFacts } from '@/lib/steel/facts';
import { STEEL_UI, fmtNum } from '@/lib/steel/ui';
import { REBAR_UI } from '@/lib/rebar/ui';

export default function SteelPage({ slug, lang }: { slug: string; lang: Lang }) {
  const c = cellOf(slug);
  if (!c) return null;
  const f = steelFacts(c);
  const ui = STEEL_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/steel`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);
  const here = `${ui.shapeLabel[c.shape]} ${f.size}`;
  const n = (x: number) => fmtNum(lang, x);

  /*
   * 줄이 형상마다 다르다 — 강판에는 m²당 무게와 한 장 넓이가 있고, 관에는 안쪽
   * 치수와 속이 찼을 때의 무게가 있다. 없는 값을 빈 칸으로 두면 무엇이 없는지가
   * 안 보이므로 줄 자체를 넣지 않는다.
   */
  const rows: [string, string][] = [
    [ui.sizeLabel, `${f.size} mm`],
    [ui.formulaLabel, f.formula],
    [ui.areaLabel, `${n(f.area)} mm²`],
    [ui.unitLabel, `${n(f.unit)} kg/m`],
    ...(f.perSquareMetre === undefined ? [] : [[ui.perSquareLabel, `${n(f.perSquareMetre)} kg/m²`] as [string, string]]),
    ...(f.inner === undefined ? [] : [[
      ui.innerLabel,
      f.inner.b === undefined ? `${n(f.inner.a)} mm` : `${n(f.inner.a)} × ${n(f.inner.b)} mm`,
    ] as [string, string]]),
    ...(f.solidUnit === undefined ? [] : [[ui.solidLabel, `${n(f.solidUnit)} kg/m`] as [string, string]]),
    ...(f.hollowSaving === undefined ? [] : [[ui.savingLabel, `${n(f.hollowSaving)} %`] as [string, string]]),
    [ui.lengthLabel, `${n(f.length)} m`],
    ...(f.sheetArea === undefined ? [] : [[ui.sheetAreaLabel, `${n(f.sheetArea)} m²`] as [string, string]]),
    [ui.perPieceLabel, `${n(f.perPiece)} kg`],
    [ui.perHundredLabel, `${n(f.perHundred)} kg`],
    [ui.perTonLabel, `${f.piecesPerTon}`],
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: here, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-slate-600 to-sky-400" />

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
            <LangPicker current={localeOfLang(lang)} route={`/steel/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-sky-400 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{here}</div>
          <div className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight tabular-nums">{n(f.unit)} kg/m</div>
          <div className="mt-1 text-sm font-bold text-sky-700 dark:text-sky-300 tabular-nums">{n(f.perPiece)} kg</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">{n(f.area)} mm²</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f)}</h1>
          <p className="note-sm">{ui.desc(f)}</p>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.formulaTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.formulaNote}</p>
          {/* 식과 그 식이 낸 값을 한 줄에 — 계수를 외우는 자리가 아니라는 것을 보인다 */}
          <ul className="list-card">
            <li className="flex items-baseline justify-between gap-3 px-4 py-2.5">
              <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">{f.formula}</span>
              <span className="cell-num shrink-0">{n(f.area)} mm²</span>
            </li>
            <li className="flex items-baseline justify-between gap-3 px-4 py-2.5">
              <span className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                {n(f.area)} mm² ÷ 10⁶ × 7850 kg/m³
              </span>
              <span className="cell-num shrink-0">{n(f.unit)} kg/m</span>
            </li>
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

        {f.hollowSaving !== undefined && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.hollowTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{ui.hollowNote}</p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <SteelList cells={f.neighbours} path={hub} lang={lang} by="both" />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.shapeRowTitle}</h2>
          <SteelList cells={atShape(c.shape)} path={hub} lang={lang} by="size" current={slug} />
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

        {/*
          철근은 같은 밀도에서 나오는 다른 표다 — 이형철근은 공칭지름이 규격으로
          따로 정해져 있어 여기 형상 축에 넣을 수 없고, 그쪽에 제 섹션이 있다.
          이름표는 REBAR_UI에서 가져온다: 가리키는 페이지가 제 언어로 쓰는 이름과
          늘 같아진다.
        */}
        <section className="mb-8">
          <h2 className="sec-h2">{ui.relatedTitle}</h2>
          <Link
            href={`${prefix}/rebar`}
            className="block rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-sky-400 transition-colors"
          >
            {REBAR_UI[lang].section}
          </Link>
        </section>

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/steel/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
