import { CHECKLISTS_MAP } from './checklist-data.ts';
import { CHECKLISTS_EN_MAP } from './checklist-en.ts';
import { CHECKLISTS_ZH_MAP } from './checklist-zh.ts';
import { QUIZ_MAP } from './quiz-data.ts';
import { QUIZZES_EN_MAP } from './quiz-en.ts';
import { QUIZZES_ZH_MAP } from './quiz-zh.ts';
import { TEST_MAP } from './test-data.ts';
import { TESTS_EN_MAP } from './test-en.ts';
import { TESTS_ZH_MAP } from './test-zh.ts';

/**
 * 체크리스트·퀴즈·심리테스트의 hreflang 짝을 고른다.
 *
 * 이 세 섹션은 언어별로 내용을 따로 썼기 때문에 슬러그 목록이 서로 다르다.
 * 한국어에 128개가 있고 영어에 12개가 있는데, 겹치는 것은 5개뿐이다.
 *
 * 그래서 세 언어 전부를 기계적으로 적어 넣으면 안 된다 — 없는 페이지를 대안으로
 * 선언하면 구글이 404를 대안으로 받는다. 반대로 겹치는 것을 빼먹으면 같은 주제의
 * 페이지 둘이 서로 남남이 된다. 실제로 있는 것만 골라 넣는다.
 *
 * 도구 목록이 자기 자신을 세므로, 나중에 어느 언어에 항목이 추가되면 여기를
 * 고치지 않아도 짝이 자동으로 늘어난다.
 */
export type AltLang = 'ko' | 'en' | 'zh';
export type AltSection = 'checklist' | 'quiz' | 'test';

const MAPS: Record<AltSection, Record<AltLang, Record<string, unknown>>> = {
  checklist: { ko: CHECKLISTS_MAP, en: CHECKLISTS_EN_MAP, zh: CHECKLISTS_ZH_MAP },
  quiz: { ko: QUIZ_MAP, en: QUIZZES_EN_MAP, zh: QUIZZES_ZH_MAP },
  test: { ko: TEST_MAP, en: TESTS_EN_MAP, zh: TESTS_ZH_MAP },
};

const path = (lang: AltLang, section: AstSectionPath, slug: string) =>
  lang === 'ko' ? `/${section}/${slug}` : `/${lang}/${section}/${slug}`;

type AstSectionPath = AltSection;

/**
 * 그 슬러그가 실제로 있는 언어만 담은 languages 객체.
 *
 * x-default는 영어가 있을 때만 영어로 둔다. 영어판이 없는 항목까지 영어를
 * 기본으로 선언하면 없는 페이지를 가리키게 된다.
 */
export function localeAlternates(section: AltSection, slug: string): Record<string, string> {
  const maps = MAPS[section];
  const out: Record<string, string> = {};
  for (const lang of ['ko', 'en', 'zh'] as AltLang[]) {
    if (maps[lang]?.[slug]) out[lang] = path(lang, section, slug);
  }
  if (out.en) out['x-default'] = out.en;
  else if (out.ko) out['x-default'] = out.ko;
  return out;
}

/** 짝이 자기 자신뿐이면 hreflang을 달 이유가 없다 */
export function hasAlternates(section: AltSection, slug: string): boolean {
  return Object.keys(localeAlternates(section, slug)).length > 2;
}
