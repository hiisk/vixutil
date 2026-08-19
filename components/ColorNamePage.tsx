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
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { colorFacts, nearbyColors } from '@/lib/color/facts';
import { COLOR_UI, colorFaq } from '@/lib/color/ui';
import type { NamedColor } from '@/lib/color/named8';
import LangPicker from '@/components/LangPicker';

/**
 * 색 한 장 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 값을 먼저, 설명을 나중에 둔다. 이 화면에 오는 사람은 대개 hex 코드 하나를
 * 찾으러 온다 — 그것을 h1 바로 아래에서 읽고 나갈 수 있어야 하고, 대비·보색·
 * 색약은 그 뒤에 궁금할 때 보는 것이다.
 *
 * 모든 숫자는 hex에서 계산한다. 색은 눈으로 맞다/틀리다를 알 수 없으므로
 * 손으로 적어 두면 틀린 것을 아무도 못 잡는다.
 */
export default function ColorNamePage({ color, lang, lead, nearby: nearbyProp, faq, nearbyTitle }: {
  color: NamedColor;
  lang: Lang;
  /* 아래 셋은 hex 낱장(/color/hex-1a2)이 쓴다. 안 주면 이름 있는 색의 원래 동작이다 —
     lib/color/hex-grid.ts 머리말. 240줄을 복사하지 않으려고 여기만 열어 두었다. */
  lead?: string;
  nearby?: NamedColor[];
  faq?: { q: string; a: string }[];
  nearbyTitle?: string;
}) {
  const ui = COLOR_UI[lang];
  const f = colorFacts(color.hex);
  const name = color.name[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/color`;
  const path = `${prefix}/color/${color.slug}`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);
  const nearby = nearbyProp ?? nearbyColors(color.slug);
  const onColor = f.textOn === 'white' ? '#ffffff' : '#000000';

  const rows: { label: string; value: string }[] = [
    { label: ui.hexLabel, value: f.hex.toUpperCase() },
    { label: ui.rgbLabel, value: `${f.rgb.r}, ${f.rgb.g}, ${f.rgb.b}` },
    { label: ui.hslLabel, value: `${f.hsl.h}°, ${f.hsl.s}%, ${f.hsl.l}%` },
    { label: ui.cmykLabel, value: `${f.cmyk.c}%, ${f.cmyk.m}%, ${f.cmyk.y}%, ${f.cmyk.k}%` },
    { label: ui.lumLabel, value: `${f.lum}` },
  ];

  /* 보색·유사색 칸의 hex에도 `cv`를 달아 봤다가 뺐다. 두 가지가 걸렸다 —
     한 장에 아홉 칸이라 힌디어에서 낱장 증가가 124바이트로 100을 넘었고,
     4열 격자의 11px 라벨 옆에 아이콘이 붙으면 줄이 넘어간다.
     사람이 가지러 오는 것은 위의 표에 있는 다섯 값과 히어로의 hex다. */
  const swatch = (hex: string, label: string, href?: string) => {
    const inner = (
      <>
        <span className="block h-14 rounded-xl border border-slate-200 dark:border-slate-700" style={{ background: hex }} />
        <span className="block mt-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 tabular-nums text-center">
          {label}
        </span>
      </>
    );
    return href ? (
      <Link prefetch={false} key={hex + label} href={href} className="block hover:opacity-80 transition-opacity">{inner}</Link>
    ) : (
      <span key={hex + label} className="block">{inner}</span>
    );
  };

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/color` },
          { name, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(name, ui.metaDesc(name, f), path)} />

      <PageGlow accent="indigo" />
      <div className="h-1" style={{ background: color.hex }} />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href={`${prefix}/color`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/color/${color.slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        {/* 큰 스와치가 먼저다 — 이름만으로는 어떤 색인지 아무도 모른다 */}
        <div
          className="rounded-xl px-5 py-10 shadow-sm border border-black/5"
          style={{ background: color.hex, color: onColor }}
          data-color-swatch
        >
          <h1 className="page-h1">{name}</h1>
          {/* 이 화면에 오는 사람이 가지러 온 것 — 눌러서 가져간다. `cv` 두 글자다 */}
          <p className="cv text-lg font-bold tabular-nums opacity-90">{f.hex.toUpperCase()}</p>
        </div>

        {lead && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{lead}</p>}

        <section className="mt-6 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="kv-table w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map(r => (
                <tr key={r.label}>
                  <th scope="row" className="text-left px-4 py-3 font-bold text-slate-500 dark:text-slate-400 w-2/5">
                    {r.label}
                  </th>
                  <td className="cv px-4 py-3 font-bold text-slate-800 dark:text-slate-100 tabular-nums">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* lib/color/ui.ts에 2026-08-13부터 열 언어로 적혀 있었는데 아무도 안 쓰던 줄이다.
            누를 수 있다는 것을 손가락으로 찾아내라고 둘 수는 없다 — 아이콘은 힌트고
            이 한 줄이 답이다. 스크린리더에는 ThemeToggle이 「복사됨」을 읽어 준다. */}
        <p className="mt-2 note-xs">{ui.copyHint}</p>

        <section className="mt-6">
          <h2 className="sec-h2">{ui.contrastLabel}</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { bg: '#ffffff', fg: color.hex, label: ui.onWhite, ratio: f.onWhite, pass: f.aaWhite },
              { bg: '#000000', fg: color.hex, label: ui.onBlack, ratio: f.onBlack, pass: f.aaBlack },
            ].map(c => (
              <div key={c.label} className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="px-4 py-5 text-center" style={{ background: c.bg, color: c.fg }}>
                  <span className="text-base font-bold">Aa</span>
                </div>
                <div className="px-3 py-2.5 bg-white dark:bg-slate-900">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{c.label}</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">
                    {c.ratio}:1{' '}
                    <span className={c.pass ? 'text-emerald-600' : 'text-rose-500'}>
                      {c.pass ? ui.passAa : ui.failAa}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 무채색은 색상환에서 돌릴 각이 없어 보색·유사색이 모두 자기 색이 된다 */}
        {f.chromatic && (
        <section className="mt-6">
          <h2 className="sec-h2">{ui.harmonyTitle}</h2>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1.5">{ui.complementLabel}</p>
          <div className="grid grid-cols-4 gap-2 mb-3">{swatch(f.complement, f.complement.toUpperCase())}</div>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1.5">{ui.analogousLabel}</p>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {f.analogous.map(h => swatch(h, h.toUpperCase()))}
          </div>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1.5">{ui.triadLabel}</p>
          <div className="grid grid-cols-4 gap-2">{f.triad.map(h => swatch(h, h.toUpperCase()))}</div>
        </section>
        )}

        <section className="mt-6">
          <h2 className="sec-h2">{ui.shadesTitle}</h2>
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
            {f.shades.map(s => swatch(s.hex, `${s.step}`))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="sec-h2">{ui.cvdTitle}</h2>
          <div className="grid grid-cols-3 gap-2">
            {swatch(f.cvd.protan, ui.protan)}
            {swatch(f.cvd.deutan, ui.deutan)}
            {swatch(f.cvd.tritan, ui.tritan)}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={faq ?? colorFaq(lang, name, f)} lang={base} title={ui.faqTitle} />

        <section className="mt-8" aria-label={nearbyTitle ?? ui.nearbyTitle}>
          <h2 className="sec-h2">{nearbyTitle ?? ui.nearbyTitle}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {nearby.map(n => (
              <Link prefetch={false}
                key={n.slug}
                href={`${prefix}/color/${n.slug}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-sm transition-all"
              >
                <span className="block h-12" style={{ background: n.hex }} />
                <span className="block px-2 py-1.5 bg-white dark:bg-slate-900">
                  <span className="block text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{n.name[lang]}</span>
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500 tabular-nums">{n.hex.toUpperCase()}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false}
              key={l.lang}
              href={`${l.prefix}/color/${color.slug}`}
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
