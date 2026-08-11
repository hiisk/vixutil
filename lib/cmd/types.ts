// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
/** 열 언어 한 줄 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
export type Ten = [string, string, string, string, string, string, string, string, string, string];

export type CmdCategory = 'file' | 'text' | 'perm' | 'proc' | 'net' | 'archive' | 'git' | 'pkg';

export interface CmdItem {
  /** 주소에 쓰는 열쇠 — 'ls', 'chmod', 'git-reset' */
  slug: string;
  /** 화면에 그대로 보이는 이름 — 'ls', 'git reset' */
  name: string;
  category: CmdCategory;
  /** 대표 사용 꼴 한 줄 — 'ls -la [경로]' */
  usage: string;
  /** 자주 쓰는 옵션 — 옵션 문자와 한 줄 뜻(영어, 옵션은 번역하지 않는다) */
  flags: { flag: string; en: string }[];
  /** 실제로 치는 예시 두세 개 — 명령과 그 결과를 영어로 */
  examples: { cmd: string; en: string }[];
  /** 같이 보면 좋은 명령의 slug */
  see?: string[];
}
