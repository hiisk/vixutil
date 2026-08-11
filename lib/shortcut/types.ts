// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
/** 열 언어 한 줄 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
export type Ten = [string, string, string, string, string, string, string, string, string, string];

/**
 * 한쪽 운영체제에 그 기능이 없다는 표시.
 *
 * "모른다"가 아니라 "없다"는 뜻이다 — Win+V 클립보드 기록은 맥에 대응이 없고,
 * Spotlight는 윈도우에 없다. 이 값이 든 칸은 키캡으로 그리지 않고 없다고 적는다.
 * 표시를 여기 두는 이유는 목록·화면·검사가 같은 글자를 봐야 하기 때문이다.
 */
export const NA = '—';

/** 앱 열쇠 — 주소의 첫 조각이 된다 */
export type ScApp =
  | 'vscode' | 'excel' | 'sheets' | 'chrome' | 'macos' | 'windows'
  | 'figma' | 'photoshop' | 'terminal' | 'slack'
  | 'word' | 'powerpoint' | 'outlook' | 'notion' | 'gmail'
  | 'illustrator' | 'premiere' | 'intellij' | 'discord' | 'zoom';

export interface ScItem {
  /** 주소에 쓰는 열쇠 — 'chrome-hard-reload' */
  slug: string;
  app: ScApp;
  /** 무엇을 하는 단축키인지 한 낱말로 — 'Hard reload' */
  action: string;
  /** 윈도우·리눅스 키 조합 — 'Ctrl+Shift+R' */
  win: string;
  /** 맥 키 조합 — 'Cmd+Shift+R'. 같으면 win과 같은 값을 둔다 */
  mac: string;
  /** 이 단축키가 속한 갈래 — 'Editing', 'Navigation' 같은 영어 한 낱말 */
  group: string;
  /** 같이 알아 두면 좋은 단축키의 slug */
  see?: string[];
}
