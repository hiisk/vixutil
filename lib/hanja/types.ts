/**
 * 사자성어의 공통 형태.
 *
 * 한국에서 쓰는 사자성어는 중국 고전에서 온 것과 한국에서 만들어진 것이 섞여
 * 있다. 중국어 페이지에 한국식 성어를 중국 成语인 것처럼 내면 틀린 정보가
 * 되므로, 중국에서 쓰이지 않는 것은 zh 설명에 그 사실을 적는다.
 */
import type { Lang } from '../formula/terms.ts';

export interface IdiomText {
  /** 표제 — 한국어는 독음, 영어는 로마자, 중국어는 간체 */
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

export const idiomText = (i: Idiom, lang: Lang): IdiomText => i[lang];
