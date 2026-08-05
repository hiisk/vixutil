import ToolIcon from '@/components/ToolIcon';
import { alternateLanguages10 } from '@/lib/locales';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { TEXT_TOOLS } from '@/lib/text-tools';
import { GLYPH_UI } from '@/lib/glyph/ui';
import { GLYPH_ICON } from '@/lib/glyph/list';
import { REGEX_ICON } from '@/lib/regex/list';
import { REGEX_UI } from '@/lib/regex/ui';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '텍스트 도구 — 한영타 변환·영문 이름·특수문자',
  description:
    '한/영 잘못 친 글자 되돌리기, 여권 영문 이름, 한글 금액, 초성 변환, 특수문자·이모티콘, 중복 줄 제거, 원고지 매수까지 한 곳에서. 설치 없이 브라우저에서 바로.',
  alternates: {
    canonical: '/text',
    languages: alternateLanguages10('/text'),
  },
});

const CATEGORY_ORDER = ['한글 변환', '정리·편집', '기호·입력', '세기·쓰기'];

export default function TextHubPage() {
  const grouped = CATEGORY_ORDER.map(c => ({
    category: c,
    tools: TEXT_TOOLS.filter(t => t.category === c),
  })).filter(g => g.tools.length > 0);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '텍스트 도구', path: '/text' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          '텍스트 도구',
          '/text',
          TEXT_TOOLS.map(t => ({ name: t.title, path: `/text/${t.slug}` })),
        )}
      />

      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-indigo-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">텍스트 도구</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/text" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-9">
          <ToolIcon emoji="✍️" className="w-12 h-12 mx-auto mb-4 text-slate-800 dark:text-slate-100" />
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">텍스트 도구</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            한글을 다루다 생기는 잔일들
            <br className="sm:hidden" /> — 한 곳에서 끝내세요
          </p>
        </div>

        <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/70 dark:bg-indigo-950/30 px-4 py-3.5 mb-7 text-xs text-indigo-800 dark:text-indigo-200 leading-relaxed text-center">
          🔒 입력한 글은 브라우저 안에서만 처리됩니다. 서버로 전송되지 않으니 계약서나 자기소개서도 안심하고 넣으세요.
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
                    href={`/text/${t.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow-md hover:border-indigo-200 transition-all"
                  >
                    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${t.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <div className="relative">
                      <ToolIcon emoji={t.icon} color={t.og[0]} accent={t.og[1]} className="w-9 h-9 block mb-3" />
                      <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mb-1">{t.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{t.desc}</p>
                      <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600">
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
            <li>⌨️ <b className="text-slate-800 dark:text-slate-100">한/영을 안 바꾸고 다 쳤을 때</b> — 지우고 다시 치지 말고 그대로 붙여 넣으세요</li>
            <li>🛂 <b className="text-slate-800 dark:text-slate-100">여권을 처음 만들 때</b> — 영문 이름은 한 번 정하면 바꾸기 어렵습니다</li>
            <li>🧾 <b className="text-slate-800 dark:text-slate-100">계약서를 쓸 때</b> — 금액은 숫자와 한글을 함께 적습니다</li>
            <li>📝 <b className="text-slate-800 dark:text-slate-100">자기소개서를 쓸 때</b> — 글자수 기준과 남은 분량을 확인하세요</li>
          </ul>
        </div>

        {/* 특수문자는 도구가 아니라 눌러서 복사하는 목록이라 갈래 바깥에 세운다 */}
        <Link
          href="/text/char"
          className="group mt-10 flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-gradient-to-br from-cyan-500 to-blue-600">
            <ToolIcon emoji={GLYPH_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{GLYPH_UI.ko.hubTitle}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{GLYPH_UI.ko.hubLead}</span>
          </span>
        </Link>

        <Link
          href="/text/regex"
          className="group mt-4 flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-gradient-to-br from-sky-500 to-indigo-500">
            <ToolIcon emoji={REGEX_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{REGEX_UI.ko.hubTitle}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{REGEX_UI.ko.hubLead}</span>
          </span>
        </Link>

        <Faq items={SECTION_FAQ.text} />

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9">
          모든 처리는 브라우저에서만 이루어집니다 · 무료 · 회원가입 없음
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
