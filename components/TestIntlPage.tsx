import ToolIcon from '@/components/ToolIcon';
import { localesWithItem } from '@/lib/locale-alternates';
import { ALL_LOCALES10 } from '@/lib/locales';
import Link from 'next/link';
import LangPicker from '@/components/LangPicker';
import PageGlow from '@/components/PageGlow';
import TestEngine from '@/components/TestEngine';
import JsonLd, { breadcrumbJsonLd, itemListJsonLd } from '@/components/JsonLd';
import Faq from '@/components/Faq';
import { SECTION_FAQ_INTL } from '@/lib/section-faq-intl';
import { testFaqIntl } from '@/lib/content-faq-intl';
import { thumbGradient } from '@/lib/thumbnail';
import { TESTS_INTL, TESTS_INTL_MAP, type TestIntlLang } from '@/lib/test-l10n/index';
import { localeAlternates, hubAlternates } from '@/lib/locale-alternates';
import type { Test } from '@/lib/types';

/**
 * 한국어를 뺀 아홉 언어의 심리테스트 허브와 개별 페이지.
 *
 * 전에는 `app/en/test/page.tsx`와 `[slug]/page.tsx`가 손으로 쓰인 영어 전용
 * 페이지였다. 아홉 언어로 늘리면서 같은 파일을 아홉 벌 복사하면, 나중에 한
 * 군데를 고칠 때 여덟 곳이 조용히 남는다. 그래서 화면은 여기 한 벌만 두고
 * 각 라우트는 언어만 넘긴다.
 *
 * 한국어(app/test)는 아직 자기 화면을 쓴다 — 228종은 목록 구조부터 다르다.
 */

const UI: Record<TestIntlLang, {
  eyebrow: string; nav: string; h1: string; lead: string; foot: string; more: string;
  metaTitle: string; metaDesc: string; home: string; crumb: string;
  detailTitle: (t: string) => string; detailDesc: (d: string) => string;
}> = {
  'en': {
    eyebrow: 'Test', nav: 'Tests', h1: 'Free Personality Tests',
    lead: 'Ten questions each, about two minutes, results you can actually use.',
    foot: 'Free personality tests', more: 'More tests', home: 'Home', crumb: 'Tests',
    metaTitle: 'Free Personality Tests — Social Battery, Stress, Decisions & More',
    metaDesc: 'Free personality tests: social battery, how you handle stress, your decision style, working style and how you show affection. Ten questions each, no sign-up.',
    detailTitle: t => `${t} — Free Personality Test`,
    detailDesc: d => `${d}. Ten questions, about two minutes. Free, no sign-up.`,
  },
  'es': {
    eyebrow: 'Test', nav: 'Tests', h1: 'Tests de personalidad gratis',
    lead: 'Diez preguntas cada uno, unos dos minutos, resultados que sirven de algo.',
    foot: 'Tests de personalidad gratis', more: 'Más tests', home: 'Inicio', crumb: 'Tests',
    metaTitle: 'Tests de personalidad gratis — batería social, estrés, decisiones y más',
    metaDesc: 'Tests de personalidad gratis: batería social, cómo llevas el estrés, tu forma de decidir, tu forma de trabajar y cómo demuestras cariño. Diez preguntas cada uno, sin registro.',
    detailTitle: t => `${t} — test de personalidad gratis`,
    detailDesc: d => `${d}. Diez preguntas, unos dos minutos. Gratis, sin registro.`,
  },
  'pt-br': {
    eyebrow: 'Teste', nav: 'Testes', h1: 'Testes de personalidade grátis',
    lead: 'Dez perguntas cada um, cerca de dois minutos, resultados que dá para usar.',
    foot: 'Testes de personalidade grátis', more: 'Mais testes', home: 'Início', crumb: 'Testes',
    metaTitle: 'Testes de personalidade grátis — bateria social, estresse, decisões e mais',
    metaDesc: 'Testes de personalidade grátis: bateria social, como você lida com o estresse, seu jeito de decidir, seu jeito de trabalhar e como demonstra carinho. Dez perguntas cada um, sem cadastro.',
    detailTitle: t => `${t} — teste de personalidade grátis`,
    detailDesc: d => `${d}. Dez perguntas, cerca de dois minutos. Grátis, sem cadastro.`,
  },
  'ja': {
    eyebrow: '心理テスト', nav: '心理テスト', h1: '無料の心理テスト',
    lead: '各10問、約2分。読んで役に立つ結果だけを書きました。',
    foot: '無料の心理テスト', more: 'ほかの診断', home: 'ホーム', crumb: '心理テスト',
    metaTitle: '無料の心理テスト — ソーシャルバッテリー・ストレス・決め方ほか',
    metaDesc: '無料の心理テスト。ソーシャルバッテリー、ストレスとの付き合い方、決め方のクセ、仕事のスタイル、愛情の伝え方。各10問、登録不要。',
    detailTitle: t => `${t} — 無料の心理テスト`,
    detailDesc: d => `${d}。全10問、約2分。登録不要で無料です。`,
  },
  'de': {
    eyebrow: 'Test', nav: 'Tests', h1: 'Kostenlose Persönlichkeitstests',
    lead: 'Je zehn Fragen, etwa zwei Minuten, Ergebnisse, mit denen sich etwas anfangen lässt.',
    foot: 'Kostenlose Persönlichkeitstests', more: 'Mehr Tests', home: 'Start', crumb: 'Tests',
    metaTitle: 'Kostenlose Persönlichkeitstests — Social Battery, Stress, Entscheidungen und mehr',
    metaDesc: 'Kostenlose Persönlichkeitstests: Social Battery, Umgang mit Stress, Entscheidungsstil, Arbeitsstil und wie du Zuneigung zeigst. Je zehn Fragen, ohne Anmeldung.',
    detailTitle: t => `${t} — kostenloser Persönlichkeitstest`,
    detailDesc: d => `${d}. Zehn Fragen, etwa zwei Minuten. Kostenlos, ohne Anmeldung.`,
  },
  'fr': {
    eyebrow: 'Test', nav: 'Tests', h1: 'Tests de personnalité gratuits',
    lead: 'Dix questions chacun, environ deux minutes, des résultats qui servent vraiment.',
    foot: 'Tests de personnalité gratuits', more: 'Plus de tests', home: 'Accueil', crumb: 'Tests',
    metaTitle: 'Tests de personnalité gratuits — batterie sociale, stress, décisions et plus',
    metaDesc: 'Tests de personnalité gratuits : batterie sociale, gestion du stress, façon de décider, façon de travailler et façon de montrer son affection. Dix questions chacun, sans inscription.',
    detailTitle: t => `${t} — test de personnalité gratuit`,
    detailDesc: d => `${d}. Dix questions, environ deux minutes. Gratuit, sans inscription.`,
  },
  'hi': {
    eyebrow: 'टेस्ट', nav: 'टेस्ट', h1: 'मुफ़्त पर्सनैलिटी टेस्ट',
    lead: 'हर टेस्ट में दस सवाल, लगभग दो मिनट, और नतीजे जो सचमुच काम आएँ।',
    foot: 'मुफ़्त पर्सनैलिटी टेस्ट', more: 'और टेस्ट', home: 'होम', crumb: 'टेस्ट',
    metaTitle: 'मुफ़्त पर्सनैलिटी टेस्ट — सोशल बैटरी, तनाव, फ़ैसले और बहुत कुछ',
    metaDesc: 'मुफ़्त पर्सनैलिटी टेस्ट: सोशल बैटरी, तनाव से निपटने का तरीक़ा, फ़ैसले लेने का अंदाज़, काम करने का तरीक़ा और प्यार जताने का ढंग। हर टेस्ट में दस सवाल, बिना रजिस्ट्रेशन।',
    detailTitle: t => `${t} — मुफ़्त पर्सनैलिटी टेस्ट`,
    detailDesc: d => `${d}। दस सवाल, लगभग दो मिनट। मुफ़्त, बिना रजिस्ट्रेशन।`,
  },
  'zh-hans': {
    eyebrow: '心理测试', nav: '心理测试', h1: '免费心理测试',
    lead: '每个十道题，约两分钟，结果是真能用上的那种。',
    foot: '免费心理测试', more: '别的测试', home: '首页', crumb: '心理测试',
    metaTitle: '免费心理测试 — 社交电量、压力、决策方式等',
    metaDesc: '免费心理测试：社交电量、你怎么应对压力、你怎么做决定、你的工作方式，以及你怎么表达在乎。每个十道题，不用注册。',
    detailTitle: t => `${t} — 免费心理测试`,
    detailDesc: d => `${d}。十道题，约两分钟。免费，不用注册。`,
  },
  'zh-hant': {
    eyebrow: '心理測驗', nav: '心理測驗', h1: '免費心理測驗',
    lead: '每個十道題，約兩分鐘，結果是真能用上的那種。',
    foot: '免費心理測驗', more: '別的測驗', home: '首頁', crumb: '心理測驗',
    metaTitle: '免費心理測驗 — 社交電量、壓力、決策方式等',
    metaDesc: '免費心理測驗：社交電量、你怎麼應對壓力、你怎麼做決定、你的工作方式，以及你怎麼表達在乎。每個十道題，不用註冊。',
    detailTitle: t => `${t} — 免費心理測驗`,
    detailDesc: d => `${d}。十道題，約兩分鐘。免費，不用註冊。`,
  },
};

/** 아홉 언어가 같은 다섯 종을 가지므로 전환 목록은 언제나 아홉 개다. */
/*
 * 허브는 열 언어, 상세는 아홉 언어다.
 *
 * 항목 목록을 언어마다 따로 썼기 때문에 한국어와 번역판은 겹치는 슬러그가
 * 하나도 없다 — 상세에서 한국어를 띄우면 전부 404다. 하지만 허브 자체는
 * 열 언어에 다 있으므로, 여기까지 아홉 개로 두면 한국어에서 건너간 사람이
 * 돌아올 길이 없어진다. 실제로 그 상태였다.
 */
const HUB_LANGS = ALL_LOCALES10;
const INTL_LANGS = Object.keys(TESTS_INTL) as TestIntlLang[];

export function testIntlUi(lang: TestIntlLang) {
  return UI[lang];
}

export function testIntlMeta(lang: TestIntlLang) {
  const ui = UI[lang];
  return {
    title: ui.metaTitle,
    description: ui.metaDesc,
    alternates: {
      canonical: `/${lang}/test`,
      // 한국어 허브까지 넣는다 — 상호 선언이 아니면 구글이 무시한다
      languages: hubAlternates('test'),
    },
  };
}

export function TestIntlHub({ lang }: { lang: TestIntlLang }) {
  const ui = UI[lang];
  const tests = TESTS_INTL[lang];
  return (
    <div className="page-wrap">
      {/* 한국어 허브가 내던 구조화 데이터를 아홉 언어에도 낸다 — 목록 페이지는
          CollectionPage와 ItemList가 있어야 검색 결과에서 목록으로 읽힌다 */}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: `/${lang}` },
          { name: ui.crumb, path: `/${lang}/test` },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          ui.crumb,
          `/${lang}/test`,
          TESTS_INTL[lang].map(x => ({ name: x.title, path: `/${lang}/test/${x.slug}` })),
        )}
      />
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-500 to-pink-600" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href={`/${lang}/test`} className="font-black text-violet-600 text-lg shrink-0">vixutil</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.nav}</span>
          <span className="ml-auto flex items-center gap-2">
            <LangPicker current={lang} route="/test" available={HUB_LANGS} />
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-xs font-bold text-violet-600 tracking-widest uppercase mb-2">{ui.eyebrow}</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{ui.h1}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">{ui.lead}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {tests.map(t => (
            <Link key={t.slug} href={`/${lang}/test/${t.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${thumbGradient(t.slug, 'test')} text-white p-5 min-h-[9.5rem] flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all`}>
              <div className="flex items-start justify-between">
                <ToolIcon emoji={t.icon} accent="rgba(255,255,255,0.55)" className="w-9 h-9 drop-shadow-lg transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-bold bg-white/25 rounded-full px-2 py-0.5">{t.questions.length}</span>
              </div>
              <div>
                <div className="text-base font-black drop-shadow leading-tight">{t.title}</div>
                <div className="text-[11px] font-medium text-white/80 mt-1 line-clamp-2">{t.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* 한국어 허브에만 있던 FAQ를 아홉 언어에도 붙인다 — FAQPage 구조화 데이터가
            함께 나가야 검색 결과에서 접힘 항목을 받을 수 있다 */}
        <Faq items={SECTION_FAQ_INTL[lang].test} lang={lang} />
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <span className="text-sm font-black text-violet-600">vixutil</span>
        <p className="text-xs text-slate-400 mt-1">{ui.foot}</p>
      </footer>
    </div>
  );
}

export function testIntlDetailMeta(lang: TestIntlLang, slug: string) {
  const test = TESTS_INTL_MAP[lang][slug];
  if (!test) return {};
  const ui = UI[lang];
  return {
    title: ui.detailTitle(test.title),
    description: ui.detailDesc(test.desc),
    alternates: {
      canonical: `/${lang}/test/${slug}`,
      // 한국어에 같은 슬러그가 있으면 그것까지 넣는다 — 상호 선언이 아니면
      // 구글이 무시한다. 어느 언어에 실제로 있는지는 이 함수가 안다.
      languages: localeAlternates('test', slug),
    },
  };
}

export function TestIntlDetail({ lang, test }: { lang: TestIntlLang; test: Test }) {
  const ui = UI[lang];
  const others = TESTS_INTL[lang].filter(t => t.slug !== test.slug);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: `/${lang}/test` },
          { name: ui.crumb, path: `/${lang}/test` },
          { name: test.title, path: `/${lang}/test/${test.slug}` },
        ])}
      />
      <div className="max-w-lg mx-auto px-4 w-full pt-3 flex justify-end">
        <LangPicker current={lang} route={`/test/${test.slug}`} available={localesWithItem('test', test.slug)} />
      </div>
      <TestEngine test={test} lang={lang} />
      <div className="max-w-lg mx-auto px-4 w-full">
        {/* 상세 FAQ도 한국어에만 있었다. 데이터에서 만들어 페이지마다 답이 달라진다 */}
        <Faq items={testFaqIntl(lang, test)} lang={lang} className="" />
      </div>
      <div className="max-w-lg mx-auto px-4 w-full pb-10 pt-8">
        <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">{ui.more}</h2>
        <div className="grid grid-cols-2 gap-2">
          {others.map(o => (
            <Link key={o.slug} href={`/${lang}/test/${o.slug}`}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 hover:-translate-y-0.5 hover:shadow transition-all">
              <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-6 h-6 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight">{o.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href={`/${lang}/test`} className="text-sm font-black text-violet-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">{ui.foot}</p>
      </footer>
    </>
  );
}
