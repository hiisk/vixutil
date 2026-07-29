import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import CrossLinks from '@/components/CrossLinks';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { findTimeTool, relatedTimeTools } from '@/lib/time-tools';

/**
 * 시간 도구 상세 페이지의 공통 셸. 계산기(CalcShell)와 같은 역할이다 —
 * 페이지는 metadata와 도구 컴포넌트만 넘기고, 화면의 뼈대와 구조화 데이터는
 * 여기서 한 번만 정의한다.
 *
 * h1은 여기서만 그린다. 도구 컴포넌트가 제목을 또 그리면 h1이 둘이 된다.
 */
export default function TimeShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const tool = findTimeTool(slug);
  if (!tool) throw new Error(`알 수 없는 시간 도구 도구: ${slug}`);

  const path = `/time/${tool.slug}`;
  const related = relatedTimeTools(tool.slug);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '시간 도구', path: '/time' },
          { name: tool.title, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(tool.title, tool.long, path)} />

      <PageGlow accent="sky" />
      <div className={`h-1 bg-gradient-to-r ${tool.gradient}`} />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-sky-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href="/time" className="text-sm text-slate-400 dark:text-slate-500 hover:text-sky-600 transition-colors font-medium">
            시간 도구
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{tool.title}</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-7">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-3xl bg-gradient-to-br ${tool.gradient} shadow-lg`}>
            <span>{tool.icon}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2.5">{tool.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">{tool.long}</p>
        </div>

        <div className="mb-5 rounded-2xl border border-sky-100 dark:border-sky-900/40 bg-sky-50/70 dark:bg-sky-950/30 px-4 py-3 text-xs text-sky-800 dark:text-sky-200 leading-relaxed text-center">
          ⏱️ 이 탭이 열려 있는 동안 동작합니다. 설치도 회원가입도 없습니다.
        </div>

        {children}

        <section className="mt-8" aria-label="기능">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">이 도구로 할 수 있는 것</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {tool.features.map(f => (
              <li
                key={f}
                className="flex items-start gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-600 dark:text-slate-300"
              >
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </section>

        <Faq items={SECTION_FAQ[`time/${tool.slug}`]} />

        <CrossLinks />

        <section className="mt-8" aria-label="다른 시간 도구">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">다른 시간 도구</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link
                key={r.slug}
                href={`/time/${r.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:border-sky-300 hover:shadow-sm transition-all"
              >
                <span className="text-xl shrink-0">{r.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-700 transition-colors">
                    {r.title}
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">{r.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9 leading-relaxed">
          타이머·알람 소리는 기기가 잠들면 울리지 않을 수 있습니다.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
