/* 옮겨 옴 — components/TestIntlPage.tsx의 UI 표.
   허브 메타가 이 표를 쓰는데, 메타 함수가 컴포넌트 파일 안에 있으면 서버 그래프가
   뷰에 닿아 그 라우트의 클라이언트 청크가 통째로 합쳐진다(components/FoldView.tsx 머리말).
   그래서 표와 메타만 여기로 갈랐다 — 그리는 것은 원래 파일에 그대로 있다. */
import type { TestIntlLang } from '@/lib/test-l10n/index';

export const UI: Record<TestIntlLang, {
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
