// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
/** 열 언어 한 줄 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
export type Ten = [string, string, string, string, string, string, string, string, string, string];

export type EmojiGroup = 'face' | 'people' | 'nature' | 'food' | 'object' | 'symbol' | 'hand';

export interface EmojiItem {
  /** 주소에 쓰는 열쇠 — 'folded-hands', 'skull'. 이모지 자체는 주소에 못 쓴다 */
  slug: string;
  /** 이모지 글자 그대로 */
  char: string;
  group: EmojiGroup;
  /** 유니코드 이름(영어). 공식 이름이지 쓰이는 뜻이 아니다 */
  unicodeName: string;
  /** 코드포인트 — 'U+1F64F' */
  code: string;
  /** 사람들이 실제로 검색하는 짧은 이름(영어) */
  common: string;
  /** 같이 보면 좋은 이모지의 slug */
  see?: string[];
}
