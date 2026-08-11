/**
 * 공식 도구의 공통 형태.
 *
 * 비율·몸 수치·도형이 전부 "입력 몇 개 → 공식 → 결과 몇 개 + 해석"이라는 같은
 * 모양이다. 그 모양을 여기 한 번 정하고, 섹션은 스펙 쉰 줄만 쓴다. 엔진 하나가
 * 세 섹션 백오십 페이지를 그린다.
 */
import type { FormulaLang } from './terms.ts';

export interface FieldSpec {
  /** compute에 넘어가는 키 */
  key: string;
  /** TERMS의 키 — 라벨을 3언어로 꺼내 쓴다 */
  term: string;
  /** UNITS의 키 */
  unit?: string;
  def: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface OutputSpec {
  term: string;
  unit?: string;
  value: number;
  digits?: number;
  /** 이 값이 결과의 주인공인가 — 크게 보여준다 */
  primary?: boolean;
}

export interface Verdict {
  /** 결과를 한 줄로 해석한다. 숫자만 주면 "그래서 뭐"가 남는다 */
  ko: string;
  en: string;
  /**
   * 나머지 언어. 도구마다 함수 안에서 문장을 만들기 때문에, 여덟 칸을 필수로 하면
   * 101개 함수가 한꺼번에 깨진다. 옮긴 것만 담고 없으면 영어로 되돌린다.
   */
  l10n?: Partial<Record<Exclude<FormulaLang, 'ko' | 'en'>, string>>;
  tone?: 'good' | 'warn' | 'bad';
}

/** 그 언어의 판정 문장 */
export const verdictText = (v: Verdict, lang: FormulaLang): string =>
  lang === 'ko' ? v.ko : lang === 'en' ? v.en : (v.l10n?.[lang] ?? v.en);

export interface FormulaText {
  title: string;
  desc: string;
  long: string;
  note: string;
  /**
   * 손으로 쓴 본문 — 자동 본문(입력표·계산 과정·값별 표)으로 안 되는 이야기만.
   *
   * 없어도 페이지는 충분히 찬다. 그 주제에만 있는 배경·기준·읽는 법이 있을 때
   * 두세 덩이 적는다.
   */
  body?: { h: string; p: string }[];
}

export interface FormulaTool {
  slug: string;
  icon: string;
  category: string;
  fields: FieldSpec[];
  /** 사람이 읽는 공식 — 페이지에 그대로 보여준다 */
  formula: string;
  compute: (v: Record<string, number>) => OutputSpec[];
  /** 결과 해석 (없어도 된다) */
  verdict?: (v: Record<string, number>, out: OutputSpec[]) => Verdict | null;
  ko: FormulaText;
  en: FormulaText;
}


/** 0으로 나누기와 NaN을 한 곳에서 막는다 — 쉰 개가 각자 막으면 몇 개는 빠진다 */
export const safe = (n: number): number => (Number.isFinite(n) ? n : 0);
export const ratio = (a: number, b: number): number => (b === 0 ? 0 : safe(a / b));
