/**
 * 한 언어의 꿈해몽 문구.
 *
 * id·이모지·분류 열쇠·길흉 값은 언어와 무관하므로 [[lib/dream-l10n/index.ts]]의
 * 뼈대에 한 번만 둔다. 여기서 받는 것은 사람이 읽는 말뿐이다.
 *
 * 해석에 단정적인 예언을 담지 않는 영어판 방침을 그대로 지킨다 — 어느 쪽으로도
 * 근거가 없고, "이런 꿈은 이런 시기에 자주 보고된다"가 사실에 가깝다.
 */
export type DreamId =
  | 'falling' | 'teeth' | 'flying' | 'chased' | 'water' | 'snake' | 'house'
  | 'death' | 'baby' | 'money' | 'exam' | 'naked' | 'fire' | 'lost'
  | 'cat' | 'bird' | 'mountain' | 'mirror' | 'rain' | 'road';

/** 분류 열쇠는 영어 그대로다 — 화면에 보이는 이름만 언어별로 바꾼다 */
export type DreamCategoryKey =
  | 'Animals' | 'Body' | 'Movement' | 'Nature' | 'Objects' | 'People' | 'Places' | 'Situations';

export interface DreamEntryCopy {
  keyword: string;
  summary: string;
  detail: [string, string, string];
}

export interface DreamCopy {
  categories: Record<DreamCategoryKey, string>;
  /** 길흉 다섯 단계 — 값은 dream-data.ts의 luck과 같다 */
  luck: Record<'2' | '1' | '0' | '-1' | '-2', string>;
  ui: { title: string; lead: string; search: string; all: string; none: string; note: string };
  entries: Record<DreamId, DreamEntryCopy>;
}
