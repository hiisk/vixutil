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
import SizeShape from '@/components/imgsize/SizeShape';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { IMG_SIZE_ICON, imgSizeOf } from '@/lib/imgsize/list';
import { sameKind, sameRatio, sizeFacts } from '@/lib/imgsize/facts';
import { IMG_SIZE_UI } from '@/lib/imgsize/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 이미지 크기 한 장 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 픽셀 크기가 맨 위다. 이 화면에 오는 사람은 "유튜브 썸네일 몇 픽셀"을 알러
 * 왔고, 인쇄 크기나 용량은 그다음에 읽을 거리다.
 */
export default function SizePage({ slug, lang }: { slug: string; lang: Lang }) {
  const x = imgSizeOf(slug);
  if (!x) return null;

  const ui = IMG_SIZE_UI[lang];
  const f = sizeFacts(x);
  const kind = ui.kindLabel[x.kind];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/image/size`;
  const path = `${prefix}/image/size/${slug}`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);
  const ratioMates = sameRatio(slug);
  const kindMates = sameKind(slug);

  const rows: { label: string; value: string }[] = [
    { label: ui.pixelLabel, value: `${x.w} × ${x.h} px` },
    { label: ui.ratioLabel, value: f.ratioLabel === f.ratio ? f.ratioLabel : `${f.ratioLabel} (${f.ratio})` },
    { label: ui.megapixelLabel, value: `${f.pixels.toLocaleString(base)} · ${f.megapixels} MP` },
    { label: ui.printLabel, value: `${f.mm[0]} × ${f.mm[1]} mm` },
    { label: ui.orientationLabel, value: f.square ? ui.square : f.portrait ? ui.portrait : ui.landscape },
    { label: ui.rawLabel, value: `${f.rawMb} MB` },
    { label: ui.jpegLabel, value: `${f.jpegKb} KB` },
  ];

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/image/size` },
          { name: x.name, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(x.name, ui.metaDesc(f, kind), path)} />

      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-pink-500 to-rose-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href={`${prefix}/image/size`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/image/size/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3 shadow-lg bg-gradient-to-br from-pink-500 to-rose-500">
            <ToolIcon emoji={IMG_SIZE_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{x.name}</h1>
          <p className="text-3xl font-black text-pink-600 dark:text-pink-400 tabular-nums mb-1">{x.w} × {x.h}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">{kind} · {f.ratioLabel}</p>
        </div>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-5 mb-6 flex justify-center">
          <SizeShape w={x.w} h={x.h} label={f.ratioLabel} />
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map(r => (
                <tr key={r.label}>
                  <th scope="row" className="text-left px-4 py-3 font-bold text-slate-500 dark:text-slate-400 w-1/2 bg-slate-50 dark:bg-slate-900/40">
                    {r.label}
                  </th>
                  <td className="px-4 py-3 font-black text-slate-800 dark:text-slate-100 tabular-nums">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed rounded-2xl border chip-off px-4 py-3">
          {ui.kindNote[x.kind]}
        </p>

        <section className="mt-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.sizeFaq(f, kind)} lang={base} title={ui.faqTitle} />

        {ratioMates.length > 0 && (
          <section className="mt-8">
            <h2 className="sec-h2-tight">{ui.sameRatioTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{ui.sameRatioNote}</p>
            <div className="grid grid-cols-2 gap-2">
              {ratioMates.map(o => (
                <Link prefetch={false}
                  key={o.slug}
                  href={`${prefix}/image/size/${o.slug}`}
                  className="rounded-xl border chip-off px-3 py-2.5 hover:shadow-sm transition-all"
                >
                  <span className="block text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{o.name}</span>
                  <span className="block text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">{o.w}×{o.h}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8">
          <h2 className="sec-h2">{ui.sameKindTitle}</h2>
          <div className="grid grid-cols-2 gap-2">
            {kindMates.map(o => (
              <Link prefetch={false}
                key={o.slug}
                href={`${prefix}/image/size/${o.slug}`}
                className="rounded-xl border chip-off px-3 py-2.5 hover:shadow-sm transition-all"
              >
                <span className="block text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{o.name}</span>
                <span className="block text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">{o.w}×{o.h}</span>
              </Link>
            ))}
          </div>
        </section>

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/image/size/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
