import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import CrossLinks from '@/components/CrossLinks';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { findTextTool, relatedTextTools } from '@/lib/text-tools';
import LangPicker from '@/components/LangPicker';
import { TEXT_INTL_SLUGS } from '@/lib/text-tools-intl';

/**
 * 텍스트 도구 상세 페이지의 공통 셸. 계산기(CalcShell)·기기 점검(DeviceShell)·
 * 이미지(ImageShell)와 같은 역할이다 — 페이지는 metadata와 도구 컴포넌트만
 * 넘기고, 화면의 뼈대와 구조화 데이터는 여기서 한 번만 정의한다.
 *
 * h1은 여기서만 그린다. 도구 컴포넌트가 제목을 또 그리면 h1이 둘이 된다.
 */
export default function TextShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const tool = findTextTool(slug);
  if (!tool) throw new Error(`알 수 없는 텍스트 도구: ${slug}`);

  /*
   * 넷은 한국어에만 있다 — 금액 한글, 한/영 자판, 초성, 로마자 표기. 전부 한글을
   * 다루는 도구라 번역판이 없고, 버튼에 아홉 개를 띄우면 전부 404다.
   *
   * 목록을 여기 적지 않고 다국어 슬러그에서 계산한다. 나중에 번역판이 늘면
   * TEXT_INTL_SLUGS만 고쳐도 버튼이 따라오고, 반대로 여기 손으로 적어 두면
   * 늘어난 걸 모른 채 한국어에만 남는다.
   */
  const translated = (TEXT_INTL_SLUGS as readonly string[]).includes(slug);

  const path = `/text/${tool.slug}`;
  const related = relatedTextTools(tool.slug);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '텍스트 도구', path: '/text' },
          { name: tool.title, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(tool.title, tool.long, path)} />

      <PageGlow accent="indigo" />
      <div className={`h-1 topbar`} />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href="/" className="page-back hover:text-indigo-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href="/text" className="text-sm text-slate-400 dark:text-slate-500 hover:text-indigo-600 transition-colors font-medium">
            텍스트 도구
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{tool.title}</span>
          <span className="ml-auto shrink-0">
            {translated && <LangPicker current="ko" route={`/text/${slug}`} />}
          </span>
        </div>
      </header>

      {/* 머리 띠 — 화면을 가로지르고 안의 글만 본문 폭에 맞춘다 */}
      <div className="hero-band">
        <div className="max-w-2xl mx-auto px-4"><PageHero className="hero-flat" title={tool.title} desc={tool.long} icon={tool.icon} /></div>
      </div>

      <main className="relative max-w-2xl mx-auto px-4 pb-10 tool-lift">


        <div className="note mb-5 text-center">
          🔒 입력한 글은 이 브라우저 안에서만 처리됩니다. 서버로 전송되거나 저장되지 않습니다.
        </div>

        {children}

        <section className="mt-8" aria-label="기능">
          <h2 className="sec-h2">이 도구로 할 수 있는 것</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {tool.features.map(f => (
              <li
                key={f}
                className="flex items-start gap-2 rounded-xl border chip-off px-3.5 py-2.5 text-sm text-slate-600 dark:text-slate-300"
              >
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </section>

        <Faq items={SECTION_FAQ[`text/${tool.slug}`]} />

        <CrossLinks />

        <section className="mt-8" aria-label="다른 텍스트 도구">
          <h2 className="sec-h2">다른 텍스트 도구</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link prefetch={false}
                key={r.slug}
                href={`/text/${r.slug}`}
                className="group hub-card hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all"
              >
                <ToolIcon emoji={r.icon} color={r.og[0]} accent={r.og[1]} className="w-5 h-5 shrink-0" />
                <span className="hub-card-body">
                  <span className="hub-card-title group-hover:text-sec transition-colors">
                    {r.title}
                  </span>
                  <span className="hub-card-desc">{r.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9 leading-relaxed">
          아주 긴 글(수십만 자)은 브라우저에서 처리하므로 기기 성능에 따라 느려질 수 있습니다.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
