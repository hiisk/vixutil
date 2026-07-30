import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { IMAGE_TOOLS } from '@/lib/image-tools';

export const metadata: Metadata = {
  title: '이미지 도구 — 사진 용량 줄이기·크기 조절·자르기 온라인',
  description:
    '사진 용량 줄이기, 크기 조절, JPG·PNG·WebP 변환, 자르기, 회전, 모자이크, 이어붙이기, 색상 추출까지 설치 없이 브라우저에서. 사진은 서버에 올라가지 않습니다.',
  alternates: {
    canonical: '/image',
    languages: { 'ko': '/image', 'en': '/en/image', 'zh': '/zh/image', 'x-default': '/en/image' },
  },
};

const CATEGORY_ORDER = ['용량·크기', '편집', '분석'];

export default function ImageHubPage() {
  const grouped = CATEGORY_ORDER.map(c => ({
    category: c,
    tools: IMAGE_TOOLS.filter(t => t.category === c),
  })).filter(g => g.tools.length > 0);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '이미지 도구', path: '/image' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          '이미지 도구',
          '/image',
          IMAGE_TOOLS.map(t => ({ name: t.title, path: `/image/${t.slug}` })),
        )}
      />

      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">이미지 도구</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-9">
          <ToolIcon emoji="🖼️" className="w-12 h-12 mx-auto mb-4 text-slate-800 dark:text-slate-100" />
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">이미지 도구</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            용량 줄이기·크기 조절·자르기·모자이크까지
            <br className="sm:hidden" /> 사진을 올리지 않고 브라우저에서 바로
          </p>
        </div>

        <div className="rounded-2xl border border-violet-100 dark:border-violet-900/40 bg-violet-50/70 dark:bg-violet-950/30 px-4 py-3.5 mb-7 text-xs text-violet-800 dark:text-violet-200 leading-relaxed text-center">
          🔒 모든 편집은 이 브라우저 안에서 끝납니다. 사진이 서버로 전송되지 않으니 신분증·계좌 캡처도 안심하고 쓰세요.
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
                    href={`/image/${t.slug}`}
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
            <li>📎 <b className="text-slate-800 dark:text-slate-100">첨부 용량 제한에 걸렸을 때</b> — 용량 줄이기로 화질을 조금만 낮추면 대부분 통과합니다</li>
            <li>🪪 <b className="text-slate-800 dark:text-slate-100">중고거래·본인확인 캡처</b> — 주소와 계좌를 모자이크로 가리고 보내세요</li>
            <li>📱 <b className="text-slate-800 dark:text-slate-100">대화 캡처가 여러 장일 때</b> — 세로로 이어붙이면 한 장으로 정리됩니다</li>
            <li>🖥️ <b className="text-slate-800 dark:text-slate-100">업로드 규격이 정해져 있을 때</b> — 크기 조절과 자르기로 규격을 맞추세요</li>
          </ul>
        </div>

        <Faq items={SECTION_FAQ.image} />

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9">
          모든 처리는 브라우저에서만 이루어집니다 · 무료 · 회원가입 없음
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
