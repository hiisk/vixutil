import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { COLOR_TOOLS } from '@/lib/color-tools';

export const metadata: Metadata = {
  title: '색상 도구 — 팔레트·대비 검사·그라디언트',
  description:
    '어울리는 색 조합 만들기, 글자가 읽히는지 WCAG 대비 검사, 색맹 시뮬레이션, CSS 그라디언트·그림자 코드 생성, 색온도 변환까지 한 곳에서. 무료·설치 없음.',
  alternates: {
    canonical: '/color',
    languages: { 'ko': '/color', 'en': '/en/color', 'x-default': '/en/color' },
  },
};

const CATEGORY_ORDER = ['팔레트', '접근성', 'CSS', '변환'];

export default function ColorHubPage() {
  const grouped = CATEGORY_ORDER.map(c => ({
    category: c,
    tools: COLOR_TOOLS.filter(t => t.category === c),
  })).filter(g => g.tools.length > 0);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '색상 도구', path: '/color' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          '색상 도구',
          '/color',
          COLOR_TOOLS.map(t => ({ name: t.title, path: `/color/${t.slug}` })),
        )}
      />

      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">색상 도구</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-9">
          <ToolIcon emoji="🎨" className="w-12 h-12 mx-auto mb-4 text-slate-800 dark:text-slate-100" />
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">색상 도구</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            어울리는 색과 읽히는 색
            <br className="sm:hidden" /> — 감이 아니라 규칙으로 고르세요
          </p>
        </div>

        <div className="rounded-2xl border border-violet-100 dark:border-violet-900/40 bg-violet-50/70 dark:bg-violet-950/30 px-4 py-3.5 mb-7 text-xs text-violet-800 dark:text-violet-200 leading-relaxed text-center">
🎨 계산은 전부 브라우저 안에서 끝납니다. 회원가입도 저장도 없습니다.
        </div>

        <div className="flex flex-col gap-7">
          {grouped.map(g => (
            <section key={g.category} aria-label={g.category}>
              <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
                {g.category}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {g.tools.map(t => (
                  <Link
                    key={t.slug}
                    href={`/color/${t.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow-md hover:border-violet-200 transition-all"
                  >
                    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${t.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <div className="relative">
                      <ToolIcon emoji={t.icon} color={t.og[0]} accent={t.og[1]} className="w-9 h-9 block mb-3" />
                      <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mb-1">{t.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{t.desc}</p>
                      <span className="flex items-center gap-1 text-xs font-semibold text-violet-600">
                        바로 쓰기
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">이럴 때 쓰세요</h2>
          <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>🎨 <b className="text-slate-800 dark:text-slate-100">브랜드 색을 정했을 때</b> — 명도 단계와 어울리는 보조색을 한 번에 만듭니다</li>
            <li>👁️ <b className="text-slate-800 dark:text-slate-100">글씨가 안 읽힐 때</b> — 대비를 재고 색상은 그대로 둔 채 밝기만 맞춥니다</li>
            <li>👓 <b className="text-slate-800 dark:text-slate-100">색으로 상태를 구분할 때</b> — 색약자에게도 구분되는지 확인하세요</li>
            <li>💻 <b className="text-slate-800 dark:text-slate-100">CSS를 쓸 때</b> — 그라디언트와 그림자 코드를 눈으로 보며 가져갑니다</li>
          </ul>
        </div>

        <Faq items={SECTION_FAQ.color} />

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9">
모든 계산은 브라우저에서만 이루어집니다 · 무료 · 회원가입 없음
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
