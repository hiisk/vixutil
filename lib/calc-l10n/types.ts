import type { AnyLocale10 } from '@/lib/locales';

/**
 * 계산기 다국어 층.
 *
 * 한국어 계산기는 백일곱 개인데 그중 쉰넷만 여기로 온다. 나머지 쉰셋은 한국
 * 법·제도·요금표에 묶여 있어서 — 4대보험, 취득세, 전기 누진요금, 만나이 —
 * 번역하면 "독일어로 쓰인 한국 세금 계산기"가 된다. 화면만 독일어이고 답은
 * 한국 것이라, 안 만드느니만 못하다.
 *
 * 그래서 이 층에 들어온 것은 전부 **나라를 타지 않는 계산**이다. BMI, 복리,
 * 단위 변환, 진수 변환처럼 어디서 계산해도 같은 값이 나오는 것들.
 */
export type CalcLang = Exclude<AnyLocale10, 'ko'>;

/** 계산기 껍데기가 쓰는 문구 — 언어마다 한 벌. */
export interface CalcShellCopy {
  /** 헤더의 "전체 계산기" 링크 */
  allCalcs: string;
  /** 빵부스러기의 홈 */
  home: string;
  /** 빵부스러기·허브의 계산기 */
  calculators: string;
  /** 허브 h1 */
  hubTitle: string;
  /** 허브 설명 */
  hubLead: string;
  /** 허브 메타 제목 */
  hubMetaTitle: string;
  /** 허브 메타 설명 */
  hubMetaDesc: string;
  /** "다른 계산기" 소제목 */
  related: string;
  /** 다른 섹션에 사는 계산기로 넘겨주는 줄의 소제목 */
  crossTitle: string;
}

/** 계산기 한 개의 문구. */
export interface CalcCopy {
  title: string;
  /** 메타 설명 겸 제목 아래 한 줄 */
  desc: string;
  /** 목록 카드에 쓰는 짧은 설명 */
  short: string;
  /** 본문 해설 — h2/p가 번갈아 온다 */
  intro: { h: string; p: string }[];
  faq: { q: string; a: string }[];
  /** 그 계산기만 쓰는 라벨들 */
  ui: Record<string, string>;
}

export type CalcTable = Record<CalcLang, CalcCopy>;
