/* 접힌 국제 라우트의 언어 목록과 자료 열쇠. 한국어는 안 접는다 — app/(ko)는 그대로다. */
export const FOLD_LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'] as const;
export type FoldLang = (typeof FOLD_LANGS)[number];

/* 경로 표기와 자료 열쇠가 갈리는 세 언어: pt-br→pt, zh-hans→zh, zh-hant→tw */
export const DATA_KEY = {
  en: 'en', es: 'es', 'pt-br': 'pt', ja: 'ja', de: 'de',
  fr: 'fr', hi: 'hi', 'zh-hans': 'zh', 'zh-hant': 'tw',
} as const;
