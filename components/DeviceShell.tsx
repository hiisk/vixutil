import ToolIcon from '@/components/ToolIcon';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import CrossLinks from '@/components/CrossLinks';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { findDeviceTool, relatedDeviceTools } from '@/lib/device-tools';

/**
 * 기기 점검 상세 페이지의 공통 셸.
 *
 * 계산기가 CalcShell을 쓰는 것과 같은 이유다 — 열 개 페이지가 헤더·히어로·FAQ·
 * 푸터를 각자 그리면 곧 서로 달라진다. 페이지는 metadata와 측정 컴포넌트만
 * 넘기고, 화면의 뼈대와 구조화 데이터는 여기서 한 번만 정의한다.
 *
 * h1은 여기서만 그린다. 측정 컴포넌트가 제목을 또 그리면 페이지에 h1이 둘이 된다.
 */
export default function DeviceShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const tool = findDeviceTool(slug);
  if (!tool) throw new Error(`알 수 없는 기기 점검 도구: ${slug}`);

  const path = `/device/${tool.slug}`;
  const related = relatedDeviceTools(tool.slug);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '기기 점검', path: '/device' },
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
          <Link href="/device" className="text-sm text-slate-400 dark:text-slate-500 hover:text-sky-600 transition-colors font-medium">
            기기 점검
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{tool.title}</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-7">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-3xl bg-gradient-to-br ${tool.gradient} shadow-lg`}>
            <ToolIcon emoji={tool.icon} accent="rgba(255,255,255,0.55)" className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2.5">{tool.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">{tool.long}</p>
        </div>

        {tool.needsPermission && (
          <div className="mb-5 rounded-2xl border border-sky-100 dark:border-sky-900/40 bg-sky-50/70 dark:bg-sky-950/30 px-4 py-3 text-xs text-sky-800 dark:text-sky-200 leading-relaxed">
            🔒 브라우저가 권한을 물어보면 허용해 주세요. 카메라·마이크 데이터는 이 브라우저 안에서만 처리되고
            서버로 전송되거나 저장되지 않습니다.
          </div>
        )}

        {children}

        {/* 무엇을 재는 도구인지 — 검색으로 들어온 사람이 3초 안에 판단할 근거 */}
        <section className="mt-8" aria-label="점검 항목">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">이 테스트로 확인하는 것</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {tool.checks.map(c => (
              <li
                key={c}
                className="flex items-start gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-600 dark:text-slate-300"
              >
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {c}
              </li>
            ))}
          </ul>
        </section>

        <Faq items={SECTION_FAQ[`device/${tool.slug}`]} />

        <CrossLinks />

        {/* 상세에서 상세로 바로 넘어갈 수 있게 — 허브를 거치지 않는 동선 */}
        <section className="mt-8" aria-label="다른 기기 점검">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">다른 점검도 해보기</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link
                key={r.slug}
                href={`/device/${r.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:border-sky-300 hover:shadow-sm transition-all"
              >
                <ToolIcon emoji={r.icon} color={r.og[0]} accent={r.og[1]} className="w-5 h-5 shrink-0" />
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
          측정값은 브라우저가 알려주는 값이라 실제 하드웨어 사양과 다를 수 있습니다.
          <br />
          고장이 의심되면 제조사 진단 도구로 한 번 더 확인하세요.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
