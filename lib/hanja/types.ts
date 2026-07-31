/**
 * 사자성어의 공통 형태.
 *
 * 한국에서 쓰는 사자성어는 중국 고전에서 온 것과 한국에서 만들어진 것이 섞여
 * 있다. 한국식 성어를 중국 고전인 것처럼 내면 틀린 정보가 되므로, 각 언어의
 * 유래 칸에 그 사실을 적는다. 일본어는 四字熟語가 겹치는 것이 많아, 일본에서
 * 쓰지 않는 것과 형태가 다른 것을 따로 밝힌다.
 */
import type { FormulaLang } from '../formula/terms.ts';
import { HANJA_L10N, GLOSS_L10N } from '../hanja-l10n/index.ts';

export interface IdiomText {
  /** 표제 — 한국어는 독음, 일본어는 일본 음독, 나머지는 로마자 */
  title: string;
  /** 한 줄 뜻 */
  meaning: string;
  /** 어디서 온 말인가 */
  origin: string;
  /** 실제로 쓰는 예 */
  usage: string;
}

export interface Idiom {
  slug: string;
  /** 정자(한국에서 쓰는 형태) */
  hanja: string;
  /** 간체 */
  simplified: string;
  /** 한국어 독음 */
  reading: string;
  /** 표준중국어 병음 */
  pinyin: string;
  /** 글자마다 한 자씩 새김 — 네 글자를 쪼개 보면 뜻이 붙는다 (한국어) */
  chars: string[];
  category: string;
  icon: string;
  ko: IdiomText;
  en: IdiomText;
}

/** ko·en은 파일 안에, 번역 여섯 언어는 lib/hanja-l10n에서 — 빠지면 영어로 떨어뜨린다 */
export const idiomText = (i: Idiom, lang: FormulaLang): IdiomText => {
  if (lang === 'ko' || lang === 'en') return i[lang];
  return HANJA_L10N[lang]?.[i.slug] ?? i.en;
};

/** 글자 새김 — 한국어는 훈과 음을 붙여 읽는 우리 방식이라 그대로 둔다 */
export const idiomGloss = (i: Idiom, lang: FormulaLang, n: number): string => {
  if (lang === 'ko') return i.chars[n];
  return GLOSS_L10N[lang]?.[i.slug]?.[n] ?? i.chars[n];
};
