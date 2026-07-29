import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { CONVERT_TOOLS, CONVERT_CATEGORIES, convert, format } from '@/lib/convert-tools';

export const metadata: Metadata = {
  title: '단위 변환 — 평·근·돈부터 인치·파운드까지 50종',
  description:
    '평↔㎡, 근↔g, 돈↔g, cm↔인치, kg↔파운드, 섭씨↔화씨, Mbps↔MB/s 등 50가지 단위 변환을 한 곳에서. 자주 찾는 값 표와 계산식까지 함께 봅니다.',
  alternates: { canonical: '/convert' },
};

export default function ConvertHubPage() {
  const grouped = CONVERT_CATEGORIES.map(c => ({
    category: c,
    tools: CONVERT_TOOLS.filter(t => t.category === c),
  })).filter(g => g.tools.length > 0);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '단위 변환', path: '/convert' }])} />
      <JsonLd
        data={itemListJsonLd('단위 변환', '/convert', CONVERT_TOOLS.map(t => ({ name: t.title, path: `/convert/${t.slug}` })))}
      />

      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">단위 변환</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-9">
          <div className="text-5xl mb-4">🔄</div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">단위 변환</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            평·근·돈처럼 아직 쓰는 우리 단위부터
            <br className="sm:hidden" /> 인치·파운드까지 {CONVERT_TOOLS.length}가지
          </p>
        </div>

        <div className="rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/70 dark:bg-blue-950/30 px-4 py-3.5 mb-7 text-xs text-blue-800 dark:text-blue-200 leading-relaxed text-center">
          🔢 양방향으로 계산됩니다. 어느 칸에 넣어도 반대쪽이 바뀝니다.
        </div>

        <div className="flex flex-col gap-7">
          {grouped.map(g => (
            <section key={g.category} aria-label={g.category}>
              <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
                {g.category} <span className="text-slate-300 dark:text-slate-600">{g.tools.length}</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {g.tools.map(t => (
                  <Link
                    key={t.slug}
                    href={`/convert/${t.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <span className="text-xl shrink-0">{t.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 transition-colors">
                        {t.title}
                      </span>
                      <span className="block text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">
                        1{t.from} = {format(convert(1, t), Math.max(t.digits, 2))}{t.to}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">이럴 때 쓰세요</h2>
          <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>🏠 <b className="text-slate-800 dark:text-slate-100">부동산을 볼 때</b> — 84㎡가 몇 평인지 바로 나옵니다</li>
            <li>🥩 <b className="text-slate-800 dark:text-slate-100">시장에서</b> — 한 근이 600g인지 375g인지 품목마다 다릅니다</li>
            <li>💍 <b className="text-slate-800 dark:text-slate-100">금값을 볼 때</b> — 한 돈은 3.75g, 시세는 그램 단위로 고시됩니다</li>
            <li>📶 <b className="text-slate-800 dark:text-slate-100">인터넷이 느릴 때</b> — 100Mbps의 실제 속도는 12.5MB/s입니다</li>
          </ul>
        </div>

        <Faq items={SECTION_FAQ.convert} />

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9">
          전통 단위는 지역·품목에 따라 값이 다를 수 있습니다 · 무료 · 회원가입 없음
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
