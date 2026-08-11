/**
 * 명령어 225개의 한 줄 설명 — 열 언어.
 *
 * 명령 이름과 옵션은 옮기지 않는다. 옮기는 것은 "무엇을 하는가"와 "무엇을
 * 틀리기 쉬운가"뿐이다. 갈래별 파일에 나눠 두고 여기서 합친다.
 */
import type { Ten } from './types.ts';
import { CMD_DESC_FILES } from './desc-files.ts';
import { CMD_DESC_RUN } from './desc-run.ts';
import { CMD_DESC_DEV } from './desc-dev.ts';

const LANG_ORDER = ['ko', 'en', 'es', 'pt', 'ja', 'de', 'fr', 'hi', 'zh', 'tw'] as const;
export type CmdLangKey = typeof LANG_ORDER[number];

export const CMD_DESC: Record<string, Ten> = { ...CMD_DESC_FILES, ...CMD_DESC_RUN, ...CMD_DESC_DEV };

/** 그 언어의 설명 — 없으면 영어로 되돌린다 */
export function cmdDesc(slug: string, lang: CmdLangKey): string {
  const row = CMD_DESC[slug];
  if (!row) return '';
  return row[LANG_ORDER.indexOf(lang)] || row[1];
}
