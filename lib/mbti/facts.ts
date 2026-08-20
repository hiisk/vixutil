import { MBTI_TYPES, calcMbtiMatch, type MbtiType } from '../mbti-match.ts';
import { FUNCTIONS, functionStack, SLOT, type FnCode } from './functions.ts';

/**
 * 유형 낱장이 쓰는 «계산으로 나오는 것».
 *
 * 손으로 적은 글은 ./profiles.ts에만 있다. 여기 있는 것은 전부 네 글자에서
 * 나오므로 열여섯 장이 저절로 서로 다르다 — 같은 문장을 열여섯 번 적을 일이
 * 없고, 규칙이 틀리면 검사가 잡는다.
 */

/* JSX를 안 끌어오는 자리에 둔다 — 검색 색인이 route.ts를 들이면 og-template까지 딸려온다 */
export const MBTI_ICON = '🧭';

/** 글자 하나하나가 무엇을 가르는가 */
export const LETTER: Record<string, { axis: string; label: string; what: string }> = {
  E: { axis: '에너지', label: '외향', what: '사람과 자리에서 기운을 얻는다' },
  I: { axis: '에너지', label: '내향', what: '혼자 있는 시간에서 기운을 되찾는다' },
  S: { axis: '인식', label: '감각', what: '실제로 있는 것, 겪어 본 것을 먼저 본다' },
  N: { axis: '인식', label: '직관', what: '그 너머에 있을 법한 것을 먼저 본다' },
  T: { axis: '판단', label: '사고', what: '맞는지 틀린지로 가른다' },
  F: { axis: '판단', label: '감정', what: '사람에게 어떤지로 가른다' },
  J: { axis: '생활', label: '판단', what: '정해 두고 움직인다' },
  P: { axis: '생활', label: '인식', what: '열어 두고 맞춰 간다' },
};

/** 네 기질 — 두 글자로 묶는 널리 쓰는 갈래 */
export const TEMPERAMENT: { key: string; label: string; note: string; match: (t: string) => boolean }[] = [
  { key: 'NF', label: 'NF · 이상', note: '뜻과 사람을 먼저 본다', match: t => t[1] === 'N' && t[2] === 'F' },
  { key: 'NT', label: 'NT · 이성', note: '얼개와 까닭을 먼저 본다', match: t => t[1] === 'N' && t[2] === 'T' },
  { key: 'SJ', label: 'SJ · 관리', note: '겪어 본 것과 질서를 먼저 본다', match: t => t[1] === 'S' && t[3] === 'J' },
  { key: 'SP', label: 'SP · 실행', note: '지금 이 자리와 움직임을 먼저 본다', match: t => t[1] === 'S' && t[3] === 'P' },
];

export const temperamentOf = (t: string) => TEMPERAMENT.find(g => g.match(t))!;

/** 네 글자를 다 뒤집은 유형 — 기능이 하나도 안 겹친다 */
export const oppositeOf = (t: string): MbtiType =>
  t.split('').map(c => ({ E: 'I', I: 'E', S: 'N', N: 'S', T: 'F', F: 'T', J: 'P', P: 'J' }[c])).join('') as MbtiType;

export interface StackRow { slot: string; hint: string; code: FnCode; name: string; what: string; looks: string }

export function stackOf(t: string): StackRow[] {
  return functionStack(t).map((code, i) => ({
    slot: SLOT[i].label, hint: SLOT[i].hint, ...FUNCTIONS[code],
  }));
}

/** 열여섯과의 궁합 — 점수 높은 순 */
export function matchesOf(t: MbtiType) {
  return MBTI_TYPES
    .map(other => calcMbtiMatch(t, other))
    .sort((a, b) => b.score - a.score || a.b.localeCompare(b.b));
}

export const slugOf = (t: string) => t.toLowerCase();
export const typeOfSlug = (s: string): MbtiType | undefined =>
  MBTI_TYPES.find(t => t.toLowerCase() === s.toLowerCase());
