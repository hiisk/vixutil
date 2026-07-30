import ToolIcon from '@/components/ToolIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { TIME_TOOLS } from '@/lib/time-tools';

export const metadata: Metadata = {
  title: '시간 도구 — 타이머·스톱워치·세계시계',
  description:
    '타이머, 스톱워치, 뽀모도로, 알람, 세계 시계, 시차 계산, 근무일 계산, 날짜 더하기, 주차 확인까지 한 곳에서. 설치 없이 브라우저에서 바로.',
  alternates: {
    canonical: '/time',
    languages: { 'ko': '/time', 'en': '/en/time', 'x-default': '/en/time' },
  },
};

const CATEGORY_ORDER = ['재기', '세계 시간', '날짜 세기'];

export default function TimeHubPage() {
  const grouped = CATEGORY_ORDER.map(c => ({
    category: c,
    tools: TIME_TOOLS.filter(t => t.category === c),
  })).filter(g => g.tools.length > 0);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '시간 도구', path: '/time' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          '시간 도구',
          '/time',
          TIME_TOOLS.map(t => ({ name: t.title, path: `/time/${t.slug}` })),
        )}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-blue-500 via-sky-500 to-fuchsia-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-sky-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">시간 도구</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-9">
          <ToolIcon emoji="⏰" title="시간 도구" color="#0ea5e9" accent="#f43f5e" className="w-14 h-14 mx-auto mb-4" />
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">시간 도구</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            재는 것과 세는 것
            <br className="sm:hidden" /> — 탭 하나면 됩니다
          </p>
        </div>

        <div className="rounded-2xl border border-sky-100 dark:border-sky-900/40 bg-sky-50/70 dark:bg-sky-950/30 px-4 py-3.5 mb-7 text-xs text-sky-800 dark:text-sky-200 leading-relaxed text-center">
⏱️ 타이머·알람은 이 탭이 열려 있는 동안 동작합니다. 설치도 회원가입도 없습니다.
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
                    href={`/time/${t.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow-md hover:border-sky-200 transition-all"
                  >
                    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${t.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <div className="relative">
                      <ToolIcon emoji={t.icon} title={t.title} color={t.og[0]} accent={t.og[1]} className="w-9 h-9 block mb-3" />
                      <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mb-1">{t.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{t.desc}</p>
                      <span className="flex items-center gap-1 text-xs font-semibold text-sky-600">
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
            <li>🍜 <b className="text-slate-800 dark:text-slate-100">요리하거나 운동할 때</b> — 타이머와 스톱워치를 탭 하나로</li>
            <li>📚 <b className="text-slate-800 dark:text-slate-100">집중이 안 될 때</b> — 25분만 하기로 정하면 시작이 쉬워집니다</li>
            <li>🌏 <b className="text-slate-800 dark:text-slate-100">해외와 일할 때</b> — 양쪽 다 업무 시간인 구간을 찾아 드립니다</li>
            <li>📆 <b className="text-slate-800 dark:text-slate-100">기한을 셀 때</b> — 주말 빼고 며칠인지, 100일 뒤가 언제인지</li>
          </ul>
        </div>

        <Faq items={SECTION_FAQ.time} />

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9">
모든 계산은 브라우저에서만 이루어집니다 · 무료 · 회원가입 없음
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
