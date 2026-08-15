/* 옮겨 옴 — components/ChecklistIntlPage.tsx의 UI 표.
   허브 메타가 이 표를 쓰는데, 메타 함수가 컴포넌트 파일 안에 있으면 서버 그래프가
   뷰에 닿아 그 라우트의 클라이언트 청크가 통째로 합쳐진다(components/FoldView.tsx 머리말).
   그래서 표와 메타만 여기로 갈랐다 — 그리는 것은 원래 파일에 그대로 있다. */
import type { ChecklistIntlLang } from '@/lib/checklist-l10n/index';

export const UI: Record<ChecklistIntlLang, {
  eyebrow: string; nav: string; h1: string; leadA: string; leadB: string; leadC: string;
  foot: string; more: string; metaTitle: string; metaDesc: string; home: string; crumb: string;
  /** 카드 제목에서 떼어낼 낱말. 없으면 제목 그대로 */
  trim?: string;
  detailTitle: (t: string, n: number) => string;
  detailDesc: (d: string, n: number) => string;
}> = {
  'en': {
    eyebrow: 'Checklists', nav: 'Checklists', h1: 'Free Checklists',
    leadA: 'Tick things off as you go — ', leadB: 'progress saves in your browser', leadC: ', no account needed.',
    foot: 'Free interactive checklists', more: 'More checklists', home: 'Home', crumb: 'Checklists',
    trim: ' Checklist',
    metaTitle: 'Free Checklists — Moving, Travel, Work, Health & More',
    metaDesc: 'Free interactive checklists for moving house, international travel, job interviews, camping, weddings and more. Tick items off, progress saves automatically.',
    detailTitle: (t, n) => `${t} — ${n} Things to Tick Off`,
    detailDesc: (d, n) => `${d}. ${n} items, progress saved in your browser. Free, no sign-up.`,
  },
  'es': {
    eyebrow: 'Listas', nav: 'Listas', h1: 'Listas de comprobación gratis',
    leadA: 'Ve marcando lo que haces — ', leadB: 'el progreso se guarda en tu navegador', leadC: ', sin cuenta.',
    foot: 'Listas interactivas gratis', more: 'Más listas', home: 'Inicio', crumb: 'Listas',
    trim: 'Lista para ',
    metaTitle: 'Listas de comprobación gratis — mudanza, viajes, trabajo, salud y más',
    metaDesc: 'Listas interactivas gratis para la mudanza, viajar al extranjero, entrevistas de trabajo, acampada, bodas y más. Ve marcando: el progreso se guarda solo.',
    detailTitle: (t, n) => `${t} — ${n} cosas que marcar`,
    detailDesc: (d, n) => `${d}. ${n} puntos, el progreso se guarda en tu navegador. Gratis, sin registro.`,
  },
  'pt-br': {
    eyebrow: 'Checklists', nav: 'Checklists', h1: 'Checklists grátis',
    leadA: 'Vá marcando conforme avança — ', leadB: 'o progresso fica salvo no navegador', leadC: ', sem conta.',
    foot: 'Checklists interativos grátis', more: 'Mais checklists', home: 'Início', crumb: 'Checklists',
    trim: 'Checklist de ',
    metaTitle: 'Checklists grátis — mudança, viagem, trabalho, saúde e mais',
    metaDesc: 'Checklists interativos grátis para mudança, viagem internacional, entrevista de emprego, acampamento, casamento e mais. Vá marcando: o progresso salva sozinho.',
    detailTitle: (t, n) => `${t} — ${n} itens para marcar`,
    detailDesc: (d, n) => `${d}. ${n} itens, progresso salvo no navegador. Grátis, sem cadastro.`,
  },
  'ja': {
    eyebrow: 'チェックリスト', nav: 'チェックリスト', h1: '無料のチェックリスト',
    leadA: '進めながらチェックを入れてください。', leadB: '進み具合はブラウザに保存されます', leadC: '。登録は不要です。',
    foot: '無料のチェックリスト', more: 'ほかのチェックリスト', home: 'ホーム', crumb: 'チェックリスト',
    trim: 'チェックリスト',
    metaTitle: '無料のチェックリスト — 引っ越し・旅行・仕事・健康ほか',
    metaDesc: '引っ越し、海外旅行、面接、キャンプ、結婚式などの無料チェックリスト。チェックを入れるだけで進み具合が自動保存されます。',
    detailTitle: (t, n) => `${t} — 確認する${n}項目`,
    detailDesc: (d, n) => `${d}。全${n}項目、進み具合はブラウザに保存。登録不要で無料です。`,
  },
  'de': {
    eyebrow: 'Checklisten', nav: 'Checklisten', h1: 'Kostenlose Checklisten',
    leadA: 'Hak ab, was erledigt ist — ', leadB: 'der Fortschritt bleibt im Browser gespeichert', leadC: ', ohne Konto.',
    foot: 'Kostenlose interaktive Checklisten', more: 'Mehr Checklisten', home: 'Start', crumb: 'Checklisten',
    trim: '-Checkliste',
    metaTitle: 'Kostenlose Checklisten — Umzug, Reise, Arbeit, Gesundheit und mehr',
    metaDesc: 'Kostenlose interaktive Checklisten für Umzug, Auslandsreise, Vorstellungsgespräch, Camping, Hochzeit und mehr. Abhaken genügt, der Fortschritt speichert sich automatisch.',
    detailTitle: (t, n) => `${t} — ${n} Punkte zum Abhaken`,
    detailDesc: (d, n) => `${d}. ${n} Punkte, Fortschritt im Browser gespeichert. Kostenlos, ohne Anmeldung.`,
  },
  'fr': {
    eyebrow: 'Checklists', nav: 'Checklists', h1: 'Checklists gratuites',
    leadA: 'Coche au fur et à mesure — ', leadB: 'la progression est enregistrée dans ton navigateur', leadC: ', sans compte.',
    foot: 'Checklists interactives gratuites', more: 'Plus de checklists', home: 'Accueil', crumb: 'Checklists',
    trim: 'Checklist de ',
    metaTitle: 'Checklists gratuites — déménagement, voyage, travail, santé et plus',
    metaDesc: 'Checklists interactives gratuites pour le déménagement, un voyage à l’étranger, un entretien d’embauche, le camping, un mariage et plus. Coche : la progression se sauvegarde toute seule.',
    detailTitle: (t, n) => `${t} — ${n} points à cocher`,
    detailDesc: (d, n) => `${d}. ${n} points, progression enregistrée dans ton navigateur. Gratuit, sans inscription.`,
  },
  'hi': {
    eyebrow: 'चेकलिस्ट', nav: 'चेकलिस्ट', h1: 'मुफ़्त चेकलिस्ट',
    leadA: 'जैसे-जैसे काम हो, टिक करते जाइए — ', leadB: 'प्रगति आपके ब्राउज़र में सेव रहती है', leadC: ', खाता बनाने की ज़रूरत नहीं।',
    foot: 'मुफ़्त इंटरैक्टिव चेकलिस्ट', more: 'और चेकलिस्ट', home: 'होम', crumb: 'चेकलिस्ट',
    trim: ' की चेकलिस्ट',
    metaTitle: 'मुफ़्त चेकलिस्ट — घर बदलना, यात्रा, काम, सेहत और बहुत कुछ',
    metaDesc: 'घर बदलने, विदेश यात्रा, नौकरी के इंटरव्यू, कैंपिंग, शादी और बहुत कुछ के लिए मुफ़्त इंटरैक्टिव चेकलिस्ट। टिक करते जाइए, प्रगति अपने आप सेव होती है।',
    detailTitle: (t, n) => `${t} — टिक करने के लिए ${n} बातें`,
    detailDesc: (d, n) => `${d}। ${n} बिंदु, प्रगति ब्राउज़र में सेव। मुफ़्त, बिना रजिस्ट्रेशन।`,
  },
  'zh-hans': {
    eyebrow: '清单', nav: '清单', h1: '免费清单',
    leadA: '边做边打勾 — ', leadB: '进度保存在你的浏览器里', leadC: '，不用注册账号。',
    foot: '免费的互动清单', more: '别的清单', home: '首页', crumb: '清单',
    trim: '清单',
    metaTitle: '免费清单 — 搬家、旅行、工作、健康等',
    metaDesc: '搬家、出国旅行、求职面试、露营、婚礼等的免费互动清单。打勾即可，进度自动保存。',
    detailTitle: (t, n) => `${t} — ${n}项要确认`,
    detailDesc: (d, n) => `${d}。共${n}项，进度保存在浏览器里。免费，不用注册。`,
  },
  'zh-hant': {
    eyebrow: '清單', nav: '清單', h1: '免費清單',
    leadA: '邊做邊打勾 — ', leadB: '進度保存在你的瀏覽器裡', leadC: '，不用註冊帳號。',
    foot: '免費的互動清單', more: '別的清單', home: '首頁', crumb: '清單',
    trim: '清單',
    metaTitle: '免費清單 — 搬家、旅行、工作、健康等',
    metaDesc: '搬家、出國旅行、求職面試、露營、婚禮等的免費互動清單。打勾即可，進度自動儲存。',
    detailTitle: (t, n) => `${t} — ${n}項要確認`,
    detailDesc: (d, n) => `${d}。共${n}項，進度保存在瀏覽器裡。免費，不用註冊。`,
  },
};
