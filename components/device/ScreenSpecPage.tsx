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
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import ScreenShape from '@/components/device/ScreenShape';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { screen } from '@/lib/device/screens';
import { screenFacts, similarScreens } from '@/lib/device/facts';
import { DEVICE_UI } from '@/lib/device/ui';
import { SCREEN_ICON, screenView } from '@/lib/device/route';
import LangPicker from '@/components/LangPicker';

/**
 * 화면 규격 한 장 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 맨 위에 실제 비율로 그린 화면과 세 숫자(해상도·인치·밀도)를 놓는다. 이 화면에
 * 오는 사람은 "아이폰 16 Pro 해상도"를 알고 싶어 들어오고, 픽셀 크기나 화면 넓이는
 * 그 뒤에 읽을 거리다.
 */
export default function ScreenSpecPage({ slug, lang }: { slug: string; lang: Lang }) {
  const sc = screen(slug);
  const v = screenView(slug);
  if (!sc || !v) return null;

  const ui = DEVICE_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/device/screen`;
  const path = `${prefix}/device/screen/${slug}`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);
  const similar = similarScreens(slug);

  const rows: { label: string; value: string }[] = [
    { label: ui.resolution, value: `${v.w} × ${v.h}` },
    { label: ui.klass, value: v.className },
    { label: ui.diagonal, value: ui.inchUnit(v.inch) },
    { label: ui.density, value: `${v.ppi} ppi` },
    { label: ui.ratio, value: v.ratioLabel === v.ratio ? v.ratioLabel : `${v.ratioLabel} (${v.ratio})` },
    { label: ui.pixels, value: `${v.pixels.toLocaleString(base)} · ${ui.mpUnit(v.megapixels)}` },
    { label: ui.physical, value: `${v.widthMm} × ${v.heightMm} mm` },
    { label: ui.area, value: `${v.areaIn2} in²` },
    { label: ui.pitch, value: `${v.pixelUm} µm` },
    { label: ui.retina, value: ui.cmUnit(v.retinaCm) },
    { label: ui.orientation, value: v.portrait ? ui.portrait : ui.landscape },
    ...(sc.year ? [{ label: ui.released, value: String(sc.year) }] : []),
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/device/screen` },
          { name: sc.name, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(sc.name, ui.metaDesc(v), path)} />

      <PageGlow accent="sky" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href={`${prefix}/device/screen`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/device/screen/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="hero-band ">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={SCREEN_ICON} className="h-5 w-5" /></span>
          <h1 className="page-h1">{sc.name}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {ui.kindLabel[sc.kind]} · {v.className}
            {sc.year ? ` · ${sc.year}` : ''}
          </p>
        </div>

        {/* 세 숫자가 이 화면의 전부다 — 나머지는 여기서 파생된다 */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { k: ui.resolution, val: `${v.w}×${v.h}` },
            { k: ui.diagonal, val: ui.inchUnit(v.inch) },
            { k: ui.density, val: `${v.ppi}` , unit: 'ppi' },
          ].map(x => (
            <div key={x.k} className="rounded-lg border chip-off px-2 py-3 text-center">
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate">{x.k}</p>
              <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 tabular-nums mt-1 break-all">
                {x.val}
                {x.unit ? <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 ml-0.5">{x.unit}</span> : null}
              </p>
            </div>
          ))}
        </div>

        <section className="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-5 mb-6 flex justify-center">
          <ScreenShape
            ratio={v.ratioValue}
            portrait={v.portrait}
            diagonal={ui.inchUnit(v.inch)}
            widthLabel={`${v.widthMm} mm`}
            heightLabel={`${v.heightMm} mm`}
          />
        </section>

        <section className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="kv-table w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map(r => (
                <tr key={r.label}>
                  <th scope="row" className="text-left px-4 py-3 font-bold text-slate-500 dark:text-slate-400 w-1/2">
                    {r.label}
                  </th>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-100 tabular-nums">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.screenFaq(v)} lang={base} title={ui.faqTitle} />

        <section className="mt-8" aria-label={ui.compareTitle}>
          <h2 className="sec-h2-tight">{ui.compareTitle}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{ui.compareNote}</p>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden overflow-x-auto">
            <table className="kv-table w-full text-sm">
              <thead className=" text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <tr>
                  {ui.compareCols.map(c => (
                    <th key={c} scope="col" className="text-left px-3 py-2 whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {similar.map(o => {
                  const of_ = screenFacts(o);
                  return (
                    <tr key={o.slug}>
                      <td className="px-3 py-2.5">
                        <Link prefetch={false} href={`${prefix}/device/screen/${o.slug}`} className="font-bold text-slate-800 dark:text-slate-100 hover:text-sky-600 transition-colors">
                          {o.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2.5 tabular-nums text-slate-500 dark:text-slate-400 whitespace-nowrap">{o.w}×{o.h}</td>
                      <td className="px-3 py-2.5 tabular-nums text-slate-500 dark:text-slate-400 whitespace-nowrap">{ui.inchUnit(o.inch)}</td>
                      <td className="px-3 py-2.5 tabular-nums font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">{of_.ppi} ppi</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/device/screen/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
