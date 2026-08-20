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
import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import ConvertEngine from '@/components/ConvertEngine';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { relatedConvertTools, type ConvertTool } from '@/lib/convert-tools';
import { convertFaq } from '@/lib/convert-faq';
import { CONVERT_UI, type ConvertLang } from '@/lib/convert-ui-intl';
import LangPicker from '@/components/LangPicker';
/* localized는 lib으로 옮겼다 — 서버 쪽 ConvertHub도 같은 것을 쓴다 */
import { localized } from '@/lib/convert-localized';
import { localeHref, localePrefix } from '@/lib/locales';

/**
 * 단위 변환 상세 화면 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 언어마다 페이지를 따로 그리면 곧 서로 달라진다. 실제로 다른 섹션에서 영어
 * 페이지에 한국어 푸터가 나가는 일이 있었다. 화면은 하나만 두고 문구만 갈아 끼운다.
 */

export default function ConvertPage({ tool, lang }: { tool: ConvertTool; lang: ConvertLang }) {
  const ui = CONVERT_UI[lang];
  // 경로는 레지스트리에서 만든다 — pt-BR은 hreflang이 pt-BR이고 경로는 /pt-br이다
  const prefix = localePrefix(lang);
  const homeHref = localeHref(lang, '/');
  const text = localized(tool, lang);
  const path = `${prefix}/convert/${tool.slug}`;
  const related = relatedConvertTools(tool.slug);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/convert` },
          { name: text.title, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(text.title, text.long, path)} />

      <PageGlow accent="blue" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-blue-600 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href={`${prefix}/convert`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={`/convert/${tool.slug}`} />
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mb-7">
          <span className="bg-sec-soft inline-flex h-10 w-10 items-center justify-center rounded-lg"><ToolIcon emoji={tool.icon} className="h-5 w-5" /></span>
          <div className="hero-band">
            <PageHero title={text.title} desc={text.long} />
          </div>
        </div>

        <ConvertEngine tool={{ ...tool, note: text.note, from: text.from, to: text.to }} lang={lang} />

        <Faq items={convertFaq(tool, lang)} lang={lang} />

        <section className="mt-8" aria-label={ui.related}>
          <h2 className="sec-h2">{ui.related}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => {
              const rt = localized(r, lang);
              return (
                <Link prefetch={false}
                  key={r.slug}
                  href={`${prefix}/convert/${r.slug}`}
                  className="group hub-card hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all"
                >
                  <ToolIcon emoji={r.icon} className="hub-card-icon" />
                  <span className="hub-card-body">
                    <span className="hub-card-title group-hover:text-sec transition-colors">
                      {rt.title}
                    </span>
                    <span className="hub-card-desc">{rt.desc}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-9 leading-relaxed">{ui.footNote}</p>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
