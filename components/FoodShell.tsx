import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import CrossLinks from '@/components/CrossLinks';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { findFoodTool, relatedFoodTools } from '@/lib/food-tools';
import LangPicker from '@/components/LangPicker';

/**
 * 계량·요리 상세 페이지의 공통 셸. 계산기(CalcShell)와 같은 역할이다 —
 * 페이지는 metadata와 도구 컴포넌트만 넘기고, 화면의 뼈대와 구조화 데이터는
 * 여기서 한 번만 정의한다.
 *
 * h1은 여기서만 그린다. 도구 컴포넌트가 제목을 또 그리면 h1이 둘이 된다.
 */
export default function FoodShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const tool = findFoodTool(slug);
  if (!tool) throw new Error(`알 수 없는 계량·요리 도구: ${slug}`);

  const path = `/food/${tool.slug}`;
  const related = relatedFoodTools(tool.slug);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '계량·요리', path: '/food' },
          { name: tool.title, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(tool.title, tool.long, path)} />

      <PageGlow accent="amber" />
      <div className={`h-1 topbar`} />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href="/" className="page-back hover:text-amber-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href="/food" className="text-sm text-slate-400 dark:text-slate-500 hover:text-amber-600 transition-colors font-medium">
            계량·요리
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{tool.title}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route={`/food/${slug}`} />
          </span>
        </div>
      </header>

      {/* 머리 띠 — 화면을 가로지르고 안의 글만 본문 폭에 맞춘다 */}
      <div className="hero-band">
        <div className="max-w-2xl mx-auto px-4"><PageHero className="hero-flat" title={tool.title} desc={tool.long} icon={tool.icon} /></div>
      </div>

      <main className="relative max-w-2xl mx-auto px-4 pb-10 tool-lift">


        <div className="mb-5 rounded-lg border border-amber-100 dark:border-amber-900/40 bg-amber-50/70 dark:bg-amber-950/30 px-4 py-3 text-xs text-amber-800 dark:text-amber-200 leading-relaxed text-center">
          🍳 한국 기준(1컵 200ml, 1큰술 15ml)으로 계산합니다.
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
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </section>

        <Faq items={SECTION_FAQ[`food/${tool.slug}`]} />

        <CrossLinks />

        <section className="mt-8" aria-label="다른 계량·요리">
          <h2 className="sec-h2">다른 계량·요리</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link prefetch={false}
                key={r.slug}
                href={`/food/${r.slug}`}
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
          보관 기간과 굽기 온도는 일반적인 기준이며 재료 상태에 따라 달라집니다.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
