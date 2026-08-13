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
import { thumbGradient } from '@/lib/thumbnail';
import { QUIZZES_INTL, QUIZZES_INTL_MAP, type QuizIntlLang } from '@/lib/quiz-l10n/index';
import { localeAlternates, hubAlternates } from '@/lib/locale-alternates';
import type { Quiz } from '@/lib/types';

/**
 * 한국어를 뺀 아홉 언어의 퀴즈 허브와 개별 페이지.
 *
 * 심리테스트와 같은 이유로 화면은 한 벌만 둔다([[components/TestIntlPage.tsx]]).
 * 한국어(app/quiz)는 182종이라 목록 구조부터 달라서 자기 화면을 쓴다.
 */

const UI: Record<QuizIntlLang, {
  eyebrow: string; nav: string; h1: string; lead: string; foot: string; more: string;
  metaTitle: string; metaDesc: string; home: string; crumb: string;
  detailTitle: (t: string) => string; detailDesc: (d: string) => string;
}> = {
  'en': {
    eyebrow: 'Quiz', nav: 'Quizzes', h1: 'Free Quizzes',
    lead: 'Ten questions each, four choices, every answer explained.',
    foot: 'Free online quizzes', more: 'More quizzes', home: 'Home', crumb: 'Quizzes',
    metaTitle: 'Free Quizzes — Geography, Science, History & Tech',
    metaDesc: 'Free online quizzes on world capitals, science, history, technology, the human body and film. Ten questions each, with explanations. No sign-up.',
    detailTitle: t => `${t} — Free Online Quiz`,
    detailDesc: d => `${d}. Ten questions with explanations. Free, no sign-up.`,
  },
  'es': {
    eyebrow: 'Test', nav: 'Tests', h1: 'Tests de conocimiento gratis',
    lead: 'Diez preguntas cada uno, cuatro opciones y explicación en todas.',
    foot: 'Tests de conocimiento gratis', more: 'Más tests', home: 'Inicio', crumb: 'Tests',
    metaTitle: 'Tests de conocimiento gratis — geografía, ciencia, historia y tecnología',
    metaDesc: 'Tests gratis sobre capitales del mundo, ciencia, historia, tecnología, el cuerpo humano y cine. Diez preguntas cada uno, con explicación. Sin registro.',
    detailTitle: t => `${t} — test gratis`,
    detailDesc: d => `${d}. Diez preguntas con explicación. Gratis, sin registro.`,
  },
  'pt-br': {
    eyebrow: 'Quiz', nav: 'Quizzes', h1: 'Quizzes grátis',
    lead: 'Dez perguntas cada um, quatro opções e explicação em todas.',
    foot: 'Quizzes online grátis', more: 'Mais quizzes', home: 'Início', crumb: 'Quizzes',
    metaTitle: 'Quizzes grátis — geografia, ciência, história e tecnologia',
    metaDesc: 'Quizzes grátis sobre capitais do mundo, ciência, história, tecnologia, o corpo humano e cinema. Dez perguntas cada um, com explicação. Sem cadastro.',
    detailTitle: t => `${t} — quiz grátis`,
    detailDesc: d => `${d}. Dez perguntas com explicação. Grátis, sem cadastro.`,
  },
  'ja': {
    eyebrow: 'クイズ', nav: 'クイズ', h1: '無料のクイズ',
    lead: '各10問、4択、すべての問題に解説つき。',
    foot: '無料のオンラインクイズ', more: 'ほかのクイズ', home: 'ホーム', crumb: 'クイズ',
    metaTitle: '無料のクイズ — 地理・科学・歴史・テクノロジー',
    metaDesc: '世界の首都、科学、歴史、テクノロジー、人体、映画の無料クイズ。各10問、解説つき。登録不要。',
    detailTitle: t => `${t} — 無料のオンラインクイズ`,
    detailDesc: d => `${d}。全10問、解説つき。登録不要で無料です。`,
  },
  'de': {
    eyebrow: 'Quiz', nav: 'Quiz', h1: 'Kostenlose Quiz',
    lead: 'Je zehn Fragen, vier Antworten, jede Lösung erklärt.',
    foot: 'Kostenlose Online-Quiz', more: 'Mehr Quiz', home: 'Start', crumb: 'Quiz',
    metaTitle: 'Kostenlose Quiz — Geografie, Wissenschaft, Geschichte und Technik',
    metaDesc: 'Kostenlose Online-Quiz zu Hauptstädten, Wissenschaft, Geschichte, Technik, dem menschlichen Körper und Film. Je zehn Fragen mit Erklärungen. Ohne Anmeldung.',
    detailTitle: t => `${t} — kostenloses Online-Quiz`,
    detailDesc: d => `${d}. Zehn Fragen mit Erklärungen. Kostenlos, ohne Anmeldung.`,
  },
  'fr': {
    eyebrow: 'Quiz', nav: 'Quiz', h1: 'Quiz gratuits',
    lead: 'Dix questions chacun, quatre choix, chaque réponse expliquée.',
    foot: 'Quiz en ligne gratuits', more: 'Plus de quiz', home: 'Accueil', crumb: 'Quiz',
    metaTitle: 'Quiz gratuits — géographie, sciences, histoire et technologie',
    metaDesc: 'Quiz en ligne gratuits sur les capitales du monde, les sciences, l’histoire, la technologie, le corps humain et le cinéma. Dix questions chacun, avec explications. Sans inscription.',
    detailTitle: t => `${t} — quiz en ligne gratuit`,
    detailDesc: d => `${d}. Dix questions avec explications. Gratuit, sans inscription.`,
  },
  'hi': {
    eyebrow: 'क्विज़', nav: 'क्विज़', h1: 'मुफ़्त क्विज़',
    lead: 'हर क्विज़ में दस सवाल, चार विकल्प, और हर जवाब की व्याख्या।',
    foot: 'मुफ़्त ऑनलाइन क्विज़', more: 'और क्विज़', home: 'होम', crumb: 'क्विज़',
    metaTitle: 'मुफ़्त क्विज़ — भूगोल, विज्ञान, इतिहास और तकनीक',
    metaDesc: 'दुनिया की राजधानियों, विज्ञान, इतिहास, तकनीक, मानव शरीर और सिनेमा पर मुफ़्त ऑनलाइन क्विज़। हर क्विज़ में दस सवाल, व्याख्या सहित। बिना रजिस्ट्रेशन।',
    detailTitle: t => `${t} — मुफ़्त ऑनलाइन क्विज़`,
    detailDesc: d => `${d}। दस सवाल, व्याख्या सहित। मुफ़्त, बिना रजिस्ट्रेशन।`,
  },
  'zh-hans': {
    eyebrow: '知识测验', nav: '知识测验', h1: '免费知识测验',
    lead: '每个十道题，四选一，每题都有解析。',
    foot: '免费在线测验', more: '别的测验', home: '首页', crumb: '知识测验',
    metaTitle: '免费知识测验 — 地理、科学、历史与科技',
    metaDesc: '关于世界首都、科学、历史、科技、人体和电影的免费在线测验。每个十道题，附解析，不用注册。',
    detailTitle: t => `${t} — 免费在线测验`,
    detailDesc: d => `${d}。十道题，附解析。免费，不用注册。`,
  },
  'zh-hant': {
    eyebrow: '知識測驗', nav: '知識測驗', h1: '免費知識測驗',
    lead: '每個十道題，四選一，每題都有解析。',
    foot: '免費線上測驗', more: '別的測驗', home: '首頁', crumb: '知識測驗',
    metaTitle: '免費知識測驗 — 地理、科學、歷史與科技',
    metaDesc: '關於世界首都、科學、歷史、科技、人體和電影的免費線上測驗。每個十道題，附解析，不用註冊。',
    detailTitle: t => `${t} — 免費線上測驗`,
    detailDesc: d => `${d}。十道題，附解析。免費，不用註冊。`,
  },
};

/** 아홉 언어가 같은 여섯 종을 가지므로 전환 목록은 언제나 아홉 개다. */
/*
 * 허브는 열 언어, 상세는 아홉 언어다.
 *
 * 항목 목록을 언어마다 따로 썼기 때문에 한국어와 번역판은 겹치는 슬러그가
 * 하나도 없다 — 상세에서 한국어를 띄우면 전부 404다. 하지만 허브 자체는
 * 열 언어에 다 있으므로, 여기까지 아홉 개로 두면 한국어에서 건너간 사람이
 * 돌아올 길이 없어진다. 실제로 그 상태였다.
 */
const HUB_LANGS = ALL_LOCALES10;
const INTL_LANGS = Object.keys(QUIZZES_INTL) as QuizIntlLang[];

export function quizIntlMeta(lang: QuizIntlLang) {
  const ui = UI[lang];
  return {
    title: ui.metaTitle,
    description: ui.metaDesc,
    alternates: {
      canonical: `/${lang}/quiz`,
      // 한국어 허브까지 넣는다 — 상호 선언이 아니면 구글이 무시한다
      languages: hubAlternates('quiz'),
    },
  };
}

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
      <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
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
        <p className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">{ui.eyebrow}</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.h1}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">{ui.lead}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {quizzes.map(q => (
            <Link prefetch={false} key={q.slug} href={`/${lang}/quiz/${q.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${thumbGradient(q.slug, 'quiz')} text-white p-5 min-h-[9.5rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
              <div className="flex items-start justify-between">
                <ToolIcon emoji={q.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-bold bg-white/25 rounded-full px-2 py-0.5">{q.questions.length}</span>
              </div>
              <div>
                <div className="text-base font-black drop-shadow leading-tight">{q.title}</div>
                <div className="text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{q.desc}</div>
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
  return {
    title: ui.detailTitle(quiz.title),
    description: ui.detailDesc(quiz.desc),
    alternates: {
      canonical: `/${lang}/quiz/${slug}`,
      // 한국어에 같은 슬러그가 있으면 그것까지 넣는다 — 상호 선언이 아니면
      // 구글이 무시한다. 어느 언어에 실제로 있는지는 이 함수가 안다.
      languages: localeAlternates('quiz', slug),
    },
  };
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
