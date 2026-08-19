import ToolIcon from '@/components/ToolIcon';
import { alternateLanguages10 } from '@/lib/locales';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { SOUND_TOOLS } from '@/lib/sound-tools';
import { SOUND_UI } from '@/lib/sound/ui';
import { FREQ_ICON } from '@/lib/sound/freqs';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '소리 도구 — 메트로놈·튜너·백색소음',
  description:
    '메트로놈, 악기 튜너, BPM 측정, 백색소음, 바이노럴 비트, 소음 측정, 음성 녹음, 주파수 생성까지. 음원 파일 없이 브라우저가 직접 소리를 만듭니다.',
  alternates: {
    canonical: '/sound',
    languages: alternateLanguages10('/sound'),
  },
});

const CATEGORY_ORDER = ['연주·연습', '집중·수면', '측정', '신호음'];

export default function SoundHubPage() {
  const grouped = CATEGORY_ORDER.map(c => ({
    category: c,
    tools: SOUND_TOOLS.filter(t => t.category === c),
  })).filter(g => g.tools.length > 0);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '소리 도구', path: '/sound' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          '소리 도구',
          '/sound',
          SOUND_TOOLS.map(t => ({ name: t.title, path: `/sound/${t.slug}` })),
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
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">소리 도구</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/sound" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-10">
        <div className="hero-band ">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="🔊" className="h-6 w-6" /></span>
          <h1 className="page-h1">소리 도구</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            브라우저가 직접 만드는 소리
            <br className="sm:hidden" /> — 음원 파일 없이 정확하게
          </p>
        </div>

        <div className="note mb-7 ">소리는 계산으로 만들고, 마이크 입력은 브라우저 안에서만 분석합니다. 전송되지 않습니다.
        </div>

        <div className="flex flex-col gap-7">
          {grouped.map(g => (
            <section key={g.category} aria-label={g.category}>
              <h2 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
                {g.category}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {g.tools.map(t => (
                  <Link
                    key={t.slug}
                    href={`/sound/${t.slug}`}
                    className="group relative overflow-hidden rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
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
            <li>🎸 <b className="text-slate-800 dark:text-slate-100">악기를 잡았을 때</b> — 튜너로 조율하고 메트로놈으로 박자를 잡습니다</li>
            <li>🌙 <b className="text-slate-800 dark:text-slate-100">잠이 안 올 때</b> — 백색소음으로 주변 소리를 덮습니다</li>
            <li>📢 <b className="text-slate-800 dark:text-slate-100">윗집이 시끄러울 때</b> — 소음이 어느 정도인지 재어 봅니다</li>
            <li>🎙️ <b className="text-slate-800 dark:text-slate-100">발음을 연습할 때</b> — 녹음해서 직접 들어 보세요</li>
          </ul>
        </div>

        {/* 주파수 목록은 도구가 아니라 자료라서 갈래 바깥에 따로 세운다 */}
        <Link
          href="/sound/hz"
          className="group mt-10 flex items-center gap-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-sec-soft">
            <ToolIcon emoji={FREQ_ICON} className="w-6 h-6 transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-slate-800 dark:text-slate-100">{SOUND_UI.ko.hubTitle}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{SOUND_UI.ko.hubLead}</span>
          </span>
        </Link>

        <Faq items={SECTION_FAQ.sound} />

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9">
모든 소리는 브라우저에서 만들어집니다 · 무료 · 회원가입 없음
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
