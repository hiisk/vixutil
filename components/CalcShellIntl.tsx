import Link from 'next/link';
import SiteFooter from './SiteFooter';
import PageGlow from './PageGlow';
import Faq from './Faq';
import LangPicker from './LangPicker';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from './JsonLd';
import ReferralCards from './ReferralCards';
import { CALC_SHELL } from '@/lib/calc-l10n/shell';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeHref } from '@/lib/locales';

/**
 * 계산기 상세의 다국어 껍데기.
 *
 * 한국어 CalcShell과 나란한 자리인데 둘을 합치지 않았다. 한국어 쪽은
 * RelatedCalcs·CalcFaq가 usePathname으로 현재 경로를 읽어 한국어 카탈로그에서
 * 추천과 FAQ를 꺼내 온다. 여기서 그걸 그대로 쓰면 독일어 페이지에 한국어
 * 계산기 목록이 붙는다 — 그래서 관련 목록과 FAQ를 prop으로 받는다.
 *
 * 같은 이유로 CrossLinks("찾는 도구가 있나요?")와 CalcShareBtn("공유")도 뺐다.
 * 둘 다 문구가 한국어로 박혀 있어서, 독일어 화면에 한국어 두 조각만 남는다.
 * SiteFooter·ReferralCards는 lang을 받으므로 넘겨 준다 — 안 넘기면 기본값이
 * 'ko'라 조용히 한국어가 나온다. 실제로 처음에 그렇게 나왔다.
 */
export default function CalcShellIntl({
  lang,
  slug,
  title,
  description,
  wide,
  faq,
  intro,
  related,
  children,
}: {
  lang: CalcLang;
  /** 언어 접두어를 뺀 슬러그. 예: 'bmi', 'dev/json' */
  slug: string;
  title: string;
  description: string;
  wide?: boolean;
  faq?: { q: string; a: string }[];
  intro?: { h: string; p: string }[];
  related?: { slug: string; title: string; short: string }[];
  children: React.ReactNode;
}) {
  const ui = CALC_SHELL[lang];
  const route = `/calculator/${slug}`;
  const path = localeHref(lang, route);
  const hub = localeHref(lang, '/calculator');
  const width = wide ? 'max-w-3xl' : 'max-w-xl';

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="blue" />

      <div className="relative">
        <JsonLd
          data={breadcrumbJsonLd([
            { name: ui.home, path: localeHref(lang, '/') },
            { name: ui.calculators, path: hub },
            { name: title, path },
          ])}
        />
        <JsonLd data={webAppJsonLd(title, description, path)} />

        <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400" />

        <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/60 dark:border-slate-700/60 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
            <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors font-medium shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {ui.allCalcs}
            </Link>
            <span className="text-slate-200 dark:text-slate-700">·</span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex-1 truncate">{title}</span>
            <span className="shrink-0">
              <LangPicker current={lang} route={route} available={CALC_LOCALES} />
            </span>
          </div>
        </header>

        <div className={`${width} mx-auto px-4 pt-8 pb-2`}>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{description}</p>
        </div>

        <main className={`${width} mx-auto px-4 py-6 pb-8`}>
          {children}

          {intro && intro.length > 0 && (
            <div className="mt-8 text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
              {intro.map(s => (
                <section key={s.h}>
                  <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1.5">{s.h}</h2>
                  <p>{s.p}</p>
                </section>
              ))}
            </div>
          )}

          <ReferralCards lang={lang} placement="result" />

          {related && related.length > 0 && (
            <section className="mt-8" aria-label={ui.related}>
              <h2 className="sec-h2">{ui.related}</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {related.map(r => (
                  <Link
                    key={r.slug}
                    href={localeHref(lang, `/calculator/${r.slug}`)}
                    className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 transition-colors">{r.title}</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">{r.short}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <Faq items={faq} lang={lang} />
        </main>

        <SiteFooter lang={lang} referral={false} />
      </div>
    </div>
  );
}

/**
 * 계산기 버튼에 띄울 언어.
 *
 * 한국어를 넣는다 — 여기 온 쉰넷은 한국어에도 같은 슬러그가 있다. 한국어에만
 * 있는 쉰셋은 애초에 이 껍데기를 쓰지 않으므로 여기 걸릴 일이 없다.
 */
const CALC_LOCALES = ['ko', 'en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'] as const;
