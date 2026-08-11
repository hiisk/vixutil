// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
/** 열 언어 한 줄 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
export type Ten = [string, string, string, string, string, string, string, string, string, string];

export type ErrCategory = 'git' | 'npm' | 'python' | 'docker' | 'js' | 'build';

export interface ErrItem {
  /** 주소에 쓰는 열쇠 — 'refusing-to-merge-unrelated-histories' */
  slug: string;
  /** 화면에 그대로 찍는 오류 문구 — 사람이 붙여 넣는 그 문자열 */
  message: string;
  category: ErrCategory;
  /** 어느 도구가 내는가 — 'git', 'npm', 'python 3.12', 'docker' */
  tool: string;
  /** 고치는 명령 한 줄. 명령으로 안 끝나는 것은 빈 문자열 */
  fix: string;
  /** 같이 볼 오류의 slug */
  see?: string[];
}
