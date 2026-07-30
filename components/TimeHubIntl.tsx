import Link from 'next/link';
import { lang8OfLocale } from '@/lib/i18n/lang8';
import { TIME_REGIONS, citiesOfRegion, timeCountry } from '@/lib/time/cities8';
import { TIME_UI } from '@/lib/time/ui';
import ToolIcon from '@/components/ToolIcon';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import { timeToolsIntl, TIME_CATEGORY_ORDER, TIME_SHELL_UI, type ToolIntlLang } from '@/lib/time-tools-intl';

/**
 * 시간 도구 허브의 번역 화면 — 일곱 언어가 이 하나를 쓴다.
 *
 * 색상 허브(ColorHubIntl)와 같은 이유로 한 곳에 모았다. 언어마다 page.tsx를
 * 복제하면 문구 하나를 고칠 때 일곱 곳을 손대야 하고, 그중 한 곳을 빼먹은 것은
 * 화면을 열어 보기 전까지 드러나지 않는다.
 */
export default function TimeHubIntl({ lang }: { lang: ToolIntlLang }) {
  const tools = timeToolsIntl(lang);
  const ui = TIME_SHELL_UI[lang];
  // 도시 시계 쪽 문구는 짧은 열쇠를 쓴다 — 'pt-br'과 'pt'가 만나는 자리다
  const key = lang8OfLocale(lang);
  const w = TIME_UI[key];
  const grouped = TIME_CATEGORY_ORDER[lang]
    .map(c => ({ category: c, tools: tools.filter(t => t.category === c) }))
    .filter(g => g.tools.length > 0);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="sky" />
      <div className="h-1 bg-gradient-to-r from-sky-400 to-cyan-600" />

      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href={`/${lang}`} className="font-black text-cyan-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.section}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route="/time" />
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-cyan-600 tracking-widest uppercase mb-2">{ui.eyebrow}</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.section}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">{ui.hubLead}</p>

        {grouped.map(g => (
          <section key={g.category} className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{g.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {g.tools.map(t => (
                <Link
                  key={t.slug}
                  href={`/${lang}/time/${t.slug}`}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.gradient} text-white p-5 min-h-[9rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}
                >
                  <ToolIcon emoji={t.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
                  <span>
                    <span className="block text-base font-black drop-shadow leading-tight">{t.title}</span>
                    <span className="block text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{t.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/*
          도시 116곳의 현재 시각. 도구가 "재는" 쪽이라면 이쪽은 "보는" 쪽이다 —
          뉴욕이 지금 몇 시인지 알고 싶은 사람은 타이머를 열 생각이 없다.
        */}
        <section className="mb-8" aria-label={w.section}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{w.hubTitle}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{w.hubLead}</p>
          {TIME_REGIONS.map(region => (
            <div key={region} className="mb-4">
              <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 mb-1.5">{w.regionLabel[region]}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {citiesOfRegion(region).map(city => (
                  <Link
                    key={city.slug}
                    href={`/${lang}/time/${city.slug}`}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 hover:shadow-sm hover:border-sky-300 transition-all"
                  >
                    <span className="shrink-0">{timeCountry(city.country)?.flag}</span>
                    <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 truncate">
                      {city.name[key]}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6 leading-relaxed">{ui.notice}</p>
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-cyan-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">{ui.hubFoot}</p>
      </footer>
    </div>
  );
}
