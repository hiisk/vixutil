/**
 * 키 하나의 값 — code에서 자리와 성질을 계산한다.
 *
 * KeyboardEvent에는 location이라는 값이 있다. 왼쪽 Shift와 오른쪽 Shift가 같은
 * keyCode 16을 주고도 서로 구별되는 것이 그 값 때문인데, 그 값은 code의 꼬리에
 * 이미 적혀 있다 — Left면 1, Right면 2, Numpad로 시작하면 3이다. 그래서 적지
 * 않고 계산한다.
 */
import { KEYS, type KeyDef, type KeyGroup } from './list.ts';

/** KeyboardEvent.location */
export const LOCATION = { standard: 0, left: 1, right: 2, numpad: 3 } as const;

export type Location = (typeof LOCATION)[keyof typeof LOCATION];

export interface KeyFacts extends KeyDef {
  location: Location;
  /** 화면에 적는 이름 — 공백처럼 보이지 않는 키는 code를 쓴다 */
  label: string;
  /** 눌러도 글자가 찍히지 않는 키인가 */
  printable: boolean;
  /** keyCode를 16진수로 — 옛 코드가 0x0D처럼 적어 둔 것을 찾아올 수 있게 */
  hex: string;
  /** 같은 keyCode를 쓰는 다른 키 — 16번은 왼쪽과 오른쪽 Shift 둘이다 */
  shares: string[];
}

export const locationOf = (code: string): Location => {
  if (code.startsWith('Numpad')) return LOCATION.numpad;
  if (code.endsWith('Left')) return LOCATION.left;
  if (code.endsWith('Right')) return LOCATION.right;
  return LOCATION.standard;
};

/** 글자가 찍히는 키인가 — key가 한 글자면 그렇다 */
export const isPrintable = (x: KeyDef): boolean => [...x.key].length === 1;

export function keyFacts(x: KeyDef): KeyFacts {
  return {
    ...x,
    location: locationOf(x.code),
    label: x.key === ' ' ? 'Space' : isPrintable(x) ? x.key : x.key,
    printable: isPrintable(x),
    hex: `0x${x.keyCode.toString(16).toUpperCase().padStart(2, '0')}`,
    shares: KEYS.filter(o => o.keyCode === x.keyCode && o.code !== x.code).map(o => o.code),
  };
}

export const GROUPS: KeyGroup[] = [
  'letter', 'digit', 'punctuation', 'numpad', 'function',
  'navigation', 'editing', 'modifier', 'lock', 'system', 'language',
];

export const keysOfGroup = (g: KeyGroup): KeyDef[] => KEYS.filter(x => x.group === g);

/** 같은 갈래에서 앞뒤로 몇 개 */
export const neighbours = (x: KeyDef, span = 3): KeyDef[] => {
  const group = keysOfGroup(x.group);
  const i = group.findIndex(o => o.code === x.code);
  return group.slice(Math.max(0, i - span), i + span + 1).filter(o => o.code !== x.code);
};
