/**
 * 갈래마다 "이 도구의 오류는 어떻게 읽나" 한 문장 — 열 언어.
 * 갈래가 늘면 파일을 만들고 여기 한 줄을 더한다.
 */
import type { Ten } from './types.ts';
import { ERR_CAT_NOTES } from './ui-categories.ts';
import { ERR_CAT_NOTES_2 } from './ui-categories-2.ts';

export const ERR_NOTES: Record<string, Ten> = { ...ERR_CAT_NOTES, ...ERR_CAT_NOTES_2 };
