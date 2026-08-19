import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CalcShareBtn from './CalcShareBtn';
import SiteFooter from './SiteFooter';
import PageGlow from './PageGlow';
import Faq from './Faq';
import LangPicker from './LangPicker';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from './JsonLd';
import ReferralCards from './ReferralCards';
import ReferralAside, { RAIL_WRAP } from './ReferralAside';
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
 * 같은 이유로 CrossLinks("찾는 도구가 있나요?")는 뺐다 — 문구가 한국어로 박혀
 * 있어서 독일어 화면에 한국어 한 조각만 남는다. CalcShareBtn도 같은 까닭으로
 * 빠져 있었는데, 이제 문구가 lib/share/ui.ts에서 열 언어로 나오므로 되살렸다
 * (2026-08-15). 국제 계산기 158장에 공유 경로가 아예 없던 상태였다.
 *
 * SiteFooter·ReferralCards·CalcShareBtn은 lang을 받으므로 넘겨 준다 — 안 넘기면
 * 기본값이 'ko'라 조용히 한국어가 나온다. 실제로 처음에 그렇게 나왔다.
 */
/**
 * 본문 기둥 — 머리 띠와 본문이 **이 하나를** 나눠 쓴다.
 *
 * 폭이 두 곳에 적히면 한쪽만 고쳤을 때 제목이 본문과 다른 자리에서 시작한다.
 * 실제로 그랬던 적이 있어 tests/referral-placement.test.ts가 붙들고 있다.
 * 렌더 밖에 두는 것은 안에서 만들면 렌더마다 새 컴포넌트가 되기 때문이다.
 */
function Column({ width, children }: { width: string; children: React.ReactNode }) {
  return <div className={`${width} mx-auto w-full min-w-0 xl:mx-0`}>{children}</div>;
}

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
  /*
    본문 폭은 한국어 CalcShell과 같은 값을 쓴다 (2026-08-12). 576px는 한 줄에
    34자쯤이라 1440px 화면에서 양옆이 430px씩 비었다 — lg부터 한 단계 넓혔다.
    sm 이하는 한 픽셀도 그대로다. 머리글과 본문이 이 값을 함께 쓴다.
  */
  const width = wide ? 'max-w-3xl lg:max-w-4xl' : 'max-w-xl lg:max-w-2xl';


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

        <div className="h-1 topbar" />

        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
            <Link href={hub} className="page-back hover:text-blue-600 shrink-0">
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
            <span className="shrink-0">
              <CalcShareBtn lang={lang} />
            </span>
          </div>
        </header>

        <div className={wide ? RAIL_WRAP.wide : RAIL_WRAP.narrow}>
          <Column width={width}>
            {/* 머리 — 기둥 안에 있고 실선만 화면 폭으로 나간다(globals.css .hero-band) */}
            <div className="hero-band px-4">
              <PageHero className="hero-flat" title={title} desc={description} icon="🧮" />
            </div>

            <main className="tool-body tool-lift px-4 pb-8">
              {children}

              {/*
                결과 바로 아래 — 한국어 CalcShell과 같은 자리다 (2026-08-15).
                까닭과 "결과 전에도 그대로 보이는" 이유는 그쪽 주석에 적어 두었다.
                rail — 옆 레일이 함께 뜨는 화면에서는 본문 카드가 1위만 남긴다.
                section='calc' — 한국어 껍데기와 같은 이름을 쓴다, 언어만 갈린다.
              */}
              <ReferralCards lang={lang} placement="result" rail section="calc" />

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

              {related && related.length > 0 && (
                <section className="mt-8" aria-label={ui.related}>
                  <h2 className="sec-h2">{ui.related}</h2>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {related.map(r => (
                      <Link
                        key={r.slug}
                        href={localeHref(lang, `/calculator/${r.slug}`)}
                        className="group rounded-xl border chip-off px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all"
                      >
                        <span className="hub-card-title group-hover:text-blue-700 transition-colors">{r.title}</span>
                        <span className="hub-card-desc">{r.short}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <Faq items={faq} lang={lang} />
            </main>
          </Column>

          {/* 문구는 lang을 따라간다 — 안 넘기면 기본값이 'ko'라 독일어 화면에 한국어가 뜬다 */}
          <ReferralAside lang={lang} section="calc" />
        </div>

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
