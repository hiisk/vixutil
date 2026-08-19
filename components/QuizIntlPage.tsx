import { UI } from '@/lib/meta/quiz-hub-ui';
import PageHero from '@/components/PageHero';
import ToolIcon from '@/components/ToolIcon';
import { localesWithItem } from '@/lib/locale-alternates';
import { ALL_LOCALES10 } from '@/lib/locales';
import Link from 'next/link';
import LangPicker from '@/components/LangPicker';
import PageGlow from '@/components/PageGlow';
import QuizEngine from '@/components/QuizEngine';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ_INTL } from '@/lib/section-faq-intl';
import { quizFaqIntl } from '@/lib/content-faq-intl';
import { thumbSurface } from '@/lib/thumbnail';
import { QUIZZES_INTL, QUIZZES_INTL_MAP, type QuizIntlLang } from '@/lib/quiz-l10n/index';
import { localeAlternates, hubAlternates } from '@/lib/locale-alternates';
import type { Quiz } from '@/lib/types';
import { withCard } from '@/lib/og-cards';

/**
 * 한국어를 뺀 아홉 언어의 퀴즈 허브와 개별 페이지.
 *
 * 심리테스트와 같은 이유로 화면은 한 벌만 둔다([[components/TestIntlPage.tsx]]).
 * 한국어(app/quiz)는 182종이라 목록 구조부터 달라서 자기 화면을 쓴다.
 */

/* UI 표는 lib/meta/quiz-hub-ui.ts로 옮겼다 — 허브 메타와 같이 쓴다 */


/*
 * 허브는 열 언어, 상세는 아홉 언어다.
 *
 * 항목 목록을 언어마다 따로 썼기 때문에 한국어 206종과 번역 6종은 슬러그가
 * 거의 겹치지 않는다 — 상세에서 한국어를 띄우면 대개 404다. 하지만 허브
 * 자체는 열 언어에 다 있으므로, 여기까지 아홉 개로 두면 한국어에서 건너간
 * 사람이 돌아올 길이 없어진다. 실제로 그 상태였다.
 *
 * "하나도 안 겹친다"고 적혀 있었지만 사실이 아니다 — world-history는 한국어에도
 * 같은 슬러그로 있다. hreflang은 그래서 실제 맵에서 뽑는다
 * ([[lib/locale-alternates.ts]]).
 */
const HUB_LANGS = ALL_LOCALES10;

export { quizIntlMeta } from '@/lib/meta/quiz-hub';

export function QuizIntlHub({ lang }: { lang: QuizIntlLang }) {
  const ui = UI[lang];
  const quizzes = QUIZZES_INTL[lang];
  return (
    <div className="page-wrap">
      {/* 한국어 허브가 내던 구조화 데이터를 아홉 언어에도 낸다 — 목록 페이지는
          CollectionPage와 ItemList가 있어야 검색 결과에서 목록으로 읽힌다 */}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: `/${lang}` },
          { name: ui.crumb, path: `/${lang}/quiz` },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          ui.crumb,
          `/${lang}/quiz`,
          QUIZZES_INTL[lang].map(x => ({ name: x.title, path: `/${lang}/quiz/${x.slug}` })),
        )}
      />
      <PageGlow accent="amber" />
      <div className="h-1 topbar" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link prefetch={false} href={`/${lang}/quiz`} className="font-black text-amber-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.nav}</span>
          <span className="ml-auto flex items-center gap-2">
            <LangPicker current={lang} route="/quiz" available={HUB_LANGS} />
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="hero-band">
          <PageHero title={ui.h1} desc={ui.lead} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {quizzes.map(q => (
            <Link prefetch={false} key={q.slug} href={`/${lang}/quiz/${q.slug}`}
              className={`group relative overflow-hidden rounded-lg ${thumbSurface(q.slug, 'quiz')} p-5 min-h-[9.5rem] flex flex-col justify-between hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 transition-all`}>
              <div className="flex items-start justify-between">
                <ToolIcon emoji={q.icon} className="w-9 h-9 drop-shadow-sm transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-bold bg-white/25 rounded-full px-2 py-0.5">{q.questions.length}</span>
              </div>
              <div>
                <div className="text-base font-black drop-shadow leading-tight">{q.title}</div>
                <div className="text-[11px] font-medium opacity-80 mt-1 line-clamp-2">{q.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* 한국어 허브에만 있던 FAQ를 아홉 언어에도 붙인다 — FAQPage 구조화 데이터가
            함께 나가야 검색 결과에서 접힘 항목을 받을 수 있다 */}
        <Faq items={SECTION_FAQ_INTL[lang].quiz} lang={lang} />
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-amber-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">{ui.foot}</p>
      </footer>
    </div>
  );
}

export function quizIntlDetailMeta(lang: QuizIntlLang, slug: string) {
  const quiz = QUIZZES_INTL_MAP[lang][slug];
  if (!quiz) return {};
  const ui = UI[lang];
  // 낱장은 섹션 카드(/og/<언어>/quiz)를 물려받는다 — 여기에 카드를 새로 만들지 않는다
  return withCard({
    title: ui.detailTitle(quiz.title),
    description: ui.detailDesc(quiz.desc),
    alternates: {
      canonical: `/${lang}/quiz/${slug}`,
      // 한국어에 같은 슬러그가 있으면 그것까지 넣는다 — 상호 선언이 아니면
      // 구글이 무시한다. 어느 언어에 실제로 있는지는 이 함수가 안다.
      languages: localeAlternates('quiz', slug),
    },
  });
}

export function QuizIntlDetail({ lang, quiz }: { lang: QuizIntlLang; quiz: Quiz }) {
  const ui = UI[lang];
  const others = QUIZZES_INTL[lang].filter(q => q.slug !== quiz.slug);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: `/${lang}/quiz` },
          { name: ui.crumb, path: `/${lang}/quiz` },
          { name: quiz.title, path: `/${lang}/quiz/${quiz.slug}` },
        ])}
      />
      <div className="max-w-lg mx-auto px-4 w-full pt-3 flex justify-end">
        <LangPicker current={lang} route={`/quiz/${quiz.slug}`} available={localesWithItem('quiz', quiz.slug)} />
      </div>
      <QuizEngine quiz={quiz} lang={lang} />
      <div className="max-w-lg mx-auto px-4 w-full">
        {/* 상세 FAQ도 한국어에만 있었다. 데이터에서 만들어 페이지마다 답이 달라진다 */}
        <Faq items={quizFaqIntl(lang, quiz)} lang={lang} className="" />
      </div>
      <div className="max-w-lg mx-auto px-4 w-full pb-10 pt-8">
        <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">{ui.more}</h2>
        <div className="grid grid-cols-2 gap-2">
          {others.map(o => (
            <Link prefetch={false} key={o.slug} href={`/${lang}/quiz/${o.slug}`}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 hover:-translate-y-0.5 hover:shadow transition-all">
              <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-6 h-6 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight">{o.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link prefetch={false} href={`/${lang}/quiz`} className="text-sm font-black text-amber-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">{ui.foot}</p>
      </footer>
    </>
  );
}
