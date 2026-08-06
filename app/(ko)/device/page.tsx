import ToolIcon from '@/components/ToolIcon';
import { alternateLanguages10 } from '@/lib/locales';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import { SECTION_FAQ } from '@/lib/section-faq';
import { DEVICE_TOOLS } from '@/lib/device-tools';
import { DEVICE_UI } from '@/lib/device/ui';
import { SCREEN_ICON } from '@/lib/device/route';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '기기 점검 — 키보드·마우스·마이크·웹캠 온라인 테스트',
  description:
    '키보드 입력, 마우스 채터링, 마이크 볼륨, 웹캠 화면, 스피커 좌우, 모니터 불량화소, 주사율까지 설치 없이 브라우저에서 바로 점검하세요. 무료·회원가입 없음.',
  alternates: {
    canonical: '/device',
    languages: alternateLanguages10('/device'),
  },
});

const CATEGORY_ORDER = ['입력장치', '오디오', '영상', '화면', '정보'];

export default function DeviceHubPage() {
  const grouped = CATEGORY_ORDER.map(c => ({
    category: c,
    tools: DEVICE_TOOLS.filter(t => t.category === c),
  })).filter(g => g.tools.length > 0);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '기기 점검', path: '/device' },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          '기기 점검',
          '/device',
          DEVICE_TOOLS.map(t => ({ name: t.title, path: `/device/${t.slug}` })),
        )}
      />

      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-500 via-teal-500 to-indigo-600" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-sky-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">기기 점검</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/device" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-9">
          <ToolIcon emoji="🧰" className="w-12 h-12 mx-auto mb-4 text-slate-800 dark:text-slate-100" />
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">기기 점검</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            키보드·마우스·마이크·웹캠·스피커·모니터가 제대로 도는지
            <br className="sm:hidden" /> 브라우저에서 바로 확인하세요
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 mb-7 text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center">
          🔒 설치·회원가입 없이 바로 씁니다. 카메라·마이크 데이터는 이 브라우저 안에서만 처리되고 서버로 전송되지 않습니다.
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
                    href={`/device/${t.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow-md hover:border-sky-200 transition-all"
                  >
                    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${t.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-3">
                        <ToolIcon emoji={t.icon} color={t.og[0]} accent={t.og[1]} className="w-8 h-8" />
                        {t.needsPermission && (
                          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-600 border border-sky-100 dark:border-sky-900/50">
                            권한 필요
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mb-1">{t.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{t.desc}</p>
                      <span className="flex items-center gap-1 text-xs font-semibold text-sky-600">
                        테스트 하기
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

        {/* 화면 규격은 점검 도구가 아니라 자료라서 갈래 바깥에 따로 세운다 */}
        <Link
          href="/device/screen"
          className="group mt-10 flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-gradient-to-br from-sky-400 to-indigo-500">
            <ToolIcon emoji={SCREEN_ICON} accent="rgba(255,255,255,0.55)" className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-slate-800 dark:text-slate-100">
              {DEVICE_UI.ko.hubTitle}
            </span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{DEVICE_UI.ko.hubLead}</span>
          </span>
        </Link>

        <div className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="sec-h2">이럴 때 쓰세요</h2>
          <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>🛒 <b className="text-slate-800 dark:text-slate-100">중고 거래 전후</b> — 키보드·모니터·패드를 그 자리에서 확인</li>
            <li>📦 <b className="text-slate-800 dark:text-slate-100">새 기기 개봉 직후</b> — 불량화소와 안 눌리는 키는 초기에 잡아야 교환됩니다</li>
            <li>💼 <b className="text-slate-800 dark:text-slate-100">화상회의·면접 직전</b> — 마이크와 카메라를 1분 만에 점검</li>
            <li>🎮 <b className="text-slate-800 dark:text-slate-100">게임 전</b> — 주사율이 제대로 나오는지, 스틱이 흐르지 않는지 확인</li>
          </ul>
        </div>

        <Faq items={SECTION_FAQ.device} />

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9">
          측정값은 브라우저가 알려주는 값이라 실제 하드웨어 사양과 다를 수 있습니다
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
