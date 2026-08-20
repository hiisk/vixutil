import ToolIcon from '@/components/ToolIcon';
import Ad from '@/components/Ad';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import CrossLinks from '@/components/CrossLinks';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { findDeviceTool, relatedDeviceTools } from '@/lib/device-tools';
import LangPicker from '@/components/LangPicker';

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
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '기기 점검', path: '/device' },
          { name: tool.title, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(tool.title, tool.long, path)} />

      <PageGlow accent="sky" />
      <div className={`h-1 topbar`} />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href="/" className="page-back hover:text-sky-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href="/device" className="text-sm text-slate-500 dark:text-slate-400 hover:text-sky-600 transition-colors font-medium">
            기기 점검
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{tool.title}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route={`/device/${slug}`} />
          </span>
        </div>
      </header>

      {/* 머리 띠 — 화면을 가로지르고 안의 글만 본문 폭에 맞춘다 */}
      <div className="hero-band">
        <div className="max-w-2xl mx-auto px-4"><PageHero className="hero-flat" title={tool.title} desc={tool.long} icon={tool.icon} /></div>
      </div>

      <main id="main" className="relative max-w-2xl mx-auto px-4 pb-10 tool-lift">


        {tool.needsPermission && (
          <div className="note mb-5">
            🔒 브라우저가 권한을 물어보면 허용해 주세요. 카메라·마이크 데이터는 이 브라우저 안에서만 처리되고
            서버로 전송되거나 저장되지 않습니다.
          </div>
        )}

        {children}


        {/*

          도구 바로 뒤가 광고 자리다. 푸터에 두었더니 이 껍데기를 쓰는

          화면에서 스크롤 깊이가 88~92%였다 — 여덟 화면 아래라 못 본다.

          도구를 다 쓴 직후이고, 도구를 가리지도 않는다.

        */}

        <Ad />

        {/* 무엇을 재는 도구인지 — 검색으로 들어온 사람이 3초 안에 판단할 근거 */}
        <section className="mt-8" aria-label="점검 항목">
          <h2 className="sec-h2">이 테스트로 확인하는 것</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {tool.checks.map(c => (
              <li
                key={c}
                className="flex items-start gap-2 rounded-xl border chip-off px-3.5 py-2.5 text-sm text-slate-600 dark:text-slate-300"
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
          <h2 className="sec-h2">다른 점검도 해보기</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link prefetch={false}
                key={r.slug}
                href={`/device/${r.slug}`}
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

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-9 leading-relaxed">
          측정값은 브라우저가 알려주는 값이라 실제 하드웨어 사양과 다를 수 있습니다.
          <br />
          고장이 의심되면 제조사 진단 도구로 한 번 더 확인하세요.
        </p>
      </main>

      <SiteFooter referral={false} />
    </div>
  );
}
