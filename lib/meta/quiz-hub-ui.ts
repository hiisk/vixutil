/* 옮겨 옴 — components/QuizIntlPage.tsx의 UI 표.
   허브 메타가 이 표를 쓰는데, 메타 함수가 컴포넌트 파일 안에 있으면 서버 그래프가
   뷰에 닿아 그 라우트의 클라이언트 청크가 통째로 합쳐진다(components/FoldView.tsx 머리말).
   그래서 표와 메타만 여기로 갈랐다 — 그리는 것은 원래 파일에 그대로 있다. */
import type { QuizIntlLang } from '@/lib/quiz-l10n/index';

export const UI: Record<QuizIntlLang, {
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
