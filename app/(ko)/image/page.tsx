import ToolIcon from '@/components/ToolIcon';
import Ad from '@/components/Ad';
import { alternateLanguages10 } from '@/lib/locales';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { IMAGE_TOOLS } from '@/lib/image-tools';
import { IMG_SIZE_UI } from '@/lib/imgsize/ui';
import { IMG_SIZE_ICON } from '@/lib/imgsize/list';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '이미지 도구 — 사진 용량 줄이기·크기 조절·자르기 온라인',
  description:
    '사진 용량 줄이기, 크기 조절, JPG·PNG·WebP 변환, 자르기, 회전, 모자이크, 이어붙이기, 색상 추출까지 설치 없이 브라우저에서. 사진은 서버에 올라가지 않습니다.',
  alternates: {
    canonical: '/image',
    languages: alternateLanguages10('/image'),
  },
});

const CATEGORY_ORDER = ['용량·크기', '편집', '분석'];

export default function ImageHubPage() {
  const grouped = CATEGORY_ORDER.map(c => ({
    category: c,
    tools: IMAGE_TOOLS.filter(t => t.category === c),
  })).filter(g => g.tools.length > 0);

  return (
    <div className="page-wrap">
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
      <div className="h-1 topbar" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="page-back hover:text-violet-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">이미지 도구</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/image" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-10">
        <div className="hero-band ">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="🖼️" className="h-6 w-6" /></span>
          <h1 className="page-h1">이미지 도구</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            용량 줄이기·크기 조절·자르기·모자이크까지
            <br className="sm:hidden" /> 사진을 올리지 않고 브라우저에서 바로
          </p>
        </div>

        <div className="note mb-7 ">
          🔒 모든 편집은 이 브라우저 안에서 끝납니다. 사진이 서버로 전송되지 않으니 신분증·계좌 캡처도 안심하고 쓰세요.
        </div>

        <div className="flex flex-col gap-7">
          {/*
            광고를 목록 앞에 둔다. 푸터에 두었더니 이 허브에서 스크롤 깊이가
            71~92%였다 — 서너 화면에서 열세 화면 아래라 대부분 못 본다.
          */}
          <Ad />
          {grouped.map(g => (
            <section key={g.category} aria-label={g.category}>
              <h2 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                {g.category}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {g.tools.map(t => (
                  <Link
                    key={t.slug}
                    href={`/image/${t.slug}`}
                    className="hub-tool-card group relative overflow-hidden rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                  >
                    <div className="relative">
                      <ToolIcon emoji={t.icon} color={t.og[0]} accent={t.og[1]} className="w-9 h-9 block mb-3" />
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">{t.title}</h3>
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

        <div className="mt-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="sec-h2">이럴 때 쓰세요</h2>
          <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>📎 <b className="text-slate-800 dark:text-slate-100">첨부 용량 제한에 걸렸을 때</b> — 용량 줄이기로 화질을 조금만 낮추면 대부분 통과합니다</li>
            <li>🪪 <b className="text-slate-800 dark:text-slate-100">중고거래·본인확인 캡처</b> — 주소와 계좌를 모자이크로 가리고 보내세요</li>
            <li>📱 <b className="text-slate-800 dark:text-slate-100">대화 캡처가 여러 장일 때</b> — 세로로 이어붙이면 한 장으로 정리됩니다</li>
            <li>🖥️ <b className="text-slate-800 dark:text-slate-100">업로드 규격이 정해져 있을 때</b> — 크기 조절과 자르기로 규격을 맞추세요</li>
          </ul>
        </div>

        {/* 크기 목록은 도구가 아니라 자료라서 갈래 바깥에 따로 세운다 */}

        <Link

          href="/image/size"

          className="group mt-10 flex items-center gap-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all"

        >

          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-sec-soft">

            <ToolIcon emoji={IMG_SIZE_ICON} className="w-6 h-6 transition-transform group-hover:scale-110" />

          </span>

          <span className="min-w-0">

            <span className="block text-sm font-bold text-slate-800 dark:text-slate-100">{IMG_SIZE_UI.ko.hubTitle}</span>

            <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{IMG_SIZE_UI.ko.hubLead}</span>

          </span>

        </Link>


        <Faq items={SECTION_FAQ.image} />

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-9">
          모든 처리는 브라우저에서만 이루어집니다 · 무료 · 회원가입 없음
        </p>
      </main>

      <SiteFooter referral={false} />
    </div>
  );
}
